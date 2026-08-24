import {Dependencies, Util} from "@khanacademy/perseus";
import {
    interactionLogic,
    type Coords,
    type PerseusInteractionWidgetOptions,
    type MarkingsType,
} from "@khanacademy/perseus-core";
import * as React from "react";

import GraphSettings from "../../components/graph-settings";
import EditorJsonify from "../../mixins/editor-jsonify";

import ElementContainer from "./element-container";
import FunctionEditor from "./function-editor";
import LabelEditor from "./label-editor";
import LineEditor from "./line-editor";
import MovableLineEditor from "./movable-line-editor";
import MovablePointEditor from "./movable-point-editor";
import ParametricEditor from "./parametric-editor";
import PointEditor from "./point-editor";
import RectangleEditor from "./rectangle-editor";

const {unescapeMathMode} = Util;

// The starting options for each element type offered by the "Add an element"
// dropdown. Element types with no entry here start out with no options.
const defaultOptionsByElementType: Record<string, Record<string, unknown>> = {
    point: PointEditor.defaultProps,
    line: LineEditor.defaultProps,
    "movable-point": MovablePointEditor.defaultProps,
    "movable-line": MovableLineEditor.defaultProps,
    function: FunctionEditor.defaultProps,
    parametric: ParametricEditor.defaultProps,
    label: LabelEditor.defaultProps,
    rectangle: RectangleEditor.defaultProps,
};

type Graph = {
    box: ReadonlyArray<number>;
    labels: ReadonlyArray<string>;
    range: Coords;
    tickStep: [number, number];
    gridStep: [number, number];
    markings: MarkingsType;
    valid?: boolean;
};

type Props = {
    onChange: (newProps: Record<string, unknown>) => void;
    elements: ReadonlyArray<any>;
    graph: Graph;
};

type State = any;

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for the interaction widget that allows users to engage with interactive content.
 *
 * The interaction widget provides a dynamic graph interface with various interactive elements
 * including points, lines, movable points, movable lines, functions, parametric curves,
 * labels, and rectangles. This editor allows content creators to configure those elements
 * and their properties.
 */
class InteractionEditor extends React.Component<Props, State> {
    static widgetName = "interaction" as const;
    static defaultProps: PerseusInteractionWidgetOptions =
        interactionLogic.defaultWidgetOptions;

    state: State = {
        usedVarSubscripts: this._getAllVarSubscripts(this.props.elements),
        usedFunctionNames: this._getAllFunctionNames(this.props.elements),
    };

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        this.setState({
            usedVarSubscripts: this._getAllVarSubscripts(nextProps.elements),
            usedFunctionNames: this._getAllFunctionNames(nextProps.elements),
        });
    }

    _getAllVarSubscripts(elements: ReadonlyArray<any>): ReadonlyArray<any> {
        const movableLines = elements.filter(
            (element) => element.type === "movable-line",
        );
        return elements
            .filter((element) => element.type === "movable-point")
            .map((element) => element.options.varSubscript)
            .concat(
                movableLines.map((element) => element.options.startSubscript),
            )
            .concat(
                movableLines.map((element) => element.options.endSubscript),
            );
    }

    _getAllFunctionNames(elements: ReadonlyArray<any>): ReadonlyArray<string> {
        return elements
            .filter((element) => element.type === "function")
            .map((element) => element.options.funcName);
    }

    // Spread existing graph props to preserve properties not included
    // in the GraphSettings onChange payload (e.g. box, markings).
    _updateGraphProps = (newProps: Record<string, unknown>) => {
        const {step, ...rest} = newProps;
        this.props.onChange({
            graph: {
                ...this.props.graph,
                ...rest,
                tickStep: step,
            },
        });
    };

    _addNewElement: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (
        e,
    ) => {
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
                // eslint-disable-next-line no-restricted-properties
                ((Math.random() * 0xffffff) << 0).toString(16),
            options: {...defaultOptionsByElementType[elementType]},
        };

        let nextSubscript;
        if (elementType === "movable-point") {
            nextSubscript = Math.max(...this.state.usedVarSubscripts, -1) + 1;
            newElement.options.varSubscript = nextSubscript;
        } else if (elementType === "movable-line") {
            nextSubscript = Math.max(...this.state.usedVarSubscripts, -1) + 1;
            newElement.options.startSubscript = nextSubscript;
            newElement.options.endSubscript = nextSubscript + 1;
        } else if (elementType === "function") {
            const nextLetter = String.fromCharCode(
                Math.max(
                    ...this.state.usedFunctionNames.map((c) => c.charCodeAt(0)),
                    "e".charCodeAt(0),
                ) + 1,
            );
            newElement.options.funcName = nextLetter;
        }
        this.props.onChange({
            elements: this.props.elements.concat(newElement),
        });
    };

    _deleteElement: (arg1: number) => void = (index) => {
        const element = this.props.elements[index];
        this.props.onChange({
            elements: this.props.elements.filter((e) => e !== element),
        });
    };

    _moveElementUp: (arg1: number) => void = (index) => {
        const element = this.props.elements[index];
        const newElements = this.props.elements.filter((e) => e !== element);
        newElements.splice(index - 1, 0, element);
        this.props.onChange({elements: newElements});
    };

    _moveElementDown: (arg1: number) => void = (index) => {
        const element = this.props.elements[index];
        const newElements = this.props.elements.filter((e) => e !== element);
        newElements.splice(index + 1, 0, element);
        this.props.onChange({elements: newElements});
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        const {TeX} = Dependencies.getDependencies();

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
                    <>
                        {this.props.graph.valid !== true && (
                            <div>{this.props.graph.valid}</div>
                        )}
                    </>
                </ElementContainer>
                {this.props.elements.map((element, n) => {
                    if (element.type === "movable-point") {
                        return (
                            <ElementContainer
                                title={
                                    <span>
                                        Movable point{" "}
                                        <TeX>
                                            {"(x_{" +
                                                element.options.varSubscript +
                                                "}, y_{" +
                                                element.options.varSubscript +
                                                "})"}
                                        </TeX>
                                    </span>
                                }
                                onUp={
                                    n === 0
                                        ? null
                                        : () => this._moveElementUp(n)
                                }
                                onDown={
                                    n === this.props.elements.length - 1
                                        ? null
                                        : () => this._moveElementDown(n)
                                }
                                onDelete={() => this._deleteElement(n)}
                                key={element.key}
                            >
                                <MovablePointEditor
                                    {...element.options}
                                    onChange={(newProps) => {
                                        const elements = JSON.parse(
                                            JSON.stringify(this.props.elements),
                                        );
                                        Object.assign(
                                            elements[n].options,
                                            newProps,
                                        );
                                        this.props.onChange({
                                            elements: elements,
                                        });
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
                                                element.options.startSubscript +
                                                "}, y_{" +
                                                element.options.startSubscript +
                                                "})"}
                                        </TeX>{" "}
                                        to{" "}
                                        <TeX>
                                            {"(x_{" +
                                                element.options.endSubscript +
                                                "}, y_{" +
                                                element.options.endSubscript +
                                                "})"}
                                        </TeX>
                                    </span>
                                }
                                onUp={
                                    n === 0
                                        ? null
                                        : () => this._moveElementUp(n)
                                }
                                onDown={
                                    n === this.props.elements.length - 1
                                        ? null
                                        : () => this._moveElementDown(n)
                                }
                                onDelete={() => this._deleteElement(n)}
                                key={element.key}
                            >
                                <MovableLineEditor
                                    {...element.options}
                                    onChange={(newProps) => {
                                        const elements = JSON.parse(
                                            JSON.stringify(this.props.elements),
                                        );
                                        Object.assign(
                                            elements[n].options,
                                            newProps,
                                        );
                                        this.props.onChange({
                                            elements: elements,
                                        });
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
                                onUp={
                                    n === 0
                                        ? null
                                        : () => this._moveElementUp(n)
                                }
                                onDown={
                                    n === this.props.elements.length - 1
                                        ? null
                                        : () => this._moveElementDown(n)
                                }
                                onDelete={() => this._deleteElement(n)}
                                key={element.key}
                            >
                                <PointEditor
                                    {...element.options}
                                    onChange={(newProps) => {
                                        const elements = JSON.parse(
                                            JSON.stringify(this.props.elements),
                                        );
                                        Object.assign(
                                            elements[n].options,
                                            newProps,
                                        );
                                        this.props.onChange({
                                            elements: elements,
                                        });
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
                                onUp={
                                    n === 0
                                        ? null
                                        : () => this._moveElementUp(n)
                                }
                                onDown={
                                    n === this.props.elements.length - 1
                                        ? null
                                        : () => this._moveElementDown(n)
                                }
                                onDelete={() => this._deleteElement(n)}
                                key={element.key}
                            >
                                <LineEditor
                                    {...element.options}
                                    onChange={(newProps) => {
                                        const elements = JSON.parse(
                                            JSON.stringify(this.props.elements),
                                        );
                                        Object.assign(
                                            elements[n].options,
                                            newProps,
                                        );
                                        this.props.onChange({
                                            elements: elements,
                                        });
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
                                onUp={
                                    n === 0
                                        ? null
                                        : () => this._moveElementUp(n)
                                }
                                onDown={
                                    n === this.props.elements.length - 1
                                        ? null
                                        : () => this._moveElementDown(n)
                                }
                                onDelete={() => this._deleteElement(n)}
                                key={element.key}
                            >
                                <FunctionEditor
                                    {...element.options}
                                    onChange={(newProps) => {
                                        const elements = JSON.parse(
                                            JSON.stringify(this.props.elements),
                                        );
                                        Object.assign(
                                            elements[n].options,
                                            newProps,
                                        );
                                        this.props.onChange({
                                            elements: elements,
                                        });
                                    }}
                                />
                            </ElementContainer>
                        );
                    }
                    if (element.type === "parametric") {
                        return (
                            <ElementContainer
                                title={<span>Parametric</span>}
                                onUp={
                                    n === 0
                                        ? null
                                        : () => this._moveElementUp(n)
                                }
                                onDown={
                                    n === this.props.elements.length - 1
                                        ? null
                                        : () => this._moveElementDown(n)
                                }
                                onDelete={() => this._deleteElement(n)}
                                key={element.key}
                            >
                                <ParametricEditor
                                    {...element.options}
                                    onChange={(newProps) => {
                                        const elements = JSON.parse(
                                            JSON.stringify(this.props.elements),
                                        );
                                        Object.assign(
                                            elements[n].options,
                                            newProps,
                                        );
                                        this.props.onChange({
                                            elements: elements,
                                        });
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
                                onUp={
                                    n === 0
                                        ? null
                                        : () => this._moveElementUp(n)
                                }
                                onDown={
                                    n === this.props.elements.length - 1
                                        ? null
                                        : () => this._moveElementDown(n)
                                }
                                onDelete={() => this._deleteElement(n)}
                                key={element.key}
                            >
                                <LabelEditor
                                    {...element.options}
                                    onChange={(newProps) => {
                                        const elements = JSON.parse(
                                            JSON.stringify(this.props.elements),
                                        );
                                        Object.assign(
                                            elements[n].options,
                                            newProps,
                                        );
                                        this.props.onChange({
                                            elements: elements,
                                        });
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
                                onUp={
                                    n === 0
                                        ? null
                                        : () => this._moveElementUp(n)
                                }
                                onDown={
                                    n === this.props.elements.length - 1
                                        ? null
                                        : () => this._moveElementDown(n)
                                }
                                onDelete={() => this._deleteElement(n)}
                                key={element.key}
                            >
                                <RectangleEditor
                                    {...element.options}
                                    onChange={(newProps) => {
                                        const elements = JSON.parse(
                                            JSON.stringify(this.props.elements),
                                        );
                                        Object.assign(
                                            elements[n].options,
                                            newProps,
                                        );
                                        this.props.onChange({
                                            elements: elements,
                                        });
                                    }}
                                />
                            </ElementContainer>
                        );
                    }
                })}
                <div className="perseus-widget-interaction-editor-select-element">
                    {/* @ts-expect-error - TS2322 - Type '(arg1: ChangeEvent<HTMLInputElement>) => void' is not assignable to type 'ChangeEventHandler<HTMLSelectElement>'. */}
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
    }
}

export default InteractionEditor;
