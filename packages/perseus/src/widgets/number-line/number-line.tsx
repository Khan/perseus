import {number as knumber, KhanMath} from "@khanacademy/kmath";
import {useLatestRef, useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {
    forwardRef,
    useRef,
    useCallback,
    useImperativeHandle,
    useState,
} from "react";
import ReactDOM from "react-dom";

import Graphie from "../../components/graphie";
import {usePerseusI18n} from "../../components/i18n-context";
import NumberInput from "../../components/number-input";
import SimpleKeypadInput from "../../components/simple-keypad-input";
import {withDependencies} from "../../components/with-dependencies";
import InteractiveUtil from "../../interactive2/interactive-util";
import KhanColors from "../../util/colors";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/number-line/number-line-ai-utils";

import type {
    WidgetExports,
    Widget,
    WidgetProps,
    PerseusDependenciesV2,
} from "../../types";
import type {NumberLinePromptJSON} from "../../widget-ai-utils/number-line/number-line-ai-utils";
import type {
    Relationship,
    PerseusNumberLineUserInput,
    PerseusNumberLineWidgetOptions,
    NumberLinePublicWidgetOptions,
} from "@khanacademy/perseus-core";

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

    if (labelStyle === "decimal") {
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

// eslint-disable-next-line no-restricted-syntax
const TickMarks: any = (Graphie as any).createSimpleClass((graphie, props) => {
    // Avoid infinite loop
    if (!Number.isFinite(props.tickStep) || props.tickStep <= 0) {
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
        const denoms = fractions.map(getDenom);
        base = denoms.reduce((x, y) => KhanMath.getLCM(x, y));
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
        if (labelTicks || tickIsHighlighted) {
            graphie.style(textStyle, () => {
                results.push(_label(graphie, labelStyle, tick, tick, base));
            });
        }
    });

    return results;
});

/**
 * The type of the props passed to the NumberLine widget.
 */
type Props = WidgetProps<
    PerseusNumberLineWidgetOptions,
    PerseusNumberLineUserInput
> & {
    dependencies: PerseusDependenciesV2;
};

// Props with the derived `tickStep` mixed in, so render helpers have it
// precomputed.
type CalculatedProps = Props & {
    tickStep: number;
};

// Whether the widget's configuration makes a drawable number line. An invalid
// configuration would send the drawing code into an infinite loop.
function isValid(props: Props): boolean {
    const range = props.range;
    let initialX = props.userInput?.numLinePosition;
    const divisionRange = props.divisionRange;

    initialX = initialX == null ? range[0] : initialX;

    return (
        range[0] < range[1] &&
        knumber.sign(initialX - range[0]) >= 0 &&
        knumber.sign(initialX - range[1]) <= 0 &&
        divisionRange[0] < divisionRange[1] &&
        0 < props.userInput?.numDivisions &&
        0 < props.snapDivisions
    );
}

const NumberLine = forwardRef<Widget, Props>(function NumberLine(props, ref) {
    const {strings} = usePerseusI18n();
    const propsRef = useLatestRef(props);
    const [numDivisionsEmpty, setNumDivisionsEmpty] = useState(false);

    // Ref to the <Graphie> instance. Its `movables` map is populated by the
    // string `ref` on <MovablePoint> below (Graphie consumes those children
    // itself rather than rendering them into the React tree).
    const graphieRef = useRef<Graphie>(null);
    // Ref to the tick-count input (a NumberInput or SimpleKeypadInput), used
    // for focus management.
    const tickCtrlRef = useRef<NumberInput | SimpleKeypadInput>(null);

    useOnMountEffect(() => {
        props.dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "number-line",
                widgetId: props.widgetId,
            },
        });
    });

    useImperativeHandle(ref, () => ({
        focus: () => {
            if (props.isTickCtrl) {
                tickCtrlRef.current?.focus();
                return true;
            }
            return false;
        },

        focusInputPath: (path) => {
            if (path?.length === 1) {
                tickCtrlRef.current?.focus();
            }
        },

        blurInputPath: (path) => {
            if (path?.length === 1) {
                tickCtrlRef.current?.blur();
            }
        },

        getInputPaths: () => {
            if (props.isTickCtrl) {
                return [["tick-ctrl"]];
            }
            return [];
        },

        getDOMNodeForPath: (inputPath) => {
            if (inputPath?.length === 1) {
                return ReactDOM.findDOMNode(tickCtrlRef.current);
            }
            return null;
        },

        /**
         * @deprecated and likely very broken API
         * [LEMS-3185] do not trust serializedState
         */
        getSerializedState: () => ({
            alignment: props.alignment,
            static: props.static,
            range: props.range,
            labelRange: props.labelRange,
            labelStyle: props.labelStyle,
            labelTicks: props.labelTicks,
            divisionRange: props.divisionRange,
            snapDivisions: props.snapDivisions,
            isInequality: props.isInequality,
            showTooltips: props.showTooltips,
            isTickCtrl: props.isTickCtrl,
            numDivisions: props.userInput.numDivisions,
            numLinePosition: props.userInput.numLinePosition,
            // this seems like a bug, but I'm maintaining the
            // existing behavior on a deprecated API. Probably
            // should be:
            // rel: userInput.rel,
            rel: "ge",
        }),

        getPromptJSON(): NumberLinePromptJSON {
            return _getPromptJSON(props);
        },

        movePosition,
    }));

    // <Graphie> logs an error if the identity of its `setup` prop changes
    // between renders, so `setupGraphie` must stay stable. It reads the
    // latest render's props through `propsRef` instead of closing over them.
    const setupGraphie = useCallback(
        (graphie: any, options: any) => {
            const latestProps = propsRef.current;

            // Ensure a sane configuration to avoid infinite loops
            if (!isValid(latestProps)) {
                return;
            }

            // Position variables
            const widthInPixels = latestProps.apiOptions.isMobile
                ? 288 - horizontalPadding * 2
                : 400;
            const range = options.range;
            const scale = (range[1] - range[0]) / widthInPixels;
            const buffer = horizontalPadding * scale;

            // Initiate the graphie without actually drawing anything
            const left = range[0] - buffer;
            const right = range[1] + buffer;

            const hasFractionalLabels =
                latestProps.labelStyle === "improper" ||
                latestProps.labelStyle === "mixed" ||
                latestProps.labelStyle === "non-reduced";
            const bottom = hasFractionalLabels ? -1.5 : -1;
            const top = 1;

            graphie.init({
                range: [
                    [left, right],
                    [bottom, top],
                ],
                scale: [1 / scale, 40],
                isMobile: latestProps.apiOptions.isMobile,
            });

            // Draw the number line
            const center = (range[0] + range[1]) / 2;
            graphie.line([center, 0], [right, 0], {arrows: "->"});
            graphie.line([center, 0], [left, 0], {arrows: "->"});
        },
        [propsRef],
    );

    function snapNumLinePosition(
        calculatedProps: CalculatedProps,
        numLinePosition: number,
    ): number {
        const left = calculatedProps.range[0];
        const right = calculatedProps.range[1];
        const snapX = calculatedProps.tickStep / calculatedProps.snapDivisions;

        let x = bound(numLinePosition, left, right);
        x = left + knumber.roundTo(x - left, snapX);
        assert(Number.isFinite(x));
        return x;
    }

    function onNumDivisionsChange(numDivisions: number, cb?: () => void) {
        const width = props.range[1] - props.range[0];

        // Don't allow a fraction for the number of divisions
        numDivisions = Math.round(numDivisions);

        // Don't allow negative numbers for the number of divisions
        numDivisions = numDivisions < 0 ? numDivisions * -1 : numDivisions;

        // If the number of divisions isn't blank, update the number line
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (numDivisions) {
            const nextProps = {...props, tickStep: width / numDivisions};

            const newNumLinePosition = snapNumLinePosition(
                nextProps,
                props.userInput.numLinePosition,
            );

            setNumDivisionsEmpty(false);
            props.handleUserInput(
                {
                    ...props.userInput,
                    numDivisions: numDivisions,
                    numLinePosition: newNumLinePosition,
                },
                cb,
            );
        } else {
            setNumDivisionsEmpty(true);
            cb?.();
        }
    }

    function handleTickCtrlFocus() {
        props.onFocus(["tick-ctrl"]);
    }

    function handleTickCtrlBlur() {
        props.onBlur(["tick-ctrl"]);
    }

    // Moves the point to the given position and records the interaction.
    function movePosition(targetPosition: number) {
        props.handleUserInput({
            ...props.userInput,
            numLinePosition: targetPosition,
        });
        props.trackInteraction();
    }

    function handleReverse() {
        const newRel = reverseRel[props.userInput.rel];
        props.handleUserInput({
            ...props.userInput,
            rel: newRel,
        });
    }

    function handleToggleStrict() {
        const newRel = toggleStrictRel[props.userInput.rel];
        props.handleUserInput({
            ...props.userInput,
            rel: newRel,
        });
    }

    function renderNumberLinePoint(calculatedProps: CalculatedProps) {
        const isOpen = ["lt", "gt"].includes(calculatedProps.userInput.rel);

        // In static mode the point's fill and stroke is blue to signify that
        // it can't be interacted with.
        let fill;
        if (isOpen) {
            fill = KhanColors._BACKGROUND;
        } else if (calculatedProps.static) {
            fill = KhanColors.BLUE;
        } else {
            fill = KhanColors.GREEN;
        }
        const normalStyle = {
            fill: fill,
            stroke: calculatedProps.static ? KhanColors.BLUE : KhanColors.GREEN,
            "stroke-width": isOpen ? 3 : 1,
        } as const;
        const highlightStyle = {
            fill: isOpen ? KhanColors._BACKGROUND : KhanColors.GREEN,
            "stroke-width": isOpen ? 3 : 1,
        } as const;

        const mobileDotStyle = calculatedProps.isInequality
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
                coord={[calculatedProps.userInput.numLinePosition, 0]}
                constraints={[
                    (coord: any, prevCoord) => {
                        // constrain-y
                        return [coord[0], prevCoord[1]];
                    },
                    (coord: any, prevCoord) => {
                        // snap X
                        const x = snapNumLinePosition(
                            calculatedProps,
                            coord[0],
                        );
                        return [x, coord[1]];
                    },
                ]}
                normalStyle={normalStyle}
                highlightStyle={highlightStyle}
                onMove={(coord) => {
                    movePosition(coord[0]);
                }}
                isMobile={calculatedProps.apiOptions.isMobile}
                mobileStyleOverride={mobileDotStyle}
                showTooltips={calculatedProps.showTooltips ?? false}
                xOnlyTooltip={true}
            />
        );
    }

    function getInequalityEndpoint(): [number, number] {
        const isGreater = ["ge", "gt"].includes(props.userInput.rel);
        const widthInPixels = 400;
        const range = props.range;
        const scale = (range[1] - range[0]) / widthInPixels;
        const buffer = horizontalPadding * scale;
        const left = range[0] - buffer;
        const right = range[1] + buffer;
        const end: [number, number] = isGreater ? [right, 0] : [left, 0];
        return end;
    }

    function renderInequality() {
        if (props.isInequality) {
            const end = getInequalityEndpoint();
            const style = {
                arrows: "->",
                stroke: props.apiOptions.isMobile
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

    function renderGraphie() {
        // Position variables
        const range = props.range;
        const width = range[1] - range[0];

        const options = {
            range: props.range,
            isTickCtrl: props.isTickCtrl,
        };

        const calculatedProps: CalculatedProps = {
            ...props,
            tickStep: width / props.userInput.numDivisions,
        };

        return (
            <Graphie
                ref={graphieRef}
                // HACK(emily): We key this graphie on the label style because
                // when the label style changes we want to resize the graphie,
                // which isn't doable without throwing away the graphie and
                // making a new one.
                key={props.labelStyle}
                box={[props.apiOptions.isMobile ? 288 : 460, 80]}
                options={options}
                onMouseDown={(coord) => {
                    // `grab` isn't declared on the Movable type; the movable
                    // is populated via the string ref on <MovablePoint>
                    // below, and MovablePoint exposes `grab` at runtime.
                    // eslint-disable-next-line no-restricted-syntax
                    const point = graphieRef.current?.movables
                        .numberLinePoint as any;
                    point?.grab(coord);
                }}
                setup={setupGraphie}
                isMobile={props.apiOptions.isMobile}
            >
                <TickMarks
                    range={calculatedProps.range}
                    labelTicks={calculatedProps.labelTicks}
                    labelStyle={calculatedProps.labelStyle}
                    labelRange={calculatedProps.labelRange}
                    tickStep={calculatedProps.tickStep}
                    numDivisions={calculatedProps.userInput.numDivisions}
                    isMobile={calculatedProps.apiOptions.isMobile}
                />
                {renderInequality()}
                {renderNumberLinePoint(calculatedProps)}
            </Graphie>
        );
    }

    const divisionRange = props.divisionRange;
    const divRangeString = divisionRange[0] + EN_DASH + divisionRange[1];

    const invalidNumDivisions =
        props.userInput?.numDivisions < divisionRange[0] ||
        props.userInput?.numDivisions > divisionRange[1];

    const inequalityControls = (
        <div>
            <input
                type="button"
                className="simple-button"
                value={strings.switchDirection}
                onClick={handleReverse}
            />
            <input
                type="button"
                className="simple-button"
                value={
                    ["le", "ge"].includes(props.userInput?.rel)
                        ? strings.circleOpen
                        : strings.circleFilled
                }
                onClick={handleToggleStrict}
            />
        </div>
    );

    let tickCtrl;
    if (props.isTickCtrl) {
        const Input = props.apiOptions.customKeypad
            ? SimpleKeypadInput
            : NumberInput;
        tickCtrl = (
            <label>
                {strings.numDivisions}{" "}
                <Input
                    ref={tickCtrlRef}
                    value={
                        numDivisionsEmpty
                            ? null
                            : // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                              props.userInput?.numDivisions || divisionRange[0]
                    }
                    checkValidity={(val) =>
                        val >= divisionRange[0] && val <= divisionRange[1]
                    }
                    onChange={onNumDivisionsChange}
                    onFocus={handleTickCtrlFocus}
                    onBlur={handleTickCtrlBlur}
                    useArrowKeys={true}
                    keypadElement={props.keypadElement}
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
            {!isValid(props) ? (
                <div className="perseus-error">
                    Invalid number line configuration.
                </div>
            ) : props.isTickCtrl && invalidNumDivisions ? (
                <div className="perseus-error">
                    {strings.divisions({divRangeString: divRangeString})}
                </div>
            ) : (
                renderGraphie()
            )}
            {!props.static && props.isInequality && inequalityControls}
        </div>
    );
});

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
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

const WrappedNumberLine = withDependencies(NumberLine);

export default {
    name: "number-line",
    displayName: "Number line",
    widget: WrappedNumberLine,
    getCorrectUserInput,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof WrappedNumberLine>;
