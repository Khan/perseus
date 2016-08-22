/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const kpoint = require("kmath").point;
const kvector = require("kmath").vector;
const _ = require("underscore");

// Minify Raphael ourselves because IE8 has a problem with the 1.5.2 minified
// release
// http://groups.google.com/group/raphaeljs/browse_thread/thread/c34c75ad8d431544
/* globals Raphael:false */
require("../../lib/raphael.js");

const KhanMath = require("./math.js");
const processMath = require("./tex.js").processMath;
const KhanColors = require("./colors");

/* Convert cartesian coordinates [x, y] to polar coordinates [r,
 * theta], with theta in degrees, or in radians if angleInRadians is
 * specified.
 */
function cartToPolar(coord, angleInRadians) {
    const r = Math.sqrt(Math.pow(coord[0], 2) + Math.pow(coord[1], 2));
    let theta = Math.atan2(coord[1], coord[0]);
    // convert angle range from [-pi, pi] to [0, 2pi]
    if (theta < 0) {
        theta += 2 * Math.PI;
    }
    if (!angleInRadians) {
        theta = theta * 180 / Math.PI;
    }
    return [r, theta];
}

function polar(r, th) {
    if (typeof r === "number") {
        r = [r, r];
    }
    th = th * Math.PI / 180;
    return [r[0] * Math.cos(th), r[1] * Math.sin(th)];
}

const GraphUtils = {
    unscaledSvgPath: function(points) {
        // If this is an empty closed path, return "" instead of "z", which
        // would give an error
        if (points[0] === true) {
            return "";
        }
        return $.map(points, function(point, i) {
            if (point === true) {
                return "z";
            }
            return (i === 0 ? "M" : "L") + point[0] + " " + point[1];
        }).join("");
    },

    getDistance: function(point1, point2) {
        return kpoint.distanceToPoint(point1, point2);
    },

    /**
    * Return the difference between two sets of coordinates
    */
    coordDiff: function(startCoord, endCoord) {
        return _.map(endCoord, function(val, i) {
            return endCoord[i] - startCoord[i];
        });
    },

    /**
    * Round the given coordinates to a given snap value
    * (e.g., nearest 0.2 increment)
    */
    snapCoord: function(coord, snap) {
        return _.map(coord, function(val, i) {
            return KhanMath.roundToNearest(snap[i], val);
        });
    },

    // Find the angle in degrees between two or three points
    findAngle: function(point1, point2, vertex) {
        if (vertex === undefined) {
            const x = point1[0] - point2[0];
            const y = point1[1] - point2[1];
            if (!x && !y) {
                return 0;
            }
            return (180 + Math.atan2(-y, -x) * 180 / Math.PI + 360) % 360;
        } else {
            return GraphUtils.findAngle(point1, vertex) -
                GraphUtils.findAngle(point2, vertex);
        }
    },

    graphs: {},
};

const Graphie = GraphUtils.Graphie = function() {};

_.extend(Graphie.prototype, {
    cartToPolar: cartToPolar,
    polar: polar,
});

const labelDirections = {
    "center": [-0.5, -0.5],
    "above": [-0.5, -1.0],
    "above right": [0.0, -1.0],
    "right": [0.0, -0.5],
    "below right": [0.0, 0.0],
    "below": [-0.5, 0.0],
    "below left": [-1.0, 0.0],
    "left": [-1.0, -0.5],
    "above left": [-1.0, -1.0],
};

GraphUtils.createGraphie = function(el) {
    let xScale = 40;
    let yScale = 40;
    let xRange;
    let yRange;

    $(el).css("position", "relative");
    const raphael = Raphael(el);

    // For a sometimes-reproducible IE8 bug; doesn't affect SVG browsers at all
    $(el).children("div").css("position", "absolute");

    // Set up some reasonable defaults
    let currentStyle = {
        "stroke-width": 2,
        "fill": "none",
    };

    const scaleVector = function(point) {
        if (typeof point === "number") {
            return scaleVector([point, point]);
        }

        const x = point[0];
        const y = point[1];
        return [x * xScale, y * yScale];
    };

    const scalePoint = function scalePoint(point) {
        if (typeof point === "number") {
            return scalePoint([point, point]);
        }

        const x = point[0];
        const y = point[1];
        return [(x - xRange[0]) * xScale, (yRange[1] - y) * yScale];
    };

    const unscalePoint = function(point) {
        if (typeof point === "number") {
            return unscalePoint([point, point]);
        }

        const x = point[0];
        const y = point[1];
        return [x / xScale + xRange[0], yRange[1] - y / yScale];
    };

    const unscaleVector = function(point) {
        if (typeof point === "number") {
            return unscaleVector([point, point]);
        }

        return [point[0] / xScale, point[1] / yScale];
    };

    const setLabelMargins = function(span, size) {
        const $span = $(span);
        const direction = $span.data("labelDirection");
        $span.css("visibility", "");

        if (typeof direction === "number") {
            const x = Math.cos(direction);
            const y = Math.sin(direction);

            const scale = Math.min(
                size[0] / 2 / Math.abs(x),
                size[1] / 2 / Math.abs(y));

            $span.css({
                marginLeft: (-size[0] / 2) + x * scale,
                marginTop: (-size[1] / 2) - y * scale,
            });
        } else {
            const multipliers = labelDirections[direction || "center"];
            $span.css({
                marginLeft: Math.round(size[0] * multipliers[0]),
                marginTop: Math.round(size[1] * multipliers[1]),
            });
        }
    };

    const svgPath = function(points, alreadyScaled) {
        return $.map(points, function(point, i) {
            if (point === true) {
                return "z";
            } else {
                const scaled = alreadyScaled ? point : scalePoint(point);
                return (i === 0 ? "M" : "L") +
                    KhanMath.bound(scaled[0]) + " " + KhanMath.bound(scaled[1]);
            }
        }).join("");
    };

    const svgParabolaPath = function(a, b, c) {
        const computeParabola = function(x) {
            return (a * x + b) * x + c;
        };

        // If points are collinear, plot a line instead
        if (a === 0) {
            const points = _.map(xRange, function(x) {
                return [x, computeParabola(x)];
            });
            return svgPath(points);
        }

        // Calculate x coordinates of points on parabola
        const xVertex = -b / (2 * a);
        const distToEdge = Math.max(
            Math.abs(xVertex - xRange[0]),
            Math.abs(xVertex - xRange[1])
        );

        // To guarantee that drawn parabola to spans the viewport, use a point
        // on the edge of the graph furtherest from the vertex
        const xPoint = xVertex + distToEdge;

        // Compute parabola and other point on the curve
        const vertex = [xVertex, computeParabola(xVertex)];
        const point = [xPoint, computeParabola(xPoint)];

        // Calculate SVG 'control' point, defined by spec
        const control = [vertex[0], vertex[1] - (point[1] - vertex[1])];

        // Calculate mirror points across parabola's axis of symmetry
        const dx = Math.abs(vertex[0] - point[0]);
        const left = [vertex[0] - dx, point[1]];
        const right = [vertex[0] + dx, point[1]];

        // Scale and bound
        const points = _.map([left, control, right], scalePoint);
        const values = _.map(_.flatten(points), KhanMath.bound);
        return "M" + values[0] + "," + values[1] + " Q" + values[2] + "," +
            values[3] + " " + values[4] + "," + values[5];
    };

    const svgSinusoidPath = function(a, b, c, d) {
        // Plot a sinusoid of the form: f(x) = a * sin(b * x - c) + d
        const quarterPeriod = Math.abs(Math.PI / (2 * b));

        const computeSine = function(x) {
            return a * Math.sin(b * x - c) + d;
        };

        const computeDerivative = function(x) {
            return a * b * Math.cos(c - b * x);
        };

        const coordsForOffset = function(initial, i) {
            // Return the cubic coordinates (including the two anchor and two
            // control points) for the ith portion of the sinusoid.
            const x0 = initial + quarterPeriod * i;
            const x1 = x0 + quarterPeriod;

            // Interpolate using derivative technique
            // See: http://stackoverflow.com/questions/13932704/how-to-draw-sine-waves-with-svg-js
            const xCoords = [
                x0,
                x0 * 2 / 3 + x1 * 1 / 3,
                x0 * 1 / 3 + x1 * 2 / 3,
                x1,
            ];
            const yCoords = [
                computeSine(x0),
                computeSine(x0) + computeDerivative(x0) * (x1 - x0) / 3,
                computeSine(x1) - computeDerivative(x1) * (x1 - x0) / 3,
                computeSine(x1),
            ];

            // Zip and scale
            return _.map(_.zip(xCoords, yCoords), scalePoint);
        };

        // How many quarter-periods do we need to span the graph?
        const extent = xRange[1] - xRange[0];
        const numQuarterPeriods = Math.ceil(extent / quarterPeriod) + 1;

        // Find starting coordinate: first anchor point curve left of xRange[0]
        let initial = c / b;
        const distToEdge = initial - xRange[0];
        initial -= quarterPeriod * Math.ceil(distToEdge / quarterPeriod);

        // First portion of path is special-case, requiring move-to ('M')
        let coords = coordsForOffset(initial, 0);
        let path = "M" + coords[0][0] + "," + coords[0][1] + " C" +
            coords[1][0] + "," + coords[1][1] + " " + coords[2][0] + "," +
            coords[2][1] + " " + coords[3][0] + "," + coords[3][1];
        for (let i = 1; i < numQuarterPeriods; i++) {
            coords = coordsForOffset(initial, i);
            path += " C" + coords[1][0] + "," + coords[1][1] + " " +
                coords[2][0] + "," + coords[2][1] + " " + coords[3][0] + "," +
                coords[3][1];
        }

        return path;
    };

    // `svgPath` is independent of graphie range, so we export it independently
    GraphUtils.svgPath = svgPath;

    const processAttributes = function(attrs) {
        const transformers = {
            scale: function(scale) {
                if (typeof scale === "number") {
                    scale = [scale, scale];
                }

                xScale = scale[0];
                yScale = scale[1];

                // Update the canvas size
                raphael.setSize(
                    (xRange[1] - xRange[0]) * xScale,
                    (yRange[1] - yRange[0]) * yScale
                );
            },

            clipRect: function(pair) {
                const point = pair[0];
                const size = pair[1];
                point[1] += size[1]; // because our coordinates are flipped

                return {
                    "clip-rect": scalePoint(point)
                        .concat(scaleVector(size)).join(" "),
                };
            },

            strokeWidth: function(val) {
                return { "stroke-width": parseFloat(val) };
            },

            rx: function(val) {
                return { rx: scaleVector([val, 0])[0] };
            },

            ry: function(val) {
                return { ry: scaleVector([0, val])[1] };
            },

            r: function(val) {
                const scaled = scaleVector([val, val]);
                return { rx: scaled[0], ry: scaled[1] };
            },
        };

        const processed = {};
        $.each(attrs || {}, function(key, value) {
            const transformer = transformers[key];

            if (typeof transformer === "function") {
                $.extend(processed, transformer(value));
            } else {
                const dasherized = key.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
                    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
                    .toLowerCase();
                processed[dasherized] = value;
            }
        });

        return processed;
    };

    const addArrowheads = function arrows(path) {
        const type = path.constructor.prototype;

        if (type === Raphael.el) {
            if (path.type === "path" &&
                    typeof path.arrowheadsDrawn === "undefined") {
                const w = path.attr("stroke-width");
                const s = 0.6 + 0.4 * w;
                const l = path.getTotalLength();
                const set = raphael.set();
                const head = raphael.path(graphie.isMobile ?
                    "M-4,4 C-4,4 -0.25,0 -0.25,0 C-0.25,0 -4,-4 -4,-4" :
                    "M-3 4 C-2.75 2.5 0 0.25 0.75 0C0 -0.25 -2.75 -2.5 -3 -4");
                const end = path.getPointAtLength(l - 0.4);
                const almostTheEnd = path.getPointAtLength(l - 0.75 * s);
                const angle = Math.atan2(
                    end.y - almostTheEnd.y,
                    end.x - almostTheEnd.x) * 180 / Math.PI;
                const attrs = path.attr();
                delete attrs.path;

                let subpath = path.getSubpath(0, l - 0.75 * s);
                subpath = raphael.path(subpath).attr(attrs);
                subpath.arrowheadsDrawn = true;
                path.remove();

                // For some unknown reason 0 doesn't work for the rotation
                // origin so we use a tiny number.
                head.rotate(angle, graphie.isMobile ? 1e-5 : 0.75, 0)
                    .scale(s, s, 0.75, 0)
                    .translate(almostTheEnd.x, almostTheEnd.y).attr(attrs)
                    .attr({
                        "stroke-linejoin": "round",
                        "stroke-linecap": "round",
                    });

                head.arrowheadsDrawn = true;
                set.push(subpath);
                set.push(head);
                return set;
            }
        } else if (type === Raphael.st) {
            for (let i = 0, l = path.items.length; i < l; i++) {
                arrows(path.items[i]);
            }
        }
        return path;
    };

    const drawingTools = {
        circle: function(center, radius) {
            return raphael.ellipse(
                ...scalePoint(center).concat(scaleVector([radius, radius])));
        },

        // (x, y) is coordinate of bottom left corner
        rect: function(x, y, width, height) {
            // Raphael needs (x, y) to be coordinate of upper left corner
            const corner = scalePoint([x, y + height]);
            const dims = scaleVector([width, height]);
            const elem = raphael.rect(...corner.concat(dims));

            if (graphie.isMobile) {
                elem.node.style.shapeRendering = "crispEdges";
            }

            return elem;
        },

        ellipse: function(center, radii) {
            return raphael.ellipse(
                ...scalePoint(center).concat(scaleVector(radii)));
        },

        fixedEllipse: function(center, radii, maxScale, padding) {
            // Scale point and radius
            const scaledPoint = scalePoint(center);
            const scaledRadii = scaleVector(radii);

            const width = 2 * scaledRadii[0] * maxScale + padding;
            const height = 2 * scaledRadii[1] * maxScale + padding;

            // Calculate absolute left, top
            const left = scaledPoint[0] - width / 2;
            const top = scaledPoint[1] - height / 2;

            // Wrap in <div>
            const wrapper = document.createElement("div");
            $(wrapper).css({
                position: "absolute",
                width: width + "px",
                height: height + "px",
                left: left + "px",
                top: top + "px",
            });

            // Create Raphael canvas
            const localRaphael = Raphael(wrapper, width, height);
            const visibleShape = localRaphael.ellipse(
                width / 2,
                height / 2,
                scaledRadii[0],
                scaledRadii[1]
            );

            return {
                wrapper: wrapper,
                visibleShape: visibleShape,
            };
        },

        arc: function(center, radius, startAngle, endAngle, sector) {
            startAngle = (startAngle % 360 + 360) % 360;
            endAngle = (endAngle % 360 + 360) % 360;

            const cent = scalePoint(center);
            const radii = scaleVector(radius);
            const startVector = polar(radius, startAngle);
            const endVector = polar(radius, endAngle);

            const startPoint = scalePoint([
                center[0] + startVector[0],
                center[1] + startVector[1],
            ]);
            const endPoint = scalePoint([
                center[0] + endVector[0],
                center[1] + endVector[1],
            ]);

            const largeAngle =
                ((endAngle - startAngle) % 360 + 360) % 360 > 180;

            return raphael.path(
                "M" + startPoint.join(" ") +
                "A" + radii.join(" ") +
                " 0 " + // ellipse rotation
                (largeAngle ? 1 : 0) +
                " 0 " + // sweep flag
                endPoint.join(" ") +
                (sector ? "L" + cent.join(" ") + "z" : ""));
        },

        path: function(points) {
            const p = raphael.path(svgPath(points));
            p.graphiePath = points;

            return p;
        },

        fixedPath: function(points, center, createPath) {
            points = _.map(points, scalePoint);
            center = center ? scalePoint(center) : null;
            createPath = createPath || svgPath;

            const pathLeft = _.min(_.pluck(points, 0));
            const pathRight = _.max(_.pluck(points, 0));
            const pathTop = _.min(_.pluck(points, 1));
            const pathBottom = _.max(_.pluck(points, 1));

            // Apply padding to line
            const padding = [4, 4];

            // Calculate and apply additional offset
            const extraOffset = [pathLeft, pathTop];

            // Apply padding and offset to points
            points = _.map(points, function(point) {
                return kvector.add(
                    kvector.subtract(
                        point,
                        extraOffset
                    ),
                    kvector.scale(padding, 0.5)
                );
            });

            // Calculate <div> dimensions
            const width = (pathRight - pathLeft) + padding[0];
            const height = (pathBottom - pathTop) + padding[1];
            const left = extraOffset[0] - padding[0] / 2;
            const top = extraOffset[1] - padding[1] / 2;

            // Create <div>
            const wrapper = document.createElement("div");
            $(wrapper).css({
                position: "absolute",
                width: width + "px",
                height: height + "px",
                left: left + "px",
                top: top + "px",
                // If user specified a center, set it
                transformOrigin: center ? (width / 2 + center[0]) + "px " +
                    (height / 2 + center[1]) + "px"
                    : null,
            });

            // Create Raphael canvas
            const localRaphael = Raphael(wrapper, width, height);

            // Calculate path
            const visibleShape = localRaphael.path(createPath(points));

            return {
                wrapper: wrapper,
                visibleShape: visibleShape,
            };
        },

        scaledPath: function(points) {
            const p = raphael.path(svgPath(points, /* alreadyScaled */ true));
            p.graphiePath = points;
            return p;
        },

        line: function(start, end) {
            const l = this.path([start, end]);

            if (graphie.isMobile) {
                l.node.style.shapeRendering = "crispEdges";
            }

            return l;
        },

        parabola: function(a, b, c) {
            // Plot a parabola of the form: f(x) = (a * x + b) * x + c
            return raphael.path(svgParabolaPath(a, b, c));
        },

        fixedLine: function(start, end, thickness) {
            // Apply padding to line
            const padding = [thickness, thickness];

            // Scale points to get values in pixels
            start = scalePoint(start);
            end = scalePoint(end);

            // Calculate and apply additional offset
            const extraOffset = [
                Math.min(start[0], end[0]),
                Math.min(start[1], end[1]),
            ];

            // Apply padding and offset to start, end points
            start = kvector.add(
                kvector.subtract(
                    start,
                    extraOffset
                ),
                kvector.scale(padding, 0.5)
            );
            end = kvector.add(
                kvector.subtract(
                    end,
                    extraOffset
                ),
                kvector.scale(padding, 0.5)
            );

            // Calculate <div> dimensions
            const left = extraOffset[0] - padding[0] / 2;
            const top = extraOffset[1] - padding[1] / 2;
            const width = Math.abs(start[0] - end[0]) + padding[0];
            const height = Math.abs(start[1] - end[1]) + padding[1];

            // Create <div>
            const wrapper = document.createElement("div");
            $(wrapper).css({
                position: "absolute",
                width: width + "px",
                height: height + "px",
                left: left + "px",
                top: top + "px",
                // Outsiders should feel like the line's 'origin' (i.e., for
                // rotation) is the starting point
                transformOrigin: start[0] + "px " + start[1] + "px",
            });

            // Create Raphael canvas
            const localRaphael = Raphael(wrapper, width, height);

            // Calculate path
            const path = "M" + start[0] + " " + start[1] + " " +
                       "L" + end[0] + " " + end[1];
            const visibleShape = localRaphael.path(path);
            visibleShape.graphiePath = [start, end];

            return {
                wrapper: wrapper,
                visibleShape: visibleShape,
            };
        },

        sinusoid: function(a, b, c, d) {
            // Plot a sinusoid of the form: f(x) = a * sin(b * x - c) + d
            return raphael.path(svgSinusoidPath(a, b, c, d));
        },

        grid: function(xr, yr) {
            const step = currentStyle.step || [1, 1];
            const set = raphael.set();

            let x = step[0] * Math.ceil(xr[0] / step[0]);
            for (; x <= xr[1]; x += step[0]) {
                set.push(this.line([x, yr[0]], [x, yr[1]]));
            }

            let y = step[1] * Math.ceil(yr[0] / step[1]);
            for (; y <= yr[1]; y += step[1]) {
                set.push(this.line([xr[0], y], [xr[1], y]));
            }

            return set;
        },

        label: function(point, text, direction, latex) {
            latex = (typeof latex === "undefined") || latex;

            const $span = $("<span>").addClass("graphie-label");

            const pad = currentStyle["label-distance"];

            // TODO(alpert): Isn't currentStyle applied afterwards
            // automatically since this is a 'drawing tool'?
            $span
                .css($.extend({}, currentStyle, {
                    position: "absolute",
                    padding: (pad != null ? pad : 7) + "px",
                }))
                .data("labelDirection", direction)
                .appendTo(el);

            $span.setPosition = function(point) {
                const scaledPoint = scalePoint(point);
                $span.css({
                    left: scaledPoint[0],
                    top: scaledPoint[1],
                });
            };

            $span.setPosition(point);

            const span = $span[0];

            $span.processMath = function(math, force) {
                processMath(span, math, force, function() {
                    const width = span.scrollWidth;
                    const height = span.scrollHeight;
                    setLabelMargins(span, [width, height]);
                });
            };

            $span.processText = function(text) {
                $span.html(text);
                const width = span.scrollWidth;
                const height = span.scrollHeight;
                setLabelMargins(span, [width, height]);
            };

            if (latex) {
                $span.processMath(text, /* force */ false);
            } else {
                $span.processText(text);
            }

            return $span;
        },

        plotParametric: function(fn, range, shade, fn2) {
            // Note: fn2 should only be set if 'shade' is true, as it denotes
            // the function between which fn should have its area shaded.
            // In general, plotParametric shouldn't be used to shade the area
            // between two arbitrary parametrics functions over an interval,
            // as the method assumes that fn and fn2 are both of the form
            // fn(t) = (t, fn'(t)) for some initial fn'.
            fn2 = fn2 || function(t) { return [t, 0]; };

            if (!currentStyle.strokeLinejoin) {
                currentStyle.strokeLinejoin = "round";
            }
            if (!currentStyle.strokeLinecap) {
                currentStyle.strokeLinecap = "round";
            }

            const min = range[0];
            const max = range[1];
            let step = (max - min) / (currentStyle["plot-points"] || 800);
            if (step === 0) {
                step = 1;
            }

            const paths = raphael.set();
            let points = [];
            let lastDiff = GraphUtils.coordDiff(fn(min), fn2(min));

            let lastFlip = min;
            for (let t = min; t <= max; t += step) {
                const top = fn(t);
                const bottom = fn2(t);
                const diff = GraphUtils.coordDiff(top, bottom);

                // Find points where it flips
                // Create path that sketches area between the two functions
                if (
                    // if there is an asymptote here, meaning that the graph
                    // switches signs and has a large difference
                    ((diff[1] < 0) !== (lastDiff[1] < 0)) &&
                        Math.abs(diff[1] - lastDiff[1]) > 2 * yScale ||
                        // or the function value gets really high (which breaks
                        // raphael)
                        Math.abs(diff[1]) > 1e7 ||
                        // or the function is undefined
                        isNaN(diff[1])
                ) {
                    // split the path at this point, and draw it
                    if (shade) {
                        points.push(top);

                        // backtrack to draw paired function
                        for (let u = t - step; u >= lastFlip; u -= step) {
                            points.push(fn2(u));
                        }
                        lastFlip = t;
                    }
                    paths.push(this.path(points));
                    // restart the path, excluding this point
                    points = [];
                    if (shade) {
                        points.push(top);
                    }
                } else {
                    // otherwise, just add the point to the path
                    points.push(top);
                }

                lastDiff = diff;
            }

            if (shade) {
                // backtrack to draw paired function
                for (let u = max - step; u >= lastFlip; u -= step) {
                    points.push(fn2(u));
                }
            }
            paths.push(this.path(points));

            return paths;
        },

        plotPolar: function(fn, range) {
            const min = range[0];
            const max = range[1];

            // There is probably a better heuristic for this
            if (!currentStyle["plot-points"]) {
                currentStyle["plot-points"] = 2 * (max - min) * xScale;
            }

            return this.plotParametric(function(th) {
                return polar(fn(th), th * 180 / Math.PI);
            }, range);
        },

        plot: function(fn, range, swapAxes, shade, fn2) {
            const min = range[0];
            const max = range[1];
            if (!currentStyle["plot-points"]) {
                currentStyle["plot-points"] = 2 * (max - min) * xScale;
            }

            if (swapAxes) {
                if (fn2) {
                    // TODO(charlie): support swapped axis area shading
                    throw new Error(
                        "Can't shade area between functions with swapped axes."
                    );
                }
                return this.plotParametric(function(y) {
                    return [fn(y), y];
                }, range, shade);
            } else {
                if (fn2) {
                    if (shade) {
                        return this.plotParametric(function(x) {
                            return [x, fn(x)];
                        }, range, shade, function(x) {
                            return [x, fn2(x)];
                        });
                    } else {
                        throw new Error(
                            "fn2 should only be set when 'shade' is True."
                        );
                    }
                }
                return this.plotParametric(function(x) {
                    return [x, fn(x)];
                }, range, shade);
            }
        },

        /**
         * Given a piecewise function, return a Raphael set of paths that
         * can be used to draw the function, e.g. using style().
         * Calls plotParametric.
         *
         * @param  {[]} fnArray    array of functions which when called
         *                         with a parameter i return the value of
         *                         the function at i
         * @param  {[]} rangeArray array of ranges over which the
         *                         corresponding functions are defined
         * @return {Raphael set}
         */
        plotPiecewise: function(fnArray, rangeArray) {
            const paths = raphael.set();
            const self = this;
            _.times(fnArray.length, function(i) {
                const fn = fnArray[i];
                const range = rangeArray[i];
                const fnPaths = self.plotParametric(function(x) {
                    return [x, fn(x)];
                }, range);
                _.each(fnPaths, function(fnPath) {
                    paths.push(fnPath);
                });
            });

            return paths;
        },

        /**
         * Given an array of coordinates of the form [x, y], create and
         * return a Raphael set of Raphael circle objects at those
         * coordinates
         *
         * @param  {Array of arrays} endpointArray
         * @return {Raphael set}
         */
        plotEndpointCircles: function(endpointArray) {
            const circles = raphael.set();
            const self = this;

            _.each(endpointArray, function(coord, i) {
                circles.push(self.circle(coord, 0.15));
            });

            return circles;
        },

        plotAsymptotes: function(fn, range) {
            const min = range[0];
            const max = range[1];
            const step = (max - min) / (currentStyle["plot-points"] || 800);

            const asymptotes = raphael.set();
            let lastVal = fn(min);

            for (let t = min; t <= max; t += step) {
                const funcVal = fn(t);

                if (((funcVal < 0) !== (lastVal < 0)) &&
                        Math.abs(funcVal - lastVal) > 2 * yScale) {
                    asymptotes.push(
                        this.line([t, yScale], [t, -yScale])
                    );
                }

                lastVal = funcVal;
            }

            return asymptotes;
        },
    };

    const graphie = new Graphie();
    _.extend(graphie, {
        raphael: raphael,

        init: function(options) {
            let scale = options.scale || [40, 40];
            scale = (typeof scale === "number" ? [scale, scale] : scale);

            xScale = scale[0];
            yScale = scale[1];

            if (options.range == null) {
                return Khan.error("range should be specified in graph init");
            }

            xRange = options.range[0];
            yRange = options.range[1];

            const w = (xRange[1] - xRange[0]) * xScale;
            const h = (yRange[1] - yRange[0]) * yScale;
            raphael.setSize(w, h);

            $(el).css({
                "width": w,
                "height": h,
            });

            this.range = options.range;
            this.scale = scale;
            this.dimensions = [w, h];
            this.xpixels = w;
            this.ypixels = h;

            this.isMobile = options.isMobile;

            return this;
        },

        style: function(attrs, fn) {
            const processed = processAttributes(attrs);

            if (typeof fn === "function") {
                const oldStyle = currentStyle;
                currentStyle = $.extend({}, currentStyle, processed);
                const result = fn.call(graphie);
                currentStyle = oldStyle;
                return result;
            } else {
                $.extend(currentStyle, processed);
            }
        },

        scalePoint: scalePoint,
        scaleVector: scaleVector,

        unscalePoint: unscalePoint,
        unscaleVector: unscaleVector,

        // Custom SVG path functions that are dependent on graphie range
        // `svgPath`, while independent of range, is exported for consistency
        svgPath: svgPath,
        svgParabolaPath: svgParabolaPath,
        svgSinusoidPath: svgSinusoidPath,
    });

    $.each(drawingTools, function(name) {
        graphie[name] = function() {
            const last = arguments[arguments.length - 1];
            const oldStyle = currentStyle;
            let result;

            // The last argument is probably trying to change the style
            if (typeof last === "object" && !_.isArray(last)) {
                currentStyle = {
                    ...currentStyle,
                    ...processAttributes(last),
                };

                const rest = [].slice.call(arguments, 0, arguments.length - 1);
                result = drawingTools[name](...rest);
            } else {
                currentStyle = $.extend({}, currentStyle);

                result = drawingTools[name](...arguments);
            }

            // Bad heuristic for recognizing Raphael elements and sets
            const type = result.constructor.prototype;
            if (type === Raphael.el || type === Raphael.st) {
                result.attr(currentStyle);

                if (currentStyle.arrows) {
                    result = addArrowheads(result);
                }
            } else if (result instanceof $) {
                result.css(currentStyle);
            }

            currentStyle = oldStyle;
            return result;
        };
    });


    // Initializes graphie settings for a graph and draws the basic graph
    // features (axes, grid, tick marks, and axis labels)
    // Options expected are:
    // - range: [[a, b], [c, d]] or [a, b]
    // - scale: [a, b] or number
    // - gridOpacity: number (0 - 1)
    // - gridStep: [a, b] or number (relative to units)
    // - tickStep: [a, b] or number (relative to grid steps)
    // - tickLen: [a, b] or number (in pixels)
    // - labelStep: [a, b] or number (relative to tick steps)
    // - yLabelFormat: fn to format label string for y-axis
    // - xLabelFormat: fn to format label string for x-axis
    // - smartLabelPositioning: true or false to ignore minus sign
    graphie.graphInit = function(options) {

        options = options || {};

        $.each(options, function(prop, val) {

            // allow options to be specified by a single number for shorthand if
            // the horizontal and vertical components are the same
            if (!prop.match(/.*Opacity$/) && prop !== "range" &&
                typeof val === "number") {
                options[prop] = [val, val];
            }

            // allow symmetric ranges to be specified by the absolute values
            if (prop === "range" || prop === "gridRange") {
                if (val.constructor === Array) {
                    // but don't mandate symmetric ranges
                    if (val[0].constructor !== Array) {
                        options[prop] = [[-val[0], val[0]], [-val[1], val[1]]];
                    }
                } else if (typeof val === "number") {
                    options[prop] = [[-val, val], [-val, val]];
                }
            }

        });

        const range = options.range || [[-10, 10], [-10, 10]];
        const gridRange = options.gridRange || options.range;
        const scale = options.scale || [20, 20];
        const grid = options.grid != null ? options.grid : true;
        const gridOpacity = options.gridOpacity || 0.1;
        const gridStep = options.gridStep || [1, 1];
        const axes = options.axes != null ? options.axes : true;
        const axisArrows = options.axisArrows || "";
        const axisOpacity = options.axisOpacity || 1.0;
        const axisCenter = options.axisCenter || [
            Math.min(Math.max(range[0][0], 0), range[0][1]),
            Math.min(Math.max(range[1][0], 0), range[1][1]),
        ];
        const axisLabels = options.axisLabels != null ?
            options.axisLabels : false;
        const ticks = options.ticks != null ? options.ticks : true;
        const tickStep = options.tickStep || [2, 2];
        const tickLen = options.tickLen || [5, 5];
        const tickOpacity = options.tickOpacity || 1.0;
        const labels = options.labels || options.labelStep || false;
        const labelStep = options.labelStep || [1, 1];
        const labelOpacity = options.labelOpacity || 1.0;
        let unityLabels = options.unityLabels || false;
        const labelFormat = options.labelFormat || function(a) { return a; };
        let xLabelFormat = options.xLabelFormat || labelFormat;
        let yLabelFormat = options.yLabelFormat || labelFormat;
        const smartLabelPositioning = options.smartLabelPositioning != null ?
              options.smartLabelPositioning : true;
        const realRange = [
            [range[0][0] - (range[0][0] > 0 ? 1 : 0),
             range[0][1] + (range[0][1] < 0 ? 1 : 0)],
            [range[1][0] - (range[1][0] > 0 ? 1 : 0),
             range[1][1] + (range[1][1] < 0 ? 1 : 0)],
        ];

        if (!_.isArray(unityLabels)) {
            unityLabels = [unityLabels, unityLabels];
        }

        if (smartLabelPositioning) {
            const minusIgnorer = function(lf) {
                return function(a) {
                    return (lf(a) + "").replace(/-(\d)/g, "\\llap{-}$1");
                };
            };

            xLabelFormat = minusIgnorer(xLabelFormat);
            yLabelFormat = minusIgnorer(yLabelFormat);
        }

        this.init({
            range: realRange,
            scale: scale,
            isMobile: options.isMobile,
        });

        // draw grid
        if (grid) {
            this.grid(gridRange[0], gridRange[1], {
                stroke: options.isMobile ? KhanColors.GRAY_C : "#000000",
                opacity: options.isMobile ? 1 : gridOpacity,
                step: gridStep,
                strokeWidth: options.isMobile ? 1 : 2,
            });
        }

        // draw axes
        if (axes) {

            // this is a slight hack until <-> arrowheads work
            if (axisArrows === "<->" || axisArrows === true) {
                this.style({
                    stroke: options.isMobile ? KhanColors.GRAY_G : "#000000",
                    opacity: options.isMobile ? 1 : axisOpacity,
                    strokeWidth: options.isMobile ? 1 : 2,
                    arrows: "->",
                }, function() {
                    if (range[1][0] < 0 && range[1][1] > 0) {
                        this.path([
                            axisCenter,
                            [gridRange[0][0], axisCenter[1]],
                        ]);
                        this.path([
                            axisCenter,
                            [gridRange[0][1], axisCenter[1]],
                        ]);
                    }
                    if (range[0][0] < 0 && range[0][1] > 0) {
                        this.path([
                            axisCenter,
                            [axisCenter[0], gridRange[1][0]],
                        ]);
                        this.path([
                            axisCenter,
                            [axisCenter[0], gridRange[1][1]],
                        ]);
                    }
                });

            // also, we don't support "<-" arrows yet, but why you
            // would want that on your graph is beyond me.
            } else if (axisArrows === "->" || axisArrows === "") {
                this.style({
                    stroke: "#000000",
                    opacity: axisOpacity,
                    strokeWidth: 2,
                    arrows: axisArrows,
                }, function() {
                    this.path([
                        [gridRange[0][0], axisCenter[1]],
                        [gridRange[0][1], axisCenter[1]],
                    ]);
                    this.path([
                        [axisCenter[0], gridRange[1][0]],
                        [axisCenter[0], gridRange[1][1]],
                    ]);
                });

            }

            if (axisLabels && axisLabels.length === 2) {
                this.label(
                    [gridRange[0][1], axisCenter[1]], axisLabels[0], "right");
                this.label(
                    [axisCenter[0], gridRange[1][1]], axisLabels[1], "above");
            }

        }

        // draw tick marks
        if (ticks) {
            const halfWidthTicks = options.isMobile;
            this.style({
                stroke: options.isMobile ? KhanColors.GRAY_G : "#000000",
                opacity: options.isMobile ? 1 : tickOpacity,
                strokeWidth: 1,
            }, function() {

                // horizontal axis
                let step = gridStep[0] * tickStep[0];
                let len = tickLen[0] / scale[1];
                let start = gridRange[0][0];
                let stop = gridRange[0][1];

                if (range[1][0] < 0 && range[1][1] > 0) {
                    for (let x = step + axisCenter[0]; x <= stop; x += step) {
                        if (x < stop || !axisArrows) {
                            this.line(
                                [x, -len + axisCenter[1]],
                                [x, halfWidthTicks ? 0 : len + axisCenter[1]]
                            );
                        }
                    }

                    for (let x = -step + axisCenter[0]; x >= start; x -= step) {
                        if (x > start || !axisArrows) {
                            this.line(
                                [x, -len + axisCenter[1]],
                                [x, halfWidthTicks ? 0 : len + axisCenter[1]]
                            );
                        }
                    }
                }

                // vertical axis
                step = gridStep[1] * tickStep[1];
                len = tickLen[1] / scale[0];
                start = gridRange[1][0];
                stop = gridRange[1][1];

                if (range[0][0] < 0 && range[0][1] > 0) {
                    for (let y = step + axisCenter[1]; y <= stop; y += step) {
                        if (y < stop || !axisArrows) {
                            this.line(
                                [-len + axisCenter[0], y],
                                [halfWidthTicks ? 0 : len + axisCenter[0], y]
                            );
                        }
                    }

                    for (let y = -step + axisCenter[1]; y >= start; y -= step) {
                        if (y > start || !axisArrows) {
                            this.line(
                                [-len + axisCenter[0], y],
                                [halfWidthTicks ? 0 : len + axisCenter[0], y]
                            );
                        }
                    }
                }

            });
        }

        // draw axis labels
        if (labels) {
            this.style({
                stroke: options.isMobile ? KhanColors.GRAY_G : "#000000",
                opacity: options.isMobile ? 1 : labelOpacity,
            }, function() {

                // horizontal axis
                let step = gridStep[0] * tickStep[0] * labelStep[0];
                let start = gridRange[0][0];
                let stop = gridRange[0][1];
                const xAxisPosition = (axisCenter[0] < 0) ? "above" : "below";
                const yAxisPosition = (axisCenter[0] < 0) ? "right" : "left";
                const xShowZero = axisCenter[0] === 0 && axisCenter[1] !== 0;
                const yShowZero = axisCenter[0] !== 0 && axisCenter[1] === 0;
                const axisOffCenter = axisCenter[0] !== 0 ||
                    axisCenter[1] !== 0;
                const showUnityX = unityLabels[0] || axisOffCenter;
                const showUnityY = unityLabels[1] || axisOffCenter;

                // positive x-axis
                for (let x = (xShowZero ? 0 : step) + axisCenter[0];
                     x <= stop;
                     x += step) {
                    if (x < stop || !axisArrows) {
                        this.label(
                            [x, axisCenter[1]], xLabelFormat(x), xAxisPosition);
                    }
                }

                // negative x-axis
                for (let x = -step * (showUnityX ? 1 : 2) + axisCenter[0];
                     x >= start;
                     x -= step) {
                    if (x > start || !axisArrows) {
                        this.label(
                            [x, axisCenter[1]], xLabelFormat(x), xAxisPosition);
                    }
                }

                step = gridStep[1] * tickStep[1] * labelStep[1];
                start = gridRange[1][0];
                stop = gridRange[1][1];

                // positive y-axis
                for (let y = (yShowZero ? 0 : step) + axisCenter[1];
                     y <= stop;
                     y += step) {
                    if (y < stop || !axisArrows) {
                        this.label(
                            [axisCenter[0], y], yLabelFormat(y), yAxisPosition);
                    }
                }

                // negative y-axis
                for (let y = -step * (showUnityY ? 1 : 2) + axisCenter[1];
                     y >= start;
                     y -= step) {
                    if (y > start || !axisArrows) {
                        this.label(
                            [axisCenter[0], y], yLabelFormat(y), yAxisPosition);
                    }
                }
            });
        }
    };

    return graphie;
};

module.exports = GraphUtils;
