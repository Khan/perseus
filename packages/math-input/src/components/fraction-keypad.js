/**
 * A keypad that includes the digits, as well as the symbols required to deal
 * with fractions, decimals, and percents.
 */

const React = require("react");
const PropTypes = require("prop-types");
const {connect} = require("react-redux");

const {View} = require("../fake-react-native-web");
const Keypad = require("./keypad");
const TouchableKeypadButton = require("./touchable-keypad-button");
const {row, roundedTopLeft, roundedTopRight} = require("./styles");
const {BorderStyles} = require("../consts");
const CursorContexts = require("./input/cursor-contexts");
const {cursorContextPropType} = require("./prop-types");
const KeyConfigs = require("../data/key-configs");

class FractionKeypad extends React.Component {
    static propTypes = {
        cursorContext: cursorContextPropType.isRequired,
        dynamicJumpOut: PropTypes.bool,
        roundTopLeft: PropTypes.bool,
        roundTopRight: PropTypes.bool,
    };

    static rows = 4;
    static columns = 4;

    // Since we include a two-key popover in the top-right, when the popover
    // is visible, the keypad will expand to fill the equivalent of five
    // rows vertically.
    static maxVisibleRows = 5;

    static numPages = 1;

    render() {
        const {
            cursorContext,
            dynamicJumpOut,
            roundTopLeft,
            roundTopRight,
        } = this.props;

        let dismissOrJumpOutKey;
        if (dynamicJumpOut) {
            switch (cursorContext) {
                case CursorContexts.IN_PARENS:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_PARENTHESES;
                    break;

                case CursorContexts.IN_SUPER_SCRIPT:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_EXPONENT;
                    break;

                case CursorContexts.IN_SUB_SCRIPT:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_BASE;
                    break;

                case CursorContexts.BEFORE_FRACTION:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_INTO_NUMERATOR;
                    break;

                case CursorContexts.IN_NUMERATOR:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_NUMERATOR;
                    break;

                case CursorContexts.IN_DENOMINATOR:
                    dismissOrJumpOutKey = KeyConfigs.JUMP_OUT_DENOMINATOR;
                    break;

                case CursorContexts.NONE:
                default:
                    dismissOrJumpOutKey = KeyConfigs.DISMISS;
                    break;
            }
        } else {
            dismissOrJumpOutKey = KeyConfigs.DISMISS;
        }

        return (
            <Keypad>
                <View style={row}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_7}
                        borders={BorderStyles.NONE}
                        style={roundTopLeft && roundedTopLeft}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_8}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_9}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.FRAC}
                        disabled={
                            // NOTE(charlie): It's only sufficient to use
                            // `IN_NUMERATOR` and `IN_DENOMINATOR` here because we
                            // don't support parentheses in this keypad. If we did,
                            // then when the cursor was inside a parenthetical
                            // expression in a numerator or denominator, this check
                            // would fail.
                            cursorContext === CursorContexts.IN_NUMERATOR ||
                            cursorContext === CursorContexts.IN_DENOMINATOR
                        }
                        style={roundTopRight && roundedTopRight}
                    />
                </View>
                <View style={row}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_4}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_5}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_6}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton keyConfig={KeyConfigs.PERCENT} />
                </View>
                <View style={row}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_1}
                        borders={BorderStyles.BOTTOM}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_2}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_3}
                        borders={BorderStyles.BOTTOM}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.BACKSPACE}
                        borders={BorderStyles.LEFT}
                    />
                </View>
                <View style={row}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NEGATIVE}
                        borders={BorderStyles.NONE}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.NUM_0}
                        borders={BorderStyles.LEFT}
                    />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.DECIMAL}
                        borders={BorderStyles.LEFT}
                    />
                    <TouchableKeypadButton
                        keyConfig={dismissOrJumpOutKey}
                        borders={BorderStyles.LEFT}
                    />
                </View>
            </Keypad>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cursorContext: state.input.cursor.context,
        dynamicJumpOut: !state.layout.navigationPadEnabled,
    };
};

module.exports = connect(mapStateToProps, null, null, {forwardRef: true})(
    FractionKeypad,
);
