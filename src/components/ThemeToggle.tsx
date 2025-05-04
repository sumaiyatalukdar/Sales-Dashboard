'use client';

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Check localStorage to set the initial theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
      setIsDark(savedTheme === 'dark');
    } else {
      // Set default theme
      document.documentElement.classList.add('light');
      setIsDark(false);
    }
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center text-6xl p-8 w-20 h-20 rounded-full border-none cursor-pointer hover:bg-transparent transition-colors"
    >
      {isDark ? "🌞" : "🌙"}
    </button>
  );
}
