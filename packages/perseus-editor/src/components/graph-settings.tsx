/* eslint-disable react/forbid-prop-types, react/no-unsafe */
/**
 * Used in the editors for the Grapher and Interaction widgets.
 */
import {KhanMath} from "@khanacademy/kmath";
import {
    components,
    interactiveSizes,
    Changeable,
    Dependencies,
    Util,
} from "@khanacademy/perseus";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import * as React from "react";
import _ from "underscore";

import type {Coords, MarkingsType} from "@khanacademy/perseus-core";

const {ButtonGroup, InfoTip, RangeInput} = components;

const defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0,
} as const;

function numSteps(range: any, step: any) {
    return Math.floor((range[1] - range[0]) / step);
}
type Props = {
    editableSettings: ReadonlyArray<
        "canvas" | "graph" | "snap" | "image" | "measure"
    >;
    box: readonly number[];
    labels: readonly string[];
    range: Coords;
    step: [number, number];
    gridStep: [number, number];
    snapStep: [number, number];
    valid: boolean;
    backgroundImage: any;
    markings: MarkingsType;
    showProtractor?: boolean;
    showRuler?: boolean;
    showTooltips?: boolean;
    rulerLabel: string;
    rulerTicks: number;
} & Changeable.ChangeableProps;

type DefaultProps = {
    editableSettings: Props["editableSettings"];
    box: Props["box"];
    labels: Props["labels"];
    range: Props["range"];
    step: Props["step"];
    gridStep: Props["gridStep"];
    snapStep: Props["snapStep"];
    valid: Props["valid"];
    backgroundImage: Props["backgroundImage"];
    markings: Props["markings"];
    rulerLabel: Props["rulerLabel"];
    rulerTicks: Props["rulerTicks"];
    showProtractor?: Props["showProtractor"];
    showRuler?: Props["showRuler"];
    showTooltips?: Props["showTooltips"];
};

type State = {
    labelsTextbox: string[];
    gridStepTextbox: number[];
    snapStepTextbox: number[];
    stepTextbox: number[];
    rangeTextbox: any[];
    backgroundImage: any;
};

class GraphSettings extends React.Component<Props, State> {
    static displayName: "GraphSettings";

    static defaultProps: DefaultProps = {
        editableSettings: ["graph", "snap", "image", "measure"],
        box: [
            interactiveSizes.defaultBoxSizeSmall,
            interactiveSizes.defaultBoxSizeSmall,
        ],
        labels: ["x", "y"],
        range: [
            [-10, 10],
            [-10, 10],
        ],
        step: [1, 1],
        gridStep: [1, 1],
        snapStep: [1, 1],
        valid: true,
        backgroundImage: defaultBackgroundImage,
        markings: "graph",
        rulerLabel: "",
        rulerTicks: 10,
        showProtractor: false,
        showRuler: false,
        showTooltips: false,
    };

    _isMounted = false;

    bgUrlRef = React.createRef<HTMLInputElement>();
    labelsXRef = React.createRef<HTMLInputElement>();
    labelsYRef = React.createRef<HTMLInputElement>();

    constructor(props) {
        super(props);
        this.state = this.getInitialState();

        this.change = this.change.bind(this);
        this.changeBackgroundUrl = this.changeBackgroundUrl.bind(this);
        this.changeGraph = this.changeGraph.bind(this);
        this.changeGridStep = this.changeGridStep.bind(this);
        this.changeLabel = this.changeLabel.bind(this);
        this.changeRange = this.changeRange.bind(this);
        this.changeRulerLabel = this.changeRulerLabel.bind(this);
        this.changeRulerTicks = this.changeRulerTicks.bind(this);
        this.changeSnapStep = this.changeSnapStep.bind(this);
        this.changeStep = this.changeStep.bind(this);
    }

    getInitialState() {
        return this.stateFromProps(this.props);
    }

    componentDidMount() {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;

        this.changeGraph = _.debounce(this.changeGraph, 300);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (
            !_.isEqual(this.props.labels, nextProps.labels) ||
            !_.isEqual(this.props.gridStep, nextProps.gridStep) ||
            !_.isEqual(this.props.snapStep, nextProps.snapStep) ||
            !_.isEqual(this.props.step, nextProps.step) ||
            !_.isEqual(this.props.range, nextProps.range) ||
            !_.isEqual(this.props.backgroundImage, nextProps.backgroundImage)
        ) {
            this.setState(this.stateFromProps(nextProps));
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    stateFromProps(props) {
        return {
            labelsTextbox: props.labels,
            gridStepTextbox: props.gridStep,
            snapStepTextbox: props.snapStep,
            stepTextbox: props.step,
            rangeTextbox: props.range,
            backgroundImage: _.clone(props.backgroundImage),
        };
    }

    // TODO(benchristel): Refactor this component to be an ES6 class, so we can
    // type change as ChangeFn.
    change(...args) {
        // TODO(LEMS-2656): remove TS suppression
        // @ts-expect-error: Argument of type 'any[]' is not assignable to parameter of type '[newPropsOrSinglePropName: string | { [key: string]: any; }, propValue?: any, callback?: (() => unknown) | undefined]'. Target requires 1 element(s) but source may have fewer.
        return Changeable.change.apply(this, args);
    }

    // TODO(aria): Make either a wrapper for standard events to work
    // with this.change, or make these use some TextInput/NumberInput box
    changeRulerLabel(e) {
        this.change({rulerLabel: e.target.value});
    }

    changeRulerTicks(e) {
        this.change({rulerTicks: +e.target.value});
    }

    changeBackgroundUrl(e) {
        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.key !== "Enter") {
            return;
        }

        const setUrl = (url, width: number, height: number) => {
            const image = _.clone(this.props.backgroundImage);
            image.url = url;
            image.width = width;
            image.height = height;
            this.setState(
                {
                    backgroundImage: image,
                },
                this.changeGraph,
            );
        };

        const url = this.bgUrlRef.current?.value;
        if (url) {
            Util.getImageSize(url, (width, height) => {
                if (this._isMounted) {
                    setUrl(url, width, height);
                }
            });
        } else {
            setUrl(null, 0, 0);
        }
    }

    renderLabelChoices(choices) {
        return _.map(choices, function ([name, value]) {
            return (
                <option key={value} value={value}>
                    {name}
                </option>
            );
        });
    }

    validRange(range) {
        const numbers = _.every(range, function (num) {
            return _.isFinite(num);
        });
        if (!numbers) {
            return "Range must be a valid number";
        }
        if (range[0] >= range[1]) {
            return "Range must have a higher number on the right";
        }
        return true;
    }

    validateStepValue(settings) {
        const {step, range, name, minTicks, maxTicks} = settings;

        if (!_.isFinite(step)) {
            return name + " must be a valid number";
        }
        const nSteps = numSteps(range, step);
        if (nSteps < minTicks) {
            return (
                name +
                " is too large, there must be at least " +
                minTicks +
                " ticks."
            );
        }
        if (nSteps > maxTicks) {
            return (
                name +
                " is too small, there can be at most " +
                maxTicks +
                " ticks."
            );
        }
        return true;
    }

    validSnapStep(step, range) {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Snap step",
            minTicks: 5,
            maxTicks: 60,
        });
    }

    validGridStep(step, range) {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Grid step",
            minTicks: 3,
            maxTicks: 60,
        });
    }

    validStep(step, range) {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Step",
            minTicks: 3,
            maxTicks: 20,
        });
    }

    validBackgroundImageSize(image) {
        // Ignore empty images
        if (!image.url) {
            return true;
        }

        const validSize = image.width <= 450 && image.height <= 450;

        if (!validSize) {
            return "Image must be smaller than 450px x 450px.";
        }
        return true;
    }

    validateGraphSettings(range, step, gridStep, snapStep, image) {
        const self = this;
        let msg;
        const goodRange = _.every(range, function (range) {
            msg = self.validRange(range);
            return msg === true;
        });
        if (!goodRange) {
            return msg;
        }
        const goodStep = _.every(step, function (step, i) {
            msg = self.validStep(step, range[i]);
            return msg === true;
        });
        if (!goodStep) {
            return msg;
        }
        const goodGridStep = _.every(gridStep, function (gridStep, i) {
            msg = self.validGridStep(gridStep, range[i]);
            return msg === true;
        });
        if (!goodGridStep) {
            return msg;
        }
        const goodSnapStep = _.every(snapStep, function (snapStep, i) {
            msg = self.validSnapStep(snapStep, range[i]);
            return msg === true;
        });
        if (!goodSnapStep) {
            return msg;
        }
        const goodImageSize = this.validBackgroundImageSize(image);
        if (goodImageSize !== true) {
            msg = goodImageSize;
            return msg;
        }
        return true;
    }

    changeLabel(i, e) {
        const val = e.target.value;
        const labels = this.state.labelsTextbox.slice();
        labels[i] = val;
        this.setState({labelsTextbox: labels}, this.changeGraph);
    }

    changeRange(i, values) {
        const ranges = this.state.rangeTextbox.slice();
        ranges[i] = values;
        const step = this.state.stepTextbox.slice();
        const gridStep = this.state.gridStepTextbox.slice();
        const snapStep = this.state.snapStepTextbox.slice();
        const scale = Util.scaleFromExtent(ranges[i], this.props.box[i]);
        if (this.validRange(ranges[i]) === true) {
            step[i] = Util.tickStepFromExtent(ranges[i], this.props.box[i]);
            // Need to use the cast to number since gridStepFromTickStep
            // can return null or undefined. Ideally in the future let's adjust
            // the code to take this into account.
            gridStep[i] = Util.gridStepFromTickStep(step[i], scale) as number;
            snapStep[i] = gridStep[i] / 2;
        }
        this.setState(
            {
                stepTextbox: step,
                gridStepTextbox: gridStep,
                snapStepTextbox: snapStep,
                rangeTextbox: ranges,
            },
            this.changeGraph,
        );
    }

    changeStep(step) {
        this.setState({stepTextbox: step}, this.changeGraph);
    }

    changeSnapStep(snapStep) {
        this.setState({snapStepTextbox: snapStep}, this.changeGraph);
    }

    changeGridStep(gridStep) {
        this.setState(
            {
                gridStepTextbox: gridStep,
                snapStepTextbox: _.map(gridStep, function (step) {
                    return step / 2;
                }),
            },
            this.changeGraph,
        );
    }

    changeGraph() {
        const labels = this.state.labelsTextbox;
        const range = _.map(this.state.rangeTextbox, function (range) {
            return _.map(range, Number);
        });
        const step = _.map(this.state.stepTextbox, Number);
        const gridStep = this.state.gridStepTextbox;
        const snapStep = this.state.snapStepTextbox;
        const image = this.state.backgroundImage;

        // validationResult is either:
        //   true -> the settings are valid
        //   a string -> the settings are invalid, and the explanation
        //               is contained in the string
        // TODO(aria): Refactor this to not be confusing
        const validationResult = this.validateGraphSettings(
            range,
            step,
            gridStep,
            snapStep,
            image,
        );

        if (validationResult === true) {
            // either true or a string
            this.change({
                valid: true,
                labels: labels,
                range: range,
                step: step,
                gridStep: gridStep,
                snapStep: snapStep,
                backgroundImage: image,
            });
        } else {
            this.change({
                valid: validationResult, // a string message, not false
            });
        }
    }

    render() {
        const scale = [
            KhanMath.roundTo(
                2,
                Util.scaleFromExtent(this.props.range[0], this.props.box[0]),
            ),
            KhanMath.roundTo(
                2,
                Util.scaleFromExtent(this.props.range[1], this.props.box[1]),
            ),
        ];

        const {TeX} = Dependencies.getDependencies();
        return (
            <div>
                {_.contains(this.props.editableSettings, "canvas") && (
                    <div className="graph-settings">
                        <div className="perseus-widget-row">
                            <label htmlFor="canvas-size">
                                Canvas size (x,y pixels)
                            </label>
                            <RangeInput
                                id="canvas-size"
                                value={this.props.box}
                                onChange={(box) => {
                                    this.change({box: box});
                                }}
                            />
                        </div>
                        <div className="perseus-widget-row">
                            Scale (px per div):{" "}
                            <TeX>{"(" + scale[0] + ", " + scale[1] + ")"}</TeX>
                        </div>
                    </div>
                )}

                {_.contains(this.props.editableSettings, "graph") && (
                    <div className="graph-settings">
                        <div className="perseus-widget-row">
                            <div className="perseus-widget-left-col">
                                <label htmlFor="labels-x">x Label</label>
                                <input
                                    id="labels-x"
                                    type="text"
                                    className="graph-settings-axis-label"
                                    ref={this.labelsXRef}
                                    onChange={(e) => this.changeLabel(0, e)}
                                    value={this.state.labelsTextbox[0] || ""}
                                />
                            </div>
                            <div className="perseus-widget-right-col">
                                <label htmlFor="labels-y">y Label</label>
                                <input
                                    id="labels-y"
                                    type="text"
                                    className="graph-settings-axis-label"
                                    ref={this.labelsYRef}
                                    onChange={(e) => this.changeLabel(1, e)}
                                    value={this.state.labelsTextbox[1] || ""}
                                />
                            </div>
                        </div>

                        <div className="perseus-widget-row">
                            <div className="perseus-widget-left-col">
                                <label htmlFor="range-x">x Range</label>
                                <RangeInput
                                    id="range-x"
                                    value={this.state.rangeTextbox[0]}
                                    onChange={(vals) =>
                                        this.changeRange(0, vals)
                                    }
                                />
                            </div>
                            <div className="perseus-widget-right-col">
                                <label htmlFor="range-y">y Range</label>
                                <RangeInput
                                    id="range-y"
                                    value={this.state.rangeTextbox[1]}
                                    onChange={(vals) =>
                                        this.changeRange(1, vals)
                                    }
                                />
                            </div>
                        </div>
                        <div className="perseus-widget-row">
                            <div className="perseus-widget-left-col">
                                <label htmlFor="tick-step">Tick Step</label>
                                <RangeInput
                                    id="tick-step"
                                    value={this.state.stepTextbox}
                                    onChange={this.changeStep}
                                />
                            </div>
                            <div className="perseus-widget-right-col">
                                <label htmlFor="grid-step">Grid Step</label>
                                <RangeInput
                                    id="grid-step"
                                    value={this.state.gridStepTextbox}
                                    onChange={this.changeGridStep}
                                />
                            </div>
                        </div>
                        {_.contains(this.props.editableSettings, "snap") && (
                            <div className="perseus-widget-row">
                                <div className="perseus-widget-left-col">
                                    <label htmlFor="snap-step">Snap Step</label>
                                    <RangeInput
                                        id="snap-step"
                                        value={this.state.snapStepTextbox}
                                        onChange={this.changeSnapStep}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="perseus-widget-row">
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- TODO(LEMS-2871): Address a11y error */}
                            <label>Markings: </label>
                            <ButtonGroup
                                value={this.props.markings}
                                allowEmpty={false}
                                buttons={[
                                    {value: "graph", content: "Graph"},
                                    {value: "grid", content: "Grid"},
                                    {value: "none", content: "None"},
                                ]}
                                onChange={this.change("markings")}
                            />
                        </div>
                        <div className="perseus-widget-left-col">
                            <Checkbox
                                label="Show tooltips"
                                checked={this.props.showTooltips}
                                onChange={(value) => {
                                    this.change({showTooltips: value});
                                }}
                            />
                        </div>
                    </div>
                )}

                {_.contains(this.props.editableSettings, "image") && (
                    <div className="image-settings">
                        <div>Background image:</div>
                        <div>
                            <label htmlFor="bg-url">Url:</label>
                            <input
                                id="bg-url"
                                type="text"
                                className="graph-settings-background-url"
                                ref={this.bgUrlRef}
                                value={this.state.backgroundImage.url || ""}
                                onChange={(e) => {
                                    const image = _.clone(
                                        this.props.backgroundImage,
                                    );
                                    image.url = e.target.value;
                                    this.setState({backgroundImage: image});
                                }}
                                onKeyPress={this.changeBackgroundUrl}
                                onBlur={this.changeBackgroundUrl}
                            />
                            <InfoTip>
                                <p>
                                    Create an image in graphie, or use the
                                    &quot;Add image&quot; function to create a
                                    background.
                                </p>
                            </InfoTip>
                        </div>
                    </div>
                )}

                {_.contains(this.props.editableSettings, "measure") && (
                    <div className="misc-settings">
                        <div className="perseus-widget-row">
                            <div className="perseus-widget-left-col">
                                <Checkbox
                                    label="Show ruler"
                                    checked={this.props.showRuler}
                                    onChange={(value) => {
                                        this.change({showRuler: value});
                                    }}
                                />
                            </div>
                            <div className="perseus-widget-right-col">
                                <Checkbox
                                    label="Show protractor"
                                    checked={this.props.showProtractor}
                                    onChange={(value) => {
                                        this.change({showProtractor: value});
                                    }}
                                />
                            </div>
                        </div>
                        {this.props.showRuler && (
                            <div>
                                <div>
                                    <label>
                                        {" "}
                                        Ruler label:{" "}
                                        <select
                                            onChange={this.changeRulerLabel}
                                            value={this.props.rulerLabel}
                                        >
                                            <option value="">None</option>
                                            <optgroup label="Metric">
                                                {this.renderLabelChoices([
                                                    ["milimeters", "mm"],
                                                    ["centimeters", "cm"],
                                                    ["meters", "m"],
                                                    ["kilometers", "km"],
                                                ])}
                                            </optgroup>
                                            <optgroup label="Imperial">
                                                {this.renderLabelChoices([
                                                    ["inches", "in"],
                                                    ["feet", "ft"],
                                                    ["yards", "yd"],
                                                    ["miles", "mi"],
                                                ])}
                                            </optgroup>
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        {" "}
                                        Ruler ticks:{" "}
                                        <select
                                            onChange={this.changeRulerTicks}
                                            value={this.props.rulerTicks}
                                        >
                                            {_.map(
                                                [1, 2, 4, 8, 10, 16],
                                                function (n) {
                                                    return (
                                                        <option
                                                            key={n}
                                                            value={n}
                                                        >
                                                            {n}
                                                        </option>
                                                    );
                                                },
                                            )}
                                        </select>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default GraphSettings;
