import * as React from "react";

import {themeModes} from "../../../../../.storybook/modes";
import Graphie from "../graphie";
import Movables from "../graphie-movables";

import type {Meta} from "@storybook/react-vite";

const {MovablePoint, Point} = Movables;

// Must be module-level — Graphie logs an error if the setup reference changes
const noopSetup = () => {};

const meta: Meta<typeof Graphie> = {
    title: "Components/Graphie Movables/Visual Regression Tests/Initial State",
    component: Graphie,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for graphie-movables colors that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

// Covers KhanColors.BLACK fill + stroke on the Point class (lines 258–259)
export const DefaultPoint = {
    render: () => (
        <Graphie
            box={[200, 200]}
            range={[
                [-5, 5],
                [-5, 5],
            ]}
            setup={noopSetup}
        >
            <Point coord={[0, 0]} />
        </Graphie>
    ),
};

// Covers KhanColors.INTERACTIVE stroke + fill on desktop MovablePoint (lines 25–26)
export const MovablePointDesktop = {
    render: () => (
        <Graphie
            box={[200, 200]}
            range={[
                [-5, 5],
                [-5, 5],
            ]}
            setup={noopSetup}
        >
            <MovablePoint coord={[0, 0]} />
        </Graphie>
    ),
};

// Covers #ffffff stroke + KhanColors.INTERACTIVE fill on mobile MovablePoint (lines 20, 22)
export const MovablePointMobile = {
    render: () => (
        <Graphie
            box={[200, 200]}
            range={[
                [-5, 5],
                [-5, 5],
            ]}
            setup={noopSetup}
            isMobile
        >
            <MovablePoint coord={[0, 0]} isMobile />
        </Graphie>
    ),
};
