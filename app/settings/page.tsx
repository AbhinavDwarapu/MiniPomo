"use client";

import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { useSettings } from "@/context/settings-context";
import { Titlebar } from "@/components/titlebar";
import { NumberInput } from "@/components/ui/number-input";
import { Checkbox } from "@/components/ui/checkbox";
import { RangeInput } from "@/components/ui/range-input";

export default function SettingsPage() {
    const router = useRouter();
    const { settings, updateSettings } = useSettings();

    useEffect(() => {
        const updateWindowSize = async () => {
            try {
                const appWindow = getCurrentWindow();
                await appWindow.setMinSize(new LogicalSize(350, 820));
                await appWindow.setSize(new LogicalSize(350, 820));
            } catch (error) {
                console.error("Failed to resize window:", error);
            }
        };
        updateWindowSize();
    }, []);

    return (
        <div className="relative min-h-screen bg-background flex flex-col">
            {/* Draggable titlebar region */}
            {/* Draggable titlebar region */}
            <Titlebar title="Settings" />

            {/* Main content */}
            <div className="flex-1 pt-10 pb-6 px-6">
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => router.push('/')}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-on-primary"
                        aria-label="Back to timer"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-bold text-on-primary">Settings</h1>
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-on-primary mb-3">Timer Durations</h2>
                        <div className="space-y-4">
                            <NumberInput
                                label="Work Duration (minutes)"
                                value={settings.workDuration}
                                onChange={(value) => updateSettings({ workDuration: value })}
                                min={1}
                                max={60}
                            />

                            <NumberInput
                                label="Break Duration (minutes)"
                                value={settings.breakDuration}
                                onChange={(value) => updateSettings({ breakDuration: value })}
                                min={1}
                                max={30}
                            />

                            <NumberInput
                                label="Big Break Duration (minutes)"
                                value={settings.bigBreakDuration}
                                onChange={(value) => updateSettings({ bigBreakDuration: value })}
                                min={1}
                                max={120}
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-on-primary mb-3">Notifications</h2>
                        <div className="space-y-3">
                            <Checkbox
                                label="Play notification sound"
                                checked={settings.soundEnabled}
                                onChange={(checked) => updateSettings({ soundEnabled: checked })}
                            />

                            {settings.soundEnabled && (
                                <div className="pl-7">
                                    <RangeInput
                                        label="Volume"
                                        value={settings.volume}
                                        onChange={(value) => updateSettings({ volume: value })}
                                        onValueCommit={(value) => {
                                            const audio = new Audio("/notification.mp3");
                                            audio.volume = value;
                                            audio.play().catch(console.error);
                                        }}
                                        min={0}
                                        max={1}
                                        step={0.1}
                                    />
                                </div>
                            )}

                            <Checkbox
                                label="Show desktop notification"
                                checked={settings.notificationEnabled}
                                onChange={(checked) => updateSettings({ notificationEnabled: checked })}
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-on-primary mb-3">Appearance</h2>
                        <div className="flex gap-3">
                            <button
                                onClick={() => updateSettings({ theme: 'lilac' })}
                                className={`flex-1 p-3 rounded-lg border-2 transition-all ${settings.theme === 'lilac'
                                    ? 'border-on-primary bg-on-primary/10'
                                    : 'border-transparent bg-white/5 hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-full h-12 rounded bg-linear-to-br from-[#411B51] to-[#FDC1FE]"></div>
                                    <span className="text-sm font-medium text-on-primary">Lilac</span>
                                </div>
                            </button>
                            <button
                                onClick={() => updateSettings({ theme: 'monochrome' })}
                                className={`flex-1 p-3 rounded-lg border-2 transition-all ${settings.theme === 'monochrome'
                                    ? 'border-on-primary bg-on-primary/10'
                                    : 'border-transparent bg-white/5 hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-full h-12 rounded bg-linear-to-br from-black to-white"></div>
                                    <span className="text-sm font-medium text-on-primary">Monochrome</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-on-primary mb-3">About</h2>
                        <div className="text-on-primary/60 space-y-1">
                            <p>Pomodoro Timer v0.1.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
