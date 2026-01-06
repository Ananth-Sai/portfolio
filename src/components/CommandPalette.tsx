'use client';

import { useEffect, useState, ReactNode, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState<ReactNode | null>(null);
  const [hoveredDesc, setHoveredDesc] = useState<string | null>(null); 
  
  const inputRef = useRef<HTMLInputElement>(null);

  // MANUAL_COMMANDS: Removed /VIPER and /GLITCH for a clean professional baseline
  const manualCommands = [
    { cmd: '/ASK', desc: 'AI_OPERATOR_QUERY', intel: 'Direct uplink to Gemini for portfolio and professional intelligence.' },
    { cmd: '/SOCIALS', desc: 'NETWORK_UPLINKS', intel: 'Display encrypted links to GitHub, LinkedIn, and comms channels.' },
    { cmd: '/RESUME', desc: 'PERSONNEL_DOSSIER', intel: 'Extract and download the official Anantha Sai Valluru master file.' },
    { cmd: '/RESET', desc: 'SYSTEM_STABILIZE', intel: 'Clear terminal logs and stabilize the UI baseline.' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleOpen = () => setIsOpen(true);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-terminal', handleOpen);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-terminal', handleOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setAiResponse(
        `STATUS: [UPLINK_ESTABLISHED]\nLOCATION: UTICA_NODE_NY\nACADEMIC_DATA: ILLINOIS_TECH_CONFIRMED\nSUBJECT: ANANTHA_SAI_VALLURU\nOBJECTIVE: FULL_STACK_AI_INTEGRATION`
      );
    }
  }, [isOpen]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    const cmdLower = cmd.toLowerCase();

    if (cmdLower.startsWith('/ask ')) {
      const question = cmd.substring(5);
      setInput('');
      setAiResponse(null);
      setIsThinking(true);

      try {
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
        });
        const data = await res.json();
        setAiResponse(`> INQUIRY: "${question}"\n\n> RESPONSE: ${data.answer}`);
      } catch (err) {
        setAiResponse(`> ERROR: UPLINK FAILED. CHECK API STATUS.`);
      } finally {
        setIsThinking(false);
      }
      return;
    }

    if (cmdLower === '/socials') {
      setAiResponse(
        <div className="flex flex-col gap-2 font-mono">
          <p className="opacity-50 tracking-tighter">{'>'} UPLINKS_FOUND:</p>
          <a href="https://github.com/Ananth-Sai" target="_blank" className="hover:text-white transition-colors underline decoration-dotted underline-offset-4">GITHUB: GITHUB.COM/ANANTH-SAI</a>
          <a href="https://linkedin.com/in/ananth-valluru" target="_blank" className="hover:text-white transition-colors underline decoration-dotted underline-offset-4">LINKEDIN: LINKEDIN.COM/IN/ANANTH-VALLURU</a>
          <div className="mt-2 pt-2 border-t border-gray-900 flex flex-col gap-1">
             <p className="opacity-50 tracking-tighter">{'>'} COMMS_CHANNELS:</p>
             <p>EMAIL: ananthsai0382@gmail.com</p>
             <p>PHONE: +1 (315)601-8632</p>
          </div>
        </div>
      );
      setInput('');
      return;
    }

    // REMOVED: Hue-rotate and Glitch filter triggers
    if (cmdLower === '/resume') window.open('/resume.pdf', '_blank');
    
    if (cmdLower === '/reset') {
    // Force remove any lingering theme classes just in case
    document.body.classList.remove('theme-viper', 'system-glitch'); //

    setAiResponse(null); //
    setInput(''); //
    setIsOpen(false); //

    window.dispatchEvent(new CustomEvent('kill-feed-notify', { 
      detail: { message: "TERMINAL_STABILIZED", type: "uplink" } 
    }));
}

    setInput('');
  };

  const handleManualClick = (cmd: string) => {
    if (cmd === '/ASK') {
      setInput('/ASK ');
    } else {
      setInput(cmd);
    }
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200000] bg-black/90 backdrop-blur-md flex items-start justify-center pt-[10vh] px-4"
        >
          <motion.div 
            initial={{ y: -20, scale: 0.98 }} animate={{ y: 0, scale: 1 }}
            className="w-full max-w-6xl bg-[#0a0a0c] border border-gray-800 shadow-[0_0_60px_-15px_rgba(255,70,85,0.3)] relative overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            <div className="h-1 w-full bg-[#ff4655]" />

            <div className="grid grid-cols-1 md:grid-cols-5 min-h-[500px]">
              <div className="md:col-span-3 p-10 border-r border-gray-900 relative">
                <form onSubmit={handleCommand}>
                  <div className="flex items-center gap-4 text-[#ff4655] font-mono mb-8">
                    <span className="text-4xl font-black">{'>'}</span>
                    <input 
                      ref={inputRef}
                      autoFocus disabled={isThinking}
                      placeholder={isThinking ? "PROCESSING..." : "COMMAND_REQUEST..."}
                      className="bg-transparent border-none outline-none text-white w-full uppercase tracking-widest text-2xl md:text-4xl font-black placeholder:opacity-20"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                </form>
                
                <AnimatePresence mode="wait">
                  {(isThinking || aiResponse) && (
                    <motion.div 
                      key={isThinking ? 'thinking' : 'response'}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      className="font-mono text-xl text-[#00ff00] border-t border-gray-900 pt-8 tracking-widest leading-relaxed"
                    >
                      {isThinking ? (
                        <span className="animate-pulse flex items-center gap-3">
                          <span className="w-2 h-6 bg-[#00ff00] inline-block"></span>
                          UPLINK_IN_PROGRESS...
                        </span>
                      ) : (
                        typeof aiResponse === 'string' ? <span className="whitespace-pre-wrap">{aiResponse}</span> : aiResponse
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="md:col-span-2 bg-[#0c0c0e]/80 p-10 space-y-10 flex flex-col border-l border-gray-900 relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400 font-black uppercase tracking-[0.5em]">Manual.sys</p>
                    <div className="h-[2px] flex-grow ml-6 bg-gray-800" />
                  </div>

                  <div className="space-y-4">
                    {manualCommands.map((item, index) => (
                      <button 
                        key={item.cmd} 
                        onClick={() => handleManualClick(item.cmd)}
                        onMouseEnter={() => setHoveredDesc(item.intel)}
                        onMouseLeave={() => setHoveredDesc(null)}
                        className="w-full text-left group relative outline-none"
                      >
                        <div className="absolute inset-0 bg-white/[0.03] -skew-x-6 group-hover:bg-[#ff4655]/10 transition-all duration-300" />
                        <div className="relative p-6 flex justify-between items-center border-l-4 border-transparent group-hover:border-[#ff4655] transition-all">
                          <div className="flex flex-col">
                            <span className="text-white text-2xl md:text-3xl font-black italic tracking-tighter group-hover:text-[#ff4655] transition-colors">
                              {item.cmd === '/ASK' ? '/ASK [PROMPT]' : item.cmd}
                            </span>
                            <span className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-[0.2em] mt-2">
                              {item.desc}
                            </span>
                          </div>
                          
                          <AnimatePresence>
                            {hoveredDesc === item.intel && (
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: -20 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="absolute right-full top-1/2 -translate-y-1/2 mr-4 w-64 p-4 
                                           bg-[#0a0a0c]/98 border border-[#ff4655] shadow-[0_0_20px_rgba(255,70,85,0.2)] z-[200]"
                              >
                                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#0a0a0c] border-t border-r border-[#ff4655] rotate-45" />
                                
                                <div className="relative z-10">
                                  <span className="text-[#ff4655] block mb-2 font-black text-[10px] tracking-[0.2em] uppercase opacity-80">
                                    {'>'} Intel_Brief
                                  </span>
                                  <p className="text-gray-200 text-sm font-mono leading-relaxed tracking-tight">
                                    {item.intel}
                                  </p>
                                </div>
                                <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(255,70,85,0.25)_50%)] bg-[length:100%_4px]" />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="flex flex-col items-end opacity-20 group-hover:opacity-100 transition-opacity">
                            <span className="text-lg md:text-xl text-gray-400 font-mono font-bold">
                              0{index + 1}
                            </span>
                            <div className="w-8 h-[2px] bg-gray-600 mt-2" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#ff4655]/50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ff4655]/50 pointer-events-none" />

            <div className="bg-[#15151a] px-6 py-2 border-t border-gray-900 flex justify-between items-center text-[10px] font-mono text-gray-600 tracking-widest">
               <span>ACTIVE_UPLINK_v4.2</span>
               <span>[ESC] TO TERMINATE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}