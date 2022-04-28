/**
 * A keypad button containing no symbols and triggering no actions on click.
 */

const React = require("react");
const PropTypes = require("prop-types");
const {connect} = require("react-redux");

const GestureManager = require("./gesture-manager");
const KeyConfigs = require("../data/key-configs");
const KeypadButton = require("./keypad-button");

class EmptyKeypadButton extends React.Component {
    static propTypes = {
        gestureManager: PropTypes.instanceOf(GestureManager),
    };

    render() {
        const {gestureManager, ...rest} = this.props;

        // Register touch events on the button, but don't register its DOM node
        // or compute focus state or anything like that. We want the gesture
        // manager to know about touch events that start on empty buttons, but
        // we don't need it to know about their DOM nodes, as it doesn't need
        // to focus them or trigger presses.
        return (
            <KeypadButton
                onTouchStart={(evt) => gestureManager.onTouchStart(evt)}
                onTouchEnd={(evt) => gestureManager.onTouchEnd(evt)}
                onTouchMove={(evt) => gestureManager.onTouchMove(evt)}
                onTouchCancel={(evt) => gestureManager.onTouchCancel(evt)}
                {...KeyConfigs.NOOP}
                {...rest}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const {gestures} = state;
    return {
        gestureManager: gestures.gestureManager,
    };
};

module.exports = connect(mapStateToProps, null, null, {forwardRef: true})(
    EmptyKeypadButton,
);
