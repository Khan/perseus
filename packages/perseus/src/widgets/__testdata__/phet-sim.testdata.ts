import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "Do this fun PhET simulation! A projectile data lab!\n[[\u2603 phet-sim 1]]\n",
    images: {
        "https://ka-perseus-images.s3.amazonaws.com/8e518475587bc83767c72b49ff094e5870c3edc3.png":
            {
                width: 760,
                height: 688,
            },
    },
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
