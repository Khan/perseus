/**
 * A keypad button that displays an arbitrary number of symbols, with no
 * 'default' symbol.
 */

import PropTypes from "prop-types";
import * as React from "react";

import {KeyTypes} from "../consts.js";
import KeyConfigs from "../data/key-configs.js";
import Keys from "../data/keys.js";

import EmptyKeypadButton from "./empty-keypad-button.js";
import {keyIdPropType} from "./prop-types.js";
import TouchableKeypadButton from "./touchable-keypad-button.js";

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

export default ManyKeypadButton;
