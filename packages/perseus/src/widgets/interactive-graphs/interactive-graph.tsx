import {Errors, PerseusError} from "@khanacademy/perseus-core";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import Util from "../../util";
import {getInteractiveBoxFromSizeClass} from "../../util/sizing-utils";
import {getPromptJSON} from "../../widget-ai-utils/interactive-graph/interactive-graph-ai-utils";

import {getEquationString} from "./get-equation-string";

import type {StatefulMafsGraphType} from "./stateful-mafs-graph";
import type {WidgetExports, WidgetProps} from "../../types";
import type {InteractiveGraphPromptJSON} from "../../widget-ai-utils/interactive-graph/interactive-graph-ai-utils";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";
import type {
    PerseusGraphType,
    PerseusInteractiveGraphWidgetOptions,
    InteractiveGraphPublicWidgetOptions,
    PerseusInteractiveGraphUserInput,
} from "@khanacademy/perseus-core";

import {StatefulMafsGraph} from "./index";

export type Props = WidgetProps<
    PerseusInteractiveGraphWidgetOptions,
    PerseusInteractiveGraphUserInput
>;

class InteractiveGraph extends React.Component<Props> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    mafsRef = React.createRef<StatefulMafsGraphType>();

    static getEquationString(props: Props) {
        return getEquationString(props);
    }

    getUserInput(): PerseusInteractiveGraphUserInput {
        if (this.mafsRef.current?.getUserInput) {
            return this.mafsRef.current.getUserInput();
        }
        throw new PerseusError(
            "Cannot getUserInput from a graph that has never rendered",
            Errors.NotAllowed,
        );
    }

    getPromptJSON(): InteractiveGraphPromptJSON | UnsupportedWidgetPromptJSON {
        return getPromptJSON(this.props, this.getUserInput());
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState
     */
    getSerializedState() {
        // Callers of this legacy API expect the widget's options flattened in
        // alongside the other props.
        const {userInput, options, ...rest} = this.props;
        return {
            ...options,
            ...rest,
            graph: userInput,
        };
    }

    render() {
        const options = this.props.options;
        const box = getInteractiveBoxFromSizeClass(
            this.props.containerSizeClass,
        );
        const gridStep =
            options.gridStep ||
            Util.getGridStep(options.range, options.step, box[0]);
        const snapStep =
            options.snapStep || Util.snapStepFromGridStep(gridStep);

        const mafsProps = {
            ...options,
            static: this.props.static,
            containerSizeClass: this.props.containerSizeClass,
            graph: this.props.userInput,
            onChange: () =>
                this.props.handleUserInput(
                    // StatefulMafsGraph maintains its own internal state
                    // and manipulates that state when calling getUserInput.
                    // So we watch for changes in StatefulMafsGraph and call
                    // getUserInput so we can pass the parent the most up-to-date
                    // user input.
                    // eslint-disable-next-line no-restricted-syntax
                    this.mafsRef.current?.getUserInput() as PerseusGraphType,
                ),
        };

        const showUngradedText =
            this.props.graded === false && options.graph.type !== "none";
        const ungradedDescriptionId = `interactive-graph-ungraded-description-${this.props.widgetId?.replace(
            /\s+/g,
            "-",
        )}`;

        return (
            <>
                {showUngradedText && (
                    <p id={ungradedDescriptionId}>
                        {this.context.strings.ungradedInteractiveGraph}
                    </p>
                )}
                <StatefulMafsGraph
                    {...mafsProps}
                    ref={this.mafsRef}
                    gridStep={gridStep}
                    snapStep={snapStep}
                    box={box}
                    showTooltips={!!options.showTooltips}
                    readOnly={this.props.apiOptions?.readOnly}
                    widgetId={this.props.widgetId}
                    graded={this.props.graded}
                    ungradedDescriptionId={
                        showUngradedText ? ungradedDescriptionId : undefined
                    }
                />
            </>
        );
    }
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusInteractiveGraphUserInput {
    return serializedState.graph;
}

function getStartUserInput(options: InteractiveGraphPublicWidgetOptions) {
    return options.graph;
}

function getCorrectUserInput(
    options: PerseusInteractiveGraphWidgetOptions,
): PerseusInteractiveGraphUserInput {
    return options.correct;
}

export default {
    name: "interactive-graph",
    displayName: "Interactive graph",
    widget: InteractiveGraph,
    getStartUserInput,
    getCorrectUserInput,
    getUserInputFromSerializedState,
    supportsUngraded: true,
} satisfies WidgetExports<typeof InteractiveGraph>;
