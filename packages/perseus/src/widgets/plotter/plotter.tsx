/* eslint-disable max-lines */
/* eslint-disable react/no-unsafe */
import {KhanMath} from "@khanacademy/kmath";
import $ from "jquery";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import Interactive2 from "../../interactive2";
import WrappedLine from "../../interactive2/wrapped-line";
import KhanColors from "../../util/colors";
import GraphUtils from "../../util/graph-utils";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/plotter/plotter-ai-utils";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {UnsupportedWidgetPromptJSON} from "../../widget-ai-utils/unsupported-widget";
import type {
    PerseusPlotterUserInput,
    PerseusPlotterWidgetOptions,
    PlotterPublicWidgetOptions,
} from "@khanacademy/perseus-core";

type Props = WidgetProps<
    PlotterPublicWidgetOptions,
    PerseusPlotterUserInput
> & {
    labelInterval: NonNullable<PerseusPlotterWidgetOptions["labelInterval"]>;
    picSize: NonNullable<PerseusPlotterWidgetOptions["picSize"]>;
};

type DefaultProps = {
    type: Props["type"];
    labels: Props["labels"];
    categories: Props["categories"];
    scaleY: Props["scaleY"];
    maxY: Props["maxY"];
    snapsPerLine: Props["snapsPerLine"];
    picSize: Props["picSize"];
    picBoxHeight: Props["picBoxHeight"];
    picUrl: Props["picUrl"];
    plotDimensions: Props["plotDimensions"];
    labelInterval: Props["labelInterval"];
};

type State = {
    categoryHeights: Record<string, number>;
};

export class Plotter extends React.Component<Props, State> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    _isMounted = false;
    // @ts-expect-error - TS2564 - Property 'shouldSetupGraphie' has no initializer and is not definitely assigned in the constructor.
    shouldSetupGraphie: boolean;
    graphieDiv = React.createRef<HTMLDivElement>();
    graphie: any;
    horizHairline: any;
    hairlineRange: any;

    static defaultProps: DefaultProps = {
        type: "bar",
        labels: ["", ""],
        categories: [""],

        scaleY: 1,
        maxY: 10,
        snapsPerLine: 2,

        picSize: 40,
        picBoxHeight: 48,
        picUrl: "",

        plotDimensions: [380, 300],
        labelInterval: 1,
    };

    state: State = {
        // The measured rendered height of category strings. Used to calculate
        // bottom padding of plot, to prevent categories from overlapping the
        // bottom label.
        categoryHeights: {},
    };

    componentDidMount() {
        this._isMounted = true;

        this.setupGraphie(this.props.userInput);
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        const props = [
            "type",
            "labels",
            "categories",
            "scaleY",
            "maxY",
            "snapsPerLine",
            "picUrl",
            "labelInterval",
            "static",
        ];

        this.shouldSetupGraphie = _.any(
            props,
            (prop) => !_.isEqual(this.props[prop], nextProps[prop]),
            this,
        );

        if (
            !_.isEqual(this.props.starting, nextProps.starting) &&
            !_.isEqual(this.props.userInput, nextProps.starting)
        ) {
            this.shouldSetupGraphie = true;
            this.props.handleUserInput(nextProps.starting);
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        this.shouldSetupGraphie =
            this.shouldSetupGraphie ||
            !_.isEqual(this.state.categoryHeights, prevState.categoryHeights);

        if (this.shouldSetupGraphie) {
            this.setupGraphie(prevProps.userInput);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    DOT_PLOT_POINT_SIZE: () => number = () => {
        return this.props.apiOptions.isMobile ? 6 : 4;
    };

    DOT_PLOT_POINT_PADDING: () => number = () => {
        return 8;
    };

    DOT_TICK_POINT_SIZE: () => number = () => {
        return 2;
    };

    setupGraphie(prevValues: number[]): void {
        const self = this;
        self.shouldSetupGraphie = false;
        $(this.graphieDiv.current!).empty();
        // @ts-expect-error - Argument of type 'Element | Text | null' is not assignable to parameter of type 'HTMLElement'.
        const graphie = GraphUtils.createGraphie(this.graphieDiv.current);

        // TODO(jakesandlund): It's not the react way to hang
        // something off the component object, but since graphie
        // is outside React, it makes it easier to do this.
        self.graphie = graphie;
        self.graphie.pics = [];
        self.graphie.dotTicks = [];

        const isBar = self.props.type === "bar";
        const isLine = self.props.type === "line";
        const isPic = self.props.type === "pic";
        const isHistogram = self.props.type === "histogram";
        const isDotplot = self.props.type === "dotplot";

        const isTiledPlot = isPic || isDotplot;

        const config: Record<string, any> = {};
        const c = config; // c for short

        const isMobile = this.props.apiOptions.isMobile;

        c.graph = {
            lines: [],
            bars: [],
            points: [],
            dividers: [],
        };
        c.scaleY = self.props.scaleY;
        c.dimX = self.props.categories.length;
        const plotDimensions = isMobile
            ? [288, 336]
            : self.props.plotDimensions;
        if (isLine) {
            // Subtracting 0.2 makes line have equal padding on each side
            c.dimX += isMobile ? -0.2 : 1;
        } else if (isHistogram) {
            c.barPad = 0;
            c.barWidth = 1;
        } else if (isBar) {
            c.barPad = isMobile ? 0.08 : 0.15;
            c.barWidth = 1 - 2 * c.barPad;
            c.dimX += (isMobile ? -2 : 2) * c.barPad;
        } else if (isTiledPlot) {
            c.picBoxHeight = self.props.picBoxHeight;
            c.picBoxWidthPx = plotDimensions[0] / self.props.categories.length;
            const picPadAllWidth = plotDimensions[0] - c.dimX * c.picBoxWidthPx;
            c.picPad = picPadAllWidth / (2 * c.dimX + 2);
            const picFullWidth = c.picBoxWidthPx + 2 * c.picPad;

            // Convert from px to "unscaled"
            c.picPad = c.picPad / picFullWidth;
            c.picBoxWidth = c.picBoxWidthPx / picFullWidth;
            c.dimX += 2 * c.picPad;
        }

        if (isDotplot) {
            c.picBoxHeight =
                this.DOT_PLOT_POINT_SIZE() * 2 + this.DOT_PLOT_POINT_PADDING();
        }

        c.dimY = Math.ceil(self.props.maxY / c.scaleY) * c.scaleY;

        let padX = 25;

        if ((isBar || isLine) && isMobile) {
            padX = self.props.labels[1].length !== 0 ? 17 : 11;
        }

        // Since dotplot doesn't have an axis along the left it looks weird
        // with the same padding as the others
        if (isDotplot) {
            padX /= 2;
        }

        if (isMobile && isTiledPlot && self.props.labels[1].length === 0) {
            padX = 0;
        }

        // Default vertical padding.
        let padTop = 25;
        let padBottom = 25 * 3;

        // TODO(michaelpolyak): Handle other plot types: Dot, Histogram, Line.
        if (isMobile && (isBar || isTiledPlot)) {
            const maxCategoryHeight = Math.max(
                0,
                ...Object.values(self.state.categoryHeights),
            );

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (maxCategoryHeight) {
                // Account for bottom label position, height.
                let offsetY = 25;

                if (isTiledPlot) {
                    // Tiled plot categories have additional spacing.
                    offsetY += 10;
                }

                padBottom = offsetY + maxCategoryHeight;
            }
        }

        if (isMobile) {
            c.scale = [
                // We multiply pad by 4 because we add 3*pad padding on the left
                // and 1*pad on the right
                (plotDimensions[0] - padX * 4) / c.dimX,
                (plotDimensions[1] - (padTop + padBottom)) / c.dimY,
            ];
        } else {
            c.scale = _.map([c.dimX, c.dimY], function (dim, i) {
                return plotDimensions[i] / dim;
            });
        }

        if (isTiledPlot) {
            c.scale[1] = c.picBoxHeight / c.scaleY;
        }

        // Transform from screen space (pixels) to plot space.
        padX /= c.scale[0];
        padTop /= c.scale[1];
        padBottom /= c.scale[1];

        graphie.init({
            range: [
                [-3 * padX, c.dimX + padX],
                [-padBottom, c.dimY + padTop],
            ],
            scale: c.scale,
            isMobile: this.props.apiOptions.isMobile,
        });
        graphie.addMouseLayer({
            allowScratchpad: true,
            setDrawingAreaAvailable:
                this.props.apiOptions.setDrawingAreaAvailable,
        });

        if (!isTiledPlot) {
            // If we have isMobile, we skip the 0 label.
            const initialY = isMobile ? c.scaleY : 0;
            for (let y = initialY; y <= c.dimY; y += c.scaleY) {
                graphie.label(
                    [0, y],
                    KhanMath.roundToApprox(y, 2),
                    "left",
                    /* isTeX */ true /* for the \approx symbol */,
                );
                graphie.style(
                    {
                        stroke: isMobile ? "#e9ebec" : "#000",
                        strokeWidth: 1,
                        opacity: isMobile ? 1 : 0.3,
                    },
                    function () {
                        graphie.line([0, y], [c.dimX, y]);
                    },
                );
            }
        }

        if ((isBar || isLine) && isMobile && !this.props.static) {
            self.graphie.dragPrompt = graphie
                .label(
                    [c.dimX / 2, c.dimY / 2],
                    this.context.strings.dragHandles,
                    "center",
                    false,
                )
                .css("font-weight", "bold")
                .css("color", KhanColors.KA_GREEN)
                .css("display", "none");
        }

        self.setupCategories(config);

        if (isTiledPlot && isMobile) {
            self.graphie.dotPrompt = graphie
                .label(
                    [c.dimX / 2, c.dimY / 2],
                    this.context.strings.tapAddPoints,
                    "center",
                    false,
                )
                .css("font-weight", "bold")
                .css("color", KhanColors.KA_GREEN)
                .css("display", "none");
        }

        if (isTiledPlot) {
            self.drawPicHeights(self.props.userInput, prevValues);
        }

        graphie.style(
            {stroke: "#000", strokeWidth: 2, opacity: 1.0},
            function () {
                if (isTiledPlot) {
                    if (isDotplot) {
                        // Dotplot is a subtype of tiled plot, here we only draw
                        // the x-axis
                        graphie.style(
                            {
                                stroke: isMobile ? KhanColors.GRAY_G : "#000",
                                strokeWidth: isMobile ? 1 : 2,
                            },
                            () =>
                                graphie.line(
                                    [isMobile ? 0 : 0.5, 0],
                                    [c.dimX - (isMobile ? 0 : 0.5), 0],
                                ),
                        );
                    } else {
                        graphie.line([0, 0], [c.dimX, 0]);

                        // Draw the left axis for non-dotplots
                        if (self.props.labels[1].length !== 0 || !isMobile) {
                            graphie.style(
                                {
                                    stroke: isMobile
                                        ? KhanColors.GRAY_G
                                        : "#000",
                                    strokeWidth: isMobile ? 1 : 2,
                                },
                                () => graphie.line([0, 0], [0, c.dimY]),
                            );
                        }
                    }
                } else {
                    // Draw normal axes
                    graphie.style(
                        {
                            stroke: isMobile ? KhanColors.GRAY_G : "#000",
                            strokeWidth: isMobile ? 1 : 2,
                        },
                        () =>
                            graphie.line(
                                [isMobile ? -padX * 3 : 0, 0],
                                [c.dimX + (isMobile ? padX : 0), 0],
                            ),
                    );

                    if (!((isBar || isLine) && isMobile)) {
                        graphie.style(
                            {
                                stroke: isMobile ? KhanColors.GRAY_G : "#000",
                                strokeWidth: isMobile ? 1 : 2,
                            },
                            () => graphie.line([0, 0], [0, c.dimY]),
                        );
                    }
                }
            },
        );

        graphie
            .label(
                [c.dimX / 2, isMobile ? -padBottom : -35 / c.scale[1]],
                self.props.labels[0],
                isMobile ? "above" : "below",
                false,
            )
            .css("font-weight", "bold")
            .css("color", isMobile && KhanColors.GRAY_F);

        graphie
            .label(
                [(isMobile ? -35 : -60) / c.scale[0], c.dimY / 2],
                self.props.labels[1],
                "center",
                false,
            )
            .css("font-weight", "bold")
            .css("color", isMobile && KhanColors.GRAY_F)
            .addClass("rotate");

        if (this.props.apiOptions.isMobile) {
            this.horizHairline = new WrappedLine(this.graphie, [0, 0], [0, 0], {
                normalStyle: {
                    strokeWidth: 1,
                },
            });

            this.horizHairline.attr({
                stroke: KhanColors.INTERACTIVE,
            });
            this.horizHairline.hide();

            this.hairlineRange = [
                [0, c.dimX],
                [0, c.dimY],
            ];
        }
    }

    showHairlines: (arg1: any) => void = (point) => {
        if (this.props.apiOptions.isMobile) {
            // Hairlines are already initialized when the graph is loaded, so
            // here we just move them to the updated location and make them
            // visible.
            this.horizHairline.moveTo(
                [this.hairlineRange[0][0], point[1]],
                [this.hairlineRange[0][1], point[1]],
            );

            this.horizHairline.show();
        }
    };

    hideHairlines: () => void = () => {
        if (this.props.apiOptions.isMobile) {
            this.horizHairline.hide();
        }
    };

    labelCategory: (arg1: any, arg2: any) => Promise<any> = (x, category) => {
        const isMobile = this.props.apiOptions.isMobile;

        const graphie = this.graphie;
        category = category + "";
        let isTeX = false;
        const mathyCategory = category.match(/^\$(.*)\$$/);
        if (mathyCategory) {
            category = mathyCategory[1];
            isTeX = true;
        }

        const translateX = 5;
        const rotationDeg = 45;
        const rotationRad = rotationDeg * (Math.PI / 180);

        const labelRotation =
            `translateX(-50%) translateX(${translateX}px) ` +
            `translateY(-50%) rotate(-${rotationDeg}deg)`;

        const shouldRotate = isMobile && !mathyCategory;

        // We return a promise that will resolve to measured category height.
        return new Promise((resolve) => {
            graphie.style(
                {
                    color: isMobile ? KhanColors.GRAY_G : "inherit",
                    transform: shouldRotate ? labelRotation : "none",
                    transformOrigin: "100%",
                },
                () => {
                    const $span = graphie.label(
                        [x, isMobile ? -0.5 : 0],
                        category,
                        "below",
                        isTeX,
                    );

                    const height =
                        // Additional padding is applied by style.
                        14 +
                        (shouldRotate
                            ? Math.round(
                                  $span.height() * Math.cos(rotationRad) +
                                      ($span.width() + translateX) *
                                          Math.sin(rotationRad),
                              )
                            : $span.height());

                    resolve({category, height});
                },
            );
        });
    };

    setupCategories: (arg1: any) => void = (config) => {
        const self = this;
        const c = config;
        const graphie = self.graphie;

        const isMobile = this.props.apiOptions.isMobile;

        // The deferred measurements returned from `labelCategory`.
        const categoryHeightPromises = [];

        if (self.props.type === "histogram") {
            // Histograms with n labels/categories have n - 1 buckets
            _.times(self.props.categories.length - 1, function (i) {
                self.setupBar({
                    index: i,
                    startHeight: self.props.userInput[i],
                    config: config,
                    isHistogram: true,
                });
            });

            // Label categories
            _.each(self.props.categories, function (category, i) {
                const x = 0.5 + i * c.barWidth;

                // @ts-expect-error - TS2345 - Argument of type 'Promise<any>' is not assignable to parameter of type 'never'.
                categoryHeightPromises.push(self.labelCategory(x, category));
                const tickHeight = 6 / c.scale[1];
                graphie.style(
                    {
                        stroke: "#000",
                        strokeWidth: isMobile ? 1 : 2,
                        opacity: 1.0,
                    },
                    function () {
                        graphie.line([x, -tickHeight], [x, 0]);
                    },
                );
            });
        } else {
            _.each(self.props.categories, function (category, i) {
                const startHeight = self.props.userInput[i];

                let x;

                if (self.props.type === "bar") {
                    x = self.setupBar({
                        index: i,
                        startHeight: startHeight,
                        config: config,
                        isHistogram: false,
                    });
                } else if (self.props.type === "line") {
                    x = self.setupLine(i, startHeight, config);
                } else if (self.props.type === "pic") {
                    x = self.setupPic(i, config);
                } else if (self.props.type === "dotplot") {
                    x = self.setupDotplot(i, config);
                }

                let tickStart = 0;
                let tickEnd = -6 / c.scale[1];

                if (self.props.type === "dotplot" && !isMobile) {
                    tickStart = -tickEnd;
                }

                if (self.props.type === "dotplot") {
                    // Dotplot lets you specify to only show labels every 'n'
                    // ticks. It also looks nicer if it makes the labelled
                    // ticks a bit bigger.
                    if (
                        i % self.props.labelInterval === 0 ||
                        i === self.props.categories.length - 1
                    ) {
                        categoryHeightPromises.push(
                            // @ts-expect-error - TS2345 - Argument of type 'Promise<any>' is not assignable to parameter of type 'never'.
                            self.labelCategory(x, category),
                        );
                        tickStart *= 1.5;
                        tickEnd *= 1.5;
                    }
                } else {
                    categoryHeightPromises.push(
                        // @ts-expect-error - TS2345 - Argument of type 'Promise<any>' is not assignable to parameter of type 'never'.
                        self.labelCategory(x, category),
                    );
                }

                graphie.style(
                    {
                        stroke: isMobile ? KhanColors.GRAY_G : "#000",
                        strokeWidth: isMobile ? 1 : 2,
                        opacity: 1.0,
                    },
                    function () {
                        graphie.line([x, tickStart], [x, tickEnd]);
                    },
                );
            });
        }

        Promise.all(categoryHeightPromises).then((measurements) => {
            if (self._isMounted) {
                const categoryHeights: Record<string, any> = {};

                measurements.forEach(
                    ({category, height}) =>
                        (categoryHeights[category] = height),
                );

                self.setState({categoryHeights});
            }
        });
    };

    _clampValue: (arg1: number, arg2: number, arg3: number) => number = (
        v,
        min,
        max,
    ) => {
        return Math.max(Math.min(v, max), min);
    };

    _maybeShowDragPrompt: () => void = () => {
        // The drag prompt is only added on certain types of plots.
        if (this.graphie.dragPrompt != null) {
            this.graphie.dragPrompt[0].style.display = "inline";
        }
    };

    _maybeHideDragPrompt: () => void = () => {
        // The drag prompt is only added on certain types of plots.
        if (this.graphie.dragPrompt != null) {
            this.graphie.dragPrompt[0].style.display = "none";
        }
    };

    setupBar: (arg1: any) => number = (args) => {
        const isMobile = this.props.apiOptions.isMobile;

        const i = args.index;
        const startHeight = args.startHeight;
        const config = args.config;
        const isHistogram = args.isHistogram;

        const self = this;
        const graphie = self.graphie;
        const barHalfWidth = config.barWidth / 2;
        let x;
        if (isHistogram) {
            x = 0.5 + i * config.barWidth + barHalfWidth;
        } else {
            x = (isMobile ? barHalfWidth : 0.5 + config.barPad) + i;
        }

        /**
         * Updates the bar with given index to the given height
         * @param i the index of the bar to update
         * @param height the new height of the bar
         */
        const scaleBar = function (i: any, height) {
            const center = graphie.scalePoint(0);

            // Scale filled bucket (bar)
            config.graph.bars[i].scale(
                1,
                Math.max(isMobile ? 0.2 : 0.01, height / config.scaleY),
                center[0],
                center[1],
            );

            if (isHistogram) {
                // Scale dividers between buckets
                const leftDivider = config.graph.dividers[i - 1];
                const rightDivider = config.graph.dividers[i];

                if (leftDivider) {
                    const divHeight = Math.min(
                        self.props.userInput[i - 1],
                        height,
                    );
                    leftDivider.scale(
                        1,
                        Math.max(0.01, divHeight / config.scaleY),
                        center[0],
                        center[1],
                    );
                }

                if (rightDivider) {
                    const divHeight = Math.min(
                        self.props.userInput[i + 1],
                        height,
                    );
                    rightDivider.scale(
                        1,
                        Math.max(0.01, divHeight / config.scaleY),
                        center[0],
                        center[1],
                    );
                }
            }
        };

        graphie.style(
            {
                stroke: "none",
                fill: isMobile ? KhanColors.BLUE_C : KhanColors.LIGHT_BLUE,
                opacity: 1.0,
            },
            function () {
                config.graph.bars[i] = graphie.path([
                    [x - barHalfWidth, 0],
                    [x - barHalfWidth, config.scaleY],
                    [x + barHalfWidth, config.scaleY],
                    [x + barHalfWidth, 0],
                    [x - barHalfWidth, 0],
                ]);
            },
        );

        if (isHistogram) {
            if (i > 0) {
                // Don't draw a divider to the left of the first bucket
                graphie.style(
                    {
                        stroke: "#000",
                        strokeWidth: 1,
                        opacity: 0.3,
                    },
                    function () {
                        config.graph.dividers.push(
                            graphie.path([
                                [x - barHalfWidth, 0],
                                [x - barHalfWidth, config.scaleY],
                            ]),
                        );
                    },
                );
            }
        }

        if (isMobile) {
            const snap = config.scaleY / self.props.snapsPerLine;
            config.graph.lines[i] = Interactive2.addMaybeMobileMovablePoint(
                this,
                {
                    coord: [x, startHeight],
                    constraints: [
                        (coord: any, prev: any, options: any) => {
                            return [
                                x,
                                this._clampValue(
                                    Math.round(coord[1] / snap) * snap,
                                    0,
                                    config.dimY,
                                ),
                            ];
                        },
                    ],
                    onMoveStart: function () {
                        config.graph.bars[i].attr({
                            fill: KhanColors.INTERACTIVE,
                        });
                    },
                    onMove: function () {
                        const y = config.graph.lines[i].coord()[1];

                        const values = [...self.props.userInput];
                        values[i] = y;
                        self.changeAndTrack(values);

                        self._maybeHideDragPrompt();

                        scaleBar(i, y);
                    },
                    onMoveEnd: function () {
                        config.graph.bars[i].attr({
                            fill: KhanColors.BLUE_C,
                        });
                    },
                },
            );

            // We set the z-index to 1 here so that the hairlines cover up the
            // points
            config.graph.lines[i].state.visibleShape.wrapper.style.zIndex = "1";

            self._maybeShowDragPrompt();
        } else {
            config.graph.lines[i] = graphie.addMovableLineSegment({
                coordA: [x - barHalfWidth, startHeight],
                coordZ: [x + barHalfWidth, startHeight],
                snapY: config.scaleY / self.props.snapsPerLine,
                constraints: {
                    constrainX: true,
                },
                normalStyle: {
                    stroke: KhanColors.INTERACTIVE,
                    // Don't display graph handles in static mode
                    "stroke-width": this.props.static ? 0 : 4,
                },
            });

            config.graph.lines[i].onMove = function (dx, dy: any) {
                let y = this.coordA[1];
                if (y < 0 || y > config.dimY) {
                    y = Math.min(Math.max(y, 0), config.dimY);
                    this.coordA[1] = this.coordZ[1] = y;

                    // Snap the line back into range.
                    this.transform();
                }

                const values = [...self.props.userInput];
                values[i] = y;
                self.changeAndTrack(values);

                scaleBar(i, y);
            };
        }

        scaleBar(i, startHeight);
        return x;
    };

    /**
     * Renders a segment of an interactive line to the plotter graph
     * @param i the index of the point to render
     * @param startHeight the initial height of the given point
     * @param config the graph setup, such as scale and dimensions
     */
    setupLine: (arg1: number, arg2: number, arg3: any) => number = (
        i,
        startHeight,
        config,
    ) => {
        const isMobile = this.props.apiOptions.isMobile;

        const self = this;
        const c = config;
        const graphie = self.graphie;
        const x = i + (isMobile ? 0.4 : 1);

        if (isMobile) {
            const snap = config.scaleY / self.props.snapsPerLine;
            c.graph.points[i] = Interactive2.addMaybeMobileMovablePoint(this, {
                coord: [x, startHeight],
                constraints: [
                    (coord, prev, options: any) => {
                        return [
                            x,
                            this._clampValue(
                                Math.round(coord[1] / snap) * snap,
                                0,
                                config.dimY,
                            ),
                        ];
                    },
                ],
                onMove: function () {
                    const y = c.graph.points[i].coord()[1];

                    const values = [...self.props.userInput];
                    values[i] = y;
                    self.changeAndTrack(values);

                    self._maybeHideDragPrompt();
                },
            });

            self._maybeShowDragPrompt();

            if (i > 0) {
                c.graph.lines[i] = Interactive2.addMovableLine(graphie, {
                    points: [c.graph.points[i - 1], c.graph.points[i]],
                    constraints: Interactive2.MovablePoint.constraints.fixed(),
                    normalStyle: {
                        stroke: KhanColors.BLUE_C,
                        "stroke-width": 2,
                    },
                    highlightStyle: {
                        stroke: KhanColors.BLUE_C,
                        "stroke-width": 2,
                    },
                });
            }
        } else {
            c.graph.points[i] = graphie.addMovablePoint({
                coord: [x, startHeight],
                constraints: {
                    constrainX: true,
                },
                normalStyle: {
                    fill: KhanColors.INTERACTIVE,
                    stroke: KhanColors.INTERACTIVE,
                },
                snapY: c.scaleY / self.props.snapsPerLine,
            });
            c.graph.points[i].onMove = function (x, y) {
                y = Math.min(Math.max(y, 0), c.dimY);
                const values = [...self.props.userInput];
                values[i] = y;
                self.changeAndTrack(values);
                return [x, y];
            };

            if (i > 0) {
                c.graph.lines[i] = graphie.addMovableLineSegment({
                    pointA: c.graph.points[i - 1],
                    pointZ: c.graph.points[i],
                    constraints: {
                        fixed: true,
                    },
                    normalStyle: {
                        stroke: "#9ab8ed",
                        "stroke-width": 2,
                    },
                });
            }
        }

        return x;
    };

    setupDotplot: (arg1: any, arg2: any) => any = (i, config) => {
        const graphie = this.graphie;
        const isMobile = this.props.apiOptions.isMobile;

        return this.setupTiledPlot(i, isMobile ? 0.5 : 1, config, (x, y) => {
            return graphie.ellipse(
                [x, y],
                [
                    this.DOT_PLOT_POINT_SIZE() / graphie.scale[0],
                    this.DOT_PLOT_POINT_SIZE() / graphie.scale[1],
                ],
                {
                    fill: KhanColors.INTERACTIVE,
                    stroke: KhanColors.INTERACTIVE,
                },
            );
        });
    };

    setupPic: (arg1: any, arg2: any) => any = (i, config) => {
        const graphie = this.graphie;
        return this.setupTiledPlot(i, 0, config, (x, y) => {
            const scaledCenter = graphie.scalePoint([x, y]);
            const size = this.props.picSize;
            return graphie.raphael.image(
                this.props.picUrl,
                scaledCenter[0] - size / 2,
                scaledCenter[1] - size / 2,
                size,
                size,
            );
        });
    };

    setupTiledPlot: (arg1: any, arg2: any, arg3: any, arg4: any) => any = (
        i,
        bottomMargin,
        config,
        createImage,
    ) => {
        const self = this;
        const c = config;
        const graphie = self.graphie;
        const pics = graphie.pics;
        const dotTicks = graphie.dotTicks;
        const x = i + 0.5 + c.picPad;

        // In order to make sure that manipulating the graph doesn't cause
        // dragging, we disable touch actions for the whole mouselayer.
        // TODO(emily): Figure out a way to turn of touch actions for only the
        // part of the widget that can be manipulated. Putting this style
        // directly on the rects below doesn't work.
        graphie.mouselayer.canvas.style.touchAction = "none";

        pics[i] = [];
        dotTicks[i] = [];
        const n = Math.round(c.dimY / c.scaleY) + 1;
        _(n).times(function (j) {
            j -= 1;
            const midY = (j + 0.5) * c.scaleY;
            const leftX = x - c.picBoxWidth / 2;
            const topY = midY + 0.5 * c.scaleY;
            const coord = graphie.scalePoint([leftX, topY + bottomMargin]);
            const mouseRect = graphie.mouselayer.rect(
                coord[0],
                coord[1],
                c.picBoxWidthPx,
                c.picBoxHeight,
            );
            $(mouseRect[0])
                .css({fill: "#000", opacity: 0.0, cursor: "pointer"})
                .on("vmousedown", function (e) {
                    e.preventDefault();
                    // @ts-expect-error - TS2339 - Property 'whichPicClicked' does not exist on type 'Plotter'.
                    self.whichPicClicked = i;
                    self.setPicHeight(i, topY);

                    $(document).on("vmouseup.plotTile", function (e) {
                        $(document).unbind(".plotTile");
                    });

                    $(document).on("vmousemove.plotTile", function (e) {
                        e.preventDefault();

                        // Reverse-engineer the initial calculation
                        const yCoord = graphie.getMouseCoord(e)[1];
                        const adjustedCoord = Math.floor(yCoord - bottomMargin);

                        // Calculate top coord from j value, but don't let them
                        // go below j = -1, which is equivalent to having '0'
                        // on the dot plot (due to weird indexing).
                        const newJ = Math.max(
                            -1,
                            Math.floor(adjustedCoord / c.scaleY),
                        );
                        const newMidY = (newJ + 0.5) * c.scaleY;
                        // Constrain the max Y value to max displayable Y of the
                        // plot.  Otherwise users can unintentionally select an
                        // out-of-range value and not see that they have done so.
                        const newTopY = Math.min(
                            newMidY + 0.5 * c.scaleY,
                            c.dimY,
                        );
                        // @ts-expect-error - TS2339 - Property 'whichPicClicked' does not exist on type 'Plotter'.
                        self.setPicHeight(self.whichPicClicked, newTopY);
                    });
                });

            if (j < 0) {
                // Don't show a pic underneath the axis!
                return;
            }
            pics[i][j] = createImage(x, midY + bottomMargin);
            dotTicks[i][j] = graphie.ellipse(
                [x, midY + bottomMargin],
                [
                    self.DOT_TICK_POINT_SIZE() / graphie.scale[0],
                    self.DOT_TICK_POINT_SIZE() / graphie.scale[1],
                ],
                {
                    fill: "#dee1e3",
                    stroke: "#dee1e3",
                },
            );
        });
        return x;
    };

    setPicHeight: (arg1: number, arg2: number) => void = (i, y) => {
        const values = [...this.props.userInput];
        values[i] = y;
        this.drawPicHeights(values, this.props.userInput);
        this.changeAndTrack(values);
    };

    changeAndTrack: (userInput: PerseusPlotterUserInput) => void = (
        userInput,
    ) => {
        this.props.handleUserInput(userInput);
        this.props.trackInteraction();
    };

    /**
     * Plotter uses Graphie and Graphie is inaccessible,
     * this helps us populate user input in tests
     * (not great, but not a lot of options)
     *
     * @internal
     */
    _testInsertUserInput(userInput: PerseusPlotterUserInput) {
        this.props.handleUserInput(userInput);
    }

    drawPicHeights(values: number[], prevValues: number[]): void {
        const self = this;
        const graphie = self.graphie;
        const pics = graphie.pics;

        const isMobile = this.props.apiOptions.isMobile;

        if (isMobile) {
            const shouldDisplay = values.every((v) => v === 0);
            graphie.dotPrompt[0].style.display = shouldDisplay
                ? "inline"
                : "none";
        }

        _.each(pics, function (ps, i) {
            _.each(ps, function (pic, j) {
                const y = (j + 1) * self.props.scaleY;
                const show = y <= values[i];

                if (self.props.type === "dotplot") {
                    const wasShown = y <= prevValues[i];
                    const wasJustShown = show && !wasShown;
                    if (wasJustShown) {
                        pic.animate(
                            {
                                "stroke-width": 8,
                            },
                            75,
                            () =>
                                pic.animate(
                                    {
                                        "stroke-width": 2,
                                    },
                                    75,
                                ),
                        );
                    }
                }
                $(pic[0]).css({display: show ? "inline" : "none"});

                graphie.dotTicks[i][j][0].style.display =
                    show || !isMobile ? "none" : "inline";
            });
        });
    }

    getPromptJSON(): UnsupportedWidgetPromptJSON {
        return _getPromptJSON();
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState/restoreSerializedState
     */
    getSerializedState() {
        const {userInput: _, ...rest} = this.props;
        return {
            ...rest,
            values: this.props.userInput,
        };
    }

    render(): React.ReactNode {
        // TODO(kevinb) actually compute the size of the graphie correctly and
        // make it that size so we don't have to add extra padding.  The value
        // was determined by eye-balling the layout.  :(
        const paddingForBottomLabel = 75;
        const style = {
            marginBottom: this.props.labels[0] ? paddingForBottomLabel : 0,
        } as const;

        return (
            <div
                className={"perseus-widget-plotter graphie"}
                ref={this.graphieDiv}
                style={style}
            />
        );
    }
}

function getStartUserInput(
    options: PlotterPublicWidgetOptions,
): PerseusPlotterUserInput {
    return options.starting;
}

function getCorrectUserInput(
    options: PerseusPlotterWidgetOptions,
): PerseusPlotterUserInput {
    return options.correct;
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState/restoreSerializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusPlotterUserInput {
    return serializedState.values;
}

export default {
    name: "plotter",
    displayName: "Plotter",
    hidden: true,
    widget: Plotter,
    getCorrectUserInput,
    staticTransform: _.identity,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof Plotter>;
