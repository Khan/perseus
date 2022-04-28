/**
 * A small triangular decal to sit in the corner of a parent component.
 */

const React = require("react");
const PropTypes = require("prop-types");
const {StyleSheet} = require("aphrodite");

const {View} = require("../fake-react-native-web");
const {offBlack} = require("./common-style");

class CornerDecal extends React.Component {
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

module.exports = CornerDecal;
