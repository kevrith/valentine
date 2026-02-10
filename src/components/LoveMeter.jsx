import { useState, useEffect } from 'react';

export default function LoveMeter() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const percentage = Math.min((scrolled / documentHeight) * 100, 100);
      setProgress(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="love-meter">
      <div className="love-meter-container">
        <div className="love-meter-fill" style={{ height: `${progress}%` }}>
          <span className="love-heart">💖</span>
        </div>
        <span className="love-percentage">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
