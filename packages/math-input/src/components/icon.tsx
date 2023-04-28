/**
 * A component that renders an icon for a symbol with the given name.
 */

import {StyleSheet} from "aphrodite";
import * as React from "react";

import {IconType} from "../consts";

import {offBlack} from "./common-style";
import MathIcon from "./math-icon";
import SvgIcon from "./svg-icon";
import TextIcon from "./text-icon";

import type {IconConfig} from "../types";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const focusedColor = "#FFF";
const unfocusedColor = offBlack;

type Props = {
    focused: boolean;
    icon: IconConfig;
    style?: StyleType;
};

class Icon extends React.PureComponent<Props> {
    render() {
        const {focused, icon, style} = this.props;

        const styleWithFocus: StyleType = [
            focused ? styles.focused : styles.unfocused,
            ...(Array.isArray(style) ? style : [style]),
        ];

        switch (icon.type) {
            case IconType.MATH:
                return <MathIcon math={icon.data} style={styleWithFocus} />;

            case IconType.SVG:
                // TODO(charlie): Support passing style objects to `SvgIcon`.
                // This will require migrating the individual icons to use
                // `currentColor` and accept a `className` prop, rather than
                // relying on an explicit color prop.
                return (
                    <SvgIcon
                        name={icon.data}
                        color={focused ? focusedColor : unfocusedColor}
                    />
                );

            case IconType.TEXT:
                return (
                    <TextIcon character={icon.data} style={styleWithFocus} />
                );
            default:
                throw new Error("No icon or symbol provided");
        }
    }
}

const styles = StyleSheet.create({
    unfocused: {
        color: unfocusedColor,
    },

    focused: {
        color: focusedColor,
    },
});

export default Icon;
