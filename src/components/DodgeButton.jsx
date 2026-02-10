import { useState, useRef, useCallback, useEffect } from 'react';

export default function DodgeButton({ cardRef }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [message, setMessage] = useState('');
  const buttonRef = useRef(null);

  const dodgeMessages = [
    "Nope! Try again 😏",
    "You can't catch me! 💨",
    "Nice try! 😂",
    "Not happening! 🏃‍♂️",
    "Just click Yes already! 💕",
    "I'm too fast for you! ⚡",
    "Wrong button, darling! 😘",
    "Haha, missed me! 🎯",
    "You know the right answer! ❤️",
    "Stop chasing me! 😜",
    "The other button is prettier! 🌹",
    "I'll never let you catch me! 🦋",
  ];

  const dodge = useCallback(() => {
    const card = cardRef?.current;
    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const btnW = 130;
    const btnH = 50;
    const padding = 20;

    const maxX = cardRect.width - btnW - padding * 2;
    const maxY = cardRect.height - btnH - padding * 2;

    let newX = padding + Math.random() * maxX;
    let newY = padding + Math.random() * maxY;

    // Ensure it stays within bounds
    newX = Math.max(padding, Math.min(newX, cardRect.width - btnW - padding));
    newY = Math.max(padding, Math.min(newY, cardRect.height - btnH - padding));

    setPos({ x: newX, y: newY });
    setDodgeCount(prev => prev + 1);
    setMessage(dodgeMessages[Math.floor(Math.random() * dodgeMessages.length)]);
  }, [cardRef]);

  // Also dodge on touch for mobile
  const handleTouch = useCallback((e) => {
    e.preventDefault();
    dodge();
  }, [dodge]);

  useEffect(() => {
    const btn = buttonRef.current;
    if (btn) {
      btn.addEventListener('touchstart', handleTouch, { passive: false });
      return () => btn.removeEventListener('touchstart', handleTouch);
    }
  }, [handleTouch]);

  return (
    <>
      {message && (
        <p className="dodge-message" key={dodgeCount}>
          {message}
        </p>
      )}
      <button
        ref={buttonRef}
        className="btn-no"
        onMouseEnter={dodge}
        onFocus={dodge}
        onClick={(e) => {
          e.preventDefault();
          dodge();
        }}
        style={{
          position: 'absolute',
          left: dodgeCount > 0 ? `${pos.x}px` : '50%',
          top: dodgeCount > 0 ? `${pos.y}px` : 'auto',
          transform: dodgeCount === 0 ? 'translateX(-50%)' : 'none',
          bottom: dodgeCount === 0 ? '80px' : 'auto',
        }}
      >
        No 😢
      </button>
    </>
  );
}
