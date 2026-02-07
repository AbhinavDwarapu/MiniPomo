"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Settings {
    workDuration: number;
    breakDuration: number;
    bigBreakDuration: number;
    soundEnabled: boolean;
    notificationEnabled: boolean;
    volume: number;
    theme: 'lilac' | 'monochrome';
}

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
    workDuration: 15,
    breakDuration: 10,
    bigBreakDuration: 45,
    soundEnabled: true,
    notificationEnabled: true,
    volume: 50,
    theme: 'lilac',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem("pomo-settings");
        if (savedSettings) {
            try {
                setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
            } catch (e) {
                console.error("Failed to parse settings", e);
            }
        }
    }, []);

    // Apply theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', settings.theme);
    }, [settings.theme]);

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings((prev) => {
            const updated = { ...prev, ...newSettings };
            localStorage.setItem("pomo-settings", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
