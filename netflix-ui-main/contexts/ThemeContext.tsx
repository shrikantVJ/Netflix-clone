import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: ThemeMode;
    colorScheme: 'light' | 'dark';
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const deviceColorScheme = useDeviceColorScheme();
    const [theme, setThemeState] = useState<ThemeMode>('dark'); // Default to dark for Netflix feel

    const colorScheme = theme === 'system'
        ? (deviceColorScheme || 'dark')
        : theme;

    const setTheme = (newTheme: ThemeMode) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, colorScheme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
