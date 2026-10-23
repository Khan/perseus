import * as React from "react";

import styles from "./legend-label.module.css";

export interface LegendLabelProps {
    /** Plain text for the label. */
    content: string;
}

/**
 * One visible label at the start or end of the Sorter legend.
 */
export function LegendLabel({content}: LegendLabelProps): React.ReactElement {
    return (
        // The list of blanks carries the same information in its
        // aria-label, so reading this too would repeat it.
        <div aria-hidden="true" className={styles.label}>
            {content}
        </div>
    );
}
