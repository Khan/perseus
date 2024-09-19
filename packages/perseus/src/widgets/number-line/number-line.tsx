import {number as knumber} from "@khanacademy/kmath";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import Graphie from "../../components/graphie";
import {PerseusI18nContext} from "../../components/i18n-context";
import NumberInput from "../../components/number-input";
import SimpleKeypadInput from "../../components/simple-keypad-input";
import InteractiveUtil from "../../interactive2/interactive-util";
import * as Changeable from "../../mixins/changeable";
import {ApiOptions} from "../../perseus-api";
import KhanColors from "../../util/colors";
import KhanMath from "../../util/math";

import type {ChangeableProps} from "../../mixins/changeable";
import type {APIOptions, WidgetExports} from "../../types";
import type {PerseusNumberLineUserInput} from "../../validation.types";

// @ts-expect-error - TS2339 - Property 'MovablePoint' does not exist on type 'typeof Graphie'.
const MovablePoint = Graphie.MovablePoint;
// @ts-expect-error - TS2339 - Property 'Line' does not exist on type 'typeof Graphie'.
const Line = Graphie.Line;
const {assert} = InteractiveUtil;

const bound = (x: number, gt: any, lt: any) => Math.min(Math.max(x, gt), lt);

const EN_DASH = "\u2013";
const horizontalPadding = 30;

const reverseRel = {
    ge: "le",
    gt: "lt",
    le: "ge",
    lt: "gt",
} as const;

const toggleStrictRel = {
    ge: "gt",
    gt: "ge",
    le: "lt",
    lt: "le",
} as const;

function formatImproper(n: number, d: number): string {
    if (d === 1) {
        return "" + n;
    }
    return `\\dfrac{${n}}{${d}}`;
}

function formatMixed(n: number, d: number): string {
    if (n < 0) {
        return "-" + formatMixed(-n, d);
    }
    const w = Math.floor(n / d);
    if (w === 0) {
        return formatImproper(n, d);
    }
    if (n - w * d === 0) {
        return "" + w;
    }
    return w + formatImproper(n - w * d, d);
}

function formatNonReduced(n: number, d: number, base: number): string {
    const factor = Math.floor(base / d);
    return formatImproper(n * factor, base);
}

const _label = (
    graphie: any,
    labelStyle: any,
    pos: any,
    value: any,
    base: number,
): any => {
    value = value || pos;

    // TODO(jack): Find out if any exercises have "decimal ticks" set,
    // and if so, re-save them and remove this check.
    if (labelStyle === "decimal" || labelStyle === "decimal ticks") {
        return graphie.label(
            [pos, -0.53],
            Math.round(value * 100) / 100,
            "center",
        );
    }
    if (labelStyle === "improper") {
        const frac = KhanMath.toFraction(value);
        return graphie.label(
            [pos, -0.17],
            formatImproper(frac[0], frac[1]),
            "below",
        );
    }
    if (labelStyle === "mixed") {
        const frac = KhanMath.toFraction(value);
        return graphie.label(
            [pos, -0.17],
            formatMixed(frac[0], frac[1]),
            "below",
        );
    }
    if (labelStyle === "non-reduced") {
        const frac = KhanMath.toFraction(value);
        return graphie.label(
            [pos, -0.17],
            formatNonReduced(frac[0], frac[1], base),
            "below",
        );
    }
};

// @ts-expect-error - TS2339 - Property 'createSimpleClass' does not exist on type 'typeof Graphie'.
const TickMarks: any = Graphie.createSimpleClass((graphie, props) => {
    // Avoid infinite loop
    if (!_.isFinite(props.tickStep) || props.tickStep <= 0) {
        return []; // this has screwed me for the last time!
    }

    const results: Array<any> = [];

    // For convenience, extract some props into separate variables
    const range = props.range;
    const labelRange = props.labelRange;
    const leftLabel = labelRange[0] == null ? range[0] : labelRange[0];
    const rightLabel = labelRange[1] == null ? range[1] : labelRange[1];

    // Find base via GCD for non-reduced fractions
    let base;
    if (props.labelStyle === "non-reduced") {
        const fractions = [leftLabel, rightLabel];
        for (let i = 0; i <= props.numDivisions; i++) {
            const x = range[0] + i * props.tickStep;
            fractions.push(x);
        }
        const getDenom = (x: any) => knumber.toFraction(x)[1];
        const denoms = _.map(fractions, getDenom);
        base = _.reduce(denoms, (x, y) => KhanMath.getLCM(x, y));
    } else {
        base = undefined;
    }

    // Draw and save the tick marks and tick labels
    for (let i = 0; i <= props.numDivisions; i++) {
        const x = range[0] + i * props.tickStep;
        results.push(graphie.line([x, -0.2], [x, 0.2]));

        const labelTicks = props.labelTicks;
        if (labelTicks || props.labelStyle === "decimal ticks") {
            results.push(_label(graphie, props.labelStyle, x, x, base));
        }
    }

    // Render the text labels
    results.push(
        graphie.style(
            props.isMobile
                ? {
                      color: KhanColors.BLUE,
                  }
                : {},
            () => _label(graphie, props.labelStyle, leftLabel, leftLabel, base),
        ),
    );

    results.push(
        graphie.style(
            props.isMobile
                ? {
                      color: KhanColors.BLUE,
                  }
                : {},
            () =>
                _label(graphie, props.labelStyle, rightLabel, rightLabel, base),
        ),
    );

    // Render the labels' lines
    graphie.style(
        {
            stroke: KhanColors.BLUE,
            strokeWidth: 3.5,
        },
        () => {
            results.push(graphie.line([leftLabel, -0.2], [leftLabel, 0.2]));
            results.push(graphie.line([rightLabel, -0.2], [rightLabel, 0.2]));
        },
    );

    return results;
});

export type Relationship = "lt" | "gt" | "le" | "ge";

type Props = ChangeableProps & {
    range: [number, number];
    labelRange: ReadonlyArray<number | null>;
    labelStyle: string;
    labelTicks: boolean;
    divisionRange: ReadonlyArray<number>;
    numDivisions: number;
    snapDivisions: number;
    isTickCtrl: boolean;
    isInequality: boolean;
    numLinePosition: number;
    rel: Relationship;
    onFocus: (arg1: any) => void;
    onBlur: (arg1: any) => void;
    onChange: (arg1: any, arg2?: () => void | null | undefined) => void;
    apiOptions: APIOptions;
    keypadElement: HTMLElement | null | undefined;
    static?: boolean;
    showTooltips?: boolean;
    trackInteraction: () => void;
};

type DefaultProps = {
    range: Props["range"];
    labelStyle: Props["labelStyle"];
    labelRange: Props["labelRange"];
    divisionRange: Props["divisionRange"];
    labelTicks: Props["labelTicks"];
    isTickCtrl: Props["isTickCtrl"];
    isInequality: Props["isInequality"];
    numLinePosition: Props["numLinePosition"];
    snapDivisions: Props["snapDivisions"];
    showTooltips: Props["showTooltips"];
    rel: Props["rel"];
    apiOptions: Props["apiOptions"];
};

type State = {
    numDivisionsEmpty: boolean;
};
class NumberLine extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        range: [0, 10],
        labelStyle: "decimal",
        labelRange: [null, null],
        divisionRange: [1, 12],
        labelTicks: true,
        isTickCtrl: false,
        isInequality: false,
        numLinePosition: 0,
        snapDivisions: 2,
        showTooltips: false,
        rel: "ge",
        apiOptions: ApiOptions.defaults,
    };

    state: any = {
        numDivisionsEmpty: false,
    };

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    isValid: () => boolean = () => {
        const range = this.props.range;
        let initialX = this.props.numLinePosition;
        const divisionRange = this.props.divisionRange;

        initialX = initialX == null ? range[0] : initialX;

        return (
            range[0] < range[1] &&
            knumber.sign(initialX - range[0]) >= 0 &&
            knumber.sign(initialX - range[1]) <= 0 &&
            divisionRange[0] < divisionRange[1] &&
            0 < this.props.numDivisions &&
            0 < this.props.snapDivisions
        );
    };

    onNumDivisionsChange: (arg1: number, arg2: any) => void = (
        numDivisions,
        cb,
    ) => {
        const divRange = this.props.divisionRange.slice();
        const width = this.props.range[1] - this.props.range[0];

        // Don't allow a fraction for the number of divisions
        numDivisions = Math.round(numDivisions);

        // Don't allow negative numbers for the number of divisions
        numDivisions = numDivisions < 0 ? numDivisions * -1 : numDivisions;

        // If the number of divisions isn't blank, update the number line
        if (numDivisions) {
            const nextProps = _.extend({}, this.props, {
                tickStep: width / numDivisions,
            });

            const newNumLinePosition = this.snapNumLinePosition(
                nextProps,
                this.props.numLinePosition,
            );

            this.setState(
                {
                    numDivisionsEmpty: false,
                },
                () => {
                    this.props.onChange(
                        {
                            divisionRange: divRange,
                            numDivisions: numDivisions,
                            numLinePosition: newNumLinePosition,
                        },
                        cb,
                    );
                },
            );
        } else {
            this.setState(
                {
                    numDivisionsEmpty: true,
                },
                cb,
            );
        }
    };

    _handleTickCtrlFocus: () => void = () => {
        this.props.onFocus(["tick-ctrl"]);
    };

    _handleTickCtrlBlur: () => void = () => {
        this.props.onBlur(["tick-ctrl"]);
    };

    focus: () => boolean | null | undefined = () => {
        if (this.props.isTickCtrl) {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
            this.refs["tick-ctrl"].focus();
            return true;
        }
    };

    focusInputPath: (arg1: any) => void = (path) => {
        if (path.length === 1) {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
            this.refs[path[0]].focus();
        }
    };

    blurInputPath: (arg1: any) => void = (path) => {
        if (path.length === 1) {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
            this.refs[path[0]].blur();
        }
    };

    getInputPaths: () => ReadonlyArray<ReadonlyArray<string>> = () => {
        if (this.props.isTickCtrl) {
            return [["tick-ctrl"]];
        }
        return [];
    };

    getDOMNodeForPath: (arg1: any) => Element | Text | null | undefined = (
        inputPath,
    ) => {
        if (inputPath.length === 1) {
            // eslint-disable-next-line react/no-string-refs
            return ReactDOM.findDOMNode(this.refs[inputPath[0]]);
        }
    };

    getGrammarTypeForPath: (arg1: any) => string | null | undefined = (
        inputPath,
    ) => {
        if (inputPath.length === 1 && inputPath[0] === "tick-ctrl") {
            return "number";
        }
    };

    setInputValue: (arg1: any, arg2: any, arg3: any) => void = (
        inputPath,
        value,
        callback,
    ) => {
        if (inputPath.length === 1 && inputPath[0] === "tick-ctrl") {
            this.onNumDivisionsChange(value, callback);
        }
    };

    _renderGraphie: () => React.ReactElement = () => {
        // Position variables
        const range = this.props.range;
        const width = range[1] - range[0];

        const options = _.pick(this.props, ["range", "isTickCtrl"]);

        // TODO(aria): Maybe save this as `this.calculatedProps`?
        const props = _.extend({}, this.props, {
            tickStep: width / this.props.numDivisions,
        });

        return (
            <Graphie
                // eslint-disable-next-line react/no-string-refs
                ref="graphie"
                // HACK(emily): We key this graphie on the label style because
                // when the label style changes we want to resize the graphie,
                // which isn't doable without throwing away the graphie and
                // making a new one.
                key={this.props.labelStyle}
                box={[this.props.apiOptions.isMobile ? 288 : 460, 80]}
                options={options}
                onMouseDown={(coord) => {
                    // eslint-disable-next-line react/no-string-refs
                    // @ts-expect-error - TS2339 - Property 'movables' does not exist on type 'ReactInstance'.
                    this.refs.graphie.movables.numberLinePoint.grab(coord);
                }}
                setup={this._setupGraphie}
                setDrawingAreaAvailable={
                    this.props.apiOptions.setDrawingAreaAvailable
                }
                isMobile={this.props.apiOptions.isMobile}
            >
                <TickMarks
                    {..._.pick(props, [
                        "range",
                        "numDivisions",
                        "labelTicks",
                        "labelStyle",
                        "labelRange",
                        "tickStep",
                    ])}
                    isMobile={this.props.apiOptions.isMobile}
                />
                {this._renderInequality(props)}
                {this._renderNumberLinePoint(props)}
            </Graphie>
        );
    };

    snapNumLinePosition: (arg1: any, arg2: number) => number = (
        props,
        numLinePosition,
    ) => {
        const left = props.range[0];
        const right = props.range[1];
        const snapX = props.tickStep / props.snapDivisions;

        let x = bound(numLinePosition, left, right);
        x = left + knumber.roundTo(x - left, snapX);
        assert(_.isFinite(x));
        return x;
    };

    // This function is intended to be used by the client code
    // and by test code to directly set the target number line
    // position
    movePosition: (arg1: number) => void = (targetPosition) => {
        this.change({numLinePosition: targetPosition});
        this.props.trackInteraction();
    };

    _renderNumberLinePoint: (arg1: any) => React.ReactElement = (props) => {
        const isOpen = _(["lt", "gt"]).contains(props.rel);

        // In static mode the point's fill and stroke is blue to signify that
        // it can't be interacted with.
        let fill;
        if (isOpen) {
            fill = KhanColors._BACKGROUND;
        } else if (props.static) {
            fill = KhanColors.BLUE;
        } else {
            fill = KhanColors.GREEN;
        }
        const normalStyle = {
            fill: fill,
            stroke: props.static ? KhanColors.BLUE : KhanColors.GREEN,
            "stroke-width": isOpen ? 3 : 1,
        } as const;
        const highlightStyle = {
            fill: isOpen ? KhanColors._BACKGROUND : KhanColors.GREEN,
            "stroke-width": isOpen ? 3 : 1,
        } as const;

        const mobileDotStyle = props.isInequality
            ? {
                  stroke: KhanColors.GREEN,
                  "fill-opacity": isOpen ? 0 : 1,
              }
            : {};

        return (
            <MovablePoint
                // eslint-disable-next-line react/no-string-refs
                ref="numberLinePoint"
                pointSize={6}
                coord={[props.numLinePosition, 0]}
                constraints={[
                    (coord: any, prevCoord) => {
                        // constrain-y
                        return [coord[0], prevCoord[1]];
                    },
                    (coord: any, prevCoord) => {
                        // snap X
                        const x = this.snapNumLinePosition(props, coord[0]);
                        return [x, coord[1]];
                    },
                ]}
                normalStyle={normalStyle}
                highlightStyle={highlightStyle}
                onMove={(coord) => {
                    this.movePosition(coord[0]);
                }}
                isMobile={this.props.apiOptions.isMobile}
                mobileStyleOverride={mobileDotStyle}
                showTooltips={this.props.showTooltips}
                xOnlyTooltip={true}
            />
        );
    };

    handleReverse: () => void = () => {
        const newRel = reverseRel[this.props.rel];
        this.props.onChange({rel: newRel});
    };

    handleToggleStrict: () => void = () => {
        const newRel = toggleStrictRel[this.props.rel];
        this.props.onChange({rel: newRel});
    };

    // @ts-expect-error - TS2322 - Type '(props: any) => any[]' is not assignable to type '(arg1: any) => [number, number]'.
    _getInequalityEndpoint: (arg1: any) => [number, number] = (props) => {
        const isGreater = _(["ge", "gt"]).contains(props.rel);
        const widthInPixels = 400;
        const range = props.range;
        const scale = (range[1] - range[0]) / widthInPixels;
        const buffer = horizontalPadding * scale;
        const left = range[0] - buffer;
        const right = range[1] + buffer;
        const end = isGreater ? [right, 0] : [left, 0];
        return end;
    };

    // @ts-expect-error - TS2322 - Type '(props: any) => Element | null' is not assignable to type '(arg1: any) => ReactElement<any, string | JSXElementConstructor<any>>'.
    _renderInequality: (arg1: any) => React.ReactElement = (props) => {
        if (props.isInequality) {
            const end = this._getInequalityEndpoint(props);
            const style = {
                arrows: "->",
                stroke: this.props.apiOptions.isMobile
                    ? KhanColors.GREEN
                    : KhanColors.BLUE,
                strokeWidth: 3.5,
            } as const;

            const isGreater = ["ge", "gt"].includes(props.rel);

            return (
                <Line
                    // We shift the line to either side of the dot so they don't
                    // intersect
                    start={[
                        (isGreater ? 0.4 : -0.4) + props.numLinePosition,
                        0,
                    ]}
                    end={end}
                    style={style}
                />
            );
        }
        return null;
    };

    _setupGraphie: (arg1: any, arg2: any) => void = (graphie, options) => {
        // Ensure a sane configuration to avoid infinite loops
        if (!this.isValid()) {
            return;
        }

        // Position variables
        const widthInPixels = this.props.apiOptions.isMobile
            ? 288 - horizontalPadding * 2
            : 400;
        const range = options.range;
        const scale = (range[1] - range[0]) / widthInPixels;
        const buffer = horizontalPadding * scale;

        // Initiate the graphie without actually drawing anything
        const left = range[0] - buffer;
        const right = range[1] + buffer;

        const hasFractionalLabels =
            this.props.labelStyle === "improper" ||
            this.props.labelStyle === "mixed" ||
            this.props.labelStyle === "non-reduced";
        const bottom = hasFractionalLabels ? -1.5 : -1;
        const top = 1;

        graphie.init({
            range: [
                [left, right],
                [bottom, top],
            ],
            scale: [1 / scale, 40],
            isMobile: this.props.apiOptions.isMobile,
        });

        // Draw the number line
        const center = (range[0] + range[1]) / 2;
        graphie.line([center, 0], [right, 0], {arrows: "->"});
        graphie.line([center, 0], [left, 0], {arrows: "->"});
    };

    getUserInput: () => PerseusNumberLineUserInput = () => {
        return {
            numLinePosition: this.props.numLinePosition,
            rel: this.props.isInequality ? this.props.rel : "eq",
            numDivisions: this.props.numDivisions,
            divisionRange: this.props.divisionRange,
        };
    };

    simpleValidate: (arg1: any) => any = (rubric) => {
        // @ts-expect-error - TS2339 - Property 'validate' does not exist on type 'typeof NumberLine'.
        return NumberLine.validate(this.getUserInput(), rubric);
    };

    render(): React.ReactNode {
        const {strings} = this.context;
        const divisionRange = this.props.divisionRange;
        const divRangeString = divisionRange[0] + EN_DASH + divisionRange[1];
        const invalidNumDivisions =
            this.props.numDivisions < divisionRange[0] ||
            this.props.numDivisions > divisionRange[1];

        const inequalityControls = (
            <div>
                <input
                    type="button"
                    className="simple-button"
                    value={strings.switchDirection}
                    onClick={this.handleReverse}
                />
                <input
                    type="button"
                    className="simple-button"
                    value={
                        _(["le", "ge"]).contains(this.props.rel)
                            ? strings.circleOpen
                            : strings.circleFilled
                    }
                    onClick={this.handleToggleStrict}
                />
            </div>
        );

        let tickCtrl;
        if (this.props.isTickCtrl) {
            let Input;
            if (this.props.apiOptions.customKeypad) {
                Input = SimpleKeypadInput;
            } else {
                Input = NumberInput;
            }
            tickCtrl = (
                <label>
                    {strings.numDivisions}{" "}
                    <Input
                        // eslint-disable-next-line react/no-string-refs
                        ref="tick-ctrl"
                        value={
                            this.state.numDivisionsEmpty
                                ? null
                                : this.props.numDivisions || divisionRange[0]
                        }
                        checkValidity={(val) =>
                            val >= divisionRange[0] && val <= divisionRange[1]
                        }
                        onChange={this.onNumDivisionsChange}
                        onFocus={this._handleTickCtrlFocus}
                        onBlur={this._handleTickCtrlBlur}
                        useArrowKeys={true}
                        keypadElement={this.props.keypadElement}
                    />
                </label>
            );
        }

        return (
            <div
                className={
                    "perseus-widget " + "perseus-widget-interactive-number-line"
                }
            >
                {tickCtrl}
                {!this.isValid() ? (
                    <div className="perseus-error">
                        Invalid number line configuration.
                    </div>
                ) : this.props.isTickCtrl && invalidNumDivisions ? (
                    <div className="perseus-error">
                        {strings.divisions({divRangeString: divRangeString})}
                    </div>
                ) : (
                    this._renderGraphie()
                )}
                {!this.props.static &&
                    this.props.isInequality &&
                    inequalityControls}
            </div>
        );
    }
}

_.extend(NumberLine, {
    validate: function (state, rubric) {
        const range = rubric.range;
        const divisionRange = state.divisionRange;
        const start = rubric.initialX != null ? rubric.initialX : range[0];
        const startRel = rubric.isInequality ? "ge" : "eq";
        const correctRel = rubric.correctRel || "eq";
        const correctPos = knumber.equal(
            state.numLinePosition,
            rubric.correctX || 0,
        );
        const outsideAllowedRange =
            state.numDivisions > divisionRange[1] ||
            state.numDivisions < divisionRange[0];

        if (state.isTickCrtl && outsideAllowedRange) {
            return {
                type: "invalid",
                message: "Number of divisions is outside the allowed range.",
            };
        }
        if (correctPos && correctRel === state.rel) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null,
            };
        }
        if (state.numLinePosition === start && state.rel === startRel) {
            // We're where we started.
            return {
                type: "invalid",
                message: null,
            };
        }
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: null,
        };
    },
});

const numberLineTransform: (arg1: any) => any = (editorProps) => {
    const props = _.pick(editorProps, [
        "range",

        "labelRange",
        "labelStyle",
        "labelTicks",

        "divisionRange",
        "snapDivisions",

        "isTickCtrl",
        "isInequality",

        "showTooltips",
    ]);

    const numLinePosition =
        editorProps.initialX != null
            ? editorProps.initialX
            : editorProps.range[0];

    const width = editorProps.range[1] - editorProps.range[0];

    let numDivisions;
    if (editorProps.numDivisions != null) {
        numDivisions = editorProps.numDivisions;
    } else if (editorProps.tickStep != null) {
        numDivisions = width / editorProps.tickStep;
    } else {
        numDivisions = undefined; // send to getDefaultProps()
    }

    _.extend(props, {
        numLinePosition: numLinePosition,
        numDivisions: numDivisions,
        // Use getDefaultProps value if null
        snapDivisions: props.snapDivisions || undefined,
    });

    return props;
};

const staticTransform: (arg1: any) => any = (editorProps) => {
    const props = _.pick(editorProps, [
        "range",

        "labelRange",
        "labelStyle",
        "labelTicks",

        "divisionRange",
        "snapDivisions",

        // isTickCtrl is ignored since users can't interact with it anyway
        "isInequality",
    ]);

    // The correct x is the initial position of the point
    const numLinePosition =
        editorProps.correctX != null
            ? editorProps.correctX
            : editorProps.range[0];

    const width = editorProps.range[1] - editorProps.range[0];

    let numDivisions;
    if (editorProps.numDivisions != null) {
        numDivisions = editorProps.numDivisions;
    } else if (editorProps.tickStep != null) {
        numDivisions = width / editorProps.tickStep;
    } else {
        numDivisions = undefined; // send to getDefaultProps()
    }

    _.extend(props, {
        numLinePosition: numLinePosition,
        numDivisions: numDivisions,
        // Render the relation in the correct answer
        rel: editorProps.isInequality ? editorProps.correctRel : null,
        // Use getDefaultProps value if null
        snapDivisions: props.snapDivisions || undefined,
    });

    return props;
};

export default {
    name: "number-line",
    displayName: "Number line",
    widget: NumberLine,
    transform: numberLineTransform,
    staticTransform: staticTransform,
} as WidgetExports<typeof NumberLine>;
