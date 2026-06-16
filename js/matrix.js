// Terminal Sound Effects setup (No MP3 required!)
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function playClickSound() {
    if (!audioCtx) {
        audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'square'; // 'square' wave gives that retro computer terminal sound
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.08);
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
}

async function startSystem(){

    try{

        const res = await fetch(
        "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata"
        );

        const data = await res.json();

        const day = data.day;

        const month = data.month;


        // ONLY THESE DATES CAN OPEN

        if (!((month === 7 || month === 6) &&
              (day === 19 || day === 20 || day === 21 || day === 22 || day === 23 || day === 24 || day === 25 || day === 26 || day === 27 || day === 28 || day === 29 || day === 30 || day === 31))) {

            document.body.innerHTML = `

            <div style="
                width:100%;
                height:100vh;
                background:black;
                display:flex;
                justify-content:center;
                align-items:center;
                flex-direction:column;
                color:#00ff66;
                font-family:Courier New;
                text-align:center;
                padding:20px;
            ">

                <h1 style="
                    color:red;
                    font-size:60px;
                    text-shadow:0 0 20px red;
                    margin-bottom:20px;
                ">
                    ACCESS DENIED
                </h1>

                <p style="
                    font-size:22px;
                    color:white;
                    margin-bottom:15px;
                ">
                    ओ स्त्री 19 जुलाई को आना । .
                </p>

                <p style="
                    max-width:650px;
                    line-height:1.8;
                    color:#66ff66;
                    font-size:15px;
                ">
                    Temporal authentication failed.<br><br>

                    This system remains encrypted until
                    <span style="color:white;">19 JULY</span>.<br><br>

                    You attempted to access protected memories
                    before timeline synchronization.
                </p>

                <div style="
                    margin-top:30px;
                    color:red;
                    animation: blink 1s infinite;
                ">
                    [ SYSTEM LOCK ACTIVE ]
                </div>

            </div>
            `;

            return;
        }



        // =========================
        // MATRIX SYSTEM START
        // =========================

        const canvas =
            document.getElementById('matrixCanvas');

        const ctx =
            canvas.getContext('2d');

        function resizeCanvas(){

            canvas.width = window.innerWidth;

            canvas.height = window.innerHeight;
        }

        resizeCanvas();

        window.addEventListener(
            'resize',
            resizeCanvas
        );

        const letters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-=";

        const fontSize = 16;

        let columns =
            canvas.width / fontSize;

        let rainDrops =
            Array(Math.floor(columns)).fill(1);

        function drawMatrix(){

            ctx.fillStyle =
                'rgba(0,0,0,0.05)';

            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.fillStyle = '#0f0';

            ctx.font =
                fontSize + 'px monospace';

            for(let i=0;i<rainDrops.length;i++){

                const text =
                    letters.charAt(
                        Math.floor(
                            Math.random() *
                            letters.length
                        )
                    );

                ctx.fillText(
                    text,
                    i * fontSize,
                    rainDrops[i] * fontSize
                );

                if(
                    rainDrops[i] * fontSize >
                    canvas.height &&

                    Math.random() > 0.975
                ){
                    rainDrops[i] = 0;
                }

                rainDrops[i]++;
            }
        }

        setInterval(drawMatrix,30);



        // =========================
        // PUZZLE SYSTEM
        // =========================

        const targetName =
            "RAMU KAKA";

        let currentSelection = [];

        const letterPool =
            document.getElementById(
                'letterPool'
            );

        const slotsContainer =
            document.getElementById(
                'slotsContainer'
            );

        const successScreen =
            document.getElementById(
                'successScreen'
            );

        function initPuzzle(){

            letterPool.innerHTML = '';

            slotsContainer.innerHTML = '';

            currentSelection = [];

            for(let i=0;i<targetName.length;i++){

                const slot =
                    document.createElement('div');

                slot.classList.add(
                    'target-slot'
                );

                if(targetName[i] === ' '){

                    slot.classList.add(
                        'space-slot'
                    );
                }

                slotsContainer.appendChild(slot);
            }

            let letterArray =
                targetName
                .replace(/\s/g,'')
                .split('');

            for(
                let i=letterArray.length-1;
                i>0;
                i--
            ){

                const j =
                    Math.floor(
                        Math.random() * (i + 1)
                    );

                [
                    letterArray[i],
                    letterArray[j]
                ] =
                [
                    letterArray[j],
                    letterArray[i]
                ];
            }

            letterArray.push(' ');

            letterArray.forEach(letter=>{

                const tile =
                    document.createElement('div');

                tile.classList.add(
                    'letter-tile'
                );

                tile.textContent =
                    letter === ' '
                    ? '␣'
                    : letter;

                if(letter === ' '){

                    tile.classList.add(
                        'space-tile'
                    );
                }

                tile.addEventListener(
                    'click',
                    ()=>{

                        selectLetter(
                            letter,
                            tile
                        );

                    }
                );

                letterPool.appendChild(tile);

            });

        }

        function selectLetter(
            letter,
            tileElement
        ){

        // Play hacker click sound
        playClickSound();

            if(
                currentSelection.length >=
                targetName.length
            ){
                return;
            }

            currentSelection.push(letter);

            tileElement.style.visibility =
                'hidden';

            const slots =
                document.querySelectorAll(
                    '.target-slot'
                );

            const targetIdx =
                currentSelection.length - 1;

            slots[targetIdx].textContent =
                letter;

            checkWinCondition();
        }

        function checkWinCondition(){

            const constructedString =
                currentSelection.join('');

            if(
                constructedString ===
                targetName
            ){

                // Glitch Hacker Audio Effect
                let glitchCount = 0;
                let glitchInt = setInterval(() => {
                    playClickSound();
                    glitchCount++;
                    if(glitchCount > 8) clearInterval(glitchInt);
                }, 60);

                // Screen Glitch Effect Overlay
                const glitchOverlay = document.createElement('div');
                glitchOverlay.style.position = 'fixed';
                glitchOverlay.style.inset = '0';
                glitchOverlay.style.backgroundColor = 'rgba(0, 255, 0, 0.15)';
                glitchOverlay.style.zIndex = '9999';
                glitchOverlay.style.mixBlendMode = 'screen';
                document.body.appendChild(glitchOverlay);

                let flashInt = setInterval(() => {
                    glitchOverlay.style.opacity = Math.random() > 0.5 ? '1' : '0';
                }, 50);

                setTimeout(()=>{
                    clearInterval(flashInt);
                    glitchOverlay.style.opacity = '1';
                    glitchOverlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
                    
                    successScreen.innerHTML = `
                        <h1 style="color:white; text-shadow:0 0 20px #0f0; font-size:40px; margin-bottom:10px;">SYSTEM UNLOCKED</h1>
                        <p style="color:#0f0; animation:blink 0.5s infinite;">TRANSFERRING DATA...</p>
                    `;
                    successScreen.style.display =
                        'flex';

                },800);

                setTimeout(()=>{

                    window.location.href =
                        "mcq.html";

                },3500);

            }

            else if(

                currentSelection.length ===
                targetName.length

            ){

                setTimeout(()=>{

                    alert(
                        "ACCESS DENIED: Identity mismatch. Resetting matrix."
                    );

                    initPuzzle();

                },500);
            }
        }

    // 1. Expose globally so you can add onclick="resetMatrix()" to any HTML button
    window.resetMatrix = () => {
        playClickSound();
        
        // Safest way to clear: completely rebuild the board and slots from scratch
        initPuzzle();
    };

    // 2. Use event delegation in case the button loads after the script runs
    document.addEventListener('click', (e) => {
        // Automatically find exact IDs/Classes, explicit onclicks, OR any button containing the word "reset"
        const exactMatch = e.target.closest('#resetBtn, #resetButton, .reset-btn, [onclick="resetMatrix()"]');
        const textMatch = e.target.closest('button');
        
        if (exactMatch || (textMatch && textMatch.innerText.toLowerCase().includes('reset'))) {
            e.preventDefault(); // Prevent page jump if it's a link or form button
            window.resetMatrix();
        }
    });

        initPuzzle();

    }catch{

        document.body.innerHTML = `
        <div style="
            width:100%;
            height:100vh;
            background:black;
            color:red;
            display:flex;
            justify-content:center;
            align-items:center;
            font-size:30px;
            font-family:Arial;
        ">
            Internet Required
        </div>
        `;
    }

}

startSystem();
