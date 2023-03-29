import $ from "jquery";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import InteractiveUtil from '../interactive2/interactive-util';
import {Errors, Log} from '../logging/log';
import Util from '../util';
import GraphUtils from '../util/graph-utils';

import GraphieClasses from './graphie-classes';
import Movables from './graphie-movables';

const GraphieMovable = GraphieClasses.GraphieMovable;

const createGraphie = GraphUtils.createGraphie;
const {deepEq, nestedMap} = Util;
const {assert} = InteractiveUtil;

type Props = any;

class Graphie extends React.Component<Props> {
    static propTypes = {
        addMouseLayer: PropTypes.bool,
        box: PropTypes.arrayOf(PropTypes.number).isRequired,
        children: PropTypes.node,
        isMobile: PropTypes.bool,
        onClick: PropTypes.func,
        onMouseDown: PropTypes.func,
        onMouseMove: PropTypes.func,
        onMouseUp: PropTypes.func,
        options: PropTypes.shape({
            snapStep: PropTypes.arrayOf(PropTypes.number),
        }),
        range: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        responsive: PropTypes.bool,
        setDrawingAreaAvailable: PropTypes.func,
        setup: PropTypes.func.isRequired,
    };

    static defaultProps: any = {
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
            !deepEq(this.props.options, prevProps.options) ||
            !deepEq(this.props.box, prevProps.box) ||
            !deepEq(this.props.range, prevProps.range)
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
    _range: () => ReadonlyArray<[number, number]> = () => {
        return _.map(this.props.range, (dimRange) => {
            if (dimRange[0] >= dimRange[1]) {
                return [-10, 10];
            }
            return dimRange;
        });
    };

    _box: () => ReadonlyArray<number> = () => {
        return _.map(this.props.box, (pixelDim) => {
            // 340 = default size in the editor. exact value
            // is arbitrary; this is just a safety check.
            return pixelDim > 0 ? pixelDim : 340;
        });
    };

    _scale: () => ReadonlyArray<number> = () => {
        const box = this._box();
        const range = this._range();
        return _.map(box, (pixelDim, i) => {
            const unitDim = range[i][1] - range[i][0];
            return pixelDim / unitDim;
        });
    };

    _setupGraphie: () => void = () => {
        this._removeMovables();

        // eslint-disable-next-line react/no-string-refs
        const graphieDiv = ReactDOM.findDOMNode(this.refs.graphieDiv);
        $(graphieDiv).empty();
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
                onMouseUp: this.props.onMouseUp,
                onMouseMove: this.props.onMouseMove,
                setDrawingAreaAvailable: this.props.setDrawingAreaAvailable,
            });
        }

        graphie.snap = this.props.options.snapStep || [1, 1];

        if (this.props.responsive) {
            // Overwrite fixed styles set in init()
            // TODO(alex): Either make this component always responsive by
            // itself, or always wrap it in other components so that it is.
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

    _renderMovables: (children: ReadonlyArray<any>, arg2: any) => React.ReactElement = (children, options) => {
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

    render(): React.ReactElement {
        return (
            <div className="graphie-container">
                {/* eslint-disable-next-line react/no-string-refs */}
                <div className="graphie" ref="graphieDiv" />
            </div>
        );
    }
}

// Attach Graphie.createClass and Graphie.createSimpleClass
_.extend(Graphie, GraphieClasses);
// Attach the Movable react components for easy reference
_.extend(Graphie, Movables);

export default Graphie;
