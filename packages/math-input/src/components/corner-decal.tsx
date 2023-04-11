/**
 * A small triangular decal to sit in the corner of a parent component.
 */

import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";
import * as React from "react";

import {View} from "../fake-react-native-web/index";

import {offBlack} from "./common-style";

import type {CSSProperties} from "aphrodite";

type Props = {
    style: CSSProperties | Array<CSSProperties>;
};

class CornerDecal extends React.Component<Props> {
    static propTypes = {
        style: PropTypes.any,
    };

    render() {
        const {style} = this.props;

        const containerStyle = [
            styles.container,
            ...(Array.isArray(style) ? style : [style]),
        ];

        return (
            <View style={containerStyle}>
                <svg
                    width={triangleSizePx}
                    height={triangleSizePx}
                    viewBox="4 4 8 8"
                >
                    <path
                        fill={offBlack}
                        opacity="0.3"
                        d="M5.29289322,5.70710678 L10.2928932,10.7071068 C10.9228581,11.3370716 12,10.8909049 12,10 L12,5 C12,4.44771525 11.5522847,4 11,4 L6,4 C5.10909515,4 4.66292836,5.07714192 5.29289322,5.70710678 Z" // @Nolint
                    />
                </svg>
            </View>
        );
    }
}

const triangleSizePx = 7;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        right: 0,
        width: triangleSizePx,
        height: triangleSizePx,
    },
});

export default CornerDecal;
