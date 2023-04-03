/**
 * A component that renders an icon with math (via KaTeX).
 */

import {StyleSheet} from "aphrodite";
import katex from "katex";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";

import {View} from "../fake-react-native-web/index";

import {iconSizeHeightPx, iconSizeWidthPx} from "./common-style";
import Styles from "./styles";

const {row, centered} = Styles;

class MathIcon extends React.Component {
    static propTypes = {
        math: PropTypes.string.isRequired,
        style: PropTypes.any,
    };

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
