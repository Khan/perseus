import * as React from "react";

import {getDependencies} from "../../../../dependencies";
import {mathOnlyParser} from "../../../../util/math-only-parser";

import styles from "./legend-label.module.css";

export interface LegendLabelProps {
    /** Label Content */
    content: string;
}

/**
 * One visible label at the start or end of the Sorter legend.
 */
export function LegendLabel({content}: LegendLabelProps): React.ReactElement {
    const {TeX} = getDependencies();

    return (
        // aria-hidden because the list of blanks' aria-label already
        // describes the legend, so reading this too would repeat it.
        <div aria-hidden="true" className={styles.label}>
            {/* Only the math goes through TeX, so the words keep the original
                label font. */}
            {mathOnlyParser(content).map((segment, index) => {
                if (segment.type === "math") {
                    return <TeX key={index}>{segment.content}</TeX>;
                }
                // unescaped characters are shown as is
                if (segment.type === "specialCharacter") {
                    return segment.content.length > 1
                        ? segment.content.slice(1)
                        : segment.content;
                }
                return segment.content;
            })}
        </div>
    );
}
