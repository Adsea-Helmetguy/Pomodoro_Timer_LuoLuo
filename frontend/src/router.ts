// import { renderLoginPage } from "./login.js";
import { renderHomePage, render404Page } from "./homepage.js";
// import { renderSignUpPage } from "./signup";
// import { renderProfilePage } from "./profile.js";
// import { renderFriendsPage } from "./friends.js";
// import { statsProfile } from "./stats.js";
// import { renderGameModes } from "./pong/ui/gameMode.js";
// import { marcus_renderProfilePage } from "./marcus_profile.js"

function getCurrentPath() {
    // Strip out the repo name if it exists
    return window.location.pathname.replace("/Pomodoro_Timer_LuoLuo", "");
}

export function renderApp() {
	const app = document.getElementById("app")!;
	const app_header = document.getElementById("app_header")!;
	app.innerHTML = "";
	app_header.innerHTML = "";

	const path = getCurrentPath();
	if (path === "/" || path === "")
		renderHomePage(app, app_header);
	else
		render404Page(app);
}
