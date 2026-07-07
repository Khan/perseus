// HTML overlay that renders a visible label next to every labeled
// movable point. Labels render as plain text in the Symbola font so the
// same string can drive both the visible label and the screen-reader
// announcement. Spans are marked `aria-hidden` — announcement comes
// from the focusable handle's own aria-label (WCAG 2.5.3, "Label in
// Name").

import {font, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import LabelStrokeFilter from "../../../label-stroke-filter";
import useGraphConfig from "../../../reducer/use-graph-config";
import {
    getLabelAttach,
    getMovablePointLabels,
    type LabelAttach,
    type MovablePointLabel,
} from "../../../utils/movable-point-labels";
import {pointToPixel} from "../../use-transform";

import type {InteractiveGraphState} from "../../../types";

interface Props {
    state: InteractiveGraphState;
}

export default function MovablePointLabelsLayer({state}: Props) {
    const labeledPoints = getMovablePointLabels(state);

    if (labeledPoints.length === 0) {
        return null;
    }

    return (
        <>
            {/* The same `<filter id="math-stroke">` may already be in
                the DOM via a `LockedLabel`. Duplicate `<defs>` are
                harmless — SVG resolves to the first match. */}
            <LabelStrokeFilter />
            {labeledPoints.map((label) => (
                <MovablePointLabelView
                    key={label.key}
                    label={label}
                    range={state.range}
                />
            ))}
        </>
    );
}

function MovablePointLabelView({
    label,
    range,
}: {
    label: MovablePointLabel;
    range: InteractiveGraphState["range"];
}) {
    const graphConfig = useGraphConfig();
    const [x, y] = pointToPixel(label.coord, graphConfig);
    const attach = getLabelAttach(label.coord, range);

    return (
        <span
            className="movable-point-label"
            data-testid="movable-point__visible-label"
            aria-hidden={true}
            style={{
                position: "absolute",
                left: x,
                top: y,
                transform: translateOutward(attach),
                color: semanticColor.core.foreground.neutral.default,
                fontFamily: 'Symbola, "Times New Roman", serif',
                fontSize: font.heading.size.medium,
                fontWeight: font.weight.black,
                whiteSpace: "nowrap",
                pointerEvents: "none",
                filter: "url(#math-stroke)",
            }}
        >
            {label.text}
        </span>
    );
}

// Gap between the point glyph and the label glyph, in pixels.
const LABEL_PADDING_PX = 12;

// Pushes the label LABEL_PADDING_PX away from the anchor point in the
// given compass direction (n, ne, e, …).
function translateOutward(attach: LabelAttach): string {
    const p = LABEL_PADDING_PX;
    switch (attach) {
        case "n":
            return `translate(-50%, calc(-100% - ${p}px))`;
        case "ne":
            return `translate(${p}px, calc(-100% - ${p}px))`;
        case "e":
            return `translate(${p}px, -50%)`;
        case "se":
            return `translate(${p}px, ${p}px)`;
        case "s":
            return `translate(-50%, ${p}px)`;
        case "sw":
            return `translate(calc(-100% - ${p}px), ${p}px)`;
        case "w":
            return `translate(calc(-100% - ${p}px), -50%)`;
        case "nw":
            return `translate(calc(-100% - ${p}px), calc(-100% - ${p}px))`;
    }
}
