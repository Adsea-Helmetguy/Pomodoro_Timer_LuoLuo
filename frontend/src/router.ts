// import { renderLoginPage } from "./login.js";
import { renderHomePage, render404Page } from "./homepage.js";
// import { renderSignUpPage } from "./signup";
// import { renderProfilePage } from "./profile.js";
// import { renderFriendsPage } from "./friends.js";
// import { statsProfile } from "./stats.js";
// import { renderGameModes } from "./pong/ui/gameMode.js";
// import { marcus_renderProfilePage } from "./marcus_profile.js"

// function getCurrentPath() {
//     // Strip out the repo name if it exists
//     return window.location.pathname.replace("/Pomodoro_Timer_LuoLuo", "");
// }

// clear && npm run build && npm install gh-pages && npm run deploy && npm run preview -- --port 5000
export function renderApp() {
	const app = document.getElementById("app")!;
	const app_header = document.getElementById("app_header")!;
	app.innerHTML = "";
	app_header.innerHTML = "";

	// normalize by removing the configured base (works in dev and on GH Pages)
    const base = (import.meta.env.BASE_URL ?? "/");
    let path = window.location.pathname;

    // ensure base ends with a slash for matching
    const basePath = base.endsWith("/") ? base : base + "/";

    // strip basePath if present at start
    if (path.startsWith(basePath)) path = path.slice(basePath.length - 1); // keep leading '/'


	// const path = getCurrentPath();
	if (path === "/" || path === "" || path === "/index.html")
		renderHomePage(app, app_header);
	else
		render404Page(app);
}
