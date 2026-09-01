'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
}

const chars = '-/_X#%&*+=-<>[]{}';

export default function DecryptedText({ 
  text, 
  speed = 50, 
  maxIterations = 10, 
  className = "" 
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
      }

      iteration += 1 / maxIterations;
    }, speed);
  }, [text, speed, maxIterations]);

  useEffect(() => {
    // Initial scramble on mount
    startScramble();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startScramble]);

  return (
    <span 
      className={className}
      onMouseEnter={() => {
        startScramble();
      }}
    >
      {displayText || text}
    </span>
  );
}