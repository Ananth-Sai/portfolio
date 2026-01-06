"use client";

import { useRef, useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { Reveal } from './Reveal';
import DecryptedText from './DecryptedText';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [buttonText, setButtonText] = useState("INITIATE_UPLINK");
  
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonText("TRANSMITTING...");

    if (!form.current) return;

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string, 
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string, 
      form.current, 
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
    )
    .then((result) => {
        setButtonText("TRANSMISSION_SUCCESSFUL");
        
        window.dispatchEvent(new CustomEvent('kill-feed-notify', { 
          detail: { message: "MESSAGE DELIVERED", type: "uplink" } 
        }));
        
        form.current?.reset(); 
        setTimeout(() => setButtonText("INITIATE_UPLINK"), 3000);
    }, (error) => {
        setButtonText("ERROR_CONNECTION_FAILED");
        
        window.dispatchEvent(new CustomEvent('kill-feed-notify', { 
          detail: { message: "UPLINK FAILED", type: "error" } 
        }));
        
        setTimeout(() => setButtonText("INITIATE_UPLINK"), 3000);
    });
  };

  if (!isMounted) {
    return (
      <section id="contact" className="relative z-10 min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-gray-800 bg-[#0F1923]">
        <div className="max-w-6xl w-full opacity-0" />
      </section>
    );
  }

  return (
    <section id="contact" className="relative z-10 min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center border-t border-gray-800 bg-[#0F1923]">
      
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-medium uppercase tracking-widest text-white mb-20 flex items-center gap-4 italic justify-center">
          <span className="text-[#FF4655]">{'>'}</span> <DecryptedText text="SECURE_COMMS" speed={30} maxIterations={3} />
        </h2>
      </Reveal>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-20">

        {/* Left Side: Info */}
        <div className="w-full h-full">
          <Reveal delay={0.2} width="100%">
            <div className="flex flex-col justify-center gap-10 h-full">
              <h3 className="text-3xl md:text-4xl font-medium uppercase tracking-widest text-white italic">
                {'>'} LET'S CONNECT
              </h3>
              <p className="text-lg text-gray-300 tracking-wide leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Whether you have a question regarding my <span className="text-white font-medium">Master of Computer Science</span> background from <span className="text-white font-medium">Illinois Tech</span>, 
                a project opportunity, or want to discuss <span className="text-[#FF4655] font-medium">AI and Web Development</span>, 
                I am always open to connecting from my node in <span className="text-white font-medium">Utica, NY</span>.
              </p>

              <div className="flex flex-col gap-8 mt-4">
                <div data-interactive="true" className="group relative border border-gray-800 p-6 hover:border-[#FF4655]/50 transition-all duration-300 bg-[#15202B] overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 tactical-noise transition-opacity duration-300"></div>
                  <p className="text-[#FF4655] font-mono text-sm tracking-[0.3em] uppercase mb-2 opacity-70 group-hover:text-white group-hover:opacity-100 transition-colors">// EMAIL_VECTOR</p>
                  <a href="mailto:ananthsai0382@gmail.com" className="text-xl text-gray-300 group-hover:text-white transition-colors duration-300 font-mono tracking-widest">
                    ananthsai0382@gmail.com
                  </a>
                </div>
                <div data-interactive="true" className="group relative border border-gray-800 p-6 hover:border-[#FF4655]/50 transition-all duration-300 bg-[#15202B] overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 tactical-noise transition-opacity duration-300"></div>
                  <p className="text-[#FF4655] font-mono text-sm tracking-[0.3em] uppercase mb-2 opacity-70 group-hover:text-white group-hover:opacity-100 transition-colors">// VOICE_COMMS</p>
                  <a href="tel:3156018632" className="text-xl text-gray-300 group-hover:text-white transition-colors duration-300 font-mono tracking-widest">
                    +1 (315) 601-8632
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Terminal Form */}
        <div className="w-full h-full">
          <Reveal delay={0.4} width="100%">
            <div 
              data-interactive="true"
              className="group relative bg-[#15202B] p-8 md:p-10 border border-gray-800 transition-all duration-500 overflow-hidden hover:border-[#FF4655]"
            >
              {/* Tactical Brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FF4655] z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FF4655] z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FF4655] z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FF4655] z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 tactical-noise transition-opacity duration-300"></div>

              <div className="mb-8 border-b border-gray-800 pb-4 flex justify-between items-center">
                <span className="text-[#FF4655] font-mono text-xs tracking-widest uppercase opacity-70">Secure_Uplink_v2.0</span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-gray-700"></div>
                  <div className="w-2 h-2 rounded-sm bg-gray-700"></div>
                  <div className={`w-2 h-2 rounded-sm ${buttonText === "TRANSMITTING..." ? "bg-[#FFDF00]" : buttonText === "TRANSMISSION_SUCCESSFUL" ? "bg-[#39FF14]" : "bg-[#FF4655]"} animate-pulse transition-colors duration-300`}></div>
                </div>
              </div>

              <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-8 relative z-10">
                <div className="flex flex-col gap-2 relative group/input">
                  <label htmlFor="user_name" className="text-[#FF4655] font-mono tracking-[0.2em] uppercase text-xs opacity-80 transition-opacity group-focus-within/input:text-white">
                    {'>'} IDENT_NAME
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    id="user_name" 
                    required
                    autoComplete="off"
                    className="bg-[#0F1923] border border-gray-700 text-white px-4 py-4 focus:outline-none focus:border-[#FF4655] focus:shadow-[0_0_15px_rgba(255,70,85,0.2)] transition-all duration-300 text-base font-mono uppercase placeholder:opacity-30 tracking-widest" 
                    placeholder="ENTER_NAME..." 
                  />
                </div>

                <div className="flex flex-col gap-2 relative group/input">
                  <label htmlFor="user_email" className="text-[#FF4655] font-mono tracking-[0.2em] uppercase text-xs opacity-80 transition-opacity group-focus-within/input:text-white">
                    {'>'} UPLINK_ADDR
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    id="user_email" 
                    required
                    autoComplete="off"
                    className="bg-[#0F1923] border border-gray-700 text-white px-4 py-4 focus:outline-none focus:border-[#FF4655] focus:shadow-[0_0_15px_rgba(255,70,85,0.2)] transition-all duration-300 text-base font-mono uppercase placeholder:opacity-30 tracking-widest" 
                    placeholder="EMAIL_ADDRESS..." 
                  />
                </div>

                <div className="flex flex-col gap-2 relative group/input">
                  <label htmlFor="message" className="text-[#FF4655] font-mono tracking-[0.2em] uppercase text-xs opacity-80 transition-opacity group-focus-within/input:text-white">
                    {'>'} INTEL_PACKET
                  </label>
                  <textarea 
                    name="message"
                    id="message" 
                    required
                    rows={4} 
                    className="bg-[#0F1923] border border-gray-700 text-white px-4 py-4 focus:outline-none focus:border-[#FF4655] focus:shadow-[0_0_15px_rgba(255,70,85,0.2)] transition-all duration-300 resize-none text-base font-mono uppercase placeholder:opacity-30 tracking-widest" 
                    placeholder="DESCRIBE_OBJECTIVE..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`mt-4 w-full py-5 border text-sm tracking-[0.3em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-3
                    ${isHovered 
                      ? 'bg-[#FF4655] border-[#FF4655] text-white shadow-[0_0_20px_rgba(255,70,85,0.5)]' 
                      : 'bg-transparent border-gray-600 text-gray-400'
                    }`}
                >
                  <span className={`${isHovered ? 'animate-pulse text-white' : 'text-[#FF4655]'}`}>{'>'}</span> 
                  {buttonText}
                </button>
              </form>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}