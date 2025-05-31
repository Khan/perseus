import PerseusFrameComponent from "./perseus-frame-component";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof PerseusFrameComponent> = {
    title: "PerseusEditor/Perseus Frame",
    component: PerseusFrameComponent,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Perseus frame component that renders actual Perseus content using ServerItemRenderer and HintRenderer. " +
                    "This component implements the iframe communication protocol expected by Perseus EditorPage. " +
                    "\n\n**Communication Pattern:**\n" +
                    "- Frame extracts frameId from its data-id attribute and sends it to parent to signal readiness\n" +
                    "- Parent responds with data via postMessage, frame uses response as key for parent.iframeDataStore\n" +
                    "- Frame renders question or hint content using Perseus renderers\n" +
                    "- Frame reports height changes for smooth resizing via MutationObserver and periodic updates\n" +
                    "**Global Setup:**\n" +
                    "- Creates window.KhanUtil and window.Exercises objects to match webapp environment\n" +
                    "- Sets up iframe-specific styles to prevent scrollbar issues\n" +
                    "- Matches the exact behavior of EditorPage preview frames in the Khan Academy webapp",
            },
        },
        // Remove Storybook chrome for iframe use
        options: {
            showPanel: false,
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Frame: Story = {
    name: "Perseus Frame",
    parameters: {
        docs: {
            description: {
                story:
                    "Iframe endpoint used by EditorPage components. " +
                    "Use the EditorPage stories to test the complete editor-preview workflow.",
            },
        },
    },
};
