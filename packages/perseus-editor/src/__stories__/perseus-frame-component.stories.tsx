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
                    "Perseus frame component that renders actual Perseus content using Perseus.Renderer. " +
                    "This component implements the iframe communication protocol expected by Perseus EditorPage. " +
                    "\n\n**Communication Pattern:**\n" +
                    "- Frame receives frameId via postMessage from parent\n" +
                    "- Frame retrieves data from parent.iframeDataStore[frameId]\n" +
                    "- Frame renders question or hint content using Perseus renderers\n" +
                    "- Frame reports height changes via postMessage for smooth resizing\n" +
                    "- Height updates occur both on DOM changes (MutationObserver) and periodically (500ms) for animations\n\n" +
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
