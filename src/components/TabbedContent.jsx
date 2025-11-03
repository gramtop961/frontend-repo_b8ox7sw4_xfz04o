import React, { useCallback, useMemo, useRef, useState } from 'react';
import ConsolePanel from './ConsolePanel';

const LANGS = [
  { label: 'C', id: 50 },
  { label: 'C++', id: 54 },
  { label: 'Python', id: 71 },
  { label: 'JavaScript (NodeJS)', id: 93 },
  { label: 'Java', id: 91 },
];

function Divider({ onDrag }) {
  const dragging = useRef(false);

  const onMouseDown = () => {
    dragging.current = true;
  };
  const onMouseUp = () => {
    dragging.current = false;
  };
  const onMouseMove = (e) => {
    if (!dragging.current) return;
    onDrag(e.movementX);
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className="mx-1 w-1 cursor-col-resize self-stretch rounded bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600"
      role="separator"
      aria-orientation="vertical"
    />
  );
}

export default function TabbedContent({ activeTab }) {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [code, setCode] = useState('// Start coding here\nconsole.log("Hello from Code Intelligence Studio!")');
  const [stdin, setStdin] = useState('');
  const [language, setLanguage] = useState(LANGS[3].id);
  const [leftWidth, setLeftWidth] = useState(58); // percentage

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setLogs((prev) => [...prev, '⏳ Submitting to compiler service…']);

    try {
      // In a full-stack setup, this would call a backend route that proxies Judge0.
      // For this sandbox, we simulate and avoid exposing keys.
      await new Promise((r) => setTimeout(r, 800));
      setLogs((prev) => [
        ...prev,
        `▶ Language ID: ${language}`,
        `▶ Stdin: ${stdin ? JSON.stringify(stdin) : '(empty)'}`,
        '⚠️ Backend not configured in this sandbox. Wire up /api/compile to enable execution.',
      ]);
    } catch (err) {
      setLogs((prev) => [...prev, `Error: ${String(err)}`]);
    } finally {
      setIsRunning(false);
    }
  }, [language, stdin]);

  const editorView = (
    <div className="flex h-full w-full items-stretch gap-2">
      <div className="flex flex-col" style={{ width: `${leftWidth}%` }}>
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(Number(e.target.value))}
              className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800"
            >
              {LANGS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
            <input
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder="stdin (optional)"
              className="w-56 rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm placeholder-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <button
            onClick={runCode}
            disabled={isRunning}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-white shadow transition ${
              isRunning
                ? 'cursor-not-allowed bg-indigo-400'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isRunning ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                Running…
              </span>
            ) : (
              'Run code'
            )}
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="h-full w-full resize-none rounded-lg border border-zinc-200 bg-white p-3 font-mono text-sm leading-5 text-zinc-800 shadow-sm focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>
      <Divider onDrag={(dx) => setLeftWidth((w) => Math.min(75, Math.max(35, w + dx * 0.2)))} />
      <div className="flex-1">
        <ConsolePanel logs={logs} />
      </div>
    </div>
  );

  const flowchartView = (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
      <p className="mb-2 font-medium text-zinc-800 dark:text-zinc-200">Flowchart (D3.js)</p>
      <p>
        This is a placeholder. Parse the code into an AST and render a directional flowchart here. Include export to
        PNG/SVG.
      </p>
    </div>
  );

  const schemaView = (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
      <p className="mb-2 font-medium text-zinc-800 dark:text-zinc-200">Schema View (Cytoscape.js)</p>
      <p>
        This is a placeholder for a function dependency graph. Identify functions and calls to build nodes and edges.
      </p>
    </div>
  );

  const logicAIView = (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
      <p className="mb-1 font-medium text-zinc-800 dark:text-zinc-200">LogicFlow AI</p>
      <p className="mb-4">Future: Send code to a Hugging Face model to propose optimizations and refactors.</p>
      <button className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm text-white shadow hover:bg-emerald-700 disabled:bg-emerald-400" disabled>
        Optimize with AI (coming soon)
      </button>
    </div>
  );

  const content = useMemo(() => {
    switch (activeTab) {
      case 'editor':
        return editorView;
      case 'flowchart':
        return flowchartView;
      case 'schema':
        return schemaView;
      case 'logicflow':
        return logicAIView;
      default:
        return editorView;
    }
  }, [activeTab, editorView]);

  return <div className="h-full w-full">{content}</div>;
}
