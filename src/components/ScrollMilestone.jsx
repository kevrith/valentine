import { useEffect, useState } from 'react';
import Confetti from './Confetti';

export default function ScrollMilestone() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (triggered) return;
      
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= 50) {
        setShowConfetti(true);
        setTriggered(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggered]);

  return showConfetti ? <Confetti active={true} /> : null;
}
