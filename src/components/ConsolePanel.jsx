import React, { useEffect, useRef } from 'react';

export default function ConsolePanel({ logs }) {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="h-full w-full overflow-auto rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
      {logs.length === 0 ? (
        <div className="text-zinc-500">Console output will appear here…</div>
      ) : (
        logs.map((line, idx) => (
          <pre key={idx} className="whitespace-pre-wrap">
            {line}
          </pre>
        ))
      )}
      <div ref={endRef} />
    </div>
  );
}
