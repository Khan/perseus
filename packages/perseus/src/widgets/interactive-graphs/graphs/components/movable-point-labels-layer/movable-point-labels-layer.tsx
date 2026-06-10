// HTML overlay that renders the visible label next to every labeled
// movable point. TeX cannot be drawn inside an SVG, so the labels live
// outside the `<Mafs>` element — exactly the same pattern that
// `graph-locked-labels-layer.tsx` already uses for every locked label.
//
// The overlay reads live point coordinates straight from the reducer
// state, so a drag mutates state → MafsGraph re-renders → this layer
// projects the new coords to pixels and the labels follow the point
// without any extra subscription / animation plumbing.
//
// `aria-hidden="true"` and `data-testid="movable-point__visible-label"`
// stay on the rendered span so screen-reader output continues to come
// from the focusable handle's `aria-label`, never from the visible
// label. (WCAG 2.5.3, "Label in Name".)

import {font, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {getDependencies} from "../../../../../dependencies";
import useGraphConfig from "../../../reducer/use-graph-config";
import {replaceOutsideTeX} from "../../../utils";
import {
    getLabelAttach,
    getLabeledMovablePoints,
    type LabelAttach,
    type MovablePointLabel,
} from "../../../utils/movable-point-labels";
import {pointToPixel} from "../../use-transform";

import type {InteractiveGraphState} from "../../../types";

type Props = {
    state: InteractiveGraphState;
};

export default function MovablePointLabelsLayer({state}: Props) {
    const labeledPoints = getLabeledMovablePoints(state);

    if (labeledPoints.length === 0) {
        return null;
    }

    return (
        <>
            {/* Shared stroke filter (same `id="math-stroke"` as
                `LockedLabelStrokeFilter`). If a locked label is also on
                this graph, its <defs> is already in the DOM, so this
                duplicate is harmless — SVG resolves the first match. */}
            <MovableLabelStrokeFilter />
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

    const {TeX} = getDependencies();

    return (
        <span
            className="movable-point-label"
            data-testid="movable-point__visible-label"
            aria-hidden={true}
            style={{
                position: "absolute",
                left: x,
                top: y,
                transform: attachToCss(attach),
                color: semanticColor.core.foreground.neutral.default,
                fontSize: font.size.medium,
                fontWeight: font.weight.bold,
                whiteSpace: "nowrap",
                pointerEvents: "none",
                filter: "url(#math-stroke)",
            }}
        >
            <TeX>{replaceOutsideTeX(label.text)}</TeX>
        </span>
    );
}

// Distance, in pixels, between the anchor pixel (the point's center)
// and the label edge that faces the point. Keeps the label glyph from
// touching the point glyph.
const LABEL_PADDING_PX = 12;

// Maps a compass attach direction into a CSS `transform` string. The
// span is positioned with `left: x; top: y;` placing its top-left at
// the anchor pixel; we then translate it so the chosen attach edge
// lands LABEL_PADDING_PX from the anchor in the outward direction.
function attachToCss(attach: LabelAttach): string {
    const p = LABEL_PADDING_PX;
    switch (attach) {
        case "n":
            // label sits above point: bottom edge `p` above the anchor
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

function MovableLabelStrokeFilter() {
    const color = semanticColor.core.border.knockout.default;
    return (
        <svg width="0" height="0" style={{position: "absolute"}}>
            <defs>
                <filter id="math-stroke">
                    <feMorphology
                        operator="dilate"
                        radius="2"
                        in="SourceGraphic"
                        result="expanded"
                    />
                    <feFlood floodColor={color} result="flood" />
                    <feComposite
                        in="flood"
                        in2="expanded"
                        operator="in"
                        result="outline"
                    />
                    <feMerge>
                        <feMergeNode in="outline" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
        </svg>
    );
}
