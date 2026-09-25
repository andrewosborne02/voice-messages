/*
========================================================
SHARED WEBSITE BEHAVIOR
========================================================

This file contains JavaScript that should work on EVERY
page of the website.

Current responsibilities:

1. Set the browser-tab title.
2. Insert editable site-wide text.
3. Open and close the navigation menu.
4. Prepare the site for proposal mode.

Later we can expand this file without changing the
individual page content.
*/


/*
========================================================
1. LOAD OUR CONFIGURATION
========================================================
*/

const config = window.SITE_CONFIG;


/*
========================================================
2. SET THE BROWSER TAB TITLE
========================================================

document.title refers to the text shown in the browser tab.

We take that value from site-config.js so you only need
to change it in one place.
*/

document.title = config.browserTitle;


/*
========================================================
3. INSERT GLOBAL TEXT INTO THE PAGE
========================================================

querySelectorAll() searches the HTML document for every
element matching a CSS-style selector.

[data-your-name] means:
"Find every HTML element containing the attribute
 data-your-name."
*/

document.querySelectorAll("[data-your-name]").forEach((element) => {

    element.textContent = config.yourName;

});


document.querySelectorAll("[data-partner-name]").forEach((element) => {

    element.textContent = config.partnerName;

});


document.querySelectorAll("[data-home-headline]").forEach((element) => {

    element.textContent = config.homeHeadline;

});


document.querySelectorAll("[data-home-subheadline]").forEach((element) => {

    element.textContent = config.homeSubheadline;

});


document.querySelectorAll("[data-home-letter]").forEach((element) => {

    element.textContent = config.homeLetter;

});


/*
========================================================
4. FIND NAVIGATION ELEMENTS
========================================================

These constants save references to important HTML elements.

The # symbol means we are searching for an HTML element
by its unique id.
*/

const menuButton = document.querySelector("#menuButton");

const navigationDrawer =
    document.querySelector("#navigationDrawer");

const navigationOverlay =
    document.querySelector("#navigationOverlay");

const closeMenuButton =
    document.querySelector("#closeMenuButton");


/*
========================================================
5. OPEN THE MENU
========================================================
*/

function openMenu() {

    /*
    Add the class "is-open" to the navigation drawer.

    CSS will notice that class and move the drawer onto
    the screen.
    */

    navigationDrawer?.classList.add("is-open");

    navigationOverlay?.classList.add("is-visible");


    /*
    aria-expanded is an accessibility attribute.

    It tells screen readers whether the menu controlled
    by this button is currently open.
    */

    menuButton?.setAttribute("aria-expanded", "true");

}


/*
========================================================
6. CLOSE THE MENU
========================================================
*/

function closeMenu() {

    navigationDrawer?.classList.remove("is-open");

    navigationOverlay?.classList.remove("is-visible");

    menuButton?.setAttribute("aria-expanded", "false");

}


/*
========================================================
7. MENU BUTTON EVENTS
========================================================

addEventListener() means:

"When this event happens, run this function."

"click" is the event.
openMenu is the function.
*/

menuButton?.addEventListener("click", openMenu);

closeMenuButton?.addEventListener("click", closeMenu);

navigationOverlay?.addEventListener("click", closeMenu);


/*
========================================================
8. CLOSE MENU WITH ESCAPE KEY
========================================================
*/

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMenu();

    }

});


/*
========================================================
9. DEVELOPMENT / PROPOSAL MODE PREPARATION
========================================================

Any HTML element containing:

data-development-only

will be hidden when proposalMode becomes true.

We will use this more extensively in a later checkpoint.
*/

if (config.proposalMode === true) {

    document
        .querySelectorAll("[data-development-only]")
        .forEach((element) => {

            element.hidden = true;

        });

}