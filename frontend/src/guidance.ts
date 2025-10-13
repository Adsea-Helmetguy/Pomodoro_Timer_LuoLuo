// import {  } from "./Todolist.js"

// Simple Pomodoro Timer
let timeLeft = 25 * 60; // 25 minutes
let timer: number | null = null;

const app = document.getElementById('app')!;
app.innerHTML = `
  <h1>Pomodoro Timer</h1>
  <div id="timer">25:00</div>
  <button id="start">Start</button>
  <button id="reset">Reset</button>
`;

const timerDisplay = document.getElementById('timer')!;
const startBtn = document.getElementById('start')!;
const resetBtn = document.getElementById('reset')!;

function updateDisplay() {
  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${mins}:${secs}`;
}

function startTimer() {
  if (timer) return; // prevent multiple timers
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer!);
      timer = null;
      alert('Pomodoro complete!');
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer!);
  timer = null;
  timeLeft = 25 * 60;
  updateDisplay();
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
updateDisplay();


//-----------------------------------------------------
/*
import { renderApp } from './router';

window.addEventListener("DOMContentLoaded", renderApp);
window.addEventListener("popstate", renderApp);


window.addEventListener('click', (e: Event) => {
	const target = e.target as HTMLElement;
	const anchor = target.closest('a');

	if (anchor && anchor.href.startsWith(window.location.origin)) {
		e.preventDefault();

		const href = anchor?.getAttribute('href');
		if (href) {
			history.pushState({}, '', href);
			renderApp();
		}
	}
});

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");

  if (userId) {
    localStorage.setItem("id", userId);
    window.history.replaceState({}, document.title, "/");
	renderApp();
  }
});
*/
//-----------------------------------------------------
