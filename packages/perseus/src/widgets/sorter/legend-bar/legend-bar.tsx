import * as React from "react";

import styles from "./legend-bar.module.css";

export type LegendBarOrientation = "horizontal" | "vertical";

export interface LegendBarProps {
    orientation: LegendBarOrientation;
}

export function LegendBar({orientation}: LegendBarProps): React.ReactElement {
    return (
        <div
            aria-hidden="true"
            className={
                orientation === "vertical" ? styles.vertical : styles.horizontal
            }
            // Tests can't find this by role or text since it's aria-hidden
            // and empty.
            data-testid="legend-bar"
        />
    );
}
