var React = require("react");
var InfoTip = require("react-components/info-tip.jsx");
var BlurInput = require("react-components/blur-input.jsx");
var _ = require("underscore");

var NumberInput = require("../components/number-input.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");
var RangeInput = require("../components/range-input.jsx");
var SvgImage = require("../components/svg-image.jsx");

var ApiClassNames = require("../perseus-api.jsx").ClassNames;

var deepEq = require("../util.js").deepEq;
var knumber = require("kmath").number;

var BAR = "bar",
    LINE = "line",
    PIC = "pic",
    HISTOGRAM = "histogram",
    DOTPLOT = "dotplot";

var DOT_PLOT_POINT_SIZE = 4;
var DOT_PLOT_POINT_PADDING = 8;

var widgetPropTypes = {
    type: React.PropTypes.oneOf([BAR, LINE, PIC, HISTOGRAM, DOTPLOT]),
    labels: React.PropTypes.arrayOf(React.PropTypes.string),
    categories: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ])),

    scaleY: React.PropTypes.number,
    maxY: React.PropTypes.number,
    snapsPerLine: React.PropTypes.number,

    picSize: React.PropTypes.number,
    pixBoxHeight: React.PropTypes.number,
    picUrl: React.PropTypes.string,

    plotDimensions: React.PropTypes.arrayOf(React.PropTypes.number),
    labelInterval: React.PropTypes.number
};

var formatNumber = (num) => "$" + knumber.round(num, 2) + "$";

var Plotter = React.createClass({
    propTypes: widgetPropTypes,

    getDefaultProps: function () {
        return {
            type: BAR,
            labels: ["", ""],
            categories: [""],

            scaleY: 1,
            maxY: 10,
            snapsPerLine: 2,

            picSize: 40,
            picBoxHeight: 48,
            picUrl: "",

            plotDimensions: [380, 300],
            labelInterval: 1
        };
    },

    getInitialState: function() {
        return {
            values: this.props.starting || [1]
        };
    },

    render: function() {
        return <div
            className={"perseus-widget-plotter graphie " +
                ApiClassNames.INTERACTIVE}
            ref="graphieDiv" />;
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.shouldSetupGraphie) {
            this.setupGraphie(prevState);
        }
    },

    componentDidMount: function() {
        this.setupGraphie(this.state);
    },

    componentWillReceiveProps: function(nextProps) {
        var props = ["type", "labels", "categories", "scaleY", "maxY",
            "snapsPerLine", "picUrl", "labelInterval"];

        this.shouldSetupGraphie = _.any(props, function (prop) {
            return !_.isEqual(this.props[prop], nextProps[prop]);
        }, this);

        if (!_.isEqual(this.props.starting, nextProps.starting) &&
            !_.isEqual(this.state.values, nextProps.starting)) {
            this.shouldSetupGraphie = true;
            this.setState({values: nextProps.starting});
        }
    },

    setupGraphie: function(prevState) {
        var self = this;
        self.shouldSetupGraphie = false;
        var graphieDiv = self.refs.graphieDiv.getDOMNode();
        $(graphieDiv).empty();
        var graphie = KhanUtil.createGraphie(graphieDiv);

        // TODO(jakesandlund): It's not the react way to hang
        // something off the component object, but since graphie
        // is outside React, it makes it easier to do this.
        self.graphie = graphie;
        self.graphie.pics = [];

        var isBar = self.props.type === BAR,
            isLine = self.props.type === LINE,
            isPic = self.props.type === PIC,
            isHistogram = self.props.type === HISTOGRAM,
            isDotplot = self.props.type === DOTPLOT;

        var isTiledPlot = isPic || isDotplot;

        var config = {};
        var c = config; // c for short

        c.graph = {
            lines: [],
            bars: [],
            points: [],
            dividers: []
        };
        c.scaleY = self.props.scaleY;
        c.dimX = self.props.categories.length;
        var plotDimensions = self.props.plotDimensions;
        if (isLine) {
            c.dimX += 1;
        } else if (isHistogram) {
            c.barPad = 0;
            c.barWidth = 1;
        } else if (isBar) {
            c.barPad = 0.15;
            c.barWidth = 1 - 2 * c.barPad;
            c.dimX += 2 * c.barPad;
        } else if (isTiledPlot) {
            c.picBoxHeight = self.props.picBoxHeight;
            c.picBoxWidthPx = plotDimensions[0] / self.props.categories.length;
            var picPadAllWidth = plotDimensions[0] - c.dimX * c.picBoxWidthPx;
            c.picPad = picPadAllWidth / (2 * c.dimX + 2);
            var picFullWidth = c.picBoxWidthPx + 2 * c.picPad;

            // Convert from px to "unscaled"
            c.picPad = c.picPad / picFullWidth;
            c.picBoxWidth = c.picBoxWidthPx / picFullWidth;
            c.dimX += 2 * c.picPad;
        }

        if (isDotplot) {
            c.picBoxHeight = DOT_PLOT_POINT_SIZE * 2 + DOT_PLOT_POINT_PADDING;
        }

        c.dimY = Math.ceil(self.props.maxY / c.scaleY) * c.scaleY;
        c.scale = _.map([c.dimX, c.dimY], function (dim, i) {
            return plotDimensions[i] / dim;
        });
        if (isTiledPlot) {
            c.scale[1] = c.picBoxHeight / c.scaleY;
        }

        var padX = 25 / c.scale[0];
        var padY = 25 / c.scale[1];

        // Since dotplot doesn't have an axis along the left it looks weird
        // with the same padding as the others
        if (isDotplot) {
            padX /= 2;
        }

        graphie.init({
            range: [[-3 * padX, c.dimX + padX], [-3 * padY, c.dimY + padY]],
            scale: c.scale
        });
        graphie.addMouseLayer({
            allowScratchpad: true
        });

        if (!isTiledPlot) {
            for (var y = 0; y <= c.dimY; y += c.scaleY) {
                graphie.label(
                    [0, y],
                    KhanUtil.roundToApprox(y, 2),
                    "left",
                    /* isTeX */ true /* for the \approx symbol */
                );
                graphie.style(
                    {stroke: "#000", strokeWidth: 1, opacity: 0.3},
                    function() {
                        graphie.line([0, y], [c.dimX, y]);
                    });
            }
        }

        self.setupCategories(config);

        if (isTiledPlot) {
            self.drawPicHeights(self.state.values, prevState.values);
        }

        graphie.style(
            {stroke: "#000", strokeWidth: 2, opacity: 1.0},
            function() {
                if (isDotplot) {
                    graphie.line([0.5, 0], [c.dimX - 0.5, 0]);
                } else {
                    graphie.line([0, 0], [c.dimX, 0]);
                    graphie.line([0, 0], [0, c.dimY]);
                }
            });

        graphie.label([c.dimX / 2, -35 / c.scale[1]],
            self.props.labels[0],
            "below", false)
            .css("font-weight", "bold");

        graphie.label([-60 / c.scale[0], c.dimY / 2],
            self.props.labels[1],
            "center", false)
            .css("font-weight", "bold")
            .addClass("rotate");
    },

	labelCategory: function(x, category) {
		var graphie = this.graphie;
		category = category + "";
		var isTeX = false;
		var mathyCategory = category.match(/^\$(.*)\$$/);
		if (mathyCategory) {
			category = mathyCategory[1];
			isTeX = true;
		}
		graphie.label([x, 0], category, "below", isTeX);
	},

    setupCategories: function(config) {
        var self = this;
        var c = config;
        var graphie = self.graphie;

        if (self.props.type === HISTOGRAM) {
            // Histograms with n labels/categories have n - 1 buckets
            _.times(self.props.categories.length - 1, function(i) {
                self.setupBar({
                    index: i,
                    startHeight: self.state.values[i],
                    config: config,
                    isHistogram: true
                });
            });

            // Label categories
            _.each(self.props.categories, function(category, i) {
                var x = 0.5 + i * c.barWidth;

                self.labelCategory(x, category);
                var tickHeight = 6 / c.scale[1];
                graphie.style({
                    stroke: "#000", strokeWidth: 2, opacity: 1.0
                }, function() {
                    graphie.line([x, -tickHeight], [x, 0]);
                });
            });
        } else {
            _.each(self.props.categories, function (category, i) {
                var startHeight = self.state.values[i];
                var x;

                if (self.props.type === BAR) {
                    x = self.setupBar({
                        index: i,
                        startHeight: startHeight,
                        config: config,
                        isHistogram: false
                    });
                } else if (self.props.type === LINE) {
                    x = self.setupLine(i, startHeight, config);
                } else if (self.props.type === PIC) {
                    x = self.setupPic(i, config);
                } else if (self.props.type === DOTPLOT) {
                    x = self.setupDotplot(i, config);
                }

                var tickStart = 0;
                var tickEnd = -6 / c.scale[1];

                if (self.props.type === DOTPLOT) {
                    tickStart = -tickEnd;
                }

                if (self.props.type === DOTPLOT) {
                    // Dotplot lets you specify to only show labels every 'n'
                    // ticks. It also looks nicer if it makes the labelled
                    // ticks a bit bigger.
                    if (i % self.props.labelInterval === 0 ||
                            i === self.props.categories.length - 1) {
                        self.labelCategory(x, category);
                        tickStart *= 1.5;
                        tickEnd *= 1.5;
                    }
                } else {
                    self.labelCategory(x, category);
                }

                graphie.style({
                    stroke: "#000", strokeWidth: 2, opacity: 1.0
                }, function() {
                    graphie.line([x, tickStart], [x, tickEnd]);
                });
            });
        }
    },

    setupBar: function(args) {
        var i = args.index;
        var startHeight = args.startHeight;
        var config = args.config;
        var isHistogram = args.isHistogram;

        var self = this;
        var graphie = self.graphie;
        var barHalfWidth = config.barWidth / 2;
        var x;
        if (isHistogram) {
            x = 0.5 + i * config.barWidth + barHalfWidth;
        } else {
            x = 0.5 + i + config.barPad;
        }

        var scaleBar = function(i, height) {
            var center = graphie.scalePoint(0);

            // Scale filled bucket (bar)
            config.graph.bars[i].scale(
                    1, Math.max(0.01, height / config.scaleY),
                    center[0], center[1]);

            if (isHistogram) {
                // Scale dividers between buckets
                var leftDivider = config.graph.dividers[i - 1],
                    rightDivider = config.graph.dividers[i];

                if (leftDivider) {
                    var divHeight = Math.min(self.state.values[i - 1], height);
                    leftDivider.scale(
                        1, Math.max(0.01, divHeight / config.scaleY),
                        center[0], center[1]);
                }

                if (rightDivider) {
                    var divHeight = Math.min(self.state.values[i + 1], height);
                    rightDivider.scale(
                        1, Math.max(0.01, divHeight / config.scaleY),
                        center[0], center[1]
                    );
                }
            }
        };

        graphie.style({
            stroke: "none", fill: KhanUtil.LIGHT_BLUE, opacity: 1.0
        }, function() {
            config.graph.bars[i] = graphie.path([
                [x - barHalfWidth, 0],
                [x - barHalfWidth, config.scaleY],
                [x + barHalfWidth, config.scaleY],
                [x + barHalfWidth, 0],
                [x - barHalfWidth, 0]
            ]);
        });

        if (isHistogram) {
            if (i > 0) {
                // Don't draw a divider to the left of the first bucket
                graphie.style({
                    stroke: "#000", strokeWidth: 1, opacity: 0.3
                }, function() {
                    config.graph.dividers.push(graphie.path([
                        [x - barHalfWidth, 0],
                        [x - barHalfWidth, config.scaleY]
                    ]));
                });
            }
        }

        config.graph.lines[i] = graphie.addMovableLineSegment({
            coordA: [x - barHalfWidth, startHeight],
            coordZ: [x + barHalfWidth, startHeight],
            snapY: config.scaleY / self.props.snapsPerLine,
            constraints: {
                constrainX: true
            },
            normalStyle: {
                "stroke": KhanUtil.INTERACTIVE,
                "stroke-width": 4
            }
        });

        config.graph.lines[i].onMove = function(dx, dy) {
            var y = this.coordA[1];
            if (y < 0 || y > config.dimY) {
                y = Math.min(Math.max(y, 0), config.dimY);
                this.coordA[1] = this.coordZ[1] = y;

                // Snap the line back into range.
                this.transform();
            }

            var values = _.clone(self.state.values);
            values[i] = y;
            self.setState({values: values});
            self.props.onChange({ values: values });

            scaleBar(i, y);
        };

        scaleBar(i, startHeight);
        return x;
    },

    setupLine: function(i, startHeight, config) {
        var self = this;
        var c = config;
        var graphie = self.graphie;
        var x = i + 1;
        c.graph.points[i] = graphie.addMovablePoint({
            coord: [x, startHeight],
            constraints: {
                constrainX: true
            },
            normalStyle: {
                fill: KhanUtil.INTERACTIVE,
                stroke: KhanUtil.INTERACTIVE
            },
            snapY: c.scaleY / self.props.snapsPerLine,
        });
        c.graph.points[i].onMove = function(x, y) {
            y = Math.min(Math.max(y, 0), c.dimY);
            var values = _.clone(self.state.values);
            values[i] = y;
            self.setState({values: values});
            self.props.onChange({ values: values });
            return [x, y];
        };
        if (i > 0) {
            c.graph.lines[i] = graphie.addMovableLineSegment({
                pointA: c.graph.points[i - 1],
                pointZ: c.graph.points[i],
                constraints: {
                    fixed: true
                },
                normalStyle: {
                    stroke: "#9ab8ed",
                    "stroke-width": 2
                }
            });
        }
        return x;
    },

    setupDotplot: function(i, config) {
        var graphie = this.graphie;
        return this.setupTiledPlot(i, 1, config, (x, y) => {
            return graphie.ellipse([x, y],
                 [
                     DOT_PLOT_POINT_SIZE / graphie.scale[0],
                     DOT_PLOT_POINT_SIZE / graphie.scale[1]
                 ],
                 {
                    fill: KhanUtil.INTERACTIVE,
                    stroke: KhanUtil.INTERACTIVE
                 });
        });
    },

    setupPic: function(i, config) {
        var graphie = this.graphie;
        return this.setupTiledPlot(i, 0, config, (x, y) => {
            var scaledCenter = graphie.scalePoint([x, y]);
            var size = this.props.picSize;
            return graphie.raphael.image(
                    this.props.picUrl,
                    scaledCenter[0] - size / 2,
                    scaledCenter[1] - size / 2,
                    size,
                    size);
        });
    },

    setupTiledPlot: function(i, bottomMargin, config, createImage) {
        var self = this;
        var c = config;
        var graphie = self.graphie;
        var pics = graphie.pics;
        var x = i + 0.5 + c.picPad;

        pics[i] = [];
        var n = Math.round(c.dimY / c.scaleY) + 1;
        _(n).times(function(j) {
            j -= 1;
            var midY = (j + 0.5) * c.scaleY;
            var leftX = x - c.picBoxWidth / 2;
            var topY = midY + 0.5 * c.scaleY;
            var coord = graphie.scalePoint([leftX, topY + bottomMargin]);
            var mouseRect = graphie.mouselayer.rect(
                    coord[0], coord[1], c.picBoxWidthPx, c.picBoxHeight);
            $(mouseRect[0])
                .css({fill: "#000", opacity: 0.0, cursor: "pointer"})
                .on("vmousedown", function(e) {
                    e.preventDefault();
                    self.whichPicClicked = i;
                    self.setPicHeight(i, topY);

                    $(document).on("vmouseup.plotTile", function(e) {
                        $(document).unbind(".plotTile");
                    });

                    $(document).on("vmousemove.plotTile", function(e) {
                        e.preventDefault();

                        // Reverse-engineer the initial calculation
                        var yCoord = graphie.getMouseCoord(e)[1];
                        var adjustedCoord = Math.floor(yCoord - bottomMargin);

                        // Calculate top coord from j value, but don't let them
                        // go below j = -1, which is equivalent to having '0'
                        // on the dot plot (due to weird indexing).
                        var newJ = Math.max(-1,
                            Math.floor(adjustedCoord / c.scaleY));
                        var newMidY = (newJ + 0.5) * c.scaleY;
                        var newTopY = newMidY + 0.5 * c.scaleY;
                        self.setPicHeight(self.whichPicClicked, newTopY);
                    });
                });

            if (j < 0) {
                // Don't show a pic underneath the axis!
                return;
            }
            pics[i][j] = createImage(x, midY + bottomMargin);
        });
        return x;
    },

    setPicHeight: function(i, y) {
        var values = _.clone(this.state.values);
        values[i] = y;
        this.drawPicHeights(values, this.state.values);
        this.setState({values: values});
        this.props.onChange({ values: values });
    },

    drawPicHeights: function(values, prevValues) {
        var self = this;
        var graphie = self.graphie;
        var pics = graphie.pics;
        _.each(pics, function(ps, i) {
            _.each(ps, function(pic, j) {
                var y = (j + 1) * self.props.scaleY;
                var show = y <= values[i];
                if (self.props.type === DOTPLOT) {
                    var wasShown = y <= prevValues[i];
                    var wasJustShown = show && !wasShown;
                    if (wasJustShown) {
                        pic.animate({
                            "stroke-width": 8
                        }, 75, () => pic.animate({
                                "stroke-width": 2
                            }, 75));
                    }
                }
                $(pic[0]).css({display: show ? "inline" : "none"});
            });
        });
    },

    getUserInput: function() {
        return this.state.values;
    },

    simpleValidate: function(rubric) {
        return Plotter.validate(this.getUserInput(), rubric);
    },

    statics: {
        displayMode: "block"
    }
});

_.extend(Plotter, {
    validate: function (guess, rubric) {
        if (deepEq(guess, rubric.starting)) {
            return {
                type: "invalid",
                message: null
            };
        } else {
            return {
                type: "points",
                earned: deepEq(guess, rubric.correct) ? 1 : 0,
                total: 1,
                message: null
            };
        }
    }
});


// Return a copy of array with length n, padded with given value
function padArray(array, n, value) {
    var copy = _.clone(array);
    copy.length = n;
    for (var i = array.length; i < n; i++) {
        copy[i] = value;
    }
    return copy;
}

var editorDefaults = {
    scaleY: 1,
    maxY: 10,
    snapsPerLine: 2
};

var PlotterEditor = React.createClass({
    propTypes: widgetPropTypes,

    getDefaultProps: function () {
        return _.extend({}, editorDefaults, {
            correct: [1],
            starting: [1],

            type: BAR,
            labels: ["", ""],
            categories: [""],

            picSize: 30,
            picBoxHeight: 36,
            picUrl: Khan.imageBase + "badges/earth-small.png",

            plotDimensions: [275, 200],
            labelInterval: 1
        });
    },

    getInitialState: function() {
        return {
            editing: "correct",
            pic: null,
            loadedUrl: null,
            minX: null,
            maxX: null,
            tickStep: null
        };
    },

    componentWillMount: function() {
        this.fetchPic(this.props.picUrl);
    },

    componentWillReceiveProps: function(nextProps) {
        this.fetchPic(nextProps.picUrl);
    },

    fetchPic: function(url) {
        if (this.state.loadedUrl !== url) {
            var pic = new Image();
            pic.src = url;
            pic.onload = () => {
                this.setState({
                    pic: pic,
                    loadedUrl: url
                });
            };
        }
    },

    render: function() {
        var setFromScale = _.contains([LINE, HISTOGRAM, DOTPLOT],
                                      this.props.type);
        var canChangeSnaps = !_.contains([PIC, DOTPLOT], this.props.type);
        return <div className="perseus-widget-plotter-editor">
            <div>
                Chart type:{' '}
                {_.map([BAR, LINE, PIC, HISTOGRAM, DOTPLOT], function(type) {
                    return <label key={type}>
                        <input
                            type="radio"
                            name="chart-type"
                            checked={this.props.type === type}
                            onChange={_.partial(this.changeType, type)} />
                        {type}
                    </label>;
                }, this)}
            </div>
            <div>
                Labels:{' '}
                {_.map(["x", "y"], function(axis, i) {
                    return <label key={axis}>
                        {axis + ":"}
                        <input
                            type="text"
                            onChange={_.partial(this.changeLabel, i)}
                            defaultValue={this.props.labels[i]} />
                    </label>;
                }, this)}
            </div>

            {setFromScale && <div className="set-from-scale-box">
                <span className="categories-title">
                    Set Categories From Scale
                </span>
                <div>
                    <label>
                        Tick Step:{' '}
                        <NumberInput
                            placeholder={1}
                            useArrowKeys={true}
                            value={this.state.tickStep}
                            onChange={this.handleChangeTickStep} />
                    </label>
                    <InfoTip>
                        <p>The difference between adjacent ticks.</p>
                    </InfoTip>
                </div>
                <div>
                    <label>
                        Range:{' '}
                        <RangeInput
                            placeholder={[0, 10]}
                            useArrowKeys={true}
                            value={[this.state.minX, this.state.maxX]}
                            onChange={this.handleChangeRange} />
                    </label>
                </div>
                <div>
                    <button onClick={this.setCategoriesFromScale}>
                        Set Categories{' '}
                    </button>
                </div>
            </div>}
            <div>
                <label>
                    Label Interval:{' '}
                    <NumberInput
                        useArrowKeys={true}
                        value={this.props.labelInterval}
                        onChange={this.changeLabelInterval} />
                </label>
                <InfoTip>
                    <p>Which ticks to display the labels for. For instance,
                    setting this to "4" will only show every 4th label (plus
                    the last one)</p>
                </InfoTip>
            </div>
            {this.props.type === PIC && <div>
                <label>
                    Picture:{' '}
                    <BlurInput
                        className="pic-url"
                        value={this.props.picUrl}
                        onChange={this.changePicUrl} />
                <InfoTip>
                    <p>Use the default picture of Earth, or insert the URL for
                    a different picture using the "Add image" function.</p>
                </InfoTip>
                </label>
                {this.state.pic &&
                    this.state.pic.width !== this.state.pic.height &&
                    <p className="warning">
                        <b>Warning</b>: You are using a picture which is not
                        square.  This means the image will get distorted. You
                        should probably crop it to be square.
                    </p>}
            </div>}
            <div>
                <label>
                    Categories:{' '}
                    <TextListEditor
                        ref="categories"
                        layout="horizontal"
                        options={this.props.categories}
                        onChange={this.changeCategories} />
                </label>
            </div>
            <div>
                <label>
                    Scale (y):{' '}
                    <input
                        type="text"
                        onChange={this.changeScale}
                        defaultValue={this.props.scaleY} />
                </label>
            </div>
            <div>
                <label>
                    Max y:{' '}
                    <input
                        type="text"
                        ref="maxY"
                        onChange={this.changeMax}
                        defaultValue={this.props.maxY} />
                </label>
            </div>
            {canChangeSnaps && <div>
                <label>
                    Snaps per line:{' '}
                    <input
                        type="text"
                        onChange={this.changeSnaps}
                        defaultValue={this.props.snapsPerLine} />
                </label>
                <InfoTip>
                    <p>Creates the specified number of divisions between the
                    horizontal lines. Fewer snaps between lines makes the graph
                    easier for the student to create correctly.</p>
                </InfoTip>
            </div>}
            <div>
                Editing values:{' '}
                {_.map(["correct", "starting"], function(editing) {
                    return <label key={editing}>
                        <input
                            type="radio"
                            name="editing"
                            checked={this.state.editing === editing}
                            onChange={_.partial(this.changeEditing, editing)}/>
                        {editing}
                    </label>;
                }, this)}
                <InfoTip><p>
                    Use this toggle to switch between editing the correct
                    answer (what the student will be graded on) and the
                    starting values (what the student will see plotted when
                    they start the problem). Note: These cannot be the same.
                </p></InfoTip>
            </div>
            <Plotter
                {...this.props}
                starting={this.props[this.state.editing]}
                onChange={this.handlePlotterChange} />
        </div>;
    },

    handleChangeTickStep: function(value) {
        this.setState({
            tickStep: value
        });
    },

    handleChangeRange: function(newValue) {
        this.setState({
            minX: newValue[0],
            maxX: newValue[1]
        });
    },

    changeLabelInterval: function(value) {
        this.props.onChange({
            labelInterval: value
        });
    },

    handlePlotterChange: function(newProps) {
        var props = {};
        props[this.state.editing] = newProps.values;
        this.props.onChange(props);
    },

    changeType: function(type) {
        var categories;
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
            this.refs.categories.getDOMNode().value = categories.join(", ");
        }
    },

    changeLabel: function(i, e) {
        var labels = _.clone(this.props.labels);
        labels[i] = e.target.value;
        this.props.onChange({labels: labels});
    },

    changePicUrl: function(value) {
        // We don't need the labels and other data in the plotter, so just
        // extract the raw image and use that.
        // TODO(emily): Maybe indicate that such a change has happened?
        var url = SvgImage.getRealImageUrl(value);

        this.props.onChange({picUrl: url});
    },

    changeCategories: function(categories) {
        var n = categories.length;
        if (this.props.type === HISTOGRAM) {
            // Histograms with n labels/categories have n - 1 buckets
            n--;
        }
        var value = this.props.scaleY;

        this.props.onChange({
            categories: categories,
            correct: padArray(this.props.correct, n, value),
            starting: padArray(this.props.starting, n, value)
        });
    },

    changeScale: function(e) {
        var oldScale = this.props.scaleY;
        var newScale = +e.target.value || editorDefaults.scaleY;

        var scale = function(value) {
            return value * newScale / oldScale;
        };

        var maxY = scale(this.props.maxY);

        this.props.onChange({
            scaleY: newScale,
            maxY: maxY,
            correct: _.map(this.props.correct, scale),
            starting: _.map(this.props.starting, scale)
        });

        this.refs.maxY.getDOMNode().value = maxY;
    },

    changeMax: function(e) {
        this.props.onChange({
            maxY: +e.target.value || editorDefaults.maxY
        });
    },

    changeSnaps: function(e) {
        this.props.onChange({
            snapsPerLine: +e.target.value || editorDefaults.snapsPerLine
        });
    },

    changeEditing: function(editing) {
        this.setState({editing: editing});
    },

    setCategoriesFromScale: function() {
        var scale = this.state.tickStep || 1;
        var min = this.state.minX || 0;
        var max = this.state.maxX || 0;
        var length = Math.floor((max - min) / scale) * scale;

        var categories;
        if (this.props.type === HISTOGRAM || this.props.type === DOTPLOT) {
            // Ranges for histogram and dotplot labels should start at zero
            categories = _.range(0, length + scale, scale);
        } else {
            categories = _.range(scale, length + scale, scale);
        }

        categories = _.map(categories, (num) => num + min);
        categories = _.map(categories, formatNumber);

        this.changeCategories(categories);

        this.refs.categories.getDOMNode().value = categories.join(", ");
    },

    serialize: function() {
        var json = _.pick(this.props, "correct", "starting", "type", "labels",
            "categories", "scaleY", "maxY", "snapsPerLine", "labelInterval");

        if (this.props.type === PIC) {
            json.picUrl = this.props.picUrl;
        }

        return json;
    }
});

module.exports = {
    name: "plotter",
    displayName: "Plotter",
    widget: Plotter,
    editor: PlotterEditor
};
