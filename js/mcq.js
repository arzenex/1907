const questions = [
  {
    title: "Age Puzzle 😈",
    text: "Ramkali is 8 years younger than Ramu Kaka.\nDivya is 4 years older than Ramkali.\nKamla Bahan is half the age of Divya.\nThe sum of Divya and Kamla Bahan’s ages is 27.\n\nQuestion:\nWhat is the current age of Ramu Kaka?",
    options: ["20", "22", "24", "26"],
    answerIndex: 1 // 22
  },
  {
    title: "Funny Story Puzzle 😂",
    text: "At midnight:\n• Ramkali posted 27 birthday stories.\n• Divya only came for cake.\n• Kamla Bahan forgot whose birthday it was.\n• Ramu Kaka slept at 9 PM.\n\nQuestion:\nWho is the most dangerous person for your gallery storage?",
    options: ["Divya", "Kamla Bahan", "Ramkali", "Ramu Kaka"],
    answerIndex: 2 // Ramkali
  },
  {
    title: "Mystery Puzzle 👀",
    text: "During the birthday party:\n• One person ate cake secretly.\n• One person blamed others.\n• One person recorded everything.\n• One person asked “When will food start?”\n\nRamkali never records videos.\nDivya always records videos.\nRamu Kaka only cares about rasgulla.\n\nQuestion:\nWho secretly ate the cake?",
    options: ["Ramkali", "Divya", "Kamla Bahan", "Ramu Kaka"],
    answerIndex: 2 // Kamla Bahan (by elimination)
  },
  {
    title: "Doctor's Advice 💊",
    text: "Ramu Kaka gives Shalu Bhalu 3 pills and says:\n“Take one every 30 minutes.”\n\nHow long will all pills take to finish?",
    options: ["30 min", "60 min", "90 min", "120 min"],
    answerIndex: 1 // 60 mins (0 min, 30 min, 60 min)
  },
  {
    title: "Family Ties 👨‍👩‍👧‍👦",
    text: "Ramkali’s father has 4 children:\n\nNana\nNene\nNini\n\nWhat is the 4th child’s name?",
    options: ["Nono", "Ramkali", "Bhalu", "Kamla Bahan"],
    answerIndex: 1 // Ramkali
  },
  {
    title: "Analogy Match 🧠",
    text: "Ramu Kaka : Divya :: Bhalu : ?",
    options: ["RamKali", "Kamla bahan", "Shalu", "Ayi Badi"],
    answerIndex: 2 // Shalu (from Shalu Bhalu in question 4)
  },
  {
    title: "Funny Brain Puzzle 😈",
    text: "Ramu Kaka lives on the 10th floor.\n\nEvery day:\n• he takes the lift up to the 10th floor,\n• but while coming home he only takes the lift to the 7th floor and walks the remaining stairs.\n\nWhy?",
    options: ["Lift is broken", "She likes exercise", "Ramkali told her to walk", "She is too short to reach the 10th floor button"],
    answerIndex: 3 // He is too short
  },
  {
    title: "Detective Brain Teaser 🔍",
    text: "Divya entered a dark room with:\n• one candle\n• one lantern\n• and one stove.\n\nShe only had one matchstick.\n\nQuestion:\nWhat did Divya light first?",
    options: ["Candle", "Lantern", "Stove", "Matchstick"],
    answerIndex: 3 // Matchstick
  }
];

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let selectedOptionIndex = null;

const textElement = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const progressFill = document.getElementById("progress-fill");

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  textElement.textContent = currentQuestion.text;
  optionsContainer.innerHTML = "";
  selectedOptionIndex = null;
  nextBtn.disabled = true;

  // Update Progress bar
  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
  progressFill.style.width = `${progressPercentage}%`;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    // Using A, B, C, D formatting
    const prefix = String.fromCharCode(65 + index);
    button.textContent = `${prefix}) ${option}`;

    button.onclick = () => selectOption(index, button);
    optionsContainer.appendChild(button);
  });
}

function selectOption(index, buttonElement) {
  selectedOptionIndex = index;

  // Clear previously selected styling
  const allOptions = document.querySelectorAll(".option-btn");
  allOptions.forEach(btn => btn.classList.remove("selected"));

  // Add styling to selected
  buttonElement.classList.add("selected");

  // Enable next button
  nextBtn.disabled = false;
}

function dropGulabJamun() {
  const jamun = document.createElement("div");
  jamun.className = "gulab-jamun";

  const selectedBtn = document.querySelector(".option-btn.selected");
  const btnRect = selectedBtn.getBoundingClientRect();
  const startX = btnRect.left + btnRect.width / 2 - 22.5; // Center of the button
  const startY = btnRect.top + btnRect.height / 2 - 22.5; // Center of the button

  const stashRect = document.getElementById("jamun-stash").getBoundingClientRect();
  const endX = stashRect.right - 25; // Target the right edge of stash
  const endY = stashRect.top - 10; // Slightly offset for visual centering

  jamun.style.left = startX + "px";
  jamun.style.top = startY + "px";
  jamun.style.setProperty('--tx', (endX - startX) + "px");
  jamun.style.setProperty('--ty', (endY - startY) + "px");

  document.body.appendChild(jamun);
  setTimeout(() => jamun.remove(), 1000); // Clean up after animation
}

function takeBackJamun() {
  const jamun = document.createElement("div");
  jamun.className = "take-back-jamun";

  const stash = document.getElementById("jamun-stash");
  const minis = stash.getElementsByClassName("mini-jamun");
  if (minis.length === 0) return;
  const targetRect = minis[minis.length - 1].getBoundingClientRect();

  const startX = targetRect.left - 12.5;
  const startY = targetRect.top - 12.5;

  const endX = startX + (Math.random() * 100 - 50); // Slight random horizontal drift
  const endY = window.innerHeight + 50; // Fall off the bottom of the screen

  jamun.style.left = startX + "px";
  jamun.style.top = startY + "px";
  jamun.style.setProperty('--tx', (endX - startX) + "px");
  jamun.style.setProperty('--ty', (endY - startY) + "px");

  document.body.appendChild(jamun);
  setTimeout(() => jamun.remove(), 1000); // Clean up after animation
}

function updateJamunStash() {
  const stash = document.getElementById("jamun-stash");
  stash.innerHTML = "";
  for (let i = 0; i < score; i++) {
    const mini = document.createElement("div");
    mini.className = "mini-jamun";
    stash.appendChild(mini);
  }
}

nextBtn.addEventListener("click", () => {
  // Check answer
  if (selectedOptionIndex === questions[currentQuestionIndex].answerIndex) {
    score++;
    correctAnswers++;
    dropGulabJamun();
    setTimeout(() => updateJamunStash(), 950); // Delay stash update so the animation visually lands first
  } else {
    if (score > 0) { // Only take back if they have at least one!
      takeBackJamun(); // Get position before it disappears
      score--;
      updateJamunStash(); // Remove from stash instantly to start flying animation
    }
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    nextBtn.disabled = true; // Disable while finishing animation
    setTimeout(() => {
      showResults();
    }, 1000); // Let the final animation play out before showing results screen
  }
});

function showResults() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  document.getElementById("final-score").textContent = score;
  document.getElementById("total-questions").textContent = questions.length;

  const resultMessage = document.getElementById("result-message");
  const retryBtn = document.getElementById("retry-btn");
  const finalStash = document.getElementById("final-jamun-stash");

  finalStash.innerHTML = "";
  for (let i = 0; i < score; i++) {
    const mini = document.createElement("div");
    mini.className = "mini-jamun";
    finalStash.appendChild(mini);
  }

  if (score >= 5) {
    resultMessage.textContent = `Congratulations! You passed and kept ${score} Gulab Jamun(s)! 🎉`;
    resultMessage.style.color = "var(--success-color)";
    resultMessage.style.fontWeight = "bold";
    retryBtn.textContent = "Next Step";

    // Disable default reload behavior during the 3.5s animation delay
    retryBtn.onclick = null;

    setTimeout(() => {
      const now = new Date();
      // JavaScript months are 0-indexed: January is 0, July is 6.
      const isJuly19 = (now.getMonth() === 6 && now.getDate() === 19);

      retryBtn.onclick = () => {
        window.location.href = isJuly19 ? "prank.html" : "birthday.html";
      };
    }, 3000);
    fireConfetti(); // Trigger the celebration!

    const jamuns = finalStash.getElementsByClassName("mini-jamun");
    let currentJamun = 0;
    const eatInterval = setInterval(() => {
      if (currentJamun < jamuns.length) {
        jamuns[currentJamun].classList.add("eaten");
        currentJamun++;
      } else {
        clearInterval(eatInterval);
      }
    }, 300);
  } else {
    resultMessage.textContent = `Not enough Gulab Jamuns for the next step! Please collect a minimum of 5 Gulab Jamuns (you only have ${score}).`;
    resultMessage.style.color = "var(--error-color)";
    resultMessage.style.fontWeight = "bold";
    retryBtn.textContent = "Retry";
  }
}

function fireConfetti() {
  const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const size = Math.random() * 8 + 6; // Randomize size between 6px and 14px
    confetti.style.width = size + 'px';
    confetti.style.height = (size * 1.2) + 'px';
    if (Math.random() > 0.5) confetti.style.borderRadius = '50%'; // 50% chance to be round

    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Fall speed between 2s and 5s
    confetti.style.animationDelay = Math.random() * 2 + 's';

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 6000); // Clean up from DOM after falling
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(questions);
questions.forEach(q => {
  const correctAnswer = q.options[q.answerIndex];
  shuffleArray(q.options);
  q.answerIndex = q.options.indexOf(correctAnswer);
});

// Initialize Quiz
loadQuestion();
