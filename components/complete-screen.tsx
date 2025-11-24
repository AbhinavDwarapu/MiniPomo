"use client";

import type { TimerMode } from "./mode-toggle";

interface CompleteScreenProps {
    mode: TimerMode;
    onDismiss: () => void;
}

export function CompleteScreen({ mode, onDismiss }: CompleteScreenProps) {
    const modeColors = {
        timer: "text-on-primary",
        break: "text-secondary",
        breakPlus: "text-lightGreen",
    };

    const modeButtonColors = {
        timer: "bg-on-primary",
        break: "bg-secondary",
        breakPlus: "bg-lightGreen",
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 pt-6 transition-all">
            <div className={`text-3xl ${modeColors[mode]}`}>
                Complete!
            </div>
            <button
                onClick={onDismiss}
                className={`w-28 h-8 px-4 py-1 rounded-full text-sm font-semibold ${modeButtonColors[mode]} text-background-solid hover:opacity-90 transition-opacity`}
            >
                Dismiss
            </button>
        </div>
    );
}
