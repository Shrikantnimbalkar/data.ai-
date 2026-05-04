import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, Sparkles, X, ChevronRight, BookOpen, Calculator, PenTool, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getStudyHelp, StudyMessage, quickSolve } from '../services/gemini';
import { cn } from '../lib/utils';

export default function AiTutor() {
  const [messages, setMessages] = useState<StudyMessage[]>([
    { role: 'model', text: "Hello! I'm your Student.AI tutor. What are we studying today? I can help with math, science, history, or even reviewing your essay!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isQuickToolsOpen, setIsQuickToolsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getStudyHelp(input, messages);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const useTool = async (tool: string) => {
    if (!input.trim()) {
      setMessages(prev => [...prev, { role: 'model', text: "Please type a topic or problem first, then click the tool again!" }]);
      setIsQuickToolsOpen(false);
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await quickSolve(tool, input);
      setMessages(prev => [...prev, { role: 'user', text: `Use tool: ${tool} for: ${input}` }, { role: 'model', text: result || "Sorry, I couldn't process that tool request." }]);
      setInput('');
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Tool failed. Please try again." }]);
    } finally {
      setIsLoading(false);
      setIsQuickToolsOpen(false);
    }
  };

  return (
    <div id="ai-tutor" className="flex flex-col h-[700px] w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="bg-brand p-4 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold">Student.AI Assistant</h2>
            <p className="text-xs text-white/70">Always online • AI Powered</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsQuickToolsOpen(!isQuickToolsOpen)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              isQuickToolsOpen ? "bg-white text-brand" : "bg-white/10 hover:bg-white/20"
            )}
          >
            <Sparkles className="w-4 h-4" />
            Study Tools
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/50">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-3 max-w-[85%]",
                  m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                  m.role === 'user' ? "bg-slate-200 text-slate-600" : "bg-brand/10 text-brand"
                )}>
                  {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl shadow-sm",
                  m.role === 'user' ? "bg-brand text-white rounded-tr-none" : "bg-white border border-slate-100 rounded-tl-none"
                )}>
                  <div className={cn("markdown-body", m.role === 'user' ? "text-white prose-invert" : "")}>
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex gap-3 mr-auto max-w-[85%] animate-pulse">
              <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <Loader2 className="w-5 h-5 text-brand animate-spin" />
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none">
                <div className="h-4 w-12 bg-slate-200 rounded"></div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Tools Tray */}
        <AnimatePresence>
          {isQuickToolsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-t border-slate-200 px-4 py-6 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand" />
                  Instant Study Tools
                </h3>
                <button onClick={() => setIsQuickToolsOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'summarize', label: 'Summarize', icon: BookOpen, color: 'text-blue-500' },
                  { id: 'math', label: 'Solve Math', icon: Calculator, color: 'text-emerald-500' },
                  { id: 'flashcards', label: 'Flashcards', icon: PenTool, color: 'text-orange-500' },
                  { id: 'concept', label: 'Explain', icon: Lightbulb, color: 'text-purple-500' },
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => useTool(tool.id)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-brand/30 hover:shadow-md transition-all group"
                  >
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                    <span className="text-xs font-semibold text-slate-600 group-hover:text-brand">{tool.label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                Type your topic below, then click a tool to generate results
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about your studies..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-brand/30 transition-all text-slate-800"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-brand text-white p-3 rounded-full hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 flex justify-center gap-4 text-[10px] text-slate-400 font-medium">
          <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> Literature</span>
          <span className="flex items-center gap-1"><Calculator className="w-3 h-3" /> STEM</span>
          <span className="flex items-center gap-1"><PenTool className="w-3 h-3" /> Writing</span>
        </div>
      </div>
    </div>
  );
}
