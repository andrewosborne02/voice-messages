/*
========================================================
HOMEPAGE CONTROLLER
========================================================

This JavaScript is used only by index.html.

Its current responsibility is managing the homepage
photograph.

The photograph itself is configured in site-config.js.
*/


/*
========================================================
1. LOAD CONFIGURATION
========================================================
*/

const homeConfig =
    window.SITE_CONFIG;


/*
========================================================
2. FIND HOMEPAGE PHOTO ELEMENTS
========================================================
*/

const homePhoto =
    document.querySelector("#homePhoto");

const homePhotoPlaceholder =
    document.querySelector("#homePhotoPlaceholder");


/*
========================================================
3. DISPLAY HOMEPAGE PHOTO
========================================================

If homePhoto contains a valid filename:

- load that photograph
- reveal the photograph
- hide the placeholder

If homePhoto is null:

- keep the placeholder visible
*/

function displayHomePhoto() {


    /*
    Safety check.

    If this script somehow runs on a page without the
    homepage photo elements, stop immediately.
    */

    if (
        !homePhoto ||
        !homePhotoPlaceholder
    ) {

        return;

    }


    /*
    If a photograph has been configured...
    */

    if (homeConfig.homePhoto) {


        /*
        Set the image filename/path.
        */

        homePhoto.src =
            homeConfig.homePhoto;


        /*
        Set accessibility text.
        */

        homePhoto.alt =
            homeConfig.homePhotoAlt;


        /*
        Reveal the photograph.
        */

        homePhoto.hidden =
            false;


        /*
        Hide the development placeholder.
        */

        homePhotoPlaceholder.hidden =
            true;


    } else {


        /*
        No photograph has been configured yet.
        */

        homePhoto.hidden =
            true;

        homePhotoPlaceholder.hidden =
            false;

    }

}


/*
Actually run the photo-display function.
*/

displayHomePhoto();