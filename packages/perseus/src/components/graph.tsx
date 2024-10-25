/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/no-unsafe */
import {vector as kvector} from "@khanacademy/kmath";
import $ from "jquery";
import * as React from "react";
import _ from "underscore";

import AssetContext from "../asset-context";
import {interactiveSizes} from "../styles/constants";
import Util from "../util";
import GraphUtils from "../util/graph-utils";

import SvgImage from "./svg-image";

import type {Coord} from "../interactive2/types";
import type {PerseusImageBackground} from "../perseus-types";
import type {GridDimensions} from "../util";

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
} as const;

const instructionsTextStyle = {
    position: "relative",
    top: "25%",
} as const;

function numSteps(range: any, step: any) {
    return Math.floor((range[1] - range[0]) / step);
}

type Props = {
    box: [number, number];
    labels: ReadonlyArray<string>;
    range: [Coord, Coord];
    step: [number, number];
    gridStep: [number, number];
    snapStep: [number, number];
    markings: string;
    backgroundImage: PerseusImageBackground;
    showProtractor: boolean;
    showRuler: boolean;
    rulerLabel: string;
    rulerTicks: number;
    instructions?: string;
    isMobile: boolean;

    onGraphieUpdated?: (graphie: any) => void;
    onClick?: (Coord) => void;
    onMouseDown?: (Coord) => void;
    onMouseMove?: (Coord) => void;
    setDrawingAreaAvailable?: (boolean) => void;
};

type DefaultProps = {
    labels: Props["labels"];
    range: Props["range"];
    step: Props["step"];
    gridStep: Props["gridStep"];
    snapStep: Props["snapStep"];
    markings: Props["markings"];
    backgroundImage: Props["backgroundImage"];
    showProtractor: Props["showProtractor"];
    showRuler: Props["showRuler"];
    rulerLabel: Props["rulerLabel"];
    rulerTicks: Props["rulerTicks"];
    isMobile: Props["isMobile"];
};

class Graph extends React.Component<Props> {
    protractor: any;
    ruler: any;
    _graphie: any;
    _hasSetupGraphieThisUpdate = false;
    _shouldSetupGraphie = true;
    graphieDiv = React.createRef<HTMLDivElement>();

    static defaultProps: DefaultProps = {
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
        isMobile: false,
    };

    componentDidMount() {
        this._setupGraphie(true);
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
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

    componentDidUpdate() {
        // Only setupGraphie once per componentDidUpdate().
        // See explanation in setupGraphie().
        this._hasSetupGraphieThisUpdate = false;
        if (this._shouldSetupGraphie) {
            this._setupGraphie(false);
            this._shouldSetupGraphie = false;
        }
    }

    /* Reset the graphie canvas to its initial state
     *
     * Use when re-rendering the parent component and you need a blank
     * graphie.
     */
    reset: () => void = () => {
        this._setupGraphie(false);
    };

    graphie: () => any = () => {
        return this._graphie;
    };

    pointsFromNormalized: (arg1: any, arg2: any) => any = (
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

    _setupGraphie: (arg1: any) => void = (initialMount) => {
        // Only setupGraphie once per componentDidUpdate().
        // This prevents this component from rendering graphie
        // and then immediately re-render graphie because its
        // parent component asked it to. This will happen when
        // props on the parent and props on this component both
        // require graphie to be re-rendered.
        if (this._hasSetupGraphieThisUpdate) {
            return;
        }
        if (this.graphieDiv.current == null) {
            return;
        }

        $(this.graphieDiv.current).empty();

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
        const graphie = (this._graphie = GraphUtils.createGraphie(
            this.graphieDiv.current,
        ));

        const gridConfig: [GridDimensions, GridDimensions] =
            this._getGridConfig();
        // @ts-expect-error - TS2339: Property 'snap' does not exist on type 'Graphie'.
        graphie.snap = this.props.snapStep;

        if (this.props.markings === "graph") {
            graphie.graphInit({
                range: range,
                scale: kvector.map(gridConfig, (g) => g.scale),
                axisArrows: "<->",
                labelFormat: function (s) {
                    return "\\small{" + s + "}";
                },
                gridStep: this.props.gridStep,
                tickStep: kvector.map(gridConfig, (g) => g.tickStep),
                labelStep: 1,
                unityLabels: kvector.map(gridConfig, (g) => g.unityLabel),
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
                scale: kvector.map(gridConfig, (g) => g.scale),
                gridStep: this.props.gridStep,
                axes: false,
                ticks: false,
                labels: false,
                isMobile: this.props.isMobile,
            });
        } else if (this.props.markings === "none") {
            graphie.init({
                range: range,
                scale: kvector.map(gridConfig, (g) => g.scale),
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
                $instructionsWrapper.css(key, value);
            });
            $instructionsWrapper.css("opacity", visible);

            const $instructions = $("<span/>", {
                text: this.props.instructions,
            });
            _.each(instructionsTextStyle, function (value, key) {
                $instructions.css(key, value);
            });

            $instructionsWrapper.append($instructions);
            $(this.graphieDiv.current).append($instructionsWrapper);
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
                      // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                      // eslint-disable-next-line @babel/no-invalid-this
                      this.props.onMouseDown(coord);
                  }, this)
                : undefined;

        const onMouseOver = $instructionsWrapper
            ? function () {
                  $instructionsWrapper &&
                      $instructionsWrapper.css("opacity", invisible);
              }
            : undefined;

        const onMouseOut = $instructionsWrapper
            ? function () {
                  $instructionsWrapper &&
                      $instructionsWrapper.css("opacity", visible);
              }
            : undefined;
        /* eslint-enable indent */

        graphie.addMouseLayer({
            onClick: this.props.onClick,
            onMouseDown: onMouseDown,
            onMouseOver: onMouseOver,
            onMouseOut: onMouseOut,
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

    _getGridConfig: () => [GridDimensions, GridDimensions] = () => {
        return kvector.map(this.props.step, (step, i) =>
            Util.gridDimensionConfig(
                step,
                this.props.range[i],
                this.props.box[i],
                this.props.gridStep[i],
            ),
        );
    };

    _updateProtractor: () => void = () => {
        if (this.protractor) {
            this.protractor.remove();
        }

        if (this.props.showProtractor) {
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const coord = this.pointsFromNormalized([[0.5, 0.05]])[0];
            this.protractor = this._graphie.protractor(coord);
        }
    };

    _updateRuler: () => void = () => {
        if (this.ruler) {
            this.ruler.remove();
        }

        if (this.props.showRuler) {
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
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

    toJSON: () => any = () => {
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

    render(): React.ReactNode {
        let image;
        const imageData = this.props.backgroundImage;
        if (imageData.url) {
            const scale = this.props.box[0] / interactiveSizes.defaultBoxSize;
            image = (
                <AssetContext.Consumer>
                    {({setAssetStatus}) => (
                        <SvgImage
                            // @ts-expect-error - TS2741 - Property 'alt' is missing in type '{ src: any; width: any; height: any; scale: number; responsive: false; }' but required in type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "children" | "height" | "width" | "title" | "alt" | "trackInteraction" | "preloader" | "allowFullBleed" | "extraGraphie" | "overrideAriaHidden">'.
                            src={imageData.url}
                            width={imageData.width}
                            height={imageData.height}
                            scale={scale}
                            responsive={false}
                            setAssetStatus={setAssetStatus}
                        />
                    )}
                </AssetContext.Consumer>
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
                // @ts-expect-error - TS2339 - Property 'onMouseOut' does not exist on type 'Graph'.
                onMouseOut={this.onMouseOut}
                // @ts-expect-error - TS2339 - Property 'onMouseOver' does not exist on type 'Graph'.
                onMouseOver={this.onMouseOver}
                // @ts-expect-error - TS2339 - Property 'onClick' does not exist on type 'Graph'.
                onClick={this.onClick}
            >
                {image}
                <div className="graphie" ref={this.graphieDiv} />
            </div>
        );
    }
}

export default Graph;
