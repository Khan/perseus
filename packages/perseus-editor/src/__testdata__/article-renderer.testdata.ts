import type {PerseusRenderer} from "@khanacademy/perseus-core";

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
