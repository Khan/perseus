/* eslint-disable @babel/no-invalid-this, react/no-unsafe, react/sort-comp */
// @flow
import {
    components,
    Changeable,
    Dependencies,
    EditorJsonify,
    KhanColors,
    Util,
    ArrowPicker,
    ColorPicker,
    DashPicker,
    ElementContainer,
} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import GraphSettings from "../components/graph-settings.jsx";

import ConstraintEditor from "./interaction/constraint-editor.jsx";

const {MathInput, NumberInput, TextInput} = components;
const {getDependencies} = Dependencies;
const {unescapeMathMode} = Util;

const defaultInteractionProps = {
    graph: {
        box: [400, 400],
        labels: ["x", "y"],
        range: [
            [-10, 10],
            [-10, 10],
        ],
        tickStep: [1, 1],
        gridStep: [1, 1],
        markings: "graph",
    },
    elements: [],
};

type PointEditorProps = $FlowFixMe;

//
// Editor for non-interactive points
//
// TODO(eater): Factor this out
//
class PointEditor extends React.Component<PointEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
        coordX: PropTypes.string,
        coordY: PropTypes.string,
        color: PropTypes.string,
    };

    static defaultProps = {
        coordX: "0",
        coordY: "0",
        color: KhanColors.BLACK,
    };

    render(): React.Node {
        const {TeX} = getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    Coordinate: <TeX>\Large(</TeX>
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.coordX}
                        onChange={this.change("coordX")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.coordY}
                        onChange={this.change("coordY")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    <ColorPicker
                        value={this.props.color}
                        onChange={this.change("color")}
                    />
                </div>
            </div>
        );
    }

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };
}

type LineEditorProps = $FlowFixMe;

//
// Editor for non-interactive line segments
//
// TODO(eater): Factor this out
//
class LineEditor extends React.Component<LineEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
        startX: PropTypes.string,
        startY: PropTypes.string,
        endX: PropTypes.string,
        endY: PropTypes.string,
        color: PropTypes.string,
        strokeDasharray: PropTypes.string,
        arrows: PropTypes.string,
        strokeWidth: PropTypes.number,
    };

    static defaultProps = {
        startX: "-5",
        startY: "5",
        endX: "5",
        endY: "5",
        color: KhanColors.BLACK,
        strokeDasharray: "",
        arrows: "",
        strokeWidth: 2,
    };

    render(): React.Node {
        const {TeX} = getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    Start: <TeX>\Large(</TeX>
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.startX}
                        onChange={this.change("startX")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.startY}
                        onChange={this.change("startY")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    End: <TeX>\Large(</TeX>
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.endX}
                        onChange={this.change("endX")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.endY}
                        onChange={this.change("endY")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    <ColorPicker
                        value={this.props.color}
                        onChange={this.change("color")}
                    />
                </div>
                <div className="perseus-widget-row">
                    <DashPicker
                        value={this.props.strokeDasharray}
                        onChange={this.change("strokeDasharray")}
                    />
                    &nbsp; &nbsp;
                    <ArrowPicker
                        value={this.props.arrows}
                        onChange={this.change("arrows")}
                    />
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        Width:{" "}
                        <NumberInput
                            value={this.props.strokeWidth}
                            placeholder={2}
                            onChange={this.change("strokeWidth")}
                        />
                    </div>
                </div>
            </div>
        );
    }

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };
}

type MovablePointEditorProps = $FlowFixMe;

//
// Editor for interactive movable points
//
// TODO(eater): Factor this out
// TODO(eater): Rethink how constraints are represented
//
class MovablePointEditor extends React.Component<MovablePointEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
        startX: PropTypes.string,
        startY: PropTypes.string,
        constraint: PropTypes.string,
        snap: PropTypes.number,
        constraintFn: PropTypes.string,
    };

    static defaultProps = {
        startX: "0",
        startY: "0",
        constraint: "none",
        snap: 0.5,
        constraintFn: "0",
        constraintXMin: "-10",
        constraintXMax: "10",
        constraintYMin: "-10",
        constraintYMax: "10",
    };

    render(): React.Node {
        const {TeX} = getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    Start: <TeX>\Large(</TeX>
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.startX}
                        onChange={this.change("startX")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.startY}
                        onChange={this.change("startY")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    Update <TeX>(x_n, y_n)</TeX> for <TeX>n =</TeX>{" "}
                    <NumberInput
                        value={this.props.varSubscript}
                        placeholder={0}
                        onChange={this.change("varSubscript")}
                    />
                </div>
                <ConstraintEditor {...this.props} />
            </div>
        );
    }

    change = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };
}

type MovableLineEditorProps = $FlowFixMe;

//
// Editor for interactive movable line segments
//
// TODO(eater): Factor this out
// TODO(eater): Rethink how constraints are represented
//
class MovableLineEditor extends React.Component<MovableLineEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
        startX: PropTypes.string,
        startY: PropTypes.string,
        endX: PropTypes.string,
        endY: PropTypes.string,
        constraint: PropTypes.string,
        snap: PropTypes.number,
        constraintFn: PropTypes.string,
    };

    static defaultProps = {
        startX: "-5",
        startY: "5",
        endX: "5",
        endY: "5",
        constraint: "none",
        snap: 0.5,
        constraintFn: "0",
        constraintXMin: "-10",
        constraintXMax: "10",
        constraintYMin: "-10",
        constraintYMax: "10",
    };

    render(): React.Node {
        const {TeX} = getDependencies();

        return (
            <div className="graph-settings">
                Initial position:
                <div className="perseus-widget-row">
                    Start: <TeX>\Large(</TeX>
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.startX}
                        onChange={this.change("startX")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.startY}
                        onChange={this.change("startY")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    End: <TeX>\Large(</TeX>
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.endX}
                        onChange={this.change("endX")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.endY}
                        onChange={this.change("endY")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    Start updates <TeX>(x_n, y_n)</TeX> for <TeX>n =</TeX>
                    <NumberInput
                        value={this.props.startSubscript}
                        placeholder={0}
                        onChange={this.change("startSubscript")}
                    />
                </div>
                <div className="perseus-widget-row">
                    End updates <TeX>(x_m, y_m)</TeX> for <TeX>m =</TeX>
                    <NumberInput
                        value={this.props.endSubscript}
                        placeholder={0}
                        onChange={this.change("endSubscript")}
                    />
                </div>
                <div className="perseus-widget-row">
                    All constraints are applied to the start point.
                </div>
                <ConstraintEditor {...this.props} />
            </div>
        );
    }

    change = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };
}

type FunctionEditorProps = $FlowFixMe;

//
// Editor for function plots
//
// TODO(eater): Factor this out
//
class FunctionEditor extends React.Component<FunctionEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
        value: PropTypes.string,
        rangeMin: PropTypes.string,
        rangeMax: PropTypes.string,
        color: PropTypes.string,
        strokeDashArray: PropTypes.string,
        strokeWidth: PropTypes.number,
    };

    static defaultProps = {
        value: "x",
        rangeMin: "-10",
        rangeMax: "10",
        color: KhanColors.BLUE,
        strokeDasharray: "",
        strokeWidth: 2,
    };

    render(): React.Node {
        const {TeX} = getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    <TeX>{this.props.funcName + "(x)="}</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.value}
                        onChange={this.change("value")}
                    />
                </div>
                <div className="perseus-widget-row">
                    Range: <TeX>\Large(</TeX>
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.rangeMin}
                        onChange={this.change("rangeMin")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.rangeMax}
                        onChange={this.change("rangeMax")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    <ColorPicker
                        value={this.props.color}
                        onChange={this.change("color")}
                    />
                </div>
                <div className="perseus-widget-row">
                    <DashPicker
                        value={this.props.strokeDasharray}
                        onChange={this.change("strokeDasharray")}
                    />
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        Width:{" "}
                        <NumberInput
                            value={this.props.strokeWidth}
                            placeholder={2}
                            onChange={this.change("strokeWidth")}
                        />
                    </div>
                </div>
            </div>
        );
    }

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };
}

type ParametricEditorProps = $FlowFixMe;

//
// Editor for parametric plots
//
// TODO(eater): Factor this out
//
class ParametricEditor extends React.Component<ParametricEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
        x: PropTypes.string,
        y: PropTypes.string,
        rangeMin: PropTypes.string,
        rangeMax: PropTypes.string,
        color: PropTypes.string,
        strokeDashArray: PropTypes.string,
        strokeWidth: PropTypes.number,
    };

    static defaultProps = {
        x: "cos(t)",
        y: "sin(t)",
        rangeMin: "0",
        rangeMax: "2\\pi",
        color: KhanColors.BLUE,
        strokeDasharray: "",
        strokeWidth: 2,
    };

    render(): React.Node {
        const {TeX} = getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    <TeX>X(t) =</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.x}
                        onChange={this.change("x")}
                    />
                </div>
                <div className="perseus-widget-row">
                    <TeX>Y(t) =</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.y}
                        onChange={this.change("y")}
                    />
                </div>
                <div className="perseus-widget-row">
                    Range: <TeX>\Large(</TeX>
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.rangeMin}
                        onChange={this.change("rangeMin")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.rangeMax}
                        onChange={this.change("rangeMax")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    <ColorPicker
                        value={this.props.color}
                        onChange={this.change("color")}
                    />
                </div>
                <div className="perseus-widget-row">
                    <DashPicker
                        value={this.props.strokeDasharray}
                        onChange={this.change("strokeDasharray")}
                    />
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        Width:{" "}
                        <NumberInput
                            value={this.props.strokeWidth}
                            placeholder={2}
                            onChange={this.change("strokeWidth")}
                        />
                    </div>
                </div>
            </div>
        );
    }

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };
}

type LabelEditorProps = $FlowFixMe;

//
// Editor for labels
//
// TODO(eater): Factor this out maybe?
// TODO(eater): Add text direction
//
class LabelEditor extends React.Component<LabelEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
        color: PropTypes.string,
        coordX: PropTypes.string,
        coordY: PropTypes.string,
        label: PropTypes.string,
    };

    static defaultProps = {
        coordX: "0",
        coordY: "0",
        color: KhanColors.BLACK,
        label: "\\phi",
    };

    render(): React.Node {
        const {TeX} = getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    <TextInput
                        value={this.props.label}
                        onChange={this.change("label")}
                        style={{
                            width: "100%",
                        }}
                    />
                </div>
                <div className="perseus-widget-row">
                    Location: <TeX>\Large(</TeX>
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.coordX}
                        onChange={this.change("coordX")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.coordY}
                        onChange={this.change("coordY")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    <ColorPicker
                        value={this.props.color}
                        onChange={this.change("color")}
                    />
                </div>
            </div>
        );
    }

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };
}

type RectangleEditorProps = $FlowFixMe;

//
// Editor for rectangles
//
// TODO(eater): Factor this out maybe?
//
class RectangleEditor extends React.Component<RectangleEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
        color: PropTypes.string,
        coordX: PropTypes.string,
        coordY: PropTypes.string,
        height: PropTypes.string,
        width: PropTypes.string,
    };

    static defaultProps = {
        coordX: "-5",
        coordY: "5",
        width: "2",
        height: "3",
        color: KhanColors.LIGHT_BLUE,
    };

    render(): React.Node {
        const {TeX} = getDependencies();

        return (
            <div className="graph-settings">
                <div className="perseus-widget-row">
                    Bottom left: <TeX>\Large(</TeX>
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.coordX}
                        onChange={this.change("coordX")}
                    />
                    <TeX>,</TeX>{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.coordY}
                        onChange={this.change("coordY")}
                    />
                    <TeX>\Large)</TeX>
                </div>
                <div className="perseus-widget-row">
                    Width:{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.width}
                        onChange={this.change("width")}
                    />
                </div>
                <div className="perseus-widget-row">
                    Height:{" "}
                    <MathInput
                        buttonSets={[]}
                        buttonsVisible="never"
                        value={this.props.height}
                        onChange={this.change("height")}
                    />
                </div>
                <div className="perseus-widget-row">
                    <ColorPicker
                        value={this.props.color}
                        lightColors={true}
                        onChange={this.change("color")}
                    />
                </div>
                <div className="perseus-widget-row">
                    You want a border? Sorry, draw your own.
                </div>
            </div>
        );
    }

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };
}

type InteractionEditorProps = $FlowFixMe;
type InteractionEditorState = $FlowFixMe;

class InteractionEditor extends React.Component<
    InteractionEditorProps,
    InteractionEditorState,
> {
    // TODO(eater): Make more better
    static propTypes = {
        ...Changeable.propTypes,
        // eslint-disable-next-line react/forbid-prop-types
        elements: PropTypes.arrayOf(PropTypes.object),
        graph: PropTypes.objectOf(PropTypes.any),
    };

    static widgetName: "interaction" = "interaction";
    static defaultProps: InteractionEditorProps = defaultInteractionProps;

    state: InteractionEditorState = {
        usedVarSubscripts: this._getAllVarSubscripts(this.props.elements),
        usedFunctionNames: this._getAllFunctionNames(this.props.elements),
    };

    UNSAFE_componentWillReceiveProps(nextProps: InteractionEditorProps) {
        this.setState({
            usedVarSubscripts: this._getAllVarSubscripts(nextProps.elements),
            usedFunctionNames: this._getAllFunctionNames(nextProps.elements),
        });
    }

    _getAllVarSubscripts(
        elements: $ReadOnlyArray<$FlowFixMe>,
    ): $ReadOnlyArray<$FlowFixMe> {
        return _.map(
            _.where(elements, {type: "movable-point"}),
            (element) => element.options.varSubscript,
        )
            .concat(
                _.map(
                    _.where(elements, {type: "movable-line"}),
                    (element) => element.options.startSubscript,
                ),
            )
            .concat(
                _.map(
                    _.where(elements, {type: "movable-line"}),
                    (element) => element.options.endSubscript,
                ),
            );
    }

    _getAllFunctionNames(
        elements: $ReadOnlyArray<$FlowFixMe>,
    ): $ReadOnlyArray<string> {
        return _.map(
            _.where(elements, {type: "function"}),
            (element) => element.options.funcName,
        );
    }

    _updateGraphProps: ($FlowFixMe) => $FlowFixMe = (newProps) => {
        // TODO(eater): GraphSettings should name this tickStep instead
        // of step. Grr..
        this.change({
            graph: _.extend(_.omit(newProps, "step"), {
                tickStep: newProps.step,
            }),
        });
    };

    _addNewElement: (SyntheticInputEvent<>) => void = (e) => {
        const elementType = e.target.value;
        if (elementType === "") {
            return;
        }
        e.target.value = "";
        const newElement = {
            type: elementType,
            key:
                elementType +
                "-" +
                ((Math.random() * 0xffffff) << 0).toString(16),
            options:
                elementType === "point"
                    ? _.clone(PointEditor.defaultProps)
                    : elementType === "line"
                    ? _.clone(LineEditor.defaultProps)
                    : elementType === "movable-point"
                    ? _.clone(MovablePointEditor.defaultProps)
                    : elementType === "movable-line"
                    ? _.clone(MovableLineEditor.defaultProps)
                    : elementType === "function"
                    ? _.clone(FunctionEditor.defaultProps)
                    : elementType === "parametric"
                    ? _.clone(ParametricEditor.defaultProps)
                    : elementType === "label"
                    ? _.clone(LabelEditor.defaultProps)
                    : elementType === "rectangle"
                    ? _.clone(RectangleEditor.defaultProps)
                    : {},
        };

        let nextSubscript;
        if (elementType === "movable-point") {
            nextSubscript =
                _.max([_.max(this.state.usedVarSubscripts), -1]) + 1;
            newElement.options.varSubscript = nextSubscript;
        } else if (elementType === "movable-line") {
            nextSubscript =
                _.max([_.max(this.state.usedVarSubscripts), -1]) + 1;
            newElement.options.startSubscript = nextSubscript;
            newElement.options.endSubscript = nextSubscript + 1;
        } else if (elementType === "function") {
            // TODO(eater): The 22nd function added will be {(x) since '{'
            // comes after 'z'
            const nextLetter = String.fromCharCode(
                _.max([
                    _.max(
                        _.map(this.state.usedFunctionNames, function (c) {
                            return c.charCodeAt(0);
                        }),
                    ),
                    "e".charCodeAt(0),
                ]) + 1,
            );
            newElement.options.funcName = nextLetter;
        }
        this.change({
            elements: this.props.elements.concat(newElement),
        });
    };

    _deleteElement: (number) => void = (index) => {
        const element = this.props.elements[index];
        this.change({elements: _.without(this.props.elements, element)});
    };

    _moveElementUp: (number) => void = (index) => {
        const element = this.props.elements[index];
        const newElements = _.without(this.props.elements, element);
        newElements.splice(index - 1, 0, element);
        this.change({elements: newElements});
    };

    _moveElementDown: (number) => void = (index) => {
        const element = this.props.elements[index];
        const newElements = _.without(this.props.elements, element);
        newElements.splice(index + 1, 0, element);
        this.change({elements: newElements});
    };

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    render(): React.Node {
        const {TeX} = getDependencies();

        return (
            <div className="perseus-widget-interaction-editor">
                <ElementContainer title="Grid settings">
                    <GraphSettings
                        editableSettings={["canvas", "graph"]}
                        box={this.props.graph.box}
                        labels={this.props.graph.labels}
                        range={this.props.graph.range}
                        step={this.props.graph.tickStep}
                        gridStep={this.props.graph.gridStep}
                        markings={this.props.graph.markings}
                        onChange={this._updateGraphProps}
                    />
                    {/* $FlowFixMe[incompatible-type] */}
                    {this.props.graph.valid !== true && (
                        <div>{this.props.graph.valid}</div>
                    )}
                </ElementContainer>
                {_.map(
                    this.props.elements,
                    function (element, n) {
                        if (element.type === "movable-point") {
                            return (
                                <ElementContainer
                                    title={
                                        <span>
                                            Movable point{" "}
                                            <TeX>
                                                {"(x_{" +
                                                    element.options
                                                        .varSubscript +
                                                    "}, y_{" +
                                                    element.options
                                                        .varSubscript +
                                                    "})"}
                                            </TeX>
                                        </span>
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onUp={
                                        n === 0
                                            ? null
                                            : this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        n === this.props.elements.length - 1
                                            ? null
                                            : this._moveElementDown.bind(
                                                  this,
                                                  n,
                                              )
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDelete={this._deleteElement.bind(this, n)}
                                    key={element.key}
                                >
                                    <MovablePointEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            this.change({elements: elements});
                                        }}
                                    />
                                </ElementContainer>
                            );
                        }
                        if (element.type === "movable-line") {
                            return (
                                <ElementContainer
                                    title={
                                        <span>
                                            Movable line{" "}
                                            <TeX>
                                                {"(x_{" +
                                                    element.options
                                                        .startSubscript +
                                                    "}, y_{" +
                                                    element.options
                                                        .startSubscript +
                                                    "})"}
                                            </TeX>{" "}
                                            to{" "}
                                            <TeX>
                                                {"(x_{" +
                                                    element.options
                                                        .endSubscript +
                                                    "}, y_{" +
                                                    element.options
                                                        .endSubscript +
                                                    "})"}
                                            </TeX>
                                        </span>
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onUp={
                                        n === 0
                                            ? null
                                            : this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        n === this.props.elements.length - 1
                                            ? null
                                            : this._moveElementDown.bind(
                                                  this,
                                                  n,
                                              )
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDelete={this._deleteElement.bind(this, n)}
                                    key={element.key}
                                >
                                    <MovableLineEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            this.change({elements: elements});
                                        }}
                                    />
                                </ElementContainer>
                            );
                        }
                        if (element.type === "point") {
                            return (
                                <ElementContainer
                                    title={
                                        <span>
                                            Point{" "}
                                            <TeX>
                                                {"(" +
                                                    element.options.coordX +
                                                    ", " +
                                                    element.options.coordY +
                                                    ")"}
                                            </TeX>
                                        </span>
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onUp={
                                        n === 0
                                            ? null
                                            : this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        n === this.props.elements.length - 1
                                            ? null
                                            : this._moveElementDown.bind(
                                                  this,
                                                  n,
                                              )
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDelete={this._deleteElement.bind(this, n)}
                                    key={element.key}
                                >
                                    <PointEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            this.change({elements: elements});
                                        }}
                                    />
                                </ElementContainer>
                            );
                        }
                        if (element.type === "line") {
                            return (
                                <ElementContainer
                                    title={
                                        <span>
                                            Line{" "}
                                            <TeX>
                                                {"(" +
                                                    element.options.startX +
                                                    ", " +
                                                    element.options.startY +
                                                    ")"}
                                            </TeX>{" "}
                                            to{" "}
                                            <TeX>
                                                {"(" +
                                                    element.options.endX +
                                                    ", " +
                                                    element.options.endY +
                                                    ")"}
                                            </TeX>
                                        </span>
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onUp={
                                        n === 0
                                            ? null
                                            : this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        n === this.props.elements.length - 1
                                            ? null
                                            : this._moveElementDown.bind(
                                                  this,
                                                  n,
                                              )
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDelete={this._deleteElement.bind(this, n)}
                                    key={element.key}
                                >
                                    <LineEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            this.change({elements: elements});
                                        }}
                                    />
                                </ElementContainer>
                            );
                        }
                        if (element.type === "function") {
                            return (
                                <ElementContainer
                                    title={
                                        <span>
                                            Function{" "}
                                            <TeX>
                                                {element.options.funcName +
                                                    "(x) = " +
                                                    element.options.value}
                                            </TeX>
                                        </span>
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onUp={
                                        n === 0
                                            ? null
                                            : this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        n === this.props.elements.length - 1
                                            ? null
                                            : this._moveElementDown.bind(
                                                  this,
                                                  n,
                                              )
                                    }
                                    onDelete={this._deleteElement}
                                    key={element.key}
                                >
                                    <FunctionEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            this.change({elements: elements});
                                        }}
                                    />
                                </ElementContainer>
                            );
                        }
                        if (element.type === "parametric") {
                            return (
                                <ElementContainer
                                    title={<span>Parametric</span>}
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onUp={
                                        n === 0
                                            ? null
                                            : this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        n === this.props.elements.length - 1
                                            ? null
                                            : this._moveElementDown.bind(
                                                  this,
                                                  n,
                                              )
                                    }
                                    onDelete={this._deleteElement}
                                    key={element.key}
                                >
                                    <ParametricEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            this.change({elements: elements});
                                        }}
                                    />
                                </ElementContainer>
                            );
                        }
                        if (element.type === "label") {
                            return (
                                <ElementContainer
                                    title={
                                        <span>
                                            Label{" "}
                                            <TeX>
                                                {unescapeMathMode(
                                                    element.options.label,
                                                )}
                                            </TeX>{" "}
                                        </span>
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onUp={
                                        n === 0
                                            ? null
                                            : this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        n === this.props.elements.length - 1
                                            ? null
                                            : this._moveElementDown.bind(
                                                  this,
                                                  n,
                                              )
                                    }
                                    onDelete={this._deleteElement}
                                    key={element.key}
                                >
                                    <LabelEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            this.change({elements: elements});
                                        }}
                                    />
                                </ElementContainer>
                            );
                        }
                        if (element.type === "rectangle") {
                            return (
                                <ElementContainer
                                    title={
                                        <span>
                                            Rectangle{" "}
                                            <TeX>
                                                {"(" +
                                                    element.options.coordX +
                                                    ", " +
                                                    element.options.coordY +
                                                    ")"}
                                            </TeX>
                                            &nbsp;&mdash;&nbsp;
                                            <TeX>
                                                {element.options.width +
                                                    " \\times " +
                                                    element.options.height}
                                            </TeX>
                                        </span>
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onUp={
                                        n === 0
                                            ? null
                                            : this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        n === this.props.elements.length - 1
                                            ? null
                                            : this._moveElementDown.bind(
                                                  this,
                                                  n,
                                              )
                                    }
                                    onDelete={this._deleteElement}
                                    key={element.key}
                                >
                                    <RectangleEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            this.change({elements: elements});
                                        }}
                                    />
                                </ElementContainer>
                            );
                        }
                    },
                    this,
                )}
                <div className="perseus-widget-interaction-editor-select-element">
                    <select onChange={this._addNewElement}>
                        <option value="">Add an element{"\u2026"}</option>
                        <option disabled>--</option>
                        <option value="point">Point</option>
                        <option value="line">Line segment</option>
                        <option value="function">Function plot</option>
                        <option value="parametric">Parametric plot</option>
                        <option value="label">Label</option>
                        <option value="rectangle">Rectangle</option>
                        <option value="movable-point">
                            &#x2605; Movable point
                        </option>
                        <option value="movable-line">
                            &#x2605; Movable line segment
                        </option>
                    </select>
                </div>
            </div>
        );
        /* eslint-enable max-len */
    }

    serialize: () => $FlowFixMe = () => {
        return EditorJsonify.serialize.call(this);
    };
}

export default InteractionEditor;
