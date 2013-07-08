/** @jsx React.DOM */
(function(Perseus) {

function eq(x, y) {
    return Math.abs(x - y) < 1e-9;
}

var InteractiveNumberLine = React.createClass({
    getDefaultProps: function() {
        return {
            pointX: 0
        };
    },

    componentDidUpdate: function(prevProps, prevState, rootNode) {
        //var oldType = prevProps.graph.type;
        //var newType = this.props.graph.type;
        //if (oldType !== newType ||
        //        newType === "point" &&
        //        prevProps.graph.numPoints !== this.props.graph.numPoints) {
        //    this["remove" + capitalize(oldType) + "Controls"]();
        //    this["add" + capitalize(newType) + "Controls"]();
        //}
    },

    isValid: function() {
        return this.props.range[0] < this.props.range[1] &&
                0 < this.props.tickStep &&
                0 < this.props.snapDivisions;
    },

    render: function() {
        var valid = this.isValid();
        return <div className={"perseus-widget " +
                "perseus-widget-interactive-number-line"}>
            <div style={{display: valid ? "" : "none"}}
                    className="graphie" ref="graphieDiv" />
            <div style={{display: valid ? "none" : ""}}>
                invalid number line configuration
            </div>
        </div>;
    },

    componentDidMount: function() {
        this.addGraphie();
    },

    componentDidUpdate: function() {
        // Use jQuery to remove so event handlers don't leak
        var node = this.refs.graphieDiv.getDOMNode();
        $(node).children().remove();

        this.addGraphie();
    },

    addGraphie: function() {
        var graphie = this.graphie = KhanUtil.createGraphie(
                this.refs.graphieDiv.getDOMNode());

        var range = this.props.range;
        var tickStep = this.props.tickStep;
        var scale = 400 / (range[1] - range[0]);

        graphie.init({
            range: [[range[0] - 30 / scale,
                     range[1] + 30 / scale],
                    [-1, 1]],
            scale: [scale, 40]
        });
        graphie.addMouseLayer();

        // Line

        graphie.line([range[0] - (25 / scale), 0],
             [range[1] + (25 / scale), 0], {
            arrows: "->"
        });
        graphie.line([range[1] + (25 / scale), 0],
             [range[0] - (25 / scale), 0], {
            arrows: "->"
        });

        // Ticks

        for (var x = Math.ceil(range[0] / tickStep) * tickStep; x <= range[1];
                x += tickStep) {
            graphie.line([x, -0.2], [x, 0.2]);
        }

        graphie.style({
            stroke: KhanUtil.BLUE,
            strokeWidth: 3.5
        }, function() {
            graphie.line([range[0], -0.2], [range[0], 0.2]);
            graphie.line([range[1], -0.2], [range[1], 0.2]);
            if (range[0] < 0 && 0 < range[1]) {
                graphie.line([0, -0.2], [0, 0.2]);
            }
        });

        graphie.style({color: KhanUtil.BLUE}, function() {
            graphie.label([range[0], -0.53], range[0], "center");
            graphie.label([range[1], -0.53], range[1], "center");
            if (range[0] < 0 && 0 < range[1]) {
                graphie.label([0, -0.53], "0", "center");
            }
        });

        // Point

        var x = Math.min(Math.max(range[0], this.props.pointX), range[1]);
        var point = this.point = graphie.addMovablePoint({
            coord: [x, 0],
            snapX: this.props.tickStep / this.props.snapDivisions,
            constraints: {
                constrainY: true
            },
            normalStyle: {
                stroke: KhanUtil.ORANGE,
                fill: KhanUtil.ORANGE
            }
        });
        point.onMove = function(x, y) {
            x = Math.min(Math.max(range[0], x), range[1]);
            return [x, y];
        };
        point.onMoveEnd = function(x, y) {
            this.props.onChange({pointX: x});
        }.bind(this);
    },

    toJSON: function() {
        return _.pick(this.props, "pointX");
    },

    simpleValidate: function(rubric) {
        return InteractiveNumberLine.validate(this.toJSON(), rubric);
    },

    focus: $.noop
});


_.extend(InteractiveNumberLine, {
    validate: function(state, rubric) {
        var range = rubric.range;
        var start = Math.min(Math.max(range[0], 0), range[1]);

        if (eq(state.pointX, rubric.correctX || 0)) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else if (state.pointX === start) {
            // We're where we started.
            return {
                type: "invalid",
                message: null
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});


var InteractiveNumberLineEditor = React.createClass({
    getDefaultProps: function() {
        return {
            range: [0, 10],
            tickStep: 1,
            snapDivisions: 4,
            correctX: 0
        };
    },

    render: function() {
        return <div>
            <label>
                min x: <input value={this.props.range[0]}
                    onBlur={this.onRangeBlur.bind(this, 0)} />
            </label><br />
            <label>
                max x: <input value={this.props.range[1]}
                    onBlur={this.onRangeBlur.bind(this, 1)} />
            </label><br />
            <label>
                correct answer: <input value={this.props.correctX}
                    onBlur={this.onBlur.bind(this, "correctX")} />
            </label><br /><br />
            <label>
                tick step: <input value={this.props.tickStep}
                    onBlur={this.onBlur.bind(this, "tickStep")} />
            </label><br />
            <label>
                snap increments per tick:
                <input value={this.props.snapDivisions}
                    onBlur={this.onBlur.bind(this, "snapDivisions")} />
            </label>
        </div>;
    },

    onRangeBlur: function(i, e) {
        var x = Perseus.Util.firstNumericalParse(e.target.value) || 0;
        e.target.value = x;

        var range = this.props.range.slice();
        range[i] = x;
        this.props.onChange({range: range});
    },

    onBlur: function(key, e) {
        var x = Perseus.Util.firstNumericalParse(e.target.value) || 0;
        e.target.value = x;

        var opts = {};
        opts[key] = x;
        this.props.onChange(opts);
    },

    componentDidMount: function() {
    },

    toJSON: function() {
        return _.pick(this.props,
                "range", "tickStep", "snapDivisions", "correctX");
    }
});

Perseus.Widgets.register("interactive-number-line", InteractiveNumberLine);
Perseus.Widgets
    .register("interactive-number-line-editor", InteractiveNumberLineEditor);

})(Perseus);
