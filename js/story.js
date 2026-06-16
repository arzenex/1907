const music = document.getElementById('bg-music');
const vp = document.getElementById('vp');
const ending = document.getElementById('ending-wrap');
const endingMosaic = document.getElementById('ending-mosaic');
const mosaicCtx = endingMosaic.getContext('2d', { alpha: true });
const scrollHint = document.getElementById('scroll-hint');
const scrollSpace = document.querySelector('.scroll-space');

let audioCtx, analyser, dataArray;
let beatPulse = 0;

function initAudioAnalyzer() {
  if (audioCtx) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    const source = audioCtx.createMediaElementSource(music);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
  } catch (e) {
    console.log("Audio analyzer init failed", e);
  }
}

function setMusicIcon(isMuted) {
  const icon = document.getElementById('music-icon');
  if (icon) icon.innerHTML = isMuted ? '&#128263;' : '&#128266;';
}

function playStoryMusic() {
  music.volume = 0.5;
  music.muted = false;
  initAudioAnalyzer();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  return music.play();
}

function toggleMusic() {
  if (music.paused || music.muted) {
    playStoryMusic()
      .then(() => setMusicIcon(false))
      .catch(e => console.log('Audio waiting for interaction', e));
  } else {
    music.muted = true;
    music.pause();
    setMusicIcon(true);
  }
}

window.toggleMusic = toggleMusic;

window.addEventListener('load', () => {
  music.volume = 0.5;
  music.muted = true;
  music.currentTime = 0;
  setMusicIcon(true);
});

const cards = [
  {
    image: 'assets/img1.webp',
    caption: 'Some see you as cute',
text: [
  'Hello Ramu Kaka… 😌✨',
  'सबसे पहले तो…',
  'Many many happy returns',
  'of the day! 🎂💛',
  'आज का दिन officially',
  'सिर्फ तुम्हारा है,',
  'तो बिना judge किए',
  'बस enjoy करो। 😂'
]
  },
  {
    image: 'assets/img2.webp',
    caption: 'Some see you as beautiful',
    text: [
      'काफी time से सोच रहा था',
  'कि इस बार तुम्हें',
  'कैसे surprise दूँ। 👀',
  'पहले plan था',
  'एक cinematic “Boat”',
  'वाली video बनाने का… 🚣‍♂️🎬',
  'Imagination में तो वो',
  'movie जैसी बन चुकी थी। ✨'
    ]
  },
  {
    image: 'assets/img3.webp',
    caption: 'Some see you as elegant',
    text: [
      'Background music, transitions,',
  'slow motion… सब ready था। 😂',
  'बस problem ये थी कि…',
  'वो सिर्फ imagination में',
  'ही अच्छी लग रही थी। 💀',
  'Reality में मेरी',
  'editing skills ने',
  'साफ मना कर दिया। 😭'
    ]
  },
  
  {
    image: 'assets/img4.webp',
    caption: 'Some see you as mysterious',
    text: [
     'फिर मैंने सोचा—',
  'Video रहने देते हैं…',
  'website बनाते हैं। 💻😈',
  'Templates भी देखे थे मैंने…',
  'पर सब बहुत boring लगे।',
  'कहीं बस एक candle थी,',
  'कहीं एक cake…',
  'और बस खत्म। 😂'
    ]
  },
  {
    image: 'assets/img5.webp',
    caption: 'Some see you as sunshine',
    text: [
      'मुझे कुछ और better',
  'बनाना था—',
  'थोड़ा funny,',
  'थोड़ा emotional,',
  'और full “tum” vibes वाला। ✨',
  'फिर शुरू हुआ',
  'असली struggle… 💀',
  'कभी feature टूट जाता था।'
    ]
  },
  {
    image: 'assets/img6.webp',
    caption: 'Some see you as chaos',
    text: [
       'बस वही motivation',
  'काफी थी। ✨',
  'Thank you इतना',
  'हँसाने के लिए,',
  'और हमेशा support',
  'करने के लिए। 🌸',
  ' और cake कैसा लगा',
'Beutiful and Painful tha na'
]
  },
  {
    image: 'assets/img7.webp',
    
    caption: 'Some see you as perfect',
    text: [
      'और हाँ… 👀',
  'तुम्हारा aesthetic side',
  'तो सबने देखा होगा…',
  'पर मेरे पास तुम्हारा',
  'asli HD version भी भले ही तुमको कभी भी देखा ना हो',
  'saved है। 📸😂',
  'अब embarrassment mode',
  'ON होने वाला है। 😈'
    ]
  },
  {
    image: 'assets/img8.webp',
    caption: 'Some see you as Amazing',
    text: [
      'Scroll करो… 🏃‍♂️💨',
  'और सबसे important बात…',
  'PARTY कब दे रही हो? 🍕😂'
    ]
  },
 
  {
    image: 'assets/img9.webp',
    caption: 'Some see you as pure joy  🌻',
    
    
  },
  {
    image: 'assets/img10.webp',
    caption: 'Some see you as a total weirdo',
    
  },
  {
    image: 'assets/img11.webp',
    caption: 'Haye re! Nazar na lage  jaye',
   
  },
  {
    image: 'assets/img12.webp',
    caption: 'But I see you as this',
   
  }
];

const colorThemes = [
  ['rgba(82,24,42,0.38)', 'rgba(62,28,34,0.28)', 'rgba(96,58,36,0.2)', 'rgba(255,230,222,0.09)', '#060305', '#15070d', '#080407'],
  ['rgba(55,32,88,0.38)', 'rgba(72,28,70,0.28)', 'rgba(72,52,36,0.18)', 'rgba(238,224,255,0.08)', '#050409', '#11091a', '#08050d'],
  ['rgba(24,78,54,0.34)', 'rgba(24,62,76,0.3)', 'rgba(28,38,76,0.2)', 'rgba(224,255,242,0.08)', '#030807', '#071513', '#050811'],
  ['rgba(28,42,96,0.38)', 'rgba(10,18,58,0.34)', 'rgba(68,72,92,0.16)', 'rgba(225,232,255,0.08)', '#020307', '#060a18', '#010208'],
  ['rgba(92,64,20,0.36)', 'rgba(82,38,24,0.3)', 'rgba(64,34,76,0.18)', 'rgba(255,240,198,0.08)', '#070503', '#150b06', '#08050d'],
  ['rgba(18,76,42,0.34)', 'rgba(12,72,68,0.3)', 'rgba(18,44,84,0.2)', 'rgba(218,255,242,0.08)', '#020806', '#051411', '#040812'],
  ['rgba(70,42,92,0.34)', 'rgba(30,58,84,0.3)', 'rgba(52,72,28,0.18)', 'rgba(238,242,255,0.08)', '#060409', '#07101a', '#050a04'],
  ['rgba(92,20,38,0.38)', 'rgba(88,58,16,0.3)', 'rgba(82,30,76,0.2)', 'rgba(255,236,222,0.09)', '#080304', '#160b04', '#09040e']
];

const gradients = [
  ['#ffecd2', '#fcb69f', '#ff9a9e'],
  ['#a18cd1', '#fbc2eb', '#f9d29d'],
  ['#84fab0', '#8fd3f4', '#a1c4fd'],
  ['#1a1a2e', '#16213e', '#667eea'],
  ['#f6d365', '#fda085', '#f093fb'],
  ['#43e97b', '#38f9d7', '#4facfe'],
  ['#e0c3fc', '#8ec5fc', '#d4fc79'],
  ['#ff6b6b', '#feca57', '#ff9ff3']
];

const motion = {
  wordDuration: 12,
  wordGap: 0.15,
  groupGap: 2,
  cardDuration: 23,
  cardGap: 2.4,
  endingDuration: 12
};

const yOffsets = [0, -180, 160, -300, 260, -100, 300, -240, 120, -60];
const xOffsets = [0, -80, 90, -50, 70, -100, 40, -70, 100, -30];
const media = {
  width: window.innerWidth,
  height: window.innerHeight,
  dpr: Math.min(window.devicePixelRatio || 1, 1.5)
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile =
  /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
  window.innerWidth < 768;
const lowEndDevice =
  prefersReducedMotion ||
  (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
  window.innerWidth < 430;

const quality = {
  wordPoolSize: lowEndDevice ? 3 : 5,
  cardPoolSize: lowEndDevice ? 2 : 3,
  scrollLerp: prefersReducedMotion ? 1 : lowEndDevice ? 0.32 : 0.18,
  desktopScrollSpeed: 0.15,
  mobileScrollSpeed: 0.15,
  pxPerUnit: lowEndDevice ? 50 : 60,
  mosaicPieces: lowEndDevice ? 100 : 250, // Reduced to prevent end-screen lag
  mosaicDpr: lowEndDevice ? 1 : media.dpr
};

const multiLangChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" +
  "ابتثجحخدذرزسشصضطظعغفقكلمنهوي" +
  "あいうえおかきくけこさしすせそたちつてとなにぬねの" +
  "가나다라마바사아자차카타파하" +
  "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ" +
  "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ" +
  "אבגדהוזחטיכלמנסעפצקרשת" +
  "กขคฆงจฉชซญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ";

// Add your custom emojis and words here! Edit this list anytime!
const floatingExtrasList = ['🤦‍♀️','🤭','🤔','😁','😂😒', '🙄', 'rasgulla', 'Kaisi ho ap', 'Ram Kali', '😹', 'bahut buri ho', 'Gandi si', 'Bahut buri', 'Ayi Badi', 'Ramu Kaka', 'Kamla bahen'];
// List of different fonts to apply randomly to the floating words
const extraFonts = ['Cinzel', 'Poppins', 'Edu TAS Beginner', 'Courier New', 'Georgia', 'Comic Sans MS', 'Verdana'];

const imageCache = new Map();
const timeline = [];
const wordEntries = [];
const cardEntries = [];
const mosaicPieces = [];
const tunnelParticles = [];
const starParticles = [];
const wordPool = [];
const cardPool = [];
const alphabetPool = [];
const extrasPool = [];
let totalUnits = 1;
let currentScroll = 0;
let targetScroll = 0;
let totalScrollPx = 1;
let touchStartY = 0;
let lastScroll = 0;
let scrollVelocity = 0;
let mobileSlowScrollReady = false;
let desktopSlowScrollReady = false;
let activeCardIndex = 0;
let lastThemeKey = '';
let mosaicActive = false;

// Parallax & Trail variables
let gyroX = 0, gyroY = 0;
let currentGyroX = 0, currentGyroY = 0;
const magicTrail = [];
const trailWords = [];
let trailWordCounter = 0;
let mouseX = media.width / 2;
let mouseY = media.height / 2;

window.addEventListener('deviceorientation', e => {
  if (e.gamma !== null) {
    gyroX = Math.max(-45, Math.min(45, e.gamma)) * 1.5;
    gyroY = Math.max(-45, Math.min(45, e.beta - 45)) * 1.5;
  }
});

function updateTrail(x, y) {
  // Calculate swipe speed for velocity-sensitive effects
  const dx = x - mouseX;
  const dy = y - mouseY;
  const speed = Math.min(40, Math.sqrt(dx * dx + dy * dy));
  mouseX = x;
  mouseY = y;

  const baseSize = 8 + speed * 0.3; // Trail gets thicker when swiping fast

  magicTrail.push({ x, y, life: 1, color: `hsl(${Math.random() * 360}, 100%, 65%)`, size: baseSize }); // Rainbow multi-color
  
  trailWordCounter++;
  if (trailWordCounter % 5 === 0) { // Spawn an extra word along the trail
    trailWords.push({
      x: x,
      y: y,
      text: Math.random() > 0.8 ? '✨' : floatingExtrasList[Math.floor(Math.random() * floatingExtrasList.length)],
      life: 1,
      color: `hsl(${Math.random() * 360}, 100%, 75%)`,
      vx: (Math.random() - 0.5) * (speed * 0.2 + 2), // Burst outward based on swipe speed
      vy: (Math.random() - 0.5) * (speed * 0.2 + 2) - 2, // Upward bias, but will fall
      rot: Math.random() * Math.PI * 2, // Start rotation
      rotSpeed: (Math.random() - 0.5) * 0.15 // Tumbling speed
    });
  }
}

window.addEventListener('mousemove', e => { updateTrail(e.clientX, e.clientY); });
window.addEventListener('touchmove', e => { updateTrail(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });

function sentenceCase(text) {
  const value = String(text || '').trim();
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function normalizeWords(card) {
  if (Array.isArray(card.text)) return card.text;
  if (Array.isArray(card.words)) return card.words;
  return String(card.text || '')
    .split('|')
    .map(part => part.trim())
    .filter(Boolean);
}

function imageSrc(image) {
  const value = String(image || '');
  if (/^(https?:)?\/\//.test(value) || value.startsWith('/') || value.includes('/')) return value;
  return `assets/${value}`;
}

function makeWordNode() {
  const el = document.createElement('div');
  el.className = 'word';
  el.setAttribute('aria-hidden', 'true');
  el.style.display = 'none';
  vp.insertBefore(el, ending);
  return { el, key: '' };
}

function makeCardNode() {
  const el = document.createElement('div');
  el.className = 'card';
  el.style.display = 'none';

  const bg = document.createElement('div');
  bg.className = 'card-bg';

  const imageWrap = document.createElement('div');
  imageWrap.className = 'card-img';

  const img = document.createElement('img');
  img.alt = '';
  img.decoding = 'async';
  imageWrap.appendChild(img);

  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';

  const caption = document.createElement('div');
  caption.className = 'card-caption';
  const captionText = document.createElement('p');
  caption.appendChild(captionText);

  const num = document.createElement('div');
  num.className = 'card-num';

  el.append(bg, imageWrap, overlay, caption, num);
  vp.insertBefore(el, ending);
  return { el, bg, img, captionText, num, key: -1 };
}

function buildPools() {
  for (let i = 0; i < quality.wordPoolSize; i++) wordPool.push(makeWordNode());
  for (let i = 0; i < quality.cardPoolSize; i++) cardPool.push(makeCardNode());

  const numAlphabets = lowEndDevice ? 30 : 70;
  for (let i = 0; i < numAlphabets; i++) {
    const el = document.createElement('div');
    el.className = 'alphabet-particle';
    el.style.position = 'absolute';
    el.style.left = '0';
    el.style.top = '0';
    el.style.pointerEvents = 'none';
    el.style.willChange = 'transform, opacity';

    const char = multiLangChars[Math.floor(Math.random() * multiLangChars.length)];
    el.textContent = char;

    const hue = Math.floor(Math.random() * 360);
    const lightness = 60 + Math.random() * 30;
    el.style.color = `hsl(${hue}, 100%, ${lightness}%)`;
    el.style.textShadow = `0 0 10px hsl(${hue}, 100%, ${lightness}%)`;

    const size = 12 + Math.random() * 24;
    el.style.fontSize = `${size}px`;
    el.style.fontWeight = 'bold';
    el.style.display = 'none';

    vp.insertBefore(el, ending);

    alphabetPool.push({
      el,
      x: (Math.random() - 0.5) * media.width * 1.5,
      y: (Math.random() - 0.5) * media.height * 1.5,
      z: Math.random() * 5500 - 3500
    });
  }

  // Build pool for custom Emojis and Words
  const numExtras = lowEndDevice ? 15 : 35;
  for (let i = 0; i < numExtras; i++) {
    const el = document.createElement('div');
    el.className = 'extra-particle';
    el.style.position = 'absolute';
    el.style.left = '0';
    el.style.top = '0';
    el.style.pointerEvents = 'none';
    el.style.willChange = 'transform, opacity';
    el.style.whiteSpace = 'nowrap'; // Keeps words on one line

    // Pick a random word or emoji
    el.textContent = floatingExtrasList[Math.floor(Math.random() * floatingExtrasList.length)];

    // Subdued Colors and Uniform Font to prevent distraction
    el.style.color = `rgba(255, 255, 255, 0.25)`; // Soft white
    el.style.textShadow = `none`; 

    // Slim, sharp fonts
    el.style.fontSize = `${14 + Math.random() * 8}px`; // Slightly larger for thinner font
    el.style.fontFamily = `'Cinzel', serif`; 
    el.style.fontWeight = '400';
    el.style.display = 'none';

    el.style.pointerEvents = 'auto'; // Make interactive!
    el.style.cursor = 'pointer';
    el.style.userSelect = 'none'; // Prevents the blue text highlight
    el.style.webkitUserSelect = 'none'; // Prevents highlight on iOS/Safari
    
    el.addEventListener('click', (e) => {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
          colors: ['#ff00ff', '#00ffff', '#ffff00']
        });
      }
      const p = extrasPool.find(ex => ex.el === el);
      if (p) p.z -= 4000; // Push far back so it respawns
      el.style.transform += ' scale(2)';
      el.style.opacity = '0';
    });

    vp.insertBefore(el, ending);

    extrasPool.push({
      el,
      x: (Math.random() - 0.5) * media.width * 1.5,
      y: (Math.random() - 0.5) * media.height * 1.5,
      z: Math.random() * 5500 - 3500,
      rotSpeed: (Math.random() - 0.5) * 0.04 // Slower rotation so words are readable
    });
  }
}

function buildTimeline() {
  let cursor = 0;

  cards.forEach((card, cardIndex) => {
    const words = normalizeWords(card);

    words.forEach((word, wordIndex) => {
      const start = cursor + wordIndex * (motion.wordDuration + motion.wordGap);
      const entry = {
        type: 'word',
        key: `w-${cardIndex}-${wordIndex}`,
        cardIndex,
        text: sentenceCase(word),
        x: xOffsets[wordIndex % xOffsets.length],
        y: yOffsets[wordIndex % yOffsets.length],
        start,
        end: start + motion.wordDuration,
        duration: motion.wordDuration
      };
      timeline.push(entry);
      wordEntries.push(entry);
    });

    cursor += words.length * (motion.wordDuration + motion.wordGap) + motion.groupGap;
  });

  cards.forEach((card, cardIndex) => {
    const entry = {
      type: 'card',
      key: `c-${cardIndex}`,
      cardIndex,
      card,
      start: cursor,
      end: cursor + motion.cardDuration,
      duration: motion.cardDuration
    };
    timeline.push(entry);
    cardEntries.push(entry);
    cursor = entry.end + motion.cardGap;
  });

  totalUnits = cursor + motion.endingDuration;
}

function parseColor(value) {
  if (value.startsWith('#')) {
    const hex = value.slice(1);
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
      1
    ];
  }

  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) return [0, 0, 0, 1];
  const parts = match[1].split(',').map(part => Number(part.trim()));
  return [parts[0], parts[1], parts[2], parts[3] ?? 1];
}

const themeValues = cards.map((_, index) => {
  const theme = colorThemes[index % colorThemes.length];
  return {
    glow1: parseColor(theme[0]),
    glow2: parseColor(theme[1]),
    glow3: parseColor(theme[2]),
    core: parseColor(theme[3]),
    base1: parseColor(theme[4]),
    base2: parseColor(theme[5]),
    base3: parseColor(theme[6])
  };
});

function mix(a, b, t) {
  return a + (b - a) * t;
}

function colorToRgba(color) {
  return `rgba(${Math.round(color[0])}, ${Math.round(color[1])}, ${Math.round(color[2])}, ${Math.max(0, Math.min(1, color[3])).toFixed(3)})`;
}

function blendColor(a, b, t) {
  return [
    mix(a[0], b[0], t),
    mix(a[1], b[1], t),
    mix(a[2], b[2], t),
    mix(a[3], b[3], t)
  ];
}

function setTheme(unit) {
  const section = Math.max(0, Math.min(cards.length - 1, unit / Math.max(1, totalUnits - motion.endingDuration) * (cards.length - 1)));
  const fromIndex = Math.floor(section);
  const toIndex = Math.min(cards.length - 1, fromIndex + 1);
  const amount = section - fromIndex;
  const from = themeValues[fromIndex];
  const to = themeValues[toIndex];
  const key = `${fromIndex}-${toIndex}-${amount.toFixed(2)}`;

  if (key === lastThemeKey) return;
  lastThemeKey = key;

  document.body.style.setProperty('--tunnel-glow-1', colorToRgba(blendColor(from.glow1, to.glow1, amount)));
  document.body.style.setProperty('--tunnel-glow-2', colorToRgba(blendColor(from.glow2, to.glow2, amount)));
  document.body.style.setProperty('--tunnel-glow-3', colorToRgba(blendColor(from.glow3, to.glow3, amount)));
  document.body.style.setProperty('--tunnel-core', colorToRgba(blendColor(from.core, to.core, amount)));
  document.body.style.setProperty('--tunnel-base-1', colorToRgba(blendColor(from.base1, to.base1, amount)));
  document.body.style.setProperty('--tunnel-base-2', colorToRgba(blendColor(from.base2, to.base2, amount)));
  document.body.style.setProperty('--tunnel-base-3', colorToRgba(blendColor(from.base3, to.base3, amount)));
}

function transformFor(local) {
  const clamped = Math.max(0, Math.min(1, local));
  if (clamped < 0.5) {
    const p = clamped / 0.5;
    return {
      z: mix(-2500, 0, p),
      scale: mix(0.05, 1, p),
      opacity: p
    };
  }

  const p = (clamped - 0.5) / 0.5;
  return {
    z: mix(0, 1800, p),
    scale: mix(1, 7, p),
    opacity: 1 - p
  };
}

function applySceneTransform(el, x, y, z, scale) {
  el.style.transform =
    `translate3d(${media.width * 0.5 + x + currentGyroX}px, ${media.height * 0.5 + y + currentGyroY}px, ${z}px) ` +
    `translate3d(-50%, -50%, 0) scale(${scale})`;
}

function getNearby(entries, unit, before, after, limit) {
  const active = [];
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (unit >= entry.start - before && unit <= entry.end + after) active.push(entry);
  }
  active.sort((a, b) => Math.abs(unit - (a.start + a.duration * 0.5)) - Math.abs(unit - (b.start + b.duration * 0.5)));
  return active.slice(0, limit);
}

function loadImage(index) {
  if (index < 0 || index >= cards.length) return null;
  let cached = imageCache.get(index);
  if (cached) {
    cached.lastUsed = performance.now();
    return cached;
  }

  const img = new Image();
  img.decoding = 'async';
  const src = imageSrc(cards[index].image);
  img.src = src;
  cached = { img, src, lastUsed: performance.now() };
  imageCache.set(index, cached);
  return cached;
}

function updateImageWindow(centerIndex, visibleIndices = []) {
  // Load all images and keep them in memory since there are only a few (9 cards).
  // This ensures the ending mosaic has all images instantly available to draw,
  // avoiding the issue where only the last visible image gets repeated.
  for (let i = 0; i < cards.length; i++) {
    loadImage(i);
  }
}

function gradientFor(index) {
  const g = gradients[index % gradients.length];
  return `linear-gradient(135deg, ${g[0]}, ${g[1]}, ${g[2]})`;
}

function renderWords(unit) {
  const active = getNearby(wordEntries, unit, 0.35, 0.35, quality.wordPoolSize);

  for (let i = 0; i < quality.wordPoolSize; i++) {
    const slot = wordPool[i];
    const entry = active[i];
    
    if (!entry) {
      if (slot.el.style.display !== 'none') {
        slot.el.style.display = 'none';
        slot.key = '';
      }
      continue;
    }

    const local = (unit - entry.start) / entry.duration;
    const state = transformFor(local);
    
    if (state.opacity <= 0.002) {
      if (slot.el.style.display !== 'none') {
        slot.el.style.display = 'none';
      }
      continue;
    }

    if (slot.key !== entry.key) {
      slot.el.textContent = entry.text;
      slot.key = entry.key;
    }

    if (slot.el.style.display !== 'block') slot.el.style.display = 'block';
    slot.el.style.opacity = state.opacity.toFixed(3);
    applySceneTransform(slot.el, entry.x, entry.y, state.z, state.scale);
  }
}

function renderCards(unit) {
  const active = getNearby(cardEntries, unit, 1.1, 1.1, quality.cardPoolSize);
  updateImageWindow(activeCardIndex, active.map(entry => entry.cardIndex));

  for (let i = 0; i < quality.cardPoolSize; i++) {
    const slot = cardPool[i];
    const entry = active[i];
    
    if (!entry) {
      if (slot.el.style.display !== 'none') {
        slot.el.style.display = 'none';
        slot.key = -1;
        slot.img.removeAttribute('src');
      }
      continue;
    }

    const local = (unit - entry.start) / entry.duration;
    const state = transformFor(local);
    
    if (state.opacity <= 0.002) {
      if (slot.el.style.display !== 'none') {
        slot.el.style.display = 'none';
      }
      continue;
    }

    if (slot.key !== entry.cardIndex) {
      slot.bg.style.background = gradientFor(entry.cardIndex);
      slot.captionText.textContent = entry.card.caption || '';
      slot.num.textContent = `${String(entry.cardIndex + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
      slot.key = entry.cardIndex;
    }

    const cached = loadImage(entry.cardIndex);
    if (cached && slot.img.getAttribute('src') !== cached.src) {
      slot.img.src = cached.src;
    }

    if (slot.el.style.display !== 'block') slot.el.style.display = 'block';
    slot.el.style.opacity = state.opacity.toFixed(3);
    applySceneTransform(slot.el, 0, 0, state.z, state.scale);
  }
}

function findActiveCardIndex(unit) {
  for (let i = 0; i < cardEntries.length; i++) {
    if (unit >= cardEntries[i].start - 2 && unit <= cardEntries[i].end + 2) return i;
  }

  let closest = activeCardIndex;
  let distance = Infinity;
  for (let i = 0; i < timeline.length; i++) {
    const entry = timeline[i];
    const midpoint = entry.start + entry.duration * 0.5;
    const nextDistance = Math.abs(unit - midpoint);
    if (nextDistance < distance) {
      distance = nextDistance;
      closest = entry.cardIndex;
    }
  }
  return closest;
}

function resizeMosaic() {
  const dpr = quality.mosaicDpr;
  const width = endingMosaic.clientWidth;
  const height = endingMosaic.clientHeight;
  endingMosaic.width = Math.max(1, Math.ceil(width * dpr));
  endingMosaic.height = Math.max(1, Math.ceil(height * dpr));
  mosaicCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function buildMosaicPieces() {
  const width = endingMosaic.clientWidth || media.width;
  const height = endingMosaic.clientHeight || media.height;
  mosaicPieces.length = 0;

  // NEW: Smaller visible image cards floating in the background
  const baseSize = isMobile ? 60 : 120;
  for (let i = 0; i < cards.length * 2; i++) {
    mosaicPieces.push({
      imageIndex: i % cards.length,
      x: Math.random() * width,
      y: Math.random() * height,
      size: baseSize + Math.random() * baseSize,
      speed: 0.15 + Math.random() * 0.3,
      drift: 0.2 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.12 + Math.random() * 0.18, // Subtle, ghostly opacity
      type: 'image-card'
    });
  }

  // Large floating pieces (previous effect)
  for (let i = 0; i < quality.mosaicPieces; i++) {
    mosaicPieces.push({
      imageIndex: i % cards.length,
      x: Math.random() * width,
      y: Math.random() * height,
      size: (lowEndDevice ? 8 : 7) + Math.random() * (lowEndDevice ? 12 : 14),
      speed: 0.08 + Math.random() * 0.16,
      drift: 0.08 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.22 + Math.random() * 0.32,
      type: 'large'
    });
  }

  // Tiny background particles (new effect - 100s of them)
  const tinyCount = lowEndDevice ? 150 : 300; // Reduced for performance
  for (let i = 0; i < tinyCount; i++) {
    mosaicPieces.push({
      imageIndex: i % cards.length,
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 3,
      speed: 0.02 + Math.random() * 0.08,
      drift: 0.03 + Math.random() * 0.12,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.08 + Math.random() * 0.16,
      type: 'tiny'
    });
  }
}

function buildTunnelParticles() {
  tunnelParticles.length = 0;
  const particleCount = lowEndDevice ? 50 : 120; // Reduced for performance
  
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 300 + 50;
    
    tunnelParticles.push({
      imageIndex: i % cards.length,
      angle: angle,
      distance: distance,
      speed: 2 + Math.random() * 4,
      size: 2 + Math.random() * 4,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.15 + Math.random() * 0.25,
      life: Math.random() * 0.5
    });
  }
}

function buildStarWarp() {
  starParticles.length = 0;
  const starCount = lowEndDevice ? 200 : 400; // Increased count
  for (let i = 0; i < starCount; i++) {
    starParticles.push({
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * Math.max(media.width, media.height), // Spread evenly on init
      speed: 1 + Math.random() * 2, // Faster speed
      color: Math.random() > 0.5 ? '255, 255, 255' : '150, 220, 255', // White and glowing cyan
      alpha: 0.3 + Math.random() * 0.7
    });
  }
}

function drawMosaic(endingProgress) {
  const width = endingMosaic.clientWidth;
  const height = endingMosaic.clientHeight;
  const time = performance.now() * 0.001;
  const centerX = width / 2;
  const centerY = height / 2;

  mosaicCtx.clearRect(0, 0, width, height);

  if (endingProgress > 0) {
    // Draw floating pieces (large and tiny)
    for (let i = 0; i < mosaicPieces.length; i++) {
      const piece = mosaicPieces[i];
      const cached = imageCache.get(piece.imageIndex);
      if (!cached || !cached.img.complete || !cached.img.naturalWidth) continue;

      piece.y += piece.speed;
      if (piece.y > height + piece.size) {
        piece.y = -piece.size;
        piece.x = Math.random() * width;
      }

      mosaicCtx.globalAlpha = piece.alpha * endingProgress;
      const offsetX = Math.sin(time + piece.phase) * piece.drift * 12;
      
      if (piece.type === 'image-card') {
        const aspectRatio = cached.img.naturalWidth / cached.img.naturalHeight || 1;
        const drawWidth = piece.size;
        const drawHeight = piece.size / aspectRatio;
        
        mosaicCtx.save();
        mosaicCtx.translate(Math.floor(piece.x + offsetX), Math.floor(piece.y));
        mosaicCtx.rotate(Math.sin(time * 0.5 + piece.phase) * 0.15); // Gentle rock animation
        mosaicCtx.drawImage(
          cached.img,
          Math.floor(-drawWidth / 2),
          Math.floor(-drawHeight / 2),
          Math.floor(drawWidth),
          Math.floor(drawHeight)
        );
        mosaicCtx.restore();
      } else {
        if (piece.type === 'tiny') {
          // MASSIVE PERFORMANCE BOOST: Draw tiny pieces as simple rects instead of heavy images
          mosaicCtx.fillStyle = `rgba(255, 255, 255, ${mosaicCtx.globalAlpha})`;
          mosaicCtx.fillRect(Math.floor(piece.x + offsetX), Math.floor(piece.y), piece.size, piece.size);
        } else {
        mosaicCtx.drawImage(
          cached.img,
          Math.floor(piece.x + offsetX),
          Math.floor(piece.y),
          piece.size,
          piece.size * 1.25
        );
        }
      }
    }

    // Draw tunnel particles (coming from end)
    for (let i = 0; i < tunnelParticles.length; i++) {
      const particle = tunnelParticles[i];
      const cached = imageCache.get(particle.imageIndex);
      if (!cached || !cached.img.complete || !cached.img.naturalWidth) continue;

      // Particle moves forward (towards viewer)
      particle.distance -= particle.speed;
      
      if (particle.distance < 0) {
        particle.distance = 300 + Math.random() * 100;
      }

      // Calculate position in tunnel
      const scale = particle.distance / 400;
      const x = centerX + Math.cos(particle.angle) * particle.distance * 0.5;
      const y = centerY + Math.sin(particle.angle) * particle.distance * 0.5;
      const size = particle.size * scale * (1 + beatPulse * 0.5); // Pulse with music!

      if (size > 0.5) {
        mosaicCtx.globalAlpha = particle.alpha * scale * endingProgress;
        mosaicCtx.drawImage(
          cached.img,
          Math.floor(x - size / 2),
          Math.floor(y - size / 2),
          Math.ceil(size),
          Math.ceil(size * 1.25)
        );
      }
    }

    // Draw gradients
    const gradient = mosaicCtx.createRadialGradient(
      width / 2, height / 2, width * 0.05,
      width / 2, height / 2, width * 0.62
    );
    gradient.addColorStop(0, 'rgba(42,42,42,0.12)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.72)');

    mosaicCtx.globalAlpha = endingProgress;
    mosaicCtx.fillStyle = gradient;
    mosaicCtx.fillRect(0, 0, width, height);
    mosaicCtx.fillStyle = `rgba(0,0,0,${0.34 * endingProgress})`;
    mosaicCtx.fillRect(0, 0, width, height);
  }

  // Draw Star Warp Effect
  mosaicCtx.save();
  mosaicCtx.globalCompositeOperation = 'screen';
  
  // Calculate warp speed: Drifts slowly, gets much faster when scrolling
  const warpSpeedMultiplier = 0.1 + Math.min(2.5, scrollVelocity * 0.2) + (beatPulse * 1.5); // Surge with beat!
  
  for (let i = 0; i < starParticles.length; i++) {
    const star = starParticles[i];
    
    // Speed up exponentially as they get further from the center, tied to scroll speed
    star.distance += (star.distance * 0.02 + 1) * star.speed * warpSpeedMultiplier;
    
    if (star.distance > Math.max(width, height)) {
      star.distance = Math.random() * 20; // Respawn near center
      star.angle = Math.random() * Math.PI * 2;
    }

    // Explicit tail length guarantees visible stretching streaks!
    const tailLength = Math.max(10, star.distance * 0.2);

    const x1 = centerX + Math.cos(star.angle) * star.distance;
    const y1 = centerY + Math.sin(star.angle) * star.distance;
    const x2 = centerX + Math.cos(star.angle) * (star.distance - tailLength);
    const y2 = centerY + Math.sin(star.angle) * (star.distance - tailLength);

    // Fade in smoothly as they fly outwards
    const distanceRatio = Math.min(1, star.distance / (Math.max(width, height) / 3));
    
    mosaicCtx.beginPath();
    mosaicCtx.moveTo(x1, y1);
    mosaicCtx.lineTo(x2, y2);
    mosaicCtx.strokeStyle = `rgba(${star.color}, ${star.alpha * distanceRatio})`;
    mosaicCtx.lineWidth = Math.max(1.5, 4 * distanceRatio); // Thicker, visible lines
    mosaicCtx.lineCap = 'round';
    mosaicCtx.stroke();
  }

  // Draw Magic Touch Trail
  mosaicCtx.lineCap = 'round';
  for (let i = magicTrail.length - 1; i >= 0; i--) {
    const pt = magicTrail[i];
    pt.life -= 0.02; // Fade out
    if (pt.life <= 0) {
      magicTrail.splice(i, 1);
      continue;
    }
    
    mosaicCtx.beginPath();
    mosaicCtx.arc(pt.x, pt.y, pt.life * (pt.size * 0.5), 0, Math.PI * 2);
    mosaicCtx.fillStyle = pt.color.replace(')', `, ${pt.life})`).replace('hsl', 'hsla');
    mosaicCtx.fill();
    
    // Connect to previous point
    if (i > 0) {
      const prev = magicTrail[i - 1];
      mosaicCtx.beginPath();
      mosaicCtx.moveTo(pt.x, pt.y);
      mosaicCtx.lineTo(prev.x, prev.y);
      mosaicCtx.strokeStyle = pt.color.replace(')', `, ${pt.life * 0.5})`).replace('hsl', 'hsla');
      mosaicCtx.lineWidth = pt.life * pt.size;
      mosaicCtx.stroke();
    }
  }

  // Draw Trail Words
  mosaicCtx.textAlign = 'center';
  mosaicCtx.textBaseline = 'middle';
  for (let i = trailWords.length - 1; i >= 0; i--) {
    const tw = trailWords[i];
    tw.life -= 0.015;
    if (tw.life <= 0) {
      trailWords.splice(i, 1);
      continue;
    }
    tw.x += tw.vx;
    tw.y += tw.vy;
    tw.vy += 0.08; // Gravity effect
    tw.rot += tw.rotSpeed; // Tumbling effect
    
    // Math.sin creates a beautiful "Pop-up and Shrink" animation
    const scale = Math.sin(tw.life * Math.PI);
    
    mosaicCtx.save();
    mosaicCtx.translate(tw.x, tw.y);
    mosaicCtx.rotate(tw.rot);
    mosaicCtx.font = `400 ${scale * 24}px 'Cinzel', serif`;
    mosaicCtx.fillStyle = tw.color.replace(')', `, ${tw.life})`).replace('hsl', 'hsla');
    mosaicCtx.fillText(tw.text, 0, 0);
    mosaicCtx.restore();
  }
  mosaicCtx.restore();
}

function renderAlphabets(unit) {
  const zSpeed = lowEndDevice ? 4 : 6;
  const zMin = -3500;
  const zMax = 2000;
  const zRange = zMax - zMin;

  for (let i = 0; i < alphabetPool.length; i++) {
    const p = alphabetPool[i];
    
    let currentZ = ((p.z + currentScroll * zSpeed - zMin) % zRange);
    if (currentZ < 0) currentZ += zRange;
    currentZ += zMin;

    let opacity = 1;
    if (currentZ < -2000) {
      opacity = (currentZ - zMin) / (-2000 - zMin);
    } else if (currentZ > 500) {
      opacity = 1 - ((currentZ - 500) / (zMax - 500));
    }

    const start = totalUnits - motion.endingDuration;
    if (unit > start) {
      const endLocal = (unit - start) / motion.endingDuration;
      opacity *= Math.max(0, 1 - endLocal);
    }

    if (opacity <= 0.01) {
      if (p.el.style.display !== 'none') p.el.style.display = 'none';
      continue;
    }

    if (p.el.style.display !== 'block') p.el.style.display = 'block';
    p.el.style.opacity = opacity.toFixed(3);

    let scale = currentZ < 0 ? Math.max(0.01, 1 + (currentZ / 2500)) : 1 + (currentZ / 1800) * 4;
    
    p.el.style.transform = 
      `translate3d(${media.width * 0.5 + p.x + currentGyroX}px, ${media.height * 0.5 + p.y + currentGyroY}px, ${currentZ}px) ` +
      `translate3d(-50%, -50%, 0) scale(${scale}) rotate(${currentZ * 0.05}deg)`;
  }
}

function renderExtras(unit) {
  const zSpeed = lowEndDevice ? 4 : 6;
  const zMin = -3500;
  const zMax = 2000;
  const zRange = zMax - zMin;

  for (let i = 0; i < extrasPool.length; i++) {
    const p = extrasPool[i];
    
    let currentZ = ((p.z + currentScroll * zSpeed - zMin) % zRange);
    if (currentZ < 0) currentZ += zRange;
    currentZ += zMin;

    let opacity = 1;
    if (currentZ < -2000) {
      opacity = (currentZ - zMin) / (-2000 - zMin);
    } else if (currentZ > 500) {
      opacity = 1 - ((currentZ - 500) / (zMax - 500));
    }

    const start = totalUnits - motion.endingDuration;
    if (unit > start) {
      const endLocal = (unit - start) / motion.endingDuration;
      opacity *= Math.max(0, 1 - endLocal);
    }

    if (opacity <= 0.01) { if (p.el.style.display !== 'none') p.el.style.display = 'none'; continue; }
    if (p.el.style.display !== 'block') p.el.style.display = 'block';
    p.el.style.opacity = (opacity * 0.2).toFixed(3); // Cap opacity at 20% for maximum subtlety

    let scale = currentZ < 0 ? Math.max(0.01, 1 + (currentZ / 2500)) : 1 + (currentZ / 1800) * 4;
    p.el.style.transform = `translate3d(${media.width * 0.5 + p.x + currentGyroX}px, ${media.height * 0.5 + p.y + currentGyroY}px, ${currentZ}px) translate3d(-50%, -50%, 0) scale(${scale}) rotate(${currentZ * p.rotSpeed}deg)`;
  }
}

function renderEnding(unit) {
  const start = totalUnits - motion.endingDuration;
  const local = (unit - start) / motion.endingDuration;
  const show = local > -0.2;

  // Always ensure canvas is fully visible and not scaled so the star warp runs in the background
  endingMosaic.style.opacity = '1';
  endingMosaic.style.transform = 'none';

  if (!show) {
    mosaicActive = false;
    ending.style.opacity = '0';
    drawMosaic(0); // Draw only star warp
    return;
  }

  const p = Math.max(0, Math.min(1, local));
  mosaicActive = true;
  ending.style.opacity = p.toFixed(3);
  applySceneTransform(ending, 0, 0, mix(-1800, 0, p), mix(0.18, 1, p));
  drawMosaic(p); // Draw star warp + ending particles fading in
}

function render(unit) {
  activeCardIndex = findActiveCardIndex(unit);
  setTheme(unit);
  renderAlphabets(unit);
  renderExtras(unit);
  renderWords(unit);
  renderCards(unit);
  renderEnding(unit);

  if (scrollHint) {
    const opacity = Math.max(0, 1 - unit / 4);
    scrollHint.style.opacity = opacity.toFixed(3);
    scrollHint.style.transform = `translate3d(-50%, ${-20 * (1 - opacity)}px, 0)`;
  }
}

function tick() {
  if (!isMobile && !desktopSlowScrollReady) {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    targetScroll = Math.max(targetScroll, Math.min(totalScrollPx, scrollY * quality.desktopScrollSpeed));
  }

  const diff = targetScroll - currentScroll;
  if (Math.abs(diff) > 0.08) {
    currentScroll += diff * quality.scrollLerp;
  } else {
    currentScroll = targetScroll;
  }

  // Audio Processing
  if (analyser && dataArray) {
    analyser.getByteFrequencyData(dataArray);
    const bass = (dataArray[1] + dataArray[2] + dataArray[3]) / 3;
    beatPulse = bass / 255;
  }

  // Smooth Gyroscope Parallax
  currentGyroX += (gyroX - currentGyroX) * 0.1;
  currentGyroY += (gyroY - currentGyroY) * 0.1;

  // Track scroll velocity for Star Warp
  scrollVelocity = Math.abs(currentScroll - lastScroll);
  lastScroll = currentScroll;

  const unit = (currentScroll / totalScrollPx) * totalUnits;
  render(unit);
  requestAnimationFrame(tick);
}

function resize() {
  media.width = window.innerWidth;
  media.height = window.innerHeight;
  media.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  totalScrollPx = Math.max(media.height * 5, totalUnits * quality.pxPerUnit);
  const scrollHeight = isMobile
    ? totalScrollPx + media.height
    : (totalScrollPx / quality.desktopScrollSpeed) + media.height;
  scrollSpace.style.height = `${Math.ceil(scrollHeight)}px`;
  resizeMosaic();
  buildMosaicPieces();
  buildTunnelParticles();
  buildStarWarp();
}

function setupMobileSlowScroll() {
  if (!isMobile || mobileSlowScrollReady) return;
  mobileSlowScrollReady = true;

  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.height = '100vh';

  const swipeMultiplier = lowEndDevice ? 3.8 : 5.0;

  document.addEventListener('touchstart', event => {
    touchStartY = event.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchmove', event => {
    const nextY = event.touches[0].clientY;
    let delta = (touchStartY - nextY) * swipeMultiplier * quality.mobileScrollSpeed;
    delta = Math.max(0, Math.min(12, delta)); // Block backwards scrolling
    touchStartY = nextY;
    targetScroll = Math.max(targetScroll, Math.min(totalScrollPx, targetScroll + delta));
    event.preventDefault();
  }, { passive: false });

  document.addEventListener('wheel', event => {
    let delta = event.deltaY * quality.mobileScrollSpeed;
    delta = Math.max(0, Math.min(12, delta)); // Clamp forward speed limit, block backward
    targetScroll = Math.max(targetScroll, Math.min(totalScrollPx, targetScroll + delta));
    event.preventDefault();
  }, { passive: false });
}

function normalizedWheelDelta(event) {
  if (event.deltaMode === 1) return event.deltaY * 18;
  if (event.deltaMode === 2) return event.deltaY * media.height;
  return event.deltaY;
}

function setupDesktopSlowScroll() {
  if (isMobile || desktopSlowScrollReady) return;
  desktopSlowScrollReady = true;

  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.height = '100vh';

  document.addEventListener('wheel', event => {
    let delta = normalizedWheelDelta(event) * quality.desktopScrollSpeed;
    delta = Math.max(0, Math.min(12, delta)); // Prevent fast spinning forwards, block backwards
    targetScroll = Math.max(targetScroll, Math.min(totalScrollPx, targetScroll + delta));
    event.preventDefault();
  }, { passive: false });

  document.addEventListener('keydown', event => {
    const step = media.height * quality.desktopScrollSpeed;
    const keys = {
      ArrowDown: step * 0.1,
      PageDown: step * 0.3
    };

    if (!(event.key in keys)) return;
    targetScroll = Math.max(targetScroll, Math.min(totalScrollPx, targetScroll + keys[event.key]));
    event.preventDefault();
  });
}

buildTimeline();
buildPools();
resize();
setupMobileSlowScroll();
setupDesktopSlowScroll();
updateImageWindow(0);

// Preload all images for mosaic
for (let i = 0; i < cards.length; i++) {
  loadImage(i);
}

// Ensure mosaic and tunnel are (re)built after images are loaded
buildMosaicPieces();
buildTunnelParticles();
buildStarWarp();

requestAnimationFrame(tick);

// Expose retry function so you can trigger rebuilding at runtime
window.retryMosaic = function() {
  console.log('Retrying mosaic & tunnel build...');
  for (let i = 0; i < cards.length; i++) loadImage(i);
  buildMosaicPieces();
  buildTunnelParticles();
  buildStarWarp();
};

window.addEventListener('resize', resize, { passive: true });

// Automatically start music when the user starts scrolling
const startMusicOnScroll = () => {
  if (music.paused || music.muted) {
    playStoryMusic()
      .then(() => setMusicIcon(false))
      .catch(err => console.log("Music play on scroll deferred:", err));
  }
  // Remove listeners after the first scroll attempt
  window.removeEventListener('wheel', startMusicOnScroll);
  window.removeEventListener('touchmove', startMusicOnScroll);
};

window.addEventListener('wheel', startMusicOnScroll, { passive: true });
window.addEventListener('touchmove', startMusicOnScroll, { passive: true });
