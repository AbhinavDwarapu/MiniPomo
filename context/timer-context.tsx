"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { useSettings } from "./settings-context";
import { TimerMode } from "@/components/mode-toggle";

interface TimerContextType {
    mode: TimerMode;
    timeLeft: number;
    isRunning: boolean;
    hasNotified: boolean;
    showComplete: boolean;
    setMode: (mode: TimerMode) => void;
    setTimeLeft: (time: number) => void;
    setIsRunning: (isRunning: boolean) => void;
    setHasNotified: (hasNotified: boolean) => void;
    setShowComplete: (showComplete: boolean) => void;
    handlePlayPause: () => void;
    handleReset: () => void;
    handleModeChange: (newMode: TimerMode) => void;
    handleDismiss: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
    const { settings } = useSettings();

    const TIMER_DURATION = settings.workDuration * 60;
    const BREAK_DURATION = settings.breakDuration * 60;
    const BIG_BREAK_DURATION = settings.bigBreakDuration * 60;

    const [mode, setMode] = useState<TimerMode>("timer");
    const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
    const [isRunning, setIsRunning] = useState(false);
    const [hasNotified, setHasNotified] = useState(false);
    const [showComplete, setShowComplete] = useState(false);

    const notificationTimeouts = useRef<NodeJS.Timeout[]>([]);

    // Update timeLeft when mode changes or settings change
    // Only update if not running to avoid jumping time while user is editing settings
    useEffect(() => {
        if (!isRunning) {
            if (mode === "timer") setTimeLeft(TIMER_DURATION);
            else if (mode === "break") setTimeLeft(BREAK_DURATION);
            else if (mode === "breakPlus") setTimeLeft(BIG_BREAK_DURATION);
        }
    }, [mode, TIMER_DURATION, BREAK_DURATION, BIG_BREAK_DURATION]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !hasNotified) {
            setIsRunning(false);
            setHasNotified(true);
            setShowComplete(true);

            // Play notification sound if enabled
            if (settings.soundEnabled) {
                const playSound = () => {
                    // Use Web Audio API to support volume > 100%
                    const audio = new Audio("/notification.mp3");

                    // Only use GainNode if volume > 100%, otherwise use simple volume property
                    if (settings.volume > 100) {
                        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                        const source = audioContext.createMediaElementSource(audio);
                        const gainNode = audioContext.createGain();

                        // Set gain (0-5 for 0-500%)
                        gainNode.gain.value = settings.volume / 100;

                        source.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                    } else {
                        audio.volume = settings.volume / 100;
                    }

                    audio.play().catch((e) => console.error("Error playing sound:", e));
                };

                playSound();
                // Play sound 2 more times with delay
                const t1 = setTimeout(playSound, 1000);
                const t2 = setTimeout(playSound, 2000);

                notificationTimeouts.current.push(t1, t2);
            }
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, hasNotified, settings.soundEnabled]);

    const handlePlayPause = () => {
        setIsRunning(!isRunning);
        if (!isRunning) {
            setHasNotified(false);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setHasNotified(false);
        setShowComplete(false);
        if (mode === "timer") setTimeLeft(TIMER_DURATION);
        else if (mode === "break") setTimeLeft(BREAK_DURATION);
        else if (mode === "breakPlus") setTimeLeft(BIG_BREAK_DURATION);
    };

    const handleModeChange = (newMode: TimerMode) => {
        setMode(newMode);
        setIsRunning(false);
        setHasNotified(false);
        setShowComplete(false);
        // Time update is handled by the useEffect above
    };

    const handleDismiss = () => {
        // Clear any pending notification sounds
        notificationTimeouts.current.forEach(timeout => clearTimeout(timeout));
        notificationTimeouts.current = [];

        // Switch modes: work -> break, break/break+ -> work
        const nextMode: TimerMode = mode === "timer" ? "break" : "timer";
        handleModeChange(nextMode);
    };

    return (
        <TimerContext.Provider value={{
            mode,
            timeLeft,
            isRunning,
            hasNotified,
            showComplete,
            setMode,
            setTimeLeft,
            setIsRunning,
            setHasNotified,
            setShowComplete,
            handlePlayPause,
            handleReset,
            handleModeChange,
            handleDismiss
        }}>
            {children}
        </TimerContext.Provider>
    );
}

export function useTimer() {
    const context = useContext(TimerContext);
    if (context === undefined) {
        throw new Error("useTimer must be used within a TimerProvider");
    }
    return context;
}
