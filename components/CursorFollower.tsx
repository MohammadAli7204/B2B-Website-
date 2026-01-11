
import React, { useEffect, useRef, useState } from 'react';

const CursorFollower: React.FC = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const currentScale = useRef(1);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('button, a, input, select, textarea, [role="button"], .interactive');
      if (isInteractive !== isHovering) {
        setIsHovering(isInteractive);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    
    const animate = () => {
      const { x: targetX, y: targetY } = mousePos.current;
      const { x: currentX, y: currentY } = followerPos.current;

      // Precision Dot: Absolute zero-lag tracking
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      // Follower Ring: Tighter interpolation (lerp) for improved accuracy
      // 0.35 provides a snappier follow-through while maintaining the premium smoothness
      const lerpFactor = 0.35; 
      followerPos.current.x += (targetX - currentX) * lerpFactor;
      followerPos.current.y += (targetY - currentY) * lerpFactor;

      // Handle scaling purely in JS to avoid CSS transition lag/fights
      const targetScale = isHovering ? 1.6 : 1;
      currentScale.current += (targetScale - currentScale.current) * 0.2;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) scale(${currentScale.current})`;
      }

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, [isHovering, isVisible]);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Outer Follower Ring - No CSS transform transition to ensure frame-perfect accuracy */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 w-10 h-10 border border-red-500 rounded-full pointer-events-none z-[9999] transition-opacity duration-300 flex items-center justify-center ${isVisible ? 'opacity-40' : 'opacity-0'}`}
        style={{ 
          margin: '-20px 0 0 -20px', 
          willChange: 'transform',
          // Only transition the opacity; transform is handled by JS for accuracy
          transition: 'opacity 300ms ease'
        }}
      >
        <div className={`w-full h-full rounded-full bg-red-500 transition-opacity duration-300 ${isHovering ? 'opacity-10' : 'opacity-0'}`} />
      </div>
      
      {/* Central Precision Dot */}
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-red-600 rounded-full pointer-events-none z-[10000] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          margin: '-3px 0 0 -3px', 
          willChange: 'transform',
          transition: 'opacity 300ms ease'
        }}
      />
    </>
  );
};

export default CursorFollower;
