import { useRef, useState, useEffect, useCallback } from 'react';

export default function ScratchCard({ message }) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const scratchingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 300;

    // Draw scratch surface with gradient
    const gradient = ctx.createLinearGradient(0, 0, 500, 300);
    gradient.addColorStop(0, '#c2185b');
    gradient.addColorStop(1, '#880e4f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 300);

    // Add shimmer dots
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 500, Math.random() * 300, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 215, 0, ${Math.random() * 0.4 + 0.1})`;
      ctx.fill();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch here ✨', 250, 140);
    ctx.font = '14px Georgia, serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('Use your finger or mouse', 250, 175);
  }, []);

  const scratch = useCallback((clientX, clientY) => {
    if (isRevealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Play scratch sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPDhkj4KFV+16+qnVRQLRp/g8r5sIQUrgs/y2Ik2CBhkuezooVARDEyl4fG5ZRwFNo3V7859KQUofsz');
    audio.volume = 0.2;
    audio.play().catch(() => {});

    // Check reveal threshold (sample every 4th pixel for performance)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    let total = 0;
    for (let i = 3; i < pixels.length; i += 16) {
      total++;
      if (pixels[i] === 0) transparent++;
    }
    if (transparent / total > 0.4) {
      setIsRevealed(true);
    }
  }, [isRevealed]);

  // Use ref-based touch handling with { passive: false } to prevent scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e) => {
      e.preventDefault();
      scratchingRef.current = true;
      const t = e.touches[0];
      scratch(t.clientX, t.clientY);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!scratchingRef.current) return;
      const t = e.touches[0];
      scratch(t.clientX, t.clientY);
    };

    const handleTouchEnd = () => {
      scratchingRef.current = false;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scratch]);

  const handleMouseDown = () => { scratchingRef.current = true; };
  const handleMouseUp = () => { scratchingRef.current = false; };
  const handleMouseMove = (e) => {
    if (scratchingRef.current) scratch(e.clientX, e.clientY);
  };

  return (
    <div className="scratch-card">
      <div className="scratch-message">{message}</div>
      <canvas
        ref={canvasRef}
        className={`scratch-canvas ${isRevealed ? 'revealed' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
}
