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
    hints: [],
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    question: {
        content:
            "For shipping purposes, foam mattresses are rolled tightly into cylinders. The volume of the cylinder is significantly less than the volume of the mattress when it is laid out as rectangular prism. For the sake of this problem, let's say that the volume of the rolled up mattress is exactly half of the laid out mattress.\n\nThe dimensions of the mattress when it is laid out are...\n\nWhat is the radius of the mattress when it is rolled up into a cylinder.\n\n[[☃ numeric-input 1]] ",
        images: {},
        widgets: {
            "numeric-input 1": {
                graded: true,
                options: {
                    answers: [
                        {
                            answerForms: [],
                            maxError: null,
                            message: "",
                            simplify: "required",
                            status: "correct",
                            strict: false,
                            value: null,
                        },
                    ],
                    size: "normal",
                },
                type: "numeric-input",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
};
