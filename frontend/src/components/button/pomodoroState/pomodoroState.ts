import { update_timerDisplay } from "./pomodoroButton.js"

//time
export let	timeforPomodoro = 25 * 60; //25 * 60
export let	timeforRest = 5 * 60; //5 * 60
export let	timeforLongRest = 15 * 60; //15 * 60
let  timer: number | null = null;
export let	cyclePomodoro = 0;
export let	cycleRest = 0;
export let	cycleLongrest = 0;

type    appState = "pomodoro" | "rest" | "longrest";
type    subAppState = "start" | "pause" | "Resume" | "stop";
interface PomodoroAppState {
	state: appState;
    subState: subAppState;
    timeLeft: number;
    timer: number | null;
}

const pomodoroState: Record<appState, PomodoroAppState> = {
    pomodoro: { state: "pomodoro", subState: "start", timeLeft: timeforPomodoro, timer: timer },
    rest: { state: "rest", subState: "start", timeLeft: timeforRest, timer: timer },
    longrest: { state: "longrest", subState: "start", timeLeft: timeforLongRest, timer: timer },
};

export let stateTimer: PomodoroAppState = {
    state: "pomodoro",
    subState: "start",
    timeLeft: timeforPomodoro,
    timer: null,
};

export function switchPhase(next: appState) {
	stateTimer = { ...pomodoroState[next]};
    update_timerDisplay();
}

export function handlePhaseEnd() {
	if (stateTimer.state === "pomodoro") {
			if (cyclePomodoro != 0 && (cyclePomodoro % 3) == 0)
				switchPhase("longrest");
			else
				switchPhase("rest");
	}
	else
		switchPhase("pomodoro");
	console.log("Current state: \"", stateTimer.state, "\"");

	console.log("HandlePhaseEnd's cycleCount along with others:");
	console.log("cyclePomodoro: ", cyclePomodoro);
	console.log("cycleRest: ", cycleRest);
	console.log("cycleLongrest: ", cycleLongrest);
	update_timerDisplay();
}