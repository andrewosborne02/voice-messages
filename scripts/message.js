/*
========================================================
MESSAGE PAGE CONTROLLER
========================================================

This file controls message.html.

Its job is to:

1. Read the message ID from the URL.
2. Find the corresponding record in messages.js.
3. Insert that message's content into the HTML.
4. Load the correct audio file.
5. Show an optional photograph when one exists.
6. Handle invalid message URLs gracefully.
7. Mark the final message for future special styling.
*/


/*
========================================================
1. LOAD THE MESSAGE DATABASE
========================================================
*/

const messages = window.VOICE_MESSAGES;


/*
========================================================
2. FIND IMPORTANT HTML ELEMENTS
========================================================

We store references to these elements once so we do not
have to repeatedly search the HTML later.
*/

const messageCard =
    document.querySelector("#messageCard");

const messageNumber =
    document.querySelector("#messageNumber");

const messageTitle =
    document.querySelector("#messageTitle");

const messageDescription =
    document.querySelector("#messageDescription");

const messageAudio =
    document.querySelector("#messageAudio");

const messageAudioSource =
    document.querySelector("#messageAudioSource");

const messagePhotoContainer =
    document.querySelector("#messagePhotoContainer");

const messagePhoto =
    document.querySelector("#messagePhoto");

const messageError =
    document.querySelector("#messageError");


/*
========================================================
3. READ THE MESSAGE ID FROM THE URL
========================================================

Example URL:

message.html?m=7KQ3A

window.location.search returns:

"?m=7KQ3A"

URLSearchParams converts that query string into something
JavaScript can easily search.
*/

const urlParameters =
    new URLSearchParams(window.location.search);


/*
.get("m") asks:

"What value is stored in the URL parameter named m?"
*/

const requestedMessageID =
    urlParameters.get("m");


/*
========================================================
4. FIND THE REQUESTED MESSAGE
========================================================

.find() searches through the VOICE_MESSAGES array.

It checks each message one at a time.

When:

message.id === requestedMessageID

evaluates to true, .find() returns that message object.
*/

const selectedMessage =
    messages.find((message) => {

        return message.id === requestedMessageID;

    });


/*
========================================================
5. DISPLAY THE MESSAGE
========================================================
*/

function displayMessage(message) {


    /*
    ----------------------------------------------------
    MESSAGE NUMBER
    ----------------------------------------------------
    */

    messageNumber.textContent =
        `Message ${String(message.order).padStart(2, "0")}`;


    /*
    ----------------------------------------------------
    PUBLIC TITLE
    ----------------------------------------------------

    We intentionally use publicTitle here.

    internalName never needs to appear to your partner.
    */

    messageTitle.textContent =
        message.publicTitle;


    /*
    ----------------------------------------------------
    DESCRIPTION
    ----------------------------------------------------
    */

    messageDescription.textContent =
        message.description;


    /*
    ----------------------------------------------------
    AUDIO
    ----------------------------------------------------

    Change the <source> element's src attribute to the
    filename stored in messages.js.
    */

    messageAudioSource.src =
        message.audio;


    /*
    After changing an audio source with JavaScript,
    .load() tells the browser:

    "Reload this audio element because its source changed."
    */

    messageAudio.load();


    /*
    ----------------------------------------------------
    OPTIONAL PHOTO
    ----------------------------------------------------
    */

    if (message.image) {

        /*
        If image contains a filename/path, show it.
        */

        messagePhoto.src =
            message.image;

        messagePhoto.alt =
            `Photo accompanying ${message.publicTitle}`;

        messagePhotoContainer.hidden =
            false;

    } else {

        /*
        If image is null, hide the photo area entirely.
        */

        messagePhotoContainer.hidden =
            true;

    }


    /*
    ----------------------------------------------------
    FINAL MESSAGE MARKER
    ----------------------------------------------------

    We are not applying the elevated final design yet.

    We simply add a CSS class that we can use later.
    */

    if (message.isFinal === true) {

        messageCard.classList.add(
            "message-card--final"
        );

    }


    /*
    ----------------------------------------------------
    PAGE TITLE
    ----------------------------------------------------

    The browser tab still primarily says
    "Celebrating Forever".

    We deliberately avoid exposing the message title
    in the browser tab.
    */

    document.title =
        window.SITE_CONFIG.browserTitle;

}


/*
========================================================
6. DISPLAY AN ERROR
========================================================
*/

function displayMessageError() {

    /*
    Hide the normal message card.
    */

    messageCard.hidden =
        true;


    /*
    Show the friendly error section.
    */

    messageError.hidden =
        false;

}


/*
========================================================
7. DECIDE WHAT TO SHOW
========================================================

If selectedMessage exists:
    display it.

Otherwise:
    show the error state.
*/

/*
========================================================
8. DISPLAY AND DISCOVER THE MESSAGE
========================================================

A valid message is considered "discovered" as soon as
the page successfully opens.

The person does NOT need to press Play first.

This matches the NFC behavior we want:

Tap tag -> page opens -> message becomes discovered.
*/

if (selectedMessage) {

    window.MESSAGE_STORAGE.markMessageDiscovered(
        selectedMessage.id
    );

    displayMessage(selectedMessage);

} else {

    displayMessageError();

}