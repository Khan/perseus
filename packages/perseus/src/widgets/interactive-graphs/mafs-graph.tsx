/**
 * Render the Mafs graph with the specified background and graph elements.
 *
 * Render order (back to front):
 * - Grid
 * - Axis Ticks, Axis Arrows, and Axis Labels
 * - Locked Figures
 * - Locked Labels
 * - Protractor
 * - Interactive Graph Elements
 */
import Button from "@khanacademy/wonder-blocks-button";
import {useOnMountEffect, View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import {Mafs} from "mafs";
import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import {useDependencies} from "../../dependencies";

import AxisArrows from "./backgrounds/axis-arrows";
import AxisLabels from "./backgrounds/axis-labels";
import {AxisTicks} from "./backgrounds/axis-ticks";
import {Grid} from "./backgrounds/grid";
import {LegacyGrid} from "./backgrounds/legacy-grid";
import GraphLockedLabelsLayer from "./graph-locked-labels-layer";
import GraphLockedLayer from "./graph-locked-layer";
import {renderAngleGraph} from "./graphs/angle";
import {renderCircleGraph} from "./graphs/circle";
import {SvgDefs} from "./graphs/components/text-label";
import {renderLinearGraph} from "./graphs/linear";
import {renderLinearSystemGraph} from "./graphs/linear-system";
import {renderPointGraph} from "./graphs/point";
import {renderPolygonGraph} from "./graphs/polygon";
import {renderQuadraticGraph} from "./graphs/quadratic";
import {renderRayGraph} from "./graphs/ray";
import {renderSegmentGraph} from "./graphs/segment";
import {renderSinusoidGraph} from "./graphs/sinusoid";
import {getArrayWithoutDuplicates} from "./graphs/utils";
import {MIN, X, Y} from "./math";
import {Protractor} from "./protractor";
import {actions} from "./reducer/interactive-graph-action";
import {GraphConfigContext} from "./reducer/use-graph-config";
import {isUnlimitedGraphState, REMOVE_BUTTON_ID} from "./utils";

import type {InteractiveGraphAction} from "./reducer/interactive-graph-action";
import type {
    InteractiveGraphState,
    InteractiveGraphProps,
    PointGraphState,
    PolygonGraphState,
    InteractiveGraphElementSuite,
} from "./types";
import type {I18nContextType} from "../../components/i18n-context";
import type {PerseusStrings} from "../../strings";
import type {APIOptions} from "../../types";
import type {vec} from "mafs";

import "mafs/core.css";
import "./mafs-styles.css";

export type MafsGraphProps = {
    flags?: APIOptions["flags"];
    box: [number, number];
    backgroundImage?: InteractiveGraphProps["backgroundImage"];
    lockedFigures?: InteractiveGraphProps["lockedFigures"];
    step: InteractiveGraphProps["step"];
    gridStep: [x: number, y: number];
    containerSizeClass: InteractiveGraphProps["containerSizeClass"];
    markings: InteractiveGraphProps["markings"];
    showTooltips: Required<InteractiveGraphProps["showTooltips"]>;
    showProtractor: boolean;
    labels: ReadonlyArray<string>;
    fullGraphAriaLabel?: InteractiveGraphProps["fullGraphAriaLabel"];
    fullGraphAriaDescription?: InteractiveGraphProps["fullGraphAriaDescription"];
    state: InteractiveGraphState;
    dispatch: React.Dispatch<InteractiveGraphAction>;
    readOnly: boolean;
    static: boolean | null | undefined;
};

export const MafsGraph = (props: MafsGraphProps) => {
    const {
        state,
        dispatch,
        labels,
        readOnly,
        fullGraphAriaLabel,
        fullGraphAriaDescription,
    } = props;
    const {type} = state;
    const [width, height] = props.box;
    const tickStep = props.step as vec.Vector2;

    const uniqueId = React.useId();
    const descriptionId = `interactive-graph-description-${uniqueId}`;
    const interactiveElementsDescriptionId = `interactive-graph-interactive-elements-description-${uniqueId}`;
    const unlimitedGraphKeyboardPromptId = `unlimited-graph-keyboard-prompt-${uniqueId}`;
    const graphRef = React.useRef<HTMLElement>(null);
    const {analytics} = useDependencies();

    // Set up the SVG attributes for the nested SVGs that help lock
    // the grid and graph elements to the bounds of the graph.
    const {viewboxX, viewboxY} = calculateNestedSVGCoords(
        state.range,
        width,
        height,
    );
    const viewBox = `${viewboxX} ${viewboxY} ${width} ${height}`;
    const nestedSVGAttributes: React.SVGAttributes<SVGSVGElement> = {
        width,
        height,
        viewBox,
        preserveAspectRatio: "xMidYMin",
        x: viewboxX,
        y: viewboxY,
    };

    const i18n = usePerseusI18n();
    const {strings} = i18n;

    const interactionPrompt =
        isUnlimitedGraphState(state) && state.showKeyboardInteractionInvitation;

    useOnMountEffect(() => {
        analytics.onAnalyticsEvent({
            type: "perseus:interactive-graph-widget:rendered",
            payload: {
                type,
                widgetType: "INTERACTIVE_GRAPH",
                widgetId: "interactive-graph",
            },
        });
    });

    const {graph, interactiveElementsDescription} = renderGraphElements({
        state,
        dispatch,
        i18n,
        markings: props.markings,
    });

    return (
        <GraphConfigContext.Provider
            value={{
                range: state.range,
                snapStep: state.snapStep,
                markings: props.markings,
                tickStep: tickStep,
                gridStep: props.gridStep,
                showTooltips: !!props.showTooltips,
                graphDimensionsInPixels: props.box,
                width,
                height,
                labels,
                disableKeyboardInteraction: readOnly || !!props.static,
            }}
        >
            <View className="mafs-graph-container">
                <View
                    className="mafs-graph"
                    style={{
                        position: "relative",
                        padding: "25px 25px 0 0",
                        boxSizing: "content-box",
                        marginLeft: "20px",
                        marginBottom: "30px",
                        pointerEvents: props.static ? "none" : "auto",
                        userSelect: "none",
                        width,
                        height,
                    }}
                    onKeyUp={(event) => {
                        handleKeyboardEvent(event, state, dispatch);
                    }}
                    aria-label={fullGraphAriaLabel}
                    aria-describedby={describedByIds(
                        fullGraphAriaDescription && descriptionId,
                        interactiveElementsDescription &&
                            interactiveElementsDescriptionId,
                        isUnlimitedGraphState(state) &&
                            "unlimited-graph-keyboard-prompt",
                    )}
                    ref={graphRef}
                    tabIndex={0}
                    onFocus={(event) => {
                        handleFocusEvent(event, state, dispatch);
                    }}
                    onBlur={(event) => {
                        handleBlurEvent(event, state, dispatch);
                    }}
                >
                    {fullGraphAriaDescription && (
                        <View
                            id={descriptionId}
                            tabIndex={-1}
                            className="mafs-sr-only"
                        >
                            {fullGraphAriaDescription}
                        </View>
                    )}
                    {interactiveElementsDescription && (
                        <View
                            id={interactiveElementsDescriptionId}
                            tabIndex={-1}
                            className="mafs-sr-only"
                        >
                            {interactiveElementsDescription}
                        </View>
                    )}
                    <LegacyGrid
                        box={props.box}
                        backgroundImage={props.backgroundImage}
                    />
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                        }}
                    >
                        {(props.markings === "graph" ||
                            props.markings === "axes") && (
                            <>
                                <AxisLabels />
                            </>
                        )}
                        <Mafs
                            preserveAspectRatio={false}
                            viewBox={{
                                x: state.range[X],
                                y: state.range[Y],
                                padding: 0,
                            }}
                            pan={false}
                            zoom={false}
                            width={width}
                            height={height}
                        >
                            {/* Svg definitions to render only once */}
                            <SvgDefs />
                            {/* Cartesian grid nested in an SVG to lock to graph bounds */}
                            <svg {...nestedSVGAttributes}>
                                <Grid
                                    gridStep={props.gridStep}
                                    range={state.range}
                                    containerSizeClass={
                                        props.containerSizeClass
                                    }
                                    markings={props.markings}
                                    width={width}
                                    height={height}
                                />
                            </svg>
                            {/* Axis Ticks, Labels, and Arrows */}
                            {
                                // Only render the axis ticks and arrows if the markings are set to a full "graph"
                                (props.markings === "graph" ||
                                    props.markings === "axes") && (
                                    <>
                                        <AxisTicks />
                                        <AxisArrows />
                                    </>
                                )
                            }
                            {/* Locked & Interactive elements nested an SVG to lock to graph bounds*/}
                            <svg {...nestedSVGAttributes}>
                                {/* Locked figures layer */}
                                {props.lockedFigures && (
                                    <GraphLockedLayer
                                        lockedFigures={props.lockedFigures}
                                        range={state.range}
                                    />
                                )}
                            </svg>
                        </Mafs>
                        {props.lockedFigures && (
                            <GraphLockedLabelsLayer
                                lockedFigures={props.lockedFigures}
                            />
                        )}
                        <View style={{position: "absolute"}}>
                            <Mafs
                                preserveAspectRatio={false}
                                viewBox={{
                                    x: state.range[X],
                                    y: state.range[Y],
                                    padding: 0,
                                }}
                                pan={false}
                                zoom={false}
                                width={width}
                                height={height}
                            >
                                {/* Intearctive Elements are nested in an SVG to lock them to graph bounds */}
                                <svg {...nestedSVGAttributes}>
                                    {/* Protractor */}
                                    {props.showProtractor && <Protractor />}
                                    {/* Interactive layer */}
                                    {graph}
                                </svg>
                            </Mafs>
                        </View>
                    </View>
                    {interactionPrompt && (
                        <View
                            style={{
                                display: interactionPrompt
                                    ? undefined
                                    : "hidden",
                                textAlign: "center",
                                backgroundColor: "white",
                                border: "1px solid #21242C52",
                                padding: "16px 0",
                                boxShadow: "0px 8px 8px 0px #21242C14",

                                // This translates the box to the center of the
                                // graph Then backs it off by half of its
                                // overall height so it's perfectly centered
                                top: "50%",
                                transform: "translateY(-50%)",
                            }}
                        >
                            <LabelMedium id={unlimitedGraphKeyboardPromptId}>
                                {strings.graphKeyboardPrompt}
                            </LabelMedium>
                        </View>
                    )}
                </View>
                {renderGraphControls({
                    state,
                    dispatch,
                    width,
                    perseusStrings: strings,
                })}
            </View>
        </GraphConfigContext.Provider>
    );
};

const renderPointGraphControls = (props: {
    state: PointGraphState;
    dispatch: (action: InteractiveGraphAction) => unknown;
    width: number;
    perseusStrings: PerseusStrings;
}) => {
    const {interactionMode, showRemovePointButton, focusedPointIndex} =
        props.state;
    const {perseusStrings} = props;

    const shouldShowRemoveButton =
        showRemovePointButton && focusedPointIndex !== null;

    return (
        <View
            style={{
                flexDirection: "row",
                width: props.width,
            }}
        >
            {interactionMode === "keyboard" && (
                <Button
                    kind="secondary"
                    style={{
                        width: "100%",
                        marginLeft: "20px",
                    }}
                    tabIndex={0}
                    onClick={() => {
                        props.dispatch(actions.pointGraph.addPoint([0, 0]));
                    }}
                >
                    {perseusStrings.addPoint}
                </Button>
            )}
            {interactionMode === "mouse" && (
                <Button
                    id={REMOVE_BUTTON_ID}
                    kind="secondary"
                    color="destructive"
                    // This button is meant to be interacted with by the mouse only
                    // Never allow learners to tab to this button
                    tabIndex={-1}
                    style={{
                        width: "100%",
                        marginLeft: "20px",
                        visibility: shouldShowRemoveButton
                            ? "visible"
                            : "hidden",
                    }}
                    onClick={(_event) => {
                        props.dispatch(
                            actions.pointGraph.removePoint(
                                props.state.focusedPointIndex!,
                            ),
                        );
                    }}
                >
                    {perseusStrings.removePoint}
                </Button>
            )}
        </View>
    );
};

const renderPolygonGraphControls = (props: {
    state: PolygonGraphState;
    dispatch: (action: InteractiveGraphAction) => unknown;
    width: number;
    perseusStrings: PerseusStrings;
}) => {
    const {
        interactionMode,
        showRemovePointButton,
        focusedPointIndex,
        closedPolygon,
        coords,
    } = props.state;
    const {perseusStrings} = props;

    const shouldShowRemoveButton =
        showRemovePointButton && focusedPointIndex !== null;

    // We want to disable the closePolygon button when
    // there are not enough coords to make a polygon
    const disableCloseButton = getArrayWithoutDuplicates(coords).length < 3;

    // If polygon is closed, show open button.
    // If polygon is open, show close button.
    const polygonButton = closedPolygon ? (
        <Button
            kind="secondary"
            style={{
                width: "100%",
                marginLeft: "20px",
            }}
            tabIndex={0}
            onClick={() => {
                props.dispatch(actions.polygon.openPolygon());
            }}
        >
            {perseusStrings.openPolygon}
        </Button>
    ) : (
        <Button
            kind="secondary"
            // Conditional disable when there are less than 3 points in
            // the graph
            disabled={disableCloseButton}
            style={{
                width: "100%",
                marginLeft: "20px",
            }}
            tabIndex={disableCloseButton ? -1 : 0}
            onClick={() => {
                props.dispatch(actions.polygon.closePolygon());
            }}
        >
            {perseusStrings.closePolygon}
        </Button>
    );

    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    width: props.width,
                }}
            >
                {/**
                 * Only show this in keyboard mode.
                 */}
                {interactionMode === "keyboard" && (
                    <Button
                        kind="secondary"
                        style={{
                            width: "100%",
                            marginLeft: "20px",
                        }}
                        // Disable button when polygon is closed.
                        disabled={closedPolygon}
                        // Do not make the button tabbable when it is disabled.
                        tabIndex={closedPolygon ? -1 : 0}
                        onClick={() => {
                            props.dispatch(actions.polygon.addPoint([0, 0]));
                        }}
                    >
                        {perseusStrings.addPoint}
                    </Button>
                )}
                {/*
                    Make sure remove button is always present, just disabled/enabled depending
                    on when a point is selected or if the polygon is closed.
                */}
                {interactionMode === "mouse" && (
                    <Button
                        id={REMOVE_BUTTON_ID}
                        kind="secondary"
                        color="destructive"
                        // Disable button when polygon is closed.
                        disabled={closedPolygon || !shouldShowRemoveButton}
                        // This button is meant to be interacted with by the mouse only
                        // Never allow learners to tab to this button
                        tabIndex={-1}
                        style={{
                            width: "100%",
                            marginLeft: "20px",
                        }}
                        onClick={(_event) => {
                            props.dispatch(
                                actions.polygon.removePoint(
                                    props.state.focusedPointIndex!,
                                ),
                            );
                        }}
                    >
                        {perseusStrings.removePoint}
                    </Button>
                )}
                {polygonButton}
            </View>
        </>
    );
};

const renderGraphControls = (props: {
    state: InteractiveGraphState;
    dispatch: (action: InteractiveGraphAction) => unknown;
    width: number;
    perseusStrings: PerseusStrings;
}) => {
    const {state, dispatch, width, perseusStrings} = props;
    const {type} = state;
    switch (type) {
        case "point":
            if (state.numPoints === "unlimited") {
                return renderPointGraphControls({
                    state,
                    dispatch,
                    width,
                    perseusStrings,
                });
            }
            return null;
        case "polygon":
            if (state.numSides === "unlimited") {
                return renderPolygonGraphControls({
                    state,
                    dispatch,
                    width,
                    perseusStrings,
                });
            }
            return null;
        default:
            return null;
    }
};

function handleFocusEvent(
    event: React.FocusEvent,
    state: InteractiveGraphState,
    dispatch: (action: InteractiveGraphAction) => unknown,
) {
    if (isUnlimitedGraphState(state)) {
        if (
            event.target.classList.contains("mafs-graph") &&
            state.interactionMode === "mouse"
        ) {
            dispatch(actions.global.changeKeyboardInvitationVisibility(true));
        }
    }
}

function handleBlurEvent(
    _event: React.FocusEvent,
    state: InteractiveGraphState,
    dispatch: (action: InteractiveGraphAction) => unknown,
) {
    if (isUnlimitedGraphState(state)) {
        dispatch(actions.global.changeKeyboardInvitationVisibility(false));
    }
}

function handleKeyboardEvent(
    event: React.KeyboardEvent,
    state: InteractiveGraphState,
    dispatch: (action: InteractiveGraphAction) => unknown,
) {
    if (isUnlimitedGraphState(state)) {
        if (event.key === "Backspace" || event.key === "Delete") {
            // TODO(benchristel): Checking classList here is a hack to prevent
            // points from being deleted if the user presses the backspace key
            // while the whole graph is focused. Instead of doing this, we
            // should move the keyboard event handler to the movable point
            // handle element.
            if (
                document.activeElement?.classList.contains(
                    "movable-point__focusable-handle",
                )
            ) {
                // Only allow delete if type is point or a polygon that is open.
                if (
                    state.type === "point" ||
                    (state.type === "polygon" && !state.closedPolygon)
                ) {
                    dispatch(actions.global.deleteIntent());
                }
            }

            // After removing a point blur
            // It would be nice if this could focus on the graph but doing so
            // would trigger the message to prompt a learner to enter keyboard mode
            (document.activeElement as HTMLElement).blur();
        } else if (event.shiftKey && event.key === "Enter") {
            dispatch(actions.global.changeInteractionMode("keyboard"));
        } else if (state.interactionMode === "keyboard" && event.key === "a") {
            dispatch(actions.pointGraph.addPoint([0, 0]));
        }
    }
}

// Calculate the difference between the min and max values of a range
const getRangeDiff = (range: vec.Vector2) => {
    const [min, max] = range;
    return Math.abs(max - min);
};

// We need to adjust the nested SVG viewbox x and Y values based on the range of the graph in order
// to ensure that the graph is sized and positioned correctly within the Mafs SVG and the clipping mask.
// Exported for testing.
export const calculateNestedSVGCoords = (
    range: vec.Vector2[],
    width: number,
    height: number,
): {viewboxX: number; viewboxY: number} => {
    // X RANGE
    let viewboxX = 0; // When xMin is 0, we want to use 0 as the viewboxX value
    const totalXRange = getRangeDiff(range[X]);
    const gridCellWidth = width / totalXRange;
    const minX = range[X][MIN];

    // If xMin is entirely positive, we need to adjust the
    // viewboxX to be the grid cell width multiplied by xMin
    if (minX > 0) {
        viewboxX = gridCellWidth * Math.abs(minX);
    }
    // If xMin is negative, we need to adjust the viewboxX to be
    // the negative value of the grid cell width multiplied by xMin
    if (minX < 0) {
        viewboxX = -gridCellWidth * Math.abs(minX);
    }

    // Y RANGE
    let viewboxY = -height; // When yMin is 0, we want to use the negative value of the graph height
    const totalYRange = getRangeDiff(range[Y]);
    const gridCellHeight = height / totalYRange;
    const minY = range[Y][MIN];

    // If the y range is entirely positive, we want a negative sum of the
    // height and the gridcell height multiplied by the absolute value of yMin
    if (minY > 0) {
        viewboxY = -height - gridCellHeight * Math.abs(minY);
    }

    // If the yMin is negative, we want to multiply the gridcell height
    // by the absolute value of yMin, and subtract the full height of the graph
    if (minY < 0) {
        viewboxY = gridCellHeight * Math.abs(minY) - height;
    }

    return {
        viewboxX,
        viewboxY,
    };
};

const renderGraphElements = (props: {
    state: InteractiveGraphState;
    dispatch: (action: InteractiveGraphAction) => unknown;
    i18n: I18nContextType;
    // Used to determine if the graph description should specify the
    // coordinates of the graph elements. We don't want to mention the
    // coordinates if the graph is not on a coordinate plane (no axes).
    markings: InteractiveGraphProps["markings"];
}): InteractiveGraphElementSuite => {
    const {state, dispatch, i18n, markings} = props;
    const {type} = state;
    switch (type) {
        case "angle":
            return renderAngleGraph(state, dispatch);
        case "segment":
            return renderSegmentGraph(state, dispatch);
        case "linear-system":
            return renderLinearSystemGraph(state, dispatch);
        case "linear":
            return renderLinearGraph(state, dispatch);
        case "ray":
            return renderRayGraph(state, dispatch);
        case "polygon":
            return renderPolygonGraph(state, dispatch, i18n, markings);
        case "point":
            return renderPointGraph(state, dispatch);
        case "circle":
            return renderCircleGraph(state, dispatch);
        case "quadratic":
            return renderQuadraticGraph(state, dispatch, i18n);
        case "sinusoid":
            return renderSinusoidGraph(state, dispatch);
        case "none":
            return {graph: null, interactiveElementsDescription: null};
        default:
            throw new UnreachableCaseError(type);
    }
};

// Returns a space-separated string like "foo bar" given several optional
// string IDs. If all args are falsy, returns undefined.
function describedByIds(
    ...args: Array<string | false | 0 | null | undefined>
): string | undefined {
    return args.filter(Boolean).join(" ") || undefined;
}
