var React = require('react');
var _ = require("underscore");

var Graph         = require("../components/graph.jsx");
var GraphSettings = require("../components/graph-settings.jsx");
var InfoTip       = require("react-components/info-tip.jsx");
var NumberInput   = require("../components/number-input.jsx");
var MathOutput    = require("../components/math-output.jsx");
var PropCheckBox  = require("../components/prop-check-box.jsx");
var TeX           = require("react-components/tex.jsx");

var ApiOptions = require("../perseus-api.jsx").Options;

var ROTATE_SNAP_DEGREES = 15;
var DEGREE_SIGN = "\u00B0";
var RENDER_TRANSFORM_DELAY_IN_MS = 300;
var ROTATE_HANDLE_DIST = 1.5;
var REFLECT_ROTATE_HANDLE_DIST = 2;
var REFLECT_BUTTON_SIZE = 1;

var deepEq = require("../util.js").deepEq;
var getGridStep = require("../util.js").getGridStep;
var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

var knumber = require("kmath").number;
var kvector = require("kmath").vector;
var kpoint = require("kmath").point;
var kray = require("kmath").ray;
var kline = require("kmath").line;

var assert = require("../interactive2/interactive-util.js").assert;

var defaultBoxSize = 400;
var defaultBackgroundImage = {
    url: null
};

function arraySum(array) {
    return _.reduce(array, function(memo, arg) { return memo + arg; }, 0);
}

/* Does a pluck on keys inside objects in an object
 *
 * Ex:
 * tools = {
 *     translation: {
 *         enabled: true
 *     },
 *     rotation: {
 *         enabled: false
 *     }
 * };
 * pluckObject(tools, "enabled") returns {
 *     translation: true
 *     rotation: false
 * }
 */
function pluckObject(object, subKey) {
    return _.object(_.map(object, function (value, key) {
        return [key, value[subKey]];
    }));
}


var defaultGraphProps = function(setProps, boxSize) {
    setProps = setProps || {};
    var labels = setProps.labels || ["x", "y"];
    var range = setProps.range || [[-10, 10], [-10, 10]];
    var step = setProps.step || [1, 1];
    var gridStep = setProps.gridStep ||
               getGridStep(range, step, boxSize);
    return {
        box: [boxSize, boxSize],
        labels: labels,
        range: range,
        step: step,
        gridStep: gridStep,
        valid: true,
        backgroundImage: defaultBackgroundImage,
        markings: "grid",
        showProtractor: false
    };
};

var defaultTransformerProps = {
    apiOptions: ApiOptions.defaults,
    gradeEmpty: false,
    graphMode: "interactive",
    listMode: "dynamic",
    graph: {},
    tools: {
        translation: {
            enabled: true,
            required: false,
            constraints: {}
        },
        rotation: {
            enabled: true,
            required: false,
            constraints: {
                fixed: false
            },
            coord: [1, 6]
        },
        reflection: {
            enabled: true,
            required: false,
            constraints: {
                fixed: false
            },
            coords: [[2, -4], [2, 2]]
        },
        dilation: {
            enabled: true,
            required: false,
            constraints: {
                fixed: false
            },
            coord: [6, 6]
        }
    },
    drawSolutionShape: true,
    starting: {
        shape: {
            type: "polygon-3",
            coords: [[2, 2], [2, 6], [7, 2]],
        },
        transformations: []
    },
    correct: {
        shape: {
            type: "polygon-3",
            coords: [[2, 2], [2, 6], [7, 2]],
        },
        transformations: []
    }
};

function colorForTool(tool) {
    return tool.constraints.fixed ? KhanUtil.DYNAMIC
                                  : KhanUtil.INTERACTIVE;
}


/* Scales a distance from the default range of
 * [-10, 10] to a given props.range pair
 *
 * Used for sizing various transformation tools
 * (rotation handle, dilation circle)
 */
function scaleToRange(dist, range) {
    var spreadX = range[0][1] - range[0][0];
    var spreadY = range[1][1] - range[1][0];

    return dist * Math.max(spreadX, spreadY) / 20;
}

function dilatePointFromCenter(point, dilationCenter, scale) {
    var pv = kvector.subtract(point, dilationCenter);
    var pvScaled = kvector.scale(pv, scale);
    var transformedPoint = kvector.add(dilationCenter, pvScaled);
    return transformedPoint;
}

// TODO(jack): i18nize this
function stringFromDecimal(number) {
    return String(KhanUtil.roundTo(9, number));
}

function stringFromFraction(number) {
    var frac = KhanUtil.toFraction(number, knumber.DEFAULT_TOLERANCE);
    if (frac[1] === 1) {
        return stringFromDecimal(number);
    } else {
        return stringFromDecimal(frac[0]) + "/" +
                stringFromDecimal(frac[1]);
    }
}

function texFromPoint(point) {
    return [
        <TeX>{"("}</TeX>,
        stringFromDecimal(point[0]),
        <TeX>{", {}"}</TeX>,
        stringFromDecimal(point[1]),
        <TeX>{")"}</TeX>
    ];
}

function texFromVector(vector) {
    return [
        <TeX>{"\\langle"}</TeX>,
        stringFromDecimal(vector[0]),
        <TeX>{", {}"}</TeX>,
        stringFromDecimal(vector[1]),
        <TeX>{"\\rangle"}</TeX>
    ];
}

function texFromAngleDeg(angleDeg) {
    return stringFromDecimal(angleDeg) + DEGREE_SIGN;
}

function orderInsensitiveCoordsEqual(coords1, coords2) {
    coords1 = _.clone(coords1).sort(kpoint.compare);
    coords2 = _.clone(coords2).sort(kpoint.compare);
    return _.all(_.map(coords1, function(coord1, i) {
        var coord2 = coords2[i];
        return kpoint.equal(coord1, coord2);
    }));
}



/* Perform operations on raw transform objects */
var TransformOps = {
    apply: function(transform) {
        // Any transformation with empty text boxes is a no-op until
        // filled out (these show up as nulls in transform.vector/line/etc).
        // TODO (jack): Merge this just into reflections now that other
        // transforms are always valid (after merging transformation
        // collapsing, which may use isValid)
        if (!Transformations[transform.type].isValid(transform)) {
            return _.identity;  // do not transform the coord
        } else {
            return Transformations[transform.type].apply(transform);
        }
    },

    append: function(transformList, newTransform) {
        // Append newTransform to transformList, and collapse the last
        // two transforms if they are collapsable
        var results = TransformOps._appendAndCollapseLastTwo(
            transformList,
            newTransform
        );
        // Collapse any no-ops at the end of the transformation list
        return TransformOps._collapseFinalNoOps(results);
    },

    _collapseFinalNoOps: function(transforms) {
        // Collapse no-op transformations at the end of the list
        if (transforms.length && TransformOps.isNoOp(_.last(transforms))) {
            return _.initial(transforms);
        } else {
            return transforms;
        }
    },

    _appendAndCollapseLastTwo: function(transformList, newTransform) {
        if (!transformList.length) {
            return [newTransform];
        } else {
            var collapsed = TransformOps.collapse(
                _.last(transformList),
                newTransform
            );
            return _.initial(transformList).concat(collapsed);
        }
    },

    isNoOp: function(transform) {
        return Transformations[transform.type].isNoOp(transform);
    },

    collapse: function(transform1, transform2) {
        // We can only collapse transforms that have the same type
        if (transform1.type !== transform2.type) {
            return [transform1, transform2];
        }

        // Clicking the button again removes empty transformations
        if (TransformOps.isEmpty(transform1) &&
                TransformOps.isEmpty(transform2)) {
            return [];
        }

        // Don't collapse invalid transformations otherwise
        if (!TransformOps.isValid(transform1) ||
                !TransformOps.isValid(transform2)) {
            return [transform1, transform2];
        }

        return TransformOps._collapseValidMonotypedTransforms(
            transform1,
            transform2
        );
    },

    isValid: function(transform) {
        return Transformations[transform.type].isValid(transform);
    },

    isEmpty: function(transform) {
        return Transformations[transform.type].isEmpty(transform);
    },

    _collapseValidMonotypedTransforms: function(transform1, transform2) {
        var collapsed = Transformations[transform1.type].collapse(
            transform1,
            transform2
        );
        if (collapsed) {
            // Force all answers into an array
            if (!_.isArray(collapsed)) {
                collapsed = [collapsed];
            }
            // Add types to all transforms in the answer
            _.each(collapsed, function(transform) {
                transform.type = transform1.type;
            });
            return collapsed;
        } else {
            // These transforms can't be collapsed together
            return [transform1, transform2];
        }
    },

    toTeX: function(transform) {
        return Transformations[transform.type].toTeX(transform);
    },

    /* A react representation of this transform object */
    ListItem: React.createClass({
        render: function() {
            if (this.props.mode === "dynamic") {
                return <div>
                    {TransformOps.toTeX(this.props.transform)}
                </div>;
            } else if (this.props.mode === "interactive") {
                var transformClass =
                        Transformations[this.props.transform.type].Input;
                return transformClass(_.extend({
                    ref: "transform",
                    onChange: this.handleChange,
                    onFocus: this.props.onFocus,
                    onBlur: this.props.onBlur,
                    apiOptions: this.props.apiOptions
                }, this.props.transform));
            } else {
                throw new Error("Invalid mode: " + this.props.mode);
            }
        },
        value: function() {
            if (this.props.mode === "interactive") {
                return _.extend({
                    type: this.props.transform.type,
                }, this.refs.transform.value());
            } else {
                return this.props.transform;
            }
        },
        handleChange: _.debounce(function(callback) {
            this.props.onChange(this.value(), callback);
        }, RENDER_TRANSFORM_DELAY_IN_MS),

        /* InputPath API: depending on the API call, this could involve simply
         * navigating to the right ref and calling the function on that
         * component, or threading the call down and returning the result. */
        _getComponentAtPath: function(path) {
            var transform = this.refs.transform;
            var ref = _.head(path);
            return transform.refs[ref];
        },
        focus: function() {
            var transform = this.refs.transform;
            var path = _.head(transform.getInputPaths());
            if (path) {
                this.focusInputPath(path);
            }
        },
        focusInputPath: function(path) {
            this._getComponentAtPath(path).focus();
        },
        blurInputPath: function(path) {
            this._getComponentAtPath(path).blur();
        },
        getDOMNodeForPath: function(path) {
            return this._getComponentAtPath(path).getDOMNode();
        },
        getGrammarTypeForPath: function(path) {
            return "number";
        },
        setInputValue: function(path, value, cb) {
            this.refs.transform.setInputValue(path, value, cb);
        },
        getInputPaths: function() {
            return this.refs.transform.getInputPaths();
        },

        statics: {
            displayMode: "block"
        }
    })
};

var Transformations = {
    translation: {
        // I18N: As in the command, "Translate the polygon"
        verbName: $._("Translate"),
        nounName: $._("Translation"),
        lowerNounName: $._("translation"),
        apply: function(transform) {
            return function(coord) {
                return kvector.add(coord, transform.vector);
            };
        },
        isValid: function(transform) {
            return _.isFinite(transform.vector[0]) &&
                _.isFinite(transform.vector[1]);
        },
        isEmpty: function(transform) {
            return transform.vector[0] === null &&
                transform.vector[1] === null;
        },
        isNoOp: function(transform) {
            return kvector.equal(transform.vector, [0, 0]);
        },
        collapse: function(transform1, transform2) {
            return {
                vector: kvector.add(
                    transform1.vector,
                    transform2.vector
                )
            };
        },
        toTeX: function(transform) {
            // I18N: As in the command, "Translation by <3, 1>"
            return <$_ vector={texFromVector(transform.vector)}>
                Translation by %(vector)s
            </$_>;
        },
        Input: React.createClass({
            getInitialState: function() {
                return {
                    vector: this.props.vector || [null, null]
                };
            },
            componentDidUpdate: function(prevProps) {
                if (!deepEq(this.props, prevProps)) {
                    this.setState({vector: this.props.vector});
                }
            },
            render: function() {
                var InputComponent = (this.props.apiOptions.staticRender) ?
                        MathOutput :
                        NumberInput;
                var vector = [
                    <TeX>\langle</TeX>,
                    <InputComponent
                        ref="x"
                        placeholder={0}
                        value={this.state.vector[0]}
                        useArrowKeys={true}
                        onChange={(val0) => {
                            var val1 = this.state.vector[1];
                            this.setState({vector: [val0, val1]}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "x")}
                        onBlur={_.partial(this.props.onBlur, "x")} />,
                    <TeX>{", {}"}</TeX>,
                    <InputComponent
                        ref="y"
                        placeholder={0}
                        value={this.state.vector[1]}
                        useArrowKeys={true}
                        onChange={(val1) => {
                            var val0 = this.state.vector[0];
                            this.setState({vector: [val0, val1]}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "y")}
                        onBlur={_.partial(this.props.onBlur, "y")} />,
                    <TeX>\rangle</TeX>
                ];
                return <div>
                    <$_ vector={vector}>
                        Translation by %(vector)s
                    </$_>
                </div>;
            },
            value: function() {
                var x = this.refs.x.getValue();
                var y = this.refs.y.getValue();
                return {
                    vector: [x, y]
                };
            },
            /* InputPath API */
            setInputValue: function(path, value, cb) {
                var id = _.first(path);
                var vector = _.clone(this.state.vector);
                if (id === "x") {
                    vector[0] = value;
                } else if (id === "y") {
                    vector[1] = value;
                }
                this.setState({vector: vector}, () => {
                    this.props.onChange(cb);
                });
            },
            getInputPaths: function() {
                return [["x"], ["y"]];
            }
        })
    },

    rotation: {
        // I18N: As in the command, "Rotate the polygon"
        verbName: $._("Rotate"),
        nounName: $._("Rotation"),
        lowerNounName: $._("rotation"),
        apply: function(transform) {
            return function(coord) {
                return kpoint.rotateDeg(coord, transform.angleDeg,
                        transform.center);
            };
        },
        isValid: function(transform) {
            return _.isFinite(transform.angleDeg) &&
                _.isFinite(transform.center[0]) &&
                _.isFinite(transform.center[1]);
        },
        isEmpty: function(transform) {
            return transform.angleDeg === null &&
                transform.center[0] === null &&
                transform.center[1] === null;
        },
        isNoOp: function(transform) {
            return knumber.equal(transform.angleDeg, 0);
        },
        collapse: function(transform1, transform2) {
            if (!kpoint.equal(transform1.center, transform2.center)) {
                return false;
            }
            return {
                center: transform1.center,
                angleDeg: transform1.angleDeg + transform2.angleDeg
            };
        },
        toTeX: function(transform) {
            return <$_ degrees={texFromAngleDeg(transform.angleDeg)}
                       point={texFromPoint(transform.center)}>
                Rotation by %(degrees)s about %(point)s
            </$_>;
        },
        Input: React.createClass({
            getInitialState: function() {
                return {
                    center: this.props.center || [null, null],
                    angleDeg: this.props.angleDeg || null
                };
            },
            componentDidUpdate: function(prevProps) {
                if (!deepEq(this.props, prevProps)) {
                    this.setState({
                        center: this.props.center,
                        angleDeg: this.props.angleDeg
                    });
                }
            },
            render: function() {
                var InputComponent = (this.props.apiOptions.staticRender) ?
                        MathOutput :
                        NumberInput;
                var point = [
                    <TeX>(</TeX>,
                    <InputComponent
                        ref="centerX"
                        placeholder={0}
                        value={this.state.center[0]}
                        useArrowKeys={true}
                        onChange={(val0) => {
                            var val1 = this.state.center[1];
                            this.setState({center: [val0, val1]}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "centerX")}
                        onBlur={_.partial(this.props.onBlur, "centerX")} />,
                    <TeX>{", {}"}</TeX>,
                    <InputComponent
                        ref="centerY"
                        placeholder={0}
                        value={this.state.center[1]}
                        useArrowKeys={true}
                        onChange={(val1) => {
                            var val0 = this.state.center[0];
                            this.setState({center: [val0, val1]}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "centerY")}
                        onBlur={_.partial(this.props.onBlur, "centerY")} />,
                    <TeX>)</TeX>
                ];
                var degrees = [
                    <InputComponent
                        ref="angleDeg"
                        placeholder={0}
                        value={this.state.angleDeg}
                        useArrowKeys={true}
                        onChange={(val) => {
                            this.setState({angleDeg: val}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "angleDeg")}
                        onBlur={_.partial(this.props.onBlur, "angleDeg")} />,
                    DEGREE_SIGN
                ];
                // I18N: %(point)s must come before %(degrees)s in this phrase
                var text = <$_ point={point} degrees={degrees}>
                    Rotation about %(point)s by %(degrees)s
                </$_>;

                return <div>{text}</div>;
            },
            value: function() {
                var angleDeg = this.refs.angleDeg.getValue();
                var centerX = this.refs.centerX.getValue();
                var centerY = this.refs.centerY.getValue();
                return {
                    angleDeg: angleDeg,
                    center: [centerX, centerY]
                };
            },
            /* InputPath API */
            setInputValue: function(path, value, cb) {
                var id = _.first(path);
                var angleDeg = _.clone(this.state.angleDeg);
                var center = _.clone(this.state.center);
                if (id === "angleDeg") {
                    angleDeg = value;
                } else if (id === "centerX") {
                    center[0] = value;
                } else if (id === "centerY") {
                    center[1] = value;
                }
                this.setState({angleDeg: angleDeg, center: center}, () => {
                    this.props.onChange(cb);
                });
            },
            getInputPaths: function() {
                return [["centerX"], ["centerY"], ["angleDeg"]];
            }
        })
    },

    reflection: {
        // I18N: As in the command, "Reflect the polygon"
        verbName: $._("Reflect"),
        nounName: $._("Reflection"),
        lowerNounName: $._("reflection"),
        apply: function(transform) {
            return function(coord) {
                return kpoint.reflectOverLine(
                    coord,
                    transform.line
                );
            };
        },
        isValid: function(transform) {
            // A bit hacky, but we'll also define reflecting over a
            // single point as a no-op, to avoid NaN fun.
            return _.all(_.flatten(transform.line), _.isFinite) &&
                    !kpoint.equal(transform.line[0], transform.line[1]);
        },
        isEmpty: function(transform) {
            return _.all(_.flatten(transform.line), _.isNull);
        },
        isNoOp: function(transform) {
            // Invalid transforms are implicitly no-ops, so we don't
            // have to catch that case here.
            return false;
        },
        collapse: function(transform1, transform2) {
            if (!kline.equal(transform1.line, transform2.line)) {
                return false;
            }
            return [];
        },
        toTeX: function(transform) {
            var point1 = transform.line[0];
            var point2 = transform.line[1];
            return <$_ point1={texFromPoint(point1)}
                       point2={texFromPoint(point2)}>
                Reflection over the line from %(point1)s to %(point2)s
            </$_>;
        },
        Input: React.createClass({
            getInitialState: function() {
                return {
                    line: this.props.line || [[null, null], [null, null]]
                };
            },
            componentDidUpdate: function(prevProps) {
                if (!deepEq(this.props, prevProps)) {
                    this.setState({line: this.props.line});
                }
            },
            render: function() {
                var InputComponent = (this.props.apiOptions.staticRender) ?
                        MathOutput :
                        NumberInput;
                var point1 = [<TeX>(</TeX>,
                    <InputComponent
                        ref="x1"
                        value={this.state.line[0][0]}
                        useArrowKeys={true}
                        onChange={this.changePoint.bind(this, 0, 0)}
                        onFocus={_.partial(
                            this.props.onFocus, "x1"
                        )}
                        onBlur={_.partial(
                            this.props.onBlur, "x1"
                        )}/>,
                    <TeX>{", {}"}</TeX>,
                    <InputComponent
                        ref="y1"
                        value={this.state.line[0][1]}
                        useArrowKeys={true}
                        onChange={this.changePoint.bind(this, 0, 1)}
                        onFocus={_.partial(this.props.onFocus, "y1")}
                        onBlur={_.partial(this.props.onBlur, "y1")}/>,
                    <TeX>)</TeX>
                ];
                var point2 = [<TeX>(</TeX>,
                    <InputComponent
                        ref="x2"
                        value={this.state.line[1][0]}
                        useArrowKeys={true}
                        onChange={this.changePoint.bind(this, 1, 0)}
                        onFocus={_.partial(this.props.onFocus, "x2")}
                        onBlur={_.partial(this.props.onBlur, "x2")} />,
                    <TeX>{", {}"}</TeX>,
                    <InputComponent
                        ref="y2"
                        value={this.state.line[1][1]}
                        useArrowKeys={true}
                        onChange={this.changePoint.bind(this, 1, 1)}
                        onFocus={_.partial(this.props.onFocus, "y2")}
                        onBlur={_.partial(this.props.onBlur, "y2")} />,
                    <TeX>)</TeX>
                ];
                return <div>
                    <$_ point1={point1} point2={point2}>
                        Reflection over the line from %(point1)s to %(point2)s
                    </$_>
                </div>;
            },
            changePoint: function(i, j, val, cb) {
                var line = _.map(this.state.line, _.clone);
                line[i][j] = val;
                this.setState({line: line}, () => {
                    this.props.onChange(cb);
                });
            },
            value: function() {
                var x1 = this.refs.x1.getValue();
                var y1 = this.refs.y1.getValue();
                var x2 = this.refs.x2.getValue();
                var y2 = this.refs.y2.getValue();
                return {
                    line: [[x1, y1], [x2, y2]]
                };
            },
            /* InputPath API */
            setInputValue: function(path, value, cb) {
                var id = _.first(path);
                var j;
                if (id[0] === "x") {
                    j = 0;
                } else if (id[0] === "y") {
                    j = 1;
                }
                var i;
                if (id[1] === "1") {
                    i = 0;
                } else if (id[1] === "2") {
                    i = 1;
                }
                this.changePoint(i, j, value, cb);
            },
            getInputPaths: function() {
                return [["x1"], ["y1"], ["x2"], ["y2"]];
            }
        })
    },

    dilation: {
        // I18N: As in the command, "Dilate the polygon"
        verbName: $._("Dilate"),
        nounName: $._("Dilation"),
        lowerNounName: $._("dilation"),
        apply: function(transform) {
            return function(coord) {
                return dilatePointFromCenter(coord, transform.center,
                        transform.scale);
            };
        },
        isValid: function(transform) {
            return _.isFinite(transform.scale) &&
                _.isFinite(transform.center[0]) &&
                _.isFinite(transform.center[1]);
        },
        isEmpty: function(transform) {
            return transform.scale === null &&
                transform.center[0] === null &&
                transform.center[1] === null;
        },
        isNoOp: function(transform) {
            return knumber.equal(transform.scale, 1);
        },
        collapse: function(transform1, transform2) {
            if (!kpoint.equal(transform1.center, transform2.center)) {
                return false;
            }
            return {
                center: transform1.center,
                scale: transform1.scale * transform2.scale
            };
        },
        toTeX: function(transform) {
            var scaleString = stringFromFraction(transform.scale);
            return <$_ scale={scaleString}
                       point={texFromPoint(transform.center)}>
                Dilation of scale %(scale)s about %(point)s
            </$_>;
        },
        Input: React.createClass({
            getInitialState: function() {
                return {
                    center: this.props.center || [null, null],
                    scale: this.props.scale || null
                };
            },
            componentDidUpdate: function(prevProps) {
                if (!deepEq(this.props, prevProps)) {
                    this.setState({
                        center: this.props.center,
                        scale: this.props.scale
                    });
                }
            },
            render: function() {
                var InputComponent = (this.props.apiOptions.staticRender) ?
                        MathOutput :
                        NumberInput;
                var point = [<TeX>(</TeX>,
                    <InputComponent
                        ref="x"
                        placeholder={0}
                        value={this.state.center[0]}
                        useArrowKeys={true}
                        onChange={(val0) => {
                            var val1 = this.state.center[1];
                            this.setState({center: [val0, val1]}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "x")}
                        onBlur={_.partial(this.props.onBlur, "x")} />,
                    <TeX>{", {}"}</TeX>,
                    <InputComponent
                        ref="y"
                        placeholder={0}
                        value={this.state.center[1]}
                        useArrowKeys={true}
                        onChange={(val1) => {
                            var val0 = this.state.center[0];
                            this.setState({center: [val0, val1]}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "y")}
                        onBlur={_.partial(this.props.onBlur, "y")} />,
                    <TeX>)</TeX>
                ];
                var scale = <InputComponent
                    ref="scale"
                    placeholder={1}
                    value={this.state.scale}
                    useArrowKeys={true}
                    onChange={(val) => {
                            this.setState({scale: val}, () => {
                                this.props.onChange();
                            });
                        }}
                    onFocus={_.partial(this.props.onFocus, "scale")}
                    onBlur={_.partial(this.props.onBlur, "scale")} />;
                return <div>
                    <$_ point={point} scale={scale}>
                        Dilation about %(point)s by %(scale)s
                    </$_>
                </div>;
            },
            value: function() {
                var scale = this.refs.scale.getValue();
                var x = this.refs.x.getValue();
                var y = this.refs.y.getValue();
                return {
                    scale: scale,
                    center: [x, y]
                };
            },
            /* InputPath API */
            setInputValue: function(path, value, cb) {
                var id = _.first(path);
                var scale = this.state.scale;
                var center = _.clone(this.state.center);
                if (id === "x") {
                    center[0] = value;
                } else if (id === "y") {
                    center[1] = value;
                } else if (id === "scale") {
                    scale = value;
                }
                this.setState({scale: scale, center: center}, () => {
                    this.props.onChange(cb);
                });
            },
            getInputPaths: function() {
                return [["x"], ["y"], ["scale"]];
            }
        })
    }
};


/* Various functions to deal with different shape types */
var ShapeTypes = {
    getPointCountForType: function(type) {
        var splitType = type.split("-");
        if (splitType[0] === "polygon") {
            return splitType[1] || 3;
        } else if (splitType[0] === "line" ||
                splitType[0] === "lineSegment") {
            return 2;
        } else if (splitType[0] === "angle") {
            return 3;
        } else if (splitType[0] === "circle") {
            return 2;
        } else if (splitType[0] === "point") {
            return 1;
        }
    },

    addMovableShape: function(graphie, options) {
        if (options.editable && options.translatable) {
            throw new Error("It doesn't make sense to have a movable shape " +
                    "where you can stretch the points and translate them " +
                    "simultaneously. options: " + JSON.stringify(options));
        }

        var shape;
        var points = _.map(options.shape.coords, function(coord) {
            var currentPoint;
            var isMoving = false;
            var previousCoord = coord;

            var onMove = function(x, y) {
                if (!isMoving) {
                    previousCoord = currentPoint.coord;
                    isMoving = true;
                }

                var moveVector = kvector.subtract(
                    [x, y],
                    currentPoint.coord
                );

                // Translate from (x, y) semantics to (dX, dY) semantics
                // This is more useful for translations on multiple points,
                // where we care about how the points moved, not where any
                // individual point ended up
                if (options.onMove) {
                    moveVector = options.onMove(moveVector[0],
                            moveVector[1]);
                }

                // Perform a translation on all points in this shape when
                // any point moves
                if (options.translatable) {
                    _.each(points, function(point) {
                        // The point itself will be updated by the
                        // movablePoint class, so only translate the other
                        // points
                        if (point !== currentPoint) {
                            point.setCoord(kvector.add(
                                point.coord,
                                moveVector
                            ));
                        }
                    });
                }

                // Update our shape and our currentPoint
                // Without this, some shapes (circles, angles) appear
                // "bouncy" as they are updated with currentPoint at the
                // current mouse coordinate (oldCoord), rather than newCoord
                var oldCoord = currentPoint.coord;
                var newCoord = kvector.add(
                    currentPoint.coord,
                    moveVector
                );
                // Temporarily change our coordinate so that
                // shape.update() sees the new coordinate
                currentPoint.coord = newCoord;
                shape.update();
                // ...But don't break onMove, which assumes it
                // is the only thing changing our coord
                currentPoint.coord = oldCoord;
                return newCoord;
            };

            var onMoveEnd = function() {
                // onMove isn't guaranteed to be called before onMoveEnd, so
                // we have to take into account that we may not have moved and
                // set previousCoord.
                if (options.onMoveEnd && isMoving) {
                    isMoving = false;
                    // We don't use the supplied x and y parameters here
                    // because MovablePoint's onMoveEnd semantics suck.
                    // It returns the mouseX, mouseY without processing them
                    // through onMove, leaving us with weird fractional moves
                    var change = kvector.subtract(
                        currentPoint.coord,
                        previousCoord
                    );
                    options.onMoveEnd(change[0], change[1]);
                }
                shape.update();
            };

            currentPoint = graphie.addMovablePoint({
                coord: coord,
                normalStyle: options.normalPointStyle,
                highlightStyle: options.highlightPointStyle,
                constraints: {
                    fixed: !options.translatable && !options.editable
                },
                visible: options.showPoints,
                snapX: options.snap && options.snap[0] || 0,
                snapY: options.snap && options.snap[1] || 0,
                bounded: false, // Don't bound it when placing it on the graph
                onMove: onMove,
                onMoveEnd: onMoveEnd
            });

            // Bound it when moving
            // We can't set this earlier, because doing so would mean any
            // points outside of the graph would be moved into a moved into
            // a position that doesn't preserve the shape
            currentPoint.bounded = true;

            return currentPoint;
        });

        shape = ShapeTypes.addShape(graphie, options, points);
        var removeShapeWithoutPoints = shape.remove;
        shape.remove = function() {
            removeShapeWithoutPoints.apply(shape);
            _.invoke(points, "remove");
        };
        return shape;
    },

    addShape: function(graphie, options, points) {
        points = points || options.shape.coords;

        var types = ShapeTypes._typesOf(options.shape);
        var typeOptions = options.shape.options ||
                ShapeTypes.defaultOptions(types);

        var shapes = ShapeTypes._mapTypes(types, points,
                function(type, points, i) {
            var shapeOptions = _.extend({}, options, typeOptions[i]);
            return ShapeTypes._addType(graphie, type, points, shapeOptions);
        });

        var updateFuncs = _.filter(_.pluck(shapes, "update"), _.identity);
        var update = function() {
            _.invoke(updateFuncs, "call");
        };

        var removeFuncs = _.filter(_.pluck(shapes, "remove"), _.identity);
        var remove = function() {
            _.invoke(removeFuncs, "call");
        };

        var getOptions = function() {
            return _.map(shapes, function(shape) {
                if (shape.getOptions) {
                    return shape.getOptions();
                } else {
                    return {};
                }
            });
        };

        var toJSON = function() {
            var coords = _.map(points, function(pt) {
                if (_.isArray(pt)) {
                    return pt;
                } else {
                    return pt.coord;
                }
            });
            return {
                type: types,
                coords: coords,
                options: getOptions()
            };
        };

        return {
            type: types,
            points: points,
            update: update,
            remove: remove,
            toJSON: toJSON,
            getOptions: getOptions
        };
    },

    equal: function(shape1, shape2) {
        var types1 = ShapeTypes._typesOf(shape1);
        var types2 = ShapeTypes._typesOf(shape2);
        if (types1.length !== types2.length) {
            return false;
        }
        var shapes1 = ShapeTypes._mapTypes(types1, shape1.coords,
                ShapeTypes._combine);
        var shapes2 = ShapeTypes._mapTypes(types2, shape2.coords,
                ShapeTypes._combine);
        return _.all(_.map(shapes1, function(partialShape1, i) {
            var partialShape2 = shapes2[i];
            if (partialShape1.type !== partialShape2.type) {
                return false;
            }
            return ShapeTypes._forType(partialShape1.type).equal(
                partialShape1.coords,
                partialShape2.coords
            );
        }));
    },

    _typesOf: function(shape) {
        var types = shape.type;
        if (!_.isArray(types)) {
            types = [types];
        }
        return _.map(types, function(type) {
            if (type === "polygon") {
                return "polygon-3";
            } else {
                return type;
            }
        });
    },

    defaultOptions: function(types) {
        return _.map(types, function(type) {
            var typeDefaultOptions = ShapeTypes._forType(type).defaultOptions;
            return _.extend({}, typeDefaultOptions);
        });
    },

    _forType: function(type) {
        var baseType = type.split("-")[0];
        return ShapeTypes[baseType];
    },

    _mapTypes: function(types, points, func, context) {
        return _.map(types, function(type, i) {
            var pointCount = ShapeTypes.getPointCountForType(type);
            var currentPoints = _.first(points, pointCount);
            points = _.rest(points, pointCount);
            return func.call(context, type, currentPoints, i);
        });
    },

    _addType: function(graphie, type, points, options) {
        var lineCoords = _.isArray(points[0]) ? {
            coordA: points[0],
            coordZ: points[1],
        } : {
            pointA: points[0],
            pointZ: points[1],
        };

        type = type.split("-")[0];
        if (type === "polygon") {
            var polygon = graphie.addMovablePolygon(_.extend({}, options, {
                fixed: !options.editable,
                snapX: options.snap && options.snap[0] || 0,
                snapY: options.snap && options.snap[1] || 0,
                points: points,
                constrainToGraph: false
            }));
            return {
                update: polygon.transform.bind(polygon),
                remove: polygon.remove.bind(polygon)
            };
        } else if (type === "line" || type === "lineSegment") {
            var line = graphie.addMovableLineSegment(
                    _.extend({}, options, lineCoords, {
                movePointsWithLine: true,
                fixed: true,
                constraints: {
                    fixed: true
                },
                extendLine: (type === "line")
            }));

            // TODO(jack): Hide points on uneditable lines when translation
            // is a vector.
            // We can't just remove the points yet, because they are the
            // translation handle for the line.
            return {
                update: line.transform.bind(line, true),
                remove: line.remove.bind(line)
            };
        } else if (type === "angle") {
            // If this angle is editable, we want to be able to make angles
            // both larger and smaller than 180 degrees.
            // If this angle is not editable, it should always maintain
            // it's angle measure, even if it is reflected (causing the
            // clockwise-ness of the points to change)
            var shouldChangeReflexivity = options.editable ? null : false;

            var angle = graphie.addMovableAngle({
                angleLabel: "$deg0",
                fixed: true,
                points: points,
                normalStyle: options.normalStyle,
                reflex: options.reflex
            });

            // Hide non-vertex points on uneditable angles
            if (!_.isArray(points[0]) && !options.editable) {
                points[0].remove();
                points[2].remove();
            }
            return {
                update: angle.update.bind(angle, shouldChangeReflexivity),
                remove: angle.remove.bind(angle),
                getOptions: function() {
                    return {
                        reflex: angle.isReflex()
                    };
                }
            };
        } else if (type === "circle") {
            var perimeter = {
                // temporary object for the first removal
                remove: _.identity
            };
            var redrawPerim = function() {
                var coord0 = points[0].coord || points[0];
                var coord1 = points[1].coord || points[1];
                var radius = kpoint.distanceToPoint(coord0, coord1);
                perimeter.remove();
                perimeter = graphie.circle(coord0, radius, _.extend({
                    stroke: KhanUtil.DYNAMIC,
                    "stroke-width": 2,
                }, options.normalStyle));
            };

            redrawPerim();
            if (points[1].remove && !options.editable) {
                points[1].remove();
            }

            return {
                update: redrawPerim,
                remove: function() {
                    // Not _.bind because the remove function changes
                    // when the perimeter is redrawn
                    perimeter.remove();
                }
            };
        } else if (type === "point") {
            // do nothing
            return {
                update: null,
                remove: null
            };
        } else {
            throw new Error("Invalid shape type " + type);
        }
    },

    _combine: function(type, coords) {
        return {
            type: type,
            coords: coords
        };
    },

    polygon: {
        equal: orderInsensitiveCoordsEqual
    },

    line: {
        equal: kline.equal
    },

    lineSegment: {
        equal: orderInsensitiveCoordsEqual
    },

    angle: {
        equal: function(points1, points2) {
            if (!kpoint.equal(points1[1], points2[1])) {
                return false;
            }

            var line1_0 = [points1[1], points1[0]];
            var line1_2 = [points1[1], points1[2]];
            var line2_0 = [points2[1], points2[0]];
            var line2_2 = [points2[1], points2[2]];

            var equalUnflipped = kray.equal(line1_0, line2_0) &&
                    kray.equal(line1_2, line2_2);
            var equalFlipped = kray.equal(line1_0, line2_2) &&
                    kray.equal(line1_2, line2_0);

            return equalUnflipped || equalFlipped;
        },

        defaultOptions: {
            reflex: false
        }
    },

    circle: {
        equal: function(points1, points2) {
            var radius1 = kpoint.distanceToPoint(points1[0], points1[1]);
            var radius2 = kpoint.distanceToPoint(points2[0], points2[1]);
            return kpoint.equal(points1[0], points2[0]) &&
                knumber.equal(radius1, radius2);
        }
    },

    point: {
        equal: kpoint.equal
    }
};


var ToolSettings = React.createClass({
    getDefaultProps: function() {
        return {
            allowFixed: true
        };
    },

    render: function() {
        return <div>
            {this.props.name}:{' '}
            {" "}
            <PropCheckBox
                label="enabled:"
                enabled={this.props.settings.enabled}
                onChange={this.props.onChange} />
            {" "}
            {this.props.settings.enabled &&
                <PropCheckBox
                    label="required:"
                    required={this.props.settings.required}
                    onChange={this.props.onChange} />
            }
            {this.props.settings.enabled &&
                <InfoTip>
                    'Required' will only grade the answer as correct if the
                    student has used at least one such transformation.
                </InfoTip>
            }
            {" "}
            {this.props.allowFixed && this.props.settings.enabled &&
                <PropCheckBox
                    label="fixed:"
                    fixed={this.props.settings.constraints.fixed}
                    onChange={this.changeConstraints} />
            }
            {this.props.allowFixed && this.props.settings.enabled &&
                <InfoTip>
                    Enable 'fixed' to prevent the student from repositioning
                    the tool. The tool will appear in the position at which it
                    is placed in the editor below.
                </InfoTip>
            }
        </div>;
    },

    changeConstraints: function(changed) {
        var newConstraints = _.extend({}, this.props.constraints, changed);
        this.props.onChange({
            constraints: newConstraints
        });
    }
});


var TransformationExplorerSettings = React.createClass({
    render: function() {

        return <div className="transformer-settings">
            <div>
                {' '}Mode:{' '}
                <select value={this.getMode()}
                        onChange={this.changeMode}>
                    <option value="interactive,dynamic">
                        {' '}Exploration with text{' '}
                    </option>
                    <option value="interactive,static">
                        {' '}Exploration without text{' '}
                    </option>
                    <option value="dynamic,interactive">
                        {' '}Formal with movement{' '}
                    </option>
                    <option value="static,interactive">
                        {' '}Formal without movement{' '}
                    </option>
                </select>
                <InfoTip>
                    <ul>
                        <li>
                            <b>Exploration:</b> Students create
                            transformations with tools on the graph.{' '}
                        </li>
                        <li>
                            <b>Formal with movement:</b> Students specify
                            transformations mathematically in the
                            transformation list. Graph shows the results of
                            these transformations.{' '}
                        </li>
                        <li>
                            <b>Formal without movement:</b> Students specify
                            transformations mathematically in the
                            transformation list. Graph does not update.{' '}
                        </li>
                    </ul>
                </InfoTip>
            </div>
            <ToolSettings
                    name="Translations"
                    settings={this.props.tools.translation}
                    allowFixed={false}
                    onChange={this.changeHandlerFor("translation")} />
            <ToolSettings
                    name="Rotations"
                    settings={this.props.tools.rotation}
                    onChange={this.changeHandlerFor("rotation")} />
            <ToolSettings
                    name="Reflections"
                    settings={this.props.tools.reflection}
                    onChange={this.changeHandlerFor("reflection")} />
            <ToolSettings
                    name="Dilations"
                    settings={this.props.tools.dilation}
                    onChange={this.changeHandlerFor("dilation")} />
            <PropCheckBox
                    label="Draw Solution:"
                    drawSolutionShape={this.props.drawSolutionShape}
                    onChange={this.props.onChange} />
        </div>;
    },

    getMode: function() {
        return this.props.graphMode + "," + this.props.listMode;
    },

    changeMode: function(e) {
        var selected = e.target.value;
        var modes = selected.split(",");

        this.props.onChange({
            graphMode: modes[0],
            listMode: modes[1]
        });
    },

    changeHandlerFor: function(toolName) {
        return change => {
            var newTools = _.clone(this.props.tools);
            newTools[toolName] = _.extend({}, this.props.tools[toolName],
                    change);

            this.props.onChange({
                tools: newTools
            });
        };
    }
});


var TransformationsShapeEditor = React.createClass({
    render: function() {
        return <div>
            <Graph
                ref="graph"
                box={this.props.graph.box}
                range={this.props.graph.range}
                labels={this.props.graph.labels}
                step={this.props.graph.step}
                gridStep={this.props.graph.gridStep}
                markings={this.props.graph.markings}
                backgroundImage={this.props.graph.backgroundImage}
                onNewGraphie={this.setupGraphie} />
            <select
                    key="type-select"
                    value={this.getTypeString(this.props.shape.type)}
                    onChange={this.changeType} >
                <option value="polygon-3">Triangle</option>
                <option value="polygon-4">Quadrilateral</option>
                <option value="polygon-5">Pentagon</option>
                <option value="polygon-6">Hexagon</option>
                <option value="line">Line</option>
                <option value="line,line">2 lines</option>
                <option value="lineSegment">Line segment</option>
                <option value="lineSegment,lineSegment">
                    {' '}2 line segments{' '}
                </option>
                <option value="angle">Angle</option>
                <option value="circle">Circle</option>
            </select>
        </div>;
    },

    /* Return the option string for a given type */
    getTypeString: function(type) {
        if (_.isArray(type)) {
            return _.map(type, this.getTypeString).join(",");
        } else if (type === "polygon") {
            return "polygon-" + this.props.shape.coords.length;
        } else {
            return type;
        }
    },

    /* Change the type on the window event e
     *
     * e.target.value is the new type string
     */
    changeType: function(e) {
        var types = String(e.target.value).split(",");
        var pointCount = arraySum(_.map(
                types,
                ShapeTypes.getPointCountForType
        ));

        var radius = scaleToRange(4, this.refs.graph.props.range);
        var offset = (1 / 2 - 1 / pointCount) * 180;
        var coords = _.times(pointCount, function(i) {
            return kpoint.rotateDeg([radius, 0],
                360 * i / pointCount + offset);
        });

        this.props.onChange({
            shape: {
                type: types,
                coords: coords,
                options: ShapeTypes.defaultOptions(types)
            }
        });
    },

    componentDidUpdate: function(prevProps) {
        if (!deepEq(prevProps.shape, this.props.shape)) {
            this.refs.graph.reset();
        }
    },

    updateCoords: function() {
        this.props.onChange({
            shape: this.shape.toJSON()
        });
    },

    setupGraphie: function(graphie) {
        this.shape = ShapeTypes.addMovableShape(graphie, {
            editable: true,
            snap: graphie.snap,
            shape: this.props.shape,
            onMoveEnd: this.updateCoords
        });
    },

});

var TransformationListItem = TransformOps.ListItem;

var TransformationList = React.createClass({
    render: function() {
        if (this.props.mode === "static") {
            return <span />;  // don't render anything
        }

        var transformationList = _.map(
            this.props.transformations,
            function(transform, i) {
                return <TransformationListItem
                            ref={"transformation" + i}
                            key={"transformation" + i}
                            transform={transform}
                            mode={this.props.mode}
                            onChange={this.handleChange}
                            onFocus={_.partial(this.props.onFocus, "" + i)}
                            onBlur={_.partial(this.props.onBlur, "" + i)}
                            apiOptions={this.props.apiOptions} />;
            },
            this
        );

        return <div className="perseus-transformation-list">
            {transformationList}
        </div>;
    },

    _transformationRefs: function() {
        return _.times(this.props.transformations.length, (i) => {
            return this.refs["transformation" + i];
        });
    },

    value: function() {
        return _.invoke(this._transformationRefs(), "value");
    },

    handleChange: function(changed, callback) {
        this.props.onChange(this.value(), callback);
    },

    focusLast: function() {
        var transformationRefs = this._transformationRefs();
        if (transformationRefs.length !== 0) {
            _.last(transformationRefs).focus();
        }
    }
});

var ToolButton = React.createClass({
    render: function() {
        var classes = this.props.toggled ?
            "simple-button exercise-orange toggled highlighted-tool-button" :
            "simple-button";

        return <button
                type="button"
                className={classes}
                onClick={this.props.onClick}
                onTouchStart={captureScratchpadTouchStart}>
            {this.props.children}
        </button>;
    }
});

var ToolsBar = React.createClass({
    getInitialState: function() {
        return {
            selected: null
        };
    },

    render: function() {
        var tools = _.map(Transformations, function(tool, type) {
            if (this.props.enabled[type]) {
                return <ToolButton
                        key={type}
                        toggled={this.state.selected === type}
                        onClick={this.changeSelected.bind(this, type)}>
                    {tool.verbName}
                </ToolButton>;
            }
        }, this);

        return <div className="transformer-tools-bar">
            <span className="simple-button-group">
                {tools}
            </span>
            <button
                    className="transformer-undo-button simple-button"
                    type="button"
                    onClick={this.props.onUndoClick}
                    onTouchStart={captureScratchpadTouchStart}>
                <span className="icon-undo" />
                {" "}
                Undo
            </button>
            <div className="clear"></div>
        </div>;
    },

    changeSelected: function(tool) {
        this.props.removeTool(this.state.selected);

        if (!tool || tool === this.state.selected) {
            this.setState({
                selected: null
            });
        } else {
            this.props.addTool(tool);
            this.setState({
                selected: tool
            });
        }
    }
});

var AddTransformBar = React.createClass({
    render: function() {
        var tools = _.map(Transformations, function(tool, type) {
            if (this.props.enabled[type]) {
                return <ToolButton
                        key={type}
                        toggled={false}
                        onClick={this.changeSelected.bind(this, type)}>
                    <span className="icon-plus" />
                    {" "}
                    {tool.nounName}
                </ToolButton>;
            }
        }, this);

        return <div className="transformer-tools-bar">
            {tools}
            <button
                    className="transformer-undo-button simple-button"
                    type="button"
                    onClick={this.props.onUndoClick}
                    onTouchStart={captureScratchpadTouchStart}>
                <span className="icon-undo" />
                {" "}
                Undo
            </button>
            <div className="clear"></div>
        </div>;
    },

    changeSelected: function(tool) {
        if (tool) {
            this.props.addTool(tool);
        }
    }
});

var Transformer = React.createClass({
    getDefaultProps: function() {
        return _.defaults({
            transformations: []
        }, defaultTransformerProps);
    },

    render: function() {
        // Fill in any missing value in this.props.graph
        // this can happen because the graph json doesn't include
        // box, for example
        var graph = _.extend(
                defaultGraphProps(this.props.graph, defaultBoxSize),
                this.props.graph
        );

        var interactiveToolsMode = this.props.graphMode === "interactive";

        var ToolsBarClass = interactiveToolsMode ?
                ToolsBar :
                AddTransformBar;

        // This style is applied inline because it is dependent on the
        // size of the graph as set by the graph.box prop, and this also
        // lets us specify it in the same place the graph's width is
        // specified.
        var toolsBar = <div style={{width: graph.box[0]}}>
            <ToolsBarClass
                ref="toolsBar"
                enabled={pluckObject(this.props.tools, "enabled")}
                addTool={this.addTool}
                removeTool={this.removeTool}
                onUndoClick={this.handleUndoClick} />
        </div>;

        return <div className={"perseus-widget " +
                        "perseus-widget-transformer"}>
            <Graph
                ref="graph"
                box={graph.box}
                range={graph.range}
                labels={graph.labels}
                step={graph.step}
                gridStep={graph.gridStep}
                markings={graph.markings}
                backgroundImage={graph.backgroundImage}
                showProtractor={graph.showProtractor}
                onNewGraphie={this.setupGraphie} />

            {!interactiveToolsMode && (
                "Add transformations below:"
            )}

            {this.props.graphMode === "static" && [
                <br key="static-br" />,
                <em key="static-nomove">
                    {' '}Note: For this question, the shape will not move.{' '}
                </em>
            ]}

            {interactiveToolsMode && toolsBar}

            <TransformationList
                ref="transformationList"
                mode={this.props.listMode}
                transformations={this.props.transformations}
                onChange={this.setTransformationProps}
                onFocus={this._handleFocus}
                onBlur={this._handleBlur}
                apiOptions={this.props.apiOptions} />

            {!interactiveToolsMode && toolsBar}

        </div>;
    },

    componentDidUpdate: function(prevProps) {
        if (this.shouldSetupGraphie(this.props, prevProps)) {
            this.refs.graph.reset();
        } else if (!deepEq(this.props.transformations,
                this.transformations)) {
            this.setTransformations(this.props.transformations);
        }
    },

    shouldSetupGraphie: function(nextProps, prevProps) {
        if (!deepEq(prevProps.starting, nextProps.starting)) {
            return true;
        } else if (prevProps.graphMode !== nextProps.graphMode) {
            return true;
        } else if (prevProps.listMode !== nextProps.listMode) {
            return true;
        } else if (prevProps.drawSolutionShape !==
                nextProps.drawSolutionShape) {
            return true;
        } else if (nextProps.drawSolutionShape && !deepEq(
                prevProps.correct.shape, nextProps.correct.shape)) {
            return true;
        } else if (!deepEq(this.tools, nextProps.tools)) {
            return true;
        } else {
            return false;
        }
    },

    graphie: function() {
        return this.refs.graph.graphie();
    },

    setupGraphie: function() {
        var self = this;

        var graphie = this.graphie();

        // A background image of our solution:
        if (this.props.drawSolutionShape &&
                this.props.correct.shape &&
                this.props.correct.shape.coords) {
            ShapeTypes.addShape(graphie, {
                fixed: true,
                shape: self.props.correct.shape,
                normalStyle: {
                    stroke: KhanUtil.GRAY,
                    "stroke-dasharray": "",
                    "stroke-width": 2
                }
            });
        }

        this.currentTool = null;
        this.refs.toolsBar.changeSelected(null);
        this.addTransformerShape(this.props.starting.shape,
                /* translatable */ false);
        this.setTransformations(this.props.transformations);

        // Save a copy of our tools so that we can check future
        // this.props.tools changes against them
        // This seems weird, but gives us an easy way to tell whether
        // props changes were self-inflicted (for which a graphie reset
        // is not required, and is in fact a bad idea right now because
        // of resetting the size of the dilation tool).
        // TODO (jack): A deepClone method would be nice here
        this.tools = {
            translation: _.clone(this.props.tools.translation),
            rotation: _.clone(this.props.tools.rotation),
            reflection: _.clone(this.props.tools.reflection),
            dilation: _.clone(this.props.tools.dilation)
        };
    },

    /* Applies all transformations in `transformations`
     * to the starting shape, and updates this.transformations
     * to reflect this
     *
     * Usually called with this.props.transformations
     */
    setTransformations: function(transformations) {
        this.resetCoords();
        this.transformations = _.clone(transformations);
        _.each(this.transformations, this.applyTransform);
    },

    // the polygon that we transform
    addTransformerShape: function(shape, translatable) {
        var self = this;
        var graphie = this.graphie();

        this.shape = ShapeTypes.addMovableShape(graphie, {
            shape: shape,
            editable: false,
            showPoints: (this.props.graphMode !== "static"),
            translatable: translatable,
            onMove: function (dX, dY) {
                dX = KhanUtil.roundToNearest(graphie.snap[0], dX);
                dY = KhanUtil.roundToNearest(graphie.snap[1], dY);
                self.addTransform({
                    type: "translation",
                    vector: [dX, dY]
                });
                return [dX, dY];
            },
            normalPointStyle: {
                fill: (translatable ? KhanUtil.INTERACTIVE
                                    : KhanUtil.DYNAMIC),
                stroke: (translatable ? KhanUtil.INTERACTIVE
                                      : KhanUtil.DYNAMIC)
            },
            highlightPointStyle: {
                fill: KhanUtil.INTERACTING,
                stroke: KhanUtil.INTERACTING
            }
        });
    },

    addTool: function(toolId) {
        var self = this;

        if (this.props.graphMode === "interactive") {
            if (toolId === "translation") {
                this.currentTool = this.addTranslationTool();
            } else if (toolId === "rotation") {
                this.currentTool = this.addRotationTool();
            } else if (toolId === "reflection") {
                this.currentTool = this.addReflectionTool();
            } else if (toolId === "dilation") {
                this.currentTool = this.addDilationTool();
            } else {
                throw new Error("Invalid tool id: " + toolId);
            }
        } else {
            var transform;
            if (toolId === "translation") {
                transform = {
                    type: toolId,
                    vector: [null, null]
                };
            } else if (toolId === "rotation") {
                transform = {
                    type: toolId,
                    center: [null, null],
                    angleDeg: null
                };
            } else if (toolId === "reflection") {
                // Reflections with nulls in them won't be applied until
                // fills in the blanks
                transform = {
                    type: toolId,
                    line: [[null, null], [null, null]]
                };
            } else if (toolId === "dilation") {
                transform = {
                    type: toolId,
                    center: [null, null],
                    scale: null
                };
            } else {
                throw new Error("Invalid tool id: " + toolId);
            }

            this.doTransform(transform, function() {
                self.refs.transformationList.focusLast();
            });
        }
    },

    removeTool: function(toolId) {
        if (this.currentTool) {
            this.currentTool.remove();
        }
        this.currentTool = null;
    },

    addTranslationTool: function() {
        var self = this;
        this.shape.remove();
        this.addTransformerShape(this.shape.toJSON(),
                /* translatable */ true);

        return {
            remove: function() {
                self.shape.remove();
                self.addTransformerShape(self.shape.toJSON(),
                        /* translatable */ false);
            }
        };
    },

    // Snaps a coord to this.graphie()'s snap
    snapCoord: function(coord) {
        var graphie = this.graphie();
        return _.map(coord, function (val, dim) {
            return KhanUtil.roundToNearest(graphie.snap[dim], val);
        });
    },

    // Normalize the coords into something that fits the new 45 degree
    // reflection line.
    normalizeReflectionCoords: function(messyCoords) {
        var midpoint = this.snapCoord(kline.midpoint(messyCoords));
        var origDirectionPolar = kvector.polarDegFromCart(
            kvector.subtract(messyCoords[0], messyCoords[1])
        );
        var directionPolar = [
            1,
            KhanUtil.roundToNearest(45, origDirectionPolar[1])
        ];
        var direction = kvector.cartFromPolarDeg(directionPolar);
        var coords = _.map([-1, 1], function(directionCoefficient) {
            var coord = kvector.add(
                midpoint,
                kvector.scale(
                    direction,
                    directionCoefficient *
                        this.scaleToCurrentRange(REFLECT_ROTATE_HANDLE_DIST)
                )
            );
            return this.snapCoord(coord);
        }, this);
        return coords;
    },

    addReflectionTool: function() {
        var options = this.props.tools.reflection;
        if (!options.enabled) {
            return;
        }
        var self = this;
        var graphie = this.refs.graph.graphie();

        var updateReflectionTool = function() {
            self.changeTool("reflection", {
                coords: _.pluck(reflectPoints, "coord")
            });
        };

        var coords = this.normalizeReflectionCoords(options.coords);

        // The points defining the line of reflection; hidden from the
        // user.
        var reflectPoints = _.map(coords, function(coord) {
            return graphie.addMovablePoint({
                coord: coord,
                visible: false
            });
        }, this);

        // the line of reflection
        // TODO(jack): graphie.style here is a hack to prevent the dashed
        // style from leaking into the rest of the shapes. Remove when
        // graphie.addMovableLineSegment doesn't leak styles anymore.
        var reflectLine;
        var normalColor = colorForTool(options);
        graphie.style({}, function() {
            reflectLine = graphie.addMovableLineSegment({
                fixed: options.constraints.fixed,
                constraints: options.constraints,
                pointA: reflectPoints[0],
                pointZ: reflectPoints[1],
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
                extendLine: true,
                normalStyle: {
                    "stroke": normalColor,
                    "stroke-width": 2,
                    "stroke-dasharray": "- "
                },
                highlightStyle: {
                    "stroke": KhanUtil.INTERACTING,
                    "stroke-width": 2,
                    "stroke-dasharray": "- " // TODO(jack) solid doesn't
                                             // work here, but would be
                                             // nicer
                },
                movePointsWithLine: true,
                onMoveEnd: updateReflectionTool
            });
        });

        // the "button" point in the center of the line of reflection
        var reflectButton = graphie.addReflectButton({
            fixed: options.constraints.fixed,
            line: reflectLine,
            size: this.scaleToCurrentRange(REFLECT_BUTTON_SIZE),
            onClick: function() {
                self.doTransform({
                    type: "reflection",
                    line: _.pluck(reflectPoints, "coord")
                });
                if (reflectRotateHandle) {
                    // flip the rotation handle
                    reflectRotateHandle.setCoord(kvector.add(
                        reflectButton.coord,
                        kvector.subtract(
                            reflectButton.coord,
                            reflectRotateHandle.coord
                        )
                    ));
                    reflectRotateHandle.update();
                }
            },
            normalStyle: {
                stroke: normalColor,
                "stroke-width": 2,
                fill: normalColor
            },
            highlightStyle: {
                stroke: KhanUtil.INTERACTING,
                "stroke-width": 3,
                fill: KhanUtil.INTERACTING
            },
            onMoveEnd: updateReflectionTool
        });

        var reflectRotateHandle = null;
        if (!options.constraints.fixed) {
            // The rotation handle for rotating the line of reflection
            var initRotateHandleAngle = kvector.polarDegFromCart(
                kvector.subtract(
                    reflectPoints[1].coord,
                    reflectPoints[0].coord
                )
            )[1] + 90; // 90 degrees off of the line
            reflectRotateHandle = graphie.addRotateHandle({
                center: reflectButton,
                radius: this.scaleToCurrentRange(REFLECT_ROTATE_HANDLE_DIST),
                angleDeg: initRotateHandleAngle,
                width: this.scaleToCurrentRange(0.24),
                hoverWidth: this.scaleToCurrentRange(0.4),
                lengthAngle: 17,
                onMove: function(newAngle) {
                    return KhanUtil.roundToNearest(45, newAngle);
                },
                onMoveEnd: updateReflectionTool
            });
        }

        // Move the reflectButton and reflectRotateHandle with the line
        $(reflectLine).on("move",
                function() {
            reflectButton.update();
            $(reflectButton).trigger("move"); // update the rotation handle,
                    // which watches for this in ke/utils/interactive.js.
        });

        // Update the line and reflect button when the reflectRotateHandle is
        // rotated
        if (reflectRotateHandle) {
            $(reflectRotateHandle).on("move", function() {
                var rotateHandleApprox = self.snapCoord(
                    reflectRotateHandle.coord
                );

                var rotateVector = kvector.subtract(
                    rotateHandleApprox,
                    reflectButton.coord
                );

                var flipped = reflectButton.isFlipped() ? 1 : 0;
                reflectPoints[flipped].setCoord(kvector.add(
                    reflectButton.coord,
                    kvector.rotateDeg(rotateVector, 90)
                ));
                reflectPoints[1 - flipped].setCoord(kvector.add(
                    reflectButton.coord,
                    kvector.rotateDeg(rotateVector, -90)
                ));

                reflectLine.transform(true);
                reflectButton.update();
            });
        }

        return {
            remove: function() {
                reflectButton.remove();
                if (reflectRotateHandle) {
                    reflectRotateHandle.remove();
                }
                reflectLine.remove();
                reflectPoints[0].remove();
                reflectPoints[1].remove();
            }
        };
    },

    /* Scales a distance from the default range of
     * [-10, 10] to the current this.props.graph.range
     *
     * Used for sizing various transformation tools
     * (rotation handle, dilation circle)
     */
    scaleToCurrentRange: function(dist) {
        return scaleToRange(dist, this.refs.graph.props.range);
    },

    addRotationTool: function() {
        var options = this.props.tools.rotation;
        if (!options.enabled) {
            return;
        }
        var self = this;
        var graphie = this.refs.graph.graphie();

        var pointColor = colorForTool(options);
        // The center of our rotation, which can be moved to change the
        // center of rotation
        this.rotatePoint = graphie.addMovablePoint({
            constraints: options.constraints,
            coord: options.coord,
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            normalStyle: {               // ugh, this seems to be a global and
                "stroke-dasharray": "",  // is set to dash above
                stroke: pointColor,
                fill: pointColor
            },
            highlightStyle: {
                "stroke-dasharray": "",
                stroke: KhanUtil.INTERACTING,
                fill: KhanUtil.INTERACTING
            }
        });

        // The point that we move around the center of rotation to actually
        // cause rotations
        this.rotateHandle = graphie.addRotateHandle({
            center: this.rotatePoint,
            radius: this.scaleToCurrentRange(ROTATE_HANDLE_DIST),
            width: this.scaleToCurrentRange(0.24),
            hoverWidth: this.scaleToCurrentRange(0.4),
            onMove: function(newAngle, oldAngle) {
                var transform = self.getRotationTransformFromAngle(
                    self.rotatePoint.coord,
                    newAngle - oldAngle
                );

                // Rotate polygon with rotateHandle
                self.doTransform(transform);

                return oldAngle + transform.angleDeg;
            }
        });

        // Update tools.rotation.coord
        this.rotatePoint.onMoveEnd = function(x, y) {
            self.changeTool("rotation", {
                coord: [x, y]
            });
        };


        return {
            remove: function() {
                self.rotateHandle.remove();
                self.rotatePoint.remove();
            }
        };
    },

    addDilationTool: function() {
        var options = this.props.tools.dilation;
        if (!options.enabled) {
            return;
        }
        var self = this;
        var graphie = this.refs.graph.graphie();

        var pointColor = colorForTool(options);
        // the circle for causing dilation transforms
        self.dilationCircle = graphie.addCircleGraph({
            centerConstraints: options.constraints,
            center: options.coord,
            radius: self.scaleToCurrentRange(2),
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            minRadius: self.scaleToCurrentRange(1),
            snapRadius: self.scaleToCurrentRange(0.5),
            onResize: function(newRadius, oldRadius) {
                self.doTransform({
                    type: "dilation",
                    center: self.dilationCircle.centerPoint.coord,
                    scale: newRadius/oldRadius
                });
            },
            circleNormalStyle: {
                "stroke": pointColor,
                "stroke-width": 2,
                "stroke-dasharray": "- ",
                "fill-opacity": 0
            },
            circleHighlightStyle: {
                "stroke": KhanUtil.INTERACTING,
                "stroke-width": 2,
                "stroke-dasharray": "",
                "fill": KhanUtil.INTERACTING,
                "fill-opacity": 0.05
            },
            centerNormalStyle: {
                "stroke": pointColor,
                "fill": pointColor,
                "stroke-width": 2,
                "stroke-dasharray": ""
            },
            centerHighlightStyle: {
                "stroke": pointColor,
                "fill": pointColor,
                "stroke-width": 2,
                "stroke-dasharray": ""
            }
        });

        var origOnMoveEnd = this.dilationCircle.centerPoint.onMoveEnd;
        this.dilationCircle.centerPoint.onMoveEnd = function() {
            if (origOnMoveEnd) {
                origOnMoveEnd.apply(this, _.toArray(arguments));
            }
            self.changeTool("dilation", {
                coord: self.dilationCircle.centerPoint.coord
            });
        };

        return {
            remove: function() {
                self.dilationCircle.remove();
            }
        };
    },

    // returns a transformation object representing a rotation
    // rounds the angle to the nearest 15 degrees
    getRotationTransformFromAngle: function(center, angleChanged) {
        angleChanged = (angleChanged + 360) % 360;
        if (angleChanged > 180) {
            angleChanged -= 360;
        }
        var roundedAngle = Math.round(
                angleChanged / ROTATE_SNAP_DEGREES
            ) * ROTATE_SNAP_DEGREES;

        return {
            type: "rotation",
            center: center,
            angleDeg: roundedAngle
        };
    },

    // apply and save a transform
    doTransform: function(transform, callback) {
        this.applyTransform(transform);
        this.addTransform(transform, callback);
    },

    // apply a transform to our polygon (without modifying our transformation
    // list)
    applyTransform: function(transform) {
        if (this.props.graphMode !== "static") {
            var transformFunc = TransformOps.apply(transform);
            this.applyCoordTransformation(transformFunc);
        }
    },

    // transform our polygon by transforming each point using a given function
    applyCoordTransformation: function(pointTransform) {
        _.each(this.shape.points, function(point) {
            var newCoord = pointTransform(point.coord);
            point.setCoord(newCoord);
        });
        this.shape.update();
    },

    resetCoords: function() {
        var startCoords = this.props.starting.shape.coords;
        _.each(this.shape.points, function(point, i) {
            point.setCoord(startCoords[i]);
        });
        this.shape.update();
    },

    // Remove the last transformation
    handleUndoClick: function() {
        this.refs.toolsBar.changeSelected(null);
        if (this.props.transformations.length) {
            this.props.onChange({
                transformations: _.initial(this.props.transformations)
            });
        }
    },

    setTransformationProps: function(newTransfomationList, callback) {
        this.props.onChange({
            transformations: newTransfomationList
        }, callback);
    },

    // add a transformation to our props list of transformation
    addTransform: function(transform, callback) {
        this.transformations = TransformOps.append(
                this.transformations,
                transform
        );
        this.props.onChange({
            transformations: _.clone(this.transformations)
        }, callback);
    },

    changeTool: function(tool, changes) {
        var newTools = _.clone(this.props.tools);
        newTools[tool] = _.extend({}, this.props.tools[tool], changes);
        this.tools[tool] = _.clone(newTools[tool]);
        this.props.onChange({
            tools: newTools,
        });
    },

    simpleValidate: function(rubric) {
        return Transformer.validate(this.getUserInput(), rubric);
    },

    /**
     * Calculate where the coordinates would be if they were
     * moved, even if we're in formal mode with no movement
     * (and thus the actual movablepoints may not have moved
     */
    getCoords: function() {
        var startCoords = this.props.starting.shape.coords;
        var transforms = this.props.transformations;
        return _.reduce(transforms, function (coords, transform) {
            return _.map(coords, TransformOps.apply(transform));
        }, startCoords);
    },

    getEditorJSON: function() {
        var json = _.pick(this.props, "grading", "starting", "graphMode",
                "listMode", "tools", "drawSolutionShape", "gradeEmpty");
        json.graph = this.refs.graph.toJSON();
        json.version = 1.2; // Give us some safety to change the format
                            // when we realize that I wrote
                            // a horrible json spec for this widget

        json.answer = this.getUserInput();
        return json;
    },

    getUserInput: function() {
        return {
            transformations: this.props.transformations,
            // This doesn't call this.shape.toJSON() because that doesn't
            // handle coordinates in formal mode without movement, since
            // the movablepoints never move
            shape: {
                type: this.shape.type,
                coords: this.getCoords(),
                options: this.shape.getOptions()
            }
        };
    },

    statics: {
        displayMode: "block"
    },

    /* InputPath API */

    _handleFocus: function() {
        var path = Array.prototype.slice.call(arguments);
        this.props.onFocus(path);
    },

    _handleBlur: function() {
        var path = Array.prototype.slice.call(arguments);
        this.props.onBlur(path);
    },

    _getTransformationForID: function(transformationID) {
        // Returns the 'transformation' component corresponding to a given ID
        var refPath = [
            "transformationList",
            "transformation" + transformationID
        ];

        // Follow the path of references
        var component = this;
        _.each(refPath, (ref) => {
            component = component.refs[ref];
        });
        return component;
    },

    getInputPaths: function() {
        var inputPaths = [];
        _.each(this.props.transformations, (transformation, i) => {
            var transformation = this._getTransformationForID(i);
            var innerPaths = transformation.getInputPaths();
            var fullPaths = _.map(innerPaths, (innerPath) => {
                return ["" + i].concat(innerPath);
            });
            inputPaths = inputPaths.concat(fullPaths);
        });
        return inputPaths;
    },

    _passToInner: function(functionName, path) {
        if (!path || !path.length) {
            return;
        }

        // First argument tells us which transformation will receive the call;
        // remaining arguments are used within that transformation to identify
        // a specific input.
        var innerPath = _.rest(path);
        var args = [innerPath].concat(_.rest(arguments, 2));

        // Pass arguments down to appropriate 'transformation' component
        var transformationID = _.head(path);
        var caller = this._getTransformationForID(transformationID);
        return caller[functionName].apply(caller, args);
    },

    focus: function() {
        // Just focus the first showing input
        var inputs = this.getInputPaths();
        if (inputs.length > 0) {
            this.focusInputPath(inputs[0]);
            return true;
        }
        return false;
    },

    focusInputPath: function(path) {
        assert(path.length >= 2);
        return this._passToInner('focusInputPath', path);
    },

    blurInputPath: function(path) {
        assert(path.length >= 2);
        return this._passToInner('blurInputPath', path);
    },

    setInputValue: function(path, value, cb) {
        assert(path.length >= 2);
        return this._passToInner('setInputValue', path, value, cb);
    },

    getDOMNodeForPath: function(path) {
        assert(path.length >= 2);
        return this._passToInner('getDOMNodeForPath', path);
    },

    getGrammarTypeForPath: function(path) {
        assert(path.length >= 2);
        return this._passToInner('getGrammarTypeForPath', path);
    }
});

_.extend(Transformer, {
    validate: function (guess, rubric) {
        // Check for any required transformations
        for (var type in Transformations) {
            if (rubric.tools[type].required) {
                var isUsed = _.any(_.map(guess.transformations,
                        function(transform) {
                    // Required transformations must appear in the
                    // transformation list, and must not be no-ops
                    return (transform.type === type) &&
                        !TransformOps.isEmpty(transform) &&
                        !TransformOps.isNoOp(transform);
                }));

                if (!isUsed) {
                    return {
                        type: "invalid",
                        message: $._("Your transformation must use a " +
                                "%(type)s.", {
                            type: Transformations[type].lowerNounName
                        })
                    };
                }
            }
        }

        // Compare shapes
        if (ShapeTypes.equal(guess.shape,
                rubric.correct.shape)) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else if (!rubric.gradeEmpty && deepEq(
                    guess.shape.coords,
                    rubric.starting.shape.coords
                )) {
            return {
                type: "invalid",
                message: $._("Use the interactive graph to define a " +
                    "correct transformation.")
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});

var TransformerEditor = React.createClass({
    // TODO (jack): These should be refactored into a nice object at the top
    // so that we don't have all this duplication
    getDefaultProps: function() {
        return defaultTransformerProps;
    },

    render: function() {
        // Fill in any missing value in this.props.graph
        // this can happen because the graph json doesn't include
        // box, for example
        var graph = _.extend(
                defaultGraphProps(this.props.graph, 340),
                this.props.graph
        );

        return <div>
            <div>
                <PropCheckBox
                    label="Grade empty answers as wrong:"
                    gradeEmpty={this.props.gradeEmpty}
                    onChange={this.props.onChange} />
                <InfoTip>
                    <p>
                        We generally do not grade empty answers. This usually
                        works well, but sometimes can result in giving away
                        part of an answer in a multi-part question.
                    </p>
                    <p>
                        If this is a multi-part question (there is another
                        widget), you probably want to enable this option.
                        Otherwise, you should leave it disabled.
                    </p>
                    <p>
                        Confused? Talk to Elizabeth.
                    </p>
                </InfoTip>
            </div>
            <div>Graph settings:</div>
            <GraphSettings
                box={graph.box}
                labels={graph.labels}
                range={graph.range}
                step={graph.step}
                gridStep={graph.gridStep}
                valid={graph.valid}
                backgroundImage={graph.backgroundImage}
                markings={graph.markings}
                showProtractor={graph.showProtractor}
                onChange={this.changeGraph} />
            <div>Transformation settings:</div>
            <TransformationExplorerSettings
                ref="transformationSettings"
                graphMode={this.props.graphMode}
                listMode={this.props.listMode}
                tools={this.props.tools}
                drawSolutionShape={this.props.drawSolutionShape}
                onChange={this.props.onChange} />
            <div>Starting location:</div>
            <TransformationsShapeEditor
                ref="shapeEditor"
                graph={graph}
                shape={this.props.starting.shape}
                onChange={this.changeStarting} />
            <div>Solution transformations:</div>
            <Transformer
                ref="explorer"
                graph={graph}
                graphMode={this.props.graphMode}
                listMode={this.props.listMode}
                gradeEmpty={this.props.gradeEmpty}
                tools={this.props.tools}
                drawSolutionShape={this.props.drawSolutionShape}
                starting={this.props.starting}
                correct={this.props.starting}
                transformations={this.props.correct.transformations}
                onChange={this.changeTransformer} />
        </div>;
    },

    // propagate a props change on our graph settings to
    // this.props.graph
    changeGraph: function(graphChanges, callback) {
        var newGraph = _.extend({}, this.props.graph, graphChanges);
        this.props.onChange({
            graph: newGraph
        }, callback);
    },

    // propagate a props change on our starting graph to
    // this.props.starting
    changeStarting: function(startingChanges) {
        var newStarting = _.extend({}, this.props.starting, startingChanges);
        this.props.onChange({
            starting: newStarting
        });
    },

    // propagate a transformations change onto correct.transformations
    changeTransformer: function(changes, callback) {
        if (changes.transformations) {
            changes.correct = {
                transformations: changes.transformations
            };
            delete changes.transformations;
        }
        this.props.onChange(changes, callback);
    },

    serialize: function() {
        var json = this.refs.explorer.getEditorJSON();
        json.correct = json.answer;
        delete json.answer;
        return json;
    }
});


module.exports = {
    name: "transformer",
    displayName: "Transformer",
    widget: Transformer,
    editor: TransformerEditor
};
