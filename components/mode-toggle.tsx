"use client";

export type TimerMode = "timer" | "break" | "breakPlus";

interface ModeToggleProps {
    mode: TimerMode;
    onModeChange: (mode: TimerMode) => void;
}

const modes = [
    { value: "timer" as TimerMode, label: "Work", activeColor: "bg-on-primary" },
    { value: "break" as TimerMode, label: "Break", activeColor: "bg-secondary" },
    { value: "breakPlus" as TimerMode, label: "Break +", activeColor: "bg-lightGreen" },
] as const;

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
    return (
        <div className="flex p-1 rounded-full gap-1">
            {modes.map(({ value, label, activeColor }) => (
                <button
                    key={value}
                    onClick={() => onModeChange(value)}
                    className={`select-none px-4 py-1.5 font-semibold transition-all text-sm rounded-full ${mode === value
                        ? `${activeColor} text-background-solid shadow-sm`
                        : `text-on-primary hover:bg-white/5`
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
