let state = "WAIT";
let progress = 0;
let finalStage = false;
const target = 300;
let lastX,lastY,lastZ;
const music = document.getElementById('bg-music');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function toggleMusic() {
    const icon = document.getElementById('music-icon');
    if (music.paused) { music.play(); icon.innerText = "🔊"; } 
    else { music.pause(); icon.innerText = "🔇"; }
}

function startApp(){
    music.volume = 0.5;
    music.currentTime = 0;
    music.play().catch(e => console.log("Audio waiting for interaction"));

    // 1. Safely check for DeviceMotion to prevent crashes on Desktop/Android
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(res => { if(res === 'granted') window.addEventListener('devicemotion', handleMotion); })
            .catch(console.error);
    } else {
        window.addEventListener('devicemotion', handleMotion);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gsap.to("#intro-overlay",{
        opacity:0, duration:1,
        onComplete:()=>{
            document.getElementById('intro-overlay').style.display='none';
            document.getElementById('main-container').style.opacity='1';
        }
    });

    // Ensure the cake sits ABOVE the dark room lighting
    const cakeGroup = document.getElementById('cake-group');
    cakeGroup.style.position = 'relative';
    cakeGroup.style.zIndex = '10';

    // Cake building animation mimicking the layer-by-layer SVG style
    // Change timeScale to adjust overall speed (e.g., 0.5 for half speed, 1.5 to make it 50% faster)
    const cakeTl = gsap.timeline({ timeScale: 1, delay: 0.5 }); 
    cakeTl.from("#cake-group", { y: 50, opacity: 0, duration: 1, ease: "power2.out" })
          .from(".plate", { scaleX: 0, transformOrigin: "center", duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".layer-bottom", { scaleY: 0, transformOrigin: "bottom center", duration: 0.8, ease: "power3.out" }, "-=0.5")
          .from(".layer-mid", { scaleY: 0, transformOrigin: "bottom center", duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".layer-top", { scaleY: 0, transformOrigin: "bottom center", duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".candles-container", { scaleY: 0, y: 20, transformOrigin: "bottom center", opacity: 0, duration: 0.8, ease: "back.out(1.2)" }, "-=0.5");

    // Dynamic Lighting Setup
    const roomLighting = document.createElement('div');
    roomLighting.id = 'room-lighting';
    roomLighting.style.position = 'fixed';
    roomLighting.style.inset = '0';
    roomLighting.style.pointerEvents = 'none';
    roomLighting.style.zIndex = '5';
    roomLighting.style.background = 'rgba(0,0,0,0.7)';
    roomLighting.style.transition = 'background 1s ease';
    document.getElementById('main-container').insertBefore(roomLighting, document.getElementById('cake-group'));

    // 2. Fallback: Allow clicking/tapping the screen to simulate shaking (for Desktop / unsupported devices)
    window.addEventListener('click', (e) => {
        // Only allow click-to-shake on Desktop. Mobile users must physically shake!
        if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) return;

        // Ignore if clicking the start button, mystery boxes, or if we are cutting the cake
        if(e.target.closest('button') || state === "FIND_KNIFE" || state === "SWIPE_CUT" || state === "END") return;

        // Simulate device motion changes to progress the state
        lastX = 0; lastY = 0; lastZ = 0; 
        if (state === "WAIT") {
            handleMotion({ accelerationIncludingGravity: { x: 50, y: 0, z: 0 } });
        } else if (state === "LIT") {
            handleMotion({ accelerationIncludingGravity: { x: 40, y: 0, z: 0 } });
            progress += 15; // Desktop click boost so it's playable against the decay
        } else if (state === "FINAL") {
            handleMotion({ accelerationIncludingGravity: { x: 70, y: 0, z: 0 } });
        }
    });
}

function handleMotion(e){
    let acc = e.accelerationIncludingGravity;
    if(!acc || acc.x === null) return;
    let delta = Math.abs(acc.x - lastX || 0) + Math.abs(acc.y - lastY || 0) + Math.abs(acc.z - lastZ || 0);

    if(state === "WAIT" && delta > 60){
        state = "LIT";
        document.querySelectorAll('.flame').forEach(f=>{ f.classList.add('active'); });
        gsap.to("#shake-meter-box",{ opacity:1, duration:0.5 });
        document.getElementById('hint-text').innerText = "Shake hard to blow them out!";

        // Dynamic warm lighting for lit candles
        const roomLight = document.getElementById('room-lighting');
        if (roomLight) {
            roomLight.style.background = 'radial-gradient(circle at 50% 40%, rgba(255,140,0,0.35) 0%, rgba(0,0,0,0.7) 80%)';
            gsap.to(roomLight, { opacity: 0.8, duration: 0.15, yoyo: true, repeat: -1 }); // Flicker effect
        }

        // 10-second hint timer
        setTimeout(() => {
            if (state === "LIT" && progress < target) {
                const hintEl = document.getElementById('hint-text');
                hintEl.innerText = "Hint: Don't stop shaking! The bar drops if you rest! 🏃💨";
                gsap.fromTo(hintEl, { scale: 1.2, color: "#ffeb3b" }, { scale: 1, color: "", duration: 0.4, yoyo: true, repeat: 5 });
            }
        }, 10000);

        // Continuous decay loop so the bar drops if they stop moving/clicking
        let decayInt = setInterval(() => {
            if (state === "LIT" && !finalStage) {
                progress = Math.max(0, progress - 2.5); // Tune this to make it harder or easier
                updateUI();
            } else if (finalStage) {
                clearInterval(decayInt);
            }
        }, 100);
    }
    else if(state === "LIT"){
        if(delta > 35){ progress += 1.5; }
        // Decay is now handled strictly by the continuous interval above
        updateUI();
        if(progress >= target && !finalStage){
            finalStage = true;
            state = "FINAL";
            gsap.to("#final-prompt",{ display:"flex", opacity:1, duration:0.5 });
            gsap.from(".prompt-card",{ scale:0.7, opacity:0, duration:1, ease:"back.out(1.7)" });
            return;
        }
    }
    else if(state === "FINAL"){
        if(delta > 65){ celebrate(); }
    }
    lastX = acc.x; lastY = acc.y; lastZ = acc.z;
}

function updateUI(){
    let pct = (progress / target) * 100;
    gsap.to("#shake-progress",{ width:pct + "%", duration:0.1 });
    let s = Math.max( 0.1, 1 - (progress / target) );
    document.querySelectorAll('.flame').forEach(f=>{ gsap.to(f,{ scale:s, duration:0.1 }); });
}

function celebrate(){
    state = "FIND_KNIFE";
    document.querySelectorAll('.flame').forEach(f=>{ f.classList.remove('active'); });
    gsap.to("#instruction-prompt",{ opacity:0, duration:0.5 });
    
    // Update the prompt to ask the user to play the mystery game
    const promptCard = document.querySelector("#final-prompt .prompt-card");
    gsap.to(promptCard, { opacity: 0, duration: 0.3, onComplete: () => {
        promptCard.innerHTML = `
            <div class="prompt-glow"></div>
            <h2>Mystery Boxes 🎁</h2>
            <p>Find the knife to cut the cake!</p>
            <div id="box-container" style="display:flex; justify-content:center; flex-wrap:wrap; gap:10px; margin-top:20px; z-index:10; max-width:320px; margin-left:auto; margin-right:auto;"></div>
        `;
        // Move slightly up so it's not dead-center over the cake
        gsap.to(promptCard, { y: "-15vh", opacity: 1, duration: 0.3 });

        const boxContainer = document.getElementById('box-container');
        let winningIndex = Math.floor(Math.random() * 12);
        let boxAttempts = 0;
        
        for(let i=0; i<12; i++) {
            const box = document.createElement('div');
            box.innerText = '🎁';
            box.style.fontSize = '55px';
            box.style.cursor = 'pointer';
            box.style.transition = 'transform 0.2s';
            box.style.position = 'relative';
            box.style.userSelect = 'none'; // Prevents blue highlight
            box.style.webkitUserSelect = 'none';
            
            box.onmouseover = () => box.style.transform = 'scale(1.1)';
            box.onmouseout = () => box.style.transform = 'scale(1)';
            
            box.onclick = () => {
                if (box.opened || state !== "FIND_KNIFE") return;
                boxAttempts++;
                // If they guess right on the very first try, sneakily move the knife!
                if (boxAttempts === 1 && i === winningIndex) {
                    winningIndex = (i + 1) % 12; 
                }
                handleBoxClick(box, i === winningIndex);
            };
            boxContainer.appendChild(box);
            
            gsap.from(box, { y: 30, opacity: 0, delay: 0.1 * i, duration: 0.4, ease: "back.out(2)" });
        }
    }});
}

function handleBoxClick(box, isWinner) {
    if (box.opened || state !== "FIND_KNIFE") return;
    box.opened = true;
    
    if (isWinner) {
        box.innerText = '🔪';
        gsap.to(box, { scale: 1.5, y: -15, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        
        // Hide other boxes
        const siblings = Array.from(box.parentNode.children);
        siblings.forEach(b => {
            if (b !== box) gsap.to(b, { scale: 0, opacity: 0, duration: 0.3 });
        });
        
        setTimeout(startSwipeToCut, 1500);
    } else {
        box.innerText = '❌';
        box.style.opacity = '0.5';
        
        const p = document.querySelector("#final-prompt .prompt-card p");
        if (p) {
            p.innerText = "लो रामू काका खा लो गुलाब जामुन 😂";
            gsap.fromTo(p, { scale: 1.2, color: "#ffeb3b" }, { scale: 1, color: "", duration: 0.3 });
        }

        dropRasgullas(box);
    }
}

function dropRasgullas(box) {
    const rect = box.getBoundingClientRect();
    for(let i=0; i<4; i++) {
        const r = document.createElement('div');
        r.innerText = '🟤'; // Gulab Jamuns!
        r.style.position = 'fixed';
        r.style.left = rect.left + rect.width/2 + 'px';
        r.style.top = rect.top + 'px';
        r.style.fontSize = '30px';
        r.style.pointerEvents = 'none';
        r.style.zIndex = '9999';
        document.body.appendChild(r);

        const vx = (Math.random() - 0.5) * 300;
        const vy = -150 - Math.random() * 150;
        
        gsap.to(r, {
            x: vx,
            y: window.innerHeight + 100,
            rotation: Math.random() * 360,
            duration: 1.5 + Math.random(),
            ease: "power1.in",
            onComplete: () => r.remove()
        });
    }
}

let swipeCount = 0;
function startSwipeToCut() {
    state = "SWIPE_CUT";
    swipeCount = 0;
    
    // Allow clicks to pass through the prompt so the user can actually touch the cake!
    const finalPrompt = document.getElementById('final-prompt');
    finalPrompt.style.pointerEvents = 'none';
    finalPrompt.style.backgroundColor = 'transparent'; // Remove dark overlay blocking the cake

    const promptCard = document.querySelector("#final-prompt .prompt-card");
    gsap.to(promptCard, { opacity: 0, duration: 0.3, onComplete: () => {
        promptCard.innerHTML = `
            <div class="prompt-glow"></div>
            <h2>You found it! 🔪</h2>
            <p>Swipe across the cake 7 times to cut it!</p>
            <div class="final-line" id="swipe-counter">SWIPES: 0 / 7</div>
        `;
        // Push the prompt to the top of the screen and shrink it so the cake is fully visible
        gsap.to(promptCard, { y: "-32vh", scale: 0.85, opacity: 1, duration: 0.5, ease: "back.out(1.2)" });
    }});

    let isDragging = false;
    let lastX = null, lastY = null;
    
    const handleSwipeMove = (e) => {
        if (state !== "SWIPE_CUT") return;
        if (e.type === 'mousemove' && !isDragging) return; // Only count mouse moves if clicking!
        
        // Prevent scrolling on touch devices while trying to cut
        if (e.cancelable) e.preventDefault();
        
        let cx = e.touches ? e.touches[0].clientX : e.clientX;
        let cy = e.touches ? e.touches[0].clientY : e.clientY;

        if (lastX !== null) {
            const dist = Math.hypot(cx - lastX, cy - lastY);
            if (dist > 60) { // Distance threshold for a swipe
                swipeCount++;
                lastX = cx;
                lastY = cy;
                drawSlash(cx, cy);
                
                const counter = document.getElementById("swipe-counter");
                if (counter) counter.innerText = `SWIPES: ${Math.min(swipeCount, 7)} / 7`;

                if (swipeCount >= 7) {
                    window.removeEventListener('touchmove', handleSwipeMove);
                    window.removeEventListener('mousemove', handleSwipeMove);
                    window.removeEventListener('touchstart', startDrag);
                    window.removeEventListener('mousedown', startDrag);
                    finishCutting();
                }
            }
        } else {
            lastX = cx;
            lastY = cy;
        }
    };
    
    const startDrag = (e) => {
        const cakeGroup = document.getElementById('cake-group');
        if (!cakeGroup.contains(e.target)) return; // Only allow swiping if starting ON the cake
        
        // Immediately fade out the prompt on first touch
        gsap.to("#final-prompt", { opacity: 0, duration: 0.5 });

        isDragging = true;
        lastX = e.touches ? e.touches[0].clientX : e.clientX;
        lastY = e.touches ? e.touches[0].clientY : e.clientY;
    };
    
    const stopDrag = () => { isDragging = false; lastX = null; lastY = null; };

    window.addEventListener('touchstart', startDrag, {passive: true});
    window.addEventListener('mousedown', startDrag);
    window.addEventListener('touchmove', handleSwipeMove, {passive: false});
    window.addEventListener('mousemove', handleSwipeMove);
    window.addEventListener('touchend', stopDrag);
    window.addEventListener('mouseup', stopDrag);
}

function drawSlash(x, y) {
    const slash = document.createElement('div');
    slash.style.position = 'fixed';
    slash.style.left = x + 'px';
    slash.style.top = y + 'px';
    slash.style.width = '120px';
    slash.style.height = '4px';
    slash.style.background = '#fff';
    slash.style.boxShadow = '0 0 15px #fff, 0 0 30px #00ffff';
    slash.style.transform = `translate(-50%, -50%) rotate(${(Math.random() - 0.5) * 120}deg)`;
    slash.style.pointerEvents = 'none';
    slash.style.zIndex = '9999';
    slash.style.borderRadius = '2px';
    document.body.appendChild(slash);

    // Slower, more dramatic slash fade
    gsap.to(slash, { scaleX: 4, opacity: 0, duration: 0.8, ease: "power3.out", onComplete: () => slash.remove() });

    // Visually punch the cake so it feels like a real impact!
    gsap.fromTo("#cake-group", 
        { x: (Math.random() - 0.5) * 30, y: (Math.random() - 0.5) * 30, rotation: (Math.random() - 0.5) * 15, scale: 0.9 },
        { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)", clearProps: "transform" }
    );
}

function finishCutting() {
    state = "END";
    gsap.to("#final-prompt",{ opacity:0, duration:0.5, onComplete:()=>{ document.getElementById('final-prompt').style.display='none'; } });
    
    // Dramatic rumble before the final explosion
    gsap.to("#cake-group", {
        x: 15, yoyo: true, repeat: 15, duration: 0.05, ease: "linear",
        onComplete: triggerCakeExplosion
    });
}

function triggerCakeExplosion() {
    // Lower background music volume and play wish.mp3
    gsap.to(music, { volume: 0.15, duration: 1 });
    const wishAudio = new Audio('assets/wish.mp3');
    wishAudio.play().catch(e => console.log("Audio play failed:", e));

    // Animate the cake layers separating and falling apart slowly!
    gsap.to(".candles-container, .layer-top", { x: -100, y: -100, rotation: -30, opacity: 0, duration: 3.0, ease: "power1.inOut" });
    gsap.to(".layer-mid", { x: 120, y: -20, rotation: 30, opacity: 0, duration: 3.0, ease: "power1.inOut" });
    gsap.to(".layer-bottom", { x: -80, y: 60, rotation: -20, opacity: 0, duration: 3.0, ease: "power1.inOut" });
    gsap.to(".plate", { y: 150, opacity: 0, duration: 3.0, ease: "power1.inOut" });

    for(let i=0;i<260;i++){
        particles.push({
            x:canvas.width/2, y:canvas.height/2,
            vx:(Math.random()-0.5)*24, vy:(Math.random()-0.5)*28 - 14,
            size:Math.random()*10+5, color: `hsl(${Math.random()*360}, 80%,60%)`
        });
    }

    setTimeout(()=>{
        document.getElementById('birthday-reveal').style.display='block';
        gsap.from(".birthday-content",{ scale:0.5, opacity:0, duration:2, ease:"expo.out" });
        gsap.from(".birthday-message",{ y:30, opacity:0, delay:0.7, duration:1.5 });
        gsap.to(".go-surprise-btn", { opacity: 1, delay: 1.8, duration: 1 });
        gsap.from(".birthday-footer",{ opacity:0, delay:1.3, duration:2 });
        loop();
    }, 1500);
}

function loop(){
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    particles.forEach((p,i)=>{
        p.x += p.vx; p.y += p.vy; p.vy += 0.45;
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc( p.x, p.y, p.size/2, 0, Math.PI*2 ); ctx.fill();
        if(p.y > canvas.height){ particles.splice(i,1); }
    });
    requestAnimationFrame(loop);
}

function goStory() {
    music.pause();
    music.currentTime = 0;
    gsap.to("body", { opacity: 0, duration: 1, onComplete: () => { window.location.href = "story.html"; } });
}

window.addEventListener('resize',()=>{ canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
