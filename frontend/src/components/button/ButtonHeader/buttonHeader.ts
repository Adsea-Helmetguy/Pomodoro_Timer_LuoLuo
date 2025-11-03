import { switchPhase } from "../pomodoroState/pomodoroState";


export function buttonHeader_pomodoro() {
	switchPhase("pomodoro");
}

export function buttonHeader_rest() {
	switchPhase("rest");
}

export function buttonHeader_longrest() {
	switchPhase("longrest");
}