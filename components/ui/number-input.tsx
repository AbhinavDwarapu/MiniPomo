interface NumberInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

export function NumberInput({ label, value, onChange, min, max }: NumberInputProps) {
    return (
        <div className="flex items-center justify-between">
            <label className="text-on-primary text-base">{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                min={min}
                max={max}
                className="w-24 h-12 px-4 bg-transparent text-on-primary rounded-lg border border-white/20 focus:border-on-primary outline-none text-right transition-colors"
            />
        </div>
    );
}
