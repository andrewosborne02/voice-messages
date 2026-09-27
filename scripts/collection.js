/*
========================================================
MESSAGE COLLECTION CONTROLLER
========================================================

This file controls collection.html.

Its responsibilities are:

1. Read discovered message IDs from localStorage.
2. Match those IDs to messages.js.
3. Sort discovered messages chronologically.
4. Display only discovered messages.
5. Build a development-only list of every message.
6. Allow YOU to reset local discovery data while testing.
*/


/*
========================================================
1. LOAD SHARED DATA / TOOLS
========================================================
*/

const allMessages =
    window.VOICE_MESSAGES;

const messageStorage =
    window.MESSAGE_STORAGE;

const siteConfig =
    window.SITE_CONFIG;


/*
========================================================
2. FIND IMPORTANT HTML ELEMENTS
========================================================
*/

const discoveredMessagesContainer =
    document.querySelector(
        "#discoveredMessages"
    );

const collectionEmptyState =
    document.querySelector(
        "#collectionEmptyState"
    );

const developmentMessageList =
    document.querySelector(
        "#developmentMessageList"
    );

const resetDiscoveriesButton =
    document.querySelector(
        "#resetDiscoveriesButton"
    );


/*
========================================================
3. CREATE ONE DISCOVERED-MESSAGE CARD
========================================================

This function receives one message object and creates
the HTML elements needed to represent it.

Instead of writing this card directly into collection.html,
JavaScript builds one for every discovered message.
*/

function createDiscoveredMessageCard(message) {


    /*
    Create the outer <article>.
    */

    const card =
        document.createElement("article");

    card.className =
        "discovered-message-card";


    /*
    Message number.
    */

    const number =
        document.createElement("p");

    number.className =
        "discovered-message-number";

    number.textContent =
        `Message ${String(message.order).padStart(2, "0")}`;


    /*
    Public title.
    */

    const title =
        document.createElement("h2");

    title.className =
        "discovered-message-title";

    title.textContent =
        message.publicTitle;


    /*
    Description.
    */

    const description =
        document.createElement("p");

    description.className =
        "discovered-message-description";

    description.textContent =
        message.description;


    /*
    Link back to the message page.

    encodeURIComponent() ensures the ID is safe to place
    inside a URL.
    */

    const link =
        document.createElement("a");

    link.className =
        "discovered-message-link";

    link.href =
        `message.html?m=${encodeURIComponent(message.id)}`;

    link.textContent =
        "Listen again";


    /*
    Put all of those newly created elements inside
    the article.
    */

    card.append(
        number,
        title,
        description,
        link
    );


    /*
    Return the complete card to whoever called this
    function.
    */

    return card;

}


/*
========================================================
4. RENDER DISCOVERED MESSAGES
========================================================
*/

function renderDiscoveredMessages() {


    /*
    Get the IDs stored on this browser.
    */

    const discoveredIDs =
        messageStorage.getDiscoveredMessageIDs();


    /*
    Take the complete message database and keep only
    messages whose IDs appear in discoveredIDs.
    */

    const discoveredMessages =
        allMessages
            .filter((message) => {

                return discoveredIDs.includes(
                    message.id
                );

            })
            .sort((messageA, messageB) => {

                return (
                    messageA.order -
                    messageB.order
                );

            });


    /*
    Remove anything currently inside the grid.

    This becomes important when we reset testing data.
    */

    discoveredMessagesContainer.replaceChildren();


    /*
    If there are no discovered messages, show our
    empty state.
    */

    if (discoveredMessages.length === 0) {

        collectionEmptyState.hidden =
            false;

        return;

    }


    /*
    Otherwise hide the empty message.
    */

    collectionEmptyState.hidden =
        true;


    /*
    Build and append one card for each discovered
    message.
    */

    discoveredMessages.forEach((message) => {

        const messageCard =
            createDiscoveredMessageCard(message);

        discoveredMessagesContainer.append(
            messageCard
        );

    });

}


/*
========================================================
5. BUILD DEVELOPMENT MESSAGE LIST
========================================================

This list exists only to make YOUR testing easier.

It exposes every message while proposalMode is false.

It must not be visible on proposal day.
*/

function renderDevelopmentMessageList() {


    /*
    If proposal mode is active, stop immediately.
    */

    if (siteConfig.proposalMode === true) {

        return;

    }


    /*
    Sort a COPY of the array.

    [...allMessages] creates a new array so we do not
    accidentally rearrange the original message database.
    */

    const sortedMessages =
        [...allMessages].sort(
            (messageA, messageB) => {

                return (
                    messageA.order -
                    messageB.order
                );

            }
        );


    sortedMessages.forEach((message) => {


        const row =
            document.createElement("div");

        row.className =
            "development-message-row";


        const link =
            document.createElement("a");

        link.href =
            `message.html?m=${encodeURIComponent(message.id)}`;

        link.textContent =
            `${String(message.order).padStart(2, "0")} — ${message.internalName}`;


        const idLabel =
            document.createElement("code");

        idLabel.textContent =
            message.id;


        row.append(
            link,
            idLabel
        );


        developmentMessageList.append(
            row
        );

    });

}


/*
========================================================
6. RESET DEVELOPMENT DISCOVERIES
========================================================
*/

function resetDevelopmentDiscoveries() {


    /*
    window.confirm() gives you one chance to cancel an
    accidental reset.
    */

    const shouldReset =
        window.confirm(
            "Clear all locally discovered messages on this browser?"
        );


    if (shouldReset === false) {

        return;

    }


    messageStorage.clearDiscoveredMessages();


    /*
    Immediately redraw the collection.
    */

    renderDiscoveredMessages();

}


/*
========================================================
7. CONNECT RESET BUTTON
========================================================
*/

resetDiscoveriesButton?.addEventListener(
    "click",
    resetDevelopmentDiscoveries
);


/*
========================================================
8. INITIAL PAGE RENDER
========================================================
*/

renderDiscoveredMessages();

renderDevelopmentMessageList();