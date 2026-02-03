/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable @typescript-eslint/no-invalid-this, react/no-unsafe */
import {
    Changeable,
    Dependencies,
    EditorJsonify,
    Util,
} from "@khanacademy/perseus";
import {
    interactionLogic,
    type Coords,
    type InteractionDefaultWidgetOptions,
    type MarkingsType,
} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import GraphSettings from "../../components/graph-settings";

import ElementContainer from "./element-container";
import FunctionEditor from "./function-editor";
import LabelEditor from "./label-editor";
import LineEditor from "./line-editor";
import MovableLineEditor from "./movable-line-editor";
import MovablePointEditor from "./movable-point-editor";
import ParametricEditor from "./parametric-editor";
import PointEditor from "./point-editor";
import RectangleEditor from "./rectangle-editor";

const {getDependencies} = Dependencies;
const {unescapeMathMode} = Util;

type Graph = {
    box: ReadonlyArray<number>;
    labels: ReadonlyArray<string>;
    range: Coords;
    tickStep: [number, number];
    gridStep: [number, number];
    markings: MarkingsType;
    valid?: boolean;
};

type Props = Changeable.ChangeableProps & {
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
    static defaultProps: InteractionDefaultWidgetOptions =
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

    _getAllFunctionNames(elements: ReadonlyArray<any>): ReadonlyArray<string> {
        return _.map(
            _.where(elements, {type: "function"}),
            (element) => element.options.funcName,
        );
    }

    _updateGraphProps: (arg1: any) => any = (newProps) => {
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({
            graph: _.extend(_.omit(newProps, "step"), {
                tickStep: newProps.step,
            }),
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
        } as const;

        let nextSubscript;
        if (elementType === "movable-point") {
            nextSubscript =
                _.max([_.max(this.state.usedVarSubscripts), -1]) + 1;
            // @ts-expect-error - TS2339 - Property 'varSubscript' does not exist on type '{}'.
            newElement.options.varSubscript = nextSubscript;
        } else if (elementType === "movable-line") {
            nextSubscript =
                _.max([_.max(this.state.usedVarSubscripts), -1]) + 1;
            // @ts-expect-error - TS2339 - Property 'startSubscript' does not exist on type '{}'.
            newElement.options.startSubscript = nextSubscript;
            // @ts-expect-error - TS2339 - Property 'endSubscript' does not exist on type '{}'.
            newElement.options.endSubscript = nextSubscript + 1;
        } else if (elementType === "function") {
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
            // @ts-expect-error - TS2339 - Property 'funcName' does not exist on type '{}'.
            newElement.options.funcName = nextLetter;
        }
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({
            elements: this.props.elements.concat(newElement),
        });
    };

    _deleteElement: (arg1: number) => void = (index) => {
        const element = this.props.elements[index];
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({elements: _.without(this.props.elements, element)});
    };

    _moveElementUp: (arg1: number) => void = (index) => {
        const element = this.props.elements[index];
        const newElements = _.without(this.props.elements, element);
        newElements.splice(index - 1, 0, element);
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({elements: newElements});
    };

    _moveElementDown: (arg1: number) => void = (index) => {
        const element = this.props.elements[index];
        const newElements = _.without(this.props.elements, element);
        newElements.splice(index + 1, 0, element);
        // @ts-expect-error - TS2554 - Expected 3 arguments, but got 1.
        this.change({elements: newElements});
    };

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
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
                    <>
                        {this.props.graph.valid !== true && (
                            <div>{this.props.graph.valid}</div>
                        )}
                    </>
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
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        n === this.props.elements.length - 1
                                            ? null
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementDown.bind(
                                                  // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                  this,
                                                  n,
                                              )
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    onDelete={this._deleteElement.bind(this, n)}
                                    key={element.key}
                                >
                                    <MovablePointEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        n === this.props.elements.length - 1
                                            ? null
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementDown.bind(
                                                  // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                  this,
                                                  n,
                                              )
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    onDelete={this._deleteElement.bind(this, n)}
                                    key={element.key}
                                >
                                    <MovableLineEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        n === this.props.elements.length - 1
                                            ? null
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementDown.bind(
                                                  // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                  this,
                                                  n,
                                              )
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    onDelete={this._deleteElement.bind(this, n)}
                                    key={element.key}
                                >
                                    <PointEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        n === this.props.elements.length - 1
                                            ? null
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementDown.bind(
                                                  // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                  this,
                                                  n,
                                              )
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    onDelete={this._deleteElement.bind(this, n)}
                                    key={element.key}
                                >
                                    <LineEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        n === this.props.elements.length - 1
                                            ? null
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementDown.bind(
                                                  // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                  this,
                                                  n,
                                              )
                                    }
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    onDelete={this._deleteElement}
                                    key={element.key}
                                >
                                    <FunctionEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        n === this.props.elements.length - 1
                                            ? null
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementDown.bind(
                                                  // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                  this,
                                                  n,
                                              )
                                    }
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    onDelete={this._deleteElement}
                                    key={element.key}
                                >
                                    <ParametricEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        n === this.props.elements.length - 1
                                            ? null
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementDown.bind(
                                                  // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                  this,
                                                  n,
                                              )
                                    }
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    onDelete={this._deleteElement}
                                    key={element.key}
                                >
                                    <LabelEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementUp.bind(this, n)
                                    }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDown={
                                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                        n === this.props.elements.length - 1
                                            ? null
                                            : // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                              this._moveElementDown.bind(
                                                  // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                  this,
                                                  n,
                                              )
                                    }
                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                    onDelete={this._deleteElement}
                                    key={element.key}
                                >
                                    <RectangleEditor
                                        {...element.options}
                                        onChange={(newProps) => {
                                            const elements = JSON.parse(
                                                JSON.stringify(
                                                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                                    this.props.elements,
                                                ),
                                            );
                                            _.extend(
                                                elements[n].options,
                                                newProps,
                                            );
                                            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
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
        /* eslint-enable max-len */
    }
}

export default InteractionEditor;
