import classNames from "classnames";
import * as React from "react";

import styles from "./legend-bar.module.css";

import type {SorterLegendCap} from "../legend-types";

type LegendBarOrientation = "horizontal" | "vertical";

export interface LegendBarProps {
    orientation: LegendBarOrientation;
    startCap?: SorterLegendCap;
    endCap?: SorterLegendCap;
}

export function LegendBar({
    orientation,
    startCap = "none",
    endCap = "none",
}: LegendBarProps): React.ReactElement {
    return (
        <div
            aria-hidden="true"
            className={
                orientation === "vertical" ? styles.vertical : styles.horizontal
            }
            // Tests can't find this by role or text since it's aria-hidden
            // and empty.
            data-testid="legend-bar"
        >
            <Cap type={startCap} side="start" orientation={orientation} />
            <Cap type={endCap} side="end" orientation={orientation} />
        </div>
    );
}

interface CapProps {
    type: SorterLegendCap;
    side: "start" | "end";
    orientation: LegendBarOrientation;
}

function Cap({type, side, orientation}: CapProps): React.ReactElement | null {
    const sideClass = side === "start" ? styles.start : styles.end;
    const testId = `legend-bar-${side}-cap`;

    if (type === "arrow") {
        // Both paths point toward the start; the CSS mirrors them to point
        // outward from whichever end they sit on.
        const isVertical = orientation === "vertical";
        return (
            <svg
                className={classNames(styles.arrow, sideClass)}
                data-testid={testId}
                width={isVertical ? 14 : 8}
                height={isVertical ? 8 : 14}
                viewBox={isVertical ? "0 0 14 8" : "0 0 8 14"}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d={isVertical ? "M1 7 7 1l6 6" : "M7 1 1 7l6 6"} />
            </svg>
        );
    }

    if (type === "bar") {
        return (
            <span
                className={classNames(styles.bar, sideClass)}
                data-testid={testId}
            />
        );
    }

    return null;
}
