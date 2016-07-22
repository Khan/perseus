/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, camelcase, comma-dangle, indent, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const _ = require("underscore");

const ApiOptions = require("../perseus-api.jsx").Options;

const Graph         = require("../components/graph.jsx");
const GraphSettings = require("../components/graph-settings.jsx");
const InfoTip       = require("../components/info-tip.jsx");
const PropCheckBox  = require("../components/prop-check-box.jsx");

const Transformer = require("./transformer.jsx").widget;

const deepEq = require("../util.js").deepEq;
const getGridStep = require("../util.js").getGridStep;
const kline = require("kmath").line;
const knumber = require("kmath").number;
const kpoint = require("kmath").point;
const kray = require("kmath").ray;
const kvector = require("kmath").vector;
const KhanColors = require("../util/colors.js");

function arraySum(array) {
    return _.reduce(array, function(memo, arg) { return memo + arg; }, 0);
}

var defaultBackgroundImage = {
    url: null
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

function orderInsensitiveCoordsEqual(coords1, coords2) {
    coords1 = _.clone(coords1).sort(kpoint.compare);
    coords2 = _.clone(coords2).sort(kpoint.compare);
    return _.all(_.map(coords1, function(coord1, i) {
        var coord2 = coords2[i];
        return kpoint.equal(coord1, coord2);
    }));
}

var defaultGraphProps = function(setProps, boxSize) {
    setProps = setProps || {};
    var labels = setProps.labels || ["x", "y"];
    var range = setProps.range || [[-10, 10], [-10, 10]];
    var step = setProps.step || [1, 1];
    var gridStep = setProps.gridStep ||
               getGridStep(range, step, boxSize);
    return {
        box: [boxSize, boxSize],
        labels: labels,
        range: range,
        step: step,
        gridStep: gridStep,
        valid: true,
        backgroundImage: defaultBackgroundImage,
        markings: "grid",
        showProtractor: false
    };
};

var defaultTransformerProps = {
    apiOptions: ApiOptions.defaults,
    gradeEmpty: false,
    graphMode: "interactive",
    listMode: "dynamic",
    graph: {},
    tools: {
        translation: {
            enabled: true,
            required: false,
            constraints: {}
        },
        rotation: {
            enabled: true,
            required: false,
            constraints: {
                fixed: false
            },
            coord: [1, 6]
        },
        reflection: {
            enabled: true,
            required: false,
            constraints: {
                fixed: false
            },
            coords: [[2, -4], [2, 2]]
        },
        dilation: {
            enabled: true,
            required: false,
            constraints: {
                fixed: false
            },
            coord: [6, 6]
        }
    },
    drawSolutionShape: true,
    starting: {
        shape: {
            type: "polygon-3",
            coords: [[2, 2], [2, 6], [7, 2]],
        },
        transformations: []
    },
    correct: {
        shape: {
            type: "polygon-3",
            coords: [[2, 2], [2, 6], [7, 2]],
        },
        transformations: []
    }
};

const ToolSettings = React.createClass({
    getDefaultProps: function() {
        return {
            allowFixed: true
        };
    },

    render: function() {
        return <div>
            {this.props.name}:{' '}
            {" "}
            <PropCheckBox
                label="enabled:"
                enabled={this.props.settings.enabled}
                onChange={this.props.onChange} />
            {" "}
            {this.props.settings.enabled &&
                <PropCheckBox
                    label="required:"
                    required={this.props.settings.required}
                    onChange={this.props.onChange} />
            }
            {this.props.settings.enabled &&
                <InfoTip>
                    'Required' will only grade the answer as correct if the
                    student has used at least one such transformation.
                </InfoTip>
            }
            {" "}
            {this.props.allowFixed && this.props.settings.enabled &&
                <PropCheckBox
                    label="fixed:"
                    fixed={this.props.settings.constraints.fixed}
                    onChange={this.changeConstraints} />
            }
            {this.props.allowFixed && this.props.settings.enabled &&
                <InfoTip>
                    Enable 'fixed' to prevent the student from repositioning
                    the tool. The tool will appear in the position at which it
                    is placed in the editor below.
                </InfoTip>
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
            <div>
                {' '}Mode:{' '}
                <select value={this.getMode()}
                        onChange={this.changeMode}>
                    <option value="interactive,dynamic">
                        {' '}Exploration with text{' '}
                    </option>
                    <option value="interactive,static">
                        {' '}Exploration without text{' '}
                    </option>
                    <option value="dynamic,interactive">
                        {' '}Formal with movement{' '}
                    </option>
                    <option value="static,interactive">
                        {' '}Formal without movement{' '}
                    </option>
                </select>
                <InfoTip>
                    <ul>
                        <li>
                            <b>Exploration:</b> Students create
                            transformations with tools on the graph.{' '}
                        </li>
                        <li>
                            <b>Formal with movement:</b> Students specify
                            transformations mathematically in the
                            transformation list. Graph shows the results of
                            these transformations.{' '}
                        </li>
                        <li>
                            <b>Formal without movement:</b> Students specify
                            transformations mathematically in the
                            transformation list. Graph does not update.{' '}
                        </li>
                    </ul>
                </InfoTip>
            </div>
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

    getMode: function() {
        return this.props.graphMode + "," + this.props.listMode;
    },

    changeMode: function(e) {
        var selected = e.target.value;
        var modes = selected.split(",");

        this.props.onChange({
            graphMode: modes[0],
            listMode: modes[1]
        });
    },

    changeHandlerFor: function(toolName) {
        return change => {
            var newTools = _.clone(this.props.tools);
            newTools[toolName] = _.extend({}, this.props.tools[toolName],
                    change);

            this.props.onChange({
                tools: newTools
            });
        };
    }
});
var ShapeTypes = {
    getPointCountForType: function(type) {
        var splitType = type.split("-");
        if (splitType[0] === "polygon") {
            return splitType[1] || 3;
        } else if (splitType[0] === "line" ||
                splitType[0] === "lineSegment") {
            return 2;
        } else if (splitType[0] === "angle") {
            return 3;
        } else if (splitType[0] === "circle") {
            return 2;
        } else if (splitType[0] === "point") {
            return 1;
        }
    },

    addMovableShape: function(graphie, options) {
        if (options.editable && options.translatable) {
            throw new Error("It doesn't make sense to have a movable shape " +
                    "where you can stretch the points and translate them " +
                    "simultaneously. options: " + JSON.stringify(options));
        }

        var shape;
        var points = _.map(options.shape.coords, function(coord) {
            var currentPoint;
            var isMoving = false;
            var previousCoord = coord;

            var onMove = function(x, y) {
                if (!isMoving) {
                    previousCoord = currentPoint.coord;
                    isMoving = true;
                }

                var moveVector = kvector.subtract(
                    [x, y],
                    currentPoint.coord
                );

                // Translate from (x, y) semantics to (dX, dY) semantics
                // This is more useful for translations on multiple points,
                // where we care about how the points moved, not where any
                // individual point ended up
                if (options.onMove) {
                    moveVector = options.onMove(moveVector[0],
                            moveVector[1]);
                }

                // Perform a translation on all points in this shape when
                // any point moves
                if (options.translatable) {
                    _.each(points, function(point) {
                        // The point itself will be updated by the
                        // movablePoint class, so only translate the other
                        // points
                        if (point !== currentPoint) {
                            point.setCoord(kvector.add(
                                point.coord,
                                moveVector
                            ));
                        }
                    });
                }

                // Update our shape and our currentPoint
                // Without this, some shapes (circles, angles) appear
                // "bouncy" as they are updated with currentPoint at the
                // current mouse coordinate (oldCoord), rather than newCoord
                var oldCoord = currentPoint.coord;
                var newCoord = kvector.add(
                    currentPoint.coord,
                    moveVector
                );
                // Temporarily change our coordinate so that
                // shape.update() sees the new coordinate
                currentPoint.coord = newCoord;
                shape.update();
                // ...But don't break onMove, which assumes it
                // is the only thing changing our coord
                currentPoint.coord = oldCoord;
                return newCoord;
            };

            var onMoveEnd = function() {
                // onMove isn't guaranteed to be called before onMoveEnd, so
                // we have to take into account that we may not have moved and
                // set previousCoord.
                if (options.onMoveEnd && isMoving) {
                    isMoving = false;
                    // We don't use the supplied x and y parameters here
                    // because MovablePoint's onMoveEnd semantics suck.
                    // It returns the mouseX, mouseY without processing them
                    // through onMove, leaving us with weird fractional moves
                    var change = kvector.subtract(
                        currentPoint.coord,
                        previousCoord
                    );
                    options.onMoveEnd(change[0], change[1]);
                }
                shape.update();
            };

            currentPoint = graphie.addMovablePoint({
                coord: coord,
                normalStyle: options.normalPointStyle,
                highlightStyle: options.highlightPointStyle,
                constraints: {
                    fixed: !options.translatable && !options.editable
                },
                visible: options.showPoints,
                snapX: options.snap && options.snap[0] || 0,
                snapY: options.snap && options.snap[1] || 0,
                bounded: false, // Don't bound it when placing it on the graph
                onMove: onMove,
                onMoveEnd: onMoveEnd
            });

            // Bound it when moving
            // We can't set this earlier, because doing so would mean any
            // points outside of the graph would be moved into a moved into
            // a position that doesn't preserve the shape
            currentPoint.bounded = true;

            return currentPoint;
        });

        shape = ShapeTypes.addShape(graphie, options, points);
        var removeShapeWithoutPoints = shape.remove;
        shape.remove = function() {
            removeShapeWithoutPoints.apply(shape);
            _.invoke(points, "remove");
        };
        return shape;
    },

    addShape: function(graphie, options, points) {
        points = points || options.shape.coords;

        var types = ShapeTypes._typesOf(options.shape);
        var typeOptions = options.shape.options ||
                ShapeTypes.defaultOptions(types);

        var shapes = ShapeTypes._mapTypes(types, points,
                function(type, points, i) {
            var shapeOptions = _.extend({}, options, typeOptions[i]);
            return ShapeTypes._addType(graphie, type, points, shapeOptions);
        });

        var updateFuncs = _.filter(_.pluck(shapes, "update"), _.identity);
        var update = function() {
            _.invoke(updateFuncs, "call");
        };

        var removeFuncs = _.filter(_.pluck(shapes, "remove"), _.identity);
        var remove = function() {
            _.invoke(removeFuncs, "call");
        };

        var getOptions = function() {
            return _.map(shapes, function(shape) {
                if (shape.getOptions) {
                    return shape.getOptions();
                } else {
                    return {};
                }
            });
        };

        var toJSON = function() {
            var coords = _.map(points, function(pt) {
                if (_.isArray(pt)) {
                    return pt;
                } else {
                    return pt.coord;
                }
            });
            return {
                type: types,
                coords: coords,
                options: getOptions()
            };
        };

        return {
            type: types,
            points: points,
            update: update,
            remove: remove,
            toJSON: toJSON,
            getOptions: getOptions
        };
    },

    equal: function(shape1, shape2) {
        var types1 = ShapeTypes._typesOf(shape1);
        var types2 = ShapeTypes._typesOf(shape2);
        if (types1.length !== types2.length) {
            return false;
        }
        var shapes1 = ShapeTypes._mapTypes(types1, shape1.coords,
                ShapeTypes._combine);
        var shapes2 = ShapeTypes._mapTypes(types2, shape2.coords,
                ShapeTypes._combine);
        return _.all(_.map(shapes1, function(partialShape1, i) {
            var partialShape2 = shapes2[i];
            if (partialShape1.type !== partialShape2.type) {
                return false;
            }
            return ShapeTypes._forType(partialShape1.type).equal(
                partialShape1.coords,
                partialShape2.coords
            );
        }));
    },

    _typesOf: function(shape) {
        var types = shape.type;
        if (!_.isArray(types)) {
            types = [types];
        }
        return _.map(types, function(type) {
            if (type === "polygon") {
                return "polygon-3";
            } else {
                return type;
            }
        });
    },

    defaultOptions: function(types) {
        return _.map(types, function(type) {
            var typeDefaultOptions = ShapeTypes._forType(type).defaultOptions;
            return _.extend({}, typeDefaultOptions);
        });
    },

    _forType: function(type) {
        var baseType = type.split("-")[0];
        return ShapeTypes[baseType];
    },

    _mapTypes: function(types, points, func, context) {
        return _.map(types, function(type, i) {
            var pointCount = ShapeTypes.getPointCountForType(type);
            var currentPoints = _.first(points, pointCount);
            points = _.rest(points, pointCount);
            return func.call(context, type, currentPoints, i);
        });
    },

    _addType: function(graphie, type, points, options) {
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
                fixed: !options.editable,
                snapX: options.snap && options.snap[0] || 0,
                snapY: options.snap && options.snap[1] || 0,
                points: points,
                constrainToGraph: false
            }));
            return {
                update: polygon.transform.bind(polygon),
                remove: polygon.remove.bind(polygon)
            };
        } else if (type === "line" || type === "lineSegment") {
            var line = graphie.addMovableLineSegment(
                    _.extend({}, options, lineCoords, {
                movePointsWithLine: true,
                fixed: true,
                constraints: {
                    fixed: true
                },
                extendLine: (type === "line")
            }));

            // TODO(jack): Hide points on uneditable lines when translation
            // is a vector.
            // We can't just remove the points yet, because they are the
            // translation handle for the line.
            return {
                update: line.transform.bind(line, true),
                remove: line.remove.bind(line)
            };
        } else if (type === "angle") {
            // If this angle is editable, we want to be able to make angles
            // both larger and smaller than 180 degrees.
            // If this angle is not editable, it should always maintain
            // it's angle measure, even if it is reflected (causing the
            // clockwise-ness of the points to change)
            var shouldChangeReflexivity = options.editable ? null : false;

            var angle = graphie.addMovableAngle({
                angleLabel: "$deg0",
                fixed: true,
                points: points,
                normalStyle: options.normalStyle,
                reflex: options.reflex
            });

            // Hide non-vertex points on uneditable angles
            if (!_.isArray(points[0]) && !options.editable) {
                points[0].remove();
                points[2].remove();
            }
            return {
                update: angle.update.bind(angle, shouldChangeReflexivity),
                remove: angle.remove.bind(angle),
                getOptions: function() {
                    return {
                        reflex: angle.isReflex()
                    };
                }
            };
        } else if (type === "circle") {
            var perimeter = {
                // temporary object for the first removal
                remove: _.identity
            };
            var redrawPerim = function() {
                var coord0 = points[0].coord || points[0];
                var coord1 = points[1].coord || points[1];
                var radius = kpoint.distanceToPoint(coord0, coord1);
                perimeter.remove();
                perimeter = graphie.circle(coord0, radius, _.extend({
                    stroke: KhanColors.DYNAMIC,
                    "stroke-width": 2,
                }, options.normalStyle));
            };

            redrawPerim();
            if (points[1].remove && !options.editable) {
                points[1].remove();
            }

            return {
                update: redrawPerim,
                remove: function() {
                    // Not _.bind because the remove function changes
                    // when the perimeter is redrawn
                    perimeter.remove();
                }
            };
        } else if (type === "point") {
            // do nothing
            return {
                update: null,
                remove: null
            };
        } else {
            throw new Error("Invalid shape type " + type);
        }
    },

    _combine: function(type, coords) {
        return {
            type: type,
            coords: coords
        };
    },

    polygon: {
        equal: orderInsensitiveCoordsEqual
    },

    line: {
        equal: kline.equal
    },

    lineSegment: {
        equal: orderInsensitiveCoordsEqual
    },

    angle: {
        equal: function(points1, points2) {
            if (!kpoint.equal(points1[1], points2[1])) {
                return false;
            }

            var line1_0 = [points1[1], points1[0]];
            var line1_2 = [points1[1], points1[2]];
            var line2_0 = [points2[1], points2[0]];
            var line2_2 = [points2[1], points2[2]];

            var equalUnflipped = kray.equal(line1_0, line2_0) &&
                    kray.equal(line1_2, line2_2);
            var equalFlipped = kray.equal(line1_0, line2_2) &&
                    kray.equal(line1_2, line2_0);

            return equalUnflipped || equalFlipped;
        },

        defaultOptions: {
            reflex: false
        }
    },

    circle: {
        equal: function(points1, points2) {
            var radius1 = kpoint.distanceToPoint(points1[0], points1[1]);
            var radius2 = kpoint.distanceToPoint(points2[0], points2[1]);
            return kpoint.equal(points1[0], points2[0]) &&
                knumber.equal(radius1, radius2);
        }
    },

    point: {
        equal: kpoint.equal
    }
};

var TransformationsShapeEditor = React.createClass({
    render: function() {
        return <div>
            <Graph
                ref="graph"
                box={this.props.graph.box}
                range={this.props.graph.range}
                labels={this.props.graph.labels}
                step={this.props.graph.step}
                gridStep={this.props.graph.gridStep}
                markings={this.props.graph.markings}
                backgroundImage={this.props.graph.backgroundImage}
                onGraphieUpdated={this.setupGraphie}
            />
            <select
                    key="type-select"
                    value={this.getTypeString(this.props.shape.type)}
                    onChange={this.changeType} >
                <option value="polygon-3">Triangle</option>
                <option value="polygon-4">Quadrilateral</option>
                <option value="polygon-5">Pentagon</option>
                <option value="polygon-6">Hexagon</option>
                <option value="line">Line</option>
                <option value="line,line">2 lines</option>
                <option value="lineSegment">Line segment</option>
                <option value="lineSegment,lineSegment">
                    {' '}2 line segments{' '}
                </option>
                <option value="angle">Angle</option>
                <option value="circle">Circle</option>
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
            return kpoint.rotateDeg([radius, 0],
                360 * i / pointCount + offset);
        });

        this.props.onChange({
            shape: {
                type: types,
                coords: coords,
                options: ShapeTypes.defaultOptions(types)
            }
        });
    },

    componentDidMount: function() {
        this.setupGraphie(this.refs.graph.graphie());
    },

    componentDidUpdate: function(prevProps) {
        if (!deepEq(prevProps.shape, this.props.shape)) {
            this.refs.graph.reset();
        }
    },

    updateCoords: function() {
        this.props.onChange({
            shape: this.shape.toJSON()
        });
    },

    setupGraphie: function(graphie) {
        this.shape = ShapeTypes.addMovableShape(graphie, {
            editable: true,
            snap: graphie.snap,
            shape: this.props.shape,
            onMoveEnd: this.updateCoords
        });
    },

});

var TransformerEditor = React.createClass({
    // TODO (jack): These should be refactored into a nice object at the top
    // so that we don't have all this duplication
    getDefaultProps: function() {
        return defaultTransformerProps;
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
            <div>
                <PropCheckBox
                    label="Grade empty answers as wrong:"
                    gradeEmpty={this.props.gradeEmpty}
                    onChange={this.props.onChange} />
                <InfoTip>
                    <p>
                        We generally do not grade empty answers. This usually
                        works well, but sometimes can result in giving away
                        part of an answer in a multi-part question.
                    </p>
                    <p>
                        If this is a multi-part question (there is another
                        widget), you probably want to enable this option.
                        Otherwise, you should leave it disabled.
                    </p>
                    <p>
                        Confused? Talk to Elizabeth.
                    </p>
                </InfoTip>
            </div>
            <div>Graph settings:</div>
            <GraphSettings
                box={graph.box}
                labels={graph.labels}
                range={graph.range}
                step={graph.step}
                gridStep={graph.gridStep}
                valid={graph.valid}
                backgroundImage={graph.backgroundImage}
                markings={graph.markings}
                showProtractor={graph.showProtractor}
                onChange={this.changeGraph} />
            <div>Transformation settings:</div>
            <TransformationExplorerSettings
                ref="transformationSettings"
                graphMode={this.props.graphMode}
                listMode={this.props.listMode}
                tools={this.props.tools}
                drawSolutionShape={this.props.drawSolutionShape}
                onChange={this.props.onChange} />
            <div>Starting location:</div>
            <TransformationsShapeEditor
                ref="shapeEditor"
                graph={graph}
                shape={this.props.starting.shape}
                onChange={this.changeStarting}
                setDrawingAreaAvailable={
                    this.props.apiOptions.setDrawingAreaAvailable}
            />
            <div>Solution transformations:</div>
            <Transformer
                ref="explorer"
                graph={graph}
                graphMode={this.props.graphMode}
                listMode={this.props.listMode}
                gradeEmpty={this.props.gradeEmpty}
                tools={this.props.tools}
                drawSolutionShape={this.props.drawSolutionShape}
                starting={this.props.starting}
                correct={this.props.starting}
                transformations={this.props.correct.transformations}
                onChange={this.changeTransformer}
                trackInteraction={() => {}}
            />
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
    changeTransformer: function(changes, callback) {
        if (changes.transformations) {
            changes.correct = {
                transformations: changes.transformations
            };
            delete changes.transformations;
        }
        this.props.onChange(changes, callback);
    },

    serialize: function() {
        var json = this.refs.explorer.getEditorJSON();
        json.correct = json.answer;
        delete json.answer;
        return json;
    }
});

module.exports = TransformerEditor;
