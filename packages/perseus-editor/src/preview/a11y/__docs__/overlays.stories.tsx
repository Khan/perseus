import * as React from "react";

import {A11yOverlays} from "../overlays";

import type {Meta} from "@storybook/react-vite";

export default {
    title: "Editors/Preview/A11yOverlays",
    component: A11yOverlays,
} satisfies Meta;

const BOX_COLORS = [
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#9bf6ff",
    "#a0c4ff",
    "#bdb2ff",
    "#ffc6ff",
];

/**
 * Renders a tall, scrollable column of colored boxes and overlays every
 * other one — a harness for verifying overlay positioning against real
 * elements. The boxes use inline styles (not Wonder Blocks) so their size
 * is applied synchronously and the overlays measure against settled layout.
 */
export function EveryOtherBox() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const boxRefs = React.useRef<Array<HTMLDivElement | null>>([]);
    const [targets, setTargets] = React.useState<ReadonlyArray<Element>>([]);

    React.useEffect(() => {
        const everyOther = boxRefs.current.filter(
            (element, index): element is HTMLDivElement =>
                element != null && index % 2 === 0,
        );
        setTargets(everyOther);
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                padding: 24,
                position: "relative",
            }}
        >
            {BOX_COLORS.map((color, index) => {
                const hasOverlay = index % 2 === 0;
                return (
                    <div
                        key={index}
                        ref={(element) => {
                            boxRefs.current[index] = element;
                        }}
                        style={{
                            alignItems: "center",
                            backgroundColor: color,
                            borderRadius: 8,
                            display: "flex",
                            height: 200,
                            justifyContent: "center",
                        }}
                    >
                        {`Box ${index + 1}${
                            hasOverlay ? " — has a11y overlay" : ""
                        }`}
                    </div>
                );
            })}
            <A11yOverlays container={containerRef.current} targets={targets} />
        </div>
    );
}
