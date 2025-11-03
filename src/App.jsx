import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TabbedContent from './components/TabbedContent';

function App() {
  const [activeTab, setActiveTab] = useState('editor');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Prefer system dark mode on first load
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
      <Header darkMode={darkMode} onToggleTheme={() => setDarkMode((d) => !d)} />
      <div className="mx-auto mt-4 grid h-[calc(100vh-11rem)] max-w-7xl grid-cols-[240px,1fr] gap-4 px-4 pb-6">
        <Sidebar active={activeTab} onChange={setActiveTab} />
        <div className="flex min-h-0 flex-col gap-3">
          <div className="flex items-center gap-2">
            {['editor', 'flowchart', 'schema', 'logicflow'].map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`rounded-md px-3 py-1.5 text-sm transition ${
                  activeTab === key
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
                }`}
              >
                {key === 'editor' && 'Editor'}
                {key === 'flowchart' && 'Flowchart'}
                {key === 'schema' && 'Schema View'}
                {key === 'logicflow' && 'LogicFlow AI'}
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1 rounded-xl bg-white p-3 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
            <TabbedContent activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
