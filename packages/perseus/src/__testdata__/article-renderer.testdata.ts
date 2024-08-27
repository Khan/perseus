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

export const articleWithImages: ReadonlyArray<PerseusRenderer> = [
    {
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
    },
    {
        content:
            "##The electromagnetic spectrum\n\nThe wavelength, frequency, and energy of EM radiation can fall within a wide range. We call that range the **electromagnetic (EM) spectrum**. \n\nA diagram of the EM spectrum is shown below.\n\n[[☃ image 3]]\n\nLet's analyze one piece of this diagram at a time.\n\n###Wavelength\n\nWavelength is the distance from one peak of a wave to the next peak. Notice how the red wave at the top of the diagram shows the wavelength *decreasing* from left to right—the peaks get closer together. \n\nThe numbers on the diagram tell us that EM wavelength ranges from $10^3\\space(1{,}000)$ meters to $10^{-12}\\space(0.00000000001)$ meters. \n\nSome EM waves have wavelengths longer than buildings while others are shorter than atoms. That's a big difference!\n\n###Frequency\n\nFrequency is the number of wave cycles in a period of time. We can't \"see\" frequency in a stationary diagram, since frequency involves change over time.\n\nBut, we can visualize frequency with a simple example. Imagine you're creating water waves by dripping water into a pool. The more frequent the drips, the higher the frequency of waves which will spread out.\n\n[[☃ image 6]]\n\nIf you release one drip per second, you'll create a wave with a frequency of $1$ hertz $(\\pu{Hz})$. $(1\\space\\pu{Hz}=1\\space\\text{cycle}/\\text{second})$ If you release three drips per second, you'll create a $3$ hertz wave.\n\nThe numbers on the diagram tell us that EM frequency ranges from $10^4\\space(10{,}000)$ hertz to $10^{20}\\space(100{,}000{,}000{,}000{,}000{,}000{,}000)$ hertz.\n\nImagine that many water drips every second!\n\n###Energy\n\nFinally, notice on the bottom of the EM spectrum diagram that **photon energy increases as frequency increases**. \n\nThe diagram does not show numerical values for energy, but the energy of EM radiation can be measured in various units.\n\nOne unit used to measure the energy of individual photons is the electronvolt $(\\pu{eV})$.\n\nTo summarize for EM waves:\n\nshorter wavelength $\\rightarrow$ higher frequency $\\rightarrow$ higher energy photons",
        images: {},
        widgets: {
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
                    box: [650, 322],
                    backgroundImage: {
                        url: "https://cdn.kastatic.org/ka-content-images/c91bbc26edeca8d28c474c22304ebff48ec4de52.svg",
                        width: 650,
                        height: 322,
                    },
                    labels: [],
                    alt: "A diagram of the EM spectrum shows the following regions in order from lowest frequency and energy to highest frequency and energy. Each is accompanied by an object for comparison to its wavelength.\nRadio waves: wavelength on the scale of buildings\nMicrowaves: wavelength on the scale of humans to butterflies\nInfrared: wavelength on the scale of a needle point\nVisible light: wavelength on the scale of protozoans\nUltraviolet: wavelength on the scale of molecules\nX-rays: wavelength on the scale of atoms\nGamma rays: wavelength on the scale of nuclei",
                    caption: "",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "image 6": {
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
                    box: [400, 267],
                    backgroundImage: {
                        url: "https://cdn.kastatic.org/ka-content-images/ad740ef4cd0a31eb3e4e7e98a66cc907834a1eca.jpg",
                        width: 400,
                        height: 267,
                    },
                    labels: [],
                    alt: "Water drips fall on a surface of water, creating circular waves that spread outward",
                    caption: "",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    {
        content:
            "##Let's take a tour!\n\nEach region of the EM spectrum has it's own name. Let's explore each region in more detail.\n\n###Radio waves\n\nRadio waves are EM waves with the longest wavelength and lowest frequency. AM and FM radio signals are sent using radio waves.\n\n###Microwaves\n\nMicrowaves have higher frequency than radio waves. Microwaves are produced inside microwave ovens to warm food. Most WiFi signals are also in the microwave range.\n\n###Infrared\n\nInfrared radiation has higher frequency than microwaves. Objects at \"everyday\" temperatures we interact with regularly, including our bodies, radiate infrared waves. So, we commonly associate infrared radiation with warmth.\n\nInfrared cameras show the amount of infrared radiating from an area. For example, this infrared image of Rusty the dog shows that the greatest amount of infrared radiation escapes from his eyes, mouth, and ears. His fur traps much of the energy on the rest of his body, keeping him warm.\n\n[[☃ image 1]]\n\nInfrared waves also radiate from surfaces warmed by the sun, like soil and concrete. Some of that infrared radiation escapes into space, and some is trapped by Earth's atmosphere.\n\n###Visible light\n\nThe next highest frequency band is visible light. This band of EM radiation is called \"visible\" because it's what human eyes can see. \n\nSighted people can only see when visible light enters their eyes. Nothing is visible in a room without visible light.\n\nOur brains perceive different frequencies in the visible spectrum as different colors. We see the longest wavelength, lowest frequency visible light as $\\color{red}{\\textbf{red}}$, and the shortest wavelength, highest frequency visible light as $\\color{darkviolet}{\\textbf{violet}}$.\n\nAll the other colors of the \n$\\textcolor{red}{\\textbf{r}}\\textcolor{darkorange}{\\textbf{a}}\\textcolor{gold}{\\textbf{i}}\\textcolor{green}{\\textbf{n}}\\textcolor{blue}{\\textbf{b}}\\textcolor{indigo}{\\textbf{o}}\\textcolor{darkviolet}{\\textbf{w}}$ are associated with frequencies between red and violet. Other colors, like white, result from mixtures of these frequencies entering our eyes at the same time.\n\n[[☃ image 9]]\n\n[[☃ explanation 1]]\n\n###Ultraviolet (UV)\n\nAs EM frequency increases beyond violet light, we lose the ability to see it with our eyes. We've entered the ultraviolet—or UV—range.\n\nRemember that photon energy increases with frequency. The energy of UV photons is high enough that they can cause damage to living tissues.\n\nIn addition to visible light, UV radiation enters Earth's atmosphere from the sun. The ozone layer blocks much of it, but some UV makes it to Earth's surface.\n\nSo when you're outside in the sun, make sure that you use UV protection to avoid sunburns and eye damage.\n\n###X-rays\n\nAs EM frequency increases beyond UV, we arrive at X-rays.\n\nThe energy of X-ray photons is high enough to make it **ionizing** radiation. This means that if an X-ray photon enters matter, it can knock electrons out of (ionize) atoms in the matter.\n\nThis is dangerous for organisms, since repeated ionizations in cells can lead to damage and mutations.\n\nHowever, the small dose of X-ray radiation received during a medical scan is safe. If you've ever had an X-ray image taken of your body, X-ray photons were sent into you. Dense tissues like bone block more X-rays than soft tissues, creating a shadow image when the X-rays reach a detector on the other side.\n\nCan you tell what's wrong with this person's arm from the X-ray image? Ouch.\n\n[[☃ image 4]]\n\n###Gamma rays\n\nFinally, we reach gamma rays. Gamma $(\\gamma)$ radiation has the highest frequency and energy of any EM radiation. Like X-rays, gamma rays are **ionizing** radiation. They're the most hazardous to living things.\n\nGamma rays are produced by high energy interactions in space. Gamma rays are also produced by unstable nuclei during a type of radioactive decay called *gamma decay*.\n\n[[☃ image 7]]\n\nThough gamma rays are hazardous, they can also be used for good. For example, gamma rays are used in radiation therapy to kill cancer cells.",
        images: {},
        widgets: {
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
                    box: [416, 212],
                    backgroundImage: {
                        url: "https://cdn.kastatic.org/ka-content-images/386d98878f310b2c47b6ff9efa03bfb59d5a5448.jpg",
                        width: 416,
                        height: 212,
                    },
                    labels: [],
                    alt: "An infrared image of a dog's face, represented in visible colors. Yellow regions emit more infrared, and purple regions emit less infrared. In the infrared image, the dog's open mouth, eyes, and ears are yellow, and the rest of his face is purple.",
                    caption: "",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "image 9": {
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
                    box: [400, 314],
                    backgroundImage: {
                        url: "https://cdn.kastatic.org/ka-content-images/84ab83cd86b18c94388b8247e853536d3230239e.jpg",
                        width: 400,
                        height: 314,
                    },
                    labels: [],
                    alt: "A triangular glass prism spreads out different wavelengths of visible light. A beam of white light enters the prism on one side, and a rainbow of colors exits the other side.",
                    caption: "",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "explanation 1": {
                type: "explanation",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    showPrompt: 'Does "light" only refer to visible light?',
                    hidePrompt: "Hide explanation",
                    explanation:
                        'It depends. Sometimes scientists use "light" to refer specifically to visible light. Other times they use "light" to refer to the entire EM spectrum.\n\nSo, you can do either, as long as you\'re clear about what you\'re referring to.',
                    widgets: {},
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "image 4": {
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
                    box: [200, 446],
                    backgroundImage: {
                        url: "https://cdn.kastatic.org/ka-content-images/ed08bb252bcc442e308e7a4de96ff1a312727065.jpg",
                        width: 200,
                        height: 446,
                    },
                    labels: [],
                    alt: "A black and white X-ray image of a person's arm shows the arm bone in white, and the surrounding tissues in lighter gray. The bone is fractured near the elbow.",
                    caption: "",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "image 7": {
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
                    box: [275, 187],
                    backgroundImage: {
                        url: "https://cdn.kastatic.org/ka-content-images/e1dea0b94f32064bbb667aa882460092020afab5.png",
                        width: 275,
                        height: 187,
                    },
                    labels: [],
                    alt: "A large nucleus is shown as a clump of red protons and blue neutrons. A gamma photon, shown as a squiggly wave packet, shoots out of the nucleus.",
                    caption: "",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    {
        content:
            "##Summary\n\nElectromagnetic radiation consists of oscillating electric and magnetic fields. It can be modeled both as waves and as particles called *photons*. All EM radiation, from radio to gamma, travels at speed $\\text{c}$ in a vacuum. The higher the frequency of EM radiation, the higher the energy of the photons.\n\nHuman eyes can only see the visible light portion of the spectrum directly. However, we can use various detectors to make the other regions of the EM spectrum visible to us.\n\nLet's conclude by viewing the Crab Nebula in different wavelengths. A whole new universe is revealed when we view the cosmos across the electromagnetic spectrum!\n\n[[☃ image 1]]",
        images: {},
        widgets: {
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
                    box: [650, 150],
                    backgroundImage: {
                        url: "https://cdn.kastatic.org/ka-content-images/fa3133d6d23c0852e1a81a54d78946910523e365.png",
                        width: 650,
                        height: 150,
                    },
                    labels: [],
                    alt: "The Crab Nebula appears different in the following wavelengths of the EM spectrum:\nRadio, infrared, and ultraviolet: the nebula is most intense in the middle and weaker around the outside.\nVisible light: the nebula shows several thin, fibrous features stretching toward the outside\nX-rays: a rotating spiral is visible in the middle of the nebula, with two jets shooting out\nGamma: a ball glows in the middle of the nebula",
                    caption:
                        "We can use detectors sensitive to different frequencies to produce images of the same object in different regions of the EM spectrum. The images are presented using visible light so we can see them.",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    {
        content:
            "##Try it!\n\n[[☃ graded-group 1]]\n\n[[☃ graded-group 2]]\n\n[[☃ graded-group 3]]\n\n[[☃ explanation 1]]\n",
        images: {},
        widgets: {
            "graded-group 1": {
                type: "graded-group",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    title: "",
                    content:
                        "\n**Problem 1**\n\nSelect the correct description for each point marked on the rainbow.\n\n[[☃ label-image 1]]",
                    images: {},
                    widgets: {
                        "label-image 1": {
                            type: "label-image",
                            alignment: "default",
                            static: false,
                            graded: true,
                            options: {
                                static: false,
                                choices: [
                                    "long wavelength & low frequency",
                                    "short wavelength & high frequency",
                                ],
                                imageAlt:
                                    "Section of a rainbow in the sky. From left to right, the colors appear as violet, indigo, blue, green, yellow, orange, and red.",
                                imageUrl:
                                    "https://cdn.kastatic.org/ka-content-images/227d402cb09ebc1b67f197467212fa4ab3ced5b3.jpg",
                                imageWidth: 400,
                                imageHeight: 289,
                                markers: [
                                    {
                                        answers: [
                                            "short wavelength & high frequency",
                                        ],
                                        label: "Violet side of the rainbow",
                                        x: 35.8,
                                        y: 13,
                                    },
                                    {
                                        answers: [
                                            "long wavelength & low frequency",
                                        ],
                                        label: "Red side of the rainbow",
                                        x: 71.8,
                                        y: 50.5,
                                    },
                                ],
                                multipleAnswers: false,
                                hideChoicesFromInstructions: true,
                                preferredPopoverDirection: "DOWN",
                            },
                            version: {
                                major: 0,
                                minor: 0,
                            },
                        },
                    },
                    hint: {
                        content:
                            "We can use the electromagnetic spectrum to determine the properties of each end of the rainbow.\n\n[[☃ image 1]]\n\nThe spectrum shows that for visible light, red light has the longest wavelength and lowest frequency, and violet light has the shortest wavelength and highest frequency.",
                        images: {},
                        widgets: {
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
                                    box: [650, 322],
                                    backgroundImage: {
                                        url: "https://cdn.kastatic.org/ka-content-images/c91bbc26edeca8d28c474c22304ebff48ec4de52.svg",
                                        width: 650,
                                        height: 322,
                                    },
                                    labels: [],
                                    alt: "",
                                    caption: "",
                                },
                                version: {
                                    major: 0,
                                    minor: 0,
                                },
                            },
                        },
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "graded-group 2": {
                type: "graded-group",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    title: "",
                    content:
                        "**Problem 2**\n\nThe image below shows laser beams of different colors.\n\n[[☃ image 1]]\n\n**Which laser beam contains the highest energy photons?**\n\n[[☃ radio 1]]",
                    images: {},
                    widgets: {
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
                                box: [400, 300],
                                backgroundImage: {
                                    url: "https://cdn.kastatic.org/ka-content-images/43a778bc143b510658c4be3cc447effe3d0018bf.jpg",
                                    width: 400,
                                    height: 300,
                                },
                                labels: [],
                                alt: "Several laser beams of different colors: red, green, blue, and violet",
                                caption: "",
                            },
                            version: {
                                major: 0,
                                minor: 0,
                            },
                        },
                        "radio 1": {
                            type: "radio",
                            alignment: "default",
                            static: false,
                            graded: true,
                            options: {
                                choices: [
                                    {
                                        content: "red",
                                        correct: false,
                                        clue: "Red photons have the *lowest* frequency and energy on the visible spectrum.",
                                    },
                                    {
                                        content: "green",
                                        correct: false,
                                        clue: "Green photons have *lower* frequency and energy than blue photons on the visible spectrum.",
                                    },
                                    {
                                        isNoneOfTheAbove: false,
                                        content: "blue",
                                        correct: false,
                                        clue: "Blue photons have *lower* frequency and energy than violet photons on the visible spectrum.",
                                    },
                                    {
                                        isNoneOfTheAbove: false,
                                        content: "violet",
                                        correct: true,
                                        clue: "Violet photons have the highest frequency and energy on the visible spectrum.",
                                    },
                                ],
                                randomize: false,
                                multipleSelect: false,
                                countChoices: false,
                                displayCount: null,
                                hasNoneOfTheAbove: false,
                                deselectEnabled: false,
                            },
                            version: {
                                major: 1,
                                minor: 0,
                            },
                        },
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "graded-group 3": {
                type: "graded-group",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    title: "",
                    content:
                        "\n**Problem 3**\n\nWhich of these forms of EM radiation are **ionizing**?\n\n[[☃ radio 1]]",
                    images: {},
                    widgets: {
                        "radio 1": {
                            type: "radio",
                            alignment: "default",
                            static: false,
                            graded: true,
                            options: {
                                choices: [
                                    {
                                        content: "Radio waves",
                                        clue: "Radio photons are *not* high enough energy to be ionizing.",
                                    },
                                    {
                                        content: "Infrared",
                                        clue: "Infrared photons are *not* high enough energy to be ionizing.",
                                    },
                                    {
                                        isNoneOfTheAbove: false,
                                        content: "X-rays",
                                        clue: "X-ray photons are high enough energy to be ionizing.",
                                        correct: true,
                                    },
                                    {
                                        isNoneOfTheAbove: false,
                                        content: "Gamma rays",
                                        clue: "Gamma photons are high enough energy to be ionizing.",
                                        correct: true,
                                    },
                                ],
                                randomize: false,
                                multipleSelect: true,
                                countChoices: false,
                                displayCount: null,
                                hasNoneOfTheAbove: false,
                                deselectEnabled: false,
                            },
                            version: {
                                major: 1,
                                minor: 0,
                            },
                        },
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "explanation 1": {
                type: "explanation",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    showPrompt: "Image credits",
                    hidePrompt: "Hide image credits",
                    explanation:
                        '"[An orbital sunrise above Shenzhen, China](https://www.nasa.gov/image-feature/an-orbital-sunrise-above-shenzhen-china)" by NASA, [Public domain](https://creativecommons.org/publicdomain/mark/1.0/)\n\n"[EM wave gif](https://commons.wikimedia.org/wiki/File:EM-Wave.gif)" by And1mu, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.en)\n\n"[Photon arrow](https://commons.wikimedia.org/wiki/File:Photon_arrow.svg)" by Napy1kenobi, [Public domain](https://creativecommons.org/publicdomain/zero/1.0/deed.en)\n\n"[EM spectrum properties](https://commons.wikimedia.org/wiki/File:EM_Spectrum_Properties_edit.svg)" by Inductiveload, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.en)\n\n"[Frozen](https://commons.wikimedia.org/wiki/File:Frozen_(86941053).jpeg)" by Ricardo Costa, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/deed.en)\n\n"[Infrared dog](https://commons.wikimedia.org/wiki/File:Infrared_dog.jpg)" by NASA/IPAC, [Public domain](https://creativecommons.org/publicdomain/mark/1.0/)\n\n"[Prism flat rainbow](https://commons.wikimedia.org/wiki/File:Prism_flat_rainbow.jpg)" by Kelvinsong, [Public domain](https://creativecommons.org/publicdomain/mark/1.0/)\n\n"[Upper arm fracture from arm wrestling](https://commons.wikimedia.org/wiki/File:Oberarmfraktur_durch_Armdruecken_02.jpg)" by Hellerhoff, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.en)\n\n"[Gamma decay](https://commons.wikimedia.org/wiki/File:Gamma_Decay01.svg)" by And1mu, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.en)\n\n"[Crab Nebula in multiple wavelengths](https://commons.wikimedia.org/wiki/File:Crab_Nebula_in_Multiple_Wavelengths.png)" by Torres997, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.en)\n\n"[A rainbow viewed from Earl\'s Croome](https://commons.wikimedia.org/wiki/File:A_rainbow_viewed_from_Earl%27s_Croome_-_geograph.org.uk_-_5161205.jpg)" by Philip Halling, [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/deed.en)\n\n"[LASER](https://commons.wikimedia.org/wiki/File:LASER.jpg)" by Peng Jiajie, [CC BY 2.5](https://creativecommons.org/licenses/by/2.5/deed.en)\n',
                    widgets: {},
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
];
