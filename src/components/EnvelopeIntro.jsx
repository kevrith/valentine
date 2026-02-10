import { useState, useEffect } from 'react';

export default function EnvelopeIntro({ onComplete }) {
  const [stage, setStage] = useState('sealed');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('opening'), 1000);
    const timer2 = setTimeout(() => setStage('fading'), 2800);
    const timer3 = setTimeout(() => onComplete?.(), 3800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className={`envelope-intro ${stage}`}>
      <div className="envelope-container">
        <div className="envelope-flap" />
        <div className="envelope-body">
          <div className="envelope-heart">💝</div>
        </div>
        <div className="envelope-letter">
          <p>For My Valentine</p>
        </div>
      </div>
    </div>
  );
}
