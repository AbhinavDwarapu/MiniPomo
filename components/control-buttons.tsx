"use client";

import { Play, Pause, RotateCcw } from "lucide-react";
import type { TimerMode } from "./mode-toggle";

interface ControlButtonsProps {
    isRunning: boolean;
    onPlayPause: () => void;
    onReset: () => void;
    mode: TimerMode;
}

export function ControlButtons({
    isRunning,
    onPlayPause,
    onReset,
    mode,
}: ControlButtonsProps) {
    const modeColors = {
        timer: "bg-on-primary",
        break: "bg-secondary",
        breakPlus: "bg-lightGreen",
    };

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={onPlayPause}
                className={`flex items-center justify-center px-8 h-12 rounded-full ${modeColors[mode]} text-background-solid hover:opacity-90 transition-all shadow-md active:scale-95`}
                aria-label={isRunning ? "Pause" : "Play"}
            >
                {isRunning ? (
                    <Pause className="w-4 h-4" fill="currentColor" />
                ) : (
                    <Play className="w-4 h-4" fill="currentColor" />
                )}
            </button>
            <button
                onClick={onReset}
                className="flex items-center justify-center px-8 h-12 rounded-full text-on-primary hover:bg-white/10 transition-colors border border-white/10"
                aria-label="Reset"
            >
                <RotateCcw className="w-4 h-4" />
            </button>
        </div>
    );
}
