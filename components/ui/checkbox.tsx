interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
    return (
        <label className="flex items-center gap-4 min-h-[48px] cursor-pointer group">
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="peer appearance-none w-5 h-5 border-2 border-on-primary/50 rounded-sm checked:bg-on-primary checked:border-on-primary transition-all"
                />
                <svg
                    className="absolute w-3.5 h-3.5 text-background-solid pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 7L6 10L11 4" />
                </svg>
            </div>
            <span className="text-on-primary text-base group-hover:text-on-primary/90 transition-colors">{label}</span>
        </label>
    );
}
