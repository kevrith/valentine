import { useEffect, useState } from 'react';

const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
  '#ffd700', '#ff6b6b', '#ee5a24', '#f8b500', '#ff4757', '#e84393'];
const shapes = ['circle', 'square', 'heart'];

export default function Confetti({ active }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) return;

    const burst = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: 6 + Math.random() * 10,
      angle: Math.random() * 360,
      velocity: 3 + Math.random() * 8,
      spin: -5 + Math.random() * 10,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 3,
    }));

    setParticles(burst);

    // Second burst
    const timer = setTimeout(() => {
      const burst2 = Array.from({ length: 100 }, (_, i) => ({
        id: i + 200,
        x: 50 + (Math.random() - 0.5) * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: 6 + Math.random() * 10,
        angle: Math.random() * 360,
        velocity: 2 + Math.random() * 6,
        spin: -5 + Math.random() * 10,
        delay: Math.random() * 0.3,
        duration: 2 + Math.random() * 3,
      }));
      setParticles(prev => [...prev, ...burst2]);
    }, 600);

    return () => clearTimeout(timer);
  }, [active]);

  if (!active) return null;

  return (
    <div className="confetti-container">
      {particles.map(p => (
        <div
          key={p.id}
          className={`confetti-particle confetti-${p.shape}`}
          style={{
            left: `${p.x}%`,
            backgroundColor: p.shape !== 'heart' ? p.color : undefined,
            color: p.shape === 'heart' ? p.color : undefined,
            width: `${p.size}px`,
            height: p.shape === 'circle' ? `${p.size}px` : `${p.size * 1.2}px`,
            '--angle': `${p.angle}deg`,
            '--velocity': p.velocity,
            '--spin': `${p.spin * 360}deg`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.shape === 'heart' && '❤'}
        </div>
      ))}
    </div>
  );
}
