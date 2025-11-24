import { ReactNode } from "react";

interface RangeInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    formatValue?: (value: number) => string;
    action?: ReactNode;
    onValueCommit?: (value: number) => void;
}

export function RangeInput({
    label,
    value,
    onChange,
    onValueCommit,
    min = 0,
    max = 1,
    step = 0.1,
    formatValue = (v) => `${Math.round(v * 100)}%`,
    action
}: RangeInputProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm text-on-primary/80">{label}</label>
                <span className="text-sm text-on-primary/80">{formatValue(value)}</span>
            </div>
            <div className="flex items-center gap-4">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    onMouseUp={() => onValueCommit?.(value)}
                    onTouchEnd={() => onValueCommit?.(value)}
                    className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-on-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform"
                />
                {action}
            </div>
        </div>
    );
}
