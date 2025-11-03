import { meowMp3, NotifyToast_header } from "../pomodoroHelper/pomodoro_helper.js";
import { timerUI } from "../pomodoroState/pomodoroColour.js";
import { stateTimer, handlePhaseEnd, timeforPomodoro, timeforRest, timeforLongRest } from "./pomodoroState";

type TailwindColor = "green" | "blue" | "yellow"; // etc

const radius_colourMap: Record<TailwindColor, string> = {
    green: "border-green-700",
    blue: "border-blue-800",
    yellow: "border-yellow-700",
};

const timer_colourMap: Record<TailwindColor, string> = {
    green: "text-green-700",
    blue: "text-blue-800",
    yellow: "text-yellow-700",
};

export function timerDisplay_function(): HTMLElement {
	const timerDisplay = timerUI({
		radiusBg_colour: "blue",
		timertext_colour: "blue",
		time_mins: Math.floor(stateTimer.timeLeft / 60).toString().padStart(2, '0'),
		time_secs: Math.floor(stateTimer.timeLeft % 60).toString().padStart(2, '0'),
		isStarted: true,
	});
	//when Math.floor returns a value, then next '.command' will execute,
	// Which in this case it's '.toString' which converts number to string
	// *1) and then to pad to always show two sets of characters
	// const	mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
	return (timerDisplay);
}

export function	update_timerDisplay() {
	const timerDisplay = document.getElementById("timer");
	if (timerDisplay) {
		const mins = Math.floor(stateTimer.timeLeft / 60).toString().padStart(2, '0');
		const secs = Math.floor(stateTimer.timeLeft % 60).toString().padStart(2, '0');
		timerDisplay.textContent = `${mins}:${secs}`;
	}
	const timerCircle_left = document.getElementById("circleLeft");
	const timerCircle_right = document.getElementById("circleRight");
	if (timerCircle_left && timerCircle_right) {
		timerCircle_left.classList.remove(radius_colourMap["green"], radius_colourMap["blue"], radius_colourMap["yellow"]);
		timerCircle_right.classList.remove(radius_colourMap["green"], radius_colourMap["blue"], radius_colourMap["yellow"]);
		timerDisplay?.classList.remove(timer_colourMap["green"], timer_colourMap["blue"], timer_colourMap["yellow"]);
		if (stateTimer.state == "rest") {
			timerCircle_left.classList.add(radius_colourMap["green"]);
			timerCircle_right.classList.add(radius_colourMap["green"]);
			timerDisplay?.classList.add(timer_colourMap["green"]);
		} else if (stateTimer.state == "longrest") {
			timerCircle_left.classList.add(radius_colourMap["yellow"]);
			timerCircle_right.classList.add(radius_colourMap["yellow"]);
			timerDisplay?.classList.add(timer_colourMap["yellow"]);
		} else {
			timerCircle_left.classList.add(radius_colourMap["blue"]);
			timerCircle_right.classList.add(radius_colourMap["blue"]);
			timerDisplay?.classList.add(timer_colourMap["blue"]);
		}

	}

	// if (appState.timeLeft <= 0) {
	// 	clearInterval(timer!);
	// 	meowMp3.play(); // ✅ sound
	// 	switchPhase();
	// }
}

function resetTimer() {
	if (stateTimer.timer) {
		clearInterval(stateTimer.timer);
		
		stateTimer.timer = null;
	}
	if(stateTimer.state === "rest")
		stateTimer.timeLeft = timeforRest;
	else if (stateTimer.state === "longrest")
		stateTimer.timeLeft = timeforLongRest;
	else
		stateTimer.timeLeft = timeforPomodoro; 
	update_timerDisplay();
}

function	stopTimer(button: Element, pomodoro: HTMLButtonElement, rest: HTMLButtonElement, longrest: HTMLButtonElement) {
	resetTimer();

	const	stopbutton_add_hidden = document.getElementById("stop_container");
	if (stopbutton_add_hidden)
		stopbutton_add_hidden?.classList.add("hidden");

	button.textContent = "Start";
	button.classList.remove("text-green-700", "text-blue-800", "text-yellow-700");
	button.classList.add("text-blue-800");
	enableAll(pomodoro, rest, longrest);
	update_timerDisplay();
}

function	countdown(button: Element, pomodoro: HTMLButtonElement, rest: HTMLButtonElement, longrest: HTMLButtonElement) {
	stateTimer.timeLeft--;
	if (stateTimer.timeLeft < 0) {
		stateTimer.timeLeft = 0;
		meowMp3();
		NotifyToast_header("Pomodoro complete! 🎉 Time to take a break! 😺", 3000);
		console.log("-----button state: ", button.textContent);
        stopTimer(button, pomodoro, rest, longrest);
		console.log("-----button state AFTER STOPTIMER: ", button.textContent);
		handlePhaseEnd();
	}
	update_timerDisplay();
}

function	pauseTimer(button: Element) {
	if (stateTimer.timer) {
		clearInterval(stateTimer.timer);
		stateTimer.timer = null;
		button.textContent = "Resume";
		button.classList.remove("text-green-700", "text-blue-800", "text-yellow-700");
		button.classList.add("text-yellow-700");
		update_timerDisplay();
		return;
	}
		
}

function	startTimer(button: Element, pomodoro: HTMLButtonElement, rest: HTMLButtonElement, longrest: HTMLButtonElement) {
	if (stateTimer.timer)
		return;
	button.textContent = "Pause";
	button.classList.remove("text-green-700", "text-blue-800", "text-yellow-700");
	button.classList.add("text-blue-800");
	stateTimer.timer = setInterval(() => countdown(button, pomodoro, rest, longrest), 1000);//the 3, pomodoro, rest and longrest are for enableall
	update_timerDisplay();
}

export function	pomodoro_stop_Timer(reset_start: Element, pomodoro: HTMLButtonElement, rest: HTMLButtonElement, longrest: HTMLButtonElement) {
	stopTimer(reset_start, pomodoro, rest, longrest);
	// stateTimer.state = "pomodoro";
	// stateTimer.subState = "start";
	// switchPhase("pomodoro");
}

export function	pomodoro_startpause_Timer(button: Element, pomodoro: HTMLButtonElement, rest: HTMLButtonElement, longrest: HTMLButtonElement) {
	const	currentState = button.textContent;
	const	stopbutton_remove_hidden = document.getElementById("stop_container");

	disableAll(pomodoro, rest, longrest);

	if (stopbutton_remove_hidden)
		stopbutton_remove_hidden?.classList.remove("hidden");

	if (currentState === "Start") {
		startTimer(button, pomodoro, rest, longrest);
	}
	else if (currentState === "Pause") {
		pauseTimer(button);
	}
	else if (currentState === "Resume") {
		startTimer(button, pomodoro, rest, longrest); // resume same as start
	}
	else if (currentState === "Stop") {
		stopTimer(button, pomodoro, rest, longrest);
	}
}

//const googleBtn = document.createElement("button");
function disableAll(pomodoro: HTMLButtonElement, rest: HTMLButtonElement, longrest: HTMLButtonElement) {
        pomodoro.disabled = true;
        rest.disabled = true;
		longrest.disabled = true;
        pomodoro.classList.add("opacity-50", "cursor-not-allowed");
        rest.classList.add("opacity-50", "cursor-not-allowed");
		longrest.classList.add("opacity-50", "cursor-not-allowed");
}

function enableAll(pomodoro: HTMLButtonElement, rest: HTMLButtonElement, longrest: HTMLButtonElement) {
        pomodoro.disabled = false;
        rest.disabled = false;
		longrest.disabled = false;
        pomodoro.classList.remove("opacity-50", "cursor-not-allowed")
        rest.classList.remove("opacity-50", "cursor-not-allowed")
		longrest.classList.remove("opacity-50", "cursor-not-allowed")
}
