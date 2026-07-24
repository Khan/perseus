import * as React from "react";

import {themeModes} from "../../../../../.storybook/modes";
import Graphie from "../graphie";
import Movables from "../graphie-movables";

import type {Meta, StoryObj} from "@storybook/react-vite";

const {MovableLine, MovablePoint, Point} = Movables;

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

// A static point should render in the muted gray (disabled) color rather than
// the interactive color — compare against MovablePointDesktop above.
export const MovablePointStatic: Story = {
    render: () => (
        <Graphie
            box={[200, 200]}
            range={[
                [-5, 5],
                [-5, 5],
            ]}
            setup={noopSetup}
        >
            <MovablePoint coord={[0, 0]} static />
        </Graphie>
    ),
};

// The child MovablePoints define the line's endpoints; draw={null} keeps them
// invisible so the story shows just the line.
export const MovableLineDesktop: Story = {
    render: () => (
        <Graphie
            box={[200, 200]}
            range={[
                [-5, 5],
                [-5, 5],
            ]}
            setup={noopSetup}
        >
            <MovableLine>
                <MovablePoint coord={[-3, -3]} draw={null} />
                <MovablePoint coord={[3, 3]} draw={null} />
            </MovableLine>
        </Graphie>
    ),
};

// A static line should render in the muted gray (disabled) color rather than
// the interactive color — compare against MovableLineDesktop.
export const MovableLineStatic: Story = {
    render: () => (
        <Graphie
            box={[200, 200]}
            range={[
                [-5, 5],
                [-5, 5],
            ]}
            setup={noopSetup}
        >
            <MovableLine static>
                <MovablePoint coord={[-3, -3]} draw={null} static />
                <MovablePoint coord={[3, 3]} draw={null} static />
            </MovableLine>
        </Graphie>
    ),
};
