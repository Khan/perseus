/* eslint-disable @babel/no-invalid-this, react/no-unsafe, react/sort-comp */
import {
    Errors,
    getInteractiveGraphPublicWidgetOptions,
    PerseusError,
} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import Util from "../util";
import {getInteractiveBoxFromSizeClass} from "../util/sizing-utils";
import {getPromptJSON} from "../widget-ai-utils/interactive-graph/interactive-graph-ai-utils";

import {StatefulMafsGraph} from "./interactive-graphs";

import type {StatefulMafsGraphType} from "./interactive-graphs/stateful-mafs-graph";
import type {WidgetExports, WidgetProps} from "../types";
import type {InteractiveGraphPromptJSON} from "../widget-ai-utils/interactive-graph/interactive-graph-ai-utils";
import type {UnsupportedWidgetPromptJSON} from "../widget-ai-utils/unsupported-widget";
import type {
    PerseusGraphType,
    PerseusInteractiveGraphWidgetOptions,
    GraphRange,
    LockedFigure,
    PerseusImageBackground,
    MarkingsType,
} from "@khanacademy/perseus-core";
import type {
    PerseusInteractiveGraphRubric,
    PerseusInteractiveGraphUserInput,
} from "@khanacademy/perseus-score";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const defaultBackgroundImage = {
    url: null,
};

// Sample background image:
// https://ka-perseus-graphie.s3.amazonaws.com/29c1b0fcd17fe63df0f148fe357044d5d5c7d0bb.png

function capitalize(str) {
    return str.replace(/(?:^|-)(.)/g, function (match, letter) {
        return letter.toUpperCase();
    });
}

type RenderProps = {
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
    labels: ReadonlyArray<string>;
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
    // TODO(kevinb): Add a transform function to interactive-graph.jsx to
    // rename `range` to `ranges` so that things are less confusing.
    range: GraphRange;
    /**
     * The type of graph
     */
    graph: PerseusGraphType;
    /**
     * The correct kind of graph, if being used to select function type
     */
    // TODO(LEMS-2344): make the type of `correct` more specific
    correct: PerseusGraphType;
    /**
     * Shapes (points, chords, etc) displayed on the graph that cannot be moved
     * by the user.
     */
    lockedFigures?: ReadonlyArray<LockedFigure>;
    /**
     * Aria label that applies to the entire graph.
     */
    fullGraphAriaLabel?: string;
    /**
     * Aria description that applies to the entire graph.
     */
    fullGraphAriaDescription?: string;
}; // There's no transform function in exports
type Props = WidgetProps<RenderProps, PerseusInteractiveGraphRubric>;
type State = any;
type DefaultProps = {
    labels: ReadonlyArray<string>;
    range: Props["range"];
    step: Props["step"];
    backgroundImage: Props["backgroundImage"];
    markings: Props["markings"];
    showTooltips: Props["showTooltips"];
    showProtractor: Props["showProtractor"];
    graph: Props["graph"];
};

// Assert that the PerseusInteractiveGraphWidgetOptions parsed from JSON can be
// passed as props to this component. This ensures that the
// PerseusInteractiveGraphWidgetOptions type stays in sync with the prop types.
// The PropsFor<Component> type takes defaultProps into account, which is
// important because PerseusInteractiveGraphWidgetOptions has optional fields
// which receive defaults via defaultProps.
0 as any as WidgetProps<
    PerseusInteractiveGraphWidgetOptions,
    PerseusInteractiveGraphRubric
> satisfies PropsFor<typeof InteractiveGraph>;

class InteractiveGraph extends React.Component<Props, State> {
    mafsRef = React.createRef<StatefulMafsGraphType>();

    static defaultProps: DefaultProps = {
        labels: ["x", "y"],
        range: [
            [-10, 10],
            [-10, 10],
        ],
        step: [1, 1],
        backgroundImage: defaultBackgroundImage,
        markings: "graph",
        showTooltips: false,
        showProtractor: false,
        graph: {
            type: "linear",
        },
    };

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

    render() {
        const box = getInteractiveBoxFromSizeClass(
            this.props.containerSizeClass,
        );
        const gridStep =
            this.props.gridStep ||
            Util.getGridStep(this.props.range, this.props.step, box[0]);
        const snapStep =
            this.props.snapStep || Util.snapStepFromGridStep(gridStep);

        return (
            <StatefulMafsGraph
                {...this.props}
                ref={this.mafsRef}
                gridStep={gridStep}
                snapStep={snapStep}
                box={box}
                showTooltips={!!this.props.showTooltips}
                readOnly={this.props.apiOptions?.readOnly}
            />
        );
    }

    static getEquationString(props: Props): string {
        const type = props.graph.type;
        const funcName = "get" + capitalize(type) + "EquationString";
        return InteractiveGraph[funcName](props);
    }
}

// We don't need to change any of the original props for static mode
const staticTransform = _.identity;

export default {
    name: "interactive-graph",
    displayName: "Interactive graph (Assessments only)",
    widget: InteractiveGraph,
    staticTransform: staticTransform,
    getPublicWidgetOptions: getInteractiveGraphPublicWidgetOptions,
} satisfies WidgetExports<typeof InteractiveGraph>;
