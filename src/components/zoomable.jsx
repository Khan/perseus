/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * Zooms child to fit with tap-to-zoom behavior.
 */

const React = require("react");
const ReactDOM = require("react-dom");

const Deferred = require("../deferred.js");

const Zoomable = React.createClass({
    propTypes: {
        animateHeight: React.PropTypes.bool,
        children: React.PropTypes.element.isRequired,

        /**
         * Optional function that allows customizations in zooming.
         *
         * Defaults to just using the bounding client rect of the first DOM
         * element of this component.
         *
         * @return {Object} bounds object with `width` and `height` properties
         */
        computeChildBounds: React.PropTypes.func,

        // If this prop is specified, we wait until the deferred is resolved
        // before measuring the child element.  This is necessary in cases
        // where the child size depends on whether or not resources, such as
        // fonts, have been loaded.
        readyToMeasureDeferred: React.PropTypes.shape({
            then: React.PropTypes.func.isRequired,
            reject: React.PropTypes.func.isRequired,
        }).isRequired,
    },

    getDefaultProps() {
        const deferred = new Deferred();
        deferred.resolve();

        return {
            animateHeight: false,
            readyToMeasureDeferred: deferred,
            computeChildBounds: (parentNode) => {
                const firstChild = parentNode.firstElementChild;

                return {
                    // The +1 is a fudge factor to make sure any border on the
                    // content isn't clipped by the the container it's in.
                    width: firstChild.offsetWidth + 1,
                    height: firstChild.offsetHeight + 1,
                };
            },
        };
    },

    getInitialState() {
        return {
            visible: false,
            marginBottomPx: 0,
            zoomed: true,
        };
    },

    componentDidMount() {
        this._node = ReactDOM.findDOMNode(this);
        this.props.readyToMeasureDeferred.then(() => {
            if (this.isMounted()) {
                this.scaleChildToFit(false);

                if (window.MutationObserver) {
                    this._observer = new MutationObserver((mutations) => {
                        if (this.isMounted()) {
                            for (const mutation of mutations) {
                                if (mutation.target !== this._node) {
                                    // Only act on mutations of children
                                    this.scaleChildToFit(this.state.zoomed);
                                    break;
                                }
                            }
                        }
                    });

                    this._observer.observe(this._node, {
                        childList: true, subtree: true, attributes: true,
                    });
                }
                window.addEventListener("resize", this.reset);
            }
        });
    },

    componentWillUnmount() {
        window.removeEventListener("resize", this.reset);
        if (this._observer) {
            this._observer.disconnect();
        }
    },

    reset() {
        if (!this.isMounted()) {
            return;
        }
        if (!this.state.visible) {
            return;
        }
        this._originalWidth = null;
        this.setState({
            visible: false,
            compactHeight: null,
            expandedHeight: null,
            zoomed: true,
        }, () => {
            this.scaleChildToFit(false);
        });
    },

    stopPropagationIfZoomed(e) {
        if (!this.state.zoomed) {
            // We only allow touch events (which trigger interactive elements)
            // to be propagated to children if we are already zoomed.
            e.stopPropagation();
        }
    },

    // TODO(benkomalo): call this on viewport width changes?
    // https://github.com/Khan/math-input/blob/master/src/components/math-keypad.js#L43
    scaleChildToFit(zoomed) {
        const parentBounds = {
            width: this._node.offsetWidth,
            height: this._node.offsetHeight,
        };
        const childBounds =
            this.props.computeChildBounds(this._node, parentBounds);

        const childWidth = childBounds.width;
        const childHeight = childBounds.height;

        if (childWidth > parentBounds.width) {
            const scale = parentBounds.width / childWidth;

            this.setState({
                scale: scale,
                zoomed: zoomed,

                compactHeight: Math.ceil(scale * childHeight),
                expandedHeight: childHeight,
            });

            // TODO(charlie): Do this as a callback to `setState`. Something is
            // going wrong with that approach in initial testing.
            setTimeout(() => {
                // Only show it after the next paint, to allow for CSS
                // transitions to fade it in.
                if (this.isMounted()) {
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
    },

    handleClickIfZoomed(e) {
        if (!this.state.zoomed) {
            e.stopPropagation();
            this.handleClick();
        }
    },

    handleClick() {
        this.setState({
            zoomed: !this.state.zoomed,
        });
    },

    render() {
        const {
            visible, scale, compactHeight, expandedHeight, zoomed,
        } = this.state;
        const { animateHeight } = this.props;

        const property = animateHeight
                ? 'opacity transform height'
                : 'opacity transform';

        // Since we're not using aphrodite, we have to prefix ourselves.
        const transitionStyle = visible ? {
            transitionProperty: property,
            WebkitTransitionProperty: property,
            msTransitionProperty: property,
            transitionDuration: '0.3s',
            WebkitTransitionDuration: '0.3s',
            msTransitionDuration: '0.3s',
            transitionTimingFunction: 'ease-out',
            WebkitTransitionTimingfunction: 'ease-out',
            msTransitionTmingFunction: 'ease-out',
        } : {};

        // Do a fancy little slide as we fade the contents in the first time.
        const translateOffset = visible ? '' : ' translate(0, 8px)';
        const transform =  zoomed
                ? `scale(1, 1) ${translateOffset}`
                : `scale(${scale}, ${scale}) ${translateOffset}`;

        const style = {
            display: 'block',
            width: '100%',
            height: zoomed ? expandedHeight : compactHeight,
            transform: transform,
            WebkitTransform: transform,
            msTransform: transform,
            transformOrigin: '0 0',
            WebkitTransformOrigin: '0 0',
            msTransformOrigin: '0 0',
            opacity: visible ? 1 : 0,
            WebkitTapHighlightColor: 'transparent',
            ...transitionStyle,
        };

        return <span
            onClick={this.handleClick}
            onClickCapture={this.handleClickIfZoomed}
            onTouchCancelCapture={this.stopPropagationIfZoomed}
            onTouchEndCapture={this.stopPropagationIfZoomed}
            onTouchStartCapture={this.stopPropagationIfZoomed}
            style={style}
        >
            {this.props.children}
        </span>;
    },
});

module.exports = Zoomable;
