const messages = {

    "test": {

        number: "MESSAGE 01",

        title: "Open when you need a reminder",

        date: "September 20, 2026",

        intro: "I made this one just for you.",

        audio: "audio/test.m4a"

    },


    "miss-me": {

        number: "MESSAGE 02",

        title: "Open when you miss me",

        date: "September 20, 2026",

        intro: "If you're listening to this, I hope this makes me feel a little closer.",

        audio: "audio/miss-me.m4a"

    },


    "bad-day": {

        number: "MESSAGE 03",

        title: "Open when you've had a bad day",

        date: "September 20, 2026",

        intro: "Whatever happened today, this message is for you.",

        audio: "audio/bad-day.m4a"

    }

};

const parameters =
    new URLSearchParams(window.location.search);


const messageID =
    parameters.get("m") || "test";


const message =
    messages[messageID];


if (message) {

    document.getElementById("messageNumber")
        .textContent = message.number;


    document.getElementById("messageTitle")
        .textContent = message.title;


    document.getElementById("messageDate")
        .textContent = message.date;


    document.getElementById("messageIntro")
        .textContent = message.intro;


    document.getElementById("audioSource")
        .src = message.audio;


    document.getElementById("audioPlayer")
        .load();

}