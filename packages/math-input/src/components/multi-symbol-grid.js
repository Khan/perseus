/**
 * A grid of symbols, rendered as text and positioned based on the number of
 * symbols provided. Up to four symbols will be shown.
 */

const React = require("react");
const PropTypes = require("prop-types");
const {StyleSheet} = require("aphrodite");

const {View} = require("../fake-react-native-web");
const Icon = require("./icon");
const {IconTypes} = require("../consts");
const {iconPropType} = require("./prop-types");
const {row, column, centered, fullWidth} = require("./styles");
const {iconSizeHeightPx, iconSizeWidthPx} = require("./common-style");

class MultiSymbolGrid extends React.Component {
    static propTypes = {
        focused: PropTypes.bool,
        icons: PropTypes.arrayOf(iconPropType).isRequired,
    };

    render() {
        const {focused, icons} = this.props;

        // Validate that we only received math-based icons. Right now, this
        // component only supports math icons (and it should only be passed
        // variables and Greek letters, which are always rendered as math).
        // Supporting other types of icons is possible but would require
        // some styles coercion and doesn't seem worthwhile right now.
        icons.forEach((icon) => {
            if (icon.type !== IconTypes.MATH) {
                throw new Error(
                    `Received invalid icon: type=${icon.type}, ` +
                        `data=${icon.data}`,
                );
            }
        });

        if (icons.length === 1) {
            return <Icon icon={icons[0]} focused={focused} />;
        } else {
            const primaryIconStyle = styles.base;
            const secondaryIconStyle = [styles.base, styles.secondary];

            if (icons.length === 2) {
                return (
                    <View style={[row, styles.size]}>
                        <View
                            style={[
                                column,
                                centered,
                                fullWidth,
                                styles.middleLeft,
                            ]}
                        >
                            <Icon
                                style={primaryIconStyle}
                                icon={icons[0]}
                                focused={focused}
                            />
                        </View>
                        <View
                            style={[
                                column,
                                centered,
                                fullWidth,
                                styles.middleRight,
                            ]}
                        >
                            <Icon
                                style={secondaryIconStyle}
                                icon={icons[1]}
                                focused={focused}
                            />
                        </View>
                    </View>
                );
            } else if (icons.length >= 3) {
                return (
                    <View style={[column, styles.size]}>
                        <View style={row}>
                            <View style={[centered, fullWidth, styles.topLeft]}>
                                <Icon
                                    style={primaryIconStyle}
                                    icon={icons[0]}
                                    focused={focused}
                                />
                            </View>
                            <View
                                style={[centered, fullWidth, styles.topRight]}
                            >
                                <Icon
                                    style={secondaryIconStyle}
                                    icon={icons[1]}
                                    focused={focused}
                                />
                            </View>
                        </View>
                        <View style={row}>
                            <View
                                style={[centered, fullWidth, styles.bottomLeft]}
                            >
                                <Icon
                                    style={secondaryIconStyle}
                                    icon={icons[2]}
                                    focused={focused}
                                />
                            </View>
                            <View
                                style={[
                                    centered,
                                    fullWidth,
                                    styles.bottomRight,
                                ]}
                            >
                                {icons[3] && (
                                    <Icon
                                        style={secondaryIconStyle}
                                        icon={icons[3]}
                                        focused={focused}
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                );
            }
        }

        throw new Error("Invalid number of icons:", icons.length);
    }
}

const verticalInsetPx = 2;
const horizontalInsetPx = 4;

const styles = StyleSheet.create({
    size: {
        height: iconSizeHeightPx,
        width: iconSizeWidthPx,
    },

    // For the three- and four-icon layouts.
    bottomLeft: {
        marginBottom: verticalInsetPx,
        marginLeft: horizontalInsetPx,
    },
    topLeft: {
        marginTop: verticalInsetPx,
        marginLeft: horizontalInsetPx,
    },
    topRight: {
        marginTop: verticalInsetPx,
        marginRight: horizontalInsetPx,
    },
    bottomRight: {
        marginBottom: verticalInsetPx,
        marginRight: horizontalInsetPx,
    },

    // For the two-icon layout.
    middleLeft: {
        marginLeft: horizontalInsetPx,
    },
    middleRight: {
        marginRight: horizontalInsetPx,
    },

    base: {
        fontSize: 18,
    },

    secondary: {
        opacity: 0.3,
    },
});

module.exports = MultiSymbolGrid;
