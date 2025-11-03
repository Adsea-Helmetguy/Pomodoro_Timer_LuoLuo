import { renderHeader } from "./components/header/header.js";
import { pomodoro_creator } from "./components/button/pomodoro_timer.js"
// import { API_BASE } from "./variable"

//For reference:
//https://tailwind.build/classes
function	homePage_container(): HTMLElement {
	const	welcomeTitle = document.createElement("p");
	welcomeTitle.className = "flex justify-center text-2xl font-bold"
	welcomeTitle.textContent = "Welcome!";
	welcomeTitle.id = "welcome_title";
	const	title = document.createElement("p");
	title.className = "flex justify-center text-2xl font-bold"
	title.textContent = "Ready to start using Pomodoro?";
	title.id = "title";

	const	button = pomodoro_creator();
	const	titleWrapper = document.createElement("div");
	titleWrapper.className = "flex flex-col text-2xl font-bold";

	titleWrapper.append(welcomeTitle, title, button);
	return(titleWrapper);
}

function	header_container_creation(): HTMLElement {
	const	headerbox = document.createElement("div");
	headerbox.className = "grid grid w-full bg-gray-100"
	headerbox.id = "headerbox";

	renderHeader(headerbox);
	return(headerbox);
}

function Home_container_creation(): HTMLElement {
	const	titleWrapper = homePage_container();
	// const	headerbox = headerbox_container();

	//flex-col as column and flex-grow expand to fill all available space left
	const	homePage = document.createElement("div");
	homePage.className = "flex flex-col justify-center items-center text-center";
	homePage.append(titleWrapper);
	return homePage;
}

export function renderHomePage(main_container: HTMLElement, header_container: HTMLElement) {
	const	homePage = Home_container_creation();
	const	header = header_container_creation();
	homePage.className = "py-5"

	main_container.append(homePage);
	header_container.append(header);
}

function	page404_container(): HTMLElement {
	const	welcomeTitle = document.createElement("p");
	welcomeTitle.className = "flex justify-center text-2xl font-bold"
	welcomeTitle.textContent = "Error 404";
	welcomeTitle.id = "welcome_title";
	const	title = document.createElement("p");
	title.className = "flex justify-center text-2xl font-bold"
	title.textContent = "Page does not exist";
	title.id = "title";

	const	button = pomodoro_creator();
	const	titleWrapper = document.createElement("div");
	titleWrapper.className = "flex flex-col text-2xl font-bold";

	titleWrapper.append(welcomeTitle, title, button);
	return(titleWrapper);
}

function Home_404_page(): HTMLElement {
	const	titleWrapper = page404_container();
	const	homePage = document.createElement("div");
	homePage.className = "flex flex-col justify-center items-center text-center";
	homePage.append(titleWrapper);
	return homePage;
}

export function render404Page(main_container: HTMLElement) {
	const	homePage = Home_404_page();
	homePage.className = "py-5"

	main_container.append(homePage);
}


//websites to look into after this with react:
/*
https://nextjs.org/docs
https://zustand.docs.pmnd.rs/guides/typescript

things to try out:
	1) removeChild
	2) search for hooks for react/vanilla
	3) tanstack - https://tanstack.com/
	4) nanostores

learn stuff:
https://www.codecademy.com
https://tanstack.com/


try to find out what is:
ORM-> Object-Relational Mapping (ORM) ->ORM databases
*/
