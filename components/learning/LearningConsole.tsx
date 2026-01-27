"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Terminal, Play, RotateCcw, CheckCircle, AlertCircle, 
  ChevronRight, Code2, Cpu, Maximize2, Minimize2 
} from "lucide-react"

export interface LessonStep {
  id: string
  title: string
  instruction: string
  initialCode: string
  hint?: string
  validate: (code: string) => { passed: boolean; error?: string; successMsg?: string }
}

interface LearningConsoleProps {
  title: string
  description: string
  steps: LessonStep[]
  language: "javascript" | "css" | "python"
  onComplete: () => void
  onExit: () => void
}

export function LearningConsole({ 
  title, 
  description, 
  steps, 
  language, 
  onComplete, 
  onExit 
}: LearningConsoleProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState<{type: 'log'|'error'|'success', text: string}[]>([])
  const [isSuccess, setIsSuccess] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  const currentStep = steps[currentStepIdx]
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setCode(currentStep.initialCode)
    setOutput([])
    setIsSuccess(false)
  }, [currentStep])

  const runCode = () => {
    setOutput([{ type: 'log', text: `> Running ${language} check...` }])
    
    // Simulate processing delay
    setTimeout(() => {
      try {
        const result = currentStep.validate(code)
        
        if (result.passed) {
          setOutput(prev => [
            ...prev, 
            { type: 'success', text: result.successMsg || "Test Passed!" }
          ])
          setIsSuccess(true)
        } else {
          setOutput(prev => [
            ...prev, 
            { type: 'error', text: result.error || "Incorrect solution." }
          ])
          setIsSuccess(false)
        }
      } catch (err: any) {
         setOutput(prev => [
            ...prev, 
            { type: 'error', text: `Runtime Error: ${err.message}` }
         ])
      }
    }, 400)
  }

  const nextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className={`flex flex-col w-full bg-[#1e1e1e] text-gray-300 font-mono rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 ${isMaximized ? "fixed inset-4 z-50 h-auto" : "h-[700px] relative"}`}>
      
      {/* Header */}
      <div className="flex-none h-12 bg-[#2d2d2d] border-b border-black/20 flex items-center justify-between px-4 select-none">
        <div className="flex items-center gap-3">
           <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
           </div>
           <div className="h-4 w-px bg-white/10 mx-2" />
           <div className="flex items-center gap-2 text-sm font-bold text-gray-100">
              <Code2 className="w-4 h-4 text-blue-400" />
              {title} <span className="text-gray-500">/</span> Level {currentStepIdx + 1}
           </div>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => setIsMaximized(!isMaximized)} className="hover:text-white transition-colors">
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
           </button>
           <button onClick={onExit} className="text-xs hover:text-red-400 transition-colors">
              EXIT
           </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
        
        {/* Left: Instructions & Context */}
        <div className="w-full md:w-1/3 bg-[#252526] border-r border-black/20 flex flex-col">
            <div className="p-6 flex-1 overflow-y-auto">
                <h3 className="text-xl font-bold text-white mb-2">{currentStep.title}</h3>
                <div className="text-sm leading-relaxed text-gray-400 mb-6 space-y-4">
                    {currentStep.instruction.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
                
                {currentStep.hint && (
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300">
                        <span className="font-bold flex items-center gap-2 mb-1"><AlertCircle className="w-3 h-3" /> HINT</span>
                        {currentStep.hint}
                    </div>
                )}
            </div>

            {/* Progress Footer */}
            <div className="p-4 border-t border-white/5 bg-[#1e1e1e]">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>PROGRESS</span>
                    <span>{Math.round(((currentStepIdx) / steps.length) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-500 transition-all duration-500" 
                        style={{ width: `${((currentStepIdx) / steps.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>

        {/* Right: Editor & Terminal */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
            
            {/* Code Editor Area */}
            <div className="flex-1 relative group">
                <div className="absolute top-0 right-0 p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-[10px] uppercase font-bold text-gray-600 bg-[#2d2d2d] px-2 py-1 rounded border border-white/5">{language}</span>
                </div>
                <textarea 
                    ref={inputRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full bg-[#1e1e1e] text-gray-300 p-6 font-mono text-sm resize-none outline-none leading-relaxed selection:bg-blue-500/30"
                    spellCheck={false}
                />
            </div>

            {/* Terminal Output */}
            <div className="h-48 border-t border-white/10 bg-[#0f0f0f] flex flex-col">
                <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-black/20">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <Terminal className="w-3 h-3" /> Console Output
                    </div>
                    {isSuccess ? (
                        <button 
                            onClick={nextStep}
                            className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded transition-colors animate-in zoom-in"
                        >
                            NEXT LEVEL <ChevronRight className="w-3 h-3" />
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setCode(currentStep.initialCode)}
                                className="p-1 hover:bg-white/10 rounded text-gray-500 transition-colors"
                                title="Reset Code"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                            <button 
                                onClick={runCode}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded transition-colors"
                            >
                                <Play className="w-3 h-3 fill-current" /> RUN CODE
                            </button>
                        </div>
                    )}
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2">
                    {output.length === 0 && (
                        <div className="text-gray-600 italic">Ready to execute...</div>
                    )}
                    {output.map((out, i) => (
                        <div key={i} className={`
                            ${out.type === 'error' ? 'text-red-400' : out.type === 'success' ? 'text-green-400' : 'text-gray-300'}
                        `}>
                            {out.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
