import { useEffect, useState } from 'react';

const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘', '🌹', '✨', '💐'];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const initial = Array.from({ length: 25 }, (_, i) => createHeart(i));
    setHearts(initial);

    const interval = setInterval(() => {
      setHearts(prev => {
        const filtered = prev.filter(h => h.created + h.duration * 1000 > Date.now());
        if (filtered.length < 30) {
          return [...filtered, createHeart(Date.now() + Math.random())];
        }
        return filtered;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  function createHeart(seed) {
    return {
      id: seed,
      symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
      left: Math.random() * 100,
      size: 14 + Math.random() * 28,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.5,
      sway: -50 + Math.random() * 100,
      created: Date.now(),
    };
  }

  return (
    <div className="floating-hearts">
      {hearts.map(h => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
            '--sway': `${h.sway}px`,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
}
