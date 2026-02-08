const timerValue = document.getElementById("timer-value");
const timerLabel = document.getElementById("timer-label");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const presetButtons = document.querySelectorAll(".timer__presets button");

const goalForm = document.getElementById("goal-form");
const goalInput = document.getElementById("goal-input");
const goalList = document.getElementById("goal-list");

const FOCUS_LABEL = "集中";
const BREAK_LABEL = "休憩";
const BREAK_MINUTES = 3;

let timer = null;
let totalSeconds = 25 * 60;
let mode = FOCUS_LABEL;

const storedGoals = JSON.parse(localStorage.getItem("pocket-goals") || "[]");

const renderTime = () => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  timerValue.textContent = `${minutes}:${seconds}`;
};

const setMode = (label) => {
  mode = label;
  timerLabel.textContent = label;
};

const setButtonsState = (running) => {
  startBtn.disabled = running;
  pauseBtn.disabled = !running;
  resetBtn.disabled = false;
  presetButtons.forEach((button) => {
    button.disabled = running;
  });
};

const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

const switchMode = () => {
  if (mode === FOCUS_LABEL) {
    setMode(BREAK_LABEL);
    totalSeconds = BREAK_MINUTES * 60;
  } else {
    setMode(FOCUS_LABEL);
    totalSeconds = Number(document.querySelector(".timer__presets .is-active").dataset.minutes) * 60;
  }
  renderTime();
};

const tick = () => {
  if (totalSeconds > 0) {
    totalSeconds -= 1;
    renderTime();
    return;
  }
  switchMode();
};

startBtn.addEventListener("click", () => {
  if (timer) return;
  setButtonsState(true);
  timer = setInterval(tick, 1000);
});

pauseBtn.addEventListener("click", () => {
  stopTimer();
  setButtonsState(false);
});

resetBtn.addEventListener("click", () => {
  stopTimer();
  setButtonsState(false);
  totalSeconds = Number(document.querySelector(".timer__presets .is-active").dataset.minutes) * 60;
  setMode(FOCUS_LABEL);
  renderTime();
});

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    presetButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");
    totalSeconds = Number(button.dataset.minutes) * 60;
    setMode(FOCUS_LABEL);
    renderTime();
  });
});

const saveGoals = () => {
  localStorage.setItem("pocket-goals", JSON.stringify(storedGoals));
};

const renderGoals = () => {
  goalList.innerHTML = "";
  storedGoals.forEach((goal, index) => {
    const item = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = goal;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "完了";
    remove.addEventListener("click", () => {
      storedGoals.splice(index, 1);
      saveGoals();
      renderGoals();
    });
    item.append(text, remove);
    goalList.append(item);
  });
};

goalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = goalInput.value.trim();
  if (!value) return;
  storedGoals.unshift(value);
  saveGoals();
  renderGoals();
  goalInput.value = "";
});

renderTime();
renderGoals();
