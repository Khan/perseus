/** @jsx React.DOM */
(function(Perseus) {

var InfoTip = Perseus.InfoTip;
var deepEq = Perseus.Util.deepEq;

var Plotter = React.createClass({
    getDefaultProps: function () {
        return {
            type: "bar",
            labels: ["", ""],
            categories: [""],

            scaleY: 1,
            maxY: 10,
            snapsPerLine: 2,

            picSize: 40,
            picBoxHeight: 48,
            picUrl: "",

            plotDimensions: [380, 300]        
        };
    },

    getInitialState: function() {
        return {
            values: this.props.starting || [1]
        };
    },

    render: function() {
        return <div className="perseus-widget-plotter" ref="graphieDiv"></div>;
    },

    componentDidUpdate: function() {
        if (this.shouldSetupGraphie) {
            this.setupGraphie();
        }
    },

    componentDidMount: function() {
        this.setupGraphie();
    },

    componentWillReceiveProps: function(nextProps) {
        var props = ["type", "labels", "categories", "scaleY", "maxY",
            "snapsPerLine", "picUrl"];

        this.shouldSetupGraphie = _.any(props, function (prop) {
            return !_.isEqual(this.props[prop], nextProps[prop]);
        }, this);

        if (!_.isEqual(this.props.starting, nextProps.starting) &&
            !_.isEqual(this.state.values, nextProps.starting)) {
            this.shouldSetupGraphie = true;
            this.setState({values: nextProps.starting});
        }
    },

    setupGraphie: function() {
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
        self.mousedownPic = false;

        var isLine = self.props.type === "line";
        var isBar = self.props.type === "bar";
        var isPic = self.props.type === "pic";

        var config = {};
        var c = config; // c for short

        c.graph = {
            lines: [],
            bars: [],
            points: []
        };
        c.scaleY = self.props.scaleY;
        c.dimX = self.props.categories.length;
        var plotDimensions = self.props.plotDimensions;
        if (isLine) {
            c.dimX += 1;
        } else if (isBar) {
            c.barPad = 0.15;
            c.barWidth = 1 - 2 * c.barPad;
            c.dimX += 2 * c.barPad;
        } else if (isPic) {
            c.picBoxHeight = self.props.picBoxHeight;
            c.picBoxWidthPx = c.picBoxHeight * 1.3;
            var picPadAllWidth = plotDimensions[0] - c.dimX * c.picBoxWidthPx;
            c.picPad = picPadAllWidth / (2 * c.dimX + 2);
            var picFullWidth = c.picBoxWidthPx + 2 * c.picPad;

            // Convert from px to "unscaled"
            c.picPad = c.picPad / picFullWidth;
            c.picBoxWidth = c.picBoxWidthPx / picFullWidth;
            c.dimX += 2 * c.picPad;
        }
        c.dimY = Math.ceil(self.props.maxY / c.scaleY) * c.scaleY;
        c.scale = _.map([c.dimX, c.dimY], function (dim, i) {
            return plotDimensions[i] / dim;
        });
        if (isPic) {
            c.scale[1] = c.picBoxHeight / c.scaleY;
        }

        var padX = 25 / c.scale[0];
        var padY = 25 / c.scale[1];

        graphie.init({
            range: [[-3 * padX, c.dimX + padX], [-3 * padY, c.dimY + padY]],
            scale: c.scale
        });
        graphie.addMouseLayer();

        if (!isPic) {
            for (var y = 0; y <= c.dimY; y += c.scaleY) {
                graphie.label([0, y], y, "left", false);
                graphie.style(
                    {stroke: "#000", strokeWidth: 1, opacity: 0.3},
                    function() {
                        graphie.line([0, y], [c.dimX, y]);
                    });
            }
        }

        self.setupCategories(config);

        if (isPic) {
            self.mousedownPic = false;
            $(document).on("mouseup.plotterPic", function() {
                self.mousedownPic = false;
            });
            self.drawPicHeights(self.state.values);
        }

        graphie.style(
            {stroke: "#000", strokeWidth: 2, opacity: 1.0},
            function() {
                graphie.line([0, 0], [c.dimX, 0]);
                graphie.line([0, 0], [0, c.dimY]);
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

    setupCategories: function(config) {
        var self = this;
        var c = config;
        var graphie = self.graphie;

        _.each(self.props.categories, function (category, i) {
            var startHeight = self.state.values[i];
            var x;

            if (self.props.type === "bar") {
                x = self.setupBar(i, startHeight, config);
            } else if (self.props.type === "line") {
                x = self.setupLine(i, startHeight, config);
            } else if (self.props.type === "pic") {
                x = self.setupPic(i, startHeight, config);
            }

            graphie.label([x, 0], category + "", "below", false);

            var tickHeight = 6 / c.scale[1];
            graphie.style(
                {stroke: "#000", strokeWidth: 2, opacity: 1.0},
                function() {
                    graphie.line([x, -tickHeight], [x, 0]);
                });
        });
    },

    setupBar: function(i, startHeight, config) {
        var self = this;
        var c = config;
        var graphie = self.graphie;
        var x = i + 0.5 + c.barPad;
        var barHalfWidth = c.barWidth / 2;

        var scaleBar = function(i, height) {
            var center = graphie.scalePoint(0);
            c.graph.bars[i].scale(
                    1, Math.max(0.01, height / c.scaleY),
                    center[0], center[1]);
        };

        graphie.style(
            {stroke: "none", fill: "#9ab8ed", opacity: 1.0},
            function() {
                c.graph.bars[i] = graphie.path([
                    [x - barHalfWidth, 0],
                    [x - barHalfWidth, c.scaleY],
                    [x + barHalfWidth, c.scaleY],
                    [x + barHalfWidth, 0],
                    [x - barHalfWidth, 0]
                ]);
                scaleBar(i, startHeight);
            });

        c.graph.lines[i] = graphie.addMovableLineSegment({
            coordA: [x - barHalfWidth, startHeight],
            coordZ: [x + barHalfWidth, startHeight],
            snapY: c.scaleY / self.props.snapsPerLine,
            constraints: {
                constrainX: true
            },
            normalStyle: {
                "stroke": KhanUtil.BLUE,
                "stroke-width": 4
            }
        });

        c.graph.lines[i].onMove = function(dx, dy) {
            var y = this.coordA[1];
            if (y < 0 || y > c.dimY) {
                y = Math.min(Math.max(y, 0), c.dimY);
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
                fill: KhanUtil.BLUE,
                stroke: KhanUtil.BLUE
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

    setupPic: function(i, startHeight, config) {
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
            var coord = graphie.scalePoint([leftX, topY]);
            var mouseRect = graphie.mouselayer.rect(
                    coord[0], coord[1], c.picBoxWidthPx, c.picBoxHeight);
            $(mouseRect[0])
                .css({fill: "#000", opacity: 0.0, cursor: "pointer"})
                .on("mousedown", function(e) {
                    self.mousedownPic = true;
                    self.setPicHeight(i, topY);
                    e.preventDefault();
                })
                .on("mouseover", function() {
                    if (self.mousedownPic) {
                        self.setPicHeight(i, topY);
                    }
                });

            if (j < 0) {
                // Don't show a pic underneath the axis!
                return;
            }
            var scaledCenter = graphie.scalePoint([x, midY]);
            var size = self.props.picSize;
            pics[i][j] = graphie.raphael.image(
                    self.props.picUrl,
                    scaledCenter[0] - size / 2,
                    scaledCenter[1] - size / 2,
                    size,
                    size);
        });
        return x;
    },

    setPicHeight: function(i, y) {
        var values = _.clone(this.state.values);
        values[i] = y;
        this.setState({values: values});
        this.props.onChange({ values: values });
        this.drawPicHeights(values);
    },

    drawPicHeights: function(values) {
        var self = this;
        var graphie = self.graphie;
        var pics = graphie.pics;
        _.each(pics, function(ps, i) {
            _.each(ps, function(pic, j) {
                var y = (j + 1) * self.props.scaleY;
                var show = y <= values[i];
                $(pic[0]).css({opacity: show ? 1.0 : 0.0});
            });
        });
    },

    toJSON: function(skipValidation) {
        return this.state.values;
    },

    simpleValidate: function(rubric) {
        return Plotter.validate(this.toJSON(), rubric);
    },
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
    getDefaultProps: function () {
        return _.extend({}, editorDefaults, {
            correct: [1],
            starting: [1],

            type: "bar",
            labels: ["", ""],
            categories: [""],

            picSize: 30,
            picBoxHeight: 36,
            picUrl: Khan.imageBase + "badges/earth-small.png",
            
            plotDimensions: [275, 200]
        });
    },

    getInitialState: function() {
        return {
            editing: "correct"
        };
    },

    render: function() {
        return <div className="perseus-widget-plotter-editor">
            <div>
                Chart type:
                {_.map(["bar", "line", "pic"], function(type) {
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
                Labels:
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
            {this.props.type === "line" && <div>
                <div>
                    <label>
                        Scale (x):
                        <input
                            type="text"
                            ref="scaleX" />
                    </label>
                </div>
                <div>
                    <label>
                        Max x:
                        <input
                            type="text"
                            ref="maxX" />
                    </label>
                </div>
                <div>
                    <button onClick={this.setCategoriesFromScale}>
                        Set categories from scale
                    </button>
                </div>
            </div>}
            {this.props.type === "pic" && <div>
                <label>
                    Picture:
                    <input
                        type="text"
                        className="pic-url"
                        defaultValue={this.props.picUrl}
                        onKeyPress={this.changePicUrl}
                        onBlur={this.changePicUrl} />
                </label>
            </div>}
            <div>
                <label>
                    Categories (comma separated):
                    <input
                        type="text"
                        ref="categories"
                        className="plotter-categories"
                        onChange={_.compose(this.changeCategories,
                            function(e) {
                                return e.target.value.split(/\s*,\s*/);
                            })}
                        defaultValue={this.props.categories.join(", ")} />
                </label>
            </div>
            <div>
                <label>
                    Scale (y):
                    <input
                        type="text"
                        onChange={this.changeScale}
                        defaultValue={this.props.scaleY} />
                </label>
            </div>
            <div>
                <label>
                    Max y:
                    <input
                        type="text"
                        ref="maxY"
                        onChange={this.changeMax}
                        defaultValue={this.props.maxY} />
                </label>
            </div>
            {this.props.type !== "pic" && <div>
                <label>
                    Snaps per line:
                    <input
                        type="text"
                        onChange={this.changeSnaps}
                        defaultValue={this.props.snapsPerLine} />
                </label>
            </div>}
            <div>
                Editing values:
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
            {this.transferPropsTo(
                <Plotter
                    starting={this.props[this.state.editing]}
                    onChange={this.handlePlotterChange} />
            )}
        </div>;
    },

    handlePlotterChange: function(newProps) {
        var props = {};
        props[this.state.editing] = newProps.values;
        this.props.onChange(props);
    },

    changeType: function(type) {
        this.props.onChange({type: type});
    },

    changeLabel: function(i, e) {
        var labels = _.clone(this.props.labels);
        labels[i] = e.target.value;
        this.props.onChange({labels: labels});
    },

    changePicUrl: function(e) {
        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        this.props.onChange({picUrl: e.target.value});
    },

    changeCategories: function(categories) {
        var n = categories.length;
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
        var scale = +this.refs["scaleX"].getDOMNode().value;
        var max = +this.refs["maxX"].getDOMNode().value;
        max = Math.ceil(max / scale) * scale;

        var categories = _.range(scale, max + scale, scale);
        this.changeCategories(categories);

        this.refs.categories.getDOMNode().value = categories.join(", ");
    },

    toJSON: function(skipValidation) {
        var json = _.pick(this.props, "correct", "starting", "type", "labels",
            "categories", "scaleY", "maxY", "snapsPerLine");

        if (this.props.type === "pic") {
            json.picUrl = this.props.picUrl;
        }

        return json;
    }
});

Perseus.Widgets.register("plotter", Plotter);
Perseus.Widgets.register("plotter-editor", PlotterEditor);

})(Perseus);
