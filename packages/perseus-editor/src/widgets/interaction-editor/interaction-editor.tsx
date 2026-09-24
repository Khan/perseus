import {Dependencies, Util} from "@khanacademy/perseus";
import {interactionLogic} from "@khanacademy/perseus-core";
import * as React from "react";
import invariant from "tiny-invariant";

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

import type {
    PerseusInteractionWidgetOptions,
    PerseusInteractionGraph,
    PerseusInteractionElement,
} from "@khanacademy/perseus-core";

const {unescapeMathMode} = Util;

type Props = {
    onChange: (options: PerseusInteractionWidgetOptions) => void;
    elements: PerseusInteractionElement[];
    graph: PerseusInteractionGraph;
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
    static defaultProps: PerseusInteractionWidgetOptions =
        interactionLogic.defaultWidgetOptions;

    state: State = {
        usedVarSubscripts: this._getAllVarSubscripts(this.props.elements),
        usedFunctionNames: this._getAllFunctionNames(this.props.elements),
    };

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        // TODO(benchristel): we shouldn't be using state for next-subscripts
        //  and function names; these values are a pure function of the props!
        this.setState({
            usedVarSubscripts: this._getAllVarSubscripts(nextProps.elements),
            usedFunctionNames: this._getAllFunctionNames(nextProps.elements),
        });
    }

    handleChange(changes: Partial<PerseusInteractionWidgetOptions>) {
        this.props.onChange({
            graph: this.props.graph,
            elements: this.props.elements,
            ...changes,
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
    // TODO(benchristel): remove `any` and give this a real type.
    _updateGraphProps = (newProps: Record<string, any>) => {
        const {step, ...rest} = newProps;
        this.handleChange({
            graph: {
                ...this.props.graph,
                ...rest,
                tickStep: step,
            },
        });
    };

    nextSubscript() {
        return Math.max(...this.state.usedVarSubscripts, -1) + 1;
    }

    nextFuncName() {
        return String.fromCharCode(
            Math.max(
                ...this.state.usedFunctionNames.map((c) => c.charCodeAt(0)),
                "e".charCodeAt(0),
            ) + 1,
        );
    }

    createElement(elementType: string): PerseusInteractionElement {
        switch (elementType) {
            case "movable-point":
                return {
                    type: "movable-point",
                    key: `movable-point-${randomId()}`,
                    options: {
                        ...MovablePointEditor.defaultProps,
                        varSubscript: this.nextSubscript(),
                    },
                };
            case "movable-line":
                return {
                    type: "movable-line",
                    key: `movable-line-${randomId()}`,
                    options: {
                        ...MovableLineEditor.defaultProps,
                        startSubscript: this.nextSubscript(),
                    },
                };
            case "point":
                return {
                    type: "point",
                    key: `point-${randomId()}`,
                    options: {...PointEditor.defaultProps},
                };
            case "line":
                return {
                    type: "line",
                    key: `line-${randomId()}`,
                    options: {...LineEditor.defaultProps},
                };
            case "function":
                return {
                    type: "function",
                    key: `function-${randomId()}`,
                    options: {
                        ...FunctionEditor.defaultProps,
                        funcName: this.nextFuncName(),
                    },
                };
            case "parametric":
                return {
                    type: "parametric",
                    key: `parametric-${randomId()}`,
                    options: {...ParametricEditor.defaultProps},
                };
            case "rectangle":
                return {
                    type: "rectangle",
                    key: `rectangle-${randomId()}`,
                    options: {...RectangleEditor.defaultProps},
                };
            default:
                throw new Error(`Unrecognized element type: ${elementType}`);
        }
    }

    _addNewElement: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (
        e,
    ) => {
        const elementType = e.target.value;
        if (elementType === "") {
            return;
        }
        e.target.value = "";
        this.handleChange({
            elements: this.props.elements.concat([
                this.createElement(elementType),
            ]),
        });
    };

    _deleteElement: (arg1: number) => void = (index) => {
        const element = this.props.elements[index];
        this.handleChange({
            elements: this.props.elements.filter((e) => e !== element),
        });
    };

    _moveElementUp: (arg1: number) => void = (index) => {
        const element = this.props.elements[index];
        const newElements = this.props.elements.filter((e) => e !== element);
        newElements.splice(index - 1, 0, element);
        this.handleChange({elements: newElements});
    };

    _moveElementDown: (arg1: number) => void = (index) => {
        const element = this.props.elements[index];
        const newElements = this.props.elements.filter((e) => e !== element);
        newElements.splice(index + 1, 0, element);
        this.handleChange({elements: newElements});
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
                                    onChange={(newOptions) => {
                                        const elementsCopy = [
                                            ...this.props.elements,
                                        ];
                                        invariant(
                                            elementsCopy[n].type ===
                                                "movable-point",
                                            "edited element must be a movable-point",
                                        );
                                        elementsCopy[n] = {
                                            ...elementsCopy[n],
                                            options: newOptions,
                                        };
                                        this.handleChange({
                                            elements: elementsCopy,
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
                                    onChange={(newOptions) => {
                                        const elementsCopy = [
                                            ...this.props.elements,
                                        ];
                                        invariant(
                                            elementsCopy[n].type ===
                                                "movable-line",
                                            "edited element must be a movable-line",
                                        );
                                        elementsCopy[n] = {
                                            ...elementsCopy[n],
                                            options: newOptions,
                                        };
                                        this.handleChange({
                                            elements: elementsCopy,
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
                                    onChange={(newOptions) => {
                                        const elementsCopy = [
                                            ...this.props.elements,
                                        ];
                                        invariant(
                                            elementsCopy[n].type === "point",
                                            "edited element must be a point",
                                        );
                                        elementsCopy[n] = {
                                            ...elementsCopy[n],
                                            options: newOptions,
                                        };
                                        this.handleChange({
                                            elements: elementsCopy,
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
                                    onChange={(newOptions) => {
                                        const elementsCopy = [
                                            ...this.props.elements,
                                        ];
                                        invariant(
                                            elementsCopy[n].type === "line",
                                            "edited element must be a line",
                                        );
                                        elementsCopy[n] = {
                                            ...elementsCopy[n],
                                            options: newOptions,
                                        };
                                        this.handleChange({
                                            elements: elementsCopy,
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
                                    onChange={(newOptions) => {
                                        const elementsCopy = [
                                            ...this.props.elements,
                                        ];
                                        invariant(
                                            elementsCopy[n].type === "function",
                                            "edited element must be a function",
                                        );
                                        elementsCopy[n] = {
                                            ...elementsCopy[n],
                                            options: newOptions,
                                        };
                                        this.handleChange({
                                            elements: elementsCopy,
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
                                    onChange={(newOptions) => {
                                        const elementsCopy = [
                                            ...this.props.elements,
                                        ];
                                        invariant(
                                            elementsCopy[n].type ===
                                                "parametric",
                                            "edited element must be a parametric",
                                        );
                                        elementsCopy[n] = {
                                            ...elementsCopy[n],
                                            options: newOptions,
                                        };
                                        this.handleChange({
                                            elements: elementsCopy,
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
                                    onChange={(newOptions) => {
                                        const elementsCopy = [
                                            ...this.props.elements,
                                        ];
                                        invariant(
                                            elementsCopy[n].type === "label",
                                            "edited element must be a label",
                                        );
                                        elementsCopy[n] = {
                                            ...elementsCopy[n],
                                            options: newOptions,
                                        };
                                        this.handleChange({
                                            elements: elementsCopy,
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
                                    onChange={(newOptions) => {
                                        const elementsCopy = [
                                            ...this.props.elements,
                                        ];
                                        invariant(
                                            elementsCopy[n].type ===
                                                "rectangle",
                                            "edited element must be a rectangle",
                                        );
                                        elementsCopy[n] = {
                                            ...elementsCopy[n],
                                            options: newOptions,
                                        };
                                        this.handleChange({
                                            elements: elementsCopy,
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

function randomId(): string {
    // Using Math.random() is okay here because the IDs are written to the
    // content data; they don't need to be deterministically derivable.
    // eslint-disable-next-line no-restricted-properties
    return ((Math.random() * 0xffffff) << 0).toString(16);
}

export default InteractionEditor;
