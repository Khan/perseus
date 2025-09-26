// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    answerArea: {
        calculator: false,
        options: {
            content: "",
            images: {},
            widgets: {},
        },
        periodicTable: false,
        type: "multiple",
    },
    hints: [
        {
            content: "This is a hint... with a video!\n\n[[☃ iframe 1]]",
            images: {},
            widgets: {
                "iframe 1": {
                    graded: true,
                    options: {
                        allowFullScreen: true,
                        height: "235",
                        settings: [
                            {
                                name: "",
                                value: "",
                            },
                        ],
                        url: "https://www.youtube.com/embed/qYD5iwhLzm8?enablejsapi=1&wmode=transparent&modestbranding=1&rel=0&frameborder='0'",
                        width: "425",
                    },
                    type: "iframe",
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
            },
        },
    ],
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    question: {
        content: "This is a question.",
        images: {},
        widgets: {},
    },
};
