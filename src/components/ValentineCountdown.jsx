import { useState, useEffect } from 'react';

export default function ValentineCountdown() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let valentine = new Date(currentYear, 1, 14); // Feb 14

      if (now > valentine) {
        valentine = new Date(currentYear + 1, 1, 14);
      }

      const diff = valentine - now;
      
      if (diff < 86400000 && now.getDate() === 14 && now.getMonth() === 1) {
        return 'today';
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTime());
    const interval = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  if (timeLeft === 'today') {
    return (
      <div className="countdown-container">
        <div className="countdown-today">
          <span className="countdown-heart">💕</span>
          <h3>Today is the day!</h3>
          <p>Happy Valentine's Day, my love!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="countdown-container">
      <h3 className="countdown-title">Countdown to Valentine's Day</h3>
      <div className="countdown-grid">
        <div className="countdown-item">
          <span className="countdown-number">{timeLeft.days}</span>
          <span className="countdown-label">Days</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-number">{timeLeft.hours}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-number">{timeLeft.minutes}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-number">{timeLeft.seconds}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </div>
  );
}
