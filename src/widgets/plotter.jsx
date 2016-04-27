/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, react/jsx-closing-bracket-location, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const ReactDOM = require("react-dom");
const _ = require("underscore");

const ApiClassNames = require("../perseus-api.jsx").ClassNames;

const deepEq = require("../util.js").deepEq;
const KhanMath = require("../util/math.js");
const KhanColors = require("../util/colors.js");
const GraphUtils = require("../util/graph-utils.js");

const BAR = "bar";
const LINE = "line";
const PIC = "pic";
const HISTOGRAM = "histogram";
const DOTPLOT = "dotplot";

const DOT_PLOT_POINT_SIZE = 4;
const DOT_PLOT_POINT_PADDING = 8;

const widgetPropTypes = {
    type: React.PropTypes.oneOf([BAR, LINE, PIC, HISTOGRAM, DOTPLOT]),
    labels: React.PropTypes.arrayOf(React.PropTypes.string),
    categories: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string,
    ])),

    scaleY: React.PropTypes.number,
    maxY: React.PropTypes.number,
    snapsPerLine: React.PropTypes.number,

    picSize: React.PropTypes.number,
    pixBoxHeight: React.PropTypes.number,
    picUrl: React.PropTypes.string,

    plotDimensions: React.PropTypes.arrayOf(React.PropTypes.number),
    labelInterval: React.PropTypes.number,
    starting: React.PropTypes.arrayOf(React.PropTypes.number),
    static: React.PropTypes.bool,
};

const Plotter = React.createClass({
    propTypes: _.extend({
        onChange: React.PropTypes.func.isRequired,
        trackInteraction: React.PropTypes.func.isRequired,
        // TODO(alex): Figure out why lint chokes on this line
        // ...widgetPropTypes,
    }, widgetPropTypes),

    getDefaultProps: function() {
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
            labelInterval: 1,
        };
    },

    getInitialState: function() {
        return {
            values: this.props.starting || [1],
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
        const props = ["type", "labels", "categories", "scaleY", "maxY",
            "snapsPerLine", "picUrl", "labelInterval", "static"];

        this.shouldSetupGraphie = _.any(props, function(prop) {
            return !_.isEqual(this.props[prop], nextProps[prop]);
        }, this);

        if (!_.isEqual(this.props.starting, nextProps.starting) &&
            !_.isEqual(this.state.values, nextProps.starting)) {
            this.shouldSetupGraphie = true;
            this.setState({values: nextProps.starting});
        }
    },

    setupGraphie: function(prevState) {
        const self = this;
        self.shouldSetupGraphie = false;
        const graphieDiv = ReactDOM.findDOMNode(self.refs.graphieDiv);
        $(graphieDiv).empty();
        const graphie = GraphUtils.createGraphie(graphieDiv);

        // TODO(jakesandlund): It's not the react way to hang
        // something off the component object, but since graphie
        // is outside React, it makes it easier to do this.
        self.graphie = graphie;
        self.graphie.pics = [];

        const isBar = self.props.type === BAR;
        const isLine = self.props.type === LINE;
        const isPic = self.props.type === PIC;
        const isHistogram = self.props.type === HISTOGRAM;
        const isDotplot = self.props.type === DOTPLOT;

        const isTiledPlot = isPic || isDotplot;

        const config = {};
        const c = config; // c for short

        c.graph = {
            lines: [],
            bars: [],
            points: [],
            dividers: [],
        };
        c.scaleY = self.props.scaleY;
        c.dimX = self.props.categories.length;
        const plotDimensions = self.props.plotDimensions;
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
            const picPadAllWidth = plotDimensions[0] - c.dimX * c.picBoxWidthPx;
            c.picPad = picPadAllWidth / (2 * c.dimX + 2);
            const picFullWidth = c.picBoxWidthPx + 2 * c.picPad;

            // Convert from px to "unscaled"
            c.picPad = c.picPad / picFullWidth;
            c.picBoxWidth = c.picBoxWidthPx / picFullWidth;
            c.dimX += 2 * c.picPad;
        }

        if (isDotplot) {
            c.picBoxHeight = DOT_PLOT_POINT_SIZE * 2 + DOT_PLOT_POINT_PADDING;
        }

        c.dimY = Math.ceil(self.props.maxY / c.scaleY) * c.scaleY;
        c.scale = _.map([c.dimX, c.dimY], function(dim, i) {
            return plotDimensions[i] / dim;
        });
        if (isTiledPlot) {
            c.scale[1] = c.picBoxHeight / c.scaleY;
        }

        const padX = 25 / c.scale[0];
        const padY = 25 / c.scale[1];

        // Since dotplot doesn't have an axis along the left it looks weird
        // with the same padding as the others
        if (isDotplot) {
            padX /= 2;
        }

        graphie.init({
            range: [[-3 * padX, c.dimX + padX], [-3 * padY, c.dimY + padY]],
            scale: c.scale,
        });
        graphie.addMouseLayer({
            allowScratchpad: true,
        });

        if (!isTiledPlot) {
            for (var y = 0; y <= c.dimY; y += c.scaleY) {
                graphie.label(
                    [0, y],
                    KhanMath.roundToApprox(y, 2),
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
        const graphie = this.graphie;
        category = category + "";
        const isTeX = false;
        const mathyCategory = category.match(/^\$(.*)\$$/);
        if (mathyCategory) {
            category = mathyCategory[1];
            isTeX = true;
        }
        graphie.label([x, 0], category, "below", isTeX);
    },

    setupCategories: function(config) {
        const self = this;
        const c = config;
        const graphie = self.graphie;

        if (self.props.type === HISTOGRAM) {
            // Histograms with n labels/categories have n - 1 buckets
            _.times(self.props.categories.length - 1, function(i) {
                self.setupBar({
                    index: i,
                    startHeight: self.state.values[i],
                    config: config,
                    isHistogram: true,
                });
            });

            // Label categories
            _.each(self.props.categories, function(category, i) {
                const x = 0.5 + i * c.barWidth;

                self.labelCategory(x, category);
                const tickHeight = 6 / c.scale[1];
                graphie.style({
                    stroke: "#000", strokeWidth: 2, opacity: 1.0,
                }, function() {
                    graphie.line([x, -tickHeight], [x, 0]);
                });
            });
        } else {
            _.each(self.props.categories, function(category, i) {
                const startHeight = self.state.values[i];
                const x;

                if (self.props.type === BAR) {
                    x = self.setupBar({
                        index: i,
                        startHeight: startHeight,
                        config: config,
                        isHistogram: false,
                    });
                } else if (self.props.type === LINE) {
                    x = self.setupLine(i, startHeight, config);
                } else if (self.props.type === PIC) {
                    x = self.setupPic(i, config);
                } else if (self.props.type === DOTPLOT) {
                    x = self.setupDotplot(i, config);
                }

                const tickStart = 0;
                const tickEnd = -6 / c.scale[1];

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
                    stroke: "#000", strokeWidth: 2, opacity: 1.0,
                }, function() {
                    graphie.line([x, tickStart], [x, tickEnd]);
                });
            });
        }
    },

    setupBar: function(args) {
        const i = args.index;
        const startHeight = args.startHeight;
        const config = args.config;
        const isHistogram = args.isHistogram;

        const self = this;
        const graphie = self.graphie;
        const barHalfWidth = config.barWidth / 2;
        const x;
        if (isHistogram) {
            x = 0.5 + i * config.barWidth + barHalfWidth;
        } else {
            x = 0.5 + i + config.barPad;
        }

        const scaleBar = function(i, height) {
            const center = graphie.scalePoint(0);

            // Scale filled bucket (bar)
            config.graph.bars[i].scale(
                    1, Math.max(0.01, height / config.scaleY),
                    center[0], center[1]);

            if (isHistogram) {
                // Scale dividers between buckets
                const leftDivider = config.graph.dividers[i - 1];
                const rightDivider = config.graph.dividers[i];

                if (leftDivider) {
                    const divHeight = Math.min(
                        self.state.values[i - 1], height);
                    leftDivider.scale(
                        1, Math.max(0.01, divHeight / config.scaleY),
                        center[0], center[1]);
                }

                if (rightDivider) {
                    const divHeight = Math.min(
                        self.state.values[i + 1], height);
                    rightDivider.scale(
                        1, Math.max(0.01, divHeight / config.scaleY),
                        center[0], center[1]
                    );
                }
            }
        };

        graphie.style({
            stroke: "none", fill: KhanColors.LIGHT_BLUE, opacity: 1.0,
        }, function() {
            config.graph.bars[i] = graphie.path([
                [x - barHalfWidth, 0],
                [x - barHalfWidth, config.scaleY],
                [x + barHalfWidth, config.scaleY],
                [x + barHalfWidth, 0],
                [x - barHalfWidth, 0],
            ]);
        });

        if (isHistogram) {
            if (i > 0) {
                // Don't draw a divider to the left of the first bucket
                graphie.style({
                    stroke: "#000", strokeWidth: 1, opacity: 0.3,
                }, function() {
                    config.graph.dividers.push(graphie.path([
                        [x - barHalfWidth, 0],
                        [x - barHalfWidth, config.scaleY],
                    ]));
                });
            }
        }

        config.graph.lines[i] = graphie.addMovableLineSegment({
            coordA: [x - barHalfWidth, startHeight],
            coordZ: [x + barHalfWidth, startHeight],
            snapY: config.scaleY / self.props.snapsPerLine,
            constraints: {
                constrainX: true,
            },
            normalStyle: {
                "stroke": KhanColors.INTERACTIVE,
                // Don't display graph handles in static mode
                "stroke-width": this.props.static ? 0 : 4,
            },
        });

        config.graph.lines[i].onMove = function(dx, dy) {
            const y = this.coordA[1];
            if (y < 0 || y > config.dimY) {
                y = Math.min(Math.max(y, 0), config.dimY);
                this.coordA[1] = this.coordZ[1] = y;

                // Snap the line back into range.
                this.transform();
            }

            const values = _.clone(self.state.values);
            values[i] = y;
            self.setState({values: values});
            self.changeAndTrack({ values: values });

            scaleBar(i, y);
        };

        scaleBar(i, startHeight);
        return x;
    },

    setupLine: function(i, startHeight, config) {
        const self = this;
        const c = config;
        const graphie = self.graphie;
        const x = i + 1;
        c.graph.points[i] = graphie.addMovablePoint({
            coord: [x, startHeight],
            constraints: {
                constrainX: true,
            },
            normalStyle: {
                fill: KhanColors.INTERACTIVE,
                stroke: KhanColors.INTERACTIVE,
            },
            snapY: c.scaleY / self.props.snapsPerLine,
        });
        c.graph.points[i].onMove = function(x, y) {
            y = Math.min(Math.max(y, 0), c.dimY);
            const values = _.clone(self.state.values);
            values[i] = y;
            self.setState({values: values});
            self.changeAndTrack({ values: values });
            return [x, y];
        };
        if (i > 0) {
            c.graph.lines[i] = graphie.addMovableLineSegment({
                pointA: c.graph.points[i - 1],
                pointZ: c.graph.points[i],
                constraints: {
                    fixed: true,
                },
                normalStyle: {
                    stroke: "#9ab8ed",
                    "stroke-width": 2,
                },
            });
        }
        return x;
    },

    setupDotplot: function(i, config) {
        const graphie = this.graphie;
        return this.setupTiledPlot(i, 1, config, (x, y) => {
            return graphie.ellipse([x, y],
                [
                    DOT_PLOT_POINT_SIZE / graphie.scale[0],
                    DOT_PLOT_POINT_SIZE / graphie.scale[1],
                ],
                {
                    fill: KhanColors.INTERACTIVE,
                    stroke: KhanColors.INTERACTIVE,
                });
        });
    },

    setupPic: function(i, config) {
        const graphie = this.graphie;
        return this.setupTiledPlot(i, 0, config, (x, y) => {
            const scaledCenter = graphie.scalePoint([x, y]);
            const size = this.props.picSize;
            return graphie.raphael.image(
                    this.props.picUrl,
                    scaledCenter[0] - size / 2,
                    scaledCenter[1] - size / 2,
                    size,
                    size);
        });
    },

    setupTiledPlot: function(i, bottomMargin, config, createImage) {
        const self = this;
        const c = config;
        const graphie = self.graphie;
        const pics = graphie.pics;
        const x = i + 0.5 + c.picPad;

        pics[i] = [];
        const n = Math.round(c.dimY / c.scaleY) + 1;
        _(n).times(function(j) {
            j -= 1;
            const midY = (j + 0.5) * c.scaleY;
            const leftX = x - c.picBoxWidth / 2;
            const topY = midY + 0.5 * c.scaleY;
            const coord = graphie.scalePoint([leftX, topY + bottomMargin]);
            const mouseRect = graphie.mouselayer.rect(
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
                        const yCoord = graphie.getMouseCoord(e)[1];
                        const adjustedCoord = Math.floor(yCoord - bottomMargin);

                        // Calculate top coord from j value, but don't let them
                        // go below j = -1, which is equivalent to having '0'
                        // on the dot plot (due to weird indexing).
                        const newJ = Math.max(-1,
                            Math.floor(adjustedCoord / c.scaleY));
                        const newMidY = (newJ + 0.5) * c.scaleY;
                        const newTopY = newMidY + 0.5 * c.scaleY;
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
        const values = _.clone(this.state.values);
        values[i] = y;
        this.drawPicHeights(values, this.state.values);
        this.setState({values: values});
        this.changeAndTrack({ values: values });
    },

    changeAndTrack: function(data) {
        this.props.onChange(data);
        this.props.trackInteraction();
    },

    drawPicHeights: function(values, prevValues) {
        const self = this;
        const graphie = self.graphie;
        const pics = graphie.pics;
        _.each(pics, function(ps, i) {
            _.each(ps, function(pic, j) {
                const y = (j + 1) * self.props.scaleY;
                const show = y <= values[i];
                if (self.props.type === DOTPLOT) {
                    const wasShown = y <= prevValues[i];
                    const wasJustShown = show && !wasShown;
                    if (wasJustShown) {
                        pic.animate({
                            "stroke-width": 8,
                        }, 75, () => pic.animate({
                            "stroke-width": 2,
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
});

_.extend(Plotter, {
    validate: function(guess, rubric) {
        if (deepEq(guess, rubric.starting)) {
            return {
                type: "invalid",
                message: null,
            };
        } else {
            return {
                type: "points",
                earned: deepEq(guess, rubric.correct) ? 1 : 0,
                total: 1,
                message: null,
            };
        }
    },
});

// We don't need to change any of the original props for static mode
const staticTransform = _.identity;

module.exports = {
    name: "plotter",
    displayName: "Plotter",
    widget: Plotter,
    staticTransform: staticTransform,
};
