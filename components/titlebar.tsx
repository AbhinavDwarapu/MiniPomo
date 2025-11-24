import { ReactNode } from "react";

interface TitlebarProps {
    title?: string;
    children?: ReactNode;
}

export function Titlebar({ title, children }: TitlebarProps) {
    return (
        <div
            data-tauri-drag-region
            className="absolute flex items-center justify-center top-0 left-0 right-0 h-8 z-10"
        >
            <div className="flex flex-col pointer-events-none items-center justify-center text-[0.8rem] select-none font-bold text-gray-200 opacity-60">
                {title}
            </div>
            {children && (
                <div className="pointer-events-auto">
                    {children}
                </div>
            )}
        </div>
    );
}
