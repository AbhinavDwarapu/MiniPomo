"use client";

import { useEffect } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ModeToggle } from "@/components/mode-toggle";
import { ControlButtons } from "@/components/control-buttons";
import { CompleteScreen } from "@/components/complete-screen";
import { SettingsButton } from "@/components/settings-button";
import { Titlebar } from "@/components/titlebar";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { useTimer } from "@/context/timer-context";

export default function Home() {
  const {
    mode,
    timeLeft,
    isRunning,
    showComplete,
    handlePlayPause,
    handleReset,
    handleModeChange,
    handleDismiss
  } = useTimer();

  useEffect(() => {
    const resetWindowSize = async () => {
      try {
        const appWindow = getCurrentWindow();
        await appWindow.setMinSize(new LogicalSize(250, 220));
        await appWindow.setSize(new LogicalSize(250, 280));
      } catch (error) {
        console.error("Failed to reset window size:", error);
      }
    };
    resetWindowSize();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col font-sans">
      <Titlebar>
        <SettingsButton />
      </Titlebar>

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {showComplete ? (
            <CompleteScreen mode={mode} onDismiss={handleDismiss} />
          ) : (
            // Timer Screen
            <div className="flex flex-col items-center justify-center gap-4">
              <AnimatedCounter value={timeLeft} mode={mode} />
              <ControlButtons
                isRunning={isRunning}
                onPlayPause={handlePlayPause}
                onReset={handleReset}
                mode={mode}
              />
            </div>
          )}
        </div>
      </div>

      {!showComplete && (
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-2">
          <ModeToggle mode={mode} onModeChange={handleModeChange} />
        </div>
      )}
    </div>
  );
}
