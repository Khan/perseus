/**
 * A keypad button that displays an arbitrary number of symbols, with no
 * 'default' symbol.
 */

const React = require("react");
const PropTypes = require("prop-types");

const EmptyKeypadButton = require("./empty-keypad-button");
const TouchableKeypadButton = require("./touchable-keypad-button");

const Keys = require("../data/keys");
const KeyConfigs = require("../data/key-configs");
const {KeyTypes} = require("../consts");
const {keyIdPropType} = require("./prop-types");

class ManyKeypadButton extends React.Component {
    static propTypes = {
        keys: PropTypes.arrayOf(keyIdPropType).isRequired,
    };

    render() {
        const {keys, ...rest} = this.props;

        // If we have no extra symbols, render an empty button. If we have just
        // one, render a standard button. Otherwise, capture them all in a
        // single button.
        if (keys.length === 0) {
            return <EmptyKeypadButton {...rest} />;
        } else if (keys.length === 1) {
            const keyConfig = KeyConfigs[keys[0]];
            return <TouchableKeypadButton keyConfig={keyConfig} {...rest} />;
        } else {
            const keyConfig = {
                id: Keys.MANY,
                type: KeyTypes.MANY,
                childKeyIds: keys,
            };
            return <TouchableKeypadButton keyConfig={keyConfig} {...rest} />;
        }
    }
}

module.exports = ManyKeypadButton;
