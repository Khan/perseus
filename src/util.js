var nestedMap = function(children, func, context) {
    if (_.isArray(children)) {
        return _.map(children, function(child) {
            return nestedMap(child, func);
        });
    } else {
        return func.call(context, children);
    }
};

var Util = {
    nestedMap: nestedMap,

    rWidgetParts: /^\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]$/,

    noScore: {
        type: "points",
        earned: 0,
        total: 0,
        message: null
    },

    asc: function(text) {  // 全型轉半型的 function
            if (typeof text != "string") {
                return text
            }
            var asciiTable = "!\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
            var big5Table = "%uFF01%u201D%uFF03%uFF04%uFF05%uFF06%u2019%uFF08%uFF09%uFF0A%uFF0B%uFF0C%uFF0D%uFF0E%uFF0F%uFF10%uFF11%uFF12%uFF13%uFF14%uFF15%uFF16%uFF17%uFF18%uFF19%uFF1A%uFF1B%uFF1C%uFF1D%uFF1E%uFF1F%uFF20%uFF21%uFF22%uFF23%uFF24%uFF25%uFF26%uFF27%uFF28%uFF29%uFF2A%uFF2B%uFF2C%uFF2D%uFF2E%uFF2F%uFF30%uFF31%uFF32%uFF33%uFF34%uFF35%uFF36%uFF37%uFF38%uFF39%uFF3A%uFF3B%uFF3C%uFF3D%uFF3E%uFF3F%u2018%uFF41%uFF42%uFF43%uFF44%uFF45%uFF46%uFF47%uFF48%uFF49%uFF4A%uFF4B%uFF4C%uFF4D%uFF4E%uFF4F%uFF50%uFF51%uFF52%uFF53%uFF54%uFF55%uFF56%uFF57%uFF58%uFF59%uFF5A%uFF5B%uFF5C%uFF5D%uFF5E";

            var result = "";
            for (var i = 0; i < text.length; i++) {
                var val = escape(text.charAt(i));
                var j = big5Table.indexOf(val);
                result += (((j > -1) && (val.length == 6)) ? asciiTable.charAt(j / 6) : text.charAt(i));
            }
            return result;
    },

    seededRNG: function(seed) {
        var randomSeed = seed;

        return function() {
            // Robert Jenkins' 32 bit integer hash function.
            var seed = randomSeed;
            seed = ((seed + 0x7ed55d16) + (seed << 12)) & 0xffffffff;
            seed = ((seed ^ 0xc761c23c) ^ (seed >>> 19)) & 0xffffffff;
            seed = ((seed + 0x165667b1) + (seed << 5)) & 0xffffffff;
            seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
            seed = ((seed + 0xfd7046c5) + (seed << 3)) & 0xffffffff;
            seed = ((seed ^ 0xb55a4f09) ^ (seed >>> 16)) & 0xffffffff;
            return (randomSeed = (seed & 0xfffffff)) / 0x10000000;
        };
    },

    // Shuffle an array using a given random seed or function.
    // If `ensurePermuted` is true, the input and ouput are guaranteed to be
    // distinct permutations.
    shuffle: function(array, randomSeed, ensurePermuted) {
        // Always return a copy of the input array
        var shuffled = _.clone(array);

        // Handle edge cases (input array is empty or uniform)
        if (!shuffled.length || _.all(shuffled, function(value) {
                                    return _.isEqual(value, shuffled[0]);
                                })) {
            return shuffled;
        }

        var random;
        if (_.isFunction(randomSeed)) {
            random = randomSeed;
        } else {
            random = Util.seededRNG(randomSeed);
        }

        do {
            // Fischer-Yates shuffle
            for (var top = shuffled.length; top > 0; top--) {
                var newEnd = Math.floor(random() * top),
                    temp = shuffled[newEnd];

                shuffled[newEnd] = shuffled[top - 1];
                shuffled[top - 1] = temp;
            }
        } while (ensurePermuted && _.isEqual(array, shuffled));

        return shuffled;
    },

    // In IE8, split doesn't work right. Implement it ourselves.
    split: "x".split(/(.)/g).length ?
        function(str, r) { return str.split(r); } :
        function(str, r) {
            // Based on Steven Levithan's MIT-licensed split, available at
            // http://blog.stevenlevithan.com/archives/cross-browser-split
            var output = [];
            var lastIndex = r.lastIndex = 0;
            var match;

            while ((match = r.exec(str))) {
                output.push(str.slice(lastIndex, match.index));
                output.push.apply(output, match.slice(1));
                lastIndex = match.index + match[0].length;
            }

            output.push(str.slice(lastIndex));
            return output;
        },

    /**
     * Given two score objects for two different widgets, combine them so that
     * if one is wrong, the total score is wrong, etc.
     */
    combineScores: function(scoreA, scoreB) {
        var message;

        if (scoreA.type === "points" && scoreB.type === "points") {
            if (scoreA.message && scoreB.message &&
                    scoreA.message !== scoreB.message) {
                // TODO(alpert): Figure out how to combine messages usefully
                message = null;
            } else {
                message = scoreA.message || scoreB.message;
            }

            return {
                type: "points",
                earned: scoreA.earned + scoreB.earned,
                total: scoreA.total + scoreB.total,
                message: message
            };

        } else if (scoreA.type === "points" && scoreB.type === "invalid") {
            return scoreB;

        } else if (scoreA.type === "invalid" && scoreB.type === "points") {
            return scoreA;

        } else if (scoreA.type === "invalid" && scoreB.type === "invalid") {
            if (scoreA.message && scoreB.message &&
                    scoreA.message !== scoreB.message) {
                // TODO(alpert): Figure out how to combine messages usefully
                message = null;
            } else {
                message = scoreA.message || scoreB.message;
            }

            return {
                type: "invalid",
                message: message
            };
        }
    },

    /**
     * Return the first valid interpretation of 'text' as a number, in the form
     * {value: 2.3, exact: true}.
     */
    firstNumericalParse: function(text) {
        // TODO(alpert): This is sort of hacky...
        var first;
        var val = Khan.answerTypes.predicate.createValidatorFunctional(
            function(ans) {
                first = ans;
                return true;  /* break */
            }, {
                simplify: "optional",
                inexact: true,
                forms: "integer, proper, improper, pi, log, mixed, decimal"
            });

        val(text);
        return first;
    },

    stringArrayOfSize: function(size) {
        return _(size).times(function() {
            return "";
        });
    },

    /**
     * For a graph's x or y dimension, given the tick step,
     * the ranges extent (e.g. [-10, 10]), the pixel dimension constraint,
     * and the grid step, return a bunch of configurations for that dimension.
     *
     * Example:
     *      gridDimensionConfig(10, [-50, 50], 400, 5)
     *
     * Returns: {
     *      scale: 4,
     *      snap: 2.5,
     *      tickStep: 2,
     *      unityLabel: true
     * };
     */
    gridDimensionConfig: function(absTickStep, extent, dimensionConstraint,
                                     gridStep) {
        var scale = Util.scaleFromExtent(extent, dimensionConstraint);
        var stepPx = absTickStep * scale;
        var unityLabel = stepPx > 30;
        return {
            scale: scale,
            tickStep: absTickStep / gridStep,
            unityLabel: unityLabel
        };
    },

    /**
     * Given the range, step, and boxSize, calculate the reasonable gridStep.
     * Used for when one was not given explicitly.
     *
     * Example:
     *      getGridStep([[-10, 10], [-10, 10]], [1, 1], 340)
     *
     * Returns: [1, 1]
     */
    getGridStep: function(range, step, boxSize) {
        return _(2).times(function(i) {
            var scale = Util.scaleFromExtent(range[i], boxSize);
            var gridStep = Util.gridStepFromTickStep(step[i], scale);
            return gridStep;
        });
    },

    snapStepFromGridStep: function(gridStep) {
        return _.map(gridStep, function(step) { return step / 2; });
    },

    /**
     * Given the range and a dimension, come up with the appropriate
     * scale.
     * Example:
     *      scaleFromExtent([-25, 25], 500) // returns 10
     */
    scaleFromExtent: function(extent, dimensionConstraint) {
        var span = extent[1] - extent[0];
        var scale = dimensionConstraint / span;
        return scale;
    },

    /**
     * Return a reasonable tick step given extent and dimension.
     * (extent is [begin, end] of the domain.)
     * Example:
     *      tickStepFromExtent([-10, 10], 300) // returns 2
     */
    tickStepFromExtent: function(extent, dimensionConstraint) {
        var span = extent[1] - extent[0];

        var tickFactor;
        // If single number digits
        if (15 < span && span <= 20) {
            tickFactor = 23;

        // triple digit or decimal
        } else if (span > 100 || span < 5) {
            tickFactor = 10;

        // double digit
        } else {
            tickFactor = 16;
        }
        var constraintFactor = dimensionConstraint / 500;
        var desiredNumTicks = tickFactor * constraintFactor;
        return Util.tickStepFromNumTicks(span, desiredNumTicks);
    },

    /**
     * Given the tickStep and the graph's scale, find a
     * grid step.
     * Example:
     *      gridStepFromTickStep(200, 0.2) // returns 100
     */
    gridStepFromTickStep: function(tickStep, scale) {
        var tickWidth = tickStep * scale;
        var x = tickStep;
        var y = Math.pow(10, Math.floor(Math.log(x) / Math.LN10));
        var leadingDigit = Math.floor(x / y);
        if (tickWidth < 25) {
            return tickStep;
        }
        if (tickWidth < 50) {
            if (leadingDigit === 5) {
                return tickStep;
            } else {
                return tickStep / 2;
            }
        }
        if (leadingDigit === 1) {
            return tickStep / 2;
        }
        if (leadingDigit === 2) {
            return tickStep / 4;
        }
        if (leadingDigit === 5) {
            return tickStep / 5;
        }
    },

    /**
     * Find a good tick step for the desired number of ticks in the range
     * Modified from d3.scale.linear: d3_scale_linearTickRange.
     * Thanks, mbostock!
     * Example:
     *      tickStepFromNumTicks(50, 6) // returns 10
     */
    tickStepFromNumTicks: function(span, numTicks) {
        var step = Math.pow(10, Math.floor(Math.log(span / numTicks) / Math.LN10));
        var err = numTicks / span * step;

        // Filter ticks to get closer to the desired count.
        if (err <= 0.15) {
            step *= 10;
        } else if (err <= 0.35) {
            step *= 5;
        } else if (err <= 0.75) {
            step *= 2;
        }

        // Round start and stop values to step interval.
        return step;
    },

    /**
     * Transparently update deprecated props so that the code to deal
     * with them only lives in one place: (Widget).deprecatedProps
     *
     * For example, if a boolean `foo` was deprecated in favor of a
     * number 'bar':
     *      deprecatedProps: {
     *          foo: function(props) {
     *              return {bar: props.foo ? 1 : 0};
     *          }
     *      }
     */
    DeprecationMixin: {
        // This lifecycle stage is only called before first render
        componentWillMount: function() {
            var newProps = {};

            _.each(this.deprecatedProps, function(func, prop) {
                if (_.has(this.props, prop)) {
                    _.extend(newProps, func(this.props));
                }
            }, this);

            if (!_.isEmpty(newProps)) {
                // Set new props directly so that widget renders correctly
                // when it first mounts, even though these will be overwritten
                // almost immediately afterwards...
                _.extend(this.props, newProps);

                // ...when we propagate the new props upwards and they come
                // back down again.
                setTimeout(this.props.onChange, 0, newProps);
            }
        }
    },

    /**
     * Approximate equality on numbers and primitives.
     */
    eq: function(x, y) {
        if (_.isNumber(x) && _.isNumber(y)) {
            return Math.abs(x - y) < 1e-9;
        } else {
            return x === y;
        }
    },

    /**
     * Deep approximate equality on primitives, numbers, arrays, and objects.
     */
    deepEq: function(x, y) {
        if (_.isArray(x) && _.isArray(y)) {
            if (x.length !== y.length) {
                return false;
            }
            for (var i = 0; i < x.length; i++) {
                if (!Util.deepEq(x[i], y[i])) {
                    return false;
                }
            }
            return true;
        } else if (_.isArray(x) || _.isArray(y)) {
            return false;
        } else if (_.isObject(x) && _.isObject(y)) {
            return x === y || (
                _.all(x, function(v, k) { return Util.deepEq(y[k], v); }) &&
                _.all(y, function(v, k) { return Util.deepEq(x[k], v); })
            );
        } else if (_.isObject(x) || _.isObject(y)) {
            return false;
        } else {
            return Util.eq(x, y);
        }
    },

    /**
     * Query String Parser
     *
     * Original from:
     * http://stackoverflow.com/questions/901115/get-querystring-values-in-javascript/2880929#2880929
     */
    parseQueryString: function(query) {
        query = query || window.location.search.substring(1);
        var urlParams = {},
            e,
            a = /\+/g,  // Regex for replacing addition symbol with a space
            r = /([^&=]+)=?([^&]*)/g,
            d = function(s) { return decodeURIComponent(s.replace(a, " ")); };


        while (e = r.exec(query)) {
            urlParams[d(e[1])] = d(e[2]);
        }

        return urlParams;
    },

    /**
     * Query string adder
     * Works for URLs without #.
     * Original from:
     * http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
     */
    updateQueryString: function(uri, key, value) {
        value = encodeURIComponent(value);
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    },

    /**
     * A more strict encodeURIComponent that escapes `()'!`s
     * Especially useful for creating URLs that are embeddable in markdown
     *
     * Adapted from
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
     * This function and the above original available under the
     * CC-BY-SA 2.5 license.
     */
    strongEncodeURIComponent: function(str) {
        return encodeURIComponent(str)
            // Note that although RFC3986 reserves "!", RFC5987 does not,
            // so we do not need to escape it
            .replace(/['()!]/g, window.escape) // i.e., %27 %28 %29
            .replace(/\*/g, '%2A');
    },

    // There are certain widgets where we don't want to provide the "answered"
    // highlight indicator.
    // The issue with just using the `graded` flag on questions is that showing
    // that a certain widget is ungraded can sometimes reveal the answer to a
    // question ("is this transformation possible? if so, do it")
    // This is kind of a hack to get around this.
    widgetShouldHighlight: function(widget) {
        if (!widget) {
            return false;
        }
        var HIGHLIGHT_BAR_BLACKLIST = ["measurer", "protractor"];
        return !_.contains(HIGHLIGHT_BAR_BLACKLIST, widget.type);
    },

    /**
     * If a widget says that it is empty once it is graded.
     * Trying to encapsulate references to the score format.
     */
    scoreIsEmpty: function(score) {
        return score.type === "invalid";
    },

    /**
     * Extracts the location of a touch or mouse event, allowing you to pass
     * in a "mouseup", "mousedown", or "mousemove" event and receive the
     * correct coordinates. Shouldn't be used with "vmouse" events.
     *
     * The Util.touchHandlers are used to track the current state of the touch
     * event, such as whether or not the user is currently pressed down (either
     * through touch or mouse) on the screen.
     */

    touchHandlers: {
        pointerDown: false,
        currentTouchIdentifier: null
    },

    resetTouchHandlers: function() {
        _.extend(Util.touchHandlers, {
            pointerDown: false,
            currentTouchIdentifier: null
        });
    },

    extractPointerLocation: function(event) {
        var touchOrEvent;

        if (Util.touchHandlers.pointerDown) {
            // Look for the touch matching the one we're tracking; ignore others
            if (Util.touchHandlers.currentTouchIdentifier != null) {
                var len = event.changedTouches ? event.changedTouches.length : 0;
                for (var i = 0; i < len; i++) {
                    if (event.changedTouches[i].identifier ===
                            Util.touchHandlers.currentTouchIdentifier) {
                        touchOrEvent = event.changedTouches[i];
                    }
                }
            } else {
                touchOrEvent = event;
            }

            var isEndish =
                    event.type === "touchend" || event.type === "touchcancel";
            if (touchOrEvent && isEndish) {
                Util.touchHandlers.pointerDown = false;
                Util.touchHandlers.currentTouchIdentifier = null;
            }
        } else {
            // touchstart or mousedown
            Util.touchHandlers.pointerDown = true;
            if (event.touches) {
                touchOrEvent = event.touches[0];
                Util.touchHandlers.currentTouchIdentifier = touchOrEvent.identifier;
            } else {
                touchOrEvent = event;
            }
        }

        if (touchOrEvent) {
            return {
                left: touchOrEvent.pageX,
                top: touchOrEvent.pageY
            };
        }
    },

    /**
     * Pass this function as the touchstart for an element to
     * avoid sending the touch to the mobile scratchpad
     */
    captureScratchpadTouchStart: function(e) {
        e.stopPropagation();
    }
};

Util.random = Util.seededRNG(new Date().getTime() & 0xffffffff);

module.exports = Util;
