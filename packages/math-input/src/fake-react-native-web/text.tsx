import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import type {CSSProperties} from "aphrodite";

type Props = {
    children: React.ReactNode;
    // The `dynamicStyle` prop is provided for animating dynamic
    // properties, as creating Aphrodite StyleSheets in animation loops is
    // expensive. `dynamicStyle` should be a raw style object, rather than
    // a StyleSheet.
    dynamicStyle?: CSSProperties;
    numberOfLines?: number;
    style?: StyleType;
};

class Text extends React.Component<Props> {
    render(): React.ReactNode {
        const {numberOfLines, style} = this.props;

        const className = css(
            styles.initial,
            ...(Array.isArray(style) ? style : [style]),
            numberOfLines === 1 && styles.singleLineStyle,
        );

        return (
            <span className={className} style={this.props.dynamicStyle}>
                {this.props.children}
            </span>
        );
    }
}

// https://github.com/necolas/react-native-web/blob/master/src/components/Text/index.js
const styles = StyleSheet.create({
    initial: {
        color: "inherit",
        display: "inline",
        font: "inherit",
        margin: 0,
        padding: 0,
        textDecorationLine: "none",
        wordWrap: "break-word",
    },
    singleLineStyle: {
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
});

export default Text;
