import type {PerseusRenderer} from "../perseus-types";

export const singleSectionArticle: PerseusRenderer = {
    content:
        "[[☃ image 2]]\n\n**Part A:** Return to the main characters from your three favorite films. \n\n- What was one important choice they had to make where the stakes were **high**?\n\n-  What were the **stakes**?\n\n- Can you identify them as internal, external or philosophical?\n\n**Part B:** Think about a difficult choice you had to make in your own life.  What was at stake? \n\n**Part C:** Return to one of the obstacles your character might face from the previous exercise. Now think of the **choice** this obstacle forces them to make. Answer the following:\n\n- What are the possible stakes of this choice?\n\n- Can you come up with an internal, external or philosophical stake which applies to this choice? \n",
    images: {},
    widgets: {
        "image 2": {
            type: "image",
            alignment: "block",
            static: false,
            graded: true,
            options: {
                static: false,
                title: "",
                range: [
                    [0, 10],
                    [0, 10],
                ],
                box: [1258, 703],
                backgroundImage: {
                    url: "https://ka-perseus-images.s3.amazonaws.com/b08029bc1786fbe54468a2ddc96aaa20be7a663a.png",
                    width: 1258,
                    height: 703,
                },
                labels: [],
                alt: 'A scene from Pixar\'s film "Toy Story 3" where the characters are swimming in a sea of trash and look very afraid.',
                caption:
                    'A scene from Pixar\'s film "Toy Story 3" where the characters are swimming in a sea of trash and look very afraid."',
            },
            version: {major: 0, minor: 0},
        },
    },
};

export const articleWithImages: PerseusRenderer = {
    content:
        "The word \"radiation\" sometimes gets a bad rap. People often associate radiation with something dangerous or scary, without really knowing what it is. In reality, we're surrounded by radiation all the time. \n\n**Radiation** is energy that travels through space (not just \"outer space\"—any space). Radiation can also interact with matter. How radiation interacts with matter depends on the type of radiation and the type of matter.\n\nRadiation comes in many forms, one of which is *electromagnetic radiation*. Without electromagnetic radiation life on Earth would not be possible, nor would most modern technologies.\n\n[[☃ image 13]]\n\nLet's take a closer look at this important and fascinating type of radiation.\n\n##Electromagnetic radiation\n\nAs the name suggests, **electromagnetic (EM) radiation** is energy transferred by *electromagnetic fields* oscillating through space.\n\nEM radiation is strange—it has both wave and particle properties. Let's take a look at both.\n\n###Electromagnetic waves\n\nAn animated model of an EM wave is shown below.\n[[☃ image 1]]\nThe electric field $(\\vec{\\textbf{E}})$ is shown in $\\color{blue}\\textbf{blue}$, and the magnetic field $(\\vec{\\textbf{B}})$ is shown in $\\color{red}\\textbf{red}$. They're perpendicular to each other.\n\nA changing electric field creates a magnetic field, and a changing magnetic field creates an electric field. So, once the EM wave is generated it propagates itself through space!\n\nAs with any wave, EM waves have wavelength, frequency, and speed. The wave model of EM radiation works best on large scales. But what about the atomic scale?\n\n###Photons\n\nAt the quantum level, EM radiation exists as particles. A particle of EM radiation is called a **photon**.\n\nWe can think of photons as wave *packets*—tiny bundles of EM radiation containing specific amounts of energy. Photons are visually represented using the following symbol.\n\n[[☃ image 3]]\n\nAll EM radiation, whether modeled as waves or photons, travels at the **speed of light** $\\textbf{(c)}$ in a vacuum: \n\n$\\text{c}=3\\times10^8\\space\\pu{m/s}=300{,}000{,}000\\space\\pu{m/s}$\n\nBut, EM radiation travels at a slower speed in matter, such as water or glass.",
    images: {},
    widgets: {
        "image 13": {
            type: "image",
            alignment: "block",
            static: false,
            graded: true,
            options: {
                static: false,
                title: "",
                range: [
                    [0, 10],
                    [0, 10],
                ],
                box: [600, 254],
                backgroundImage: {
                    url: "https://cdn.kastatic.org/ka-content-images/358a87c20ab6ee70447f5fcb547010f69986828e.jpg",
                    width: 600,
                    height: 254,
                },
                labels: [],
                alt: "From space, the sun appears over Earth's horizon, illuminating the atmosphere as a blue layer above Earth. Above the atmosphere, space appears black.",
                caption:
                    "*Sunrise photo from the International Space Station. Earth's atmosphere scatters electromagnetic radiation from the sun, producing a bright sky during the day.*",
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
        "image 1": {
            type: "image",
            alignment: "block",
            static: false,
            graded: true,
            options: {
                static: false,
                title: "",
                range: [
                    [0, 10],
                    [0, 10],
                ],
                box: [627, 522],
                backgroundImage: {
                    url: "https://cdn.kastatic.org/ka-content-images/8100369eaf3b581d4e7bfc9f1062625309def486.gif",
                    width: 627,
                    height: 522,
                },
                labels: [],
                alt: "An animation shows a blue electric field arrow oscillating up and down. Connected to the base of the electric field arrow is a magnetic field arrow, which oscillates from side to side. The two fields oscillate in unison: when one extends the other extends too, creating a repeating wave pattern.",
                caption: "",
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
        "image 3": {
            type: "image",
            alignment: "block",
            static: false,
            graded: true,
            options: {
                static: false,
                title: "",
                range: [
                    [0, 10],
                    [0, 10],
                ],
                box: [350, 130],
                backgroundImage: {
                    url: "https://cdn.kastatic.org/ka-content-images/74edeeb6c6605a4e854e3a3e9db69c01dcf5508f.svg",
                    width: 350,
                    height: 130,
                },
                labels: [],
                alt: "A squiggly curve drawn from left to right. The right end of the curve has an arrow point. The curve begins with a small amount of wiggle on the left, which grows in amplitude in the middle and then decreases again on the right. The result is a small wave packet.",
                caption: "",
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

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

export const articleSectionWithExpression: PerseusRenderer = {
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

export const multiSectionArticle: ReadonlyArray<PerseusRenderer> = [
    {
        content:
            "## What is a matrix?\n\nA matrix is a rectangular array of numbers arranged in rows and columns.\n\nMatrices can be useful for organizing and manipulating data. They can also be used as a tool to help solve systems of equations.",
        images: {},
        widgets: {},
    },
    {
        content:
            "## How do we multiply a matrix by a scalar?\n\nTo multiply a matrix by a scalar, we multiply each entry in the matrix by the scalar. For example, if \n\n$A = \\begin{bmatrix} \n2 & 3 \\\\\n1 & 4 \\\\\n\\end{bmatrix}$\n\nand we want to multiply $A$ by $2$, we can multiply each entry by $2$ to get:\n\n$2A = \\begin{bmatrix} \n4 & 6 \\\\\n2 & 8 \\\\\n\\end{bmatrix}$",
        images: {},
        widgets: {},
    },
    {
        content:
            "## How do we add or subtract two matrices?\n\nTo add or subtract two matrices, we add or subtract corresponding entries. So if \n\n$A = \\begin{bmatrix} \n2 & 3 \\\\\n1 & 4 \\\\\n\\end{bmatrix}$ \n\nand \n\n$B = \\begin{bmatrix} \n5 & 2 \\\\\n3 & 1 \\\\\n\\end{bmatrix}$,\n\nthen \n\n$A+B = \\begin{bmatrix} \n7 & 5 \\\\\n4 & 5 \\\\\n\\end{bmatrix}$\n\nand \n\n$A-B = \\begin{bmatrix} \n-3 & 1 \\\\\n-2 & 3 \\\\\n\\end{bmatrix}$",
        images: {},
        widgets: {},
    },
    {
        content:
            "## How do we multiply two matrices together?\n\nThis one's a bit trickier. To multiply two matrices together, we take the dot product of the rows from the first matrix with the columns from the second matrix. The result is a new matrix. For example, if \n\n$A = \\begin{bmatrix} \n2 & 3 \\\\\n1 & 4 \\\\\n\\end{bmatrix}$ \n\nand \n\n$B = \\begin{bmatrix} \n5 & 2 \\\\\n3 & 1 \\\\\n\\end{bmatrix}$,\n\nthen \n\n$AB = \\begin{bmatrix} \n2\\cdot5+3\\cdot3 & 2\\cdot2+3\\cdot1 \\\\\n1\\cdot5+4\\cdot3 & 1\\cdot2+4\\cdot1 \\\\\n\\end{bmatrix} = \\begin{bmatrix} \n19 & 7 \\\\\n17 & 6 \\\\\n\\end{bmatrix}.$",
        images: {},
        widgets: {},
    },
    {
        content:
            "## What can we do with the inverse of a matrix?\n\nFinding the inverse of a matrix can be useful for solving linear systems of equations. If $A$ is the matrix representing the system of equations, and $b$ is the vector of solutions, then $Ax=b$. If we can find the inverse of $A$, we can multiply both sides of the equation by it to isolate $x$:\n\n$A^{-1}Ax=A^{-1}b \\Rightarrow x=A^{-1}b.$",
        images: {},
        widgets: {},
    },
    {
        content:
            "## Where are matrices used in the real world?\n\nMatrices have tons of real-world applications! They can be used in computer graphics to perform transformations on images, in physics to model physical systems, and in statistics to analyze data, just to name a few.",
        images: {},
        widgets: {},
    },
];

export const multiSectionArticleWithExpression: ReadonlyArray<PerseusRenderer> =
    [
        {
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
        },
        {
            content:
                "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 2]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
            images: {},
            widgets: {
                "expression 2": {
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
        },
        {
            content:
                "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 3]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
            images: {},
            widgets: {
                "expression 3": {
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
        },
    ];
