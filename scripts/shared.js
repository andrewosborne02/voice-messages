/*
========================================================
SHARED WEBSITE BEHAVIOR
========================================================

This file contains JavaScript used across the website.

Current responsibilities:

1. Read the site configuration.
2. Set the browser-tab title.
3. Insert site-wide editable text.
4. Open and close the navigation drawer.
5. Lock page scrolling while the menu is open.
6. Close the menu with Escape.
7. Control development vs proposal mode.
8. Create the development-mode indicator.
9. Mark the current navigation page.
*/


/*
========================================================
1. LOAD SITE CONFIGURATION
========================================================

site-config.js must load BEFORE shared.js in the HTML.

This gives us a shorter name for:

window.SITE_CONFIG
*/

const config =
    window.SITE_CONFIG;


/*
========================================================
2. SET BROWSER TAB TITLE
========================================================
*/

document.title =
    config.browserTitle;


/*
========================================================
3. INSERT EDITABLE SITE-WIDE TEXT
========================================================

Each querySelectorAll() finds every HTML element carrying
the specified data attribute.

The configuration value is then inserted into that
element's visible text.
*/


document
    .querySelectorAll("[data-your-name]")
    .forEach((element) => {

        element.textContent =
            config.yourName;

    });


document
    .querySelectorAll("[data-partner-name]")
    .forEach((element) => {

        element.textContent =
            config.partnerName;

    });


document
    .querySelectorAll("[data-home-headline]")
    .forEach((element) => {

        element.textContent =
            config.homeHeadline;

    });


document
    .querySelectorAll("[data-home-subheadline]")
    .forEach((element) => {

        element.textContent =
            config.homeSubheadline;

    });


document
    .querySelectorAll("[data-home-letter]")
    .forEach((element) => {

        element.textContent =
            config.homeLetter;

    });


/*
========================================================
4. FIND NAVIGATION ELEMENTS
========================================================

These constants point JavaScript toward the menu-related
HTML elements.
*/

const menuButton =
    document.querySelector("#menuButton");

const navigationDrawer =
    document.querySelector("#navigationDrawer");

const navigationOverlay =
    document.querySelector("#navigationOverlay");

const closeMenuButton =
    document.querySelector("#closeMenuButton");


/*
========================================================
5. OPEN MENU
========================================================
*/

function openMenu() {

    /*
    Move the drawer onto the screen.
    */

    navigationDrawer?.classList.add(
        "is-open"
    );


    /*
    Make the dark overlay visible.
    */

    navigationOverlay?.classList.add(
        "is-visible"
    );


    /*
    Update the accessibility state of the menu button.
    */

    menuButton?.setAttribute(
        "aria-expanded",
        "true"
    );


    /*
    Prevent the page behind the menu from scrolling.
    */

    document.body.classList.add(
        "menu-open"
    );

}


/*
========================================================
6. CLOSE MENU
========================================================
*/

function closeMenu() {

    navigationDrawer?.classList.remove(
        "is-open"
    );

    navigationOverlay?.classList.remove(
        "is-visible"
    );

    menuButton?.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


/*
========================================================
7. CONNECT MENU EVENTS
========================================================

Click menu button -> open menu
Click X -> close menu
Click dark overlay -> close menu
*/

menuButton?.addEventListener(
    "click",
    openMenu
);


closeMenuButton?.addEventListener(
    "click",
    closeMenu
);


navigationOverlay?.addEventListener(
    "click",
    closeMenu
);


/*
========================================================
8. CLOSE MENU WITH ESCAPE KEY
========================================================
*/

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    }
);


/*
========================================================
9. CLOSE MENU WHEN A NAVIGATION LINK IS SELECTED
========================================================
*/

document
    .querySelectorAll(".navigation-link")
    .forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


/*
========================================================
10. DETERMINE CURRENT WEBSITE MODE
========================================================

proposalMode comes from site-config.js.

false -> development mode
true  -> proposal mode
*/

const isProposalMode =
    config.proposalMode === true;


/*
========================================================
11. STORE MODE ON THE <html> ELEMENT
========================================================

Development mode becomes:

<html data-site-mode="development">

Proposal mode becomes:

<html data-site-mode="proposal">
*/

document.documentElement.dataset.siteMode =
    isProposalMode
        ? "proposal"
        : "development";


/*
========================================================
12. DEVELOPMENT-ONLY ELEMENTS
========================================================

Anything in HTML containing:

data-development-only

is hidden when proposal mode is active.
*/

document
    .querySelectorAll("[data-development-only]")
    .forEach((element) => {

        element.hidden =
            isProposalMode;

    });


/*
========================================================
13. PROPOSAL-ONLY ELEMENTS
========================================================

Anything containing:

data-proposal-only

is hidden during development and shown during proposal
mode.
*/

document
    .querySelectorAll("[data-proposal-only]")
    .forEach((element) => {

        element.hidden =
            !isProposalMode;

    });


/*
========================================================
14. DEVELOPMENT MODE INDICATOR
========================================================

This badge is created only while proposalMode is false.

It gives you a visual reminder that the website is still
in development mode.
*/

function createDevelopmentModeIndicator() {

    /*
    If proposal mode is active, exit this function before
    creating anything.
    */

    if (isProposalMode) {

        return;

    }


    /*
    Create a new <div>.
    */

    const indicator =
        document.createElement("div");


    /*
    Give it the CSS class that controls its appearance.
    */

    indicator.className =
        "development-mode-indicator";


    /*
    Set the visible wording.
    */

    indicator.textContent =
        "Development mode";


    /*
    The badge is only for you, so screen readers do not
    need to announce it.
    */

    indicator.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
    Place the newly created element inside <body>.
    */

    document.body.append(
        indicator
    );

}


/*
Actually run the function we just defined.
*/

createDevelopmentModeIndicator();


/*
========================================================
15. MARK CURRENT NAVIGATION PAGE
========================================================

This function determines which page is currently open and
adds the class:

is-current

to the matching menu link.
*/

function markCurrentNavigationPage() {

    /*
    Example pathname:

    /voice-messages/collection.html

    Splitting on "/" gives us several pieces.

    .pop() returns the final piece:
    collection.html
    */

    let currentPage =
        window.location.pathname
            .split("/")
            .pop();


    /*
    The homepage can sometimes appear as:

    /voice-messages/

    rather than:

    /voice-messages/index.html

    In that situation currentPage is blank, so we treat
    it as index.html.
    */

    if (!currentPage) {

        currentPage =
            "index.html";

    }


    /*
    Find every navigation link.
    */

    const navigationLinks =
        document.querySelectorAll(
            ".navigation-link"
        );


    /*
    Inspect every link individually.
    */

    navigationLinks.forEach((link) => {

        /*
        Read its href.

        Example:

        message.html?m=7KQ3A
        */

        const linkHref =
            link.getAttribute("href");


        /*
        Safety check.

        If this link somehow has no href, skip it.
        */

        if (!linkHref) {

            return;

        }


        /*
        Remove any query string.

        message.html?m=7KQ3A

        becomes:

        message.html
        */

        const linkPage =
            linkHref.split("?")[0];


        /*
        If this link represents the page currently open,
        mark it as the current page.
        */

        if (linkPage === currentPage) {

            link.classList.add(
                "is-current"
            );

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });

}


/*
Run the navigation-highlighting function.
*/

markCurrentNavigationPage();