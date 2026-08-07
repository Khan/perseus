import {
    generatePhetSimulationOptions,
    generatePhetSimulationWidget,
} from "@khanacademy/perseus-core";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

export const question1: PerseusRenderer = {
    content:
        "Do this fun PhET simulation! A projectile data lab!\n[[\u2603 phet-simulation 1]]\n",
    images: {},
    widgets: {
        "phet-simulation 1": generatePhetSimulationWidget({
            options: generatePhetSimulationOptions({
                url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
                description: "Projectile Data Lab",
            }),
        }),
    },
};

export const nonPhetUrl: PerseusRenderer = {
    content: "This should display an error!\n[[\u2603 phet-simulation 2]]\n",
    images: {},
    widgets: {
        "phet-simulation 2": generatePhetSimulationWidget({
            options: generatePhetSimulationOptions({
                url: "https://google.com/",
                description: "Google",
            }),
        }),
    },
};
