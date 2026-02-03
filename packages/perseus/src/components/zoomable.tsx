/* eslint-disable @khanacademy/ts-no-error-suppressions */
/**
 * Zooms child to fit with tap-to-zoom behavior.
 */

import * as React from "react";
import ReactDOM from "react-dom";

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

class Zoomable extends React.Component<Props, State> {
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

        this._isMounted = false;
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
            // eslint-disable-next-line no-restricted-syntax
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

        if (childWidth > parentBounds.width) {
            const scale = parentBounds.width / childWidth;

            this.setState({
                scale,
                zoomed,

                compactHeight: Math.ceil(scale * childHeight),
                expandedHeight: childHeight,
            });

            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
            // eslint-disable-next-line no-restricted-syntax
            setTimeout(() => {
                // Only show it after the next paint, to allow for CSS
                // transitions to fade it in.
                if (this._isMounted) {
                    this.setState({
                        visible: true,
                    });
                }
            });
        } else {
            this.setState({
                visible: true,
            });
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
                  transitionDuration: "0.3s",
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
