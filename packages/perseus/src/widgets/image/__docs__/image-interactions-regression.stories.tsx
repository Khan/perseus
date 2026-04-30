import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {imageRendererDecorator} from "../../__testutils__/image-renderer-decorator";
import {
    earthMoonImage,
    extremelyLongDescription,
    frescoImage,
    graphieImage,
    portraitImage,
    svgImage,
} from "../utils";

import type {Meta, StoryObj} from "@storybook/react-vite";

const ImageWidget = getWidget("image")!;

type Story = StoryObj<typeof ImageWidget>;

const earthMoonImageCaption =
    "The Moon above Earth's horizon, captured by the International Space Station, [NASA](https://images.nasa.gov/details/iss071e515452)";

const meta: Meta = {
    title: "Widgets/Image/Visual Regression Tests/Interactions",
    component: ImageWidget,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Image widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

export const LongDescriptionClickedState: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        longDescription:
            "This is a *very* long description of the earth and moon.",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
    },
    play: async ({canvas, userEvent}) => {
        const imageTrigger = canvas.getByRole("button", {
            name: "Explore image and description",
        });
        await userEvent.click(imageTrigger);
    },
};

export const LongDescriptionClickedStateWithGraphieImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: graphieImage,
        alt: "Graphie image",
        longDescription:
            "This is a *very* long description of the graphie image.",
        title: "Graphie image",
    },
    play: async ({canvas, userEvent}) => {
        const imageTrigger = canvas.getByRole("button", {
            name: "Explore image and description",
        });
        await userEvent.click(imageTrigger);
    },
};

export const LongDescriptionClickedStateWithNoSize: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: {url: earthMoonImage.url},
        alt: "Earth and Moon",
        longDescription:
            "This is a *very* long description of the earth and moon.",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
    },
    play: async ({canvas, userEvent}) => {
        const imageTrigger = canvas.getByRole("button", {
            name: "Explore image and description",
        });
        await userEvent.click(imageTrigger);
    },
};

export const LongDescriptionClickedStateWithNoSizeLargeImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: {url: frescoImage.url},
        alt: "Fresco painting",
        longDescription:
            "This is a *very* long description of the fresco painting.",
        title: "*The Offer of the Casa Madre to Victory*, 1932",
        caption:
            "Carlo Delcroix presenting the Casa Madre (highlighted) to Victory. Antonio Giuseppe Santagata, *The Offer of the Casa Madre to Victory*, 1932, fresco (apse, assembly hall, Home for Wounded War Veterans, Rome, photo ©ANMIG)",
    },
    play: async ({canvas, userEvent}) => {
        const imageTrigger = canvas.getByRole("button", {
            name: "Explore image and description",
        });
        await userEvent.click(imageTrigger);
    },
};

export const LongDescriptionClickedStateWithNoSizeLargeSvgImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: {url: svgImage.url},
        alt: "SVG image",
        longDescription: extremelyLongDescription,
    },
    play: async ({canvas, userEvent}) => {
        const imageTrigger = canvas.getByRole("button", {
            name: "Explore image and description",
        });
        await userEvent.click(imageTrigger);
    },
};

export const ZoomClickedState: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
    },
    play: async ({canvas, userEvent}) => {
        const zoomTrigger = canvas.getByRole("button", {
            name: "Make image bigger.",
        });
        await userEvent.click(zoomTrigger);
    },
};

export const ZoomClickedWithGraphieImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: graphieImage,
        alt: "Graphie image",
    },
    play: async ({canvas, userEvent}) => {
        const zoomTrigger = canvas.getByRole("button", {
            name: "Make image bigger.",
        });
        await userEvent.click(zoomTrigger);
    },
};

export const ZoomClickedLargeImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: frescoImage,
        alt: "Fresco painting",
    },
    play: async ({canvas, userEvent}) => {
        const zoomTrigger = canvas.getByRole("button", {
            name: "Make image bigger.",
        });
        await userEvent.click(zoomTrigger);
    },
};

export const ZoomClickedLargePortraitImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: portraitImage,
        alt: "Portrait image",
    },
    play: async ({canvas, userEvent}) => {
        const zoomTrigger = canvas.getByRole("button", {
            name: "Make image bigger.",
        });
        await userEvent.click(zoomTrigger);
    },
};
