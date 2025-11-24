"use client";

import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export function SettingsButton() {
    const router = useRouter();

    const openSettings = () => {
        router.push('/settings');
    };

    return (
        <button
            onClick={openSettings}
            className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-white/10 transition-colors text-on-primary opacity-60 hover:opacity-100 border border-on-primary/50"
            aria-label="Settings"
        >
            <Settings className="w-5 h-5" />
        </button>
    );
}
