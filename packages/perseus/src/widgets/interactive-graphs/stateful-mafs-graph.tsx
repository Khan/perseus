import {announceMessage} from "@khanacademy/wonder-blocks-announcer";
import * as React from "react";
import {useEffect, useImperativeHandle, useRef} from "react";

import {usePerseusI18n} from "../../components/i18n-context";

import {getAnnouncementText} from "./graphs/strings/announcement";
import {MafsGraph} from "./mafs-graph";
import {mafsStateToInteractiveGraph} from "./mafs-state-to-interactive-graph";
import {initializeGraphState} from "./reducer/initialize-graph-state";
import {changeRange, changeSnapStep} from "./reducer/interactive-graph-action";
import {interactiveGraphReducer} from "./reducer/interactive-graph-reducer";
import {getGradableGraph} from "./reducer/interactive-graph-state";
import {useReinitializeOnGraphChange} from "./use-reinitialize-on-graph-change";

import type {InteractiveGraphProps, InteractiveGraphState} from "./types";
import type {
    PerseusGraphType,
    PerseusInteractiveGraphUserInput,
    PerseusInteractiveGraphWidgetOptions,
} from "@khanacademy/perseus-core";

export type StatefulMafsGraphProps = {
    box: [number, number];
    backgroundImage?: PerseusInteractiveGraphWidgetOptions["backgroundImage"];
    graph: PerseusGraphType;
    /**
     * The correct answer for this widget.
     */
    // TODO(LEMS-2344): make the type of `correct` more specific
    correct?: PerseusGraphType;
    lockedFigures: PerseusInteractiveGraphWidgetOptions["lockedFigures"];
    range: PerseusInteractiveGraphWidgetOptions["range"];
    snapStep: [x: number, y: number];
    step: PerseusInteractiveGraphWidgetOptions["step"];
    gridStep: [x: number, y: number];
    containerSizeClass: InteractiveGraphProps["containerSizeClass"];
    markings: PerseusInteractiveGraphWidgetOptions["markings"];
    onChange: (userInput: PerseusGraphType) => void;
    showTooltips: Required<
        PerseusInteractiveGraphWidgetOptions["showTooltips"]
    >;
    showProtractor: boolean;
    labels: ReadonlyArray<string>;
    labelLocation?: PerseusInteractiveGraphWidgetOptions["labelLocation"];
    fullGraphAriaLabel?: PerseusInteractiveGraphWidgetOptions["fullGraphAriaLabel"];
    fullGraphAriaDescription?: PerseusInteractiveGraphWidgetOptions["fullGraphAriaDescription"];
    readOnly: boolean;
    static: InteractiveGraphProps["static"];
    showAxisArrows: PerseusInteractiveGraphWidgetOptions["showAxisArrows"];
    showAxisTicks: PerseusInteractiveGraphWidgetOptions["showAxisTicks"];
    widgetId: string;
    graded?: boolean | null;
    ungradedDescriptionId?: string;
};

export type StatefulMafsGraphType = {
    getUserInput: () => PerseusInteractiveGraphUserInput;
};

export const StatefulMafsGraph = React.forwardRef<
    StatefulMafsGraphType,
    StatefulMafsGraphProps
>(function StatefulMafsGraphWithRef(props, ref) {
    const {onChange, graph} = props;
    const {strings, locale} = usePerseusI18n();

    const [state, dispatch] = React.useReducer(
        interactiveGraphReducer,
        props,
        initializeGraphState,
    );

    useImperativeHandle(ref, () => ({
        getUserInput: () => getGradableGraph(state, graph),
    }));

    const prevState = useRef<InteractiveGraphState>(state);

    useEffect(() => {
        if (prevState.current !== state) {
            onChange(mafsStateToInteractiveGraph(state, graph));
        }
        prevState.current = state;
    }, [onChange, state, graph]);

    useEffect(() => {
        if (!state.stateAnnouncement) {
            return;
        }

        announceMessage({
            message: getAnnouncementText(
                state.stateAnnouncement,
                strings,
                locale,
            ),
        });
    }, [state.stateAnnouncement, strings, locale]);

    // Destructuring first to keep useEffect from making excess calls
    const [xSnap, ySnap] = props.snapStep;
    useEffect(() => {
        dispatch(changeSnapStep([xSnap, ySnap]));
    }, [dispatch, xSnap, ySnap]);

    // Destructuring first to keep useEffect from making excess calls
    const [[xMinRange, xMaxRange], [yMinRange, yMaxRange]] = props.range;
    useEffect(() => {
        dispatch(
            changeRange([
                [xMinRange, xMaxRange],
                [yMinRange, yMaxRange],
            ]),
        );
    }, [dispatch, xMinRange, xMaxRange, yMinRange, yMaxRange]);

    useReinitializeOnGraphChange(props, dispatch);

    // If the graph is static and graded, it always displays the correct answer.
    // This is standard behavior for Perseus widgets (e.g. compare the Radio widget).
    // When graded is false the widget is a sketchpad and should never
    // reveal the correct answer.
    if (props.static && props.correct && props.graded !== false) {
        return (
            <MafsGraph
                {...props}
                state={initializeGraphState({...props, graph: props.correct})}
                dispatch={dispatch}
            />
        );
    }

    return <MafsGraph {...props} state={state} dispatch={dispatch} />;
});
