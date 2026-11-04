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
    LabelPlacement,
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

type Props = LockedLabelType & {
    /**
     * Where to draw the label, when its position was chosen automatically by
     * `getAutoLabelPlacements`. Absent for author-placed labels, which are
     * drawn at their own `coord`.
     */
    placement?: LabelPlacement;
    /** Whether to hold the label back until the whole batch is measured. */
    hidden?: boolean;
    /** Whether to ease the label in rather than showing it instantly. */
    fading?: boolean;
    /**
     * Called with the label's rendered size once its text has been typeset and
     * its fonts have loaded, so placement can be recomputed against the real
     * dimensions rather than an assumed size.
     */
    onMeasure?: (size: LabelSize) => void;
};

export default function LockedLabel(props: Props) {
    const {coord, text, color, size, placement, hidden, fading, onMeasure} =
        props;

    const authoredPx = pointToPixel(coord, useGraphConfig());
    // An auto-placed label is positioned by the layer, which works in pixels
    // and already knows the label's size. Author-placed ones are drawn at
    // their own coordinate, which means their top-left corner.
    const [x, y] = placement ? placement.cornerPx : authoredPx;

    const {TeX} = getDependencies();

    const labelRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        if (!onMeasure) {
            return;
        }
        let cancelled = false;

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
            onMeasure({width: rect.width, height: rect.height});
        });

        return () => {
            cancelled = true;
        };
    }, [text, size, onMeasure]);

    // Note: The TeX component cannot be rendered within an SVG
    return (
        <>
            <LabelStrokeFilter />
            <span
                ref={labelRef}
                className={classNames("locked-label", {
                    [styles.measuring]: hidden,
                    [styles.fadeIn]: fading,
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
