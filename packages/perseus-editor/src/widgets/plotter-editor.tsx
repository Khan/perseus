/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/no-unsafe */
import {number as knumber} from "@khanacademy/kmath";
import {components, PlotterWidget, Util, withAPIOptions} from "@khanacademy/perseus";
import {plotterLogic, plotterPlotTypes} from "@khanacademy/perseus-core";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import BlurInput from "../components/blur-input";

import type {APIOptions} from "@khanacademy/perseus";
import type {
    PerseusPlotterWidgetOptions,
    PlotterDefaultWidgetOptions,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const {InfoTip, NumberInput, RangeInput, TextListEditor} = components;
const Plotter = PlotterWidget.widget;

const STARTING = "starting";
const CORRECT = "correct";

const editingStates = [STARTING, CORRECT];
type EditingState = (typeof editingStates)[number];

// Return a copy of array with length n, padded with given value
function padArray(array: any, n, value: any) {
    const copy = _.clone(array);
    copy.length = n;
    for (let i = array.length; i < n; i++) {
        copy[i] = value;
    }
    return copy;
}

const editorDefaults = {
    scaleY: 1,
    maxY: 10,
    snapsPerLine: 2,
} as const;

type WithAPIOptionsProps = {
    apiOptions: APIOptions;
}

type Props = WithAPIOptionsProps & {
    type: PerseusPlotterWidgetOptions["type"];
    labels: Array<string>;
    categories: ReadonlyArray<string | number>;
    scaleY: number;
    maxY: number;
    snapsPerLine: number;
    picSize: number;
    picBoxHeight: number;
    picUrl: string;
    plotDimensions: ReadonlyArray<number>;
    labelInterval: number;
    starting: ReadonlyArray<number>;
    correct: ReadonlyArray<number>;
    static: boolean;
    onChange: any;
};

type State = {
    editing: EditingState;
    pic: any;
    loadedUrl: string | null;
    minX: number | null;
    maxX: number | null;
    tickStep: number | null;
};

const formatNumber = (num) => "$" + knumber.round(num, 2) + "$";

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a plotter widget that allows users to create and customize data visualizations.
 */
class PlotterEditorClass extends React.Component<Props, State> {
    static widgetName = "plotter" as const;

    static defaultProps: PlotterDefaultWidgetOptions =
        plotterLogic.defaultWidgetOptions;

    state: State = {
        editing: this.props.static ? STARTING : CORRECT,
        pic: null,
        loadedUrl: null,
        minX: null,
        maxX: null,
        tickStep: null,
    };

    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount() {
        this.fetchPic(this.props.picUrl);
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        this.fetchPic(nextProps.picUrl);

        if (nextProps.static) {
            this.setState({
                editing: "starting",
            });
        }
    }

    fetchPic: (arg1: string) => any = (url) => {
        if (this.state.loadedUrl !== url) {
            const pic = new Image();
            pic.src = url;
            pic.onload = () => {
                this.setState({
                    pic: pic,
                    loadedUrl: url,
                });
            };
        }
    };

    handleChangeTickStep: (arg1: number) => void = (value) => {
        this.setState({
            tickStep: value,
        });
    };

    handleChangeRange: (arg1: [number, number]) => void = (newValue) => {
        this.setState({
            minX: newValue[0],
            maxX: newValue[1],
        });
    };

    changeLabelInterval: (arg1: number) => void = (value) => {
        this.props.onChange({
            labelInterval: value,
        });
    };

    handlePlotterChange: (arg1: any) => void = (newProps) => {
        const props: Record<string, any> = {};
        props[this.state.editing] = newProps.values;
        this.props.onChange(props);
    };

    changeType: (arg1: any) => void = (type) => {
        let categories;
        if (type === "histogram") {
            // Switching to histogram, add a label (0) to the left
            // @ts-expect-error - TS2769
            categories = [formatNumber(0)].concat(this.props.categories);
            this.props.onChange({type: type, categories: categories});
        } else if (this.props.type === "histogram") {
            // Switching from histogram, remove a label from the left
            categories = this.props.categories.slice(1);
            this.props.onChange({type: type, categories: categories});
        } else {
            this.props.onChange({type: type});
        }

        if (categories) {
            // eslint-disable-next-line react/no-string-refs
            const node = ReactDOM.findDOMNode(this.refs.categories);
            // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'value' does not exist on type 'Element | Text'.
            node.value = categories.join(", ");
        }
    };

    changeLabel: (arg1: number, arg2: any) => void = (i, e) => {
        const labels = _.clone(this.props.labels);
        labels[i] = e.target.value;
        this.props.onChange({labels: labels});
    };

    changePicUrl: (arg1: string) => void = (value) => {
        // We don't need the labels and other data in the plotter, so just
        // extract the raw image and use that.
        // TODO(emily): Maybe indicate that such a change has happened?
        const url = Util.getRealImageUrl(value);

        this.props.onChange({picUrl: url});
    };

    changeCategories: (arg1: any) => void = (categories) => {
        let n = categories.length;
        if (this.props.type === "histogram") {
            // Histograms with n labels/categories have n - 1 buckets
            n--;
        }
        const value = this.props.scaleY;

        this.props.onChange({
            categories: categories,
            correct: padArray(this.props.correct, n, value),
            starting: padArray(this.props.starting, n, value),
        });
    };

    changeScale: (arg1: any) => void = (e) => {
        const oldScale = this.props.scaleY;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const newScale = +e.target.value || editorDefaults.scaleY;

        const scale = function (value: any) {
            return (value * newScale) / oldScale;
        };

        const maxY = scale(this.props.maxY);

        this.props.onChange({
            scaleY: newScale,
            maxY: maxY,
            correct: _.map(this.props.correct, scale),
            starting: _.map(this.props.starting, scale),
        });

        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'value' does not exist on type 'Element | Text'.
        ReactDOM.findDOMNode(this.refs.maxY).value = maxY; // eslint-disable-line react/no-string-refs
    };

    changeMax: (arg1: any) => void = (e) => {
        this.props.onChange({
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            maxY: +e.target.value || editorDefaults.maxY,
        });
    };

    changeSnaps: (arg1: any) => void = (e) => {
        this.props.onChange({
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            snapsPerLine: +e.target.value || editorDefaults.snapsPerLine,
        });
    };

    changeEditing: (arg1: EditingState) => void = (editing) => {
        this.setState({editing: editing});
    };

    setCategoriesFromScale: () => void = () => {
        const scale = this.state.tickStep || 1;
        const min = this.state.minX || 0;
        const max = this.state.maxX || 0;
        const length = Math.floor((max - min) / scale) * scale;

        let categories;
        if (this.props.type === "histogram" || this.props.type === "dotplot") {
            // Ranges for histogram and dotplot labels should start at zero
            categories = _.range(0, length + scale, scale);
        } else {
            categories = _.range(scale, length + scale, scale);
        }

        categories = _.map(categories, (num) => num + min);
        categories = _.map(categories, formatNumber);

        this.changeCategories(categories);

        // eslint-disable-next-line react/no-string-refs
        const node = ReactDOM.findDOMNode(this.refs.categories);

        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'value' does not exist on type 'Element | Text'.
        node.value = categories.join(", ");
    };

    serialize: () => any = () => {
        const json = _.pick(
            this.props,
            "correct",
            "starting",
            "type",
            "labels",
            "categories",
            "scaleY",
            "maxY",
            "snapsPerLine",
            "labelInterval",
        );

        if (this.props.type === "pic") {
            // @ts-expect-error - TS2339 - Property 'picUrl' does not exist on type 'Pick<Readonly<any> & Readonly<{ children?: ReactNode; }>, "type" | "correct" | "labels" | "categories" | "starting" | "scaleY" | "maxY" | "snapsPerLine" | "labelInterval">'.
            json.picUrl = this.props.picUrl;
        }

        return json;
    };

    render(): React.ReactNode {
        const setFromScale = _.contains(
            ["line", "histogram", "dotplot"],
            this.props.type,
        );
        const canChangeSnaps = !_.contains(["pic", "dotplot"], this.props.type);
        const plotterProps: any = {
            ...this.props,
            trackInteraction: () => {},
            starting: this.props[this.state.editing],
            onChange: this.handlePlotterChange,
            userInput: this.props.correct,
            handleUserInput: (userInput) => {
                this.props.onChange({correct: userInput});
            },
        };

        return (
            <div className="perseus-widget-plotter-editor">
                <div>
                    Chart type:{" "}
                    {plotterPlotTypes.map((type) => {
                        return (
                            <label key={type}>
                                <input
                                    type="radio"
                                    name="chart-type"
                                    checked={this.props.type === type}
                                    onChange={_.partial(this.changeType, type)}
                                />
                                {type}
                            </label>
                        );
                    }, this)}
                </div>
                <div>
                    Labels:{" "}
                    {["x", "y"].map((axis, i) => {
                        return (
                            <label key={axis}>
                                {axis + ":"}
                                <input
                                    type="text"
                                    onChange={_.partial(this.changeLabel, i)}
                                    defaultValue={this.props.labels[i]}
                                />
                            </label>
                        );
                    }, this)}
                </div>

                {setFromScale && (
                    <div className="set-from-scale-box">
                        <span className="categories-title">
                            Set Categories From Scale
                        </span>
                        <div>
                            <label>
                                Tick Step:{" "}
                                <NumberInput
                                    placeholder={1}
                                    useArrowKeys={true}
                                    value={this.state.tickStep}
                                    onChange={this.handleChangeTickStep}
                                />
                            </label>
                            <InfoTip>
                                <p>The difference between adjacent ticks.</p>
                            </InfoTip>
                        </div>
                        <div>
                            <label>
                                Range:{" "}
                                <RangeInput
                                    placeholder={[0, 10]}
                                    useArrowKeys={true}
                                    value={[this.state.minX, this.state.maxX]}
                                    onChange={this.handleChangeRange}
                                />
                            </label>
                        </div>
                        <div>
                            <button onClick={this.setCategoriesFromScale}>
                                Set Categories{" "}
                            </button>
                        </div>
                    </div>
                )}
                <div>
                    <label>
                        Label Interval:{" "}
                        <NumberInput
                            useArrowKeys={true}
                            value={this.props.labelInterval}
                            onChange={this.changeLabelInterval}
                        />
                    </label>
                    <InfoTip>
                        <p>
                            Which ticks to display the labels for. For instance,
                            setting this to &quot;4&quot; will only show every
                            4th label (plus the last one)
                        </p>
                    </InfoTip>
                </div>
                {this.props.type === "pic" && (
                    <div>
                        <label>
                            Picture:{" "}
                            <BlurInput
                                className="pic-url"
                                value={this.props.picUrl}
                                onChange={this.changePicUrl}
                            />
                            <InfoTip>
                                <p>
                                    Use the default picture of Earth, or insert
                                    the URL for a different picture using the
                                    &quot;Add image&quot; function.
                                </p>
                            </InfoTip>
                        </label>
                        {this.state.pic &&
                            this.state.pic.width !== this.state.pic.height && (
                                <p className="warning">
                                    <b>Warning</b>: You are using a picture
                                    which is not square. This means the image
                                    will get distorted. You should probably crop
                                    it to be square.
                                </p>
                            )}
                    </div>
                )}
                <div>
                    <label>
                        Categories:{" "}
                        <TextListEditor
                            // eslint-disable-next-line react/no-string-refs
                            ref="categories"
                            layout="horizontal"
                            options={this.props.categories}
                            onChange={this.changeCategories}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Scale (y):{" "}
                        <input
                            type="text"
                            onChange={this.changeScale}
                            defaultValue={this.props.scaleY}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Max y:{" "}
                        <input
                            type="text"
                            // eslint-disable-next-line react/no-string-refs
                            ref="maxY"
                            onChange={this.changeMax}
                            defaultValue={this.props.maxY}
                        />
                    </label>
                </div>
                {canChangeSnaps && (
                    <div>
                        <label>
                            Snaps per line:{" "}
                            <input
                                type="text"
                                onChange={this.changeSnaps}
                                defaultValue={this.props.snapsPerLine}
                            />
                        </label>
                        <InfoTip>
                            <p>
                                Creates the specified number of divisions
                                between the horizontal lines. Fewer snaps
                                between lines makes the graph easier for the
                                student to create correctly.
                            </p>
                        </InfoTip>
                    </div>
                )}
                <div>
                    Editing values:{" "}
                    {editingStates.map((editing) => (
                        <label key={editing}>
                            <input
                                type="radio"
                                disabled={
                                    editing === CORRECT && this.props.static
                                }
                                checked={
                                    this.props.static
                                        ? editing === STARTING
                                        : this.state.editing === editing
                                }
                                onChange={(e) => this.changeEditing(editing)}
                            />
                            {editing}
                        </label>
                    ))}
                    <InfoTip>
                        <p>
                            Use this toggle to switch between editing the
                            correct answer (what the student will be graded on)
                            and the starting values (what the student will see
                            plotted when they start the problem). Note: These
                            cannot be the same.
                        </p>
                        <p>
                            In static mode, the starting values are rendered out
                            to the displayed widget.
                        </p>
                    </InfoTip>
                </div>
                <Plotter {...(plotterProps as PropsFor<typeof Plotter>)} />
            </div>
        );
    }
}

const PlotterEditor = withAPIOptions(PlotterEditorClass);
export default PlotterEditor;
