'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function NoteApp() {
  const { theme, toggleTheme } = useTheme();
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(saved);
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes, isMounted]);

  const addNote = () => {
    if (!text.trim()) return;
    const icons = ['📚', '⚡', '🔗', '🌙', '💾'];
    const newNote = {
      id: Date.now(),
      content: text,
      date: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
      icon: icons[notes.length % icons.length]
    };
    setNotes([newNote, ...notes]);
    setText('');
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">📄</span> Ghi Chú Cá Nhân
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded-full">
            {notes.length} ghi chú
          </span>
          <button onClick={toggleTheme} className="text-2xl p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="relative mb-12 max-w-2xl mx-auto flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addNote()}
          placeholder="Nhập ghi chú mới..."
          className="flex-1 px-6 py-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
        <button
          onClick={addNote}
          className="px-8 rounded-xl bg-[#8b5cf6] text-white font-semibold hover:bg-purple-600 transition"
        >
          + Thêm
        </button>
      </div>

      {/* Note List */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {notes.map(note => (
          <div key={note.id} className="flex justify-between items-center p-5 rounded-xl bg-white dark:bg-[#1e293b] border border-slate-100 dark:border-slate-700/50 shadow-sm">
            <div className="flex gap-4 items-start">
              <span className="text-xl mt-1">{note.icon}</span>
              <div>
                <h3 className="font-medium text-[15px]">{note.content}</h3>
                <p className="text-[13px] text-slate-400 mt-1">{note.date}</p>
              </div>
            </div>
            <button
              onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
              className="text-red-400 hover:text-red-600 text-sm font-medium px-3 py-1 bg-red-50 dark:bg-red-900/20 rounded-md transition"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
