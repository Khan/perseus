/** @jsx React.DOM */
(function(Perseus) {

var ROTATE_SNAP_DEGREES = 15;
var DEGREE_SIGN = "\u00B0";
var RENDER_TRANSFORM_DELAY_IN_MS = 300;

var NumberInput = Perseus.NumberInput;
var GraphSettings = Perseus.Components.GraphSettings;
var Graph = Perseus.Components.Graph;
var TeX = Perseus.TeX;

var deepEq = Perseus.Util.deepEq;
var InfoTip = Perseus.InfoTip;

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

/* Does a pluck on keys inside objects in an object
 *
 * Ex:
 * tools = {
 *     translation: {
 *         enabled: true
 *     },
 *     rotation: {
 *         enabled: false
 *     }
 * };
 * pluckObject(tools, "enabled") returns {
 *     translation: true
 *     rotation: false
 * }
 */
function pluckObject(object, subKey) {
    return _.object(_.map(object, function (value, key) {
        return [key, value[subKey]];
    }));
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


/* Perform operations on raw transform objects */
var Transformations = {
    ALL: [
        {
            id: "translation",
            verbName: "Translate"
        },
        {
            id: "rotation",
            verbName: "Rotate"
        },
        {
            id: "reflection",
            verbName: "Reflect"
        },
        {
            id: "dilation",
            verbName: "Dilate"
        }
    ],

    apply: function(transform) {
        // Any transformation with empty text boxes is a no-op until
        // filled out (these show up as nulls in transform.vector/line/etc).
        // TODO (jack): Merge this just into reflections now that other
        // transforms are always valid (after merging transformation
        // collapsing, which may use isValid)
        if (!Transformations[transform.type].isValid(transform)) {
            return _.identity;  // do not transform the coord
        } else {
            return Transformations[transform.type].apply(transform);
        }
    },

    toString: function(transform) {
        return Transformations[transform.type].toString(transform);
    },

    /* A react representation of this transform object */
    ListItem: React.createClass({
        render: function() {
            if (this.props.mode === "dynamic") {
                return <div>
                    {Transformations.toString(this.props.transform)}
                </div>;
            } else if (this.props.mode === "interactive") {
                var transformClass =
                        Transformations[this.props.transform.type].Input;
                return transformClass(_.extend({
                    ref: "transform",
                    onChange: this.handleChange
                }, this.props.transform));
            } else {
                throw new Error("Invalid mode: " + this.props.mode);
            }
        },
        value: function() {
            if (this.props.mode === "interactive") {
                return _.extend({
                    type: this.props.transform.type,
                }, this.refs.transform.value());
            } else {
                return this.props.transform;
            }
        },
        handleChange: _.debounce(function() {
            this.props.onChange(this.value());
        }, RENDER_TRANSFORM_DELAY_IN_MS)
    }),

    translation: {
        apply: function(transform) {
            return function(coord) {
                return KhanUtil.kvector.add(coord, transform.vector);
            };
        },
        isValid: function(transform) {
            return _.isFinite(transform.vector[0]) &&
                _.isFinite(transform.vector[1]);
        },
        toString: function(transform) {
            return "Translation by " + stringFromVector(transform.vector);
        },
        Input: React.createClass({
            render: function() {
                return <div>
                    Translation by
                    <TeX>\langle</TeX>
                    <NumberInput
                        ref="x"
                        placeholder={0}
                        value={this.props.vector[0]}
                        onChange={this.props.onChange} />
                    <TeX>{", {}"}</TeX>
                    <NumberInput
                        ref="y"
                        placeholder={0}
                        value={this.props.vector[1]}
                        onChange={this.props.onChange} />
                    <TeX>\rangle</TeX>
                </div>;
            },
            value: function() {
                var x = this.refs.x.getValue();
                var y = this.refs.y.getValue();
                return {
                    vector: [x, y]
                };
            }
        })
    },

    rotation: {
        apply: function(transform) {
            return function(coord) {
                return KhanUtil.kpoint.rotateDeg(coord, transform.angleDeg,
                        transform.center);
            };
        },
        isValid: function(transform) {
            return _.isFinite(transform.angleDeg) &&
                _.isFinite(transform.center[0]) &&
                _.isFinite(transform.center[1]);
        },
        toString: function(transform) {
            return "Rotation by " + stringFromDecimal(transform.angleDeg) +
                    DEGREE_SIGN + " about " +
                    stringFromPoint(transform.center);
        },
        Input: React.createClass({
            render: function() {
                return <div>
                    Rotation about <TeX>(</TeX>
                    <NumberInput
                        ref="centerX"
                        placeholder={0}
                        value={this.props.center[0]}
                        onChange={this.props.onChange} />
                    <TeX>{", {}"}</TeX>
                    <NumberInput
                        ref="centerY"
                        placeholder={0}
                        value={this.props.center[1]}
                        onChange={this.props.onChange} />
                    <TeX>)</TeX> by
                    <NumberInput
                        ref="angleDeg"
                        placeholder={0}
                        value={this.props.angleDeg}
                        onChange={this.props.onChange} />
                    {DEGREE_SIGN}
                </div>;
            },
            value: function() {
                var angleDeg = this.refs.angleDeg.getValue();
                var centerX = this.refs.centerX.getValue();
                var centerY = this.refs.centerY.getValue();
                return {
                    angleDeg: angleDeg,
                    center: [centerX, centerY]
                };
            }
        })
    },

    reflection: {
        apply: function(transform) {
            return function(coord) {
                return KhanUtil.kpoint.reflectOverLine(
                    coord,
                    transform.line
                );
            };
        },
        isValid: function(transform) {
            // A bit hacky, but we'll also define reflecting over a
            // single point as a no-op, to avoid NaN fun.
            return _.all(_.flatten(transform.line), _.isFinite) &&
                    !deepEq(transform.line[0], transform.line[1]);
        },
        toString: function(transform) {
            var point1 = transform.line[0];
            var point2 = transform.line[1];
            return "Reflection over the line from " +
                    stringFromPoint(point1) + " to " +
                    stringFromPoint(point2);
        },
        Input: React.createClass({
            render: function() {
                return <div>
                    Reflection over the line from
                    <TeX>(</TeX>
                    <NumberInput
                        ref="x1"
                        allowEmpty={true}
                        value={this.props.line[0][0]}
                        onChange={this.props.onChange} />
                    <TeX>{", {}"}</TeX>
                    <NumberInput
                        ref="y1"
                        allowEmpty={true}
                        value={this.props.line[0][1]}
                        onChange={this.props.onChange} />
                    <TeX>)</TeX> to <TeX>(</TeX>
                    <NumberInput
                        ref="x2"
                        allowEmpty={true}
                        value={this.props.line[1][0]}
                        onChange={this.props.onChange} />
                    <TeX>{", {}"}</TeX>
                    <NumberInput
                        ref="y2"
                        allowEmpty={true}
                        value={this.props.line[1][1]}
                        onChange={this.props.onChange} />
                    <TeX>)</TeX>
                </div>;
            },
            value: function() {
                var x1 = this.refs.x1.getValue();
                var y1 = this.refs.y1.getValue();
                var x2 = this.refs.x2.getValue();
                var y2 = this.refs.y2.getValue();
                return {
                    line: [[x1, y1], [x2, y2]]
                };
            }
        })
    },

    dilation: {
        apply: function(transform) {
            return function(coord) {
                return dilatePointFromCenter(coord, transform.center,
                        transform.scale);
            };
        },
        isValid: function(transform) {
            return _.isFinite(transform.scale) &&
                _.isFinite(transform.center[0]) &&
                _.isFinite(transform.center[1]);
        },
        toString: function(transform) {
            var scaleString = stringFromFraction(transform.scale);
            return "Dilation of scale " + scaleString + " about " +
                    stringFromPoint(transform.center);
        },
        Input: React.createClass({
            render: function() {
                return <div>
                    Dilation about
                    <TeX>(</TeX>
                    <NumberInput
                        ref="x"
                        placeholder={0}
                        value={this.props.center[0]}
                        onChange={this.props.onChange} />
                    <TeX>{", {}"}</TeX>
                    <NumberInput
                        ref="y"
                        placeholder={0}
                        value={this.props.center[1]}
                        onChange={this.props.onChange} />
                    <TeX>)</TeX> by scale
                    <NumberInput
                        ref="scale"
                        placeholder={1}
                        value={this.props.scale}
                        onChange={this.props.onChange} />
                </div>;
            },
            value: function() {
                var scale = this.refs.scale.getValue();
                var x = this.refs.x.getValue();
                var y = this.refs.y.getValue();
                return {
                    scale: scale,
                    center: [x, y]
                };
            }
        })
    }
};


/* Various functions to deal with different shape types */
var ShapeTypes = {
    getPointCountForType: function(type) {
        var splitType = type.split("-");
        if (splitType[0] === "polygon") {
            return splitType[1] || 3;
        } else if (splitType[0] === "line" ||
                splitType[0] === "lineSegment") {
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

                var moveVector = KhanUtil.kvector.subtract(
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
                            point.setCoord(KhanUtil.kvector.add(
                                point.coord,
                                moveVector
                            ));
                        }
                    });
                }
                shape.update();
                return KhanUtil.kvector.add(currentPoint.coord, moveVector);
            };

            var onMoveEnd = options.onMoveEnd && function() {
                // onMove isn't guaranteed to be called before onMoveEnd, so
                // we have to take into account that we may not have moved and
                // set previousCoord.
                if (isMoving) {
                    isMoving = false;
                    // We don't use the supplied x and y parameters here
                    // because MovablePoint's onMoveEnd semantics suck.
                    // It returns the mouseX, mouseY without processing them
                    // through onMove, leaving us with weird fractional moves
                    var change = KhanUtil.kvector.subtract(
                        currentPoint.coord,
                        previousCoord
                    );
                    options.onMoveEnd(change[0], change[1]);
                }
            };

            currentPoint = graphie.addMovablePoint({
                coord: coord,
                normalStyle: options.pointStyle,
                highlightStyle: options.pointStyle,
                constraints: {
                    fixed: !options.translatable && !options.editable
                },
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

        var types = options.shape.type;
        if (!_.isArray(types)) {
            types = [types];
        }
        var nextPoints = _.clone(points);

        var shapes = _.map(types, function(type) {
            var pointCount = ShapeTypes.getPointCountForType(type);
            var points = _.first(nextPoints, pointCount);
            nextPoints = _.rest(nextPoints, pointCount);
            return ShapeTypes.addType(graphie, type, points, options);
        });

        var updateFuncs = _.filter(_.pluck(shapes, "update"), _.identity);
        var update = function() {
            _.invoke(updateFuncs, "call");
        };

        var removeFuncs = _.filter(_.pluck(shapes, "remove"), _.identity);
        var remove = function() {
            _.invoke(removeFuncs, "call");
        };

        return {
            type: types,
            points: points,
            update: update,
            remove: remove,
            toJSON: function() {
                return {
                    type: types,
                    coords: _.pluck(points, "coord")
                };
            }
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
                fixed: !options.editable,
                snapX: options.snap && options.snap[0] || 0,
                snapY: options.snap && options.snap[1] || 0,
                points: points,
                constrainToGraph: false
            }));
            return {
                update: _.bind(polygon.transform, polygon),
                remove: _.bind(polygon.remove, polygon)
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
            return {
                update: _.bind(line.transform, line, true),
                remove: _.bind(line.remove, line)
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
    }
};


/* A checkbox that syncs its value to props using the
 * renderer's onChange method, and gets the prop name
 * dynamically from its props list
 */
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
            {" "}
            <PropCheckBox
                label="enabled:"
                enabled={this.props.settings.enabled}
                onChange={this.props.onChange} />
            {" "}
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
            <div>
                Mode:
                <select value={this.getMode()}
                        onChange={this.changeMode}>
                    <option value="exploration">Exploration</option>
                    <option value="formal1">Formal with movement</option>
                    <option value="formal2">Formal without movement</option>
                </select>
                <InfoTip>
                    <ul>
                        <li>
                            <b>Exploration:</b> Students create
                            transformations with tools on the graph.
                        </li>
                        <li>
                            <b>Formal with movement:</b> Students specify
                            transformations mathematically in the
                            transformation list. Graph shows the results of
                            these transformations.
                        </li>
                        <li>
                            <b>Formal without movement:</b> Students specify
                            transformations mathematically in the
                            transformation list. Graph does not update.
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
        if (this.props.graphMode === "interactive") {
            return "exploration";
        } else if (this.props.graphMode === "dynamic") {
            return "formal1";
        } else if (this.props.graphMode === "static") {
            return "formal2";
        } else {
            throw new Error("invalid graphMode: " + this.props.graphMode);
        }
    },

    changeMode: function(e) {
        var selected = e.target.value;
        var graphMode, listMode;

        if (selected === "exploration") {
            graphMode = "interactive";
            listMode = "dynamic";
        } else if (selected === "formal1") {
            graphMode = "dynamic";
            listMode = "interactive";
        } else if (selected === "formal2") {
            graphMode = "static";
            listMode = "interactive";
        } else {
            throw new Error("invalid menu selection: " + selected);
        }

        this.props.onChange({
            graphMode: graphMode,
            listMode: listMode
        });
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
                    2 line segments
                </option>
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

    componentDidUpdate: function(prevProps) {
        if (!deepEq(prevProps.shape, this.props.shape)) {
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
            editable: true,
            snap: graphie.snap,
            shape: this.props.shape,
            onMoveEnd: this.updateCoords
        });
    },

});

var TransformationListItem = Transformations.ListItem;

var TransformationList = React.createClass({
    render: function() {
        if (this.props.mode === "static") {
            return <span />;  // don't render anything
        }

        var transformationList = _.map(
            this.props.transformations,
            function(transform, i) {
                return <TransformationListItem
                            ref={"transformation" + i}
                            key={"transformation" + i}
                            transform={transform}
                            mode={this.props.mode}
                            onChange={this.handleChange} />;
            },
            this
        );

        return <div className="perseus-transformation-list">
            {transformationList}
        </div>;
    },

    value: function() {
        return _.times(this.props.transformations.length, function(i) {
            return this.refs["transformation" + i].value();
        }, this);
    },

    handleChange: function() {
        this.props.onChange(this.value());
    }
});

var ToolButton = React.createClass({
    render: function() {
        var classes = "simple-button blue";
        if (this.props.toggled) {
            classes += " toggled";
        }
        return <button
                type="button"
                className={classes}
                onClick={this.props.onClick}>
            {this.props.displayName}
        </button>;
    }
});

var ToolsBar = React.createClass({
    getInitialState: function() {
        return {
            selected: null
        };
    },

    render: function() {
        var tools = _.map(Transformations.ALL, function(tool) {
            if (this.props.enabled[tool.id]) {
                return <ToolButton
                    key={tool.id}
                    displayName={tool.verbName}
                    toggled={this.state.selected === tool.id}
                    onClick={_.bind(this.changeSelected, this, tool.id)} />;
            }
        }, this);

        return <div>
            {tools}
            <button
                className="transformer-undo-button simple-button orange"
                type="button"
                onClick={this.props.onUndoClick}>
                Undo
            </button>
        </div>;
    },

    changeSelected: function(tool) {
        this.props.removeTool(this.state.selected);

        // If this is just a button bar, don't select anything,
        // but call addTool
        if (!this.props.togglable && !this.state.selected) {
            if (tool) {
                this.props.addTool(tool);
            }
            return;
        }

        if (!tool || tool === this.state.selected) {
            this.setState({
                selected: null
            });
        } else {
            this.props.addTool(tool);
            this.setState({
                selected: tool
            });
        }
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
        // Fill in any missing value in this.props.graph
        // this can happen because the graph json doesn't include
        // box, for example
        var graph = _.extend(
                defaultGraphProps(this.props.graph, defaultBoxSize),
                this.props.graph
        );

        var interactiveToolsMode = this.props.graphMode === "interactive";

        return <div className={"perseus-widget " +
                        "perseus-widget-transformer"}>

            {/* This style is applied inline because it is dependent on the
              * size of the graph as set by the graph.box prop, and this also
              * lets us specify it in the same place the graph's width is
              * specified.
              */}
            <div style={{width: graph.box[0]}}>
                <Graph
                    ref="graph"
                    box={graph.box}
                    range={graph.range}
                    step={graph.step}
                    markings={graph.markings}
                    backgroundImage={graph.backgroundImage}
                    showProtractor={graph.showProtractor}
                    onNewGraphie={this.setupGraphie} />
                <ToolsBar
                    ref="toolsBar"
                    enabled={pluckObject(this.props.tools, "enabled")}
                    addTool={this.addTool}
                    removeTool={this.removeTool}
                    onUndoClick={this.handleUndoClick} />
            </div>

            <TransformationList
                mode={this.props.listMode}
                transformations={this.props.transformations}
                onChange={this.setTransformationProps} />

        </div>;
    },

    componentDidUpdate: function(prevProps) {
        if (this.shouldSetupGraphie(this.props, prevProps)) {
            this.refs.graph.reset();
        } else if (!deepEq(this.props.transformations,
                this.transformations)) {
            this.setTransformations(this.props.transformations);
        }
    },

    shouldSetupGraphie: function(nextProps, prevProps) {
        if (!deepEq(prevProps.starting, nextProps.starting)) {
            return true;
        } else if (prevProps.graphMode !== nextProps.graphMode) {
            return true;
        } else if (prevProps.listMode !== nextProps.listMode) {
            return true;
        } else if (prevProps.drawSolutionShape !==
                nextProps.drawSolutionShape) {
            return true;
        } else if (nextProps.drawSolutionShape && !deepEq(
                prevProps.correct.shape, nextProps.correct.shape)) {
            return true;
        } else if (!deepEq(this.tools, nextProps.tools)) {
            return true;
        } else {
            return false;
        }
    },

    graphie: function() {
        return this.refs.graph.graphie();
    },

    setupGraphie: function() {
        var self = this;

        var graphie = this.graphie();

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

        this.currentTool = null;
        this.refs.toolsBar.changeSelected(null);
        this.addTransformerShape(this.props.starting.shape,
                /* translatable */ false);
        this.setTransformations(this.props.transformations);

        // Save a copy of our tools so that we can check future
        // this.props.tools changes against them
        // This seems weird, but gives us an easy way to tell whether
        // props changes were self-inflicted (for which a graphie reset
        // is not required, and is in fact a bad idea right now because
        // of resetting the size of the dilation tool).
        // TODO (jack): A deepClone method would be nice here
        this.tools = {
            translation: _.clone(this.props.tools.translation),
            rotation: _.clone(this.props.tools.rotation),
            reflection: _.clone(this.props.tools.reflection),
            dilation: _.clone(this.props.tools.dilation)
        };
    },

    /* Applies all transformations in `transformations`
     * to the starting shape, and updates this.transformations
     * to reflect this
     *
     * Usually called with this.props.transformations
     */
    setTransformations: function(transformations) {
        this.resetCoords();
        this.transformations = _.clone(transformations);
        _.each(this.transformations, this.applyTransform);
    },

    // the polygon that we transform
    addTransformerShape: function(shape, translatable) {
        var self = this;
        var graphie = this.graphie();

        this.shape = ShapeTypes.addMovableShape(graphie, {
            shape: shape,
            editable: false,
            translatable: translatable,
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
                fill: (translatable ? KhanUtil.ORANGE : KhanUtil.BLUE),
                stroke: (translatable ? KhanUtil.ORANGE : KhanUtil.BLUE)
            }
        });
    },

    addTool: function(toolId) {
        if (this.props.graphMode === "interactive") {
            if (toolId === "translation") {
                this.currentTool = this.addTranslationTool();
            } else if (toolId === "rotation") {
                this.currentTool = this.addRotationTool();
            } else if (toolId === "reflection") {
                this.currentTool = this.addReflectionTool();
            } else if (toolId === "dilation") {
                this.currentTool = this.addDilationTool();
            } else {
                throw new Error("Invalid tool id: " + toolId);
            }
        } else {
            if (toolId === "translation") {
                this.doTransform({
                    type: toolId,
                    vector: [null, null]
                });
            } else if (toolId === "rotation") {
                this.doTransform({
                    type: toolId,
                    center: [null, null],
                    angleDeg: null
                });
            } else if (toolId === "reflection") {
                // Reflections with nulls in them won't be applied until
                // fills in the blanks
                this.doTransform({
                    type: toolId,
                    line: [[null, null], [null, null]]
                });
            } else if (toolId === "dilation") {
                this.doTransform({
                    type: toolId,
                    center: [null, null],
                    scale: null
                });
            } else {
                throw new Error("Invalid tool id: " + toolId);
            }
        }
    },

    removeTool: function(toolId) {
        if (this.currentTool) {
            this.currentTool.remove();
        }
        this.currentTool = null;
    },

    addTranslationTool: function() {
        var self = this;
        this.shape.remove();
        this.addTransformerShape(this.shape.toJSON(),
                /* translatable */ true);

        return {
            remove: function() {
                self.shape.remove();
                self.addTransformerShape(self.shape.toJSON(),
                        /* translatable */ false);
            }
        };
    },

    addReflectionTool: function() {
        var options = this.props.tools.reflection;
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

        return {
            remove: function() {
                self.reflectLine.remove();
                self.reflectPoints[0].remove();
                self.reflectPoints[1].remove();
                self.reflectButton.remove();
            }
        };
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

    addRotationTool: function() {
        var options = this.props.tools.rotation;
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

        return {
            remove: function() {
                self.rotateHandle.remove();
                self.rotatePoint.remove();
            }
        };
    },

    addDilationTool: function() {
        var options = this.props.tools.dilation;
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

        return {
            remove: function() {
                self.dilationCircle.remove();
            }
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
        if (this.props.graphMode !== "static") {
            var transformFunc = Transformations.apply(transform);
            this.applyCoordTransformation(transformFunc);
        }
    },

    // transform our polygon by transforming each point using a given function
    applyCoordTransformation: function(pointTransform) {
        _.each(this.shape.points, function(point) {
            var newCoord = pointTransform(point.coord);
            point.setCoord(newCoord);
        });
        this.shape.update();
    },

    resetCoords: function() {
        var startCoords = this.props.starting.shape.coords;
        _.each(this.shape.points, function(point, i) {
            point.setCoord(startCoords[i]);
        });
        this.shape.update();
    },

    // Remove the last transfromation
    handleUndoClick: function() {
        this.refs.toolsBar.changeSelected(null);
        if (this.props.transformations.length) {
            this.props.onChange({
                transformations: _.initial(this.props.transformations)
            });
        }
    },

    setTransformationProps: function(newTransfomationList) {
        this.props.onChange({
            transformations: newTransfomationList
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

    getCoords: function() {
        var startCoords = this.props.starting.shape.coords;
        var transforms = this.props.transformations;
        return _.reduce(transforms, function (coords, transform) {
            return _.map(coords, Transformations.apply(transform));
        }, startCoords);
    },

    toJSON: function() {
        var json = _.pick(this.props, "grading", "starting", "graphMode",
                "listMode", "tools", "drawSolutionShape");
        json.graph = this.refs.graph.toJSON();
        json.answer = {
            transformations: this.props.transformations,
            shape: {
                type: this.shape.type,
                coords: this.getCoords()
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
            graphMode: "interactive",
            listMode: "dynamic",
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
                onChange={this.changeStarting} />
            <div>Solution transformations:</div>
            <Transformer
                ref="explorer"
                graph={graph}
                graphMode={this.props.graphMode}
                listMode={this.props.listMode}
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
