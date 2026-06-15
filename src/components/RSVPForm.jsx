import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function RSVPForm({ onAddGuest }) {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Please enter your name.');
      return;
    }

    if (trimmedName.length > 20) {
      setError('Name is too long (maximum 20 characters).');
      return;
    }

    // Call parent handler
    onAddGuest({
      name: trimmedName,
      attending: attending
    });

    // Celebratory effect if attending
    if (attending === 'yes') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#ec4899', '#06b6d4', '#a855f7', '#ffffff'],
        ticks: 200
      });
    }

    // Reset form
    setName('');
  };

  return (
    <div className="glass-card">
      <div className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Join the Celebration</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Confirm your attendance and watch your name float onto the screen!
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name-input">Your Name</label>
          <input
            id="name-input"
            type="text"
            className="form-input"
            placeholder="e.g. Alex Rivera"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            required
            maxLength={25}
          />
        </div>

        <div className="form-group">
          <label>Are you coming?</label>
          <div className="radio-group">
            <button
              type="button"
              className={`radio-btn ${attending === 'yes' ? 'active' : ''}`}
              onClick={() => setAttending('yes')}
            >
              🎉 Yes, I'm in!
            </button>
            <button
              type="button"
              className={`radio-btn ${attending === 'no' ? 'active' : ''}`}
              onClick={() => setAttending('no')}
            >
              😢 Can't make it
            </button>
          </div>
        </div>

        {error && (
          <p style={{ color: '#f43f5e', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>
            ⚠️ {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Confirm RSVP
        </button>
      </form>
    </div>
  );
}
