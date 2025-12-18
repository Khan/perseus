import {
    generateExplanationOptions,
    generateExplanationWidget,
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const question1: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Here's the explanation\n[[\u2603 explanation 1]]\nDid you get that?",
    widgets: {
        "explanation 1": generateExplanationWidget({
            static: false,
            options: generateExplanationOptions({
                hidePrompt: "Hide explanation!",
                explanation: "This is an explanation",
                showPrompt: "Explanation",
            }),
        }),
    },
});

// Example question with `static=true`
export const question2: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "Here's the explanation\n[[\u2603 explanation 1]]\nDid you get that?",
    widgets: {
        "explanation 1": generateExplanationWidget({
            static: true,
            options: generateExplanationOptions({
                hidePrompt: "Hide explanation!",
                explanation: "This is an explanation",
                showPrompt: "Explanation",
            }),
        }),
    },
});

export const ipsumExample: PerseusRenderer = generateTestPerseusRenderer({
    content: `Unidentified vessel travelling at sub warp speed, bearing 235.7.
                Fluctuations in energy readings from it, Captain.
                All transporters off.
                A strange set-up, but I'd say the graviton generator is depolarized.
                The dark colourings of the scrapes are the leavings of natural rubber,
                    a type of non-conductive sole used by researchers experimenting with electricity.
                The molecules must have been partly de-phased by the anyon beam.
                \n[[\u2603 explanation 1]]\n\nSensors indicate no shuttle or other ships in this sector.
                According to coordinates, we have travelled 7,000 light years and are located near [the system J-25](#).
                Tractor beam released, sir. Force field maintaining our hull integrity.
                Damage report? Sections 27, 28 and 29 on decks four, five and six destroyed.
            `,
    widgets: {
        "explanation 1": generateExplanationWidget({
            options: generateExplanationOptions({
                hidePrompt: "Hide",
                explanation: `It indicates a [synchronic distortion](#) in the areas emanating triolic waves.
                    The cerebellum, the cerebral cortex, the brain stem,
                        the entire nervous system has been depleted of electrochemical energy.
                    Any device like that would produce high levels of triolic waves.
                    These walls have undergone some kind of [selective molecular polarization](#).
                    I haven't determined if our phaser energy can generate a stable field.
                    We could alter the photons with phase discriminators.
                `,
                showPrompt: "Explanation",
            }),
        }),
    },
});

export const wideButton: PerseusRenderer = generateTestPerseusRenderer({
    content: `Unidentified vessel travelling at sub warp speed, bearing 235.7.
                Fluctuations in energy readings from it, Captain.
                All transporters off.
                A strange set-up, but I'd say the graviton generator is depolarized.
                The dark colourings of the scrapes are the leavings of natural rubber,
                    a type of non-conductive sole used by researchers experimenting with electricity.
                The molecules must have been partly de-phased by the anyon beam.
                \n[[\u2603 explanation 1]]\n\nSensors indicate no shuttle or other ships in this sector.
                According to coordinates, we have travelled 7,000 light years and are located near [the system J-25](#).
                Tractor beam released, sir. Force field maintaining our hull integrity.
                Damage report? Sections 27, 28 and 29 on decks four, five and six destroyed.
            `,
    widgets: {
        "explanation 1": generateExplanationWidget({
            options: generateExplanationOptions({
                hidePrompt: "Hide details",
                explanation: `It indicates a [synchronic distortion](#) in the areas emanating triolic waves.
                    The cerebellum, the cerebral cortex, the brain stem,
                        the entire nervous system has been depleted of electrochemical energy.
                    Any device like that would produce high levels of triolic waves.
                    These walls have undergone some kind of [selective molecular polarization](#).
                    I haven't determined if our phaser energy can generate a stable field.
                    We could alter the photons with phase discriminators.
                `,
                showPrompt:
                    "These appear to be some kind of power-wave-guide conduits which allow them to work collectively as they perform ship functions.",
            }),
        }),
    },
});
