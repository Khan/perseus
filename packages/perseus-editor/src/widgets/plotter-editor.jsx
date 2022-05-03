/* eslint-disable @babel/no-invalid-this, one-var, react/no-unsafe, react/sort-comp */
// @flow
import {number as knumber} from "@khanacademy/kmath";
import {
    components,
    Dependencies,
    PlotterWidget,
    Util,
} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import BlurInput from "../components/blur-input.jsx";

const {InfoTip, NumberInput, RangeInput, TextListEditor} = components;
const Plotter = PlotterWidget.widget;

const BAR = "bar",
    LINE = "line",
    PIC = "pic",
    HISTOGRAM = "histogram",
    DOTPLOT = "dotplot";

// Return a copy of array with length n, padded with given value
function padArray(array, n, value) {
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
};

const widgetPropTypes = {
    type: PropTypes.oneOf([BAR, LINE, PIC, HISTOGRAM, DOTPLOT]),
    labels: PropTypes.arrayOf(PropTypes.string),
    categories: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ),

    scaleY: PropTypes.number,
    maxY: PropTypes.number,
    snapsPerLine: PropTypes.number,

    picSize: PropTypes.number,
    pixBoxHeight: PropTypes.number,
    picUrl: PropTypes.string,

    plotDimensions: PropTypes.arrayOf(PropTypes.number),
    labelInterval: PropTypes.number,
    starting: PropTypes.arrayOf(PropTypes.number),
    correct: PropTypes.arrayOf(PropTypes.number),
    static: PropTypes.bool,
    onChange: PropTypes.func,
};

const formatNumber = (num) => "$" + knumber.round(num, 2) + "$";

type Props = $FlowFixMe;
type State = $FlowFixMe;

class PlotterEditor extends React.Component<Props, State> {
    static propTypes = widgetPropTypes;
    static widgetName: string = "plotter";

    static defaultProps: Props = {
        ...editorDefaults,
        correct: [1],
        starting: [1],

        type: BAR,
        labels: ["", ""],
        categories: [""],

        picSize: 30,
        picBoxHeight: 36,
        plotDimensions: [275, 200],
        labelInterval: 1,

        get picUrl() {
            const staticUrl = Dependencies.getDependencies().staticUrl;
            if (staticUrl) {
                return staticUrl("/images/badges/earth-small.png");
            }

            return null;
        },
    };

    state: State = {
        editing: this.props.static ? "starting" : "correct",
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

    UNSAFE_componentWillReceiveProps(nextProps: $FlowFixMe) {
        this.fetchPic(nextProps.picUrl);

        if (nextProps.static) {
            this.setState({
                editing: "starting",
            });
        }
    }

    fetchPic: (string) => $FlowFixMe = (url) => {
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

    render(): React.Node {
        const setFromScale = _.contains(
            [LINE, HISTOGRAM, DOTPLOT],
            this.props.type,
        );
        const canChangeSnaps = !_.contains([PIC, DOTPLOT], this.props.type);
        const props = {
            trackInteraction: () => {},
            ...this.props,
        };

        return (
            <div className="perseus-widget-plotter-editor">
                <div>
                    Chart type:{" "}
                    {_.map(
                        [BAR, LINE, PIC, HISTOGRAM, DOTPLOT],
                        function (type) {
                            return (
                                <label key={type}>
                                    <input
                                        type="radio"
                                        name="chart-type"
                                        checked={this.props.type === type}
                                        onChange={_.partial(
                                            this.changeType,
                                            type,
                                        )}
                                    />
                                    {type}
                                </label>
                            );
                        },
                        this,
                    )}
                </div>
                <div>
                    Labels:{" "}
                    {_.map(
                        ["x", "y"],
                        function (axis, i) {
                            return (
                                <label key={axis}>
                                    {axis + ":"}
                                    <input
                                        type="text"
                                        onChange={_.partial(
                                            this.changeLabel,
                                            i,
                                        )}
                                        defaultValue={this.props.labels[i]}
                                    />
                                </label>
                            );
                        },
                        this,
                    )}
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
                            setting this to "4" will only show every 4th label
                            (plus the last one)
                        </p>
                    </InfoTip>
                </div>
                {this.props.type === PIC && (
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
                                    "Add image" function.
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
                    {["correct", "starting"].map((editing) => (
                        <label key={editing}>
                            <input
                                type="radio"
                                disabled={
                                    editing === "correct" && this.props.static
                                }
                                checked={
                                    this.props.static
                                        ? editing === "starting"
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
                <Plotter
                    {...props}
                    starting={this.props[this.state.editing]}
                    onChange={this.handlePlotterChange}
                />
            </div>
        );
    }

    handleChangeTickStep: (number) => void = (value) => {
        this.setState({
            tickStep: value,
        });
    };

    handleChangeRange: ([number, number]) => void = (newValue) => {
        this.setState({
            minX: newValue[0],
            maxX: newValue[1],
        });
    };

    changeLabelInterval: (number) => void = (value) => {
        this.props.onChange({
            labelInterval: value,
        });
    };

    handlePlotterChange: ($FlowFixMe) => void = (newProps) => {
        const props = {};
        props[this.state.editing] = newProps.values;
        this.props.onChange(props);
    };

    changeType: ($FlowFixMe) => void = (type) => {
        let categories;
        if (type === HISTOGRAM) {
            // Switching to histogram, add a label (0) to the left
            categories = [formatNumber(0)].concat(this.props.categories);
            this.props.onChange({type: type, categories: categories});
        } else if (this.props.type === HISTOGRAM) {
            // Switching from histogram, remove a label from the left
            categories = this.props.categories.slice(1);
            this.props.onChange({type: type, categories: categories});
        } else {
            this.props.onChange({type: type});
        }

        if (categories) {
            // eslint-disable-next-line react/no-string-refs
            const node = ReactDOM.findDOMNode(this.refs.categories);
            // $FlowFixMe[incompatible-use]
            // $FlowFixMe[prop-missing]
            node.value = categories.join(", ");
        }
    };

    changeLabel: (number, $FlowFixMe) => void = (i, e) => {
        const labels = _.clone(this.props.labels);
        labels[i] = e.target.value;
        this.props.onChange({labels: labels});
    };

    changePicUrl: (string) => void = (value) => {
        // We don't need the labels and other data in the plotter, so just
        // extract the raw image and use that.
        // TODO(emily): Maybe indicate that such a change has happened?
        const url = Util.getRealImageUrl(value);

        this.props.onChange({picUrl: url});
    };

    changeCategories: ($FlowFixMe) => void = (categories) => {
        let n = categories.length;
        if (this.props.type === HISTOGRAM) {
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

    changeScale: ($FlowFixMe) => void = (e) => {
        const oldScale = this.props.scaleY;
        const newScale = +e.target.value || editorDefaults.scaleY;

        const scale = function (value) {
            return (value * newScale) / oldScale;
        };

        const maxY = scale(this.props.maxY);

        this.props.onChange({
            scaleY: newScale,
            maxY: maxY,
            correct: _.map(this.props.correct, scale),
            starting: _.map(this.props.starting, scale),
        });

        // $FlowFixMe[prop-missing]
        // $FlowFixMe[incompatible-use]
        ReactDOM.findDOMNode(this.refs.maxY).value = maxY; // eslint-disable-line react/no-string-refs
    };

    changeMax: ($FlowFixMe) => void = (e) => {
        this.props.onChange({
            maxY: +e.target.value || editorDefaults.maxY,
        });
    };

    changeSnaps: ($FlowFixMe) => void = (e) => {
        this.props.onChange({
            snapsPerLine: +e.target.value || editorDefaults.snapsPerLine,
        });
    };

    changeEditing: (string) => void = (editing) => {
        this.setState({editing: editing});
    };

    setCategoriesFromScale: () => void = () => {
        const scale = this.state.tickStep || 1;
        const min = this.state.minX || 0;
        const max = this.state.maxX || 0;
        const length = Math.floor((max - min) / scale) * scale;

        let categories;
        if (this.props.type === HISTOGRAM || this.props.type === DOTPLOT) {
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

        // $FlowFixMe[incompatible-use]
        // $FlowFixMe[prop-missing]
        node.value = categories.join(", ");
    };

    serialize: () => $FlowFixMe = () => {
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

        if (this.props.type === PIC) {
            json.picUrl = this.props.picUrl;
        }

        return json;
    };
}

export default PlotterEditor;
