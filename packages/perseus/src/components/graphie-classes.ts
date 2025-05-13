/* eslint-disable @typescript-eslint/no-invalid-this */

import {
    approximateDeepEqual,
    Errors,
    PerseusError,
} from "@khanacademy/perseus-core";
import _ from "underscore";

import Util from "../util";

const nestedMap = Util.nestedMap;

/**
 * A base class for all Graphie Movables
 *
 * Used for checking that all Graphie children are, in fact,
 * GraphieMovables
 */
function GraphieMovable(descriptor: any) {
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    _.extend(this, descriptor);
}

const abstractMethod = function () {
    throw new PerseusError(
        "Abstract method! Must be implemented by Graphie Movable" +
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            this.constructor.displayName,
        Errors.NotAllowed,
    );
};

_.extend(GraphieMovable.prototype, {
    movableProps: [],
    add: abstractMethod,
    modify: abstractMethod,
    remove: abstractMethod,
    toFront: function () {
        /* no op */
    },
    componentDidMount: function () {
        /* no op */
        // Note: this method is here to trick react-hot-loader into thinking
        // components built from extending GraphieMovable are recognized as
        // class base React components so that they get wrapped correctly.
        // See https://github.com/gaearon/react-hot-loader/blob/master/src/internal/reactUtils.js#L14-L26
        // for details of how react-hot-loader determines whether something is
        // a React class (component).
    },
});

/**
 * returns cloned props modified with `children: childrenArray`
 */
const rewriteProps = function (props: any, childrenArray: any) {
    // Clone the props and add `children:`
    // childrenArray is always an array here because this is only called
    // from createClass, which initializes childrenArray as _.rest(arguments)
    return _.extend({}, props, {
        children: _.filter(_.flatten(childrenArray), _.identity),
    });
};

/**
 * Create a custom GraphieMovable class
 */
const createClass = function (spec: any): any {
    const GraphieClass = function (props: any) {
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        if (!(this instanceof GraphieClass)) {
            throw new PerseusError(
                "Use createElement or JSX with graphie movables",
                Errors.NotAllowed,
            );
        }
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.props = rewriteProps(props, props.children || []);
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        return this;
    };

    spec.displayName = spec.displayName || _.uniqueId("GraphieClass");

    // Add the displayName to the constructor for compatibility with
    // React's myDescriptor.constructor.displayName
    GraphieClass.displayName = spec.displayName;

    GraphieClass.prototype = new GraphieMovable(spec);
    GraphieClass.prototype.constructor = GraphieClass;

    return GraphieClass;
};

/**
 * Create a GraphieMovable class from a function that describes
 * how to add said class to a graphie, and returns an array of
 * `.remove()`able elements to be used when a remove() or
 * modify() is called.
 *
 * This convenience method creates an inefficient class, although
 * it does check for a difference in this.props and prevProps before
 * removing and re-adding itself.
 *
 * The primary benefit of this is being able to very easily create
 * a wrapper for old graphie code to make it interface with <Graphie>
 *
 * Commonly used elements should use the fully-fledged createClass
 * and implement an efficient modify() operation.
 */
const createSimpleClass = function (addFunction: any): any {
    return createClass({
        displayName: addFunction.name || _.uniqueId("GraphieSimpleClass"),
        movableProps: ["children"],

        add: function (graphie) {
            this._elements = addFunction(graphie, this.props);
            this._prevProps = this.props;
        },

        modify: function (graphie) {
            if (!approximateDeepEqual(this.props, this._prevProps)) {
                this.remove();
                this.add(graphie);
                this._prevProps = this.props;
                return "reordered";
            }
        },

        remove: function () {
            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
            nestedMap(this._elements, (elem) => {
                if (elem) {
                    elem.remove();
                }
            });
            this._elements = null;
            this._prevProps = null;
        },

        toFront: function () {
            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
            nestedMap(this._elements, (elem) => {
                if (_.isFunction(elem.toFront)) {
                    elem.toFront();
                }
            });
        },
    });
};

export default {
    GraphieMovable: GraphieMovable,
    createClass: createClass,
    createSimpleClass: createSimpleClass,
};
