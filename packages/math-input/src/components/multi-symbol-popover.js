/**
 * A popover that renders a set of keys floating above the page.
 */

const React = require("react");
const PropTypes = require("prop-types");
const {StyleSheet} = require("aphrodite");

const {View} = require("../fake-react-native-web");
const {keyConfigPropType} = require("./prop-types");
const {BorderStyles} = require("../consts");
const zIndexes = require("./z-indexes");

class MultiSymbolPopover extends React.Component {
    static propTypes = {
        keys: PropTypes.arrayOf(keyConfigPropType),
    };

    render() {
        const {keys} = this.props;

        // TODO(charlie): We have to require this lazily because of a cyclic
        // dependence in our components.
        const TouchableKeypadButton = require("./touchable-keypad-button");
        return (
            <View style={styles.container}>
                {keys.map((key) => {
                    return (
                        <TouchableKeypadButton
                            key={key.id}
                            keyConfig={key}
                            borders={BorderStyles.NONE}
                        />
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column-reverse",
        position: "relative",
        width: "100%",
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
        zIndex: zIndexes.popover,
    },

    popoverButton: {
        backgroundColor: "#FFF",
        borderWidth: 0,
    },
});

module.exports = MultiSymbolPopover;
