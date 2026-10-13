"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import emailjs from '@emailjs/browser';
import { Reveal } from './Reveal';
import DecryptedText from './DecryptedText';

const emptySubscribe = () => () => {};

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [buttonText, setButtonText] = useState("INITIATE_UPLINK");

  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isHovered, setIsHovered] = useState(false);

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
      .then(() => {
        setButtonText("TRANSMISSION_SUCCESSFUL");

        window.dispatchEvent(new CustomEvent('kill-feed-notify', {
          detail: { message: "MESSAGE DELIVERED", type: "uplink" }
        }));

        form.current?.reset();
        setTimeout(() => setButtonText("INITIATE_UPLINK"), 3000);
      }, () => {
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
                {">"} LET&apos;S CONNECT
              </h3>
              <p className="text-lg text-gray-300 tracking-wide leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Whether you&apos;re hiring for a <span className="text-white font-bold">Full-Stack Developer</span> or <span className="text-white font-bold">AI Engineer</span> role, scaling a production system that needs <span className="text-[#00E5FF] font-medium drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]">React, Next.js, Python, or Node.js</span> expertise, I&apos;m always open to connecting. Backed by a <span className="text-[#F59E0B] font-medium tracking-wide">Master of Computer Science</span> from <span className="text-[#F59E0B] font-bold drop-shadow-[0_0_5px_rgba(245,158,11,0.4)]">Illinois Tech</span>, I bring <span className="text-[#39FF14] font-medium tracking-wide drop-shadow-[0_0_5px_rgba(57,255,20,0.4)]">production-grade engineering</span> to every conversation. Initiate contact through the channels below.
              </p>

              <div className="flex flex-col gap-6 mt-4">
                <div data-interactive="true" className="group relative border border-[#FF4655]/20 p-6 hover:border-[#FF4655]/60 transition-all duration-500 bg-[#0a1219]/90 backdrop-blur-2xl overflow-hidden shadow-[0_4px_18px_-2px_rgba(255,70,85,0.06)]">
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#FF4655]/70 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#FF4655]/70 pointer-events-none" />
                  <p className="text-[#FF4655] font-mono text-xs tracking-[0.3em] uppercase mb-2 opacity-80 group-hover:text-white group-hover:opacity-100 transition-colors">{"// EMAIL_VECTOR"}</p>
                  <a href="mailto:ananthsai0382@gmail.com" className="text-xl text-gray-200 group-hover:text-white transition-colors duration-300 font-mono tracking-widest">
                    ananthsai0382@gmail.com
                  </a>
                </div>
                <div data-interactive="true" className="group relative border border-[#FF4655]/20 p-6 hover:border-[#FF4655]/60 transition-all duration-500 bg-[#0a1219]/90 backdrop-blur-2xl overflow-hidden shadow-[0_4px_18px_-2px_rgba(255,70,85,0.06)]">
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#FF4655]/70 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#FF4655]/70 pointer-events-none" />
                  <p className="text-[#FF4655] font-mono text-xs tracking-[0.3em] uppercase mb-2 opacity-80 group-hover:text-white group-hover:opacity-100 transition-colors">{"// VOICE_COMMS"}</p>
                  <a href="tel:+919100677299" className="text-xl text-gray-200 group-hover:text-white transition-colors duration-300 font-mono tracking-widest">
                    +91 9100-677-299
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
              className="group relative bg-[#0a1219]/90 backdrop-blur-2xl p-8 md:p-10 border border-[#FF4655]/20 transition-all duration-700 overflow-hidden hover:border-[#FF4655]/50 shadow-[0_6px_22px_-4px_rgba(255,70,85,0.07)] hover:shadow-[0_15px_35px_-5px_rgba(255,70,85,0.18)]"
            >
              {/* Tactical HUD Reticles */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FF4655]/70 pointer-events-none z-20" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FF4655]/30 pointer-events-none z-20" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FF4655]/70 pointer-events-none z-20" />

              {/* Ambient Radial Hover Glow */}
              <div 
                className="absolute -top-20 -left-20 w-[350px] h-[350px] z-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100 blur-[120px]"
                style={{ background: 'radial-gradient(circle, rgba(255, 70, 85, 0.12) 0%, transparent 70%)' }}
              />

              <div className="mb-8 border-b border-white/10 pb-4 flex justify-between items-center relative z-10">
                <span className="text-[#FF4655] font-mono text-xs tracking-widest uppercase opacity-80">Secure_Uplink_v2.0</span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-gray-700"></div>
                  <div className="w-2 h-2 rounded-sm bg-gray-700"></div>
                  <div className={`w-2 h-2 rounded-sm ${buttonText === "TRANSMITTING..." ? "bg-[#FFDF00]" : buttonText === "TRANSMISSION_SUCCESSFUL" ? "bg-[#39FF14]" : "bg-[#FF4655]"} animate-pulse transition-colors duration-300`}></div>
                </div>
              </div>

              <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6 relative z-10">
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
                    className="bg-[#060c12] border border-white/10 text-white px-4 py-3.5 focus:outline-none focus:border-[#FF4655] focus:shadow-[0_0_15px_rgba(255,70,85,0.2)] transition-all duration-300 text-sm font-mono uppercase placeholder:opacity-30 tracking-widest"
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
                    className="bg-[#060c12] border border-white/10 text-white px-4 py-3.5 focus:outline-none focus:border-[#FF4655] focus:shadow-[0_0_15px_rgba(255,70,85,0.2)] transition-all duration-300 text-sm font-mono uppercase placeholder:opacity-30 tracking-widest"
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
                    className="bg-[#060c12] border border-white/10 text-white px-4 py-3.5 focus:outline-none focus:border-[#FF4655] focus:shadow-[0_0_15px_rgba(255,70,85,0.2)] transition-all duration-300 resize-none text-sm font-mono uppercase placeholder:opacity-30 tracking-widest"
                    placeholder="DESCRIBE_OBJECTIVE..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`mt-2 w-full py-4 border text-xs tracking-[0.3em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-3
                    ${isHovered
                      ? 'bg-[#FF4655] border-[#FF4655] text-white shadow-[0_0_20px_rgba(255,70,85,0.5)]'
                      : 'bg-transparent border-[#FF4655]/40 text-gray-300 hover:border-[#FF4655]'
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