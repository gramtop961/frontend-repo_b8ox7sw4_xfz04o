import React from 'react';
import { Home, Code2, GitBranch, Network, Bot } from 'lucide-react';

const items = [
  { key: 'editor', label: 'Editor', icon: Code2 },
  { key: 'flowchart', label: 'Flowchart', icon: GitBranch },
  { key: 'schema', label: 'Schema View', icon: Network },
  { key: 'logicflow', label: 'LogicFlow AI', icon: Bot },
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="flex h-full w-60 flex-col border-r border-zinc-200 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
        <Home size={16} />
        <span>Dashboard</span>
      </div>
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-auto rounded-md border border-dashed border-zinc-300 p-3 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
        Future: add project/files panel here.
      </div>
    </aside>
  );
}
