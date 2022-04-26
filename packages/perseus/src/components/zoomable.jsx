// @flow
/**
 * Zooms child to fit with tap-to-zoom behavior.
 */

import * as React from "react";
import ReactDOM from "react-dom";

type Bounds = {|
    width: number,
    height: number,
|};

type Props = {|
    children: React.Node,
    animateHeight: boolean,

    /**
     * Optional function that allows customizations in zooming.
     *
     * Defaults to just using the bounding client rect of the first DOM
     * element of this component.
     */
    computeChildBounds: (
        parentNode: HTMLElement,
        parentBounds: Bounds,
    ) => Bounds,

    /**
     * Optional boolean specifying whether the component is ready to measure
     * or not.  Defaults to true for synchronous components like tables.
     */
    readyToMeasure: boolean,
|};

type DefaultProps = {|
    animateHeight: Props["animateHeight"],
    computeChildBounds: Props["computeChildBounds"],
    readyToMeasure: Props["readyToMeasure"],
|};

type State = {|
    visible: boolean,
    marginBottomPx: number,
    compactHeight?: ?number,
    expandedHeight?: ?number,
    scale?: ?number,
    zoomed: boolean,
|};

class Zoomable extends React.Component<Props, State> {
    _isMounted: boolean;
    _observer: MutationObserver;
    _measuringInitialized: boolean;
    _originalWidth: ?number;
    _node: HTMLElement;

    static defaultProps: DefaultProps = {
        animateHeight: false,
        readyToMeasure: true,
        computeChildBounds: (parentNode) => {
            const firstChild = parentNode.firstElementChild;

            return {
                // $FlowFixMe[incompatible-use]
                // $FlowFixMe[prop-missing]
                width: firstChild.offsetWidth,
                // $FlowFixMe[incompatible-use]
                // $FlowFixMe[prop-missing]
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
            // $FlowFixMe[incompatible-type] - this is our root node, it won't be text
            this._node = ReactDOM.findDOMNode(this);

            // We call measureAndScaleChildToFit asynchronously so that the browser
            // can apply CSS styles so that we get an accurate measurement.
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
            // eslint-disable-next-line no-restricted-syntax
            setTimeout(() => this.measureAndScaleChildToFit(false), 0);

            if (window.MutationObserver) {
                this._observer = new MutationObserver((mutations) => {
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
                });

                this._observer.observe(this._node, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                });
            }
            window.addEventListener("resize", this.reset);
        }
    }

    stopPropagationIfZoomed: (e: SyntheticTouchEvent<>) => void = (
        e: SyntheticTouchEvent<>,
    ) => {
        if (!this.state.zoomed) {
            // We only allow touch events (which trigger interactive elements)
            // to be propagated to children if we are already zoomed.
            e.stopPropagation();
        }
    };

    // TODO(benkomalo): call this on viewport width changes?
    // https://github.com/Khan/math-input/blob/master/src/components/math-keypad.js#L43
    measureAndScaleChildToFit(zoomed: boolean) {
        if (!this._isMounted) {
            return;
        }
        const parentBounds = {
            width: this._node.offsetWidth,
            height: this._node.offsetHeight,
        };
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

            // TODO(charlie): Do this as a callback to `setState`. Something is
            // going wrong with that approach in initial testing.
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

    handleClickIfZoomed: (e: SyntheticMouseEvent<>) => void = (
        e: SyntheticMouseEvent<>,
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

    render(): React.Node {
        const {visible, scale, compactHeight, expandedHeight, zoomed} =
            this.state;
        const {animateHeight} = this.props;

        const property = animateHeight
            ? "opacity transform height"
            : "opacity transform";

        // Since we're not using aphrodite, we have to prefix ourselves.
        const transitionStyle = visible
            ? {
                  transitionProperty: property,
                  WebkitTransitionProperty: property,
                  msTransitionProperty: property,
                  transitionDuration: "0.3s",
                  WebkitTransitionDuration: "0.3s",
                  msTransitionDuration: "0.3s",
                  transitionTimingFunction: "ease-out",
                  WebkitTransitionTimingfunction: "ease-out",
                  msTransitionTmingFunction: "ease-out",
              }
            : {};

        // Do a fancy little slide as we fade the contents in the first time.
        const translateOffset = visible ? "" : " translate(0, 8px)";
        const scaleString = (scale ?? 1).toString();
        const transform = zoomed
            ? `scale(1, 1) ${translateOffset}`
            : `scale(${scaleString}, ${scaleString}) ${translateOffset}`;

        const style = {
            display: "block",
            width: "100%",
            height: zoomed ? expandedHeight : compactHeight,
            transform: transform,
            WebkitTransform: transform,
            msTransform: transform,
            transformOrigin: "0 0",
            WebkitTransformOrigin: "0 0",
            msTransformOrigin: "0 0",
            opacity: visible ? 1 : 0,
            WebkitTapHighlightColor: "transparent",
            ...transitionStyle,
        };

        return (
            <span
                onClick={this.handleClick}
                onClickCapture={this.handleClickIfZoomed}
                onTouchCancelCapture={this.stopPropagationIfZoomed}
                onTouchEndCapture={this.stopPropagationIfZoomed}
                onTouchStartCapture={this.stopPropagationIfZoomed}
                style={style}
            >
                {this.props.children}
            </span>
        );
    }
}

export default Zoomable;
