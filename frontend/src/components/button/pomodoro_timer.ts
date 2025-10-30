import { buttonContainer } from "./button.js";
import { timerDisplay_function, pomodoro_stop_Timer, pomodoro_startpause_Timer } from "./pomodoroState/pomodoroButton.js";

//import { pomodoroHelper } from "./pomodoro_helper.js"
// import audio from "../../resources_png_mp3/cat_meow.mp3";
//use this:
//https://tailwindcss.com/docs

// const	variable = document.createElement("div");
// variable.id = "custom";

export function pomodoro_creator(): HTMLElement {
	//https://tailwindcss.com/docs/background-color
	const	pomodoro_Container = buttonContainer({classes:{containerClass:"p-2", buttonClass:"flex justify-center"}, id:{containerId:"pomodoro_container", buttonId:"Pomodoro"}, customised:{text: "Pomodoro", colour: "text-blue-800", hover: true}});
	const   shortrest_Container = buttonContainer({classes:{containerClass:"p-2", buttonClass:"flex justify-center"}, id:{containerId:"shortrest_container", buttonId:"shortrest"}, customised:{text: "Rest", colour: "text-green-700", hover: true}});
	const	longrest_Container = buttonContainer({classes:{containerClass:"p-2", buttonClass:"flex justify-center"}, id:{containerId:"longrest_container", buttonId:"longrest"}, customised:{text: "Long break", colour: "text-red-700", hover: true}});
	const	start_pause_Container = buttonContainer({classes:{containerClass:"p-0", buttonClass:"flex justify-center"}, id:{containerId:"start_pause_container", buttonId:"start_pause_button"}, customised:{text: "Start", colour: "text-blue-800", border: "border-3", hover: true, focus: true}});
	const	stop_Container = buttonContainer({id:{containerId:"stop_container", buttonId:"stop_button"}, classes:{containerClass:"hidden ps-10", buttonClass:"flex justify-center"}, customised:{text: "Stop", colour: "text-red-700", border: "border-3", hover: true, focus: true}});
	const	timerDisplay = timerDisplay_function();

	// startButton.addEventListener('click', startTimer);
	// shortrest_Button.addEventListener('click', shortrest_Button);
	// longrest_Button.addEventListener('click', longrest_Button);
	const	start_pause_button = start_pause_Container.querySelector("#start_pause_button"); // ✅ 1. Find the actual button inside the container
	const	stop_button = stop_Container.querySelector("#stop_button");
	if (start_pause_button && pomodoro_Container && shortrest_Container && longrest_Container) {
		start_pause_Container.addEventListener('click', () => pomodoro_startpause_Timer(start_pause_button,
															pomodoro_Container.querySelector("#Pomodoro")!,
															shortrest_Container.querySelector("#shortrest")!,
															longrest_Container.querySelector("#longrest")!)); // ✅ 2. Add the listener directly to that button
	}
	if (stop_button && start_pause_button)
		stop_Container.addEventListener('click', () => pomodoro_stop_Timer(start_pause_button,
															pomodoro_Container.querySelector("#Pomodoro")!,
															shortrest_Container.querySelector("#shortrest")!,
															longrest_Container.querySelector("#longrest")!));

	const	two_button_container = document.createElement("div");
	two_button_container.id = "start_pause_stop";
	two_button_container.className = "flex flex-row justify-center";
	two_button_container.append(start_pause_Container, stop_Container);

	const	pomodoro = document.createElement("div");
	pomodoro.id = "pomodoro";
	pomodoro.className = "flex flex-col p-2 space-y-10";

	const	pomodoro_header = document.createElement("div");
	pomodoro_header.id = "pomodoro";
	pomodoro_header.className = "flex flex-row justify-center";
	pomodoro_header.append(pomodoro_Container , shortrest_Container, longrest_Container);

	pomodoro.append(pomodoro_header, timerDisplay, two_button_container);
	return (pomodoro);
}

/*
Links:
*1) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
*/