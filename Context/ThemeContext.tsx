import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextProps {
  Theme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<boolean>(false); // false for light mode, true for dark mode

  useEffect(() => {
    const fetchThemeMode = async () => {
      try {
        const storedThemeMode = await AsyncStorage.getItem('themeMode');
        if (storedThemeMode !== null) {
          setTheme(JSON.parse(storedThemeMode));
        }
      } catch (error) {
        console.error('Error retrieving theme mode:', error);
      }
    };

    fetchThemeMode();
  }, []);

  const saveThemeMode = async (mode: boolean) => {
    try {
      await AsyncStorage.setItem('themeMode', JSON.stringify(mode));
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    saveThemeMode(newTheme);
  };

  const value: ThemeContextProps = {
    Theme: theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
