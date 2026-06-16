// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    "answerArea": {
        "calculator": false,
        "options": {
            "content": "",
            "images": {},
            "widgets": {}
        },
        "type": "multiple"
    },
    "hints": [
        {
            "content": "We should be able to approach the base of the mountain. Measure it angle of the base using the protractor.",
            "images": {},
            "widgets": {}
        },
        {
            "content": "In the training course built for the earthbound version of Curiosity, they had a number obstacles and hills set out. For example, the **smallest** of these hills had an incline of 5 degrees.",
            "images": {},
            "widgets": {}
        },
        {
            "content": "Curiosity is expected to have the ability to ascend inclines as large as 20 degrees.",
            "images": {},
            "widgets": {}
        }
    ],
    "question": {
        "content": "Curiosity's landing site is Gale Crater; a location notable for having a large mountain of layered rock in the center known as Aeolis Mons (*Mount Sharp*). This prevents Curiosity from traveling **directly across** due to the steep incline towards the top. Instead, it was designed to drive up and along the shallower base.\n\n**How steep of an incline was Curiosity designed for?**\n\n*Click and drag the protractor to help you!*\n[[☃ measurer 1]]\n\n[[☃ dropdown 1]]",
        "images": {},
        "widgets": {
            "dropdown 1": {
                "graded": true,
                "options": {
                    "choices": [
                        {
                            "content": "5",
                            "correct": false
                        },
                        {
                            "content": "10",
                            "correct": false
                        },
                        {
                            "content": "20",
                            "correct": true
                        },
                        {
                            "content": "30",
                            "correct": false
                        },
                        {
                            "content": "45",
                            "correct": false
                        },
                        {
                            "content": "60",
                            "correct": false
                        },
                        {
                            "content": "90",
                            "correct": false
                        }
                    ]
                },
                "type": "dropdown"
            },
            "measurer 1": {
                "graded": true,
                "options": {
                    "box": [
                        480,
                        480
                    ],
                    "imageLeft": 0,
                    "imageTop": 0,
                    "imageUrl": "https://ka-perseus-images.s3.amazonaws.com/32d7ebe969c7ce5b241873ac172d50992ca79de3.jpeg",
                    "rulerLabel": "",
                    "rulerLength": 10,
                    "rulerPixels": 40,
                    "rulerTicks": 10,
                    "showProtractor": true,
                    "showRuler": false
                },
                "type": "measurer"
            }
        }
    }
}
