import type {PerseusRenderer} from "../perseus-types";

export const passageArticle: PerseusRenderer = {
    content:
        "###Group/Pair Activity \n\nThis passage is adapted from Ed Yong, “Turtles Use the Earth’s Magnetic Field as Global GPS.” ©2011 by Kalmbach Publishing Co.\n\n[[☃ passage 1]]\n\n**Question 9**\n\nThe passage most strongly suggests that Adelita used which of the following to navigate her 9,000-mile journey?\n\nA) The current of the North Atlantic gyre\n\nB) Cues from electromagnetic coils designed by Putman and Lohmann\n\nC) The inclination and intensity of Earth’s magnetic field\n\nD) A simulated “magnetic signature” configured by Lohmann\n\n10) Which choice provides the best evidence for the answer to the previous question?\n\nA) Lines 1–2 (“In 1996...way”)\n\nB) Lines 20–21 (“Using...surface”)\n\nC) Lines 36–37 (“In the wild...stars”)\n\nD) Lines 43–45 (“Neither...it is”)\n\n**Question 12** \n\nBased on the passage, which choice best describes the relationship between Putman’s and Lohmann’s research?\n\nA) Putman’s research contradicts Lohmann’s.\n\nB) Putman’s research builds on Lohmann’s.\n\nC) Lohmann’s research confirms Putman’s.\n\nD) Lohmann’s research corrects Putman’s.",
    images: {},
    widgets: {
        "passage 1": {
            type: "passage",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                passageTitle: "",
                passageText:
                    "In 1996, a loggerhead turtle called Adelita swam across 9,000 miles from Mexico to Japan, crossing the entire Pacific on her way. Wallace J. Nichols tracked this epic journey with a satellite tag. But Adelita herself had no such technology at her disposal. How did she steer a route across two oceans to find her destination?\n\nNathan Putman has the answer. By testing hatchling turtles in a special tank, he has found that they can use the Earth’s magnetic field as their own Global Positioning System (GPS). By sensing the field, they can work out both their latitude and longitude and head in the right direction.\n\nPutman works in the lab of Ken Lohmann, who has been studying the magnetic abilities of loggerheads for over 20 years. In his lab at the University of North Carolina, Lohmann places hatchlings in a large water tank surrounded by a large grid of electromagnetic coils. In 1991, he found that the babies started in the opposite direction if he used the coils to reverse the direction of the magnetic field around them. They could use the field as a compass to get their bearing.\n\nLater, Lohmann showed that they can also use the magnetic field to work out their position. For them, this is literally a matter of life or death. Hatchlings born off the sea coast of Florida spend their early lives in the North Atlantic gyre, a warm current that circles between North America and Africa. If they’re swept towards the cold waters outside the gyre, they die. Their magnetic sense keeps them safe.\n\nUsing his coil-surrounded tank, Lohmann could mimic the magnetic field at different parts of the Earth’s surface. If he simulated the field at the northern edge of the gyre, the hatchlings swam southwards. If he simulated the field at the gyre’s southern edge, the turtles swam west-northwest. These experiments showed that the turtles can use their magnetic sense to work out their latitude—their position on a north-south axis. Now, Putman has shown that they can also determine their longitude—their position on an east-west axis.\n\nHe tweaked his magnetic tanks to simulate the fields in two positions with the same latitude at opposite ends of the Atlantic. If the field simulated the west Atlantic near Puerto Rico, the turtles swam northeast. If the field matched that on the east Atlantic near the Cape Verde Islands, the turtles swam southwest. In the wild, both headings would keep them within the safe, warm embrace of the North Atlantic gyre.\nBefore now, we knew that several animal migrants, from loggerheads to reed warblers to sparrows, had some way of working out longitude, but no one knew how. By keeping the turtles in the same conditions, with only the magnetic fields around them changing, Putman clearly showed that they can use these fields to find their way. In the wild, they might well also use other landmarks like the position of the sea, sun and stars.\n\nPutman thinks that the turtles work out their position using two features of the Earth’s magnetic field that change over its surface. They can sense the field’s inclination, or the angle at which it dips towards the surface. At the poles, this angle is roughly 90 degrees and at the equator, it’s roughly zero degrees. They can also sense its intensity, which is strongest near the poles and weakest near the Equator. Different parts of the world have unique combinations of these two variables. Neither corresponds directly to either latitude or longitude, but together, they provide a “magnetic signature” that tells the turtle where it is.\n",
                footnotes: "",
                showLineNumbers: true,
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const exerciseArticle: PerseusRenderer = {
    content:
        "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 1]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
    images: {},
    widgets: {
        "expression 1": {
            alignment: "default",
            graded: true,
            options: {
                answerForms: [
                    {
                        considered: "correct",
                        form: true,
                        simplify: false,
                        value: "16+88i",
                    },
                ],
                buttonSets: ["basic"],
                functions: ["f", "g", "h"],
                times: false,
            },
            static: false,
            type: "expression",
            version: {major: 1, minor: 0},
        },
    },
};
