/**
 * A component that renders an icon with math (via KaTeX).
 */

import {StyleSheet} from "aphrodite";
import katex from "katex";
import * as React from "react";
import ReactDOM from "react-dom";

import {View} from "../../fake-react-native-web/index";
import {iconSizeHeightPx, iconSizeWidthPx} from "../common-style";

import Styles from "./styles";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

const {row, centered} = Styles;

type Props = {
    math: string;
    style: StyleType;
};

class MathIcon extends React.Component<Props> {
    componentDidMount() {
        this._renderMath();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.math !== this.props.math) {
            this._renderMath();
        }
    }

    _renderMath = () => {
        const {math} = this.props;
        katex.render(math, ReactDOM.findDOMNode(this));
    };

    render() {
        const {style} = this.props;

        const containerStyle = [
            row,
            centered,
            styles.size,
            styles.base,
            ...(Array.isArray(style) ? style : [style]),
        ];

        return <View style={containerStyle} />;
    }
}

const styles = StyleSheet.create({
    size: {
        height: iconSizeHeightPx,
        width: iconSizeWidthPx,
    },

    base: {
        fontSize: 25,
    },
});

export default MathIcon;
