import {getPolarGraphStartState} from "@khanacademy/perseus-core";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {forwardRef, useImperativeHandle} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import {useDependencies} from "../../dependencies";
import {ApiOptions} from "../../perseus-api";
import {getInteractiveBoxFromSizeClass} from "../../util/sizing-utils";
import {getPromptJSON} from "../../widget-ai-utils/polar-graph/polar-graph-ai-utils";

import {PolarGraphView} from "./polar-graph-view";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {PolarGraphPromptJSON} from "../../widget-ai-utils/polar-graph/polar-graph-ai-utils";
import type {
    PerseusPolarGraphType,
    PerseusPolarGraphUserInput,
    PerseusPolarGraphWidgetOptions,
} from "@khanacademy/perseus-core";

type Props = WidgetProps<
    PerseusPolarGraphWidgetOptions,
    PerseusPolarGraphUserInput
>;

const PolarGraph = forwardRef<Widget, Props>(function PolarGraph(props, ref) {
    const {
        options,
        userInput,
        handleUserInput,
        trackInteraction,
        apiOptions = ApiOptions.defaults,
        containerSizeClass,
        widgetId,
    } = props;
    const {strings} = usePerseusI18n();
    const {analytics} = useDependencies();

    useOnMountEffect(() => {
        analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: options.graph.type,
                widgetType: "polar-graph",
                widgetId,
            },
        });
    });

    // Same rules as interactive graph. An ungraded graph tells the learner
    // it does not count. A static graph shows the answer, unless it is also
    // ungraded: then it is a sketchpad and must never reveal the answer the
    // renderer seeded it with. The learner's input has no coordinates until
    // they move something, so until then the graph shows the start layout.
    const showUngradedText = props.graded === false;
    const ungradedDescriptionId =
        "polar-graph-ungraded-description-" + widgetId.replace(/\s+/g, "-");
    const startState = getPolarGraphStartState(options);
    const hasInput = (userInput?.coords?.length ?? 0) > 0;
    const learnerState =
        userInput !== undefined && hasInput ? userInput : startState;
    let state: PerseusPolarGraphType;
    if (props.static) {
        state =
            props.graded === false
                ? startState
                : options.correct ?? learnerState;
    } else {
        state = learnerState;
    }
    // Answering is required only when the learner can interact and the
    // answer counts.
    const isRequired =
        props.isScorable &&
        props.graded !== false &&
        !props.reviewMode &&
        !props.static &&
        !apiOptions.readOnly;

    useImperativeHandle(ref, () => ({
        // The learner's input, never the answer a static graph shows.
        getPromptJSON: (): PolarGraphPromptJSON =>
            getPromptJSON(options, userInput),
    }));

    const [size] = getInteractiveBoxFromSizeClass(containerSizeClass);
    const disabled = Boolean(apiOptions.readOnly || props.static);

    return (
        <>
            {showUngradedText && (
                <p id={ungradedDescriptionId}>
                    {strings.ungradedInteractiveGraph}
                </p>
            )}
            <PolarGraphView
                options={options}
                state={state}
                onChange={(next) => {
                    trackInteraction();
                    handleUserInput(next);
                }}
                size={size}
                disabled={disabled}
                hidePointLabels={Boolean(props.static)}
                ungradedDescriptionId={
                    showUngradedText ? ungradedDescriptionId : undefined
                }
                isRequired={isRequired}
            />
        </>
    );
});

// The author's graph settings with no coordinates, as on interactive
// graph: the scorer treats that as "not answered yet".
function getStartUserInput(
    options: PerseusPolarGraphWidgetOptions,
): PerseusPolarGraphUserInput {
    return options.graph;
}

function getCorrectUserInput(
    options: PerseusPolarGraphWidgetOptions,
): PerseusPolarGraphUserInput {
    return options.correct ?? getPolarGraphStartState(options);
}

export default {
    name: "polar-graph",
    displayName: "Polar graph",
    widget: PolarGraph,
    getStartUserInput,
    getCorrectUserInput,
    supportsUngraded: true,
} satisfies WidgetExports<typeof PolarGraph>;
