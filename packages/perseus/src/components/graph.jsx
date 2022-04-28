/* eslint-disable react/forbid-prop-types, react/no-unsafe, react/sort-comp */
// @flow
import $ from "jquery";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import _ from "underscore";

import {interactiveSizes} from "../styles/constants.js";
import Util from "../util.js";
import GraphUtils from "../util/graph-utils.js";

import SvgImage from "./svg-image.jsx";

const defaultBackgroundImage = {
    url: null,
};

/* Style objects */
const defaultInstructionsStyle = {
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: "32px",
    width: "100%",
    height: "100%",
    textAlign: "center",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 1,
    transition: "opacity .25s ease-in-out",
    "-moz-transition": "opacity .25s ease-in-out",
    "-webkit-transition": "opacity .25s ease-in-out",
};

const instructionsTextStyle = {
    position: "relative",
    top: "25%",
};

function numSteps(range, step) {
    return Math.floor((range[1] - range[0]) / step);
}

class Graph extends React.Component<$FlowFixMe> {
    protractor: $FlowFixMe;
    ruler: $FlowFixMe;
    _graphie: $FlowFixMe;
    _hasSetupGraphieThisUpdate: boolean;
    _shouldSetupGraphie: boolean;

    static propTypes = {
        box: PropTypes.array.isRequired,
        labels: PropTypes.arrayOf(PropTypes.string),
        range: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        step: PropTypes.arrayOf(PropTypes.number),
        gridStep: PropTypes.arrayOf(PropTypes.number),
        snapStep: PropTypes.arrayOf(PropTypes.number),
        markings: PropTypes.string,
        backgroundImage: PropTypes.shape({
            url: PropTypes.string,
        }),
        showProtractor: PropTypes.bool,
        showRuler: PropTypes.bool,
        rulerLabel: PropTypes.string,
        rulerTicks: PropTypes.number,
        onGraphieUpdated: PropTypes.func,
        instructions: PropTypes.string,
        onClick: PropTypes.func,
        setDrawingAreaAvailable: PropTypes.func,
        isMobile: PropTypes.bool,
    };

    static defaultProps: $FlowFixMe = {
        labels: ["x", "y"],
        range: [
            [-10, 10],
            [-10, 10],
        ],
        step: [1, 1],
        gridStep: [1, 1],
        snapStep: [0.5, 0.5],
        markings: "graph",
        backgroundImage: defaultBackgroundImage,
        showProtractor: false,
        showRuler: false,
        rulerLabel: "",
        rulerTicks: 10,
        instructions: null,
        onGraphieUpdated: null,
        onClick: null,
        onMouseDown: null,
        isMobile: false,
    };

    render(): React.Node {
        let image;
        const imageData = this.props.backgroundImage;
        if (imageData.url) {
            const scale = this.props.box[0] / interactiveSizes.defaultBoxSize;
            image = (
                // $FlowFixMe[prop-missing]: `alt` is missing
                <SvgImage
                    src={imageData.url}
                    width={imageData.width}
                    height={imageData.height}
                    scale={scale}
                    responsive={false}
                />
            );
        } else {
            image = null;
        }

        return (
            <div
                className="graphie-container above-scratchpad"
                style={{
                    width: this.props.box[0],
                    height: this.props.box[1],
                }}
                // $FlowFixMe[prop-missing]: This can probably be removed
                onMouseOut={this.onMouseOut}
                // $FlowFixMe[prop-missing]: This can probably be removed
                onMouseOver={this.onMouseOver}
                // $FlowFixMe[prop-missing]: This can probably be removed
                onClick={this.onClick}
            >
                {image}
                {/* eslint-disable-next-line react/no-string-refs */}
                <div className="graphie" ref="graphieDiv" />
            </div>
        );
    }

    componentDidMount() {
        this._setupGraphie(true);
    }

    componentDidUpdate() {
        // Only setupGraphie once per componentDidUpdate().
        // See explanation in setupGraphie().
        this._hasSetupGraphieThisUpdate = false;
        if (this._shouldSetupGraphie) {
            this._setupGraphie(false);
            this._shouldSetupGraphie = false;
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: $FlowFixMe) {
        const potentialChanges = [
            "labels",
            "range",
            "step",
            "markings",
            "showProtractor",
            "showRuler",
            "rulerLabel",
            "rulerTicks",
            "gridStep",
            "snapStep",
        ];
        const self = this;
        _.each(potentialChanges, function (prop) {
            if (!_.isEqual(self.props[prop], nextProps[prop])) {
                self._shouldSetupGraphie = true;
            }
        });
    }

    /* Reset the graphie canvas to its initial state
     *
     * Use when re-rendering the parent component and you need a blank
     * graphie.
     */
    reset: () => void = () => {
        this._setupGraphie(false);
    };

    graphie: () => $FlowFixMe = () => {
        return this._graphie;
    };

    pointsFromNormalized: ($FlowFixMe, $FlowFixMe) => $FlowFixMe = (
        coordsList,
        noSnap,
    ) => {
        const self = this;
        return _.map(coordsList, function (coords) {
            return _.map(coords, function (coord, i) {
                const range = self.props.range[i];
                if (noSnap) {
                    return range[0] + (range[1] - range[0]) * coord;
                }
                const step = self.props.step[i];
                const nSteps = numSteps(range, step);
                const tick = Math.round(coord * nSteps);
                return range[0] + step * tick;
            });
        });
    };

    _setupGraphie: ($FlowFixMe) => void = (initialMount) => {
        // Only setupGraphie once per componentDidUpdate().
        // This prevents this component from rendering graphie
        // and then immediately re-render graphie because its
        // parent component asked it to. This will happen when
        // props on the parent and props on this component both
        // require graphie to be re-rendered.
        if (this._hasSetupGraphieThisUpdate) {
            return;
        }

        // eslint-disable-next-line react/no-string-refs
        const graphieDiv = ReactDOM.findDOMNode(this.refs.graphieDiv);
        $(graphieDiv).empty();

        // Content creators may need to explicitly add the dollar signs so the
        // strings are picked up by our translation tools. However, these math
        // annotations are redundant because we already render all graph labels
        // in math mode. For example, a label value of `$\text{Dollars}$` will
        // be translatable, but we only want to pass the string
        // `\text{Dollars}` to the Graph widget.
        const labels = this.props.labels.map((label) =>
            Util.unescapeMathMode(label),
        );
        const range = this.props.range;
        const graphie = (this._graphie = GraphUtils.createGraphie(graphieDiv));

        const gridConfig = this._getGridConfig();
        graphie.snap = this.props.snapStep;

        if (this.props.markings === "graph") {
            graphie.graphInit({
                range: range,
                scale: _.pluck(gridConfig, "scale"),
                axisArrows: "<->",
                labelFormat: function (s) {
                    return "\\small{" + s + "}";
                },
                gridStep: this.props.gridStep,
                tickStep: _.pluck(gridConfig, "tickStep"),
                labelStep: 1,
                unityLabels: _.pluck(gridConfig, "unityLabel"),
                isMobile: this.props.isMobile,
            });
            graphie.label(
                [0, range[1][1]],
                labels[1],
                this.props.isMobile ? "below right" : "above",
            );
            graphie.label(
                [range[0][1], 0],
                labels[0],
                this.props.isMobile ? "above left" : "right",
            );
        } else if (this.props.markings === "grid") {
            graphie.graphInit({
                range: range,
                scale: _.pluck(gridConfig, "scale"),
                gridStep: this.props.gridStep,
                axes: false,
                ticks: false,
                labels: false,
                isMobile: this.props.isMobile,
            });
        } else if (this.props.markings === "none") {
            graphie.init({
                range: range,
                scale: _.pluck(gridConfig, "scale"),
                isMobile: this.props.isMobile,
            });
        }

        // Add instructions just before mouse layer
        const visible = 0.5;
        const invisible = 0.0;
        let $instructionsWrapper;
        if (this.props.instructions) {
            $instructionsWrapper = $("<div/>");
            _.each(defaultInstructionsStyle, function (value, key) {
                // $FlowFixMe[incompatible-use]
                $instructionsWrapper.css(key, value);
            });
            // $FlowFixMe[incompatible-use]
            $instructionsWrapper.css("opacity", visible);

            const $instructions = $("<span/>", {
                text: this.props.instructions,
            });
            _.each(instructionsTextStyle, function (value, key) {
                $instructions.css(key, value);
            });

            // $FlowFixMe[incompatible-use]
            $instructionsWrapper.append($instructions);
            $(graphieDiv).append($instructionsWrapper);
        } else {
            $instructionsWrapper = undefined;
        }

        // Add some handlers for instructions text (if necessary)
        const onMouseDown =
            $instructionsWrapper || this.props.onMouseDown
                ? _.bind(function (coord) {
                      if ($instructionsWrapper) {
                          $instructionsWrapper.remove();
                          $instructionsWrapper = null;
                      }
                      // eslint-disable-next-line @babel/no-invalid-this
                      this.props.onMouseDown(coord);
                  }, this)
                : null;

        const onMouseOver = $instructionsWrapper
            ? function () {
                  $instructionsWrapper &&
                      $instructionsWrapper.css("opacity", invisible);
              }
            : null;

        const onMouseOut = $instructionsWrapper
            ? function () {
                  $instructionsWrapper &&
                      $instructionsWrapper.css("opacity", visible);
              }
            : null;
        /* eslint-enable indent */

        graphie.addMouseLayer({
            onClick: this.props.onClick,
            onMouseDown: onMouseDown,
            onMouseOver: onMouseOver,
            onMouseOut: onMouseOut,
            onMouseUp: this.props.onMouseUp,
            onMouseMove: this.props.onMouseMove,
            allowScratchpad: true,
            setDrawingAreaAvailable: this.props.setDrawingAreaAvailable,
        });

        this._updateProtractor();
        this._updateRuler();

        // We set this flag before jumping into our callback
        // to avoid recursing if our callback calls reset() itself
        this._hasSetupGraphieThisUpdate = true;
        if (!initialMount && this.props.onGraphieUpdated) {
            // Calling a parent callback in componentDidMount is bad and
            // results in hard-to-reason-about lifecycle problems (esp. with
            // refs), so we do it only on update and rely on the parent to
            // query for the graphie object on initial mount
            this.props.onGraphieUpdated(graphie);
        }
    };

    _getGridConfig: () => $FlowFixMe = () => {
        const self = this;
        return _.map(self.props.step, function (step, i) {
            return Util.gridDimensionConfig(
                step,
                self.props.range[i],
                self.props.box[i],
                self.props.gridStep[i],
            );
        });
    };

    _updateProtractor: () => void = () => {
        if (this.protractor) {
            this.protractor.remove();
        }

        if (this.props.showProtractor) {
            const coord = this.pointsFromNormalized([[0.5, 0.05]])[0];
            this.protractor = this._graphie.protractor(coord);
        }
    };

    _updateRuler: () => void = () => {
        if (this.ruler) {
            this.ruler.remove();
        }

        if (this.props.showRuler) {
            const coord = this.pointsFromNormalized([[0.5, 0.25]])[0];
            const extent =
                this._graphie.range[0][1] - this._graphie.range[0][0];
            this.ruler = this._graphie.ruler({
                center: coord,
                label: this.props.rulerLabel,
                pixelsPerUnit: this._graphie.scale[0],
                ticksPerUnit: this.props.rulerTicks,
                units: Math.round(0.8 * extent),
            });
        }
    };

    toJSON: () => $FlowFixMe = () => {
        return _.pick(
            this.props,
            "range",
            "step",
            "markings",
            "labels",
            "backgroundImage",
            "showProtractor",
            "showRuler",
            "rulerLabel",
            "rulerTicks",
            "gridStep",
            "snapStep",
        );
    };
}

export default Graph;
