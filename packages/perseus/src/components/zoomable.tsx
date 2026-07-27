/* eslint-disable @khanacademy/ts-no-error-suppressions */

import * as React from "react";
import ReactDOM from "react-dom";

import AssetContext from "../asset-context";
import {getCSSZoomFactor} from "../util/css-zoom-utils";

/**
 * Duration of the transition that fades/slides content in once it's visible.
 * Shared by the CSS transition and the timer that waits for it to finish.
 */
const ENTRANCE_TRANSITION_DURATION_MS = 300;

let assetKeyCounter = 0;

type Bounds = {
    width: number;
    height: number;
};

type Props = {
    children: React.ReactNode;
    animateHeight: boolean;

    disableEntranceAnimation: boolean;
    /**
     * Optional function that allows customizations in zooming.
     *
     * Defaults to just using the bounding client rect of the first DOM
     * element of this component.
     */
    computeChildBounds: (
        parentNode: HTMLElement,
        parentBounds: Bounds,
    ) => Bounds;
    /**
     * Optional boolean specifying whether the component is ready to measure
     * or not.  Defaults to true for synchronous components like tables.
     */
    readyToMeasure: boolean;
};

type DefaultProps = {
    animateHeight: Props["animateHeight"];
    computeChildBounds: Props["computeChildBounds"];
    readyToMeasure: Props["readyToMeasure"];
    disableEntranceAnimation: Props["disableEntranceAnimation"];
};

type State = {
    visible: boolean;
    marginBottomPx: number;
    compactHeight?: number | null | undefined;
    expandedHeight?: number | null | undefined;
    scale?: number | null | undefined;
    zoomed: boolean;
};

/**
 * Zooms child to fit with tap-to-zoom behavior.
 */
class Zoomable extends React.Component<Props, State> {
    static contextType = AssetContext;
    declare context: React.ContextType<typeof AssetContext>;

    // Zoomable's content isn't at its final size or visible until measuring
    // completes, so it registers as an unsettled asset.
    _assetKey: string;
    _hasSettled: boolean = false;
    _settleTimeoutId: ReturnType<typeof setTimeout> | null = null;

    // @ts-expect-error - TS2564 - Property '_isMounted' has no initializer and is not definitely assigned in the constructor.
    _isMounted: boolean;
    // @ts-expect-error - TS2564 - Property '_observer' has no initializer and is not definitely assigned in the constructor.
    _observer: MutationObserver;
    // @ts-expect-error - TS2564 - Property '_measuringInitialized' has no initializer and is not definitely assigned in the constructor.
    _measuringInitialized: boolean;
    _originalWidth: number | null | undefined;
    // @ts-expect-error - TS2564 - Property '_node' has no initializer and is not definitely assigned in the constructor.
    _node: HTMLElement;

    static defaultProps: DefaultProps = {
        animateHeight: false,
        readyToMeasure: true,
        disableEntranceAnimation: false,
        computeChildBounds: (parentNode) => {
            const firstChild = parentNode.firstElementChild;

            return {
                // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'offsetWidth' does not exist on type 'Element'.
                width: firstChild.offsetWidth,
                // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'offsetHeight' does not exist on type 'Element'.
                height: firstChild.offsetHeight,
            };
        },
    };

    state: State = {
        visible: false,
        marginBottomPx: 0,
        zoomed: true,
    };

    constructor(props: Props, context: React.ContextType<typeof AssetContext>) {
        super(props, context);

        assetKeyCounter += 1;
        this._assetKey = `zoomable-${assetKeyCounter}`;
        context.setAssetStatus(this._assetKey, false);
    }

    componentDidMount() {
        this._isMounted = true;
        this.maybeInitializeMeasuring();
    }

    componentDidUpdate() {
        this.maybeInitializeMeasuring();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.reset);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (this._observer) {
            this._observer.disconnect();
        }
        if (this._settleTimeoutId != null) {
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
            // eslint-disable-next-line no-restricted-syntax
            clearTimeout(this._settleTimeoutId);
            this._settleTimeoutId = null;
        }

        this._isMounted = false;
    }

    /**
     * Reports to the AssetContext that this Zoomable has settled: it's been
     * measured, scaled, and finished animating in.
     *
     * Content becoming visible is the last measurement-driven change, but when
     * the entrance animation is enabled the content is still moving after
     * that, so we wait it out. We only ever report settling once; later
     * re-measurements (from a resize or a child mutation) don't unsettle us.
     */
    markSettledWhenVisible() {
        if (this._hasSettled || this._settleTimeoutId != null) {
            return;
        }

        if (this.props.disableEntranceAnimation) {
            this._hasSettled = true;
            this.context.setAssetStatus(this._assetKey, true);
            return;
        }

        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
        // eslint-disable-next-line no-restricted-syntax
        this._settleTimeoutId = setTimeout(() => {
            this._settleTimeoutId = null;
            this._hasSettled = true;
            this.context.setAssetStatus(this._assetKey, true);
        }, ENTRANCE_TRANSITION_DURATION_MS);
    }

    reset: () => void = (): void => {
        if (!this._isMounted) {
            return;
        }
        if (!this.state.visible) {
            return;
        }
        this._originalWidth = null;
        this.setState(
            {
                visible: false,
                compactHeight: null,
                expandedHeight: null,
                zoomed: true,
            },
            () => {
                this.measureAndScaleChildToFit(false);
            },
        );
    };

    /**
     * Calls measureAndScaleChildToFit and sets up a MutationObserver
     * to call measureAndScaleChildToFit if Zoomable's children change.
     *
     * If the readyToMeasure prop isn't true or if measuring has already
     * been initialized this method does nothing.
     */
    maybeInitializeMeasuring() {
        const shouldInitialize =
            this.props.readyToMeasure && !this._measuringInitialized;

        if (this._isMounted && shouldInitialize) {
            this._measuringInitialized = true;
            // @ts-expect-error - TS2322 - Type 'Element | Text | null' is not assignable to type 'HTMLElement'.
            this._node = ReactDOM.findDOMNode(this);

            // We call measureAndScaleChildToFit asynchronously so that the browser
            // can apply CSS styles so that we get an accurate measurement.
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
            setTimeout(() => this.measureAndScaleChildToFit(false), 0);

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (window.MutationObserver) {
                this._observer = new MutationObserver(
                    (mutations: Array<MutationRecord>) => {
                        if (this._isMounted) {
                            for (const mutation of mutations) {
                                if (mutation.target !== this._node) {
                                    // Only act on mutations of children
                                    this.measureAndScaleChildToFit(
                                        this.state.zoomed,
                                    );
                                    break;
                                }
                            }
                        }
                    },
                );

                this._observer.observe(this._node, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                });
            }
            window.addEventListener("resize", this.reset);
        }
    }

    stopPropagationIfZoomed: (e: React.TouchEvent) => void = (
        e: React.TouchEvent,
    ) => {
        if (!this.state.zoomed) {
            // We only allow touch events (which trigger interactive elements)
            // to be propagated to children if we are already zoomed.
            e.stopPropagation();
        }
    };

    measureAndScaleChildToFit(zoomed: boolean) {
        if (!this._isMounted) {
            return;
        }

        // When a zoomable item is contained within a collapsed parent (such as an Explanation widget),
        //      the parent node has zero width, which causes the scale to be miscalculated.
        // Therefore, we check to see if the node has a valid width, and if it doesn't,
        //      then we traverse up the DOM tree and look for the closest "perseus-renderer"
        //      (which should have a width).
        // To be cautious, we also account for the possibility that we can't find any parents with a valid width
        //      (not that they don't exist, just that we can't find them).
        let parentNode = this._node;
        let currentNode: HTMLElement | null = parentNode;
        while (currentNode && currentNode.offsetWidth === 0) {
            // When traversing up the DOM tree, we need to start at the "parentElement"
            //      because "closest()" can match the current element,
            //      and if it does so, then we are stuck in an infinite loop.
            currentNode =
                currentNode.parentElement?.closest(".perseus-renderer") ?? null;
        }
        if (currentNode) {
            parentNode = currentNode;
        }
        const parentBounds = {
            width: parentNode.offsetWidth,
            height: parentNode.offsetHeight,
        } as const;
        const childBounds = this.props.computeChildBounds(
            this._node,
            parentBounds,
        );

        // The +1 is a fudge factor to make sure any border on the
        // content isn't clipped by the the container it's in.
        const childWidth = childBounds.width + 1;
        const childHeight = childBounds.height + 1;

        // Fit to the zoom-adjusted width so the fitted content's visual
        // size grows with the device font scale instead of being scaled
        // back down to its unzoomed size. Overflow at the enlarged size is
        // handled by the parent's overflowX scrolling and tap-to-zoom.
        const availableWidth =
            parentBounds.width * getCSSZoomFactor(this._node);

        if (childWidth > availableWidth) {
            const scale = availableWidth / childWidth;

            this.setState({
                scale,
                zoomed,

                compactHeight: Math.ceil(scale * childHeight),
                expandedHeight: childHeight,
            });

            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
            setTimeout(() => {
                // Only show it after the next paint, to allow for CSS
                // transitions to fade it in.
                if (this._isMounted) {
                    this.setState({
                        visible: true,
                    });
                    this.markSettledWhenVisible();
                }
            });
        } else {
            this.setState({
                visible: true,
            });
            this.markSettledWhenVisible();
        }
    }

    handleClickIfZoomed: (e: React.MouseEvent) => void = (
        e: React.MouseEvent,
    ) => {
        if (!this.state.zoomed) {
            e.stopPropagation();
            this.handleClick();
        }
    };

    handleClick: () => void = () => {
        this.setState({
            zoomed: !this.state.zoomed,
        });
    };

    render(): React.ReactNode {
        const {visible, scale, compactHeight, expandedHeight, zoomed} =
            this.state;
        const {animateHeight, disableEntranceAnimation} = this.props;

        const property = animateHeight
            ? "opacity transform height"
            : "opacity transform";

        // Since we're not using aphrodite, we have to prefix ourselves.
        const transitionStyle = visible
            ? {
                  transitionProperty: property,
                  transitionDuration: `${
                      ENTRANCE_TRANSITION_DURATION_MS / 1000
                  }s`,
                  transitionTimingFunction: "ease-out",
              }
            : {};

        // Do a fancy little slide as we fade the contents in the first time.
        const shouldSlide = !disableEntranceAnimation && !visible;
        const translateOffset = shouldSlide ? " translate(0, 8px)" : "";
        const opacity = shouldSlide ? 0 : 1;

        const scaleString = (scale ?? 1).toString();
        const transform = zoomed
            ? `scale(1, 1) ${translateOffset}`
            : `scale(${scaleString}, ${scaleString}) ${translateOffset}`;

        const style = {
            display: "block",
            width: "100%",
            height: zoomed ? expandedHeight : compactHeight,
            transform: transform,
            transformOrigin: "0 0",
            opacity: opacity,
            WebkitTapHighlightColor: "transparent",
            ...transitionStyle,
        } as const;

        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- TODO(LEMS-2871): Address a11y error
            <span
                onClick={this.handleClick}
                onClickCapture={this.handleClickIfZoomed}
                onTouchCancelCapture={this.stopPropagationIfZoomed}
                onTouchEndCapture={this.stopPropagationIfZoomed}
                onTouchStartCapture={this.stopPropagationIfZoomed}
                // @ts-expect-error - TS2322 - Type '{ readonly transitionProperty: string; readonly transitionDuration: string; readonly transitionTimingFunction: string; readonly display: "block"; readonly width: "100%"; readonly height: number | ... 1 more ... | undefined; readonly transform: string; readonly transformOrigin: "0 0"; readonly opacity: 0 | 1; readonl...' is not assignable to type 'CSSProperties | undefined'.
                style={style}
            >
                {this.props.children}
            </span>
        );
    }
}

export default Zoomable;
