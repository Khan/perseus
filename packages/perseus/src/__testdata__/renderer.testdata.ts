import {
    generateDefinitionOptions,
    generateDefinitionWidget,
    generateDropdownOptions,
    generateDropdownWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import type {MockWidget} from "../widgets/mock-widgets/mock-widget-types";
import type {
    DropdownWidget,
    ImageWidget,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

export const dropdownWidget: DropdownWidget = generateDropdownWidget({
    options: generateDropdownOptions({
        ariaLabel: "Test ARIA label",
        visibleLabel: "Test visible label",
        placeholder: "greater/less than or equal to",
        choices: [
            {
                content: "greater than or equal to",
                correct: false,
            },
            {
                content: "less than or equal to",
                correct: true,
            },
        ],
    }),
});

export const imageWidget: ImageWidget = {
    alignment: "block",
    graded: true,
    options: {
        alt: "A number line labeled 200 to 300 with tick marks at every 5 units. The tick marks at 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, and 300 are labeled. A red circle labeled A is between 220 tick mark and 230 tick mark.",
        backgroundImage: {
            height: 80,
            url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/3351ccf19e60c28a1d08664f5c16defa76ed0348",
            width: 380,
        },
    },
    static: false,
    type: "image",
    version: {major: 0, minor: 0},
};

export const mockWidget: MockWidget = {
    type: "mock-widget",
    graded: true,
    alignment: "default",
    options: {
        value: "0.3333333333333333",
    },
    version: {
        major: 0,
        minor: 0,
    },
};

export const question1: PerseusRenderer = {
    content:
        "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
    images: {},
    widgets: {"dropdown 1": dropdownWidget},
};

export const question2: PerseusRenderer = {
    content:
        "Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  \n\n**What fraction of the pie did Denis's dad eat?**  \n![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    \n[[\u2603 mock-widget 1]]  \n\n\n\n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
            {
                width: 200,
                height: 200,
            },
    },
    widgets: {"mock-widget 1": mockWidget},
};

export const definitionItem: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Mock widgets ==> [[\u2603 definition 1]] [[\u2603 definition 2]] [[\u2603 definition 3]]",
    widgets: {
        "definition 1": generateDefinitionWidget({
            options: generateDefinitionOptions({
                togglePrompt: "word",
                definition: "",
            }),
        }),
        "definition 2": generateDefinitionWidget({
            options: generateDefinitionOptions({
                togglePrompt: "word",
                definition: "",
            }),
        }),
        "definition 3": generateDefinitionWidget({
            options: generateDefinitionOptions({
                togglePrompt: "word",
                definition: "",
            }),
        }),
    },
});

export const mockedRandomItem: PerseusRenderer = {
    content: "Mock widgets ==> [[\u2603 radio 1]] [[\u2603 radio 2]]",
    images: {},
    widgets: {
        "radio 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            numCorrect: 1,
            hasNoneOfTheAbove: false,
            multipleSelect: false,
            countChoices: false,
            deselectEnabled: false,
            type: "radio",
            options: {
                static: false,
                countChoices: false,
                deselectEnabled: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: true,
                numCorrect: 1,
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content: "Content 1",
                        correct: true,
                    },
                    {
                        id: "1-1-1-1-1",
                        content: "Content 2",
                        correct: false,
                    },
                    {
                        id: "2-2-2-2-2",
                        content: "Content 3",
                        correct: false,
                    },
                    {
                        id: "3-3-3-3-3",
                        content: "Content 4",
                        correct: false,
                    },
                ],
            },
            alignment: "default",
        },
        "radio 2": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            numCorrect: 1,
            hasNoneOfTheAbove: false,
            multipleSelect: false,
            countChoices: false,
            deselectEnabled: false,
            type: "radio",
            options: {
                static: false,
                countChoices: false,
                deselectEnabled: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: true,
                numCorrect: 1,
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content: "Content 1",
                        correct: true,
                    },
                    {
                        id: "1-1-1-1-1",
                        content: "Content 2",
                        correct: false,
                    },
                    {
                        id: "2-2-2-2-2",
                        content: "Content 3",
                        correct: false,
                    },
                    {
                        id: "3-3-3-3-3",
                        content: "Content 4",
                        correct: false,
                    },
                ],
            },
            alignment: "default",
        },
    },
} as PerseusRenderer;

export const regularTextContent = `# Sensors and Scanners

I have reset the sensors to scan for frequencies outside the usual range. By emitting harmonic vibrations to shatter the lattices. We will monitor and adjust the frequency of the resonators. He has this ability of **instantly** interpreting and extrapolating any verbal communication he hears. It may be due to the envelope over the structure, causing hydrogen-carbon helix patterns throughout. I'm comparing the molecular integrity of that bubble against our phasers.

## Warp Core Dynamics

Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.

### Alien Life Forms

Cmdr Riker's nervous system has been invaded by an *unknown microorganism*. The organisms fuse to the nerve, intertwining at the molecular level. That's why the transporter's biofilters couldn't extract it. The vertex waves show a K-complex corresponding to an REM state. The engineering section's critical. Destruction is imminent. Their robes contain ultritium, highly explosive, virtually undetectable by your transporter.
`;

export const listsContent = `## Primary Federation ships involved in the tachyon blockade during the Klingon Civil War:

1. USS Enterprise-D
1. USS Excalibur
1. USS Merrimack
1. USS Sutherland
1. USS Charleston
1. USS Hood
1. USS Tian An Men

## Other Federation ships involved in the blockade:

- USS Ahwahnee
- USS Apollo
- USS Aries
- USS Goddard
- USS Thomas Paine
- USS Trieste

## Federation ships and their executive officers:

- USS Enterprise-D

   1. Captain Jean-Luc Picard
   1. Commander William T. Riker
- USS Defiant (DS9)

   1. Captain Benjamin Sisko
   1. Major Kira Nerys
- USS Voyager

   1. Captain Kathryn Janeway
   1. Commander Chakotay`;
