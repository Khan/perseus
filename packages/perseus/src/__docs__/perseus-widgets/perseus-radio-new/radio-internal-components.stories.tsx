import * as React from "react";

import type {Meta} from "@storybook/react-vite";

export default {
    title: "Perseus/Widgets/RadioNew/Widget Internal Components",
    tags: ["!autodocs"],
    parameters: {
        viewMode: "docs",
        previewTabs: {
            canvas: {hidden: true},
        },
    },
} as Meta;

export const InternalComponents = () => (
    <div>
        <h1>RadioNew Widget Internal Components</h1>
        <p>
            This page documents the internal component structure of the RadioNew
            widget, providing insight into how it's built and how the components
            work together.
        </p>

        <h2>Component Hierarchy</h2>
        <pre>{`
RadioWidget
├── ChoiceContainer
│   ├── Choice (multiple instances)
│   │   ├── ChoiceButton
│   │   │   ├── RadioButton (for single select)
│   │   │   └── Checkbox (for multi-select)
│   │   ├── ChoiceContent
│   │   │   ├── TextContent
│   │   │   └── ImageContent (optional)
│   │   └── RationaleContent (shown when reviewing answers)
│   └── FeedbackContainer (shown after submission)
└── StatusContainer (for answer correctness feedback)
        `}</pre>

        <h2>Key Components</h2>

        <h3>RadioWidget</h3>
        <p>
            The main container component that manages the widget state and
            coordinates interactions between child components. It handles:
        </p>
        <ul>
            <li>Managing the selected state</li>
            <li>Coordinating answer submission</li>
            <li>Handling user interactions</li>
            <li>Displaying feedback when appropriate</li>
        </ul>

        <h3>ChoiceContainer</h3>
        <p>
            Wraps all the choice options and manages their layout and spacing.
            For multi-choice questions, it ensures proper vertical alignment and
            spacing.
        </p>

        <h3>Choice</h3>
        <p>
            Individual choice option component that combines the selection
            mechanism (radio/checkbox) with the content. It handles:
        </p>
        <ul>
            <li>Click and keyboard interactions</li>
            <li>Focus management</li>
            <li>Selected state styling</li>
        </ul>

        <h3>ChoiceButton</h3>
        <p>
            The interactive control element (either radio button or checkbox)
            that users click to make their selection. It's responsible for:
        </p>
        <ul>
            <li>
                Showing the correct input type based on multipleSelect setting
            </li>
            <li>Handling accessibility attributes (role, aria-checked)</li>
            <li>Managing visual states (default, hover, focus, selected)</li>
        </ul>

        <h3>ChoiceContent</h3>
        <p>
            Responsible for rendering the content of each choice, which may
            include text, math expressions, and images. It handles:
        </p>
        <ul>
            <li>Formatting text content</li>
            <li>Rendering math expressions via KaTeX</li>
            <li>Displaying and sizing images</li>
        </ul>

        <h3>RationaleContent</h3>
        <p>
            Displays the rationale for why an answer is correct or incorrect.
            Shown in review mode after submission.
        </p>

        <h3>StatusContainer</h3>
        <p>
            Shows feedback about the correctness of the user's selection after
            they submit their answer.
        </p>
    </div>
);
