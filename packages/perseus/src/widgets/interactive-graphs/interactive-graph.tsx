import {Errors, PerseusError} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

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
    GraphRange,
    InteractiveGraphPublicWidgetOptions,
    LockedFigure,
    PerseusImageBackground,
    MarkingsType,
    PerseusInteractiveGraphUserInput,
    AxisLabelLocation,
    ShowAxisArrows,
    ShowAxisTicks,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

import {StatefulMafsGraph} from "./index";

const defaultBackgroundImage = {
    url: null,
};

// TODO: this should be PerseusInteractiveGraphWidgetOptions
// but when I try to change it things break
type InteractiveGraphProps = {
    /**
     * Where the little black axis lines & labels (ticks) should render.
     * Also known as the tick step. default [1, 1]
     *
     * NOTE(kevinb): perseus_data.go defines this as Array<number>
     */
    step: [number, number];
    /**
     * Where the grid lines on the graph will render. default [1, 1]
     *
     * NOTE(kevinb): perseus_data.go defines this as Array<number>
     */
    gridStep?: [x: number, y: number];
    /**
     * Where the graph points will lock to when they are dragged. default [0.5, 0.5]
     *
     * NOTE(kevinb): perseus_data.go defines this as Array<number>
     */
    snapStep?: [x: number, y: number];
    /**
     * An optional image to use in the background
     */
    backgroundImage?: PerseusImageBackground;
    /**
     * The type of markings to display on the graph.
     * - axes: shows the axes without the gride lines
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: MarkingsType;
    /**
     * How to label the X and Y axis.  default: ["x", "y"]
     */
    labels: string[];
    /**
     * Where to put the axis labels on the graph.  default: "onAxis"
     */
    labelLocation: AxisLabelLocation;
    /**
     * Whether to show the Protractor tool overlaid on top of the graph
     */
    showProtractor: boolean;
    /**
     * Whether to show the Ruler tool overlaid on top of the graph.
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    showRuler?: boolean;
    /**
     * Whether to show tooltips on the graph
     */
    showTooltips?: boolean;
    /**
     * The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft",
     * "yd", "mi".
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    rulerLabel?: string;
    /**
     * How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16. Must be
     * an integer.
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    rulerTicks?: number;
    /**
     * The X and Y coordinate ranges for the view of the graph.  default: [[-10, 10], [-10, 10]]
     *
     * NOTE(kevinb): perseus_data.go defines this as Array<Array<number>>
     */
    range: GraphRange;
    /**
     * Whether to show the arrows on the axis.
     */
    showAxisArrows: ShowAxisArrows;
    /**
     * Whether to show tick marks and tick numbers per axis.
     */
    showAxisTicks: ShowAxisTicks;
    /**
     * The type of graph
     */
    graph: PerseusGraphType;
    /**
     * The correct answer for this widget.
     */
    correct?: PerseusGraphType;
    /**
     * Shapes (points, chords, etc) displayed on the graph that cannot be moved
     * by the user.
     */
    lockedFigures: LockedFigure[];
    /**
     * Aria label that applies to the entire graph.
     */
    fullGraphAriaLabel?: string;
    /**
     * Aria description that applies to the entire graph.
     */
    fullGraphAriaDescription?: string;
};

export type Props = WidgetProps<
    InteractiveGraphProps,
    PerseusInteractiveGraphUserInput
>;

type DefaultProps = {
    labels: string[];
    labelLocation: Props["labelLocation"];
    range: Props["range"];
    showAxisArrows: Props["showAxisArrows"];
    showAxisTicks: Props["showAxisTicks"];
    step: Props["step"];
    backgroundImage: Props["backgroundImage"];
    markings: Props["markings"];
    showTooltips: Props["showTooltips"];
    showProtractor: Props["showProtractor"];
    userInput: Props["userInput"];
};

type State = any;

// Assert that the PerseusInteractiveGraphWidgetOptions parsed from JSON can be
// passed as props to this component. This ensures that the
// PerseusInteractiveGraphWidgetOptions type stays in sync with the prop types.
// The PropsFor<Component> type takes defaultProps into account, which is
// important because PerseusInteractiveGraphWidgetOptions has optional fields
// which receive defaults via defaultProps.
// eslint-disable-next-line no-restricted-syntax
0 as any as WidgetProps<
    PerseusInteractiveGraphWidgetOptions,
    PerseusInteractiveGraphUserInput
> satisfies PropsFor<typeof InteractiveGraph>;

// eslint-disable-next-line no-restricted-syntax
0 as any as WidgetProps<
    InteractiveGraphPublicWidgetOptions,
    PerseusInteractiveGraphUserInput
> satisfies PropsFor<typeof InteractiveGraph>;

class InteractiveGraph extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    mafsRef = React.createRef<StatefulMafsGraphType>();

    static defaultProps: DefaultProps = {
        labels: ["$x$", "$y$"],
        labelLocation: "onAxis",
        range: [
            [-10, 10],
            [-10, 10],
        ],
        showAxisArrows: {
            xMin: true,
            xMax: true,
            yMin: true,
            yMax: true,
        },
        showAxisTicks: {x: true, y: true},
        step: [1, 1],
        backgroundImage: defaultBackgroundImage,
        markings: "graph",
        showTooltips: false,
        showProtractor: false,
        userInput: {
            type: "linear",
        },
    };

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
        const {userInput: _, ...rest} = this.props;
        return {
            ...rest,
            graph: this.props.userInput,
        };
    }

    render() {
        const box = getInteractiveBoxFromSizeClass(
            this.props.containerSizeClass,
        );
        const gridStep =
            this.props.gridStep ||
            Util.getGridStep(this.props.range, this.props.step, box[0]);
        const snapStep =
            this.props.snapStep || Util.snapStepFromGridStep(gridStep);

        const mafsProps = {
            ...this.props,
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

        return (
            <>
                {this.props.graded === false && (
                    <p>{this.context.strings.ungradedInteractiveGraph}</p>
                )}
                <StatefulMafsGraph
                    {...mafsProps}
                    ref={this.mafsRef}
                    gridStep={gridStep}
                    snapStep={snapStep}
                    box={box}
                    showTooltips={!!this.props.showTooltips}
                    readOnly={this.props.apiOptions?.readOnly}
                    widgetId={this.props.widgetId}
                    graded={this.props.graded}
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
