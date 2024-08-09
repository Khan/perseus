import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "Do this fun PhET simulation! A projectile data lab!\n[[\u2603 phet-sim 1]]\n",
    widgets: {
        "phet-sim 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "phet-sim",
            options: {
                url: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
                height: "410",
                width: "410",
                description: "Projectile Data Lab",
                static: false,
            },
            alignment: "default",
        },
    },
};
