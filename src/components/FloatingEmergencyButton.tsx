import React, { useState, useRef, useCallback } from 'react';
import { Phone } from 'lucide-react';

const FloatingEmergencyButton: React.FC = () => {
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 150 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const hasMoved = useRef(false);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    hasMoved.current = false;
    dragStartPos.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  }, [position]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    hasMoved.current = true;
    const buttonSize = 64;
    const newX = Math.max(0, Math.min(window.innerWidth - buttonSize, clientX - dragStartPos.current.x));
    const newY = Math.max(0, Math.min(window.innerHeight - buttonSize, clientY - dragStartPos.current.y));
    
    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse events for desktop testing
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Add global mouse listeners when dragging
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent call if user was dragging
    if (hasMoved.current) {
      e.preventDefault();
    }
  };

  return (
    <a
      ref={buttonRef}
      href="tel:112"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      className="fixed z-[9999] flex items-center justify-center w-16 h-16 bg-red-600 rounded-full shadow-2xl touch-none select-none cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        animation: isDragging ? 'none' : 'emergency-pulse 2s ease-in-out infinite',
        boxShadow: '0 4px 20px rgba(220, 38, 38, 0.5)',
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-label="Emergency Call 112"
      role="button"
    >
      <Phone className="w-8 h-8 text-white" strokeWidth={2.5} />
      
      {/* Pulse ring effect */}
      {!isDragging && (
        <span
          className="absolute inset-0 rounded-full bg-red-500 opacity-0"
          style={{
            animation: 'emergency-ring 2s ease-out infinite',
          }}
        />
      )}
    </a>
  );
};

export default FloatingEmergencyButton;
