import { useState } from 'react';

export default function BucketList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Watch the sunrise together on a beach', checked: false },
    { id: 2, text: 'Cook a fancy dinner together', checked: false },
    { id: 3, text: 'Go on a spontaneous road trip', checked: false },
    { id: 4, text: 'Dance in the rain', checked: false },
    { id: 5, text: 'Build a blanket fort and watch movies', checked: false },
    { id: 6, text: 'Stargaze and make wishes together', checked: false },
  ]);
  const [showSecret, setShowSecret] = useState(false);

  const toggle = (id) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItems);
    
    if (newItems.every(item => item.checked)) {
      setTimeout(() => setShowSecret(true), 500);
    }
  };

  return (
    <div className="bucket-list">
      <h3 className="bucket-title">Things I Want to Do With You</h3>
      <div className="bucket-items">
        {items.map(item => (
          <div
            key={item.id}
            className={`bucket-item ${item.checked ? 'checked' : ''}`}
            onClick={() => toggle(item.id)}
          >
            <span className="bucket-checkbox">
              {item.checked ? '✓' : '○'}
            </span>
            <span className="bucket-text">{item.text}</span>
          </div>
        ))}
      </div>
      {showSecret && (
        <div className="secret-message">
          <div className="secret-content">
            <span className="secret-emoji">🎉</span>
            <p className="secret-text">
              You found the secret! Every single one of these dreams will come true with you by my side. 
              You make everything possible. I love you endlessly! 💕
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
