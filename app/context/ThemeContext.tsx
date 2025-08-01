import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

type ThemeContextType = {
  isDark: boolean;
  colors: {
    background: string;
    text: string;
    card: string;
    cardText: string;
    type: string;
    status: string;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    // Handle null colorScheme value (fallback to light mode)
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const colors = {
    background: isDark ? '#000' : '#fff',
    text: isDark ? '#fff' : '#000',
    card: isDark ? '#1a1a1a' : '#f0f0f0',
    cardText: isDark ? '#fff' : '#000',
    type: isDark ? '#a0a0a0' : 'gray',
    status: '#22c55e',
  };

  return (
    <ThemeContext.Provider value={{ isDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}; 