/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const Changeable   = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const ArrowPicker = require("./interaction/arrow-picker.jsx");
const ColorPicker = require("./interaction/color-picker.jsx");
const ConstraintEditor = require("./interaction/constraint-editor.jsx");
const DashPicker = require("./interaction/dash-picker.jsx");
const ElementContainer = require("./interaction/element-container.jsx");
const GraphSettings = require("../components/graph-settings.jsx");
const MathInput = require("../components/math-input.jsx");
const NumberInput = require("../components/number-input.jsx");
const TeX = require("react-components/tex.jsx");
const TextInput = require("../components/text-input.jsx");

const KhanColors = require("../util/colors.js");

var defaultInteractionProps = {
    graph: {
        box: [400, 400],
        labels: ["x", "y"],
        range: [[-10, 10], [-10, 10]],
        tickStep: [1, 1],
        gridStep: [1, 1],
        markings: "graph",
    },
    elements: [],
};

//
// Editor for non-interactive points
//
// TODO(eater): Factor this out
//
const PointEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        coordX: React.PropTypes.string,
        coordY: React.PropTypes.string,
        color: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            coordX: "0",
            coordY: "0",
            color: KhanColors.BLACK,
        };
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                Coordinate: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.coordX}
                    onChange={this.change("coordX")}
                />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
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
        </div>;
    },
});


//
// Editor for non-interactive line segments
//
// TODO(eater): Factor this out
//
var LineEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        startX: React.PropTypes.string,
        startY: React.PropTypes.string,
        endX: React.PropTypes.string,
        endY: React.PropTypes.string,
        color: React.PropTypes.string,
        strokeDasharray: React.PropTypes.string,
        arrows: React.PropTypes.string,
        strokeWidth: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
            startX: "-5",
            startY: "5",
            endX: "5",
            endY: "5",
            color: KhanColors.BLACK,
            strokeDasharray: "",
            arrows: "",
            strokeWidth: 2,
        };
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                Start: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.startX}
                    onChange={this.change("startX")}
                />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.startY}
                    onChange={this.change("startY")}
                />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                End: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.endX}
                    onChange={this.change("endX")}
                />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
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
                    onChange={this.change("strokeDasharray")} />
                &nbsp; &nbsp;
                <ArrowPicker
                    value={this.props.arrows}
                    onChange={this.change("arrows")}
                />
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    Width: <NumberInput
                        value={this.props.strokeWidth}
                        placeholder={2}
                        onChange={this.change("strokeWidth")}/>
                </div>
            </div>
        </div>;
    },
});


//
// Editor for interactive movable points
//
// TODO(eater): Factor this out
// TODO(eater): Rethink how constraints are represented
//
var MovablePointEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        startX: React.PropTypes.string,
        startY: React.PropTypes.string,
        constraint: React.PropTypes.string,
        snap: React.PropTypes.number,
        constraintFn: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
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
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                Start: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.startX}
                    onChange={this.change("startX")}
                />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.startY}
                    onChange={this.change("startY")}
                />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                Update <TeX>(x_n, y_n)</TeX> for <TeX>n =</TeX> <NumberInput
                    value={this.props.varSubscript}
                    placeholder={0}
                    onChange={this.change("varSubscript")}
                />
            </div>
            <ConstraintEditor {...this.props} />
        </div>;
    },
});


//
// Editor for interactive movable line segments
//
// TODO(eater): Factor this out
// TODO(eater): Rethink how constraints are represented
//
var MovableLineEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        startX: React.PropTypes.string,
        startY: React.PropTypes.string,
        endX: React.PropTypes.string,
        endY: React.PropTypes.string,
        constraint: React.PropTypes.string,
        snap: React.PropTypes.number,
        constraintFn: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
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
    },

    render: function() {
        return <div className="graph-settings">
            Initial position:
            <div className="perseus-widget-row">
                Start: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.startX}
                    onChange={this.change("startX")}
                />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.startY}
                    onChange={this.change("startY")}
                />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                End: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.endX}
                    onChange={this.change("endX")}
                />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
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
                        onChange={this.change("startSubscript")}/>
            </div>
            <div className="perseus-widget-row">
                End updates <TeX>(x_m, y_m)</TeX> for <TeX>m =</TeX>
                    <NumberInput
                        value={this.props.endSubscript}
                        placeholder={0}
                        onChange={this.change("endSubscript")}/>
            </div>
            <div className="perseus-widget-row">
                All constraints are applied to the start point.
            </div>
            <ConstraintEditor {...this.props} />
        </div>;
    },
});


//
// Editor for function plots
//
// TODO(eater): Factor this out
//
var FunctionEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        value: React.PropTypes.string,
        rangeMin: React.PropTypes.string,
        rangeMax: React.PropTypes.string,
        color: React.PropTypes.string,
        strokeDashArray: React.PropTypes.string,
        strokeWidth: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
            value: "x",
            rangeMin: "-10",
            rangeMax: "10",
            color: KhanColors.BLUE,
            strokeDasharray: "",
            strokeWidth: 2,
        };
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                <TeX>{this.props.funcName + "(x)="}</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.value}
                    onChange={this.change("value")}
                />
            </div>
            <div className="perseus-widget-row">
                Range: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.rangeMin}
                    onChange={this.change("rangeMin")}
                />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
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
                    onChange={this.change("strokeDasharray")} />
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    Width: <NumberInput
                        value={this.props.strokeWidth}
                        placeholder={2}
                        onChange={this.change("strokeWidth")}/>
                </div>
            </div>
        </div>;
    },
});


//
// Editor for parametric plots
//
// TODO(eater): Factor this out
//
var ParametricEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        x: React.PropTypes.string,
        y: React.PropTypes.string,
        rangeMin: React.PropTypes.string,
        rangeMax: React.PropTypes.string,
        color: React.PropTypes.string,
        strokeDashArray: React.PropTypes.string,
        strokeWidth: React.PropTypes.number,
    },

    getDefaultProps: function() {
        return {
            x: "cos(t)",
            y: "sin(t)",
            rangeMin: "0",
            rangeMax: "2\\pi",
            color: KhanColors.BLUE,
            strokeDasharray: "",
            strokeWidth: 2,
        };
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                <TeX>X(t) =</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.x}
                    onChange={this.change("x")}
                />
            </div>
            <div className="perseus-widget-row">
                <TeX>Y(t) =</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.y}
                    onChange={this.change("y")}
                />
            </div>
            <div className="perseus-widget-row">
                Range: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.rangeMin}
                    onChange={this.change("rangeMin")}
                />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
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
                    onChange={this.change("strokeDasharray")} />
            </div>
            <div className="perseus-widget-row">
                <div className="perseus-widget-left-col">
                    Width: <NumberInput
                        value={this.props.strokeWidth}
                        placeholder={2}
                        onChange={this.change("strokeWidth")}/>
                </div>
            </div>
        </div>;
    },
});


//
// Editor for labels
//
// TODO(eater): Factor this out maybe?
// TODO(eater): Add text direction
//
var LabelEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        color: React.PropTypes.string,
        coordX: React.PropTypes.string,
        coordY: React.PropTypes.string,
        label: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            coordX: "0",
            coordY: "0",
            color: KhanColors.BLACK,
            label: "\\phi",
        };
    },

    render: function() {
        return <div className="graph-settings">
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
                Location: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.coordX}
                    onChange={this.change("coordX")}
                />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
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
        </div>;
    },
});


//
// Editor for rectangles
//
// TODO(eater): Factor this out maybe?
//
var RectangleEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        color: React.PropTypes.string,
        coordX: React.PropTypes.string,
        coordY: React.PropTypes.string,
        height: React.PropTypes.string,
        width: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            coordX: "-5",
            coordY: "5",
            width: "2",
            height: "3",
            color: KhanColors.LIGHT_BLUE,
        };
    },

    render: function() {
        return <div className="graph-settings">
            <div className="perseus-widget-row">
                Bottom left: <TeX>\Large(</TeX><MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.coordX}
                    onChange={this.change("coordX")}
                />
                <TeX>,</TeX> <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.coordY}
                    onChange={this.change("coordY")}
                />
                <TeX>\Large)</TeX>
            </div>
            <div className="perseus-widget-row">
                Width: <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
                    value={this.props.width}
                    onChange={this.change("width")}
                />
            </div>
            <div className="perseus-widget-row">
                Height: <MathInput
                    buttonSets={[]}
                    buttonsVisible={"never"}
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
        </div>;
    },
});

var InteractionEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    // TODO(eater): Make more better
    propTypes: {
        elements: React.PropTypes.arrayOf(React.PropTypes.object),
        graph: React.PropTypes.objectOf(React.PropTypes.any),
    },

    getDefaultProps: function() {
        return defaultInteractionProps;
    },

    getInitialState: function() {
        return {
            usedVarSubscripts: this._getAllVarSubscripts(this.props.elements),
            usedFunctionNames: this._getAllFunctionNames(this.props.elements),
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            usedVarSubscripts: this._getAllVarSubscripts(nextProps.elements),
            usedFunctionNames: this._getAllFunctionNames(nextProps.elements),
        });
    },

    _getAllVarSubscripts: function(elements) {
        return _.map(_.where(elements, {type: "movable-point"}),
            (element) => element.options.varSubscript).concat(
            _.map(_.where(elements, {type: "movable-line"}),
            (element) => element.options.startSubscript)).concat(
            _.map(_.where(elements, {type: "movable-line"}),
            (element) => element.options.endSubscript));
    },

    _getAllFunctionNames: function(elements) {
        return _.map(_.where(elements, {type: "function"}),
            (element) => element.options.funcName);
    },

    _updateGraphProps: function(newProps) {
        // TODO(eater): GraphSettings should name this tickStep instead
        // of step. Grr..
        this.change({
            graph: _.extend(_.omit(newProps, "step"), {
                tickStep: newProps.step,
            }),
        });
    },

    _addNewElement: function(e) {
        var elementType = e.target.value;
        if (elementType === "") {
            return;
        }
        e.target.value = "";
        var newElement = {
            type: elementType,
            key: elementType + "-" +
                (Math.random() * 0xffffff << 0).toString(16),
            options: elementType === "point" ?
                        _.clone(PointEditor.defaultProps) :
                        elementType === "line" ?
                        _.clone(LineEditor.defaultProps) :
                        elementType === "movable-point" ?
                        _.clone(MovablePointEditor.defaultProps) :
                        elementType === "movable-line" ?
                        _.clone(MovableLineEditor.defaultProps) :
                        elementType === "function" ?
                        _.clone(FunctionEditor.defaultProps) :
                        elementType === "parametric" ?
                        _.clone(ParametricEditor.defaultProps) :
                        elementType === "label" ?
                        _.clone(LabelEditor.defaultProps) :
                        elementType === "rectangle" ?
                        _.clone(RectangleEditor.defaultProps) : {},
        };

        var nextSubscript;
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
            var nextLetter = String.fromCharCode(_.max([_.max(_.map(
                this.state.usedFunctionNames, function(c) {
                    return c.charCodeAt(0);
                })),
                "e".charCodeAt(0)]) + 1);
            newElement.options.funcName = nextLetter;
        }
        this.change({
            elements: this.props.elements.concat(newElement),
        });
    },

    _deleteElement: function(index) {
        var element = this.props.elements[index];
        this.change({elements: _.without(this.props.elements, element)});
    },

    _moveElementUp: function(index) {
        var element = this.props.elements[index];
        var newElements = _.without(this.props.elements, element);
        newElements.splice(index - 1, 0, element);
        this.change({elements: newElements});
    },

    _moveElementDown: function(index) {
        var element = this.props.elements[index];
        var newElements = _.without(this.props.elements, element);
        newElements.splice(index + 1, 0, element);
        this.change({elements: newElements});
    },

    render: function() {
        return <div className="perseus-widget-interaction-editor">
            <ElementContainer
                    title="Grid settings"
            >
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
                {(this.props.graph.valid === true) || <div>
                    {this.props.graph.valid}
                </div>}
            </ElementContainer>
            {_.map(this.props.elements, function(element, n) {
                if (element.type === "movable-point") {
                    return <ElementContainer
                            title={<span>Movable point <TeX>
                                    {"(x_{" + element.options.varSubscript +
                                    "}, y_{" + element.options.varSubscript +
                                    "})"}</TeX>
                                </span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement.bind(this, n)}
                            key={element.key}
                    >
                        <MovablePointEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "movable-line") {
                    return <ElementContainer
                            title={<span>Movable line <TeX>
                                    {"(x_{" + element.options.startSubscript +
                                    "}, y_{" + element.options.startSubscript +
                                    "})"}</TeX> to <TeX>
                                    {"(x_{" + element.options.endSubscript +
                                    "}, y_{" + element.options.endSubscript +
                                    "})"}</TeX>
                                </span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement.bind(this, n)}
                            key={element.key}
                    >
                        <MovableLineEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "point") {
                    return <ElementContainer
                            title={<span>Point <TeX>
                                    {"(" + element.options.coordX +
                                    ", " + element.options.coordY +
                                    ")"}</TeX>
                                </span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement.bind(this, n)}
                            key={element.key}
                    >
                        <PointEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "line") {
                    return <ElementContainer
                            title={<span>Line <TeX>
                                    {"(" + element.options.startX +
                                    ", " + element.options.startY +
                                    ")"}</TeX> to <TeX>
                                    {"(" + element.options.endX +
                                    ", " + element.options.endY +
                                    ")"}</TeX>
                                </span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement.bind(this, n)}
                            key={element.key}
                    >
                        <LineEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "function") {
                    return <ElementContainer
                            title={<span>Function <TeX>{
                                element.options.funcName + "(x) = " +
                                element.options.value
                            }</TeX></span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement}
                            key={element.key}
                    >
                        <FunctionEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "parametric") {
                    return <ElementContainer
                            title={<span>Parametric</span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement}
                            key={element.key}
                    >
                        <ParametricEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "label") {
                    return <ElementContainer
                            title={<span>Label <TeX>
                                {element.options.label}</TeX> </span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement}
                            key={element.key}
                    >
                        <LabelEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                } else if (element.type === "rectangle") {
                    return <ElementContainer
                            title={<span>Rectangle <TeX>{"(" +
                                element.options.coordX + ", " +
                                element.options.coordY + ")"}</TeX>
                                &nbsp;&mdash;&nbsp;
                                <TeX>{element.options.width + " \\times " +
                                element.options.height}</TeX>
                                </span>}
                            onUp={n === 0 ?
                                null : this._moveElementUp.bind(this, n)}
                            onDown={n === this.props.elements.length - 1 ?
                                null : this._moveElementDown.bind(this, n)}
                            onDelete={this._deleteElement}
                            key={element.key}
                    >
                        <RectangleEditor
                            {...element.options}
                            onChange={(newProps) => {
                                var elements = JSON.parse(JSON.stringify(
                                    this.props.elements));
                                _.extend(elements[n].options, newProps);
                                this.change({elements: elements});
                            }}
                        />
                    </ElementContainer>;
                }
            }, this)}
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
                        &#x2605; Movable point</option>
                    <option value="movable-line">
                        &#x2605; Movable line segment</option>
                </select>
            </div>
        </div>;
    },
});

module.exports = InteractionEditor;
