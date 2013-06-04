(function(Perseus) {

function eq(x, y) {
    return Math.abs(x - y) < 1e-9;
}

function ccw(a, b, c) {
    return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
}

function collinear(a, b, c) {
    return eq(ccw(a, b, c), 0);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

var InteractiveGraph = Perseus.Widget.extend({
    className: "perseus-widget-interactive-graph",

    options: {
        // TODO(alpert): Configurable graph range
        snap: 0.5,
        scale: 20,
        graph: {
            type: "linear"
        },
        flexibleType: false
    },

    graphDefaults: {
        linear: {
            coords: [[-5, 5], [5, 5]]
        },
        quadratic: {
            coords: [[-5, 5], [0, 5], [5, 5]]
        },
        circle: {
            center: [0, 0],
            radius: 2
        }
    },

    controlsType: null,

    render: function() {
        var widget = this;

        this.$el.css("padding", "25px 25px 0 0");
        var $graphieDiv = $("<div class='graphie'>");
        this.$el.empty().append($graphieDiv);

        var graphie = this.graphie = KhanUtil.createGraphie($graphieDiv[0]);
        graphie.graphInit({
            range: 10,
            scale: this.options.scale,
            axisArrows: "&lt;-&gt;",
            labelFormat: function(s) { return "\\small{" + s + "}"; },
            tickStep: 1,
            labelStep: 1
        });
        graphie.label([0, 10], "y", "above");
        graphie.label([10, 0], "x", "right");
        graphie.addMouseLayer();

        if (this.options.flexibleType) {
            var $select = $("<select>");
            _.each({
                linear: "Linear function",
                quadratic: "Quadratic function",
                circle: "Circle"
            }, function(desc, key) {
                $("<option>").val(key).text(desc).appendTo($select);
            });
            $select.appendTo(this.el)
                .on("change", function() {
                    widget.useControls($(this).val());
                    widget.trigger("change");
                })
                .val(this.options.graph.type);
        }

        this.useControls(this.options.graph.type);

        return $.when(this);
    },

    useControls: function(type) {
        if (this.controlsType) {
            // Old controls are visible; remove them
            this["remove" + capitalize(this.controlsType) + "Controls"]();
            this.controlsType = null;

            // Reset graph options since we're switching types
            this.options.graph = {};
        }

        this.options.graph.type = type;
        _.defaults(this.options.graph, this.graphDefaults[type]);

        this["add" + capitalize(type) + "Controls"]();
        this.controlsType = type;
    },

    getEquationString: function() {
        var type = this.options.graph.type;
        return this["get" + capitalize(type) + "EquationString"]();
    },

    addLinearControls: function() {
        var graphie = this.graphie;

        var pointA = this.pointA = graphie.addMovablePoint({
            coord: this.options.graph.coords[0],
            snapX: this.options.snap,
            snapY: this.options.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointB = this.pointB = graphie.addMovablePoint({
            coord: this.options.graph.coords[1],
            snapX: this.options.snap,
            snapY: this.options.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var line = this.line = graphie.addMovableLineSegment({
            pointA: pointA,
            pointZ: pointB,
            fixed: true,
            extendLine: true
        });

        // A and B can't be in the same place
        pointA.onMove = function(x, y) {
            return !_.isEqual([x, y], pointB.coord);
        };
        pointB.onMove = function(x, y) {
            return !_.isEqual([x, y], pointA.coord);
        };

        var self = this;
        $([pointA, pointB]).on("move", function() {
            self.trigger("change");
        });
    },

    getLinearEquationString: function() {
        var coords = [this.pointA.coord, this.pointB.coord];
        if (eq(coords[0][0], coords[1][0])) {
            return "x = " + coords[0][0].toFixed(3);
        } else {
            var m = (coords[1][1] - coords[0][1]) /
                    (coords[1][0] - coords[0][0]);
            var b = coords[0][1] - m * coords[0][0];
            return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
        }
    },

    removeLinearControls: function() {
        this.pointA.remove();
        this.pointB.remove();
        this.line.remove();
    },

    addQuadraticControls: function() {
        var graphie = this.graphie;

        var pointA = this.pointA = graphie.addMovablePoint({
            coord: this.options.graph.coords[0],
            snapX: this.options.snap,
            snapY: this.options.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointB = this.pointB = graphie.addMovablePoint({
            coord: this.options.graph.coords[1],
            snapX: this.options.snap,
            snapY: this.options.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointC = this.pointC = graphie.addMovablePoint({
            coord: this.options.graph.coords[2],
            snapX: this.options.snap,
            snapY: this.options.snap,
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        // A, B, and C can't be in the same place
        pointA.onMove = function(x, y) {
            return x !== pointB.coord[0] && x !== pointC.coord[0];
        };
        pointB.onMove = function(x, y) {
            return x !== pointA.coord[0] && x !== pointC.coord[0];
        };
        pointC.onMove = function(x, y) {
            return x !== pointA.coord[0] && x !== pointB.coord[0];
        };

        this.updateQuadratic();

        var self = this;
        $([pointA, pointB, pointC]).on("move", function() {
            self.updateQuadratic();
            self.trigger("change");
        });
    },

    getQuadraticCoefficients: function() {
        var p1 = this.pointA.coord;
        var p2 = this.pointB.coord;
        var p3 = this.pointC.coord;
        return InteractiveGraph.quadraticCoefficients([p1, p2, p3]);
    },

    getQuadraticEquationString: function() {
        var coeffs = this.getQuadraticCoefficients();
        return "y = " + coeffs[0].toFixed(3) + "x^2 + " +
                        coeffs[1].toFixed(3) + "x + " +
                        coeffs[2].toFixed(3);
    },

    updateQuadratic: function() {
        if (this.parabola) {
            this.parabola.remove();
        }

        var coeffs = this.getQuadraticCoefficients();
        if (!coeffs) {
            return;
        }

        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
        this.parabola = this.graphie.plot(function(x) {
            return (a * x + b) * x + c;
        }, [-10, 10]).attr({
            stroke: KhanUtil.BLUE
        });
        this.parabola.toBack();
    },

    removeQuadraticControls: function() {
        this.pointA.remove();
        this.pointB.remove();
        this.pointC.remove();
        if (this.parabola) {
            this.parabola.remove();
        }
    },

    addCircleControls: function() {
        var graphie = this.graphie;

        var circle = this.circle = graphie.addCircleGraph({
            center: this.options.graph.center,
            radius: this.options.graph.radius
            // TODO(alpert): addCircleGraph doesn't take snap yet
        });

        var self = this;
        $(circle).on("move", function() {
            self.trigger("change");
        });
    },

    getCircleEquationString: function() {
        var center = this.circle.center;
        return "center (" + center[0] + ", " + center[1] + "), radius " +
                this.circle.radius;
    },


    removeCircleControls: function() {
        this.circle.remove();
    },

    toJSON: function() {
        var type = this.options.graph.type;
        if (type === "linear") {
            return {
                type: "linear",
                coords: [this.pointA.coord, this.pointB.coord]
            };
        } else if (type === "quadratic") {
            return {
                type: "quadratic",
                coords: [this.pointA.coord, this.pointB.coord,
                        this.pointC.coord]
            };
        } else if (type === "circle") {
            return {
                type: "circle",
                center: this.circle.center,
                radius: this.circle.radius
            };
        }
    },

    simpleValidate: function(rubric) {
        return InteractiveGraph.validate(this.toJSON(), rubric);
    },

    setState: $.noop,

    focus: $.noop
});


_.extend(InteractiveGraph, {
    quadraticCoefficients: function(coords) {
        var p1 = coords[0];
        var p2 = coords[1];
        var p3 = coords[2];

        var denom = (p1[0] - p2[0]) * (p1[0] - p3[0]) * (p2[0] - p3[0]);
        if (denom === 0) {
            return;
        }
        var a = (p3[0] * (p2[1] - p1[1]) +
                 p2[0] * (p1[1] - p3[1]) +
                 p1[0] * (p3[1] - p2[1])) / denom;
        var b = ((p3[0] * p3[0]) * (p1[1] - p2[1]) +
                 (p2[0] * p2[0]) * (p3[1] - p1[1]) +
                 (p1[0] * p1[0]) * (p2[1] - p3[1])) / denom;
        var c = (p2[0] * p3[0] * (p2[0] - p3[0]) * p1[1] +
                 p3[0] * p1[0] * (p3[0] - p1[0]) * p2[1] +
                 p1[0] * p2[0] * (p1[0] - p2[0]) * p3[1]) / denom;
        return [a, b, c];
    },

    validate: function(state, rubric) {
        _.defaults(rubric, InteractiveGraph.prototype.options);

        if (state.type === rubric.correct.type) {
            if (state.type === "linear") {
                var guess = state.coords;
                var correct = rubric.correct.coords;
                // If both of the guess points are on the correct line, it's
                // correct.
                if (collinear(correct[0], correct[1], guess[0]) &&
                        collinear(correct[0], correct[1], guess[1])) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "quadratic") {
                // If the parabola coefficients match, it's correct.
                var guessCoeffs = this.quadraticCoefficients(state.coords);
                var correctCoeffs = this.quadraticCoefficients(
                        rubric.correct.coords);
                if (eq(guessCoeffs[0], correctCoeffs[0]) &&
                        eq(guessCoeffs[1], correctCoeffs[1]) &&
                        eq(guessCoeffs[2], correctCoeffs[2])) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "circle") {
                if (eq(state.center[0], rubric.correct.center[0]) &&
                        eq(state.center[1], rubric.correct.center[1]) &&
                        eq(state.radius, rubric.correct.radius)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            }
        }

        // The input wasn't correct, so check if it's a blank input or if it's
        // actually just wrong
        if (_.isEqual(state, rubric.graph)) {
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


var InteractiveGraphEditor = Perseus.Widget.extend({
    className: "perseus-widget-interactive-graph",

    options: {
        correct: {
            type: "linear",
            coords: [[-5, 5], [5, 5]]
        }
    },

    render: function() {
        var editor = this;

        this.$el.empty();
        var $answerInfo = $("<div>")
            .text("Correct answer: ")
            .appendTo(this.el);

        var graph = this.graph = new InteractiveGraph({
            scale: 18,
            graph: this.options.correct,
            flexibleType: true
        });
        this.$el.append(graph.el);
        graph.render();

        var $equation = $("<span>").appendTo($answerInfo);
        graph.on("change", updateEquation);
        updateEquation();

        function updateEquation() {
            $equation.text(graph.getEquationString());
        }
    },

    set: function(options) {
        _.extend(this.options, options);
        return this.render();
    },

    toJSON: function() {
        var correct = this.graph.toJSON();
        return {
            // TODO(alpert): Allow specifying flexibleType (whether the graph
            // type should be a choice or not)
            graph: {type: correct.type},
            correct: correct
        };
    }
});

Perseus.Widgets.register("interactive-graph", InteractiveGraph);
Perseus.Widgets.register("interactive-graph-editor", InteractiveGraphEditor);

})(Perseus);
