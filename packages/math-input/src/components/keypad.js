/**
 * A keypad component that acts as a container for rows or columns of buttons,
 * and manages the rendering of echo animations on top of those buttons.
 */

const React = require("react");
const PropTypes = require("prop-types");
const ReactDOM = require("react-dom");
const {connect} = require("react-redux");

const {removeEcho} = require("../actions");
const {View} = require("../fake-react-native-web");
const EchoManager = require("./echo-manager");
const PopoverManager = require("./popover-manager");
const {echoPropType, popoverPropType} = require("./prop-types");

class Keypad extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]),
        removeEcho: PropTypes.func.isRequired,
        style: PropTypes.any,

        // The props below are injected by redux

        // Whether the keypad is active, i.e., whether it should be rendered as
        // visible or invisible.
        active: PropTypes.bool,
        echoes: PropTypes.arrayOf(echoPropType).isRequired,
        popover: popoverPropType,
    };

    componentDidMount() {
        this._isMounted = true;

        window.addEventListener("resize", this._onResize);
        this._updateSizeAndPosition();
    }

    componentWillReceiveProps(newProps) {
        if (!this._container && (newProps.popover || newProps.echoes.length)) {
            this._computeContainer();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;

        window.removeEventListener("resize", this._onResize);
    }

    _computeContainer = () => {
        const domNode = ReactDOM.findDOMNode(this);
        this._container = domNode.getBoundingClientRect();
    };

    _updateSizeAndPosition = () => {
        // Mark the container for recalculation next time the keypad is
        // opened.
        // TODO(charlie): Since we're not recalculating the container
        // immediately, if you were to resize the page while a popover were
        // active, you'd likely get unexpected behavior. This seems very
        // difficult to do and, as such, incredibly unlikely, but we may
        // want to reconsider the caching here.
        this._container = null;
    };

    _onResize = () => {
        // Whenever the page resizes, we need to recompute the container's
        // bounding box. This is the only time that the bounding box can change.

        // Throttle resize events -- taken from:
        //    https://developer.mozilla.org/en-US/docs/Web/Events/resize
        if (this._resizeTimeout == null) {
            this._resizeTimeout = setTimeout(() => {
                this._resizeTimeout = null;

                if (this._isMounted) {
                    this._updateSizeAndPosition();
                }
            }, 66);
        }
    };

    render() {
        const {children, echoes, removeEcho, popover, style} = this.props;

        // Translate the echo boxes, as they'll be positioned absolutely to
        // this relative container.
        const relativeEchoes = echoes.map((echo) => {
            const {initialBounds, ...rest} = echo;
            return {
                ...rest,
                initialBounds: {
                    top: initialBounds.top - this._container.top,
                    right: initialBounds.right - this._container.left,
                    bottom: initialBounds.bottom - this._container.top,
                    left: initialBounds.left - this._container.left,
                    width: initialBounds.width,
                    height: initialBounds.height,
                },
            };
        });

        // Translate the popover bounds from page-absolute to keypad-relative.
        // Note that we only need three bounds, since popovers are anchored to
        // the bottom left corners of the keys over which they appear.
        const relativePopover = popover && {
            ...popover,
            bounds: {
                bottom:
                    this._container.height -
                    (popover.bounds.bottom - this._container.top),
                left: popover.bounds.left - this._container.left,
                width: popover.bounds.width,
            },
        };

        return (
            <View style={style}>
                {children}
                <EchoManager
                    echoes={relativeEchoes}
                    onAnimationFinish={removeEcho}
                />
                <PopoverManager popover={relativePopover} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.echoes,
        active: state.keypad.active,
        popover: state.gestures.popover,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeEcho: (animationId) => {
            dispatch(removeEcho(animationId));
        },
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(Keypad);
