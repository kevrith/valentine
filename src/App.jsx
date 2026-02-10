import { useState, useEffect, useRef } from 'react';
import FloatingHearts from './components/FloatingHearts';
import TypewriterText from './components/TypewriterText';
import DodgeButton from './components/DodgeButton';
import Confetti from './components/Confetti';
import CursorTrail from './components/CursorTrail';
import EnvelopeIntro from './components/EnvelopeIntro';
import ValentineCountdown from './components/ValentineCountdown';
import MusicToggle from './components/MusicToggle';
import ScratchCard from './components/ScratchCard';
import PhotoCarousel from './components/PhotoCarousel';
import LoveMeter from './components/LoveMeter';
import BucketList from './components/BucketList';
import TwinklingStars from './components/TwinklingStars';
import RotatingLove from './components/RotatingLove';
import ScrollMilestone from './components/ScrollMilestone';
import './styles.css';

const loveReasons = [
  { emoji: '✨', text: 'Your smile lights up my entire world' },
  { emoji: '🦋', text: 'Every moment with you feels like magic' },
  { emoji: '🌅', text: 'You make ordinary days extraordinary' },
  { emoji: '💫', text: 'Your laughter is my favorite melody' },
  { emoji: '🌸', text: 'You inspire me to be a better person every day' },
  { emoji: '🔥', text: 'My heart races every time I see you' },
];

const journeyMoments = [
  {
    title: 'The Beginning',
    text: 'From the very first moment I saw you, I knew my life was about to change forever. There was something in your eyes that told me you were special — and I was right.',
    icon: '💫',
  },
  {
    title: 'Falling For You',
    text: 'Day by day, conversation by conversation, I found myself falling deeper. Your kindness, your humor, the way you see the world — everything about you captivated my heart.',
    icon: '🌹',
  },
  {
    title: 'The Best Days',
    text: 'Every moment spent with you has been the best moment of my life. Whether we\'re laughing together, sharing silence, or just being near each other — you make everything better.',
    icon: '☀️',
  },
  {
    title: 'Right Now',
    text: 'Today, I love you more than yesterday and less than tomorrow. You are the best thing that has ever happened to me, and I want the whole world to know.',
    icon: '❤️‍🔥',
  },
];

export default function App() {
  const [saidYes, setSaidYes] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);
  const questionCardRef = useRef(null);

  const handleEnvelopeComplete = () => {
    setShowEnvelope(false);
    setShowContent(true);
  };

  useEffect(() => {
    if (!showContent) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.dataset.section]));
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [showContent]);

  const addRef = (el, index) => {
    sectionRefs.current[index] = el;
  };

  if (showEnvelope) {
    return <EnvelopeIntro onComplete={handleEnvelopeComplete} />;
  }

  if (saidYes) {
    return (
      <div className="celebration-screen">
        <Confetti active={true} />
        <FloatingHearts />
        <CursorTrail />
        <div className="celebration-content">
          <h1 className="celebration-title">SHE SAID YES!</h1>
          <div className="celebration-heart-beat">💖</div>
          <p className="celebration-text">
            You just made me the happiest person in the entire universe!
          </p>
          <p className="celebration-subtext">
            This Valentine's Day and every day after, my heart is yours forever.
          </p>
          <div className="celebration-emojis">
            {['🥰', '💕', '🌹', '💍', '🎆', '💖', '✨', '🦋'].map((e, i) => (
              <span key={i} className="celebration-emoji" style={{ animationDelay: `${i * 0.15}s` }}>
                {e}
              </span>
            ))}
          </div>
          <p className="forever-text">Forever & Always</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <FloatingHearts />
      <CursorTrail />
      <TwinklingStars />
      <LoveMeter />
      <MusicToggle />
      <ScrollMilestone />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="hero-content">
          <p className="hero-pretext">To the most beautiful soul...</p>
          <h1 className="hero-title">
            <span className="hero-line">Happy</span>
            <span className="hero-line accent">Valentine&apos;s</span>
            <span className="hero-line">Day</span>
          </h1>
          <div className="hero-heart-divider">
            <span className="divider-line" />
            <span className="hero-heart-icon">💝</span>
            <span className="divider-line" />
          </div>
          <p className="hero-subtitle">
            <TypewriterText
              text="I made this just for you, because you deserve the world and more..."
              speed={45}
              delay={1500}
            />
          </p>
          <RotatingLove />
          <div className="scroll-indicator">
            <span>Scroll down, my love</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
        <ValentineCountdown />
      </section>

      {/* LETTER SECTION */}
      <section
        className={`section letter-section ${visibleSections.has('letter') ? 'visible' : ''}`}
        data-section="letter"
        ref={el => addRef(el, 0)}
      >
        <div className="section-inner">
          <h2 className="section-title">A Letter From My Heart</h2>
          <div className="letter-card">
            <div className="letter-stamp">💌</div>
            <p className="letter-greeting">My Dearest Love,</p>
            <p className="letter-body">
              I&apos;ve been trying to find the right words to tell you how I feel, but no words
              in any language could ever fully capture what you mean to me. You walked into
              my life and turned it into the most beautiful story ever written.
            </p>
            <p className="letter-body">
              Every single day with you feels like a gift I don&apos;t deserve but am so
              incredibly grateful for. You are my sunshine on cloudy days, my calm in the
              storm, and the reason I believe in magic.
            </p>
            <p className="letter-body">
              Spending time with you is the <em>best thing that has ever happened to me.</em>{' '}
              Not just on Valentine&apos;s Day — but every single day that I get to call you mine.
            </p>
            <p className="letter-signature">
              With all my love,<br />
              <span className="signature-heart">❤️ Yours Forever</span>
            </p>
          </div>
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section
        className={`section journey-section ${visibleSections.has('journey') ? 'visible' : ''}`}
        data-section="journey"
        ref={el => addRef(el, 1)}
      >
        <div className="section-inner">
          <h2 className="section-title">Our Journey Together</h2>
          <p className="section-subtitle">Every chapter with you is my favorite</p>
          <div className="timeline">
            {journeyMoments.map((moment, i) => (
              <div
                key={i}
                className="timeline-item"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="timeline-icon">{moment.icon}</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{moment.title}</h3>
                  <p className="timeline-text">{moment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY I LOVE YOU SECTION */}
      <section
        className={`section reasons-section ${visibleSections.has('reasons') ? 'visible' : ''}`}
        data-section="reasons"
        ref={el => addRef(el, 2)}
      >
        <div className="section-inner">
          <h2 className="section-title">Why I Love You</h2>
          <p className="section-subtitle">Just a few of the million reasons</p>
          <div className="reasons-grid">
            {loveReasons.map((reason, i) => (
              <div
                key={i}
                className="reason-card"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <span className="reason-emoji">{reason.emoji}</span>
                <p className="reason-text">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCRATCH CARD SECTION */}
      <section
        className={`section scratch-section ${visibleSections.has('scratch') ? 'visible' : ''}`}
        data-section="scratch"
        ref={el => addRef(el, 3)}
      >
        <div className="section-inner">
          <h2 className="section-title">A Secret Message</h2>
          <p className="section-subtitle">Scratch to reveal what's in my heart</p>
          <ScratchCard message="You are the love of my life, today and always. Every moment with you is a treasure I'll cherish forever. 💕" />
        </div>
      </section>

      {/* PHOTO CAROUSEL SECTION */}
      <section
        className={`section photos-section ${visibleSections.has('photos') ? 'visible' : ''}`}
        data-section="photos"
        ref={el => addRef(el, 4)}
      >
        <div className="section-inner">
          <h2 className="section-title">Our Memories</h2>
          <p className="section-subtitle">Every picture tells our story</p>
          <PhotoCarousel />
        </div>
      </section>

      {/* BUCKET LIST SECTION */}
      <section
        className={`section bucket-section ${visibleSections.has('bucket') ? 'visible' : ''}`}
        data-section="bucket"
        ref={el => addRef(el, 5)}
      >
        <div className="section-inner">
          <BucketList />
        </div>
      </section>

      {/* THE BIG QUESTION */}
      <section
        className={`section question-section ${visibleSections.has('question') ? 'visible' : ''}`}
        data-section="question"
        ref={el => addRef(el, 6)}
      >
        <div className="section-inner">
          <div className="question-card" ref={questionCardRef}>
            <div className="question-roses">🌹🌹🌹</div>
            <h2 className="question-title">
              Will You Be My Valentine?
            </h2>
            <p className="question-subtitle">
              (Choose wisely... though there&apos;s really only one right answer 😏)
            </p>
            <div className="question-buttons">
              <button className="btn-yes" onClick={() => {
                setSaidYes(true);
                const audio = new Audio('data:audio/wav;base64,UklGRhYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//wAA');
                audio.volume = 0.3;
                audio.play().catch(() => {});
              }}>
                Yes! 💖
              </button>
              <DodgeButton cardRef={questionCardRef} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
