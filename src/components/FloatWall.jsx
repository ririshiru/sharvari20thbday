import React from 'react';

// A simple deterministic pseudo-random generator to keep animations consistent for each guest
function getSeedValue(seedString, min, max, offset = 0) {
  let hash = 0;
  const str = String(seedString);
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Standard math utility to get a value between 0 and 1
  const x = Math.abs(Math.sin(hash + offset));
  return min + x * (max - min);
}

export default function FloatWall({ guests = [] }) {
  return (
    <div className="glass-card guestbook-card">
      <div className="guestbook-header">
        <h3>Floating Guestbook</h3>
        <span className="count-badge">
          {guests.length} {guests.length === 1 ? 'Guest' : 'Guests'} Confirmed
        </span>
      </div>

      <div className="float-wall-container">
        {guests.length === 0 ? (
          <div className="empty-wall-message">
            No guests have RSVP'd yet. Be the first to add your name!
          </div>
        ) : (
          guests.map((guest) => {
            const { id, name, attending, createdAt } = guest;
            
            // Check if the guest was added very recently (within the last 5 seconds)
            const isBrandNew = createdAt && (Date.now() - createdAt < 5000);

            // Generate stable floating parameters
            const left = getSeedValue(id, 5, 85, 10).toFixed(1) + '%';
            const duration = getSeedValue(id, 8, 16, 20).toFixed(1) + 's';
            
            // If brand new, spawn instantly at the bottom with 0s delay
            // Otherwise, pre-distribute the bubble vertically with a negative delay
            const delay = isBrandNew 
              ? '0s' 
              : '-' + getSeedValue(id, 0, 16, 30).toFixed(1) + 's';

            const weave = getSeedValue(id, -60, 60, 40).toFixed(0) + 'px';
            const rotate = getSeedValue(id, -20, 20, 50).toFixed(0) + 'deg';
            const scale = getSeedValue(id, 0.9, 1.25, 60).toFixed(2);

            const isAttending = attending === 'yes';

            const bubbleStyle = {
              left: left,
              '--float-duration': duration,
              '--float-delay': delay,
              '--float-weave': weave,
              '--float-rotate': rotate,
              transform: `scale(${scale})`,
            };

            return (
              <div
                key={id}
                className={`name-bubble ${isAttending ? 'bubble-attending' : 'bubble-declined'}`}
                style={bubbleStyle}
                title={`${name} is ${isAttending ? 'attending' : 'not attending'}`}
              >
                {name} {isAttending ? '✨' : '💭'}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
