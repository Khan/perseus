/**
 * A component that renders a navigation pad, which consists of an arrow for
 * each possible direction.
 */
const React = require("react");
const PropTypes = require("prop-types");

const {StyleSheet} = require("aphrodite");
const {View} = require("../fake-react-native-web");
const TouchableKeypadButton = require("./touchable-keypad-button");
const {row, column, centered, stretch, roundedTopLeft} = require("./styles");
const {
    navigationPadWidthPx,
    controlGrey,
    valueGrey,
    offBlack16,
} = require("./common-style");
const {BorderStyles} = require("../consts");
const KeyConfigs = require("../data/key-configs");

class NavigationPad extends React.Component {
    static propTypes = {
        roundTopLeft: PropTypes.bool,
        style: PropTypes.any,
    };

    render() {
        // TODO(charlie): Disable the navigational arrows depending on the
        // cursor context.
        const {roundTopLeft, style} = this.props;

        const containerStyle = [
            column,
            centered,
            styles.container,
            roundTopLeft && roundedTopLeft,
            ...(Array.isArray(style) ? style : [style]),
        ];

        return (
            <View style={containerStyle}>
                <View style={[row, centered]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.UP}
                        borders={BorderStyles.NONE}
                        style={[styles.navigationKey, styles.topArrow]}
                    />
                </View>
                <View style={[row, centered, stretch]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.LEFT}
                        borders={BorderStyles.NONE}
                        style={[styles.navigationKey, styles.leftArrow]}
                    />
                    <View style={styles.horizontalSpacer} />
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.RIGHT}
                        borders={BorderStyles.NONE}
                        style={[styles.navigationKey, styles.rightArrow]}
                    />
                </View>
                <View style={[row, centered]}>
                    <TouchableKeypadButton
                        keyConfig={KeyConfigs.DOWN}
                        borders={BorderStyles.NONE}
                        style={[styles.navigationKey, styles.bottomArrow]}
                    />
                </View>
            </View>
        );
    }
}

const buttonSizePx = 48;
const borderRadiusPx = 4;
const borderWidthPx = 1;

const styles = StyleSheet.create({
    container: {
        backgroundColor: controlGrey,
        width: navigationPadWidthPx,
    },

    navigationKey: {
        borderColor: offBlack16,
        backgroundColor: valueGrey,
        width: buttonSizePx,
        height: buttonSizePx,

        // Override the default box-sizing so that our buttons are
        // `buttonSizePx` exclusive of their borders.
        boxSizing: "content-box",
    },

    topArrow: {
        borderTopWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderTopLeftRadius: borderRadiusPx,
        borderTopRightRadius: borderRadiusPx,
    },

    rightArrow: {
        borderTopWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderBottomWidth: borderWidthPx,
        borderTopRightRadius: borderRadiusPx,
        borderBottomRightRadius: borderRadiusPx,
    },

    bottomArrow: {
        borderBottomWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderBottomLeftRadius: borderRadiusPx,
        borderBottomRightRadius: borderRadiusPx,
    },

    leftArrow: {
        borderTopWidth: borderWidthPx,
        borderBottomWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
        borderTopLeftRadius: borderRadiusPx,
        borderBottomLeftRadius: borderRadiusPx,
    },

    horizontalSpacer: {
        background: valueGrey,
        // No need to set a height -- the spacer will be stretched by its
        // parent.
        width: buttonSizePx,
    },
});

module.exports = NavigationPad;
