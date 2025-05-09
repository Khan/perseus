import {
    generateTestPerseusItem,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {PhetSimulation} from "./phet-simulation";

import type {Meta} from "@storybook/react";

const meta: Meta<typeof PhetSimulation> = {
    component: PhetSimulation,
    title: "Perseus/Widgets/PhET Simulation",
};

export default meta;

// Create a simple renderer with a PhET simulation widget
const createPhETSimulation = (
    url: string,
    description: string,
): PerseusRenderer => {
    return {
        content: "[[☃ phet-simulation 1]]",
        images: {},
        widgets: {
            "phet-simulation 1": {
                type: "phet-simulation",
                graded: true,
                static: false,
                options: {
                    url,
                    description,
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    };
};

export const Primary = (args: any): React.ReactElement => {
    const question = createPhETSimulation(
        "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
        "Projectile Data Lab",
    );

    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
            title="PhET Simulation"
        />
    );
};
