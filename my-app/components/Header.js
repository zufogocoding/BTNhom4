'use client';
import { useTheme } from '@/context/ThemeContext';

export default function Header({ noteCount }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center py-4 border-b dark:border-gray-700">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">📄 Giấy ghi chú ước nguyện 心願便利貼</span>
      </div>
      <div className="flex items-center gap-4">

        <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-4 py-1 rounded-full text-sm font-semibold">
          {noteCount} ghi chú
        </span>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-[#2A2B36] hover:bg-gray-300 transition"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
