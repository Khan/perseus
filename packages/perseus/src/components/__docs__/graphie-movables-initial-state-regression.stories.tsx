import * as React from "react";

import {themeModes} from "../../../../../.storybook/modes";
import Graphie from "../graphie";
import Movables from "../graphie-movables";

import type {Meta, StoryObj} from "@storybook/react-vite";

const {MovablePoint, Point} = Movables;

// Must be module-level — Graphie logs an error if the setup reference changes between renders
const noopSetup = () => {};

const meta: Meta = {
    title: "Components/Graphie Movables/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for graphie-movables colors that do NOT " +
                    "need any interactions to test.",
            },
        },
        // delay: Raphael creates its SVG paper in a detached div before DOM
        // insertion, causing a timing race that can clip the initial ellipse.
        // 300ms lets Raphael settle before Chromatic captures the snapshot.
        chromatic: {disableSnapshot: false, modes: themeModes, delay: 300},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPoint: Story = {
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

export const MovablePointDesktop: Story = {
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

export const MovablePointMobile: Story = {
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
