/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var Util = require("../util.js");
var nestedMap = Util.nestedMap;
var deepEq = Util.deepEq;
var _ = require("underscore");

/**
 * A base class for all Graphie Movables
 *
 * Used for checking that all Graphie children are, in fact,
 * GraphieMovables
 */
function GraphieMovable(descriptor) {
    _.extend(this, descriptor);
}

var abstractMethod = function() {
    throw new Error("Abstract method! Must be implemented by Graphie Movable" +
            this.constructor.displayName);
};

_.extend(GraphieMovable.prototype, {
    movableProps: [],
    add: abstractMethod,
    modify: abstractMethod,
    remove: abstractMethod,
    toFront: function() { /* no op */ }
});


/**
 * returns cloned props modified with `children: childrenArray`
 */
var rewriteProps = function(props, childrenArray) {
    // Clone the props and add `children:`
    // childrenArray is always an array here because this is only called
    // from createClass, which initializes childrenArray as _.rest(arguments)
    return _.extend({}, props, {
        children: _.filter(_.flatten(childrenArray), _.identity)
    });
};


/**
 * Create a custom GraphieMovable class
 */
var createClass = function(spec) {
    var GraphieClass = function(props) {
        if (!(this instanceof GraphieClass)) {
            throw new Error("Use createElement or JSX with graphie movables");
        }
        this.props = rewriteProps(props, props.children || []);
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
var createSimpleClass = function(addFunction) {
    return createClass({
        displayName: addFunction.name || _.uniqueId("GraphieSimpleClass"),
        movableProps: ["children"],

        add: function(graphie) {
            this._elements = addFunction(graphie, this.props);
            this._prevProps = this.props;
        },

        modify: function(graphie) {
            if (!deepEq(this.props, this._prevProps)) {
                this.remove();
                this.add(graphie);
                this._prevProps = this.props;
                return "reordered";
            }
        },

        remove: function() {
            nestedMap(this._elements, (elem) => {
                if (elem) {
                    elem.remove();
                }
            });
            this._elements = null;
            this._prevProps = null;
        },

        toFront: function() {
            nestedMap(this._elements, (elem) => {
                if (_.isFunction(elem.toFront)) {
                    elem.toFront();
                }
            });
        }
    });
};


module.exports = {
    GraphieMovable: GraphieMovable,
    createClass: createClass,
    createSimpleClass: createSimpleClass
};
