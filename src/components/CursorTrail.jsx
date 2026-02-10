import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const containerRef = useRef(null);
  const throttleRef = useRef(0);

  useEffect(() => {
    const symbols = ['✨', '💖', '💕', '✨', '💗', '✨'];
    let idx = 0;

    const handleMove = (e) => {
      const now = Date.now();
      if (now - throttleRef.current < 60) return;
      throttleRef.current = now;

      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      if (x == null || y == null) return;

      const el = document.createElement('span');
      el.className = 'trail-particle';
      el.textContent = symbols[idx++ % symbols.length];
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      containerRef.current?.appendChild(el);

      // Remove after animation completes
      setTimeout(() => el.remove(), 800);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return <div ref={containerRef} className="cursor-trail" />;
}
