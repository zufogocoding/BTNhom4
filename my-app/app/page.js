'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedNotes = localStorage.getItem('my_notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('my_notes', JSON.stringify(notes));
    }
  }, [notes, isMounted]);

  const addNote = () => {
    if (!inputValue.trim()) return;

    const newNote = {
      id: Date.now().toString(),
      text: inputValue,
      date: new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
    };

    setNotes([newNote, ...notes]);
    setInputValue('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  if (!isMounted) return null;

  return (
    <main className="max-w-4xl mx-auto p-6 min-h-screen">
      <Header noteCount={notes.length} />

      <div className="mt-8 flex gap-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addNote()}
          placeholder="Nhập ghi chú mới..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2A2B36] focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
        <button
          onClick={addNote}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
        >
          + Thêm
        </button>
      </div>

      <div className="mt-8 space-y-3">
        {notes.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Chưa có ghi chú nào.</p>
        ) : (
          notes.map(note => (
            <div
              key={note.id}
              className="flex justify-between items-center p-4 bg-white dark:bg-[#2A2B36] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              <div>
                <p className="font-medium text-[15px]">{note.text}</p>
                <p className="text-[12px] text-gray-400 mt-1">{note.date}</p>
              </div>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium px-2 py-1 transition-colors"
              >
                Xóa
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
