import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  BookOpen, 
  Calculator, 
  PenTool, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  BrainCircuit,
  MessageSquare,
  ShieldCheck,
  Github,
  ChevronDown
} from 'lucide-react';
import AiTutor from './components/AiTutor';
import { cn } from './lib/utils';

export default function App() {
  const [view, setView] = useState<'home' | 'tutor'>('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSupport = async () => {
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'user@example.com', timestamp: new Date().toISOString() })
      });
      const data = await response.json();
      alert(data.message);
    } catch (err) {
      alert('Thanks for your interest! We will contact you soon.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="bg-brand p-1.5 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">Student.AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <button onClick={() => scrollTo('features')} className="hover:text-brand transition-colors">Features</button>
            <button onClick={() => scrollTo('footer')} className="hover:text-brand transition-colors">Support</button>
            <button 
              onClick={() => setView('tutor')}
              className="text-slate-800 bg-slate-100 px-4 py-2 rounded-full hover:bg-slate-200 transition-all font-semibold"
            >
              Open Tutor
            </button>
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="bg-brand text-white px-6 py-2 rounded-full hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {view === 'home' ? (
          <>
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 bg-indigo-50 text-brand px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-indigo-100"
                  >
                    <Sparkles className="w-4 h-4" />
                    Trusted by 50,000+ Students Worldwide
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]"
                  >
                    Master any subject with your <span className="text-brand">AI Tutor.</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-slate-600 mb-10 leading-relaxed"
                  >
                    Get instant help with complex problems, writing, and research. 
                    Your personal academic companion that's always ready to help you succeed.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  >
                    <button 
                      onClick={() => setView('tutor')}
                      className="w-full sm:w-auto bg-brand text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-brand-dark transition-all shadow-xl shadow-brand/30 flex items-center justify-center gap-2"
                    >
                      Start Studying Now
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => { setView('tutor'); }}
                      className="w-full sm:w-auto bg-white text-slate-800 border border-slate-200 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all"
                    >
                      Watch Demo
                    </button>
                  </motion.div>
                </div>

                {/* Hero UI Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-16 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/50 bg-white/20 backdrop-blur-sm p-4"
                >
                  <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent"></div>
                    <AiTutor />
                  </div>
                </motion.div>
              </div>

              {/* Background Accents */}
              <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full"></div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-sm font-bold text-brand uppercase tracking-widest mb-4">Powered by Advanced AI</h2>
                  <p className="text-4xl font-bold text-slate-900">Built for every study scenario</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Calculator,
                      title: "STEM Solution Guide",
                      desc: "Break down complex math and physics problems into simple, easy-to-follow steps.",
                      color: "bg-blue-100 text-blue-600"
                    },
                    {
                      icon: PenTool,
                      title: "Essay & Writing Coach",
                      desc: "Get structural feedback, grammar suggestions, and help with citations.",
                      color: "bg-emerald-100 text-emerald-600"
                    },
                    {
                      icon: BrainCircuit,
                      title: "Concept Clarifier",
                      desc: "Struggling with a theory? Get personalized explanations and analogies.",
                      color: "bg-purple-100 text-purple-600"
                    }
                  ].map((feat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      onClick={() => setView('tutor')}
                      className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all cursor-pointer"
                    >
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", feat.color)}>
                        <feat.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">{feat.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Trust Markers */}
            <section className="py-16 border-y border-slate-100 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-8 opacity-60">
                <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all font-bold text-2xl cursor-default">
                  <ShieldCheck className="w-8 h-8 text-slate-400" /> SafeStudy
                </div>
                <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all font-bold text-2xl cursor-default">
                  <GraduationCap className="w-8 h-8 text-slate-400" /> EduLevel
                </div>
                <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all font-bold text-2xl cursor-default">
                  <BookOpen className="w-8 h-8 text-slate-400" /> OpenLearn
                </div>
                <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all font-bold text-2xl cursor-default">
                  <CheckCircle2 className="w-8 h-8 text-slate-400" /> VerifiedAI
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer id="footer" className="bg-slate-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
                  <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                      <div className="bg-brand p-1.5 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xl font-bold tracking-tight">Student.AI</span>
                    </div>
                    <p className="text-slate-400 max-w-sm mb-6">
                      Building the future of personalized education through ethical AI. 
                      Helping students master the knowledge they need to change the world.
                    </p>
                    <div className="flex gap-4">
                      <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors cursor-pointer">
                        <Github className="w-5 h-5" />
                      </a>
                      <button onClick={handleSupport} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors cursor-pointer">
                        <MessageSquare className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-6">Product</h4>
                    <ul className="space-y-4 text-slate-400 text-sm">
                      <li><button onClick={() => setView('tutor')} className="hover:text-white transition-colors">Study Hub</button></li>
                      <li><button onClick={() => setView('tutor')} className="hover:text-white transition-colors">AI Tutor</button></li>
                      <li><button onClick={() => setIsAuthOpen(true)} className="hover:text-white transition-colors">Mobile App</button></li>
                      <li><button onClick={() => setIsAuthOpen(true)} className="hover:text-white transition-colors">Chrome Extension</button></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-6">Support</h4>
                    <ul className="space-y-4 text-slate-400 text-sm">
                      <li><button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">Documentation</button></li>
                      <li><button onClick={() => setIsAuthOpen(true)} className="hover:text-white transition-colors">Academic Integrity</button></li>
                      <li><button onClick={() => scrollTo('footer')} className="hover:text-white transition-colors">Help Center</button></li>
                      <li><button onClick={() => setIsAuthOpen(true)} className="hover:text-white transition-colors">Contact Us</button></li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                  <p>© 2026 Student.AI. All rights reserved.</p>
                  <div className="flex gap-6">
                    <button onClick={() => setIsAuthOpen(true)} className="hover:text-white transition-colors">Privacy Policy</button>
                    <button onClick={() => setIsAuthOpen(true)} className="hover:text-white transition-colors">Terms of Service</button>
                    <button onClick={() => setIsAuthOpen(true)} className="hover:text-white transition-colors">Cookie Policy</button>
                  </div>
                </div>
              </div>
            </footer>

            {/* Simple Auth Modal Placeholder */}
            {isAuthOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
                >
                  <button onClick={() => setIsAuthOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
                    <CheckCircle2 className="w-6 h-6 rotate-45" />
                  </button>
                  <div className="text-center mb-8">
                    <div className="bg-brand/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-8 h-8 text-brand" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Join Student.AI</h2>
                    <p className="text-slate-500">Unlock your full potential today.</p>
                  </div>
                  <div className="space-y-4">
                    <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all">
                      Continue with Google
                    </button>
                    <button className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand/20">
                      Create Account
                    </button>
                  </div>
                  <p className="mt-6 text-center text-sm text-slate-400">
                    Already have an account? <button className="text-brand font-bold">Log in</button>
                  </p>
                </motion.div>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-64px)] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Study Hub</h1>
                <p className="text-slate-500">Your distraction-free AI learning environment</p>
              </div>
              <button 
                onClick={() => setView('home')}
                className="text-slate-500 hover:text-brand font-medium flex items-center gap-2 group transition-all"
              >
                <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Exit to Home
              </button>
            </div>
            <div className="flex-1 overflow-hidden pb-8">
              <AiTutor />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
