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
import {X, Y} from "./math";
import {Protractor} from "./protractor";
import {actions} from "./reducer/interactive-graph-action";
import {GraphConfigContext} from "./reducer/use-graph-config";
import {
    calculateNestedSVGCoords,
    isUnlimitedGraphState,
    REMOVE_BUTTON_ID,
} from "./utils";

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
import type {vec} from "mafs";

import "mafs/core.css";
import "./mafs-styles.css";

export type MafsGraphProps = {
    box: [number, number];
    backgroundImage?: InteractiveGraphProps["backgroundImage"];
    lockedFigures: InteractiveGraphProps["lockedFigures"];
    step: InteractiveGraphProps["step"];
    gridStep: [x: number, y: number];
    containerSizeClass: InteractiveGraphProps["containerSizeClass"];
    markings: InteractiveGraphProps["markings"];
    showTooltips: Required<InteractiveGraphProps["showTooltips"]>;
    showProtractor: boolean;
    labels: ReadonlyArray<string>;
    labelLocation?: InteractiveGraphProps["labelLocation"];
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
        labelLocation,
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
    const instructionsId = `instructions-${uniqueId}`;
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
            // TODO(LEMS-2827): Remove analytics event in LEMS-2827 in favor of ti below.
            type: "perseus:interactive-graph-widget:rendered",
            payload: {
                type,
                widgetType: "INTERACTIVE_GRAPH",
                widgetId: "interactive-graph",
            },
        });
        analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: type,
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

    const disableInteraction = readOnly || !!props.static;

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
                labelLocation,
                disableKeyboardInteraction: disableInteraction,
                // If the graph is read-only or static, we want to make it
                // visually clear that the graph is no longer interactive.
                // We do this by changing the color of the interactive elements
                // to a static gray color rather than our standard blue.
                interactiveColor: disableInteraction
                    ? "var(--static-gray)"
                    : "var(--mafs-blue)",
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
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                        interactiveElementsDescription &&
                            interactiveElementsDescriptionId,
                        isUnlimitedGraphState(state) &&
                            unlimitedGraphKeyboardPromptId,
                        state.type !== "none" &&
                            !disableInteraction &&
                            instructionsId,
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
                    {/*
                      eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    */}
                    {interactiveElementsDescription && (
                        <View
                            id={interactiveElementsDescriptionId}
                            tabIndex={-1}
                            className="mafs-sr-only"
                        >
                            {interactiveElementsDescription}
                        </View>
                    )}
                    {state.type !== "none" && (
                        <View
                            id={instructionsId}
                            tabIndex={-1}
                            className="mafs-sr-only"
                        >
                            {isUnlimitedGraphState(state)
                                ? strings.srUnlimitedGraphInstructions
                                : strings.srGraphInstructions}
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
                                <AxisLabels i18n={i18n} />
                            </>
                        )}
                        <View
                            // If we have locked figures, we set aria-hidden
                            // to false so that screen readers can read the
                            // locked figures. If we don't have any locked
                            // figures, we need to set aria-hidden to true so
                            // that screen readers don't read this Mafs element
                            // as an empty image.
                            // Note: Adding this in a wrapping View element
                            // so that `aria-hidden` is a valid property.
                            // It does not work on `Mafs` or svg elements.
                            aria-hidden={props.lockedFigures.length === 0}
                        >
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
                                {/* Locked figures layer nested in SVG to lock to graph bounds*/}
                                {props.lockedFigures.length > 0 && (
                                    <svg {...nestedSVGAttributes}>
                                        <GraphLockedLayer
                                            lockedFigures={props.lockedFigures}
                                            range={state.range}
                                        />
                                    </svg>
                                )}
                            </Mafs>
                        </View>
                        <GraphLockedLabelsLayer
                            lockedFigures={props.lockedFigures}
                        />
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
                    actionType="destructive"
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
                        actionType="destructive"
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
            return renderAngleGraph(state, dispatch, i18n);
        case "segment":
            return renderSegmentGraph(state, dispatch, i18n);
        case "linear-system":
            return renderLinearSystemGraph(state, dispatch, i18n);
        case "linear":
            return renderLinearGraph(state, dispatch, i18n);
        case "ray":
            return renderRayGraph(state, dispatch, i18n);
        case "polygon":
            return renderPolygonGraph(state, dispatch, i18n, markings);
        case "point":
            return renderPointGraph(state, dispatch, i18n);
        case "circle":
            return renderCircleGraph(state, dispatch, i18n);
        case "quadratic":
            return renderQuadraticGraph(state, dispatch, i18n);
        case "sinusoid":
            return renderSinusoidGraph(state, dispatch, i18n);
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
