/* =========================================
   CDS Farewell 2026: The Final Epoch
   Main Application Logic
   ========================================= */

// --- CONFIGURATION ---
const PHOTOS = [
  '1758440090248 - Harshit Rawat.jpeg',
  'IMG-20250203-WA0015 - Mohan Kumar.jpg',
  'IMG-20250612-WA0003 - Sathvik G.jpg',
  'IMG-20260208-WA0025 - Vatsal Khapre.jpg',
  'IMG-20260210-WA0007 - Harsh Kumar.jpg',
  'IMG-20260425-WA0002 - Pradeep Chandra.jpg',
  'IMG-20260512-WA0004.jpg','IMG-20260512-WA0007.jpg','IMG-20260512-WA0008.jpg',
  'IMG-20260512-WA0009.jpg','IMG-20260512-WA0010.jpg','IMG-20260512-WA0016.jpg',
  'IMG-20260512-WA0017.jpg','IMG-20260512-WA0018.jpg','IMG-20260512-WA0019.jpg',
  'IMG-20260512-WA0020.jpg','IMG-20260512-WA0021.jpg','IMG-20260512-WA0024.jpg',
  'IMG-20260512-WA0026.jpg','IMG-20260512-WA0027.jpg','IMG-20260512-WA0028.jpg',
  'IMG-20260512-WA0029.jpg','IMG-20260512-WA0030.jpg','IMG-20260512-WA0031.jpg',
  'IMG_1166 - Vilasini.jpg',
  'IMG_20260331_231335 - GANESH GUGULOTH.jpg',
  'IMG_20260511_135749 - Deeksha Chutani.jpg',
  'IMG_4044 - Ananya Thakur.jpeg'
];

const VIDEOS_PHOTOS = ['VID-20260512-WA0006.mp4'];
const VIDEOS = [
  '20241004_214156 - Naman Pesricha.mp4',
  'VID-20260512-WA0005.mp4','VID-20260512-WA0011.mp4','VID-20260512-WA0012.mp4',
  'VID-20260512-WA0013.mp4','VID-20260512-WA0014.mp4',
  '_storage_emulated_0_Android_media_com.whatsapp_WhatsApp_Media_WhatsApp Video_VID-20260512-WA0025.mp4'
];

const CAPTIONS = [
  "Debugging at 3 AM 💀","Post-Presentation Trauma ☕",
  "Telling the prof 'Yes sir, working on it'","The 'We survived' squad 🤝",
  "When the GPU finally works 🎉","Lab at midnight ✨","'Just one more epoch'",
  "Canteen break turned 2-hour break","When the loss goes NaN 😭",
  "Pretending to understand the paper","Group project = 1 person project",
  "The 'rm -rf' moment 💀","Thesis defense prep (crying inside)",
  "Conference deadline energy ⚡","Campus sunset vibes 🌅",
  "When your code runs first try 🤯","Office hours but make it therapy",
  "The IISc main building walk 🏛️","Mess food appreciation post 🍛",
  "Result day face 😐","When funding comes through 💰",
  "Hostel room = entire life 🏠","The GPU queue struggle 🖥️",
  "Chai break philosophy session ☕","When someone says 'quick meeting'",
  "Submission deadline at 11:59 PM","Campus dogs > humans 🐕",
  "CDS corridor memories 🚶","The final goodbye 😢",
  "Making memories, one bug at a time 🐛","Seminar room nap champions 😴",
  "When WiFi works perfectly (never)","Plot twist: it was a feature",
  "Stack overflow copy-paste champions","Late night Maggi chronicles 🍜"
];

const LOADING_MSGS = [
  "Optimizing Adam...","Tuning Hyperparameters...","Waking up the Dept Chair...",
  "Running sudo get_party_started...","Calculating who owes money...",
  "Loading nostalgia.pkl...","Compiling memories...","Allocating GPU for party..."
];

const POPUP_MSGS = [
  "⚠️ Warning: GPU (Glass Pouring Unit) limit reached.",
  "Error: Could not compute how fast the 2 years went by.",
  "RuntimeWarning: Nostalgia overflow detected.",
  "DeprecationWarning: student_life will be removed in v2026.06",
  "INFO: Friendship.save() completed successfully ✓"
];

const EMOJI_RAIN_CHARS = ['📄','💰','🎓','📊','🏆','💎','🎉','✨'];

// --- STATE ---
let audioUnmuted = false;
let currentBgAudio = null;
let venueClicks = 0;

// --- LOADING SCREEN ---
(function initLoading() {
  const msgEl = document.getElementById('loading-msg');
  let idx = 0;
  const interval = setInterval(() => {
    idx = (idx + 1) % LOADING_MSGS.length;
    msgEl.textContent = LOADING_MSGS[idx];
  }, 800);

  const dismiss = () => {
    clearInterval(interval);
    const ls = document.getElementById('loading-screen');
    if (!ls) return;
    gsap.to(ls, { opacity: 0, duration: 0.5, onComplete: () => ls.remove() });
    playAudio('audio-spiderman');
  };

  document.getElementById('loading-screen').addEventListener('click', dismiss);
  setTimeout(dismiss, 4500);
})();

// --- AUDIO MANAGER ---
const ALL_SFX = ['audio-spiderman','audio-faah','audio-chalo','audio-laughing-cat','audio-ladle','audio-phha'];
function playAudio(id) {
  if (!audioUnmuted) return;
  try {
    const el = document.getElementById(id);
    if (el) { el.currentTime = 0; el.play().catch(() => {}); }
  } catch(e) {}
}
function playRandomSfx() {
  playAudio(ALL_SFX[Math.floor(Math.random() * ALL_SFX.length)]);
}
function stopAudio(id) {
  try {
    const el = document.getElementById(id);
    if (el) { el.pause(); el.currentTime = 0; }
  } catch(e) {}
}
function stopAllBg() {
  ['audio-saxophone','audio-ladle'].forEach(id => stopAudio(id));
}

document.getElementById('unmute-btn').addEventListener('click', function() {
  audioUnmuted = !audioUnmuted;
  this.textContent = audioUnmuted ? '🔊 Mute' : '🔇 Unmute';
  this.classList.toggle('muted', !audioUnmuted);
  if (!audioUnmuted) stopAllBg();
  else if (currentBgAudio) playAudio(currentBgAudio);
});

// --- CONFETTI SYSTEM ---
function spawnConfetti(container, count = 50) {
  const colors = ['#ff006e','#00ff88','#ffbe0b','#8338ec','#00d4ff','#ff3333'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (2 + Math.random() * 3) + 's';
    p.style.animationDelay = Math.random() * 0.5 + 's';
    p.style.width = (6 + Math.random() * 8) + 'px';
    p.style.height = (6 + Math.random() * 8) + 'px';
    container.appendChild(p);
    setTimeout(() => p.remove(), 5500);
  }
}

// --- EMOJI RAIN ---
function startEmojiRain() {
  const container = document.getElementById('emoji-rain');
  if (!container) return;
  setInterval(() => {
    const e = document.createElement('div');
    e.className = 'emoji-particle';
    e.textContent = EMOJI_RAIN_CHARS[Math.floor(Math.random() * EMOJI_RAIN_CHARS.length)];
    e.style.left = Math.random() * 100 + '%';
    e.style.animationDuration = (4 + Math.random() * 4) + 's';
    container.appendChild(e);
    setTimeout(() => e.remove(), 9000);
  }, 400);
}

// --- POPUP TOASTS ---
function showPopup(msg) {
  const c = document.getElementById('popup-container');
  const t = document.createElement('div');
  t.className = 'popup-toast';
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

// --- GATEKEEPER BUTTONS ---
const btnSenior = document.getElementById('btn-senior');
const btnJunior = document.getElementById('btn-junior');

btnSenior.addEventListener('mouseenter', () => {
  spawnConfetti(document.getElementById('confetti-container'), 30);
  playAudio('audio-faah'); // impressed gasp when hovering senior
});

btnJunior.addEventListener('mouseenter', () => {
  document.body.classList.add('screen-shake');
  setTimeout(() => document.body.classList.remove('screen-shake'), 500);
  playAudio('audio-laughing-cat'); // mocking laugh for broke juniors
});

btnSenior.addEventListener('click', () => transitionTo('senior'));
btnJunior.addEventListener('click', () => transitionTo('junior'));

// --- PAGE TRANSITIONS ---
function transitionTo(role) {
  const gk = document.getElementById('gatekeeper');
  const main = document.getElementById('main-content');
  const seniorSec = document.getElementById('senior-section');
  const juniorSec = document.getElementById('junior-section');

  // Animate gatekeeper out
  gsap.to(gk, {
    opacity: 0, scale: 0.95, duration: 0.6, ease: 'power2.in',
    onComplete: () => {
      gk.style.display = 'none';
      main.style.display = 'block';

      if (role === 'senior') {
        seniorSec.style.display = 'block';
        juniorSec.style.display = 'none';
        stopAllBg(); currentBgAudio = 'audio-saxophone';
        playAudio('audio-spiderman'); // dramatic Spiderman entrance for the legends
        setTimeout(() => playAudio('audio-saxophone'), 2000); // then romantic sax BG
        startEmojiRain();
        gsap.from(seniorSec, { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out' });
      } else {
        juniorSec.style.display = 'block';
        seniorSec.style.display = 'none';
        stopAllBg(); currentBgAudio = 'audio-ladle';
        playAudio('audio-chalo'); // "Chalo bhai, pay up"
        setTimeout(() => {
          playAudio('audio-ladle'); // meoww ghop ghop BG chaos
        }, 1500);
        gsap.from(juniorSec, { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out' });
      }

      // Animate event details and carousel
      gsap.from('#event-details', { opacity: 0, y: 60, duration: 0.8, delay: 0.3, ease: 'power2.out' });
      gsap.from('#carousel-section', { opacity: 0, y: 60, duration: 0.8, delay: 0.5, ease: 'power2.out' });

      window.location.hash = role;
    }
  });
}

// --- VIP TICKET REVEAL ---
document.getElementById('reveal-pass-btn')?.addEventListener('click', function() {
  const ticket = document.getElementById('vip-ticket');
  ticket.style.display = 'flex';
  gsap.from(ticket, { opacity: 0, scale: 0.5, rotation: -10, duration: 0.8, ease: 'back.out(1.7)' });
  spawnConfetti(document.querySelector('.experience-section[style*="block"]') || document.body, 60);
  playAudio('audio-faah'); // impressed "Faah!" for the VIP reveal
  setTimeout(() => playAudio('audio-phha'), 800); // then the "Phha haha" celebration
  this.style.display = 'none';
});

// --- JUNIOR: PAID BUTTON ---
document.getElementById('paid-btn')?.addEventListener('click', () => {
  const responses = [
    "🎉 Payment received! Tathagata has been notified. You're a real one!",
    "🧢 Sure you did... Tathagata's Excel sheet says otherwise.",
    "💀 Your UPI app crashed? Classic excuse. Pay up.",
    "✅ Noted. Now go convince your 3 roommates to pay too."
  ];
  showPopup(responses[Math.floor(Math.random() * responses.length)]);
  playAudio('audio-chalo'); // sarcastic "Chalo, let's believe you"
});

// --- JUNIOR: PANIC BUTTON ---
document.getElementById('panic-btn')?.addEventListener('click', () => {
  document.getElementById('cuda-modal').style.display = 'flex';
  playAudio('audio-ladle'); // chaotic "ladle meoww ghop ghop" for panic
  document.body.classList.add('screen-shake');
  setTimeout(() => {
    document.body.classList.remove('screen-shake');
    playAudio('audio-laughing-cat'); // then the mocking laugh
  }, 600);
});

// --- EASTER EGG: VENUE 3-CLICK ---
document.getElementById('venue-name')?.addEventListener('click', () => {
  venueClicks++;
  if (venueClicks === 1) playAudio('audio-chalo'); // first click: "chalo"
  if (venueClicks === 2) playAudio('audio-faah'); // second: getting suspicious
  if (venueClicks >= 3) {
    venueClicks = 0;
    const overlay = document.getElementById('easter-egg-overlay');
    overlay.style.display = 'flex';
    playAudio('audio-spiderman'); // dramatic Spiderman reveal for easter egg
    setTimeout(() => { overlay.style.display = 'none'; }, 2500);
  }
});

// --- EASTER EGG: MAP LINK POPUP ---
document.getElementById('map-link')?.addEventListener('click', () => {
  showPopup("Pahunch jana time pe, IST (Indian Standard Time) mat lagana yaha. 🕐");
  playAudio('audio-chalo'); // "Chalo, let's go!"
});

// --- RANDOM DOUBLE-CLICK POPUPS ---
document.addEventListener('dblclick', () => {
  const msg = POPUP_MSGS[Math.floor(Math.random() * POPUP_MSGS.length)];
  showPopup(msg);
  playRandomSfx(); // random sound for chaos on every double-click
});

// --- BUILD CAROUSEL ---
function buildCarousel() {
  const track = document.getElementById('carousel');
  if (!track) return;

  // Shuffle captions
  const caps = [...CAPTIONS].sort(() => Math.random() - 0.5);
  let capIdx = 0;

  // Photos
  PHOTOS.forEach(filename => {
    const card = createPolaroid(
      `assets/photos/${encodeURIComponent(filename)}`,
      caps[capIdx++ % caps.length],
      'photo'
    );
    track.appendChild(card);
  });

  // Videos from Photos folder
  VIDEOS_PHOTOS.forEach(filename => {
    const card = createPolaroid(
      `assets/videos/${encodeURIComponent(filename)}`,
      caps[capIdx++ % caps.length],
      'video'
    );
    track.appendChild(card);
  });

  // Videos from Videos folder
  VIDEOS.forEach(filename => {
    const card = createPolaroid(
      `assets/videos/${encodeURIComponent(filename)}`,
      caps[capIdx++ % caps.length],
      'video'
    );
    track.appendChild(card);
  });

  // Make draggable
  makeDraggable(track);
}

function createPolaroid(src, caption, type) {
  const rot = (Math.random() - 0.5) * 6;
  const tapeRot = (Math.random() - 0.5) * 10;
  const div = document.createElement('div');
  div.className = type === 'video' ? 'polaroid polaroid-video' : 'polaroid';
  div.style.setProperty('--rot', rot + 'deg');

  const tape = document.createElement('div');
  tape.className = 'tape';
  tape.style.setProperty('--tape-rot', tapeRot + 'deg');
  div.appendChild(tape);

  if (type === 'video') {
    const vid = document.createElement('video');
    vid.src = src;
    vid.controls = true;
    vid.preload = 'metadata';
    vid.playsInline = true;
    vid.muted = true;
    div.appendChild(vid);
  } else {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = src;
    img.alt = caption;
    img.onerror = function() { this.src = 'https://placehold.co/280x200/1a1a2e/00ff88?text=📸'; };
    div.appendChild(img);
  }

  const cap = document.createElement('div');
  cap.className = 'polaroid-caption';
  cap.textContent = caption;
  div.appendChild(cap);

  return div;
}

function makeDraggable(el) {
  let isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown', e => {
    isDown = true; el.classList.add('dragging');
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });
  el.addEventListener('mouseleave', () => { isDown = false; el.classList.remove('dragging'); });
  el.addEventListener('mouseup', () => { isDown = false; el.classList.remove('dragging'); });
  el.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
  // Touch
  let touchStartX, touchScrollLeft;
  el.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = el.scrollLeft;
  }, { passive: true });
  el.addEventListener('touchmove', e => {
    const x = e.touches[0].pageX;
    el.scrollLeft = touchScrollLeft - (x - touchStartX);
  }, { passive: true });
}

// --- HASH-BASED DIRECT LINKING ---
function checkHash() {
  const hash = window.location.hash.slice(1);
  if (hash === 'senior' || hash === 'junior') {
    // Dismiss loading screen immediately
    const ls = document.getElementById('loading-screen');
    if (ls) ls.remove();
    transitionTo(hash);
  }
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  buildCarousel();
  setTimeout(checkHash, 100);
});
