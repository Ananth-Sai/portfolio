"use client";

import React from 'react';

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#0F1923]">
      {/* 1. Primary Deep Navy Glow (Top Left) */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#121c26]/40 blur-[120px]" />
      
      {/* 2. Tactical Red Ambient Glow (Middle Right) */}
      <div className="absolute top-[30%] right-[-5%] w-[50%] h-[60%] rounded-full bg-[#FF4655]/5 blur-[160px]" />
      
      {/* 3. Bottom Left Neutral Fill */}
      <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[50%] rounded-full bg-[#121c26]/30 blur-[120px]" />
    </div>
  );
}