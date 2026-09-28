/*
========================================================
SITE CONFIGURATION
========================================================

This file contains site-wide settings and text that you
may want to change without editing the actual HTML.

Think of this file as the website's "control panel."

Later we will create a separate messages.js file for all
individual voice-message content.
*/


window.SITE_CONFIG = {

    /*
    ----------------------------------------------------
    BROWSER / WEBSITE INFORMATION
    ----------------------------------------------------
    */

    browserTitle: "Celebrating Forever",


    /*
    ----------------------------------------------------
    NAMES
    ----------------------------------------------------

    Replace "YourName" with the name you want displayed.

    Replace "PartnersName" LOCALLY on your computer with
    your partner's name.

    You do not need to provide that name to ChatGPT.
    */

    yourName: "Andy",

    partnerName: "Megan",


    /*
    ----------------------------------------------------
    HOMEPAGE CONTENT
    ----------------------------------------------------

    These values control the main written content on the
    homepage.

    You can change these later without touching index.html.
    */

    homeHeadline: "Celebrating us",

    homeSubheadline: "Today is our day.",

    homeLetter:
        "I wanted today to feel a little different. " +
        "A little slower, a little more intentional, and " +
        "completely ours.",


   /*
----------------------------------------------------
SITE MODE
----------------------------------------------------

THIS IS THE MASTER PROPOSAL-DAY SWITCH.

false
=
DEVELOPMENT MODE

You can see testing tools, development links,
and development indicators.

true
=
PROPOSAL MODE

Your partner sees only the real website experience.

IMPORTANT:
You should only need to change this ONE value when
preparing the website for proposal day.
*/

proposalMode: false
};