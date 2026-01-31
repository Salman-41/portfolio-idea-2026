"use client";

import { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Search,
  Database,
  ShieldAlert,
  ChevronLeft,
  Send,
  FileText,
  User,
  Briefcase,
  CheckCircle,
  BarChart3,
  AlertTriangle,
  FolderOpen,
  ChevronRight,
  Play,
  Lock,
  ChevronDown,
} from "lucide-react";
import { ALL_CASES } from "./detective-cases";
import { Case, DatabaseSchema, Row } from "./detective-cases/types";
import gsap from "gsap";

interface DataDetectiveGameProps {
  onBack: () => void;
}

import { executeQuery } from "./detective-cases/sql-engine";

export function DataDetectiveGame({ onBack }: DataDetectiveGameProps) {
  const [activeCase, setActiveCase] = useState<Case | null>(null);

  // Game State
  const [history, setHistory] = useState<{ query: string; result: any }[]>([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [gameStatus, setGameStatus] = useState<
    "SELECT" | "BRIEFING" | "PLAYING" | "VICTORY" | "FAILED" | "STAGE_COMPLETE"
  >("SELECT");
  const [feedback, setFeedback] = useState("");

  // Multi-Stage State
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const selectCase = (c: Case) => {
    setActiveCase(c);
    setCurrentStageIndex(0);
    setGameStatus("BRIEFING");
    setHistory([]);
    setCurrentQuery("");
    setFeedback("");
  };

  const currentStage = activeCase?.stages[currentStageIndex];

  const nextStage = () => {
    if (!activeCase) return;

    if (currentStageIndex < activeCase.stages.length - 1) {
      setCurrentStageIndex((prev) => prev + 1);
      setGameStatus("PLAYING");
      // Clear history for clean slate? keep it? Let's keep it for context.
      setHistory((prev) => [
        ...prev,
        {
          query: "--- PHASE COMPLETE ---",
          result: { cols: [], rows: [], error: "Next phase initiated..." },
        },
      ]);
    } else {
      setGameStatus("VICTORY");
    }
  };

  const runQuery = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!currentQuery.trim() || !activeCase || !currentStage) return;

    const res = executeQuery(currentQuery, activeCase.db);
    setHistory((prev) => [...prev, { query: currentQuery, result: res }]);
    setCurrentQuery("");

    // Check Win Condition for non-accusation stages
    if (!currentStage.accuseTargetId && currentStage.winCondition) {
      if (currentStage.winCondition(currentQuery, res)) {
        // Flash success
        setTimeout(() => {
          if (currentStageIndex < activeCase.stages.length - 1) {
            setGameStatus("STAGE_COMPLETE");
          } else {
            setGameStatus("VICTORY");
          }
        }, 800);
      }
    }
  };

  const handleAccusation = (suspect: any) => {
    if (
      currentStage?.accuseTargetId &&
      Number(suspect.id) === currentStage.accuseTargetId
    ) {
      if (currentStageIndex < (activeCase?.stages.length || 0) - 1) {
        setGameStatus("STAGE_COMPLETE");
      } else {
        setGameStatus("VICTORY");
      }
    } else {
      setGameStatus("FAILED");
      setFeedback(
        "Incorrect Suspect. Intelligence does not support this conclusion.",
      );
    }
  };

  const quitCase = () => {
    setActiveCase(null);
    setGameStatus("SELECT");
  };

  // --- RENDER: CASE SELECTION ---
  if (gameStatus === "SELECT" || !activeCase) {
    return (
      <div className="w-full bg-background/50 backdrop-blur-sm text-cyan-500 font-mono relative rounded-2xl border border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />

        <div className="p-8 md:p-12 pb-0 z-10 relative">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-700 hover:text-cyan-400 mb-8"
          >
            <ChevronLeft className="w-4 h-4" /> Return to About
          </button>
          <h1 className="text-5xl md:text-7xl font-black text-foreground uppercase tracking-tighter mb-4">
            Case <span className="stroke-text-1 text-transparent">Files</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Select a training simulation to begin. Each case contains multiple
            phases of investigation.
          </p>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
          {ALL_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => selectCase(c)}
              className="group relative h-80 bg-foreground/5 border border-border/50 hover:border-cyan-500/50 rounded-2xl p-8 text-left transition-all hover:bg-cyan-500/5 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FolderOpen className="w-32 h-32 rotate-12" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-background/60 border border-border/50 text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-4">
                  {c.difficulty}
                </div>
                <h3 className="text-3xl font-black text-foreground uppercase leading-none mb-4">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-cyan-700 group-hover:text-cyan-400 transition-colors mt-4">
                Initialize Protocol{" "}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!currentStage) return null;

  // --- RENDER: ACTIVE GAME ---
  return (
    <div className="w-full bg-background/50 backdrop-blur-sm text-cyan-500 font-mono relative rounded-2xl border border-border/50 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] opacity-20" />

      {/* --- HEADER --- */}
      <header className="border-b border-border/50 flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:px-8 gap-4 bg-background/70 backdrop-blur-md z-40 relative">
        <div className="flex items-center gap-6">
          <button
            onClick={quitCase}
            className="text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-widest flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Abort
          </button>
          <div className="h-6 w-px bg-border/50 hidden md:block" />
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-cyan-400 animate-pulse" />
            <div>
              <div className="text-xs text-cyan-700 font-bold uppercase tracking-widest">
                Phase {currentStageIndex + 1} / {activeCase.stages.length}
              </div>
              <div className="text-foreground text-sm font-bold uppercase tracking-tighter max-w-[300px] truncate">
                {currentStage.title}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>AVAILABLE TABLES:</span>
          {Object.keys(activeCase.db).map((bucket) => (
            <span
              key={bucket}
              className="px-2 py-1 bg-foreground/5 border border-border/50 rounded text-cyan-300 font-mono"
            >
              {bucket}
            </span>
          ))}
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <div className="flex flex-col lg:flex-row">
        {/* LEFT: TERMINAL */}
        <div className="flex-[2] flex flex-col border-b lg:border-b-0 lg:border-r border-border/50 bg-background/60 relative">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

          <div
            ref={terminalRef}
            className="p-6 md:p-8 space-y-8 font-mono text-sm relative z-10 transition-all min-h-[400px]"
          >
            <div className="opacity-50 space-y-1">
              <p>{">"} CONNECTING TO MAIN_FRAME...</p>
              <p>{">"} ENCRYPTION KEY: VALID</p>
              <p>{">"} UPLOADING STAGE DATA...</p>
            </div>

            {history.map((entry, idx) => (
              <div
                key={idx}
                className="space-y-3 animate-in fade-in slide-in-from-left-4 duration-300"
              >
                <div className="flex items-center gap-3 text-cyan-200">
                  <span className="text-pink-500 font-bold">{">"}</span>
                  <span className="text-lg">{entry.query}</span>
                </div>

                {entry.result.rows.length > 0 &&
                  Object.values(entry.result.rows[0]).some(
                    (v) => typeof v === "number",
                  ) && (
                    <div className="mt-4 p-4 border border-border/50 rounded bg-background/60">
                      <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <BarChart3 className="w-3 h-3" />
                        Data Visualization Detected
                      </div>
                      <div className="flex items-end gap-2 h-32 w-full pb-2 border-b border-border/50">
                        {entry.result.rows
                          .slice(0, 10)
                          .map((row: Row, rIdx: number) => {
                            // Heuristic: Find first number col for height, first string col for label
                            const numKey = Object.keys(row).find(
                              (k) => typeof row[k] === "number",
                            );
                            const strKey = Object.keys(row).find(
                              (k) => typeof row[k] === "string",
                            );

                            const val = numKey ? Number(row[numKey]) : 0;
                            // Normalize height relative to max in set
                            const maxVal = Math.max(
                              ...entry.result.rows.map((r: Row) =>
                                Number(r[numKey!] || 0),
                              ),
                            );
                            const heightPct =
                              maxVal > 0 ? (val / maxVal) * 100 : 0;

                            return (
                              <div
                                key={rIdx}
                                className="flex-1 flex flex-col justify-end group relative"
                              >
                                <div
                                  className="w-full bg-cyan-500/20 border-t border-cyan-400 group-hover:bg-cyan-400/40 transition-all relative"
                                  style={{ height: `${heightPct}%` }}
                                >
                                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-background px-1 rounded border border-border/50">
                                    {val} ({(numKey || "").toUpperCase()})
                                  </div>
                                </div>
                                <div className="mt-2 text-[10px] text-center text-muted-foreground truncate w-full">
                                  {strKey
                                    ? String(row[strKey]).substring(0, 4)
                                    : `#${rIdx}`}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                {entry.result.error ? (
                  <div className="inline-block px-4 py-2 bg-red-950/30 border-l-2 border-red-500 text-red-400 font-bold text-xs">
                    ERROR: {entry.result.error}
                  </div>
                ) : entry.result.rows.length === 0 ? (
                  <div className="text-yellow-500/50 italic">
                    -- No records found --
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-border/50 rounded bg-foreground/5">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-border/50 bg-foreground/5 text-cyan-100">
                          {entry.result.cols.map((col: string) => (
                            <th
                              key={col}
                              className="py-2 px-4 uppercase tracking-wider opacity-70"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {entry.result.rows.map((row: Row, rIdx: number) => (
                          <tr
                            key={rIdx}
                            className="hover:bg-cyan-500/10 border-b border-white/5 last:border-0 transition-colors"
                          >
                            {entry.result.cols.map((col: string) => (
                              <td
                                key={col}
                                className="py-2 px-4 text-cyan-400 font-mono border-r border-white/5 last:border-0"
                              >
                                {String(row[col])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} className="h-10" />
          </div>

          <form
            onSubmit={runQuery}
            className="border-t border-border/50 bg-background flex items-center px-6 py-4 gap-4"
          >
            <span className="text-pink-500 font-bold animate-pulse">
              {">_"}
            </span>
            <input
              type="text"
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              placeholder="SELECT * FROM..."
              className="flex-1 bg-transparent border-none outline-none text-cyan-100 placeholder:text-cyan-900 font-mono text-lg"
              autoFocus
            />
          </form>
        </div>

        {/* RIGHT: INTEL PANEL */}
        <div className="lg:w-[400px] bg-cyan-950/5 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col">
          {/* Mission Card */}
          <div className="p-6 border-b border-border/50 space-y-4 bg-gradient-to-b from-cyan-900/10 to-transparent">
            <div className="flex items-center gap-2 text-foreground font-bold uppercase tracking-widest text-xs">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              Current Directive
            </div>
            <div className="p-4 bg-background/60 border border-cyan-500/20 rounded-lg text-sm leading-relaxed text-cyan-100 shadow-[0_0_30px_rgba(8,145,178,0.1)]">
              <h3 className="text-cyan-400 font-bold mb-2 uppercase">
                {currentStage.title}
              </h3>
              <p className="opacity-80">{currentStage.desc}</p>
              <div className="mt-4 pt-4 border-t border-border/50">
                <span className="text-xs text-yellow-500 font-mono uppercase">
                  Hint:
                </span>
                <span className="ml-2 text-xs text-yellow-500/70 font-mono">
                  {currentStage.hint}
                </span>
              </div>
            </div>
          </div>

          {/* Database Tables / Suspects */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-foreground font-bold uppercase tracking-widest text-xs">
                <Database className="w-4 h-4 text-cyan-400" />
                Global Entities
              </div>
            </div>

            <div className="grid gap-3">
              {/* We iterate through all tables to find 'suspects' or 'citizens' or similar entities */}
              {(activeCase.db.suspects || activeCase.db.citizens || []).map(
                (s: any) => (
                  <div
                    key={s.id}
                    className="group p-4 bg-foreground/5 border border-border/30 hover:border-cyan-500 transition-all rounded hover:bg-cyan-900/10"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-foreground font-bold font-mono">
                          {s.name}
                        </div>
                        <div className="text-xs text-cyan-600 uppercase tracking-wider">
                          {s.role || s.status} • ID {s.id}
                        </div>
                      </div>
                      {currentStage.accuseTargetId && (
                        <button
                          onClick={() => handleAccusation(s)}
                          className="opacity-0 group-hover:opacity-100 px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded transition-all transform hover:scale-105"
                        >
                          Indict
                        </button>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* BRIEFING MODAL */}
      {gameStatus === "BRIEFING" && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex items-center justify-center p-8">
          <div className="max-w-2xl w-full space-y-8 text-center animate-in zoom-in-95 duration-500">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-400 mb-4 animate-pulse">
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-black text-foreground uppercase tracking-tighter">
              {currentStage.title}
            </h1>
            <div className="bg-foreground/5 border border-border/50 p-8 rounded-2xl text-lg leading-relaxed text-cyan-100 max-w-xl mx-auto">
              {currentStage.desc}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={onBack}
                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-muted-foreground uppercase tracking-widest text-sm rounded transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setGameStatus("PLAYING")}
                className="px-12 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest text-xl rounded transition-all transform hover:scale-105"
              >
                Start Phase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE COMPLETE MODAL */}
      {gameStatus === "STAGE_COMPLETE" && (
        <div className="fixed inset-0 z-[60] bg-cyan-950/90 backdrop-blur-xl flex items-center justify-center p-8">
          <div className="max-w-xl w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
            <CheckCircle className="w-24 h-24 text-cyan-400 mx-auto" />
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter">
              Phase Complete
            </h1>
            <p className="text-cyan-300 text-xl">
              Intel secured. Proceeding to next phase.
            </p>

            <button
              onClick={nextStage}
              className="mt-8 px-12 py-4 bg-white text-black font-black uppercase tracking-widest text-xl rounded hover:bg-gray-200 transition-all"
            >
              Next Phase
            </button>
          </div>
        </div>
      )}

      {/* VICTORY MODAL */}
      {gameStatus === "VICTORY" && (
        <div className="fixed inset-0 z-[60] bg-green-950/90 backdrop-blur-xl flex items-center justify-center p-8">
          <div className="max-w-xl w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
            <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter">
              Case Closed
            </h1>
            <p className="text-green-300 text-xl">
              All phases cleared. Excellent work, Detective.
            </p>

            <button
              onClick={quitCase}
              className="mt-8 px-12 py-4 bg-white text-black font-black uppercase tracking-widest text-xl rounded hover:bg-gray-200 transition-all"
            >
              Return to Case Files
            </button>
          </div>
        </div>
      )}

      {/* FAILURE MODAL */}
      {gameStatus === "FAILED" && (
        <div className="fixed inset-0 z-[60] bg-red-950/90 backdrop-blur-xl flex items-center justify-center p-8">
          <div className="max-w-xl w-full text-center space-y-6 animate-in shake duration-300">
            <AlertTriangle className="w-24 h-24 text-red-500 mx-auto" />
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter">
              Mission Failed
            </h1>
            <p className="text-red-300 text-xl">{feedback}</p>

            <button
              onClick={() => {
                setGameStatus("PLAYING");
                setFeedback("");
              }}
              className="mt-8 px-12 py-4 border border-red-500 text-red-500 font-black uppercase tracking-widest text-xl rounded hover:bg-red-500 hover:text-white transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
