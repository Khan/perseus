import {number as knumber, KhanMath} from "@khanacademy/kmath";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import Graphie from "../../components/graphie";
import {PerseusI18nContext} from "../../components/i18n-context";
import NumberInput from "../../components/number-input";
import SimpleKeypadInput from "../../components/simple-keypad-input";
import InteractiveUtil from "../../interactive2/interactive-util";
import {ApiOptions} from "../../perseus-api";
import KhanColors from "../../util/colors";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/number-line/number-line-ai-utils";

import type {
    WidgetExports,
    FocusPath,
    Widget,
    WidgetProps,
    UniversalWidgetProps,
} from "../../types";
import type {NumberLinePromptJSON} from "../../widget-ai-utils/number-line/number-line-ai-utils";
import type {
    Relationship,
    PerseusNumberLineUserInput,
    PerseusNumberLineWidgetOptions,
    NumberLinePublicWidgetOptions,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

// @ts-expect-error - TS2339 - Property 'MovablePoint' does not exist on type 'typeof Graphie'.
const MovablePoint = Graphie.MovablePoint;
// @ts-expect-error - TS2339 - Property 'Line' does not exist on type 'typeof Graphie'.
const Line = Graphie.Line;
const {assert} = InteractiveUtil;

const bound = (x: number, gt: any, lt: any) => Math.min(Math.max(x, gt), lt);

const EN_DASH = "\u2013";
const horizontalPadding = 30;

const reverseRel: Record<Relationship, Relationship> = {
    eq: "eq",
    ge: "le",
    gt: "lt",
    le: "ge",
    lt: "gt",
};

const toggleStrictRel: Record<Relationship, Relationship> = {
    eq: "eq",
    ge: "gt",
    gt: "ge",
    le: "lt",
    lt: "le",
};

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

const TickMarks: any = (Graphie as any).createSimpleClass((graphie, props) => {
    // Avoid infinite loop
    if (!_.isFinite(props.tickStep) || props.tickStep <= 0) {
        return []; // this has screwed me for the last time!
    }

    const results: Array<any> = [];

    // For convenience, extract some props into separate variables
    const {range, labelRange, labelStyle, labelTicks, tickStep, numDivisions} =
        props;
    const leftLabel = labelRange[0] == null ? range[0] : labelRange[0];
    const rightLabel = labelRange[1] == null ? range[1] : labelRange[1];

    // Find base via GCD for non-reduced fractions
    let base;
    if (labelStyle === "non-reduced") {
        const fractions = [leftLabel, rightLabel];
        for (let i = 0; i <= numDivisions; i++) {
            const x = range[0] + i * tickStep;
            fractions.push(x);
        }
        const getDenom = (x: any) => knumber.toFraction(x)[1];
        const denoms = _.map(fractions, getDenom);
        base = _.reduce(denoms, (x, y) => KhanMath.getLCM(x, y));
    } else {
        base = undefined;
    }

    const highlightedLineStyle = {
        stroke: KhanColors.BLUE,
        strokeWidth: 3.5,
    };
    const highlightedTextStyle = {color: KhanColors.BLUE};

    // Generate an array of tick numbers:
    //    `Array(Math.round(numDivisions))` makes an array of null values - one for every division marker
    //    `.keys()` gets the index values for each marker placeholder
    //    `.map()` converts the index values into actual tick numbers
    // NOTE: 'numDivisions' can sometimes be a non-integer (i.e. 7.000001).
    //       Using Math.round() to ensure that an integer is used in the Array setup.
    const initialTicks: number[] = [
        ...Array(Math.round(numDivisions)).keys(),
    ].map((index) => range[0] + index * tickStep);

    // .sort() comparator
    const byNumericAscending = (a: number, b: number) => a - b;

    // Ensure that any label markers and range endpoints are included in the array
    // Using `Set()` prevents duplication of tick numbers (and is quite performant)
    const allTicks: number[] = [
        ...new Set([...initialTicks, leftLabel, rightLabel, ...range]),
    ].sort(byNumericAscending);

    // Cycle through each tick number and add a tick line, and a label (if needed)
    allTicks.forEach((tick) => {
        const tickIsHighlighted = tick === leftLabel || tick === rightLabel;
        const lineStyle = tickIsHighlighted ? highlightedLineStyle : null;
        const textStyle = tickIsHighlighted ? highlightedTextStyle : null;
        graphie.style(lineStyle, () => {
            results.push(graphie.line([tick, -0.2], [tick, 0.2]));
        });
        if (labelTicks || tickIsHighlighted || labelStyle === "decimal ticks") {
            graphie.style(textStyle, () => {
                results.push(_label(graphie, labelStyle, tick, tick, base));
            });
        }
    });

    return results;
});

/**
 * The type of `this.props` inside the NumberLine widget.
 */
type Props = WidgetProps<
    {
        range: number[];
        labelRange: Array<number | null>;
        labelStyle: string;
        labelTicks: boolean;
        divisionRange: number[];
        snapDivisions: number;
        isTickCtrl: boolean;
        isInequality: boolean;
        showTooltips?: boolean;
    },
    PerseusNumberLineUserInput
>;

type CalculatedProps = Props & {
    tickStep: number;
};

type DefaultProps = {
    range: Props["range"];
    labelStyle: Props["labelStyle"];
    labelRange: Props["labelRange"];
    divisionRange: Props["divisionRange"];
    labelTicks: Props["labelTicks"];
    isTickCtrl: Props["isTickCtrl"];
    isInequality: Props["isInequality"];
    snapDivisions: Props["snapDivisions"];
    showTooltips: Props["showTooltips"];
    apiOptions: Props["apiOptions"];
};

/**
 * The props returned by the `transform` and `staticTransform` functions.
 */
type RenderProps = Omit<
    PropsFor<typeof NumberLine>,
    keyof UniversalWidgetProps
>;

type State = {
    numDivisionsEmpty: boolean;
};
class NumberLine extends React.Component<Props, State> implements Widget {
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
        snapDivisions: 2,
        showTooltips: false,
        apiOptions: ApiOptions.defaults,
    };

    state: any = {
        numDivisionsEmpty: false,
    };

    isValid: () => boolean = () => {
        const range = this.props.range;
        let initialX = this.props.userInput.numLinePosition;
        const divisionRange = this.props.divisionRange;

        initialX = initialX == null ? range[0] : initialX;

        return (
            range[0] < range[1] &&
            knumber.sign(initialX - range[0]) >= 0 &&
            knumber.sign(initialX - range[1]) <= 0 &&
            divisionRange[0] < divisionRange[1] &&
            0 < this.props.userInput.numDivisions &&
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
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (numDivisions) {
            const nextProps = {...this.props, tickStep: width / numDivisions};

            const newNumLinePosition = this.snapNumLinePosition(
                nextProps,
                this.props.userInput.numLinePosition,
            );

            this.setState(
                {
                    numDivisionsEmpty: false,
                },
                () => {
                    // Not sure this is still needed
                    this.props.onChange(
                        {
                            divisionRange: divRange,
                        },
                        cb,
                    );
                    this.props.handleUserInput(
                        {
                            ...this.props.userInput,
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

    focus() {
        if (this.props.isTickCtrl) {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
            this.refs["tick-ctrl"].focus();
            return true;
        }
        return false;
    }

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

    getDOMNodeForPath(inputPath: FocusPath) {
        if (inputPath?.length === 1) {
            // eslint-disable-next-line react/no-string-refs
            return ReactDOM.findDOMNode(this.refs[inputPath[0]]);
        }
        return null;
    }

    _renderGraphie: () => React.ReactElement = () => {
        // Position variables
        const range = this.props.range;
        const width = range[1] - range[0];

        const options = {
            range: this.props.range,
            isTickCtrl: this.props.isTickCtrl,
        };

        const props: CalculatedProps = {
            ...this.props,
            tickStep: width / this.props.userInput.numDivisions,
        };

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
                    range={props.range}
                    labelTicks={props.labelTicks}
                    labelStyle={props.labelStyle}
                    labelRange={props.labelRange}
                    tickStep={props.tickStep}
                    numDivisions={props.userInput.numDivisions}
                    isMobile={props.apiOptions.isMobile}
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
        this.props.handleUserInput({
            ...this.props.userInput,
            numLinePosition: targetPosition,
        });
        this.props.trackInteraction();
    };

    _renderNumberLinePoint: (arg1: CalculatedProps) => React.ReactElement = (
        props,
    ) => {
        const isOpen = _(["lt", "gt"]).contains(props.userInput.rel);

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
                coord={[props.userInput.numLinePosition, 0]}
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
        const newRel = reverseRel[this.props.userInput.rel];
        this.props.handleUserInput({
            ...this.props.userInput,
            rel: newRel,
        });
    };

    handleToggleStrict: () => void = () => {
        const newRel = toggleStrictRel[this.props.userInput.rel];
        this.props.handleUserInput({
            ...this.props.userInput,
            rel: newRel,
        });
    };

    _getInequalityEndpoint(props: CalculatedProps): [number, number] {
        const isGreater = _(["ge", "gt"]).contains(this.props.userInput.rel);
        const widthInPixels = 400;
        const range = props.range;
        const scale = (range[1] - range[0]) / widthInPixels;
        const buffer = horizontalPadding * scale;
        const left = range[0] - buffer;
        const right = range[1] + buffer;
        const end: [number, number] = isGreater ? [right, 0] : [left, 0];
        return end;
    }

    _renderInequality(props: CalculatedProps): React.ReactElement | null {
        if (props.isInequality) {
            const end = this._getInequalityEndpoint(props);
            const style = {
                arrows: "->",
                stroke: this.props.apiOptions.isMobile
                    ? KhanColors.GREEN
                    : KhanColors.BLUE,
                strokeWidth: 3.5,
            } as const;

            return (
                <Line
                    // We shift the line to either side of the dot so they don't
                    // intersect
                    start={[props.userInput.numLinePosition, 0]}
                    end={end}
                    style={style}
                />
            );
        }
        return null;
    }

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

    /**
     * TODO: remove this when everything is pulling from Renderer state
     * @deprecated get user input from Renderer state
     */
    getUserInput(): PerseusNumberLineUserInput {
        return this.props.userInput;
    }

    getPromptJSON(): NumberLinePromptJSON {
        return _getPromptJSON(this.props, this.getUserInput());
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState/restoreSerializedState
     */
    getSerializedState() {
        const {userInput, ...rest} = this.props;
        return {
            ...rest,
            numDivisions: userInput.numDivisions,
            numLinePosition: userInput.numLinePosition,
            // this seems like a bug, but I'm maintaining the
            // existing behavior on a deprecated API. Probably
            // should be:
            // rel: userInput.rel,
            rel: "ge",
        };
    }

    render(): React.ReactNode {
        const {strings} = this.context;
        const divisionRange = this.props.divisionRange;
        const divRangeString = divisionRange[0] + EN_DASH + divisionRange[1];
        const invalidNumDivisions =
            this.props.userInput.numDivisions < divisionRange[0] ||
            this.props.userInput.numDivisions > divisionRange[1];

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
                        ["le", "ge"].includes(this.props.userInput.rel)
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
                                : // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                                  this.props.userInput.numDivisions ||
                                  divisionRange[0]
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

function transform(editorProps: NumberLinePublicWidgetOptions): RenderProps {
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

    return {
        ...props,
        isTickCtrl: editorProps.isTickCtrl ?? undefined,
        // Use getDefaultProps value if null
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        snapDivisions: props.snapDivisions || undefined,
    };
}

function staticTransform(
    editorProps: PerseusNumberLineWidgetOptions,
): RenderProps {
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

    return {
        ...props,
        // Use getDefaultProps value if null
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        snapDivisions: props.snapDivisions || undefined,
    };
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState/restoreSerializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusNumberLineUserInput {
    return {
        numDivisions: serializedState.numDivisions,
        numLinePosition: serializedState.numLinePosition,
        // this seems like a bug, but I'm maintaining the
        // existing behavior on a deprecated API. Probably
        // should be:
        // rel: serializedState.rel,
        rel: "eq",
    };
}

function getStartNumDivisions(options: NumberLinePublicWidgetOptions) {
    const width = options.range[1] - options.range[0];

    let numDivisions;
    if (options.numDivisions != null) {
        numDivisions = options.numDivisions;
    } else if (options.tickStep != null) {
        numDivisions = width / options.tickStep;
    } else {
        numDivisions = undefined;
    }

    return numDivisions;
}

function getCorrectUserInput(
    options: PerseusNumberLineWidgetOptions,
): PerseusNumberLineUserInput {
    // The correct x is the initial position of the point
    const numLinePosition =
        options.correctX != null ? options.correctX : options.range[0];

    return {
        numDivisions: getStartNumDivisions(options),
        numLinePosition,
        rel: (options.isInequality && options.correctRel) || "eq",
    };
}

function getStartUserInput(
    options: NumberLinePublicWidgetOptions,
): PerseusNumberLineUserInput {
    const numLinePosition =
        options.initialX != null ? options.initialX : options.range[0];

    return {
        numDivisions: getStartNumDivisions(options),
        numLinePosition,
        rel: options.isInequality ? "ge" : "eq",
    };
}

export default {
    name: "number-line",
    displayName: "Number line",
    widget: NumberLine,
    transform,
    staticTransform: staticTransform,
    getCorrectUserInput,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof NumberLine>;
