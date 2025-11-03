import React from 'react';
import Spline from '@splinetool/react-spline';
import { Moon, Sun, Rocket } from 'lucide-react';

export default function Header({ darkMode, onToggleTheme }) {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-b-xl border border-zinc-200 bg-white/60 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent dark:from-zinc-900/80 dark:via-zinc-900/30" />

      <div className="relative z-10 flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md">
            <Rocket size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Code Intelligence Studio
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Compile • Visualize • Evolve
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white/70 px-3 py-2 text-sm text-zinc-800 shadow-sm transition hover:bg-white dark:border-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
        </button>
      </div>
    </div>
  );
}
