import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "Do this fun PhET simulation! A projectile data lab!\n[[\u2603 phet-sim 1]]\n",
    images: {},
    widgets: {
        "phet-sim 1": {
            graded: false,
            version: {major: 0, minor: 0},
            static: false,
            type: "phet-sim",
            options: {
                url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
                description: "Projectile Data Lab",
                static: false,
            },
            alignment: "default",
        },
    },
};
