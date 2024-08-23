import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "Do this fun PhET simulation! A projectile data lab!\n[[\u2603 phet-simulation 1]]\n",
    images: {},
    widgets: {
        "phet-simulation 1": {
            graded: false,
            version: {major: 0, minor: 0},
            static: false,
            type: "phet-simulation",
            options: {
                url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
                description: "Projectile Data Lab",
            },
            alignment: "default",
        },
    },
};

export const nonPhetUrl: PerseusRenderer = {
    content: "This should display an error!\n[[\u2603 phet-simulation 2]]\n",
    images: {},
    widgets: {
        "phet-simulation 2": {
            graded: false,
            version: {major: 0, minor: 0},
            static: false,
            type: "phet-simulation",
            options: {
                url: "https://google.com/",
                description: "Google",
            },
            alignment: "default",
        },
    },
};
