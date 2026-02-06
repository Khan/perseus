import {approximateDeepEqual, Errors} from "@khanacademy/perseus-core";
import $ from "jquery";
import * as React from "react";
import _ from "underscore";

import InteractiveUtil from "../interactive2/interactive-util";
import {Log} from "../logging/log";
import Util from "../util";
import GraphUtils from "../util/graph-utils";
import {Graphie as GraphieDrawingContext} from "../util/graphie";

import GraphieClasses from "./graphie-classes";
import Movables from "./graphie-movables";

import type {Coord} from "../interactive2/types";
import type {Range, Size} from "@khanacademy/perseus-core";

const GraphieMovable = GraphieClasses.GraphieMovable;

const createGraphie = GraphUtils.createGraphie;
const {nestedMap} = Util;
const {assert} = InteractiveUtil;

type Props = {
    addMouseLayer?: boolean;
    box: Size;
    range: [Coord, Coord];
    ranges?: [Range, Range];
    gridStep?: [number, number];
    step?: [number, number];
    scale?: [number, number];

    isMobile?: boolean;
    responsive?: boolean;

    children?: React.ReactNode;

    options: any;

    setDrawingAreaAvailable?: (boolean) => void;
    setup: (
        graphie: any,
        options: {
            range: [Coord, Coord];
            scale: [number, number];
        },
    ) => void;

    onClick?: (at: Coord) => void;
    onMouseDown?: (at: Coord) => void;
    onMouseMove?: (at: Coord) => void;
};

type DefaultProps = {
    range: Props["range"];
    options: Props["options"];
    responsive: Props["responsive"];
    addMouseLayer: Props["addMouseLayer"];
};

interface Movable {
    remove(): void;
    props: unknown;
    modify(graphie: GraphieDrawingContext): "reordered" | undefined;
    toFront(): void;
}

class Graphie extends React.Component<Props> {
    graphieDivRef = React.createRef<HTMLDivElement>();
    _graphie: GraphieDrawingContext = new GraphieDrawingContext(
        document.createElement("div"),
    );
    _movables: Record<string, Movable> = {};
    movables: Record<string, Movable> = {};

    static defaultProps: DefaultProps = {
        range: [
            [-10, 10],
            [-10, 10],
        ],
        options: {},
        responsive: false,
        addMouseLayer: true,
    };

    componentDidMount() {
        this._setupGraphie();
        this._updateMovables();
    }

    shouldComponentUpdate(nextProps: Props): boolean {
        // NOTE(jeresig): Prior to the React 16 upgrade this was using deepEq
        // However it started to throw errors. I switched to use Underscore's
        // isEqual method instead, hopefully having a similar effect.
        return !_.isEqual(this.props, nextProps);
    }

    componentDidUpdate(prevProps: Props) {
        // If someone changes the setup function passed in, we should
        // technically setup graphie again. But that's definitely an
        // anti-pattern, since it is most-likely caused by passing in an
        // anonymous function rather than a "real" change, and re-rendering
        // in that case would cause us to constantly re-setup graphie, which
        // would have horrible performance implications. In order to avoid
        // those, we just warn here.
        if (this.props.setup !== prevProps.setup) {
            Log.error(
                "<Graphie> was given a new setup function. " +
                    "This is a bad idea; please refactor your code to give " +
                    "the same setup function reference to <Graphie> on " +
                    "every render.",
                Errors.Internal,
            );
        }
        if (
            !approximateDeepEqual(this.props.options, prevProps.options) ||
            !approximateDeepEqual(this.props.box, prevProps.box) ||
            !approximateDeepEqual(this.props.range, prevProps.range)
        ) {
            this._setupGraphie();
        }
        this._updateMovables();
    }

    /**
     * Allow parents of the <Graphie> component to grab a reference to the
     * underlying graphie object using
     * `this.refs.graphieComponent.getGraphie()`
     *
     * This shouldn't be necessary for 90% of cases, but the power is there.
     * Use it for good and not evil.
     */
    getGraphie: () => any = () => {
        return this._graphie;
    };

    // bounds-checked range
    _range: () => [Coord, Coord] = () => {
        const boundsCheckRange = (range: Coord): Coord => {
            if (range[0] >= range[1]) {
                return [-10, 10];
            }
            return range;
        };
        return [
            boundsCheckRange(this.props.range[0]),
            boundsCheckRange(this.props.range[1]),
        ];
    };

    _box: () => Size = () => {
        const ensureMinSize = (pixelDim: number): number => {
            // 340 = default size in the editor. exact value
            // is arbitrary; this is just a safety check.
            return pixelDim > 0 ? pixelDim : 340;
        };

        return [
            ensureMinSize(this.props.box[0]),
            ensureMinSize(this.props.box[1]),
        ];
    };

    // @ts-expect-error -  TS2322: Type '() => number[]' is not assignable to type '() => Coord'.
    _scale: () => Coord = () => {
        const box = this._box();
        const range = this._range();
        return box.map((pixelDim, i) => {
            const unitDim = range[i][1] - range[i][0];
            return pixelDim / unitDim;
        });
    };

    _setupGraphie: () => void = () => {
        this._removeMovables();

        const graphieDiv = this.graphieDivRef.current;
        if (graphieDiv == null || graphieDiv instanceof Text) {
            throw new Error("No graphie container div found");
        }
        graphieDiv.innerHTML = "";
        const graphie = (this._graphie = createGraphie(graphieDiv));

        // This has to be called before addMouseLayer. You can re-init
        // with graphInit later if you prefer
        graphie.init({
            range: this._range(),
            scale: this._scale(),
            isMobile: this.props.isMobile,
        });
        // Only add the mouselayer if we actually want one.
        if (this.props.addMouseLayer) {
            graphie.addMouseLayer({
                onClick: this.props.onClick,
                onMouseDown: this.props.onMouseDown,
                onMouseMove: this.props.onMouseMove,
                setDrawingAreaAvailable: this.props.setDrawingAreaAvailable,
            });
        }

        // @ts-expect-error - TS2339: Property 'snap' does not exist on type 'Graphie'.
        graphie.snap = this.props.options.snapStep || [1, 1];

        if (this.props.responsive) {
            // Overwrite fixed styles set in init()
            $(graphieDiv).css({width: "100%", height: "100%"});
            graphie.raphael.setSize("100%", "100%");
        }

        this.props.setup(
            graphie,
            _.extend(
                {
                    range: this._range(),
                    scale: this._scale(),
                },
                this.props.options,
            ),
        );
    };

    _removeMovables: () => void = () => {
        // _.invoke works even when this._movables is undefined
        _.invoke(this._movables, "remove");
        this._movables = {};
    };

    // @ts-expect-error - TS2322 - Type '(children: readonly any[], options: any) => ReactElement<any, string | JSXElementConstructor<any>> | readonly ReactElement<any, string | JSXElementConstructor<any>>[]' is not assignable to type '(children: readonly any[], arg2: any) => ReactElement<any, string | JSXElementConstructor<any>>'.
    _renderMovables: (
        children: ReadonlyArray<any>,
        arg2: {
            nextKey: number;
            graphie: GraphieDrawingContext;
            oldMovables: Record<string, Movable>;
            newMovables: Record<string, Movable>;
        },
    ) => React.ReactElement = (children, options) => {
        // Each leaf of `children` is a movable descriptor created by a call to
        // some `GraphieMovable`, such as `MovablePoint`.
        //
        // This function takes these descriptors and renders them into
        // on-screen movables, or updates on-screen movables for
        // descriptors when possible.
        //
        // If there is no movable with that key already, this descriptor is
        // stored in this._movables and promoted to an on-screen movable by
        // calling `child.add(graphie)`.
        //
        // If a movable of the same type with the same key exists already,
        // we take `child.props` and give them to the already-existing
        // on-screen movable, and call `movable.modify()`

        const graphie = options.graphie;
        const oldMovables = options.oldMovables;
        const newMovables = options.newMovables; /* output parameter */

        const renderChildren = (elem: any) => {
            _.each(elem.movableProps, (prop) => {
                // Render the children, and save the results of that
                // render to the appropriate props
                elem.props[prop] = this._renderMovables(
                    elem.props[prop],
                    options,
                );
            });
        };

        // Add/modify movables

        // We want to keep track of whether we have added a new svg element,
        // because if we have, then we need to call .toFront() on any svg
        // elements occurring afterwards. If this happens, we set
        // `areMovablesOutOfOrder` to true:
        let areMovablesOutOfOrder = false;
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
        return nestedMap(children, (childDescriptor) => {
            if (!childDescriptor) {
                // Still increment the key to avoid cascading key changes
                // on hiding/unhiding children, i.e. by using
                // {someBoolean && <MovablePoint />}
                options.nextKey++;
                // preserve the null/undefined in the resulting array
                return childDescriptor;
            }

            // Instantiate the descriptor to turn it into a real Movable
            const child = new childDescriptor.type(childDescriptor.props);
            assert(
                child instanceof GraphieMovable,
                "All children of a Graphie component must be Graphie " +
                    "movables",
            );

            // Give each child a key
            const keyProp = childDescriptor.key;
            const key = keyProp == null ? "_no_id_" + options.nextKey : keyProp;
            options.nextKey++;
            const ref = childDescriptor.ref;

            // We render our children first. This allows us to replace any
            // `movableProps` on our child with the on-screen movables
            // corresponding with those descriptors.
            renderChildren(child);

            const prevMovable = oldMovables[key];
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (!prevMovable) {
                // We're creating a new child
                child.add(graphie);
                areMovablesOutOfOrder = true;

                newMovables[key] = child;
            } else if (child.constructor === prevMovable.constructor) {
                // We're updating an old child
                prevMovable.props = child.props;
                const modifyResult = prevMovable.modify(graphie);
                if (modifyResult === "reordered") {
                    areMovablesOutOfOrder = true;
                }

                newMovables[key] = prevMovable;
            } else {
                // We're destroying an old child and replacing it
                // with a new child of a different type

                // This generally is a bad idea, so warn about it if this
                // is being caused by implicit keys
                if (keyProp == null) {
                    Log.error(
                        "Replacing a <Graphie> child with a " +
                            "child of a different type. Please add keys " +
                            "to your <Graphie> children",
                        Errors.Internal,
                    );
                }

                prevMovable.remove();
                child.add(graphie);
                areMovablesOutOfOrder = true;

                newMovables[key] = child;
            }

            if (areMovablesOutOfOrder) {
                newMovables[key].toFront();
            }

            if (ref) {
                this.movables[ref] = newMovables[key];
            }

            return newMovables[key];
        });
    };

    // Sort of like react diffing, but for movables
    _updateMovables: () => void = () => {
        const graphie = this._graphie;

        const oldMovables = this._movables;
        const newMovables: Record<string, any> = {};
        this._movables = newMovables;
        this.movables = {};

        // @ts-expect-error - TS2345 - Argument of type 'ReactNode' is not assignable to parameter of type 'readonly any[]'.
        this._renderMovables(this.props.children, {
            nextKey: 1,
            graphie: graphie,
            oldMovables: oldMovables,
            newMovables: newMovables,
        });

        // Remove any movables that no longer exist in the child array
        _.each(oldMovables, (oldMovable, key) => {
            if (!newMovables[key]) {
                oldMovable.remove();
            }
        });
    };

    render(): React.ReactNode {
        return (
            <div className="graphie-container">
                <div className="graphie" ref={this.graphieDivRef} />
            </div>
        );
    }
}

// Attach Graphie.createClass and Graphie.createSimpleClass
_.extend(Graphie, GraphieClasses);
// Attach the Movable react components for easy reference
_.extend(Graphie, Movables);

export default Graphie;
