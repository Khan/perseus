import {generateTestPerseusRenderer} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../.storybook/modes";
import QuestionRendererForStories from "../widgets/__testutils__/question-renderer-for-stories";

import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj;

const meta: Meta = {
    title: "Renderers/Visual Regression Tests",
    tags: ["!manifest"],
    parameters: {
        docs: {
            description: {
                component: "Examples of graphics in dark mode.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

const RenderContent = (content: string): (() => React.JSX.Element) => {
    return function Render(){
        return (
            <QuestionRendererForStories
                question={generateTestPerseusRenderer({
                    content: content,
                })}
            />
        );
    };
};

export const RegularText: Story = {
    render: RenderContent(
        `# Sensors and Scanners

I have reset the sensors to scan for frequencies outside the usual range. By emitting harmonic vibrations to shatter the lattices. We will monitor and adjust the frequency of the resonators. He has this ability of **instantly** interpreting and extrapolating any verbal communication he hears. It may be due to the envelope over the structure, causing hydrogen-carbon helix patterns throughout. I'm comparing the molecular integrity of that bubble against our phasers.

## Warp Core Dynamics

Exceeding reaction chamber thermal limit. We have begun power-supply calibration. Force fields have been established on all turbo lifts and crawlways. Computer, run a level-two diagnostic on warp-drive systems. Antimatter containment positive. Warp drive within normal parameters. I read an ion trail characteristic of a freighter escape pod. The bomb had a molecular-decay detonator. Detecting some unusual fluctuations in subspace frequencies.

### Alien Life Forms

Cmdr Riker's nervous system has been invaded by an *unknown microorganism*. The organisms fuse to the nerve, intertwining at the molecular level. That's why the transporter's biofilters couldn't extract it. The vertex waves show a K-complex corresponding to an REM state. The engineering section's critical. Destruction is imminent. Their robes contain ultritium, highly explosive, virtually undetectable by your transporter.
`,
    ),
};

export const Lists: Story = {
    render: RenderContent(
        `## Primary Federation ships involved in the tachyon blockade during the Klingon Civil War:

1. USS Enterprise-D
1. USS Excalibur
1. USS Merrimack
1. USS Sutherland
1. USS Charleston
1. USS Hood
1. USS Tian An Men

## Other Federation ships involved in the blockade:

- USS Ahwahnee
- USS Apollo
- USS Aries
- USS Goddard
- USS Thomas Paine
- USS Trieste

## Federation ships and their executive officers:

- USS Enterprise-D

   1. Captain Jean-Luc Picard
   1. Commander William T. Riker
- USS Defiant (DS9)

   1. Captain Benjamin Sisko
   1. Major Kira Nerys
- USS Voyager

   1. Captain Kathryn Janeway
   1. Commander Chakotay`,
    ),
};
