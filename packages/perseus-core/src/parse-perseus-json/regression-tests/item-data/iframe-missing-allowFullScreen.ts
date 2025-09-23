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
        type: "multiple",
    },
    hints: [
        {
            content:
                'This is the easy step. Just drag disk 3 over to peg "B".\n\n[[☃ image 1]]',
            images: {},
            widgets: {
                "image 1": {
                    graded: true,
                    options: {
                        backgroundImage: {
                            height: 215,
                            url: "https://s3.amazonaws.com/ka-cs-algorithms/hanoi_exercise_step2_1.png",
                            width: 304,
                        },
                        box: [304, 215],
                        labels: [],
                        range: [
                            [0, 10],
                            [0, 10],
                        ],
                    },
                    type: "image",
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
        content:
            'Congratulations, you have exposed disk 3, and since our goal is move 3 disks to peg "B", that\'s the disk we want on the bottom of peg "B". Move it to the target peg now.\n\n[[☃ iframe 1]]',
        images: {},
        widgets: {
            "iframe 1": {
                graded: true,
                options: {
                    height: "400",
                    settings: [
                        {
                            name: "step",
                            value: "2",
                        },
                        {
                            name: "disk1",
                            value: "2",
                        },
                        {
                            name: "disk2",
                            value: "2",
                        },
                        {
                            name: "",
                            value: "",
                        },
                    ],
                    url: "4772835774169088",
                    width: 400,
                },
                type: "iframe",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
};
