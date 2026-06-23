"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '@/lib/creatives/audioManager';

type CinematicEnterOverlayProps = {
  audioSrc?: string;
  onEnter?: () => void;
};

type EnterState = 'loading' | 'readyToEnter' | 'entered';

export default function CinematicEnterOverlay({ onEnter }: CinematicEnterOverlayProps) {
  const [state, setState] = useState<EnterState>('loading');

  useEffect(() => {
    // Play the loading SFX immediately on mount
    audioManager.playLoader();

    // Show fast rotating saber for 2 seconds, then transition to ready state
    const timer = setTimeout(() => {
      setState('readyToEnter');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleEnterClick = () => {
    if (state !== 'readyToEnter') return;
    setState('entered');

    // Trigger music fade-in immediately inside user click handler
    audioManager.startMusicFadeIn();

    // Call onEnter callback to trigger WebGL and scroll-triggers reveal
    if (onEnter) {
      onEnter();
    }
  };

  return (
    <>
      <AnimatePresence>
        {state !== 'entered' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className={`fixed inset-0 z-[999] flex items-center justify-center bg-transparent select-none`}
            style={{ pointerEvents: state === 'readyToEnter' ? 'auto' : 'none' }}
            onClick={handleEnterClick}
          >
            {/* Center Content Wrapper */}
            <div className="relative z-50 flex items-center justify-center w-full h-full max-w-lg px-6 text-center">
              <AnimatePresence mode="wait">
                {state === 'loading' && (
                  <motion.div
                    key="saber-loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="flex flex-col items-center justify-center"
                  >
                    {/* Saturn-like Ring Animation (Small, central sphere + fast tilted orbiting ring, no guide stroke) */}
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                        <defs>
                          <filter id="glow-saturn-loader" x="-20" y="-20" width="140" height="140" filterUnits="userSpaceOnUse">
                            <feGaussianBlur stdDeviation="3.5" result="blur1" />
                            <feGaussianBlur stdDeviation="7" result="blur2" />
                            <feMerge>
                              <feMergeNode in="blur2" />
                              <feMergeNode in="blur1" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Central Planet Sphere/Dot */}
                        <circle
                          cx="50"
                          cy="50"
                          r="6.5"
                          fill="#ffffff"
                          filter="url(#glow-saturn-loader)"
                          style={{ fill: '#ab71f8' }}
                        />

                        {/* Tilted Saturn Orbit (Outer static group for tilt) */}
                        <g transform="translate(50, 50) rotate(-18) translate(-50, -50)">
                          {/* Inner rotating group */}
                          <motion.g
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                            style={{ transformOrigin: '50px 50px' }}
                          >
                            {/* Ring glowing laser ellipse (purple/magenta) */}
                            <motion.ellipse
                              cx="50"
                              cy="50"
                              rx="30"
                              ry="9"
                              fill="none"
                              stroke="#ab71f8"
                              strokeWidth="2.8"
                              filter="url(#glow-saturn-loader)"
                              style={{
                                strokeDasharray: '35, 120',
                              }}
                              animate={{ strokeDashoffset: [0, -155] }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />

                            {/* Bright white core of the ring */}
                            <motion.ellipse
                              cx="50"
                              cy="50"
                              rx="30"
                              ry="9"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="1.0"
                              style={{
                                strokeDasharray: '20, 135',
                              }}
                              animate={{ strokeDashoffset: [0, -155] }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />
                          </motion.g>
                        </g>
                      </svg>
                    </div>

                    <p className="font-mono text-[9px] tracking-[0.25em] text-[#ab71f8]/60 uppercase mt-2">
                      loading
                    </p>
                  </motion.div>
                )}

                {state === 'readyToEnter' && (
                  <motion.p
                    key="enter-text"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: [0.4, 0.95, 0.4], y: 0 }}
                    transition={{
                      opacity: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
                      y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="font-mono text-xs tracking-[0.16em] text-white uppercase text-center cursor-pointer select-none leading-relaxed"
                    style={{ textShadow: '0 0 10px rgba(171, 113, 248, 0.75)' }}
                  >
                    click anywhere to continue with music
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
