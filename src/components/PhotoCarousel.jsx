import { useState } from 'react';

const photos = [
  { src: '/DSC_6138_1_compress85.jpg', caption: 'Every moment with you is a masterpiece' },
  { src: '/DSC_6140_1_compress13.jpg', caption: 'You make my heart skip a beat' },
  { src: '/IMG20241222132932.jpg', caption: 'My favorite place is next to you' },
  { src: '/IMG20241222132936.jpg', caption: 'Together is my favorite place to be' },
  { src: '/IMG20241222132938.jpg', caption: 'You are my sunshine on cloudy days' },
  { src: '/IMG20241222132940.jpg', caption: 'Forever grateful for you' },
];

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % photos.length);
  const prev = () => setCurrent((current - 1 + photos.length) % photos.length);

  return (
    <div className="photo-carousel">
      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={prev}>‹</button>
        <div className="carousel-photo">
          <img
            src={photos[current].src}
            alt={photos[current].caption}
            className="carousel-image"
          />
          <p className="photo-caption">{photos[current].caption}</p>
        </div>
        <button className="carousel-btn next" onClick={next}>›</button>
      </div>
      <div className="carousel-dots">
        {photos.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
