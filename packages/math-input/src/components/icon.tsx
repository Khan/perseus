/**
 * A component that renders an icon for a symbol with the given name.
 */

import {StyleSheet} from "aphrodite";
import * as React from "react";

import {IconTypes} from "../consts";

import {offBlack} from "./common-style";
import MathIcon from "./math-icon";
import SvgIcon from "./svg-icon";
import TextIcon from "./text-icon";

import type {Icon as IconPropType} from "../types";
import type {CSSProperties} from "aphrodite";

const focusedColor = "#FFF";
const unfocusedColor = offBlack;

type Props = {
    focused: boolean;
    icon: IconPropType;
    style?: CSSProperties | Array<CSSProperties>;
};

class Icon extends React.PureComponent<Props> {
    render() {
        const {focused, icon, style} = this.props;

        const styleWithFocus = [
            focused ? styles.focused : styles.unfocused,
            ...(Array.isArray(style) ? style : [style]),
        ];

        switch (icon.type) {
            case IconTypes.MATH:
                return <MathIcon math={icon.data} style={styleWithFocus} />;

            case IconTypes.SVG:
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

            case IconTypes.TEXT:
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
