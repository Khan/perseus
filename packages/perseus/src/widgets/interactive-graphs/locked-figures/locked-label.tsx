import {
    lockedFigureColors,
    type LockedLabelType,
} from "@khanacademy/perseus-core";
import {font} from "@khanacademy/wonder-blocks-tokens";
import classNames from "classnames";
import * as React from "react";

import {getDependencies} from "../../../dependencies";
import {pointToPixel} from "../graphs/use-transform";
import LabelStrokeFilter from "../label-stroke-filter";
import useGraphConfig from "../reducer/use-graph-config";
import {replaceOutsideTeX} from "../utils";

import styles from "./locked-label.module.css";

import type {
    LabelAnchorX,
    LabelAnchorY,
    LabelSize,
} from "./label-placement-utils";

// The new font tokens split sizing into separate `body` and `heading` scales.
// The body scale only goes up to `medium`, so `large` labels map to the
// equivalent `heading` token.
const labelFontSize: Record<LockedLabelType["size"], string> = {
    small: font.body.size.small,
    medium: font.body.size.medium,
    large: font.heading.size.medium,
};

/**
 * How long a wait for `document.fonts.ready` has to exceed before the label
 * fades in rather than appearing instantly. A warm load resolves in a few
 * milliseconds; anything longer means fonts were actually fetched, and the
 * label would otherwise pop in well after the rest of the graph.
 */
const fadeThresholdMs = 75;

/**
 * Longest the label stays hidden waiting to be measured. If the measurement
 * never arrives — a TeX implementation that doesn't settle, say — the label is
 * revealed at its estimated position rather than staying invisible.
 */
const measureTimeoutMs = 1000;

type Props = LockedLabelType & {
    /**
     * Which corner of the label `coord` refers to, when the coordinate was
     * chosen automatically by `getAutoLabelCoordinates`. Absent for
     * author-placed labels, whose coordinates mean the top-left corner.
     */
    anchorX?: LabelAnchorX;
    anchorY?: LabelAnchorY;
    /**
     * Called with the label's rendered size once its text has been typeset and
     * its fonts have loaded, so placement can be recomputed against the real
     * dimensions rather than an assumed size.
     */
    onMeasure?: (size: LabelSize) => void;
};

export default function LockedLabel(props: Props) {
    const {coord, text, color, size, anchorX, anchorY, onMeasure} = props;

    // Both anchors arrive together, from an auto-placed coordinate.
    const autoPlaced = !!anchorX && !!anchorY;

    const [x, y] = pointToPixel(coord, useGraphConfig());

    const {TeX} = getDependencies();

    const labelRef = React.useRef<HTMLSpanElement>(null);
    // Auto-placed labels start hidden: their position is computed from an
    // assumed size, so revealing them before measuring would show the label
    // jumping once the real size arrives.
    const [measured, setMeasured] = React.useState(!autoPlaced);
    const [shouldFade, setShouldFade] = React.useState(false);

    React.useEffect(() => {
        let cancelled = false;

        const reveal = () => {
            if (!cancelled) {
                setMeasured(true);
            }
        };

        // However the wait turns out, don't leave the label hidden forever.
        const timeout = setTimeout(reveal, measureTimeoutMs);

        const startedAt = performance.now();

        // `fonts.ready` only waits for fonts the browser has already been
        // asked for. Reading layout first makes it request the math fonts, so
        // the wait covers them — and measuring before they load would give
        // fallback-font dimensions.
        labelRef.current?.getBoundingClientRect();

        document.fonts.ready.then(() => {
            if (cancelled || !labelRef.current) {
                return;
            }

            const rect = labelRef.current.getBoundingClientRect();
            onMeasure?.({width: rect.width, height: rect.height});

            setShouldFade(performance.now() - startedAt > fadeThresholdMs);
            reveal();
        }, reveal);

        return () => {
            cancelled = true;
            clearTimeout(timeout);
        };
    }, [text, size, onMeasure]);

    // Note: The TeX component cannot be rendered within an SVG
    return (
        <>
            <LabelStrokeFilter />
            <span
                ref={labelRef}
                className={classNames("locked-label", {
                    [styles.autoPlacedLabel]: autoPlaced,
                    [styles.anchorLeft]: anchorX === "left",
                    [styles.anchorAbove]: anchorY === "above",
                    [styles.measuring]: !measured,
                    [styles.fadeIn]: shouldFade,
                })}
                style={{
                    position: "absolute",
                    // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: authored LTR coordinate (math/graph/image); content doesn't flip with page direction, so converting to logical insets would misplace/misalign it in RTL
                    left: x,
                    // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: authored LTR coordinate (math/graph/image); content doesn't flip with page direction, so converting to logical insets would misplace/misalign it in RTL
                    top: y,
                    color: lockedFigureColors[color],
                    fontSize: labelFontSize[size],
                    filter: "url(#math-stroke)",
                }}
                aria-hidden={true}
            >
                <TeX>{replaceOutsideTeX(text)}</TeX>
            </span>
        </>
    );
}
