import {PolarMath} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {Mafs} from "mafs";
import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import {HitboxLayerContext} from "../interactive-graphs/graphs/components/hitbox-layer-context";
import {MovablePointLabelView} from "../interactive-graphs/graphs/components/movable-point-labels-layer/movable-point-labels-layer";
import {SvgDefs} from "../interactive-graphs/graphs/components/text-label";
import LabelStrokeFilter from "../interactive-graphs/label-stroke-filter";
import LockedLabel from "../interactive-graphs/locked-figures/locked-label";
import {GraphConfigContext} from "../interactive-graphs/reducer/use-graph-config";
import {describedByIds} from "../interactive-graphs/utils/mafs-graph-utils";

import {PolarGrid} from "./components/polar-grid";
import {RoseKControls} from "./components/rose-k-controls";
import {describePolarElements, describePolarFigure} from "./polar-describe";
import {PolarLockedFigures, PolarSubGraph} from "./polar-sub-graphs";

import type {GraphConfig} from "../interactive-graphs/reducer/use-graph-config";
import type {LabelAttach} from "../interactive-graphs/utils/movable-point-labels";
import type {
    Coord,
    PerseusPolarGraphType,
    PolarGraphPublicWidgetOptions,
} from "@khanacademy/perseus-core";
import type {Interval} from "mafs";

import "mafs/core.css";
import "../interactive-graphs/mafs-styles.css";

// Room around the outer circle for angle labels, as a share of maxRadius.
const LABEL_MARGIN = 0.22;

type PolarGraphViewProps = {
    options: PolarGraphPublicWidgetOptions;
    /** The figure as it stands: its sub-type and handle positions. */
    state: PerseusPolarGraphType;
    /** Called with the next state whenever a handle moves or k changes. */
    onChange: (next: PerseusPolarGraphType) => void;
    /** Side of the square graph, in pixels. */
    size: number;
    /** Read-only or static: no keyboard or pointer interaction. */
    disabled?: boolean;
    /** Static graphs show no point labels, as on interactive graph. */
    hidePointLabels?: boolean;
    /** Id of the "does not count as your answer" note, when shown. */
    ungradedDescriptionId?: string;
    /** Whether the learner must answer here; said after the instructions. */
    isRequired?: boolean;
};

/** Puts a point's label on the side facing away from the pole. */
function labelSideFor(point: Coord): LabelAttach {
    const {thetaDegrees} = PolarMath.toPolar(point);
    if (thetaDegrees < 90) {
        return "ne";
    }
    if (thetaDegrees < 180) {
        return "nw";
    }
    if (thetaDegrees < 270) {
        return "sw";
    }
    return "se";
}

/**
 * The graph itself: a square Mafs canvas with a polar grid and the figure
 * for the current sub-type, wrapped in the same accessibility structure
 * interactive graph uses. Keyboard instructions come first in the
 * description, then the author's description, then a live description of
 * every interactive element.
 */
export function PolarGraphView(props: PolarGraphViewProps) {
    const {
        options,
        state,
        onChange,
        size,
        disabled = false,
        hidePointLabels = false,
        ungradedDescriptionId,
        isRequired = false,
    } = props;
    const {
        maxRadius,
        radiusStep,
        angleStepDegrees,
        angleUnit,
        fullGraphAriaLabel,
        fullGraphAriaDescription,
        lockedFigures,
        lockedLabels,
    } = options;
    // Every TeX label on the graph: each figure's own, then the free ones.
    const allLabels = [
        ...lockedFigures.flatMap((locked) => locked.labels),
        ...lockedLabels,
    ];
    const i18n = usePerseusI18n();
    const {strings} = i18n;
    const id = React.useId();
    const instructionsId = `${id}-instructions`;
    const descriptionId = `${id}-description`;
    const elementsId = `${id}-elements`;
    const [hitboxLayerEl, setHitboxLayerEl] =
        React.useState<HTMLElement | null>(null);

    const extent = maxRadius * (1 + LABEL_MARGIN);
    const range: [Interval, Interval] = [
        [-extent, extent],
        [-extent, extent],
    ];
    const gridSettings = {maxRadius, radiusStep, angleStepDegrees};

    // The movable point, drag hook and hitboxes read this context, so it
    // must describe the same view the <Mafs> element below draws.
    const graphConfig: GraphConfig = {
        range,
        tickStep: [radiusStep, radiusStep],
        gridStep: [radiusStep, radiusStep],
        snapStep: [radiusStep, radiusStep],
        // "none" keeps the cartesian hairlines off; they mean nothing here.
        markings: "none",
        showTooltips: false,
        graphDimensionsInPixels: [size, size],
        width: size,
        height: size,
        labels: [],
        labelLocation: "onAxis",
        disableKeyboardInteraction: disabled,
        interactiveColor: disabled ? "var(--static-gray)" : "var(--mafs-blue)",
        showAxisArrows: {xMin: false, xMax: false, yMin: false, yMax: false},
        showAxisTicks: {x: false, y: false},
    };

    const describedBy = describedByIds(
        ungradedDescriptionId,
        !disabled && instructionsId,
        fullGraphAriaDescription && descriptionId,
        elementsId,
    );

    const k =
        state.type === "rose" ? state.k ?? PolarMath.DEFAULT_ROSE_K : null;
    // Display settings belong to the author's graph, not the learner's state.
    const authorGraph = options.graph;
    const pointLabels =
        authorGraph.type === "point" ? authorGraph.pointLabels ?? [] : [];
    const showPointLabels =
        authorGraph.type === "point" && (authorGraph.showPointLabels ?? false);
    const showAngles =
        authorGraph.type === "angle" && (authorGraph.showAngles ?? false);
    const canChangeK =
        k !== null && !(authorGraph.type === "rose" && authorGraph.fixedK);
    const isPointGraph = state.type === "point";

    return (
        <GraphConfigContext.Provider value={graphConfig}>
            <View
                className="polar-graph"
                role="figure"
                aria-label={fullGraphAriaLabel || strings.srPolarGraph}
                aria-describedby={describedBy}
                // A tab stop, so the instructions are read when a screen
                // reader user lands on the graph, before the first handle.
                tabIndex={0}
                style={{
                    width: size,
                    userSelect: "none",
                    pointerEvents: disabled ? "none" : "auto",
                }}
            >
                {!disabled && (
                    <View
                        id={instructionsId}
                        className="mafs-sr-only"
                        tabIndex={-1}
                    >
                        {`${strings.srPolarGraphInstructions}${
                            canChangeK
                                ? ` ${strings.srPolarRoseKInstructions}`
                                : ""
                        }${isRequired ? ` ${strings.required}` : ""}`}
                    </View>
                )}
                {fullGraphAriaDescription && (
                    <View
                        id={descriptionId}
                        className="mafs-sr-only"
                        tabIndex={-1}
                    >
                        {fullGraphAriaDescription}
                    </View>
                )}
                <View id={elementsId} className="mafs-sr-only" tabIndex={-1}>
                    {describePolarElements(state, angleUnit, i18n, pointLabels)}
                </View>
                <View style={{position: "relative", width: size, height: size}}>
                    <HitboxLayerContext.Provider value={hitboxLayerEl}>
                        <Mafs
                            preserveAspectRatio={false}
                            viewBox={{x: range[0], y: range[1], padding: 0}}
                            pan={false}
                            zoom={false}
                            width={size}
                            height={size}
                        >
                            <SvgDefs />
                            {/* The grid is decoration; each handle carries
                                its own label and the figure describes them
                                all. */}
                            <g aria-hidden={true}>
                                <PolarGrid
                                    settings={gridSettings}
                                    angleUnit={angleUnit}
                                />
                            </g>
                            <PolarLockedFigures
                                lockedFigures={lockedFigures}
                                settings={gridSettings}
                                angleUnit={angleUnit}
                            />
                            {/* An SVG <g> has no role of its own, so the
                                group is given one and a name for screen
                                readers. Points get neither, as on
                                interactive graph: each point names itself
                                and the figure already says "polar graph". */}
                            <g
                                role={isPointGraph ? undefined : "group"}
                                aria-label={
                                    isPointGraph
                                        ? undefined
                                        : describePolarFigure(
                                              state,
                                              angleUnit,
                                              i18n,
                                          )
                                }
                            >
                                <PolarSubGraph
                                    state={state}
                                    settings={gridSettings}
                                    angleUnit={angleUnit}
                                    showAngles={showAngles}
                                    pointLabels={pointLabels}
                                    onChange={onChange}
                                />
                            </g>
                        </Mafs>
                        {/* Text cannot render inside the SVG the way the
                            rest of Perseus draws it, so labels are HTML
                            placed over the graph, as on interactive graph. */}
                        {allLabels.map((label, index) => (
                            <LockedLabel key={`label-${index}`} {...label} />
                        ))}
                        {showPointLabels && !hidePointLabels && (
                            <>
                                <LabelStrokeFilter />
                                {(state.coords ?? []).map((point, index) =>
                                    pointLabels[index] ? (
                                        <MovablePointLabelView
                                            key={`point-label-${index}`}
                                            coord={point}
                                            text={pointLabels[index]}
                                            attach={labelSideFor(point)}
                                        />
                                    ) : null,
                                )}
                            </>
                        )}
                        {/* HTML overlay that holds the handles' drag
                            hitboxes. See HitboxLayerContext for why it is
                            not SVG. */}
                        <div
                            ref={setHitboxLayerEl}
                            className="interactive-graph-hitbox-layer"
                            style={{
                                position: "absolute",
                                // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: the overlay must sit exactly over the SVG, which does not flip with page direction
                                top: 0,
                                // eslint-disable-next-line @khanacademy/wonder-blocks/require-logical-properties-for-rtl -- physical X/Y: the overlay must sit exactly over the SVG, which does not flip with page direction
                                left: 0,
                                width: size,
                                height: size,
                                pointerEvents: "none",
                            }}
                        />
                    </HitboxLayerContext.Provider>
                </View>
                {k !== null && (
                    <RoseKControls
                        k={k}
                        canChange={canChangeK}
                        disabled={disabled}
                        onChange={(next) =>
                            state.type === "rose" &&
                            onChange({...state, k: next})
                        }
                    />
                )}
            </View>
        </GraphConfigContext.Provider>
    );
}
