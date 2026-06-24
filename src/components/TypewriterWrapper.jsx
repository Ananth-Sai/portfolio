'use client'; // This tells Next.js to run this ONLY in the browser

import Typewriter from 'typewriter-effect';

export default function TypewriterWrapper() {
  return (
    <Typewriter
      options={{
        strings: [
          'Full-Stack Web Developer',
          'Master of Computer Science',
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
        delay: 75,
        cursor: '_'
      }}
    />
  );
}