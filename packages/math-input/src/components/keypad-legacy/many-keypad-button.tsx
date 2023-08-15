/**
 * A keypad button that displays an arbitrary number of symbols, with no
 * 'default' symbol.
 */

import * as React from "react";

import KeyConfigs from "../../data/key-configs";
import {IconType} from "../../enums";

import EmptyKeypadButton from "./empty-keypad-button";
import TouchableKeypadButton from "./touchable-keypad-button";

import type {KeyConfig} from "../../types";

type Props = {
    keys: ReadonlyArray<string>;
};

class ManyKeypadButton extends React.Component<Props> {
    static defaultProps = {
        keys: [],
    };

    render() {
        const {keys, ...rest} = this.props;

        // If we have no extra symbols, render an empty button. If we have just
        // one, render a standard button. Otherwise, capture them all in a
        // single button.
        if (keys.length === 0) {
            return <EmptyKeypadButton />;
        } else if (keys.length === 1) {
            const keyConfig = KeyConfigs[keys[0]];
            return <TouchableKeypadButton keyConfig={keyConfig} {...rest} />;
        } else {
            const keyConfig: KeyConfig = {
                id: "MANY",
                type: "MANY",
                childKeyIds: keys,
                ariaLabel: keys
                    .map((key) => KeyConfigs[key].ariaLabel)
                    .join(", "),
                icon: {
                    type: IconType.SVG,
                    data: "many",
                },
            };
            return <TouchableKeypadButton keyConfig={keyConfig} {...rest} />;
        }
    }
}

export default ManyKeypadButton;
