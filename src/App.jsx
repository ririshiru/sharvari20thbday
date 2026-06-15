import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';

const IMG = {
  bg: '/assets/ee8a32d119d1220cfe3b0fb495895dcd635038e4.png',
  calendar: '/assets/image.png',
  strokes: '/assets/3872ef902279ae6e5b54cf9095abf0ca3b0d0af2.png',
  venue: '/assets/b77816d6f32f54a469e53ad12964c6f3efffb90c.png',
  line: '/assets/lineimage.png',
  frame: '/assets/3d03098c3ff0fa4930a45ea2c8fde0b0f2851e61.png',
  bowPink: '/assets/b35324cf329e81108fd29156058fb3759548d93d.png',
  bowSilver: '/assets/ae7427b55664695c8917559644aef67fbe2957ae.png',
  ticket: '/assets/d4a3a727d0785fcdd13f7e9cf3360a0a1ff0bcb6.png',
  catBow: '/assets/23ac268d82cff1d4f279ae0f71de6e3e67d61bee.png',
  catBee: '/assets/efe1b74a99c13030962c0f7e0770d8d9fed7e794.png',
  catShark: '/assets/c6cc556b83bc9bdc14311ce96cc46fe0de343d61.png',
  warningBg: '/assets/warning.png',
  catGun: '/assets/bfe836a991c9c652a847b4f48d5dc246c4f934f2.png',
  photo: '/assets/photo.png',
  flower: '/assets/flowerimage.png',
  hero: '/assets/heroimg.png',
};

function useBubbles(names) {
  const [bubbles, setBubbles] = useState([]);
  const animRef = useRef(null);

  useEffect(() => {
    const entries = [
      ...names.map(n => ({ id: n + Math.random(), label: n, type: 'name' })),
      { id: 'h1', label: '\u2665', type: 'heart' },
      { id: 'h2', label: '\u2665', type: 'heart' },
      { id: 'h3', label: '\u2665', type: 'heart' },
    ];
    const W = 272, H = 240;
    const initial = entries.map((e, i) => ({
      ...e,
      x: 20 + Math.random() * (W - 60),
      y: 20 + Math.random() * (H - 30),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
    setBubbles(initial);

    let state = initial.map(b => ({ ...b }));
    const step = () => {
      state = state.map(b => {
        let { x, y, vx, vy } = b;
        x += vx; y += vy;
        if (x < 2 || x > W - 60) vx = -vx;
        if (y < 2 || y > H - 24) vy = -vy;
        return { ...b, x, y, vx, vy };
      });
      setBubbles(state.map(b => ({ ...b })));
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [names.join('|')]);

  return bubbles;
}

const APP_KEY = 'jzikwki0';
const KEY = 'names';

const fetchRemoteNames = async () => {
  try {
    const res = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/${APP_KEY}/${KEY}`);
    const text = await res.text();
    if (text) {
      let data = text;
      try {
        data = JSON.parse(text);
      } catch (e) {
        // use as-is
      }
      if (data && typeof data === 'string') {
        return data.split('|').map(decodeURIComponent).filter(Boolean);
      }
    }
  } catch (err) {
    console.error("Error fetching names:", err);
  }
  return [];
};

const updateRemoteNames = async (newNames) => {
  try {
    const value = newNames.map(n => encodeURIComponent(n.replace(/\|/g, ''))).join('|');
    await fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${APP_KEY}/${KEY}/${value}`, {
      method: 'POST'
    });
  } catch (err) {
    console.error("Error updating names:", err);
  }
};

function App() {
  const [names, setNames] = useState(() => {
    try { return JSON.parse(localStorage.getItem('p5_names') || '[]'); } catch { return []; }
  });
  const [inputVal, setInputVal] = useState('');
  const bubbles = useBubbles(names);

  useEffect(() => {
    fetchRemoteNames().then(remoteNames => {
      if (remoteNames && remoteNames.length > 0) {
        setNames(remoteNames);
        localStorage.setItem('p5_names', JSON.stringify(remoteNames));
      }
    });
  }, []);

  const handleAccept = useCallback(() => {
    const val = inputVal.trim();
    if (!val) return;
    const cleanVal = val.replace(/[\/]/g, ' '); // replace slashes to avoid API path routing issues
    const next = [...names, cleanVal];
    setNames(next);
    localStorage.setItem('p5_names', JSON.stringify(next));
    updateRemoteNames(next);
    setInputVal('');
  }, [inputVal, names]);

  return (
    <div className="app-wrapper">
      <div className="canvas-container">

        {/* image 2 */}
        <div className="image-2" style={{ backgroundImage: `url(${IMG.bg})`, backgroundSize: '100% 100%' }}></div>

        <div className="text-birthday">BIRTHDAY</div>
        <div className="text-20th">20th</div>

        <div className="text-celebrating">
          CELEBRATING THE COMPLETION OF 2 DECADES IN THIS MORTAL WORLD
        </div>

        {/* Girl's Photo */}
        <div className="hero-photo" style={{ backgroundImage: `url(${IMG.hero})` }}></div>

        {/* Flowers */}
        <div className="hero-flower-large" style={{ backgroundImage: `url(${IMG.flower})` }}></div>
        <div className="hero-flower-small" style={{ backgroundImage: `url(${IMG.flower})` }}></div>

        <div className="text-incomplete">
          AND IT'S INCOMPLETE WITHOUT YOU, BECAUSE HONESTLY, I AM ENTIRELY MADE OF THE PIECES, MEMORIES, AND PARTS SHARED WITH YOU.
        </div>

        <div className="text-ask">
          You may ask--So what's the <span className="text-plan">plan</span>??
        </div>
        <div className="text-scroll">
          Scroll to find out...
        </div>

        {/* image 4 */}
        <div className="image-4" style={{ backgroundImage: `url(${IMG.bg})`, backgroundSize: '100% 100%' }}></div>

        {/* image 5 (bg) */}
        <div className="image-5-bg" style={{ backgroundImage: `url(${IMG.bg})`, backgroundSize: '100% 100%' }}></div>

        {/* image 3 */}
        <div className="image-3" style={{ backgroundImage: `url(${IMG.calendar})`, backgroundSize: '100% 100%' }}></div>

        {/* Flower on Page 2 */}
        <div className="page2-flower" style={{ backgroundImage: `url(${IMG.flower})` }}></div>

        {/* 11 */}
        <div className="text-11">11</div>

        {/* image 5 (strokes) */}
        <div className="image-5-strokes" style={{ backgroundImage: `url(${IMG.strokes})`, backgroundSize: '100% 100%' }}></div>

        {/*DAY TIME PLAN 
        <div className="text-day-plan">DAY TIME PLAN</div>*/}

        {/* EVENING PLAN */}
        <div className="text-evening-plan">EVENING PLAN on 16 June</div>

        {/* Page 3 - Evening Time (was Page 4) */}
        <div className="image-8-bg" style={{ backgroundImage: `url(${IMG.bg})`, backgroundSize: '100% 100%' }}></div>

        <div className="text-evening-time">EVENING<br />TIME</div>

        {/* Card Frame behind text */}
        <div className="image-10-frame" style={{ backgroundImage: `url(${IMG.frame})`, backgroundSize: '100% 100%' }}></div>

        {/* Invitation Paragraph */}
        <div className="text-invitation">
          It’s my birthday, so you already know we have to do it big. Grab the prettiest, most scandalous dress in your closet and meet me at my place at <span className="text-red">6:00 PM</span> sharp!
          We are doing it all: fun games, an actual photoshoot, tons of food, a massive snack haul, and obviously a lot of dancing. I would be wearing black western dress.... Join the group chat: <a href="https://chat.whatsapp.com/J3SfeKoXFYm5L6mLhHaemn?s=cl&p=i&ilr=1" className="link-registry" rel="noopener noreferrer">VIEW MY GIFT REGISTRY HERE</a>

        </div>

        {/* A House Party */}
        <div className="text-house-party">A HOUSE<br />PARTY</div>

        {/* Bows sitting on top of the frame/invitation */}
        <div className="image-11-bow" style={{ backgroundImage: `url(${IMG.bowPink})`, backgroundSize: '100% 100%' }}></div>
        <div className="image-13-bow" style={{ backgroundImage: `url(${IMG.bowPink})`, backgroundSize: '100% 100%' }}></div>
        <div className="image-12-bow" style={{ backgroundImage: `url(${IMG.bowSilver})`, backgroundSize: '100% 100%' }}></div>

        {/* Ticket Section */}
        <div className="image-15-ticket" style={{ backgroundImage: `url(${IMG.ticket})`, backgroundSize: '100% 100%' }}></div>
        <div className="text-ticket-catch">
          ⚠️ BUT THERE’S A CATCH... YOUR ENTRY TICKET INTO THE PARTY IS A <span className="text-red">SNACK THAT MATCHES THE EXACT COLOR OF ANYTHING YOU ARE WEARING.</span> NO MATCHING SNACK, NO ENTRY. CHOOSE YOUR OUTFIT (AND YOUR CRAVINGS) WISELY.
        </div>

        {/* Page 5 (3438 to 4290) - LOCK YOUR COLOR */}
        <div className="image-16-bg" style={{ backgroundImage: `url(${IMG.bg})`, backgroundSize: '100% 100%' }}></div>

        <div className="text-lock-color">LOCK<br />YOUR<br />COLOR</div>

        {/* Cat with bow - top left */}
        <div className="image-17-catbow" style={{ backgroundImage: `url(${IMG.catBow})`, backgroundSize: '100% 100%' }}></div>

        {/* DIVASZZ bubble wall */}
        <div className="frame-2-bubble-box">
          <div className="vector-4-border"></div>
          <div className="text-divaszz">DIVASZZ&nbsp;&nbsp;YOU WILL MEET</div>
          <div className="bubble-area">
            {bubbles.map(b => (
              <span
                key={b.id}
                className={`bubble-item ${b.type === 'heart' ? 'bubble-heart' : 'bubble-name'}`}
                style={{ left: b.x, top: b.y }}
              >
                {b.label}
                {b.type === 'name' && (
                  <span
                    className="delete-cross"
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = names.filter(n => n !== b.label);
                      setNames(next);
                      localStorage.setItem('p5_names', JSON.stringify(next));
                      updateRemoteNames(next);
                    }}
                  >
                    ×
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Input field */}
        <div className="frame-3-input">
          <input
            className="rsvp-input"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAccept()}
            placeholder="TYPE HERE YOUR {NAME-DAY-EVENING/BOTH-COLOR}..."
          />
        </div>

        {/* Accept Invitation button */}
        <div className="frame-4-btn" onClick={handleAccept}>
          <span className="btn-accept-text">ACCEPT INVITATION</span>
        </div>

        {/* Bee cat - bottom right */}
        <div className="image-18-catbee" style={{ backgroundImage: `url(${IMG.catBee})`, backgroundSize: '100% 100%' }}></div>

        {/* Page 6 (4310 to 5162) */}
        <div className="image-19-bg" style={{ backgroundImage: `url(${IMG.bg})`, backgroundSize: '100% 100%' }}></div>

        {/* Shark Cat */}
        <div className="image-21-sharkcat" style={{ backgroundImage: `url(${IMG.catShark})`, backgroundSize: '100% 100%' }}></div>

        {/* Warning Background */}
        <div className="image-20-warning" style={{ backgroundImage: `url(${IMG.warningBg})`, backgroundSize: '100% 100%' }}></div>

        <div className="text-warning-terms">
          * [TERMS AND CONDITIONS]: FAILURE TO ATTEND THE PLAN WILL RESULT IN A LEGALLY BINDING, LIFELONG GRUDGE. I WILL NEVER FORGET, AND I WILL NEVER LET YOU LIVE IT DOWN.
        </div>

        {/* Page 7 (5182 to 6054) */}
        <div className="image-22-bg" style={{ backgroundImage: `url(${IMG.bg})`, backgroundSize: '100% 100%' }}></div>

        <div className="text-aarahe">TOH AARAHE<br />HO NAH??</div>

        {/* Gun Cat */}
        <div className="image-23-catgun" style={{ backgroundImage: `url(${IMG.catGun})`, backgroundSize: '100% 100%' }}></div>

      </div>
    </div>
  );
}

export default App;
