"use client";
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './icons'; // Ensure you have MoonIcon and SunIcon


export default function ThemeProvider() {
  const [theme, setTheme] = useState('dark');

  // Set theme from localStorage or default to dark
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.add(storedTheme);
      } else {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button aria-label="Toggle Theme"
      onClick={toggleTheme}
      className=" ml-4"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />  }
      
    </button>
  );
}
