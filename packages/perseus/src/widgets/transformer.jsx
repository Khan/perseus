/* eslint-disable react/prop-types */
/* eslint-disable @babel/no-invalid-this */
/* eslint-disable camelcase */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
/*
NOTE(Pereus stabilize project): This widget is no-longer-used as of January
2022. It's not present in US content but is still present in some
international content so it can't be removed quite yet. As soon as it's
verified to have been removed from international content this all needs
to get deleted. In the meantime- do not maintain this code.

ref: https://khanacademy.slack.com/archives/CJDRXTGQ7/p1641857400011600
ref: https://khanacademy.slack.com/archives/C2RFQGYKU/p1596160975061500?thread_ts=1596129758.040000&cid=C2RFQGYKU
*/
// @flow
import {
    number as knumber,
    vector as kvector,
    point as kpoint,
    ray as kray,
    line as kline,
} from "@khanacademy/kmath";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import createReactClass from "create-react-class";
import $ from "jquery";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import Graph from "../components/graph.jsx";
import InlineIcon from "../components/inline-icon.jsx";
import MathOutput from "../components/math-output.jsx";
import NumberInput from "../components/number-input.jsx";
import SimpleKeypadInput from "../components/simple-keypad-input.jsx";
import {getDependencies} from "../dependencies.js";
import {iconPlus, iconUndo} from "../icon-paths.js";
import InteractiveUtil from "../interactive2/interactive-util.js";
import {Errors} from "../logging/log.js";
import {ApiOptions} from "../perseus-api.jsx";
import {PerseusError} from "../perseus-error.js";
import Util from "../util.js";
import KhanColors from "../util/colors.js";
import KhanMath from "../util/math.js";

import type {Coord} from "../interactive2/types.js";
import type {
    PerseusTransformerWidgetOptions,
    PerseusTransformerTransformation as TransformerTransformation,
    DilationTransformation,
    ReflectionTransformation,
    RotationTransformation,
    TranslationTransformation,
} from "../perseus-types.js";
import type {Path, PerseusScore, WidgetExports, WidgetProps} from "../types.js";

const {deepEq, getGridStep, captureScratchpadTouchStart} = Util;
const {assert} = InteractiveUtil;

const ROTATE_SNAP_DEGREES = 15;

const DEGREE_SIGN = "\u00B0";
const RENDER_TRANSFORM_DELAY_IN_MS = 300;
const ROTATE_HANDLE_DIST = 1.5;
const REFLECT_ROTATE_HANDLE_DIST = 2;
const REFLECT_BUTTON_SIZE = 1;
const defaultBoxSize = 400;
const defaultBackgroundImage = {
    url: null,
};

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
    return _.object(
        _.map(object, function (value, key) {
            return [key, value[subKey]];
        }),
    );
}

const defaultGraphProps = function (setProps, boxSize) {
    setProps = setProps || {};
    const labels = setProps.labels || ["x", "y"];
    const range = setProps.range || [
        [-10, 10],
        [-10, 10],
    ];
    const step = setProps.step || [1, 1];
    const gridStep = setProps.gridStep || getGridStep(range, step, boxSize);
    return {
        box: [boxSize, boxSize],
        labels: labels,
        range: range,
        step: step,
        gridStep: gridStep,
        valid: true,
        backgroundImage: defaultBackgroundImage,
        markings: "grid",
        showProtractor: false,
    };
};

const defaultTransformerProps = {
    apiOptions: ApiOptions.defaults,
    gradeEmpty: false,
    graphMode: "interactive",
    listMode: "dynamic",
    graph: {},
    tools: {
        translation: {
            enabled: true,
            required: false,
            constraints: {},
        },
        rotation: {
            enabled: true,
            required: false,
            constraints: {
                fixed: false,
            },
            coord: [1, 6],
        },
        reflection: {
            enabled: true,
            required: false,
            constraints: {
                fixed: false,
            },
            coords: [
                [2, -4],
                [2, 2],
            ],
        },
        dilation: {
            enabled: true,
            required: false,
            constraints: {
                fixed: false,
            },
            coord: [6, 6],
        },
    },
    drawSolutionShape: true,
    starting: {
        shape: {
            type: "polygon-3",
            coords: [
                [2, 2],
                [2, 6],
                [7, 2],
            ],
        },
        transformations: [],
    },
    correct: {
        shape: {
            type: "polygon-3",
            coords: [
                [2, 2],
                [2, 6],
                [7, 2],
            ],
        },
        transformations: [],
    },
};

function colorForTool(tool) {
    return tool.constraints.fixed ? KhanColors.DYNAMIC : KhanColors.INTERACTIVE;
}

/* Scales a distance from the default range of
 * [-10, 10] to a given props.range pair
 *
 * Used for sizing various transformation tools
 * (rotation handle, dilation circle)
 */
function scaleToRange(dist, range) {
    const spreadX = range[0][1] - range[0][0];
    const spreadY = range[1][1] - range[1][0];

    return (dist * Math.max(spreadX, spreadY)) / 20;
}

function dilatePointFromCenter(point, dilationCenter, scale) {
    const pv = kvector.subtract(point, dilationCenter);
    const pvScaled = kvector.scale(pv, scale);
    const transformedPoint = kvector.add(dilationCenter, pvScaled);
    return transformedPoint;
}

// TODO(jack): i18nize this
function stringFromDecimal(number) {
    return String(KhanMath.roundTo(9, number));
}

function stringFromFraction(number) {
    const frac = KhanMath.toFraction(number, knumber.DEFAULT_TOLERANCE);
    if (frac[1] === 1) {
        return stringFromDecimal(number);
    }
    return stringFromDecimal(frac[0]) + "/" + stringFromDecimal(frac[1]);
}

function texFromPoint(point) {
    const {TeX} = getDependencies();

    return [
        <TeX key="(">(</TeX>,
        stringFromDecimal(point[0]),
        <TeX key=",">{", {}"}</TeX>,
        stringFromDecimal(point[1]),
        <TeX key=")">)</TeX>,
    ];
}

function texFromVector(vector) {
    const {TeX} = getDependencies();

    return [
        <TeX key="<">{i18n.doNotTranslate("\\langle")}</TeX>,
        stringFromDecimal(vector[0]),
        <TeX key=",">{", {}"}</TeX>,
        stringFromDecimal(vector[1]),
        <TeX key=">">{i18n.doNotTranslate("\\rangle")}</TeX>,
    ];
}

function texFromAngleDeg(angleDeg) {
    return stringFromDecimal(angleDeg) + DEGREE_SIGN;
}

function orderInsensitiveCoordsEqual(coords1, coords2) {
    coords1 = _.clone(coords1).sort(kpoint.compare);
    coords2 = _.clone(coords2).sort(kpoint.compare);
    return _.all(
        _.map(coords1, function (coord1, i) {
            const coord2 = coords2[i];
            return kpoint.equal(coord1, coord2);
        }),
    );
}

const inputComponentForApiOptions = (apiOptions) => {
    if (apiOptions.customKeypad) {
        return SimpleKeypadInput;
    }
    if (apiOptions.staticRender) {
        return MathOutput;
    }
    return NumberInput;
};

/* Perform operations on raw transform objects */
const TransformOps = {
    apply: function (transform: TransformerTransformation) {
        // Any transformation with empty text boxes is a no-op until
        // filled out (these show up as nulls in transform.vector/line/etc).
        // TODO (jack): Merge this just into reflections now that other
        // transforms are always valid (after merging transformation
        // collapsing, which may use isValid)
        // $FlowFixMe[prop-missing]
        // $FlowFixMe[incompatible-call]
        if (!Transformations[transform.type].isValid(transform)) {
            return _.identity; // do not transform the coord
        }
        // $FlowFixMe[prop-missing]
        // $FlowFixMe[incompatible-call]
        return Transformations[transform.type].apply(transform);
    },

    append: function (transformList, newTransform) {
        // Append newTransform to transformList, and collapse the last
        // two transforms if they are collapsable
        const results = TransformOps._appendAndCollapseLastTwo(
            transformList,
            newTransform,
        );
        // Collapse any no-ops at the end of the transformation list
        return TransformOps._collapseFinalNoOps(results);
    },

    _collapseFinalNoOps: function (transforms) {
        // Collapse no-op transformations at the end of the list
        if (transforms.length && TransformOps.isNoOp(_.last(transforms))) {
            return _.initial(transforms);
        }
        return transforms;
    },

    _appendAndCollapseLastTwo: function (transformList, newTransform) {
        if (!transformList.length) {
            return [newTransform];
        }
        const collapsed = TransformOps.collapse(
            _.last(transformList),
            newTransform,
        );
        return _.initial(transformList).concat(collapsed);
    },

    isNoOp: function (transform) {
        return Transformations[transform.type].isNoOp(transform);
    },

    collapse: function (transform1, transform2) {
        // We can only collapse transforms that have the same type
        if (transform1.type !== transform2.type) {
            return [transform1, transform2];
        }

        // Clicking the button again removes empty transformations
        if (
            TransformOps.isEmpty(transform1) &&
            TransformOps.isEmpty(transform2)
        ) {
            return [];
        }

        // Don't collapse invalid transformations otherwise
        if (
            !TransformOps.isValid(transform1) ||
            !TransformOps.isValid(transform2)
        ) {
            return [transform1, transform2];
        }

        return TransformOps._collapseValidMonotypedTransforms(
            transform1,
            transform2,
        );
    },

    isValid: function (transform: TransformerTransformation): boolean {
        // $FlowFixMe[prop-missing]
        // $FlowFixMe[incompatible-call]
        return Transformations[transform.type].isValid(transform);
    },

    isEmpty: function (transform: TransformerTransformation): boolean {
        // $FlowFixMe[prop-missing]
        // $FlowFixMe[incompatible-call]
        return Transformations[transform.type].isEmpty(transform);
    },

    _collapseValidMonotypedTransforms: function (transform1, transform2) {
        let collapsed = Transformations[transform1.type].collapse(
            transform1,
            transform2,
        );
        if (collapsed) {
            // Force all answers into an array
            if (!_.isArray(collapsed)) {
                collapsed = [collapsed];
            }
            // Add types to all transforms in the answer
            _.each(collapsed, function (transform) {
                transform.type = transform1.type;
            });
            return collapsed;
        }
        // These transforms can't be collapsed together
        return [transform1, transform2];
    },

    toTeX: function (transform) {
        return Transformations[transform.type].toTeX(transform);
    },

    /* A react representation of this transform object */
    ListItem: createReactClass({
        displayName: "ListItem",

        render: function () {
            if (this.props.mode === "dynamic") {
                return <div>{TransformOps.toTeX(this.props.transform)}</div>;
            }
            if (this.props.mode === "interactive") {
                const TransformClass =
                    Transformations[this.props.transform.type].Input;
                return (
                    <TransformClass
                        // eslint-disable-next-line react/no-string-refs
                        ref="transform"
                        onChange={this.handleChange}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        keypadElement={this.props.keypadElement}
                        apiOptions={this.props.apiOptions}
                        {...this.props.transform}
                    />
                );
            }
            throw new PerseusError(
                "Invalid mode: " + this.props.mode,
                Errors.InvalidInput,
            );
        },

        value: function () {
            if (this.props.mode === "interactive") {
                return _.extend(
                    {
                        type: this.props.transform.type,
                    },
                    // eslint-disable-next-line react/no-string-refs
                    this.refs.transform.value(),
                );
            }
            return this.props.transform;
        },

        handleChange: _.debounce(function (callback) {
            this.props.onChange(this.value(), callback);
        }, RENDER_TRANSFORM_DELAY_IN_MS),

        /* InputPath API: depending on the API call, this could involve simply
         * navigating to the right ref and calling the function on that
         * component, or threading the call down and returning the result. */
        _getComponentAtPath: function (path) {
            // eslint-disable-next-line react/no-string-refs
            const transform = this.refs.transform;
            const ref = _.head(path);
            return transform.refs[ref];
        },

        focus: function () {
            // eslint-disable-next-line react/no-string-refs
            const transform = this.refs.transform;
            const path = _.head(transform.getInputPaths());
            if (path) {
                this.focusInputPath(path);
            }
        },

        focusInputPath: function (path) {
            this._getComponentAtPath(path).focus();
        },

        blurInputPath: function (path) {
            this._getComponentAtPath(path).blur();
        },

        getDOMNodeForPath: function (path) {
            return ReactDOM.findDOMNode(this._getComponentAtPath(path));
        },

        getGrammarTypeForPath: function (path) {
            return "number";
        },

        setInputValue: function (path, value: string | number, cb) {
            // `value` comes in as a string on mobile, but we need a number
            // We let through the empty string so that "Clear" works -- in
            // that case, the transformer widget will just act as if there is
            // no input, which is what we want.
            if (value.length) {
                value = parseFloat(value);
                if (isNaN(value)) {
                    return;
                }
            }
            // eslint-disable-next-line react/no-string-refs
            this.refs.transform.setInputValue(path, value, cb);
        },

        getInputPaths: function () {
            // If we're in dynamic mode, then the list items are made up of
            // static text.
            if (this.props.mode === "dynamic") {
                return [];
            }
            // eslint-disable-next-line react/no-string-refs
            return this.refs.transform.getInputPaths();
        },
    }),
};

const Transformations = {
    translation: {
        // I18N: As in the command, "Translate the polygon"
        verbName: i18n._("Translate"),
        nounName: i18n._("Translation"),
        lowerNounName: i18n._("translation"),
        apply: function (transform: TranslationTransformation) {
            return function (coord) {
                return kvector.add(coord, transform.vector);
            };
        },
        isValid: function (transform: TranslationTransformation) {
            return (
                _.isFinite(transform.vector[0]) &&
                _.isFinite(transform.vector[1])
            );
        },
        isEmpty: function (transform: TranslationTransformation) {
            return transform.vector[0] === null && transform.vector[1] === null;
        },
        isNoOp: function (transform) {
            return kvector.equal(transform.vector, [0, 0]);
        },
        collapse: function (
            transform1: TranslationTransformation,
            transform2: TranslationTransformation,
        ) {
            return {
                vector: kvector.add(transform1.vector, transform2.vector),
            };
        },
        toTeX: function (transform: TranslationTransformation) {
            // I18N: As in the command, "Translation by <3, 1>"
            return i18n.$_("Translation by %(vector)s", {
                vector: texFromVector(transform.vector),
            });
        },
        Input: class extends React.Component<$FlowFixMe, $FlowFixMe> {
            state = {
                vector: this.props.vector || [null, null],
            };

            componentDidUpdate(prevProps) {
                if (!deepEq(this.props, prevProps)) {
                    this.setState({vector: this.props.vector});
                }
            }

            render(): React.Node {
                const InputComponent = inputComponentForApiOptions(
                    this.props.apiOptions,
                );
                const {TeX} = getDependencies();

                const vector = [
                    <TeX key="<">{i18n.doNotTranslate("\\langle")}</TeX>,
                    <InputComponent
                        key="vec_x"
                        // eslint-disable-next-line react/no-string-refs
                        ref="x"
                        placeholder={0}
                        value={this.state.vector[0]}
                        useArrowKeys={true}
                        onChange={(val0) => {
                            const val1 = this.state.vector[1];
                            this.setState({vector: [val0, val1]}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "x")}
                        onBlur={_.partial(this.props.onBlur, "x")}
                        keypadElement={this.props.keypadElement}
                    />,
                    <TeX key=",">{", {}"}</TeX>,
                    <InputComponent
                        key="vec_y"
                        // eslint-disable-next-line react/no-string-refs
                        ref="y"
                        placeholder={0}
                        value={this.state.vector[1]}
                        useArrowKeys={true}
                        onChange={(val1) => {
                            const val0 = this.state.vector[0];
                            this.setState({vector: [val0, val1]}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "y")}
                        onBlur={_.partial(this.props.onBlur, "y")}
                        keypadElement={this.props.keypadElement}
                    />,
                    <TeX key=">">{i18n.doNotTranslate("\\rangle")}</TeX>,
                ];
                return (
                    <div>
                        {i18n.$_("Translation by %(vector)s", {vector: vector})}
                    </div>
                );
            }

            value = () => {
                // eslint-disable-next-line react/no-string-refs
                const x = this.refs.x.getValue();
                // eslint-disable-next-line react/no-string-refs
                const y = this.refs.y.getValue();
                return {
                    vector: [x, y],
                };
            };

            /* InputPath API */
            setInputValue = (path, value, cb) => {
                const id = _.first(path);
                const vector = _.clone(this.state.vector);
                if (id === "x") {
                    vector[0] = value;
                } else if (id === "y") {
                    vector[1] = value;
                }
                this.setState({vector: vector}, () => {
                    this.props.onChange(cb);
                });
            };

            getInputPaths = () => {
                return [["x"], ["y"]];
            };
        },
    },

    rotation: {
        // I18N: As in the command, "Rotate the polygon"
        verbName: i18n._("Rotate"),
        nounName: i18n._("Rotation"),
        lowerNounName: i18n._("rotation"),
        apply: function (transform: RotationTransformation) {
            return function (coord) {
                return kpoint.rotateDeg(
                    coord,
                    transform.angleDeg,
                    transform.center,
                );
            };
        },
        isValid: function (transform: RotationTransformation) {
            return (
                _.isFinite(transform.angleDeg) &&
                _.isFinite(transform.center[0]) &&
                _.isFinite(transform.center[1])
            );
        },
        isEmpty: function (transform: RotationTransformation) {
            return (
                transform.angleDeg === null &&
                transform.center[0] === null &&
                transform.center[1] === null
            );
        },
        isNoOp: function (transform: RotationTransformation) {
            return knumber.equal(transform.angleDeg, 0);
        },
        collapse: function (
            transform1: RotationTransformation,
            transform2: RotationTransformation,
        ) {
            if (!kpoint.equal(transform1.center, transform2.center)) {
                return false;
            }
            return {
                center: transform1.center,
                angleDeg: transform1.angleDeg + transform2.angleDeg,
            };
        },
        toTeX: function (transform: RotationTransformation) {
            return i18n.$_("Rotation by %(degrees)s about %(point)s", {
                degrees: texFromAngleDeg(transform.angleDeg),
                point: texFromPoint(transform.center),
            });
        },
        Input: class extends React.Component<$FlowFixMe, $FlowFixMe> {
            state = {
                center: this.props.center || [null, null],
                angleDeg: this.props.angleDeg || null,
            };

            componentDidUpdate(prevProps) {
                if (!deepEq(this.props, prevProps)) {
                    this.setState({
                        center: this.props.center,
                        angleDeg: this.props.angleDeg,
                    });
                }
            }

            render(): React.Node {
                const InputComponent = inputComponentForApiOptions(
                    this.props.apiOptions,
                );
                const {TeX} = getDependencies();

                const point = [
                    <TeX key="(">(</TeX>,
                    <InputComponent
                        key="X"
                        // eslint-disable-next-line react/no-string-refs
                        ref="centerX"
                        placeholder={0}
                        value={this.state.center[0]}
                        useArrowKeys={true}
                        onChange={(val0) => {
                            const val1 = this.state.center[1];
                            this.setState({center: [val0, val1]}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "centerX")}
                        onBlur={_.partial(this.props.onBlur, "centerX")}
                        keypadElement={this.props.keypadElement}
                    />,
                    <TeX key=",">{", {}"}</TeX>,
                    <InputComponent
                        key="Y"
                        // eslint-disable-next-line react/no-string-refs
                        ref="centerY"
                        placeholder={0}
                        value={this.state.center[1]}
                        useArrowKeys={true}
                        onChange={(val1) => {
                            const val0 = this.state.center[0];
                            this.setState({center: [val0, val1]}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "centerY")}
                        onBlur={_.partial(this.props.onBlur, "centerY")}
                        keypadElement={this.props.keypadElement}
                    />,
                    <TeX key=")">)</TeX>,
                ];
                const degrees = [
                    <InputComponent
                        key="deg"
                        // eslint-disable-next-line react/no-string-refs
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
                        onBlur={_.partial(this.props.onBlur, "angleDeg")}
                        keypadElement={this.props.keypadElement}
                    />,
                    DEGREE_SIGN,
                ];
                // I18N: %(point)s must come before %(degrees)s in this phrase
                const text = i18n.$_(
                    "Rotation about %(point)s by %(degrees)s",
                    {
                        point,
                        degrees,
                    },
                );

                return <div>{text}</div>;
            }

            value = () => {
                // eslint-disable-next-line react/no-string-refs
                const angleDeg = this.refs.angleDeg.getValue();
                // eslint-disable-next-line react/no-string-refs
                const centerX = this.refs.centerX.getValue();
                // eslint-disable-next-line react/no-string-refs
                const centerY = this.refs.centerY.getValue();
                return {
                    angleDeg: angleDeg,
                    center: [centerX, centerY],
                };
            };

            /* InputPath API */
            setInputValue = (path, value, cb) => {
                const id = _.first(path);
                let angleDeg = _.clone(this.state.angleDeg);
                const center = _.clone(this.state.center);
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
            };

            getInputPaths = () => {
                return [["centerX"], ["centerY"], ["angleDeg"]];
            };
        },
    },

    reflection: {
        // I18N: As in the command, "Reflect the polygon"
        verbName: i18n._("Reflect"),
        nounName: i18n._("Reflection"),
        lowerNounName: i18n._("reflection"),
        apply: function (transform: ReflectionTransformation) {
            return function (coord) {
                return kpoint.reflectOverLine(coord, transform.line);
            };
        },
        isValid: function (transform: ReflectionTransformation) {
            // A bit hacky, but we'll also define reflecting over a
            // single point as a no-op, to avoid NaN fun.
            return (
                _.all(_.flatten(transform.line), _.isFinite) &&
                !kpoint.equal(transform.line[0], transform.line[1])
            );
        },
        isEmpty: function (transform: ReflectionTransformation) {
            return _.all(_.flatten(transform.line), _.isNull);
        },
        isNoOp: function (transform: ReflectionTransformation) {
            // Invalid transforms are implicitly no-ops, so we don't
            // have to catch that case here.
            return false;
        },
        collapse: function (
            transform1: ReflectionTransformation,
            transform2: ReflectionTransformation,
        ) {
            // $FlowFixMe[incompatible-call]
            if (!kline.equal(transform1.line, transform2.line)) {
                return false;
            }
            return [];
        },
        toTeX: function (transform) {
            const point1 = transform.line[0];
            const point2 = transform.line[1];
            return i18n.$_(
                "Reflection over the line from %(point1)s to %(point2)s",
                {
                    point1: texFromPoint(point1),
                    point2: texFromPoint(point2),
                },
            );
        },
        Input: class extends React.Component<$FlowFixMe, $FlowFixMe> {
            state = {
                line: this.props.line || [
                    [null, null],
                    [null, null],
                ],
            };

            componentDidUpdate(prevProps) {
                if (!deepEq(this.props, prevProps)) {
                    this.setState({line: this.props.line});
                }
            }

            render(): React.Node {
                const InputComponent = inputComponentForApiOptions(
                    this.props.apiOptions,
                );
                const {TeX} = getDependencies();

                const point1 = [
                    <TeX key="(">(</TeX>,
                    <InputComponent
                        key="x1"
                        // eslint-disable-next-line react/no-string-refs
                        ref="x1"
                        value={this.state.line[0][0]}
                        useArrowKeys={true}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.changePoint.bind(this, 0, 0)}
                        onFocus={_.partial(this.props.onFocus, "x1")}
                        onBlur={_.partial(this.props.onBlur, "x1")}
                        keypadElement={this.props.keypadElement}
                    />,
                    <TeX key=",">{", {}"}</TeX>,
                    <InputComponent
                        key="y1"
                        // eslint-disable-next-line react/no-string-refs
                        ref="y1"
                        value={this.state.line[0][1]}
                        useArrowKeys={true}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.changePoint.bind(this, 0, 1)}
                        onFocus={_.partial(this.props.onFocus, "y1")}
                        onBlur={_.partial(this.props.onBlur, "y1")}
                        keypadElement={this.props.keypadElement}
                    />,
                    <TeX key=")">)</TeX>,
                ];
                const point2 = [
                    <TeX key="(">(</TeX>,
                    <InputComponent
                        key="x2"
                        // eslint-disable-next-line react/no-string-refs
                        ref="x2"
                        value={this.state.line[1][0]}
                        useArrowKeys={true}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.changePoint.bind(this, 1, 0)}
                        onFocus={_.partial(this.props.onFocus, "x2")}
                        onBlur={_.partial(this.props.onBlur, "x2")}
                        keypadElement={this.props.keypadElement}
                    />,
                    <TeX key=",">{", {}"}</TeX>,
                    <InputComponent
                        key="y2"
                        // eslint-disable-next-line react/no-string-refs
                        ref="y2"
                        value={this.state.line[1][1]}
                        useArrowKeys={true}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.changePoint.bind(this, 1, 1)}
                        onFocus={_.partial(this.props.onFocus, "y2")}
                        onBlur={_.partial(this.props.onBlur, "y2")}
                        keypadElement={this.props.keypadElement}
                    />,
                    <TeX key=")">)</TeX>,
                ];
                return (
                    <div>
                        {i18n.$_(
                            "Reflection over the line from " +
                                "%(point1)s to %(point2)s",
                            {point1, point2},
                        )}
                    </div>
                );
            }

            changePoint = (i, j, val, cb) => {
                const line = _.map(this.state.line, _.clone);
                line[i][j] = val;
                this.setState({line: line}, () => {
                    this.props.onChange(cb);
                });
            };

            value = () => {
                // eslint-disable-next-line react/no-string-refs
                const x1 = this.refs.x1.getValue();
                // eslint-disable-next-line react/no-string-refs
                const y1 = this.refs.y1.getValue();
                // eslint-disable-next-line react/no-string-refs
                const x2 = this.refs.x2.getValue();
                // eslint-disable-next-line react/no-string-refs
                const y2 = this.refs.y2.getValue();
                return {
                    line: [
                        [x1, y1],
                        [x2, y2],
                    ],
                };
            };

            /* InputPath API */
            setInputValue = (path, value, cb) => {
                const id = _.first(path);
                let j;
                if (id[0] === "x") {
                    j = 0;
                } else if (id[0] === "y") {
                    j = 1;
                }
                let i;
                if (id[1] === "1") {
                    i = 0;
                } else if (id[1] === "2") {
                    i = 1;
                }
                this.changePoint(i, j, value, cb);
            };

            getInputPaths = () => {
                return [["x1"], ["y1"], ["x2"], ["y2"]];
            };
        },
    },

    dilation: {
        // I18N: As in the command, "Dilate the polygon"
        verbName: i18n._("Dilate"),
        nounName: i18n._("Dilation"),
        lowerNounName: i18n._("dilation"),
        apply: function (transform: DilationTransformation) {
            return function (coord) {
                return dilatePointFromCenter(
                    coord,
                    transform.center,
                    transform.scale,
                );
            };
        },
        isValid: function (transform: DilationTransformation) {
            return (
                _.isFinite(transform.scale) &&
                _.isFinite(transform.center[0]) &&
                _.isFinite(transform.center[1])
            );
        },
        isEmpty: function (transform: DilationTransformation) {
            return (
                transform.scale === null &&
                transform.center[0] === null &&
                transform.center[1] === null
            );
        },
        isNoOp: function (transform: DilationTransformation) {
            return knumber.equal(transform.scale, 1);
        },
        collapse: function (
            transform1: DilationTransformation,
            transform2: DilationTransformation,
        ) {
            if (!kpoint.equal(transform1.center, transform2.center)) {
                return false;
            }
            return {
                center: transform1.center,
                scale: transform1.scale * transform2.scale,
            };
        },
        toTeX: function (transform: DilationTransformation) {
            const scaleString = stringFromFraction(transform.scale);
            return i18n.$_("Dilation of scale %(scale)s about %(point)s", {
                scale: scaleString,
                point: texFromPoint(transform.center),
            });
        },
        Input: class extends React.Component<$FlowFixMe, $FlowFixMe> {
            state = {
                center: this.props.center || [null, null],
                scale: this.props.scale || null,
            };

            componentDidUpdate(prevProps) {
                if (!deepEq(this.props, prevProps)) {
                    this.setState({
                        center: this.props.center,
                        scale: this.props.scale,
                    });
                }
            }

            render(): React.Node {
                const InputComponent = inputComponentForApiOptions(
                    this.props.apiOptions,
                );
                const {TeX} = getDependencies();

                const point = [
                    <TeX key="(">(</TeX>,
                    <InputComponent
                        key="point_x"
                        // eslint-disable-next-line react/no-string-refs
                        ref="x"
                        placeholder={0}
                        value={this.state.center[0]}
                        useArrowKeys={true}
                        onChange={(val0) => {
                            const val1 = this.state.center[1];
                            this.setState({center: [val0, val1]}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "x")}
                        onBlur={_.partial(this.props.onBlur, "x")}
                        keypadElement={this.props.keypadElement}
                    />,
                    <TeX key=",">{", {}"}</TeX>,
                    <InputComponent
                        key="point_y"
                        // eslint-disable-next-line react/no-string-refs
                        ref="y"
                        placeholder={0}
                        value={this.state.center[1]}
                        useArrowKeys={true}
                        onChange={(val1) => {
                            const val0 = this.state.center[0];
                            this.setState({center: [val0, val1]}, () => {
                                this.props.onChange();
                            });
                        }}
                        onFocus={_.partial(this.props.onFocus, "y")}
                        onBlur={_.partial(this.props.onBlur, "y")}
                        keypadElement={this.props.keypadElement}
                    />,
                    <TeX key=")">)</TeX>,
                ];
                const scale = (
                    <InputComponent
                        // eslint-disable-next-line react/no-string-refs
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
                        onBlur={_.partial(this.props.onBlur, "scale")}
                        keypadElement={this.props.keypadElement}
                    />
                );
                return (
                    <div>
                        {i18n.$_("Dilation about %(point)s by %(scale)s", {
                            point,
                            scale,
                        })}
                    </div>
                );
            }

            value = () => {
                // eslint-disable-next-line react/no-string-refs
                const scale = this.refs.scale.getValue();
                // eslint-disable-next-line react/no-string-refs
                const x = this.refs.x.getValue();
                // eslint-disable-next-line react/no-string-refs
                const y = this.refs.y.getValue();
                return {
                    scale: scale,
                    center: [x, y],
                };
            };

            /* InputPath API */
            setInputValue = (path, value, cb) => {
                const id = _.first(path);
                let scale = this.state.scale;
                const center = _.clone(this.state.center);
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
            };

            getInputPaths = () => {
                return [["x"], ["y"], ["scale"]];
            };
        },
    },
};

/* Various functions to deal with different shape types */
const ShapeTypes = {
    getPointCountForType: function (type) {
        const splitType = type.split("-");
        if (splitType[0] === "polygon") {
            return splitType[1] || 3;
        }
        if (splitType[0] === "line" || splitType[0] === "lineSegment") {
            return 2;
        }
        if (splitType[0] === "angle") {
            return 3;
        }
        if (splitType[0] === "circle") {
            return 2;
        }
        if (splitType[0] === "point") {
            return 1;
        }
    },

    addMovableShape: function (graphie, options) {
        if (options.editable && options.translatable) {
            throw new PerseusError(
                "It doesn't make sense to have a movable shape " +
                    "where you can stretch the points and translate them " +
                    "simultaneously. options: " +
                    JSON.stringify(options),
                Errors.InvalidInput,
            );
        }

        const points = _.map(options.shape.coords, function (coord) {
            let isMoving = false;
            let previousCoord = coord;

            const onMove = function (x, y) {
                if (!isMoving) {
                    previousCoord = currentPoint.coord;
                    isMoving = true;
                }

                let moveVector = kvector.subtract([x, y], currentPoint.coord);

                // Translate from (x, y) semantics to (dX, dY) semantics
                // This is more useful for translations on multiple points,
                // where we care about how the points moved, not where any
                // individual point ended up
                if (options.onMove) {
                    moveVector = options.onMove(moveVector[0], moveVector[1]);
                }

                // Perform a translation on all points in this shape when
                // any point moves
                if (options.translatable) {
                    _.each(points, function (point) {
                        // The point itself will be updated by the
                        // movablePoint class, so only translate the other
                        // points
                        if (point !== currentPoint) {
                            point.setCoord(
                                kvector.add(point.coord, moveVector),
                            );
                        }
                    });
                }

                // Update our shape and our currentPoint
                // Without this, some shapes (circles, angles) appear
                // "bouncy" as they are updated with currentPoint at the
                // current mouse coordinate (oldCoord), rather than newCoord
                const oldCoord = currentPoint.coord;
                const newCoord = kvector.add(currentPoint.coord, moveVector);
                // Temporarily change our coordinate so that
                // shape.update() sees the new coordinate
                currentPoint.coord = newCoord;
                shape.update();
                // ...But don't break onMove, which assumes it
                // is the only thing changing our coord
                currentPoint.coord = oldCoord;
                return newCoord;
            };

            const onMoveEnd = function () {
                // onMove isn't guaranteed to be called before onMoveEnd, so
                // we have to take into account that we may not have moved and
                // set previousCoord.
                // $FlowFixMe[prop-missing]
                if (options.onMoveEnd && isMoving) {
                    isMoving = false;
                    // We don't use the supplied x and y parameters here
                    // because MovablePoint's onMoveEnd semantics suck.
                    // It returns the mouseX, mouseY without processing them
                    // through onMove, leaving us with weird fractional moves
                    const change = kvector.subtract(
                        currentPoint.coord,
                        previousCoord,
                    );
                    options.onMoveEnd(change[0], change[1]);
                }
                shape.update();
            };

            const currentPoint = graphie.addMovablePoint({
                coord: coord,
                normalStyle: options.normalPointStyle,
                highlightStyle: options.highlightPointStyle,
                constraints: {
                    fixed: !options.translatable && !options.editable,
                },
                visible: options.showPoints,
                // $FlowFixMe[prop-missing]
                snapX: (options.snap && options.snap[0]) || 0,
                // $FlowFixMe[prop-missing]
                snapY: (options.snap && options.snap[1]) || 0,
                bounded: false, // Don't bound it when placing it on the graph
                onMove: onMove,
                onMoveEnd: onMoveEnd,
            });

            // Bound it when moving
            // We can't set this earlier, because doing so would mean any
            // points outside of the graph would be moved into a moved into
            // a position that doesn't preserve the shape
            currentPoint.bounded = true;

            return currentPoint;
        });

        const shape = ShapeTypes.addShape(graphie, options, points);
        const removeShapeWithoutPoints = shape.remove;
        shape.remove = function () {
            removeShapeWithoutPoints.apply(shape);
            _.invoke(points, "remove");
        };
        return shape;
    },

    addShape: function (graphie, options, points) {
        points = points || options.shape.coords;

        const types = ShapeTypes._typesOf(options.shape);
        const typeOptions =
            options.shape.options || ShapeTypes.defaultOptions(types);

        const shapes = ShapeTypes._mapTypes(
            types,
            points,
            function (type, points, i) {
                const shapeOptions = _.extend({}, options, typeOptions[i]);
                return ShapeTypes._addType(graphie, type, points, shapeOptions);
            },
        );

        const updateFuncs = _.filter(_.pluck(shapes, "update"), _.identity);
        const update = function () {
            _.invoke(updateFuncs, "call");
        };

        const removeFuncs = _.filter(_.pluck(shapes, "remove"), _.identity);
        const remove = function () {
            _.invoke(removeFuncs, "call");
        };

        const getOptions = function () {
            return _.map(shapes, function (shape) {
                if (shape.getOptions) {
                    return shape.getOptions();
                }
                return {};
            });
        };

        const toJSON = function () {
            const coords = _.map(points, function (pt) {
                if (_.isArray(pt)) {
                    return pt;
                }
                return pt.coord;
            });
            return {
                type: types,
                coords: coords,
                options: getOptions(),
            };
        };

        return {
            type: types,
            points: points,
            update: update,
            remove: remove,
            toJSON: toJSON,
            getOptions: getOptions,
        };
    },

    equal: function (shape1, shape2) {
        const types1 = ShapeTypes._typesOf(shape1);
        const types2 = ShapeTypes._typesOf(shape2);
        if (types1.length !== types2.length) {
            return false;
        }
        const shapes1 = ShapeTypes._mapTypes(
            types1,
            shape1.coords,
            ShapeTypes._combine,
        );
        const shapes2 = ShapeTypes._mapTypes(
            types2,
            shape2.coords,
            ShapeTypes._combine,
        );
        return _.all(
            _.map(shapes1, function (partialShape1, i) {
                const partialShape2 = shapes2[i];
                if (partialShape1.type !== partialShape2.type) {
                    return false;
                }
                return ShapeTypes._forType(partialShape1.type).equal(
                    partialShape1.coords,
                    partialShape2.coords,
                );
            }),
        );
    },

    _typesOf: function (shape) {
        let types = shape.type;
        if (!_.isArray(types)) {
            types = [types];
        }
        return _.map(types, function (type) {
            if (type === "polygon") {
                return "polygon-3";
            }
            return type;
        });
    },

    defaultOptions: function (types) {
        return _.map(types, function (type) {
            const typeDefaultOptions = ShapeTypes._forType(type).defaultOptions;
            return _.extend({}, typeDefaultOptions);
        });
    },

    _forType: function (type) {
        const baseType = type.split("-")[0];
        return ShapeTypes[baseType];
    },

    _mapTypes: function (types, points, func, context) {
        return _.map(types, function (type, i) {
            const pointCount = ShapeTypes.getPointCountForType(type);
            const currentPoints = _.first(points, pointCount);
            points = _.rest(points, pointCount);
            // $FlowFixMe[extra-arg]
            return func.call(context, type, currentPoints, i);
        });
    },

    _addType: function (graphie, type, points, options) {
        const lineCoords = _.isArray(points[0])
            ? {
                  coordA: points[0],
                  coordZ: points[1],
              }
            : {
                  pointA: points[0],
                  pointZ: points[1],
              };

        type = type.split("-")[0];
        if (type === "polygon") {
            const polygon = graphie.addMovablePolygon(
                _.extend({}, options, {
                    fixed: !options.editable,
                    snapX: (options.snap && options.snap[0]) || 0,
                    snapY: (options.snap && options.snap[1]) || 0,
                    points: points,
                    constrainToGraph: false,
                }),
            );
            return {
                update: polygon.transform.bind(polygon),
                remove: polygon.remove.bind(polygon),
            };
        }
        if (type === "line" || type === "lineSegment") {
            const line = graphie.addMovableLineSegment(
                _.extend({}, options, lineCoords, {
                    movePointsWithLine: true,
                    fixed: true,
                    constraints: {
                        fixed: true,
                    },
                    extendLine: type === "line",
                }),
            );

            // TODO(jack): Hide points on uneditable lines when translation
            // is a vector.
            // We can't just remove the points yet, because they are the
            // translation handle for the line.
            return {
                update: line.transform.bind(line, true),
                remove: line.remove.bind(line),
            };
        }
        if (type === "angle") {
            // If this angle is editable, we want to be able to make angles
            // both larger and smaller than 180 degrees.
            // If this angle is not editable, it should always maintain
            // it's angle measure, even if it is reflected (causing the
            // clockwise-ness of the points to change)
            const shouldChangeReflexivity = options.editable ? null : false;

            const angle = graphie.addMovableAngle({
                angleLabel: "$deg0",
                fixed: true,
                points: points,
                normalStyle: options.normalStyle,
                reflex: options.reflex,
            });

            // Hide non-vertex points on uneditable angles
            if (!_.isArray(points[0]) && !options.editable) {
                points[0].remove();
                points[2].remove();
            }
            return {
                update: angle.update.bind(angle, shouldChangeReflexivity),
                remove: angle.remove.bind(angle),
                getOptions: function () {
                    return {
                        reflex: angle.isReflex(),
                    };
                },
            };
        }
        if (type === "circle") {
            let perimeter = {
                // temporary object for the first removal
                remove: _.identity,
            };
            const redrawPerim = function () {
                const coord0 = points[0].coord || points[0];
                const coord1 = points[1].coord || points[1];
                const radius = kpoint.distanceToPoint(coord0, coord1);
                perimeter.remove();
                perimeter = graphie.circle(
                    coord0,
                    radius,
                    _.extend(
                        {
                            stroke: KhanColors.DYNAMIC,
                            "stroke-width": 2,
                        },
                        options.normalStyle,
                    ),
                );
            };

            redrawPerim();
            if (points[1].remove && !options.editable) {
                points[1].remove();
            }

            return {
                update: redrawPerim,
                remove: function () {
                    // Not _.bind because the remove function changes
                    // when the perimeter is redrawn
                    perimeter.remove();
                },
            };
        }
        if (type === "point") {
            // do nothing
            return {
                update: null,
                remove: null,
            };
        }
        throw new PerseusError(
            "Invalid shape type " + type,
            Errors.InvalidInput,
        );
    },

    _combine: function (type, coords) {
        return {
            type: type,
            coords: coords,
        };
    },

    polygon: {
        equal: orderInsensitiveCoordsEqual,
    },

    line: {
        equal: kline.equal,
    },

    lineSegment: {
        equal: orderInsensitiveCoordsEqual,
    },

    angle: {
        equal: function (points1, points2) {
            if (!kpoint.equal(points1[1], points2[1])) {
                return false;
            }

            const line1_0 = [points1[1], points1[0]];
            const line1_2 = [points1[1], points1[2]];
            const line2_0 = [points2[1], points2[0]];
            const line2_2 = [points2[1], points2[2]];

            const equalUnflipped =
                kray.equal(line1_0, line2_0) && kray.equal(line1_2, line2_2);
            const equalFlipped =
                kray.equal(line1_0, line2_2) && kray.equal(line1_2, line2_0);

            return equalUnflipped || equalFlipped;
        },

        defaultOptions: {
            reflex: false,
        },
    },

    circle: {
        equal: function (points1, points2) {
            const radius1 = kpoint.distanceToPoint(points1[0], points1[1]);
            const radius2 = kpoint.distanceToPoint(points2[0], points2[1]);
            return (
                kpoint.equal(points1[0], points2[0]) &&
                knumber.equal(radius1, radius2)
            );
        },
    },

    point: {
        equal: kpoint.equal,
    },
};

const TransformationListItem = TransformOps.ListItem;

class TransformationList extends React.Component<$FlowFixMe, $FlowFixMe> {
    render(): React.Node {
        if (this.props.mode === "static") {
            return <span />; // don't render anything
        }

        const transformationList = _.map(
            this.props.transformations,
            function (transform, i) {
                return (
                    <TransformationListItem
                        ref={"transformation" + i}
                        key={"transformation" + i}
                        transform={transform}
                        mode={this.props.mode}
                        onChange={this.handleChange}
                        onFocus={_.partial(this.props.onFocus, "" + i)}
                        onBlur={_.partial(this.props.onBlur, "" + i)}
                        keypadElement={this.props.keypadElement}
                        apiOptions={this.props.apiOptions}
                    />
                );
            },
            this,
        );

        return (
            <div className="perseus-transformation-list">
                {transformationList}
            </div>
        );
    }

    _transformationRefs = () => {
        return _.times(this.props.transformations.length, (i) => {
            // eslint-disable-next-line react/no-string-refs
            return this.refs["transformation" + i];
        });
    };

    value = () => {
        return _.invoke(this._transformationRefs(), "value");
    };

    handleChange = (changed, callback) => {
        this.props.onChange(this.value(), callback);
    };

    focusLast = () => {
        const transformationRefs = this._transformationRefs();
        if (transformationRefs.length !== 0) {
            _.last(transformationRefs).focus();
        }
    };
}

class ToolButton extends React.Component<$FlowFixMe, $FlowFixMe> {
    render(): React.Node {
        const classes = this.props.toggled
            ? "simple-button exercise-orange toggled highlighted-tool-button"
            : "simple-button";

        return (
            <button
                type="button"
                className={classes}
                disabled={this.props.disabled}
                onClick={this.props.onClick}
                onTouchStart={captureScratchpadTouchStart}
            >
                {this.props.children}
            </button>
        );
    }
}

class ToolsBar extends React.Component<$FlowFixMe, $FlowFixMe> {
    state = {
        selected: null,
    };

    render(): React.Node {
        const tools = _.map(
            Transformations,
            function (tool, type) {
                if (this.props.enabled[type]) {
                    return (
                        <ToolButton
                            key={type}
                            disabled={this.props.apiOptions.readOnly}
                            toggled={this.state.selected === type}
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick={this.changeSelected.bind(this, type)}
                        >
                            {tool.verbName}
                        </ToolButton>
                    );
                }
            },
            this,
        );

        return (
            <div className="transformer-tools-bar">
                <span className="simple-button-group">{tools}</span>
                <button
                    className="transformer-undo-button simple-button"
                    type="button"
                    disabled={this.props.apiOptions.readOnly}
                    onClick={this.props.onUndoClick}
                    onTouchStart={captureScratchpadTouchStart}
                >
                    <InlineIcon {...iconUndo} />
                    {" " + i18n._("Undo")}
                </button>
                <div className="clear" />
            </div>
        );
    }

    changeSelected = (tool) => {
        this.props.removeTool(this.state.selected);

        if (!tool || tool === this.state.selected) {
            this.setState({
                selected: null,
            });
        } else {
            this.props.addTool(tool);
            this.setState({
                selected: tool,
            });
        }
    };
}

class AddTransformBar extends React.Component<$FlowFixMe, $FlowFixMe> {
    render(): React.Node {
        const tools = _.map(
            Transformations,
            function (tool, type) {
                if (this.props.enabled[type]) {
                    return (
                        <ToolButton
                            key={type}
                            toggled={false}
                            disabled={this.props.apiOptions.readOnly}
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick={this.changeSelected.bind(this, type)}
                        >
                            <InlineIcon {...iconPlus} /> {tool.nounName}
                        </ToolButton>
                    );
                }
            },
            this,
        );

        return (
            <div className="transformer-tools-bar">
                {tools}
                <button
                    className="transformer-undo-button simple-button"
                    type="button"
                    onClick={this.props.onUndoClick}
                    disabled={this.props.apiOptions.readOnly}
                    onTouchStart={captureScratchpadTouchStart}
                >
                    <InlineIcon {...iconUndo} />
                    {" " + i18n._("Undo")}
                </button>
                <div className="clear" />
            </div>
        );
    }

    changeSelected = (tool) => {
        if (tool) {
            this.props.addTool(tool);
        }
    };
}

type Graphie = $FlowFixMe;
type Tool = $FlowFixMe;
type ToolCleanup = $FlowFixMe;

type Rubric = PerseusTransformerWidgetOptions;
type RenderProps = PerseusTransformerWidgetOptions; // there's no transform in the exports
type UserInput = $FlowFixMe;
type Props = {|
    ...WidgetProps<RenderProps, Rubric>,
    transformations: $ReadOnlyArray<TransformerTransformation>,
    keypadElement: $FlowFixMe,
|};

class Transformer extends React.Component<Props> {
    tools: {|[string]: Tool|};
    currentTool: ?Tool;
    transformations: $ReadOnlyArray<TransformerTransformation>;
    shape: ?$FlowFixMe; // This is not the same as TransformerShape
    dilationCircle: ?$FlowFixMe;
    rotatePoint: ?$FlowFixMe;
    rotateHandle: ?$FlowFixMe;

    static defaultProps: $FlowFixMe = _.defaults(
        {
            transformations: [],
        },
        defaultTransformerProps,
    );

    render(): React.Node {
        // Fill in any missing value in this.props.graph
        // this can happen because the graph json doesn't include
        // box, for example
        const graph = _.extend(
            defaultGraphProps(this.props.graph, defaultBoxSize),
            this.props.graph,
        );

        const interactiveToolsMode = this.props.graphMode === "interactive";

        const ToolsBarClass = interactiveToolsMode ? ToolsBar : AddTransformBar;

        // This style is applied inline because it is dependent on the
        // size of the graph as set by the graph.box prop, and this also
        // lets us specify it in the same place the graph's width is
        // specified.
        const toolsBar = (
            <div style={{width: graph.box[0]}}>
                <ToolsBarClass
                    // eslint-disable-next-line react/no-string-refs
                    ref="toolsBar"
                    enabled={pluckObject(this.props.tools, "enabled")}
                    apiOptions={this.props.apiOptions}
                    addTool={this.addTool}
                    removeTool={this.removeTool}
                    onUndoClick={this.handleUndoClick}
                />
            </div>
        );

        return (
            <div className={"perseus-widget " + "perseus-widget-transformer"}>
                <Graph
                    // eslint-disable-next-line react/no-string-refs
                    ref="graph"
                    box={graph.box}
                    range={graph.range}
                    labels={graph.labels}
                    step={graph.step}
                    gridStep={graph.gridStep}
                    markings={graph.markings}
                    backgroundImage={graph.backgroundImage}
                    showProtractor={graph.showProtractor}
                    onGraphieUpdated={this.setupGraphie}
                    setDrawingAreaAvailable={
                        this.props.apiOptions.setDrawingAreaAvailable
                    }
                />

                {!interactiveToolsMode && i18n._("Add transformations below:")}

                {this.props.graphMode === "static" && [
                    <br key="static-br" />,
                    <em key="static-nomove">
                        {" "}
                        {i18n._(
                            "Note: For this question, the shape will not move.",
                        )}{" "}
                    </em>,
                ]}

                {interactiveToolsMode && toolsBar}

                <TransformationList
                    // eslint-disable-next-line react/no-string-refs
                    ref="transformationList"
                    mode={this.props.listMode}
                    transformations={this.props.transformations}
                    onChange={this.setTransformationProps}
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur}
                    keypadElement={this.props.keypadElement}
                    apiOptions={this.props.apiOptions}
                />

                {!interactiveToolsMode && toolsBar}
            </div>
        );
    }

    componentDidMount() {
        this.setupGraphie(this.graphie());
    }

    componentDidUpdate(prevProps: Props) {
        if (this.shouldSetupGraphie(this.props, prevProps)) {
            // eslint-disable-next-line react/no-string-refs
            this.refs.graph.reset();
        } else if (!deepEq(this.props.transformations, this.transformations)) {
            this.setTransformations(this.props.transformations);
        }
    }

    shouldSetupGraphie: (Props, Props) => boolean = (nextProps, prevProps) => {
        if (!deepEq(prevProps.starting, nextProps.starting)) {
            return true;
        }
        if (prevProps.graphMode !== nextProps.graphMode) {
            return true;
        }
        if (prevProps.listMode !== nextProps.listMode) {
            return true;
        }
        if (prevProps.drawSolutionShape !== nextProps.drawSolutionShape) {
            return true;
        }
        if (
            nextProps.drawSolutionShape &&
            !deepEq(prevProps.correct.shape, nextProps.correct.shape)
        ) {
            return true;
        }
        if (!deepEq(this.tools, nextProps.tools)) {
            return true;
        }
        return false;
    };

    graphie: () => Graphie = () => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.graph.graphie();
    };

    setupGraphie: (Graphie) => void = (graphie) => {
        // A background image of our solution:
        if (
            this.props.drawSolutionShape &&
            this.props.correct.shape &&
            this.props.correct.shape.coords
        ) {
            ShapeTypes.addShape(graphie, {
                fixed: true,
                shape: this.props.correct.shape,
                normalStyle: {
                    stroke: KhanColors.GRAY,
                    "stroke-dasharray": "",
                    "stroke-width": 2,
                },
            });
        }

        this.currentTool = null;
        // eslint-disable-next-line react/no-string-refs
        this.refs.toolsBar.changeSelected(null);
        this.addTransformerShape(
            this.props.starting.shape,
            /* translatable */ false,
        );
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
            dilation: _.clone(this.props.tools.dilation),
        };
    };

    /* Applies all transformations in `transformations`
     * to the starting shape, and updates this.transformations
     * to reflect this
     *
     * Usually called with this.props.transformations
     */
    setTransformations: ($ReadOnlyArray<TransformerTransformation>) => void = (
        transformations,
    ) => {
        this.resetCoords();
        this.transformations = _.clone(transformations);
        _.each(this.transformations, this.applyTransform);
    };

    // the polygon that we transform
    addTransformerShape: ($FlowFixMe, boolean) => void = (
        shape,
        translatable,
    ) => {
        const self = this;
        const graphie = this.graphie();

        this.shape = ShapeTypes.addMovableShape(graphie, {
            shape: shape,
            editable: false,
            showPoints: this.props.graphMode !== "static",
            translatable: translatable,
            onMove: function (dX, dY) {
                dX = KhanMath.roundToNearest(graphie.snap[0], dX);
                dY = KhanMath.roundToNearest(graphie.snap[1], dY);
                // NOTE(kevinb): object is missing .constraints property
                // $FlowFixMe[prop-missing]
                self.addTransform({
                    type: "translation",
                    vector: [dX, dY],
                });
                return [dX, dY];
            },
            normalPointStyle: {
                fill: translatable
                    ? KhanColors.INTERACTIVE
                    : KhanColors.DYNAMIC,
                stroke: translatable
                    ? KhanColors.INTERACTIVE
                    : KhanColors.DYNAMIC,
            },
            highlightPointStyle: {
                fill: KhanColors.INTERACTING,
                stroke: KhanColors.INTERACTING,
            },
        });
    };

    addTool: (TransformerTransformation["type"]) => void = (toolId) => {
        const self = this;

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
                throw new PerseusError(
                    "Invalid tool id: " + toolId,
                    Errors.InvalidInput,
                );
            }
        } else {
            let transform: TransformerTransformation;
            if (toolId === "translation") {
                // NOTE(kevinb): object is missing .constraints property
                // $FlowFixMe[prop-missing]
                transform = {
                    type: "translation",
                    // NOTE(kevib): these should be numbers
                    // $FlowFixMe[incompatible-type]
                    vector: [null, null],
                };
            } else if (toolId === "rotation") {
                // NOTE(kevinb): object is missing .constraints property
                // $FlowFixMe[prop-missing]
                transform = {
                    type: "rotation",
                    // NOTE(kevib): these should be numbers
                    // $FlowFixMe[incompatible-type]
                    center: [null, null],
                    // NOTE(kevib): this should be a number
                    // $FlowFixMe[incompatible-type]
                    angleDeg: null,
                };
            } else if (toolId === "reflection") {
                // Reflections with nulls in them won't be applied until
                // fills in the blanks
                transform = {
                    type: "reflection",
                    line: [
                        // NOTE(kevib): these should be numbers
                        // $FlowFixMe[incompatible-type]
                        [null, null],
                        // NOTE(kevib): these should be numbers
                        // $FlowFixMe[incompatible-type]
                        [null, null],
                    ],
                };
            } else if (toolId === "dilation") {
                // NOTE(kevinb): object is missing .constraints property
                // $FlowFixMe[prop-missing]
                transform = {
                    type: "dilation",
                    // NOTE(kevib): these should be numbers
                    // $FlowFixMe[incompatible-type]
                    center: [null, null],
                    // NOTE(kevib): this should be a number
                    // $FlowFixMe[incompatible-type]
                    scale: null,
                };
            } else {
                throw new PerseusError(
                    "Invalid tool id: " + toolId,
                    Errors.InvalidInput,
                );
            }

            // $FlowFixMe[prop-missing]
            this.doTransform(transform, function () {
                self.refs.transformationList.focusLast();
            });
        }
    };

    removeTool: (string) => void = (toolId) => {
        if (this.currentTool) {
            this.currentTool.remove();
        }
        this.currentTool = null;
    };

    addTranslationTool: () => $FlowFixMe = () => {
        const self = this;
        this.shape?.remove();
        this.addTransformerShape(this.shape?.toJSON(), /* translatable */ true);

        return {
            remove: function () {
                self.shape?.remove();
                self.addTransformerShape(
                    self.shape?.toJSON(),
                    /* translatable */ false,
                );
            },
        };
    };

    // Snaps a coord to this.graphie()'s snap
    snapCoord: (Coord) => Coord = (coord) => {
        const graphie = this.graphie();
        return _.map(coord, function (val, dim) {
            return KhanMath.roundToNearest(graphie.snap[dim], val);
        });
    };

    // Normalize the coords into something that fits the new 45 degree
    // reflection line.
    normalizeReflectionCoords: ([Coord, Coord]) => [Coord, Coord] = (
        messyCoords,
    ) => {
        // $FlowFixMe[incompatible-call]
        const midpoint = this.snapCoord(kline.midpoint(messyCoords));
        const origDirectionPolar = kvector.polarDegFromCart(
            kvector.subtract(messyCoords[0], messyCoords[1]),
        );

        const direction = kvector.cartFromPolarDeg(
            1,
            KhanMath.roundToNearest(45, origDirectionPolar[1]),
        );
        const coords = _.map(
            [-1, 1],
            function (directionCoefficient) {
                const coord = kvector.add(
                    midpoint,
                    kvector.scale(
                        direction,
                        directionCoefficient *
                            this.scaleToCurrentRange(
                                REFLECT_ROTATE_HANDLE_DIST,
                            ),
                    ),
                );
                return this.snapCoord(coord);
            },
            this,
        );
        return coords;
    };

    addReflectionTool: () => ToolCleanup = () => {
        const options = this.props.tools.reflection;
        if (!options.enabled) {
            return;
        }
        const self = this;
        // eslint-disable-next-line react/no-string-refs
        const graphie = this.refs.graph.graphie();

        const updateReflectionTool = function () {
            self.changeTool("reflection", {
                coords: _.pluck(reflectPoints, "coord"),
            });
        };

        const coords = this.normalizeReflectionCoords(options.coords);

        // The points defining the line of reflection; hidden from the
        // user.
        const reflectPoints = _.map(
            coords,
            function (coord) {
                return graphie.addMovablePoint({
                    coord: coord,
                    visible: false,
                });
            },
            this,
        );

        // the line of reflection
        // TODO(jack): graphie.style here is a hack to prevent the dashed
        // style from leaking into the rest of the shapes. Remove when
        // graphie.addMovableLineSegment doesn't leak styles anymore.
        let reflectLine;
        const normalColor = colorForTool(options);
        graphie.style({}, function () {
            reflectLine = graphie.addMovableLineSegment({
                fixed: options.constraints.fixed,
                constraints: options.constraints,
                pointA: reflectPoints[0],
                pointZ: reflectPoints[1],
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
                extendLine: true,
                normalStyle: {
                    stroke: normalColor,
                    "stroke-width": 2,
                    "stroke-dasharray": "- ",
                },
                highlightStyle: {
                    stroke: KhanColors.INTERACTING,
                    "stroke-width": 2,
                    "stroke-dasharray": "- ", // TODO(jack) solid doesn't
                    // work here, but would be
                    // nicer
                },
                movePointsWithLine: true,
                onMoveEnd: updateReflectionTool,
            });
        });

        // the "button" point in the center of the line of reflection
        const reflectButton = graphie.addReflectButton({
            fixed: options.constraints.fixed,
            line: reflectLine,
            size: this.scaleToCurrentRange(REFLECT_BUTTON_SIZE),
            onClick: function () {
                self.doTransform({
                    type: "reflection",
                    line: _.pluck(reflectPoints, "coord"),
                });
                if (reflectRotateHandle) {
                    // flip the rotation handle
                    reflectRotateHandle.setCoord(
                        kvector.add(
                            reflectButton.coord,
                            kvector.subtract(
                                reflectButton.coord,
                                reflectRotateHandle.coord,
                            ),
                        ),
                    );
                    reflectRotateHandle.update();
                }
            },
            normalStyle: {
                stroke: normalColor,
                "stroke-width": 2,
                fill: normalColor,
            },
            highlightStyle: {
                stroke: KhanColors.INTERACTING,
                "stroke-width": 3,
                fill: KhanColors.INTERACTING,
            },
            onMoveEnd: updateReflectionTool,
        });

        let reflectRotateHandle = null;
        if (!options.constraints.fixed) {
            // The rotation handle for rotating the line of reflection
            const initRotateHandleAngle =
                kvector.polarDegFromCart(
                    kvector.subtract(
                        reflectPoints[1].coord,
                        reflectPoints[0].coord,
                    ),
                )[1] + 90; // 90 degrees off of the line
            reflectRotateHandle = graphie.addRotateHandle({
                center: reflectButton,
                radius: this.scaleToCurrentRange(REFLECT_ROTATE_HANDLE_DIST),
                angleDeg: initRotateHandleAngle,
                width: this.scaleToCurrentRange(0.24),
                hoverWidth: this.scaleToCurrentRange(0.4),
                lengthAngle: 17,
                onMove: function (newAngle) {
                    return KhanMath.roundToNearest(45, newAngle);
                },
                onMoveEnd: updateReflectionTool,
            });
        }

        // Move the reflectButton and reflectRotateHandle with the line
        $(reflectLine).on("move", function () {
            reflectButton.update();
            $(reflectButton).trigger("move"); // update the rotation handle,
            // which watches for this in util/interactive.js.
        });

        // Update the line and reflect button when the reflectRotateHandle is
        // rotated
        if (reflectRotateHandle) {
            $(reflectRotateHandle).on("move", function () {
                const rotateHandleApprox = self.snapCoord(
                    // $FlowFixMe[incompatible-use]
                    reflectRotateHandle.coord,
                );

                const rotateVector = kvector.subtract(
                    rotateHandleApprox,
                    reflectButton.coord,
                );

                const flipped = reflectButton.isFlipped() ? 1 : 0;
                reflectPoints[flipped].setCoord(
                    kvector.add(
                        reflectButton.coord,
                        kvector.rotateDeg(rotateVector, 90),
                    ),
                );
                reflectPoints[1 - flipped].setCoord(
                    kvector.add(
                        reflectButton.coord,
                        kvector.rotateDeg(rotateVector, -90),
                    ),
                );

                reflectLine.transform(true);
                reflectButton.update();
            });
        }

        return {
            remove: function () {
                reflectButton.remove();
                if (reflectRotateHandle) {
                    reflectRotateHandle.remove();
                }
                reflectLine.remove();
                reflectPoints[0].remove();
                reflectPoints[1].remove();
            },
        };
    };

    /* Scales a distance from the default range of
     * [-10, 10] to the current this.props.graph.range
     *
     * Used for sizing various transformation tools
     * (rotation handle, dilation circle)
     */
    scaleToCurrentRange: (number) => number = (dist) => {
        // eslint-disable-next-line react/no-string-refs
        return scaleToRange(dist, this.refs.graph.props.range);
    };

    addRotationTool: () => ToolCleanup = () => {
        const options = this.props.tools.rotation;
        if (!options.enabled) {
            return;
        }
        const self = this;
        // eslint-disable-next-line react/no-string-refs
        const graphie = this.refs.graph.graphie();

        const pointColor = colorForTool(options);
        // The center of our rotation, which can be moved to change the
        // center of rotation
        this.rotatePoint = graphie.addMovablePoint({
            constraints: options.constraints,
            coord: options.coord,
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            normalStyle: {
                // ugh, this seems to be a global and
                "stroke-dasharray": "", // is set to dash above
                stroke: pointColor,
                fill: pointColor,
            },
            highlightStyle: {
                "stroke-dasharray": "",
                stroke: KhanColors.INTERACTING,
                fill: KhanColors.INTERACTING,
            },
        });

        // The point that we move around the center of rotation to actually
        // cause rotations
        this.rotateHandle = graphie.addRotateHandle({
            center: this.rotatePoint,
            radius: this.scaleToCurrentRange(ROTATE_HANDLE_DIST),
            width: this.scaleToCurrentRange(0.24),
            hoverWidth: this.scaleToCurrentRange(0.4),
            onMove: function (newAngle, oldAngle) {
                const transform = self.getRotationTransformFromAngle(
                    // $FlowFixMe[incompatible-use]
                    self.rotatePoint.coord,
                    newAngle - oldAngle,
                );

                // Rotate polygon with rotateHandle
                self.doTransform(transform);

                // $FlowFixMe[prop-missing]
                return oldAngle + transform.angleDeg;
            },
        });

        // Update tools.rotation.coord
        // $FlowFixMe[incompatible-use]
        this.rotatePoint.onMoveEnd = (x, y) => {
            self.changeTool("rotation", {
                coord: [x, y],
            });
        };

        return {
            remove: function () {
                self.rotateHandle?.remove();
                self.rotatePoint?.remove();
            },
        };
    };

    addDilationTool: () => ToolCleanup = () => {
        const options = this.props.tools.dilation;
        if (!options.enabled) {
            return;
        }
        const self = this;
        // eslint-disable-next-line react/no-string-refs
        const graphie = this.refs.graph.graphie();

        const pointColor = colorForTool(options);
        // the circle for causing dilation transforms
        self.dilationCircle = graphie.addCircleGraph({
            centerConstraints: options.constraints,
            center: options.coord,
            radius: self.scaleToCurrentRange(2),
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            minRadius: self.scaleToCurrentRange(1),
            snapRadius: self.scaleToCurrentRange(0.5),
            onResize: function (newRadius, oldRadius) {
                // NOTE(kevinb): object is missing .constraints property
                // $FlowFixMe[prop-missing]
                self.doTransform({
                    type: "dilation",
                    // NOTE(kevinb): It's hard to convince that this.dilationCircle
                    // will still be defined here.
                    // $FlowFixMe[incompatible-use]
                    center: self.dilationCircle.centerPoint.coord,
                    scale: newRadius / oldRadius,
                });
            },
            circleNormalStyle: {
                stroke: pointColor,
                "stroke-width": 2,
                "stroke-dasharray": "- ",
                "fill-opacity": 0,
            },
            circleHighlightStyle: {
                stroke: KhanColors.INTERACTING,
                "stroke-width": 2,
                "stroke-dasharray": "",
                fill: KhanColors.INTERACTING,
                "fill-opacity": 0.05,
            },
            centerNormalStyle: {
                stroke: pointColor,
                fill: pointColor,
                "stroke-width": 2,
                "stroke-dasharray": "",
            },
            centerHighlightStyle: {
                stroke: pointColor,
                fill: pointColor,
                "stroke-width": 2,
                "stroke-dasharray": "",
            },
        });

        // $FlowFixMe[incompatible-use]
        const origOnMoveEnd = this.dilationCircle.centerPoint.onMoveEnd;
        // $FlowFixMe[incompatible-use]
        this.dilationCircle.centerPoint.onMoveEnd = (...args) => {
            if (origOnMoveEnd) {
                origOnMoveEnd(args);
            }
            self.changeTool("dilation", {
                // $FlowFixMe[incompatible-use]
                coord: self.dilationCircle.centerPoint.coord,
            });
        };

        return {
            remove: function () {
                self.dilationCircle?.remove();
            },
        };
    };

    // returns a transformation object representing a rotation
    // rounds the angle to the nearest 15 degrees
    getRotationTransformFromAngle: (
        Coord,
        number,
    ) => TransformerTransformation = (center, angleChanged) => {
        angleChanged = (angleChanged + 360) % 360;
        if (angleChanged > 180) {
            angleChanged -= 360;
        }
        const roundedAngle =
            Math.round(angleChanged / ROTATE_SNAP_DEGREES) *
            ROTATE_SNAP_DEGREES;

        // NOTE(kevinb): return object is missing .constraints property
        // $FlowFixMe[prop-missing]
        return {
            type: "rotation",
            center: center,
            angleDeg: roundedAngle,
        };
    };

    // apply and save a transform
    doTransform: (TransformerTransformation, ?($FlowFixMe) => mixed) => void = (
        transform,
        callback,
    ) => {
        this.applyTransform(transform);
        this.addTransform(transform, callback);
    };

    // apply a transform to our polygon (without modifying our transformation
    // list)
    applyTransform: (TransformerTransformation) => void = (transform) => {
        if (this.props.graphMode !== "static") {
            const transformFunc = TransformOps.apply(transform);
            // $FlowFixMe[incompatible-call]
            this.applyCoordTransformation(transformFunc);
        }
    };

    // transform our polygon by transforming each point using a given function
    applyCoordTransformation: (TransformerTransformation) => void = (
        pointTransform,
    ) => {
        // $FlowFixMe[incompatible-use]
        _.each(this.shape.points, function (point) {
            // $FlowFixMe[prop-missing]
            const newCoord = pointTransform(point.coord);
            point.setCoord(newCoord);
        });
        this.shape?.update();
    };

    resetCoords: () => void = () => {
        const startCoords = this.props.starting.shape.coords;
        // $FlowFixMe[incompatible-use]
        _.each(this.shape.points, function (point, i) {
            point.setCoord(startCoords[i]);
        });
        this.shape?.update();
    };

    // Remove the last transformation
    handleUndoClick: () => void = () => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.toolsBar.changeSelected(null);
        if (this.props.transformations.length) {
            this.props.onChange({
                transformations: _.initial(this.props.transformations),
            });
        }
    };

    setTransformationProps: (
        $ReadOnlyArray<TransformerTransformation>,
        ($FlowFixMe) => mixed,
    ) => void = (newTransfomationList, callback) => {
        this.props.onChange(
            {
                transformations: newTransfomationList,
            },
            callback,
        );
    };

    // add a transformation to our props list of transformation
    addTransform: (TransformerTransformation, ?($FlowFixMe) => mixed) => void =
        (transform, callback) => {
            this.transformations = TransformOps.append(
                this.transformations,
                transform,
            );
            this.props.onChange(
                {
                    transformations: _.clone(this.transformations),
                },
                callback,
            );
        };

    changeTool: (Tool, $FlowFixMe) => void = (tool, changes) => {
        const newTools = _.clone(this.props.tools);
        newTools[tool] = _.extend({}, this.props.tools[tool], changes);
        this.tools[tool] = _.clone(newTools[tool]);
        this.props.onChange({
            tools: newTools,
        });
        this.props.trackInteraction();
    };

    simpleValidate: (Rubric) => PerseusScore = (rubric) => {
        return Transformer.validate(this.getUserInput(), rubric);
    };

    /**
     * Calculate where the coordinates would be if they were
     * moved, even if we're in formal mode with no movement
     * (and thus the actual movablepoints may not have moved
     */
    getCoords: () => Coord = () => {
        const startCoords = this.props.starting.shape.coords;
        const transforms = this.props.transformations;
        return _.reduce(
            transforms,
            function (coords, transform) {
                return _.map(coords, TransformOps.apply(transform));
            },
            startCoords,
        );
    };

    getEditorJSON: () => $FlowFixMe = () => {
        const json = _.pick(
            this.props,
            "grading",
            "starting",
            "graphMode",
            "listMode",
            "tools",
            "drawSolutionShape",
            "gradeEmpty",
        );
        // eslint-disable-next-line react/no-string-refs
        json.graph = this.refs.graph.toJSON();
        json.version = 1.2; // Give us some safety to change the format
        // when we realize that I wrote
        // a horrible json spec for this widget

        json.answer = this.getUserInput();
        return json;
    };

    getUserInput: UserInput = () => {
        return {
            transformations: this.props.transformations,
            // This doesn't call this.shape.toJSON() because that doesn't
            // handle coordinates in formal mode without movement, since
            // the movablepoints never move
            shape: {
                // $FlowFixMe[incompatible-use]
                type: this.shape.type,
                coords: this.getCoords(),
                options: this.shape?.getOptions(),
            },
        };
    };

    /* InputPath API */

    _handleFocus: (...$ReadOnlyArray<string>) => void = (...path) => {
        this.props.onFocus(path);
    };

    _handleBlur: (...$ReadOnlyArray<string>) => void = (...path) => {
        this.props.onBlur(path);
    };

    _getTransformationForID: (string) => $FlowFixMe = (transformationID) => {
        // Returns the 'transformation' component corresponding to a given ID
        const refPath = [
            "transformationList",
            "transformation" + transformationID,
        ];

        // Follow the path of references
        let component = this;
        _.each(refPath, (ref) => {
            component = component.refs[ref];
        });
        return component;
    };

    getInputPaths: () => $ReadOnlyArray<Path> = () => {
        // If we're in static mode, then there is no transformation list, and,
        // as a result, no input paths.
        if (this.props.listMode === "static") {
            return [];
        }

        let inputPaths = [];
        _.each(this.props.transformations, (transformation, i) => {
            transformation = this._getTransformationForID(i);
            const innerPaths = transformation.getInputPaths();
            const fullPaths = _.map(innerPaths, (innerPath) => {
                return ["" + i].concat(innerPath);
            });
            inputPaths = inputPaths.concat(fullPaths);
        });
        return inputPaths;
    };

    _passToInner: (
        string,
        $ReadOnlyArray<string>,
        ?$FlowFixMe,
        ?($FlowFixMe) => mixed,
    ) => $FlowFixMe = function (functionName, path, ...args) {
        if (!path || !path.length) {
            return;
        }

        // First argument tells us which transformation will receive the call;
        // remaining arguments are used within that transformation to identify
        // a specific input.
        const innerPath = _.rest(path);

        // Pass arguments down to appropriate 'transformation' component
        const transformationID = _.head(path);
        const caller = this._getTransformationForID(transformationID);
        return caller[functionName](innerPath, ...args);
    };

    focus: () => boolean = () => {
        // Just focus the first showing input
        const inputs = this.getInputPaths();
        if (inputs.length > 0) {
            this.focusInputPath(inputs[0]);
            return true;
        }
        return false;
    };

    focusInputPath: (Path) => boolean = (path) => {
        // Since the transformer exposes the input API, it needs to be robust
        // to empty paths. We don't expect this to happen, as entire-widget
        // focusing is typically done through the focus() method, which already
        // handles the empty path case properly, but it's better to be safe
        // here.
        if (path.length === 0) {
            return false;
        }

        assert(path.length >= 2);
        return this._passToInner("focusInputPath", path);
    };

    blurInputPath: (Path) => boolean = (path) => {
        // Since the transformer exposes the input API, it needs to be robust
        // to empty paths (which indicate a blurring of the entire widget,
        // e.g., when switching from interacting with the transformer to
        // interacting with some other widget).
        if (path.length === 0) {
            return false;
        }

        assert(path.length >= 2);
        return this._passToInner("blurInputPath", path);
    };

    setInputValue: (Path, $FlowFixMe, ($FlowFixMe) => mixed) => $FlowFixMe = (
        path,
        value,
        cb,
    ) => {
        assert(path.length >= 2);
        return this._passToInner("setInputValue", path, value, cb);
    };

    getDOMNodeForPath: (Path) => $FlowFixMe = (path) => {
        assert(path.length >= 2);
        return this._passToInner("getDOMNodeForPath", path);
    };

    getGrammarTypeForPath: (Path) => $FlowFixMe = (path) => {
        assert(path.length >= 2);
        return this._passToInner("getGrammarTypeForPath", path);
    };

    static validate(guess: UserInput, rubric: Rubric): PerseusScore {
        // Check for any required transformations
        for (const type in Transformations) {
            if (rubric.tools[type].required) {
                const isUsed = _.any(
                    _.map(guess.transformations, function (transform) {
                        // Required transformations must appear in the
                        // transformation list, and must not be no-ops
                        return (
                            transform.type === type &&
                            !TransformOps.isEmpty(transform) &&
                            !TransformOps.isNoOp(transform)
                        );
                    }),
                );

                if (!isUsed) {
                    return {
                        type: "invalid",
                        message: i18n._(
                            "Your transformation must use a " + "%(type)s.",
                            {
                                type: Transformations[type].lowerNounName,
                            },
                        ),
                    };
                }
            }
        }

        // Compare shapes
        if (ShapeTypes.equal(guess.shape, rubric.correct.shape)) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null,
            };
        }
        if (
            !rubric.gradeEmpty &&
            deepEq(guess.shape.coords, rubric.starting.shape.coords)
        ) {
            return {
                type: "invalid",
                message: i18n._(
                    "Use the interactive graph to define a " +
                        "correct transformation.",
                ),
            };
        }
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: null,
        };
    }
}

export default ({
    name: "transformer",
    displayName: "Transformer",
    widget: Transformer,
}: WidgetExports<typeof Transformer>);
