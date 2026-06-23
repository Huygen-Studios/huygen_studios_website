"use client";
import React from 'react';

export default function LiquidGlass({
  className = '',
  children,
  blur = 16,
  color = 'white',
  background = null,
  freeze = false,
  button = false,
  inline = false,
}) {
  const Tag = inline ? 'span' : 'div';
  
  const glassClasses = `
    relative overflow-hidden group
    ${button ? 'transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-white/10 cursor-pointer inline-block' : ''}
    ${className}
  `;

  // Refined liquid glass colors
  const bgColor = color === 'black' 
    ? 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1))' 
    : color === 'white' 
      ? 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.01))' 
      : 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))';

  return (
    <Tag className={glassClasses} style={{
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    }}>
      {/* Glossy top edge highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-20"></div>
      
      {/* Background layer to hold the liquid and blur effects */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none rounded-inherit"
        style={{
          background: bgColor,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          // High quality glossy border
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.4), inset 0 -1px 1px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Animated background spin */}
        {background && !freeze && (
          <div 
            className="absolute inset-0 opacity-30 mix-blend-overlay animate-spin duration-[20s]"
            style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}
          />
        )}
      </div>

      <div className="relative z-10">
        {children}
      </div>
      
      {/* Hover glow effect for button */}
      {button && (
        <div className="absolute inset-0 z-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none rounded-inherit"></div>
      )}
    </Tag>
  );
}
