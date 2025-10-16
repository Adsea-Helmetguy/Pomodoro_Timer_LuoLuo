// import { logoutHandler } from "../handlers/logoutHandler.js";

export function createHeader(): HTMLElement {
    const header = document.createElement("header");
    header.className = "flex justify-between w-full bg-gray-100 text-black p-2 items-center";

    // Logo
    const logo = document.createElement("a");
    logo.href = "/";
    logo.className = "text-lg font-bold";//add clicked change
    logo.textContent = "🍅Pomodoro Timer⏰";
    header.append(logo);

    // Navigation container
    const nav = document.createElement("nav");
    nav.className = "flex flex-col sm:flex-row sm:flex-wrap space-x-1";

    header.append(nav);

    // Helper function to create a menu item
    const createMenuItem = (text: string, href: string, tooltip: string): HTMLElement => {
        const link = document.createElement("a");
        link.href = href; //the "/location"
        link.className = "flex p-2 text-black hover:bg-blue-100 hover:underline \
                            hover:text-blue-900 hover:shadow-md rounded-md \
                            hover:border-gray-500 transform transition";
		link.textContent = text; // For textbox name

		const tooltipDiv = document.createElement("div");
		tooltipDiv.className =
			"absolute left-1/2 top-full -translate-x-1/2 mt-2 w-max text-sm text-gray-800 bg-white border \
			border-gray-300 rounded shadow-lg px-2 py-1 opacity-0 group-hover:opacity-100 \
			pointer-events-none transition-opacity duration-200"
		tooltipDiv.textContent = tooltip;

        const wrapper = document.createElement("div"); //outer div
        // wrapper.className = "flex flex-shrink relative group";
        wrapper.className = "relative group inline-block";
        wrapper.append(link, tooltipDiv);
        return wrapper;
    };

    // Home
	nav.appendChild(createMenuItem("Home", "/", "Return to the top"));
    nav.appendChild(createMenuItem("↻ Restart session", "/", "Restart pomodoro session"));
    nav.appendChild(createMenuItem("⚙️ Customise Timer", "/", "Change session timings"));
    return header;
}

export function	renderHeader(container: HTMLElement) {
	container.innerHTML = ""; // clear old header, empties it.
	const header = createHeader(); // automatically reads localStorage
	container.append(header);
}

/*
// const isLoggedIn = !!localStorage.getItem("id");
	// if (isLoggedIn)
	// {
    //     // Main Profile
	// 	const marcus_profileItem = createMenuItem("Profile", "/profile", "Check your info here!");
    //     marcus_profileItem.querySelector(".tooltip")?.classList.remove("left-0");
	// 	marcus_profileItem.querySelector(".tooltip")?.classList.add("-left-20");
	// 	nav.append(marcus_profileItem);

		// friends
		// const friendsItem = createMenuItem("Friends", "/friends", "Friends~");
		// friendsItem.querySelector(".tooltip")?.classList.remove("left-0");
		// friendsItem.querySelector(".tooltip")?.classList.add("-left-1");
		// nav.append(friendsItem);

        // //logout
        // const logoutbutton = createMenuItem("Log Out", "/", "Log Out");
        // logoutbutton.addEventListener("click", (e: Event) => {
		// 	e.preventDefault(); // prevents navigation to "#"
		// 	logoutHandler();
		// });
		// nav.append(logoutbutton);
	// } else {
        // Sign In
        // nav.appendChild(createMenuItem("Sign In", "/login", "Sign in!"));

        // Sign Up
        // const signUpItem = createMenuItem("Sign Up", "/signup", "Check your stats here!");
        // signUpItem.querySelector("div")!.classList.remove("left-0");
        // signUpItem.querySelector("div")!.classList.add("right-0");
        // nav.append(signUpItem);
    // }
*/
