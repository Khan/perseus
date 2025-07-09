import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Interactive Graph/Widget Internal Components",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {disableSnapshot: false},
        viewMode: "docs",
    },
    argTypes: {
        graphType: {
            options: [
                "point",
                "linear",
                "quadratic",
                "sinusoid",
                "circle",
                "polygon",
                "segment",
                "ray",
                "angle",
                "linear-system",
            ],
            control: {type: "select"},
            defaultValue: "point",
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * This document shows the internal components of the Interactive Graph widget
 */
export const InternalComponents = () => (
    <div>
        <h1>Interactive Graph Widget Internal Components</h1>
        <p>
            This page documents the internal component structure of the
            Interactive Graph widget, providing insight into how it's built and
            how the components work together.
        </p>

        <h2>Component Hierarchy</h2>
        <pre>{`
InteractiveGraph
├── StatefulMafsGraph (Main graphing component)
│   ├── MafsGraph (Core graph rendering)
│   │   ├── Mafs (Math visualization container)
│   │   │   ├── CartesianCoordinates (Coordinate system)
│   │   │   ├── BackgroundImage (Optional)
│   │   │   ├── Grid / Lines (Based on markings setting)
│   │   │   ├── Interactive Elements (Based on graph type)
│   │   │   │   ├── PointGraph
│   │   │   │   ├── LinearGraph
│   │   │   │   ├── QuadraticGraph
│   │   │   │   ├── SinusoidGraph
│   │   │   │   ├── CircleGraph
│   │   │   │   ├── PolygonGraph
│   │   │   │   ├── SegmentGraph
│   │   │   │   ├── RayGraph
│   │   │   │   ├── AngleGraph
│   │   │   │   └── LinearSystemGraph
│   │   │   └── LockedFigures (Non-interactive elements)
│   │   └── GraphControls (Tools like protractor)
│   └── GraphTypeSelector (When editable)
└── FeedbackContainer (For answer correctness)
        `}</pre>

        <h2>Key Components</h2>

        <h3>InteractiveGraph</h3>
        <p>
            The main container component that manages the widget state and
            coordinates interactions between child components. It handles:
        </p>
        <ul>
            <li>Processing user interactions and inputs</li>
            <li>Coordinating answer submissions</li>
            <li>Tracking and validating user responses</li>
            <li>Providing feedback based on answer correctness</li>
        </ul>

        <h3>StatefulMafsGraph</h3>
        <p>
            Manages the state for the graphing interface, providing a layer of
            abstraction between the widget and the rendering engine. It handles:
        </p>
        <ul>
            <li>State management for different graph types</li>
            <li>
                Converting between internal state and Perseus representation
            </li>
            <li>Coordinating user interactions with the graph</li>
        </ul>

        <h3>MafsGraph</h3>
        <p>
            The core rendering component that displays mathematical
            visualizations using Mafs library. It's responsible for:
        </p>
        <ul>
            <li>Rendering the coordinate system with appropriate ranges</li>
            <li>Displaying grids, markings, and background elements</li>
            <li>Managing interactive elements based on graph type</li>
            <li>Rendering locked (non-interactive) figures</li>
        </ul>

        <h3>Graph Type Components</h3>
        <p>
            Specialized components for different mathematical representations:
        </p>
        <ul>
            <li>
                <strong>PointGraph:</strong> For plotting points in a coordinate
                system
            </li>
            <li>
                <strong>LinearGraph:</strong> For plotting linear equations
            </li>
            <li>
                <strong>QuadraticGraph:</strong> For quadratic functions
            </li>
            <li>
                <strong>SinusoidGraph:</strong> For sine/cosine functions
            </li>
            <li>
                <strong>CircleGraph:</strong> For circular equations
            </li>
            <li>
                <strong>PolygonGraph:</strong> For plotting polygons with
                vertices
            </li>
            <li>
                <strong>SegmentGraph:</strong> For line segments between points
            </li>
            <li>
                <strong>RayGraph:</strong> For rays starting at a point
            </li>
            <li>
                <strong>AngleGraph:</strong> For displaying and measuring angles
            </li>
            <li>
                <strong>LinearSystemGraph:</strong> For systems of linear
                equations
            </li>
        </ul>

        <h3>GraphControls</h3>
        <p>
            Additional tools and controls that enhance the graphing experience:
        </p>
        <ul>
            <li>
                <strong>Protractor:</strong> For measuring angles
            </li>
            <li>
                <strong>Ruler:</strong> For measuring distances
            </li>
            <li>
                <strong>Tooltips:</strong> For displaying coordinates and
                information
            </li>
        </ul>

        <h3>GraphTypeSelector</h3>
        <p>
            Component for selecting different graph types when the graph is
            editable. It provides:
        </p>
        <ul>
            <li>UI for switching between different graph representations</li>
            <li>Context-specific options based on the selected graph type</li>
        </ul>
    </div>
);
