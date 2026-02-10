import { useState, useEffect } from 'react';

const phrases = [
  { text: 'I Love You', lang: 'English' },
  { text: 'Te Amo', lang: 'Spanish' },
  { text: 'Je t\'aime', lang: 'French' },
  { text: 'Ti Amo', lang: 'Italian' },
  { text: 'Ich Liebe Dich', lang: 'German' },
  { text: 'Nakupenda', lang: 'Swahili' },
  { text: 'Aishiteru', lang: 'Japanese' },
  { text: 'Saranghae', lang: 'Korean' },
];

export default function RotatingLove() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rotating-love">
      <span className="rotating-love-text" key={index}>
        {phrases[index].text}
      </span>
    </div>
  );
}
