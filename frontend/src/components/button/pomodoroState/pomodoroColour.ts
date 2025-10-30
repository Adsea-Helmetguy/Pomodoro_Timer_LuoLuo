// define allowed colors
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

interface Timer {
    radiusBg_colour:TailwindColor;
	timertext_colour:TailwindColor;
    time_mins: string;
    time_secs: string;
    isStarted: boolean;
}

/*
const myTimer: Timer = {
  border_radius: 12,
  radiusBg_colour: { color: "green" },
  isStarted: false,
};

// get Tailwind classes for this timer
const classes = colorMap[myTimer.radiusBg_colour.color];
*/

//initialTime: string = "00:01"
export function	timerUI (props:Timer): HTMLElement {
	const	radius_colour = radius_colourMap[props.radiusBg_colour];
	const	timer_colour = timer_colourMap[props.timertext_colour];
    const   mins = props.time_mins;
    const   secs = props.time_secs;
    //const	timerState = props.isStarted;

    // if (timerState != true)
    //     return;
    //container


    const	timerCircle_container = document.createElement("div");
    timerCircle_container.id = "timer_container";
    timerCircle_container.className = "timer-circle relative flex justify-center items-center p-30"; //text-9xl font-bold

    // left && right half-circle
    const circleLeft = document.createElement("div");
	circleLeft.id = "circleLeft";
	const circleRight = document.createElement("div");
	circleRight.id = "circleRight";
	if (props.radiusBg_colour === "green" || props.radiusBg_colour === "blue" || props.radiusBg_colour === "yellow") {
		circleLeft.className = `circle-left absolute w-90 h-90 rounded-full border-4 ${radius_colour}`;
		circleRight.className = `circle-left absolute w-90 h-90 rounded-full border-4 ${radius_colour}`;
	}

    // timer text in center
    const timerText = document.createElement("div");
    timerText.id = "timer";
	if (props.timertext_colour == "green" || props.timertext_colour == "blue" || props.timertext_colour == "yellow")
		timerText.className = `flex justify-center items-center text-9xl font-bold  ${timer_colour}`;
    timerText.textContent = `${mins}:${secs}`;

    timerCircle_container.append(circleLeft, circleRight, timerText);
    return timerCircle_container;
}
/*
links:
https://medium.com/@volochkov/how-to-create-countdown-timer-on-pure-css-2c0460391a32
*/
