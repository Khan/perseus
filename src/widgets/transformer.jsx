/** @jsx React.DOM */
(function(Perseus) {

var ROTATE_SNAP_DEGREES = 15;
var DEGREE_SIGN = "\u00B0";

// TODO (jack): rename this to Perseus.Components
var GraphSettings = Perseus.Components.GraphSettings;
var Graph = Perseus.Components.Graph;

var deepEq = Perseus.Util.deepEq;

var defaultBoxSize = 400;
var defaultBackgroundImage = {
    url: null,
    scale: 1,
    bottom: 0,
    left: 0,
};

function arraySum(array) {
    return _.reduce(array, function(memo, arg) { return memo + arg; }, 0);
}

var defaultGraphProps = function(setProps, boxSize) {
    setProps = setProps || {};
    var range = setProps.range || [[-10, 10], [-10, 10]];
    var step = setProps.step || [1, 1];
    return {
        box: [boxSize, boxSize],
        range: range,
        rangeTextbox: range,
        step: step,
        stepTextbox: step,
        valid: true,
        backgroundImage: defaultBackgroundImage,
        markings: "grid",
        showProtractor: false
    };
};

/* Scales a distance from the default range of
 * [-10, 10] to a given props.range pair
 *
 * Used for sizing various transformation tools
 * (rotation handle, dilation circle)
 */
function scaleToRange(dist, range) {
    var spreadX = range[0][1] - range[0][0];
    var spreadY = range[1][1] - range[1][0];

    return dist * Math.max(spreadX, spreadY) / 20;
}

function dilatePointFromCenter(point, dilationCenter, scale) {
    var pv = KhanUtil.kvector.subtract(point, dilationCenter);
    var pvScaled = KhanUtil.kvector.scale(pv, scale);
    var transformedPoint = KhanUtil.kvector.add(dilationCenter, pvScaled);
    return transformedPoint;
}

function stringFromDecimal(number) {
    return String(KhanUtil.roundTo(9, number));
}

function stringFromFraction(number) {
    var frac = KhanUtil.toFraction(number);
    if (frac[1] === 1) {
        return stringFromDecimal(number);
    } else {
        return stringFromDecimal(frac[0]) + "/" +
                stringFromDecimal(frac[1]);
    }
}

function stringFromPoint(point) {
    return "(" + stringFromDecimal(point[0]) +
            ", " + stringFromDecimal(point[1]) + ")";
}

function stringFromVector(vector) {
    return "<" + stringFromDecimal(vector[0]) +
            ", " + stringFromDecimal(vector[1]) + ">";
}

var Transformations = {
    apply: function(transform) {
        return Transformations[transform.type].apply(transform);
    },

    toString: function(transform) {
        return Transformations[transform.type].toString(transform);
    },

    translation: {
        apply: function(transform) {
            return function(coord) {
                return KhanUtil.kvector.add(coord, transform.vector);
            };
        },
        toString: function(transform) {
            return "Translation by " + stringFromVector(transform.vector);
        }
    },

    rotation: {
        apply: function(transform) {
            return function(coord) {
                return KhanUtil.kpoint.rotateDeg(coord, transform.angleDeg,
                        transform.center);
            };
        },
        toString: function(transform) {
            return "Rotation by " + stringFromDecimal(transform.angleDeg) +
                    DEGREE_SIGN + " about " +
                    stringFromPoint(transform.center);
        }
    },

    reflection: {
        apply: function(transform) {
            return function(coord) {
                return KhanUtil.kpoint.reflectOverLine(coord, transform.line);
            };
        },
        toString: function(transform) {
            var point1 = transform.line[0];
            var point2 = transform.line[1];
            return "Reflection over the line from " +
                    stringFromPoint(point1) + " to " +
                    stringFromPoint(point2);
        }
    },

    dilation: {
        apply: function(transform) {
            return function(coord) {
                return dilatePointFromCenter(coord, transform.center,
                        transform.scale);
            };
        },
        toString: function(transform) {
            var scaleString = stringFromFraction(transform.scale);
            return "Dilation of scale " + scaleString + " about " +
                    stringFromPoint(transform.center);
        }
    }
};


/* Various functions to deal with different shape types */
var ShapeTypes = {
    getPointCountForType: function(type) {
        var splitType = type.split("-");
        if (splitType[0] === "polygon") {
            return splitType[1] || 3;
        } else if (splitType[0] === "line") {
            return 2;
        } else if (splitType[0] === "point") {
            return 1;
        }
    },

    addMovableShape: function(graphie, options) {
        var points = _.map(options.shape.coords, function(coord) {
            return graphie.addMovablePoint(_.extend({}, options, {
                constraints: {
                    fixed: options.fixedPoints
                },
                coord: coord,
                normalStyle: options.pointStyle,
                highlightStyle: options.pointStyle
            }));
        });

        return ShapeTypes.addShape(graphie, options, points);
    },

    addShape: function(graphie, options, points) {
        points = points || options.shape.coords;

        var types = options.shape.type;
        if (!_.isArray(types)) {
            types = [types];
        }
        var nextPoints = _.clone(points);

        var transformFuncs = _.map(types, function(type) {
            var pointCount = ShapeTypes.getPointCountForType(type);
            var points = _.first(nextPoints, pointCount);
            nextPoints = _.rest(nextPoints, pointCount);
            return ShapeTypes.addType(graphie, type, points, options);
        });

        transformFuncs = _.filter(transformFuncs, _.identity);
        var transform = function() {
            for (var i = 0; i < transformFuncs.length; i++) {
                transformFuncs[i]();
            }
        };

        return {
            type: types,
            points: points,
            update: transform
        };
    },

    addType: function(graphie, type, points, options) {
        var lineCoords = _.isArray(points[0]) ? {
            coordA: points[0],
            coordZ: points[1],
        } : {
            pointA: points[0],
            pointZ: points[1],
        };

        type = type.split("-")[0];
        if (type === "polygon") {
            var polygon = graphie.addMovablePolygon(_.extend({}, options, {
                points: points,
                constrainToGraph: false
            }));
            return _.bind(polygon.transform, polygon);
        } else if (type === "line") {
            var line = graphie.addMovableLineSegment(
                    _.extend({}, options, lineCoords, {
                movePointsWithLine: true,
                fixed: options.fixed,
                constraints: {
                    fixed: options.fixed
                },
                extendLine: true
            }));
            return _.bind(line.transform, line, true);
        } else if (type === "lineSegment") {
            var line = graphie.addMovableLineSegment(
                    _.extend({}, options, lineCoords, {
                movePointsWithLine: true,
                fixed: options.fixed,
                constraints: {
                    fixed: options.fixed
                },
                extendLine: false
            }));
            return _.bind(line.transform, line, true);
        } else if (type === "point") {
            // do nothing
        } else {
            throw new Error("Invalid shape type " + type);
        }
    }
};


var PropCheckBox = React.createClass({
    DEFAULT_PROPS: {
        label: "label",
        onChange: null
    },

    getDefaultProps: function() {
        return this.DEFAULT_PROPS;
    },

    propName: function() {
        var propName = _.find(_.keys(this.props), function(localPropName) {
            return !_.has(this.DEFAULT_PROPS, localPropName);
        }, this);

        if (!propName) {
            throw new Error("Attempted to create a PropCheckBox with no " +
                    "prop!");
        }

        return propName;
    },

    render: function() {
        var propName = this.propName();
        return <label>
            {this.props.label}
            <input type="checkbox"
                    checked={this.props[propName]}
                    onClick={this.toggle} />
        </label>;
    },

    toggle: function() {
        var propName = this.propName();
        var changes = {};
        changes[propName] = !this.props[propName];
        this.props.onChange(changes);
    }
});


var ToolSettings = React.createClass({
    getDefaultProps: function() {
        return {
            allowFixed: true
        };
    },

    render: function() {
        return <div>
            {this.props.name}:
            {' '}
            <PropCheckBox
                label="enabled:"
                enabled={this.props.settings.enabled}
                onChange={this.props.onChange} />
            {' '}
            {this.props.allowFixed && this.props.settings.enabled &&
                <PropCheckBox
                    label="fixed:"
                    fixed={this.props.settings.constraints.fixed}
                    onChange={this.changeConstraints} />
            }
        </div>;
    },

    changeConstraints: function(changed) {
        var newConstraints = _.extend({}, this.props.constraints, changed);
        this.props.onChange({
            constraints: newConstraints
        });
    }
});


var TransformationExplorerSettings = React.createClass({
    render: function() {

        return <div className="transformer-settings">
            <ToolSettings
                    name="Translations"
                    settings={this.props.tools.translation}
                    allowFixed={false}
                    onChange={this.changeHandlerFor("translation")} />
            <ToolSettings
                    name="Rotations"
                    settings={this.props.tools.rotation}
                    onChange={this.changeHandlerFor("rotation")} />
            <ToolSettings
                    name="Reflections"
                    settings={this.props.tools.reflection}
                    onChange={this.changeHandlerFor("reflection")} />
            <ToolSettings
                    name="Dilations"
                    settings={this.props.tools.dilation}
                    onChange={this.changeHandlerFor("dilation")} />
            <PropCheckBox
                    label="Draw Solution:"
                    drawSolutionShape={this.props.drawSolutionShape}
                    onChange={this.props.onChange} />
        </div>;
    },

    changeHandlerFor: function(toolName) {
        return _.bind(function(change) {
            var newTools = _.clone(this.props.tools);
            newTools[toolName] = _.extend({}, this.props.tools[toolName],
                    change);

            this.props.onChange({
                tools: newTools
            });
        }, this);
    }
});


var TransformationsShapeEditor = React.createClass({
    render: function() {
        return <div>
            <Graph
                ref="graph"
                box={this.props.graph.box}
                range={this.props.graph.range}
                step={this.props.graph.step}
                markings={this.props.graph.markings}
                backgroundImage={this.props.graph.backgroundImage}
                onNewGraphie={this.setupGraphie} />
            <select
                    key="type-select"
                    value={this.getTypeString(this.props.type)}
                    onChange={this.changeType} >
                <option value="polygon-3">Triangle</option>
                <option value="polygon-4">Quadrilateral</option>
                <option value="polygon-5">Pentagon</option>
                <option value="polygon-6">Hexagon</option>
                <option value="line">Line</option>
                <option value="line,line">2 lines</option>
            </select>
        </div>;
    },

    /* Return the option string for a given type */
    getTypeString: function(type) {
        if (_.isArray(type)) {
            return _.map(type, this.getTypeString).join(",");
        } else if (type === "polygon") {
            return "polygon-" + this.props.shape.coords.length;
        } else {
            return type;
        }
    },

    /* Change the type on the window event e
     *
     * e.target.value is the new type string
     */
    changeType: function(e) {
        var types = String(e.target.value).split(",");
        var pointCount = arraySum(_.map(
                types,
                ShapeTypes.getPointCountForType
        ));

        var radius = scaleToRange(4, this.refs.graph.props.range);
        var offset = (1 / 2 - 1 / pointCount) * 180;
        var coords = _.times(pointCount, function(i) {
            return KhanUtil.kpoint.rotateDeg([radius, 0],
                360 * i / pointCount + offset);
        });

        this.props.onChange({
            shape: {
                type: types,
                coords: coords
            }
        });
    },

    componentWillReceiveProps: function(newProps) {
        if (!deepEq(this.props.shape, newProps.shape)) {
            this.shouldSetupGraphie = true;
        }
    },

    componentDidUpdate: function() {
        if (this.shouldSetupGraphie) {
            this.refs.graph.reset();
        }
    },

    updateCoords: function() {
        this.props.onChange({
            shape: {
                type: this.props.shape.type,
                coords: _.pluck(this.shape.points, "coord")
            }
        });
    },

    setupGraphie: function(graphie) {
        this.shape = ShapeTypes.addMovableShape(graphie, {
            fixedPoints: false,
            shape: this.props.shape,
            onMoveEnd: this.updateCoords
        });
    },

});

/* Display a transformation's text description
 *
 * // TODO(jack): This is super hacky right now and just prints out
 * the transformation json in an unstyled div D:. Please tell jack to
 * fix this!
 */
var TransformationItem = React.createClass({
    render: function() {
        return <div>
            {Transformations.toString(this.props.transform)}
        </div>;
    }
});

var Transformer = React.createClass({
    // TODO (jack): These should be refactored into a nice object at the top
    // so that we don't have all this duplication
    getDefaultProps: function() {
        return {
            graph: {},
            grading: "shape",
            transformations: [],
            starting: {
                shape: {
                    type: "polygon",
                    coords: [[2, 2], [2, 6], [7, 2]]
                },
                transformations: []
            },
            correct: {
                shape: {
                    type: "poylgon",
                    coords: null
                }
            },
            drawSolutionShape: true
        };
    },

    render: function() {
        var transformationList = _.map(
            this.props.transformations,
            this.renderTransform
        );

        // Fill in any missing value in this.props.graph
        // this can happen because the graph json doesn't include
        // box, for example
        var graph = _.extend(
                defaultGraphProps(this.props.graph, defaultBoxSize),
                this.props.graph
        );

        return <div className={"perseus-widget " +
                        "perseus-widget-transformer"}>
            <button
                className="simple-button orange"
                type="button"
                onClick={this.resetTransformations}>
                Reset
            </button>
            <Graph
                ref="graph"
                box={graph.box}
                range={graph.range}
                step={graph.step}
                markings={graph.markings}
                backgroundImage={graph.backgroundImage}
                showProtractor={graph.showProtractor}
                onNewGraphie={this.setupGraphie} />

            {transformationList}

        </div>;
    },

    renderTransform: function(transform) {
        return <TransformationItem
                transform={transform} />;
    },

    componentDidUpdate: function() {
        if (this.shouldSetupGraphie) {
            this.refs.graph.reset();
        }
    },

    componentWillReceiveProps: function(nextProps) {
        this.shouldSetupGraphie = false;
        if (!deepEq(this.transformations, nextProps.transformations)) {
            this.shouldSetupGraphie = true;
        } else if (!deepEq(this.props.starting, nextProps.starting)) {
            this.shouldSetupGraphie = true;
        } else if (this.props.drawSolutionShape !==
                nextProps.drawSolutionShape) {
            this.shouldSetupGraphie = true;
        } else if (nextProps.drawSolutionShape && !deepEq(
                this.props.correct.shape, nextProps.correct.shape)) {
            this.shouldSetupGraphie = true;
        } else if (!deepEq(this.tools, nextProps.tools)) {
            this.shouldSetupGraphie = true;
        }
    },

    graphie: function() {
        return this.refs.graph.graphie();
    },

    setupGraphie: function() {
        var self = this;

        var graphie = this.refs.graph.graphie();
        this.shouldSetupGraphie = false;

        // A background image of our solution:
        if (this.props.drawSolutionShape &&
                this.props.correct.shape &&
                this.props.correct.shape.coords) {
            ShapeTypes.addShape(graphie, {
                fixed: true,
                shape: self.props.correct.shape,
                normalStyle: {
                    stroke: KhanUtil.GRAY,
                    "stroke-dasharray": "",
                    "stroke-width": 2
                }
            });
        }

        // the polygon that we transform
        this.shape = ShapeTypes.addMovableShape(graphie, {
            shape: this.props.starting.shape,
            fixedPoints: true,
            fixed: !this.props.tools.translation.enabled,
            onMove: function (dX, dY) {
                dX = KhanUtil.roundToNearest(graphie.snap[0], dX);
                dY = KhanUtil.roundToNearest(graphie.snap[1], dY);
                return [dX, dY];
            },
            onMoveEnd: function(dX, dY) {
                self.addTransform({
                    type: "translation",
                    vector: [dX, dY]
                });
            },
            pointStyle: {
                fill: KhanUtil.BLUE,
                stroke: KhanUtil.BLUE
            }
        });

        this.addRotationTool(this.props.tools.rotation);

        this.addReflectionTool(this.props.tools.reflection);

        this.addDilationTool(this.props.tools.dilation);

        // apply any transformations we received in props
        this.transformations = _.clone(this.props.transformations);
        _.each(this.transformations, self.applyTransform);

        // Save a copy of our tools so that we can check future
        // this.props.tools changes against them
        // This seems weird, but gives us an easy way to tell whether
        // props changes were self-inflicted (for which a graphie reset
        // is not required, and in fact a bad idea right now because of
        // resetting the size of the dilation tool).
        // TODO (jack): A deepClone method would be nice here
        this.tools = {
            translation: _.clone(this.props.tools.translation),
            rotation: _.clone(this.props.tools.rotation),
            reflection: _.clone(this.props.tools.reflection),
            dilation: _.clone(this.props.tools.dilation)
        };
    },

    addReflectionTool: function(options) {
        if (!options.enabled) {
            return;
        }
        var self = this;
        var graphie = this.refs.graph.graphie();
        // the points defining the line of reflection
        this.reflectPoints = _.map(options.coords, function(coord) {
            return graphie.addMovablePoint({
                constraints: options.constraints,
                coord: coord,
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
                normalStyle: {
                    fill: KhanUtil.ORANGE,
                    stroke: KhanUtil.ORANGE
                },
                highlightStyle: {
                    fill: KhanUtil.ORANGE,
                    stroke: KhanUtil.ORANGE
                },
                onMove: function() {
                    self.reflectButton.update();
                },
                onMoveEnd: self.updateReflectionTool
            });
        });

        // the line of reflection
        this.reflectLine = graphie.addMovableLineSegment({
            fixed: options.constraints.fixed,
            constraints: options.constraints,
            pointA: this.reflectPoints[0],
            pointZ: this.reflectPoints[1],
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            extendLine: true,
            normalStyle: {
                "stroke": KhanUtil.BLUE,
                "stroke-width": 2,
                "stroke-dasharray": "- "
            },
            highlightStyle: {
                "stroke": KhanUtil.ORANGE,
                "stroke-width": 2,
                "stroke-dasharray": "- "
            },
            movePointsWithLine: true,
            onMove: function() {
                self.reflectButton.update();
            },
            onMoveEnd: self.updateReflectionTool
        });

        // the "button" point in the center of the line of reflection
        this.reflectButton = graphie.addMovablePoint({
            update: function() {
                this.setCoord(KhanUtil.kvector.scale(KhanUtil.kvector.add(
                        self.reflectPoints[0].coord,
                        self.reflectPoints[1].coord
                        ), 0.5));
            },
            onMove: function() { return false; }
        });
        this.reflectButton.update();

        // hacky click detection
        // TODO (jack): make reflection click detection better
        $(this.reflectButton.mouseTarget[0]).on("vmouseup", function(e) {
            self.doTransform({
                type: "reflection",
                line: [
                    self.reflectPoints[0].coord,
                    self.reflectPoints[1].coord
                ]
            });
        });


    },

    /* Scales a distance from the default range of
     * [-10, 10] to the current this.props.graph.range
     *
     * Used for sizing various transformation tools
     * (rotation handle, dilation circle)
     */
    scaleToCurrentRange: function(dist) {
        return scaleToRange(dist, this.refs.graph.props.range);
    },

    addRotationTool: function(options) {
        if (!options.enabled) {
            return;
        }
        var self = this;
        var graphie = this.refs.graph.graphie();
        // the center of our rotation, which can be moved to change the
        // center of rotation
        this.rotatePoint = graphie.addMovablePoint({
            constraints: options.constraints,
            coord: options.coord,
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            normalStyle: {              // ugh, this seems to be a global and
                "stroke-dasharray": ""  // is set to dash above
            },
            highlightStyle: {
                "stroke-dasharray": ""
            },
        });

        // the point that we move around the center of rotation to actually
        // cause rotations
        this.rotateHandle = graphie.addMovablePoint({
            coord: KhanUtil.kpoint.addVector(options.coord, [1, 0]),
            constraints: {
                fixedDistance: {
                    dist: this.scaleToCurrentRange(1),
                    point: this.rotatePoint
                }
            }
        });

        // The logic below in onMove handlers is to make sure we
        // move rotateHandle with rotatePoint
        var rotatePointPrevCoord = this.rotatePoint.coord;
        var rotateHandlePrevCoord = this.rotateHandle.coord;
        var rotateHandleStartCoord = rotateHandlePrevCoord;
        var isRotating = false;

        this.rotatePoint.onMove = function(x, y) {
            // when the rotation center moves, we need to move
            // the rotationHandle as well, or it will end up out
            // of sync
            var dX = x - rotatePointPrevCoord[0];
            var dY = y - rotatePointPrevCoord[1];
            self.rotateHandle.setCoord([
                    self.rotateHandle.coord[0] + dX,
                    self.rotateHandle.coord[1] + dY
            ]);
            rotatePointPrevCoord = [x, y];
            self.rotateHandle.constraints.fixedDistance.point =
                self.rotatePoint;
            rotateHandlePrevCoord = self.rotateHandle.coord;
        };

        // Update tools.rotation.coord
        this.rotatePoint.onMoveEnd = function(x, y) {
            self.changeTool("rotation", {
                coord: [x, y]
            });
        };

        // Rotate polygon with rotateHandle
        this.rotateHandle.onMove = function(x, y) {
            if (!isRotating) {
                rotateHandleStartCoord = rotateHandlePrevCoord;
                isRotating = true;
            }

            var transform = self.getRotationTransformFromCoords(
                    self.rotatePoint.coord,
                    rotateHandlePrevCoord,
                    [x, y]
            );

            var newHandlePoint = KhanUtil.findPointFromAngle(
                    rotateHandlePrevCoord,
                    transform.angleDeg,
                    self.rotatePoint.coord);

            self.applyTransform(transform);

            rotateHandlePrevCoord = newHandlePoint;
            return newHandlePoint;
        };

        this.rotateHandle.onMoveEnd = function() {
            self.addTransform(self.getRotationTransformFromCoords(
                    self.rotatePoint.coord,
                    rotateHandleStartCoord,
                    rotateHandlePrevCoord
            ));
            isRotating = false;
        };
    },

    addDilationTool: function(options) {
        if (!options.enabled) {
            return;
        }
        var self = this;
        var graphie = this.refs.graph.graphie();
        // the circle for causing dilation transforms

        // TODO (jack): This is hacky and should be a parameter
        // to addCircleGraph
        graphie.style({
            "stroke": KhanUtil.BLUE,
            "stroke-width": 2,
            "stroke-dasharray": "- "
        }, function() {
            self.dilationCircle = graphie.addCircleGraph({
                centerConstraints: options.constraints,
                center: options.coord,
                radius: self.scaleToCurrentRange(2),
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
                minRadius: self.scaleToCurrentRange(1),
                snapRadius: self.scaleToCurrentRange(0.5),
                onResize: function(newRadius, oldRadius) {
                    self.applyTransform({
                        type: "dilation",
                        center: self.dilationCircle.centerPoint.coord,
                        scale: newRadius/oldRadius
                    });
                },
                onResizeEnd: function(newRadius, oldRadius) {
                    var scale = newRadius / oldRadius;
                    self.addTransform({
                        type: "dilation",
                        center: self.dilationCircle.centerPoint.coord,
                        scale: newRadius/oldRadius
                    });
                }
            });
        });

        var origOnMoveEnd = this.dilationCircle.centerPoint.onMoveEnd;
        this.dilationCircle.centerPoint.onMoveEnd = function() {
            if (origOnMoveEnd) {
                origOnMoveEnd.apply(this, _.toArray(arguments));
            }
            self.changeTool("dilation", {
                coord: self.dilationCircle.centerPoint.coord
            });
        };
    },

    // returns a transformation object representing a rotation
    // rounds the angle to the nearest 15 degrees
    getRotationTransformFromCoords: function(center, start, end) {
        var angleChanged = -KhanUtil.findAngle(start, end, center);
        angleChanged = (angleChanged + 360) % 360;
        if (angleChanged > 180) {
            angleChanged -= 360;
        }
        var roundedAngle = Math.round(
                angleChanged / ROTATE_SNAP_DEGREES
            ) * ROTATE_SNAP_DEGREES;

        return {
            type: "rotation",
            center: center,
            angleDeg: roundedAngle
        };
    },

    // apply and save a transform
    doTransform: function(transform) {
        this.applyTransform(transform);
        this.addTransform(transform);
    },

    // apply a transform to our polygon (without modifying our transformation
    // list)
    applyTransform: function(transform) {
        var transformFunc = Transformations.apply(transform);
        this.applyCoordTransformation(transformFunc);
    },

    // transform our polygon by transforming each point using a given function
    applyCoordTransformation: function(pointTransform) {
        _.each(this.shape.points, function(point) {
            var newCoord = pointTransform(point.coord);
            point.setCoord(newCoord);
        });
        this.shape.update();
    },

    // kill all transformations, resetting to the initial state
    resetTransformations: function() {
        this.props.onChange({
            transformations: []
        });
    },

    // add a transformation to our props list of transformation
    addTransform: function(transform) {
        this.transformations.push(transform);
        this.props.onChange({
            transformations: this.props.transformations.concat([transform]),
        });
    },

    changeTool: function(tool, changes) {
        var newTools = _.clone(this.props.tools);
        newTools[tool] = _.extend({}, this.props.tools[tool], changes);
        this.tools[tool] = _.clone(newTools[tool]);
        this.props.onChange({
            tools: newTools,
        });
    },

    updateReflectionTool: function() {
        this.changeTool("reflection", {
            coords: _.pluck(this.reflectPoints, "coord")
        });
    },

    simpleValidate: function(rubric) {
        return Transformer.validate(this.toJSON(), rubric);
    },

    toJSON: function() {
        var json = _.pick(this.props, 'grading', 'starting',
                'tools', 'drawSolutionShape');
        json.graph = this.refs.graph.toJSON();
        json.answer = {
            transformations: this.props.transformations,
            shape: {
                type: this.shape.type,
                coords: _.pluck(this.shape.points, "coord")
            }
        };
        json.version = 1; // give us some safety to change the format
                          // when we realize that I wrote
                          // a horrible json spec for this widget
        return json;
    }
});

_.extend(Transformer, {
    validate: function (guess, rubric) {
        var grading = rubric.grading;  // "shape" or "transformations"
        // TODO (jack): This won't actually work well for "transformations",
        // but we don't use that setting yet. this is because reflections
        // have many equivalent lines represented by different arrays, so
        // we'll need a better traversal with that knowledge
        if (deepEq(guess.answer.shape.coords,
                rubric.correct.shape.coords)) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else if (deepEq(guess.answer.shape.coords,
                rubric.starting.shape.coords)) {
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

var TransformerEditor = React.createClass({
    // TODO (jack): These should be refactored into a nice object at the top
    // so that we don't have all this duplication
    getDefaultProps: function() {
        return {
            graph: defaultGraphProps(this.props.graph, 340),
            tools: {
                translation: {
                    enabled: true,
                    constraints: {}
                },
                rotation: {
                    enabled: true,
                    constraints: {
                        fixed: false
                    },
                    coord: [1, 6]
                },
                reflection: {
                    enabled: true,
                    constraints: {
                        fixed: false
                    },
                    coords: [[1, 1], [3, 3]]
                },
                dilation: {
                    enabled: true,
                    constraints: {
                        fixed: false
                    },
                    coord: [6, 6]
                }
            },
            drawSolutionShape: true,
            grading: "shape",
            starting: {
                shape: {
                    type: "polygon",
                    coords: [[2, 2], [2, 6], [7, 2]],
                },
                transformations: []
            },
            correct: {
                shape: {
                    type: "polygon",
                    coords: [[2, 2], [2, 6], [7, 2]],
                },
                transformations: []
            }
        };
    },

    render: function() {
        // Fill in any missing value in this.props.graph
        // this can happen because the graph json doesn't include
        // box, for example
        var graph = _.extend(
                defaultGraphProps(this.props.graph, 340),
                this.props.graph
        );

        return <div>
            <div>Graph settings:</div>
            <GraphSettings
                box={graph.box}
                range={graph.range}
                rangeTextbox={graph.rangeTextbox}
                step={graph.step}
                stepTextbox={graph.stepTextbox}
                valid={graph.valid}
                backgroundImage={graph.backgroundImage}
                markings={graph.markings}
                showProtractor={graph.showProtractor}
                onChange={this.changeGraph} />
            <div>Transformation settings:</div>
            <TransformationExplorerSettings
                ref="transformationSettings"
                tools={this.props.tools}
                drawSolutionShape={this.props.drawSolutionShape}
                onChange={this.props.onChange} />
            <div>Starting location:</div>
            <TransformationsShapeEditor
                ref="shapeEditor"
                graph={graph}
                shape={this.props.starting.shape}
                onChange={this.changeStarting} />
            <div>Solution transformations:</div>
            <Transformer
                ref="explorer"
                graph={graph}
                tools={this.props.tools}
                drawSolutionShape={this.props.drawSolutionShape}
                starting={this.props.starting}
                transformations={this.props.correct.transformations}
                onChange={this.changeTransformer} />
        </div>;
    },

    // propagate a props change on our graph settings to
    // this.props.graph
    changeGraph: function(graphChanges, callback) {
        var newGraph = _.extend({}, this.props.graph, graphChanges);
        this.props.onChange({
            graph: newGraph
        }, callback);
    },

    // propagate a props change on our starting graph to
    // this.props.starting
    changeStarting: function(startingChanges) {
        var newStarting = _.extend({}, this.props.starting, startingChanges);
        this.props.onChange({
            starting: newStarting
        });
    },

    // propagate a transformations change onto correct.transformations
    changeTransformer: function(changes) {
        if (changes.transformations) {
            changes.correct = {
                transformations: changes.transformations
            };
            delete changes.transformations;
        }
        this.props.onChange(changes);
    },

    toJSON: function() {
        var json = this.refs.explorer.toJSON();
        json.correct = json.answer;
        delete json.answer;
        return json;
    }
});


Perseus.Widgets.register("transformer", Transformer);
Perseus.Widgets.register("transformer-editor",
        TransformerEditor);

})(Perseus);
