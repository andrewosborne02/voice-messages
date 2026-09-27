/*
========================================================
LOCAL MESSAGE STORAGE
========================================================

This file handles message discovery on the current device.

It has three primary jobs:

1. Read the list of discovered message IDs.
2. Add a newly discovered message ID.
3. Clear discoveries during development/testing.

Nothing in this file sends information anywhere.

The information remains in the browser's localStorage.
*/


/*
========================================================
1. STORAGE KEY
========================================================

localStorage stores information using:

KEY -> VALUE

We give our data a distinctive key so it does not
conflict with other website data.
*/

const DISCOVERED_MESSAGES_KEY =
    "celebratingForever.discoveredMessages";


/*
========================================================
2. GET DISCOVERED MESSAGE IDs
========================================================
*/

function getDiscoveredMessageIDs() {

    try {

        /*
        Ask localStorage for the value saved under our key.
        */

        const storedValue =
            localStorage.getItem(
                DISCOVERED_MESSAGES_KEY
            );


        /*
        If nothing has ever been saved, localStorage
        returns null.

        In that case we return an empty array.
        */

        if (storedValue === null) {

            return [];

        }


        /*
        localStorage can store only strings.

        JSON.parse() converts our saved string back into
        a real JavaScript array.
        */

        const parsedValue =
            JSON.parse(storedValue);


        /*
        Make sure the stored data is actually an array.

        This protects the website against corrupted or
        unexpected browser data.
        */

        if (Array.isArray(parsedValue)) {

            return parsedValue;

        }


        return [];

    } catch (error) {

        /*
        If Safari ever blocks storage or the saved value
        becomes unreadable, the website should continue
        functioning rather than crashing.
        */

        console.error(
            "Could not read discovered messages:",
            error
        );

        return [];

    }

}


/*
========================================================
3. MARK A MESSAGE AS DISCOVERED
========================================================
*/

function markMessageDiscovered(messageID) {

    try {

        /*
        Start with the IDs already discovered.
        */

        const discoveredIDs =
            getDiscoveredMessageIDs();


        /*
        .includes() asks whether the array already
        contains this message ID.

        We do not want duplicate entries.
        */

        if (!discoveredIDs.includes(messageID)) {

            discoveredIDs.push(messageID);


            /*
            localStorage stores only strings.

            JSON.stringify() converts:

            ["7KQ3A", "P9W4C"]

            into a string representation that can be
            stored by the browser.
            */

            localStorage.setItem(
                DISCOVERED_MESSAGES_KEY,
                JSON.stringify(discoveredIDs)
            );

        }

    } catch (error) {

        console.error(
            "Could not save discovered message:",
            error
        );

    }

}


/*
========================================================
4. CHECK ONE MESSAGE
========================================================

This function answers:

"Has this particular message already been discovered?"
*/

function isMessageDiscovered(messageID) {

    const discoveredIDs =
        getDiscoveredMessageIDs();

    return discoveredIDs.includes(messageID);

}


/*
========================================================
5. CLEAR DISCOVERIES
========================================================

This is useful only while YOU are testing.

Proposal mode will not expose the reset control.
*/

function clearDiscoveredMessages() {

    try {

        localStorage.removeItem(
            DISCOVERED_MESSAGES_KEY
        );

    } catch (error) {

        console.error(
            "Could not clear discovered messages:",
            error
        );

    }

}


/*
========================================================
6. MAKE THESE FUNCTIONS AVAILABLE TO OTHER FILES
========================================================

Just like SITE_CONFIG and VOICE_MESSAGES, we attach an
object to window so other scripts can access these tools.
*/

window.MESSAGE_STORAGE = {

    getDiscoveredMessageIDs,

    markMessageDiscovered,

    isMessageDiscovered,

    clearDiscoveredMessages

};