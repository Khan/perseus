/**
 * A component that renders a keypad button.
 */

import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import {connect} from "react-redux";

import {KeyTypes, BorderDirections, BorderStyles} from "../consts";
import {View} from "../fake-react-native-web/index";

import {
    wonderBlocksBlue,
    innerBorderColor,
    innerBorderStyle,
    innerBorderWidthPx,
    valueGrey,
    operatorGrey,
    controlGrey,
    emptyGrey,
} from "./common-style";
import CornerDecal from "./corner-decal";
import Icon from "./icon";
import MultiSymbolGrid from "./multi-symbol-grid";

import type {KeyType} from "../consts";
import type {Border, KeyConfig, Icon as IconType} from "../types";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    ariaLabel?: string;
    borders: Border;
    childKeys: Array<KeyConfig>;
    disabled: boolean;
    focused: boolean;
    heightPx?: number;
    widthPx?: number;
    popoverEnabled: boolean;
    type: KeyType;
    icon: IconType;
    style?: StyleType;
    onTouchCancel?: (evt: React.TouchEvent<HTMLDivElement>) => void;
    onTouchEnd?: (evt: React.TouchEvent<HTMLDivElement>) => void;
    onTouchMove?: (evt: React.TouchEvent<HTMLDivElement>) => void;
    onTouchStart?: (evt: React.TouchEvent<HTMLDivElement>) => void;
};

// eslint-disable-next-line react/no-unsafe
class KeypadButton extends React.PureComponent<Props> {
    buttonSizeStyle: StyleType | undefined;

    static defaultProps = {
        borders: BorderStyles.ALL,
        childKeys: [],
        disabled: false,
        focused: false,
        popoverEnabled: false,
    };

    UNSAFE_componentWillMount() {
        this.buttonSizeStyle = styleForButtonDimensions(
            this.props.heightPx,
            this.props.widthPx,
        );
    }

    componentDidMount() {
        this._preInjectStyles();
    }

    UNSAFE_componentWillUpdate(newProps, newState) {
        // Only recompute the Aphrodite StyleSheet when the button height has
        // changed. Though it is safe to recompute the StyleSheet (since
        // they're content-addressable), it saves us a bunch of hashing and
        // other work to cache it here.
        if (
            newProps.heightPx !== this.props.heightPx ||
            newProps.widthPx !== this.props.widthPx
        ) {
            this.buttonSizeStyle = styleForButtonDimensions(
                newProps.heightPx,
                newProps.widthPx,
            );

            this._preInjectStyles();
        }
    }

    _preInjectStyles = () => {
        // HACK(charlie): Pre-inject all of the possible styles for the button.
        // This avoids a flickering effect in the echo animation whereby the
        // echoes vary in size as they animate. Note that we need to account for
        // the "initial" styles that `View` will include, as these styles are
        // applied to `View` components and Aphrodite will consolidate the style
        // object. This method must be called whenever a property that
        // influences the possible outcomes of `this._getFocusStyle` and
        // `this._getButtonStyle` changes (such as `this.buttonSizeStyle`).
        for (const type of Object.keys(KeyTypes)) {
            css(View.styles.initial, ...this._getFocusStyle(type));

            for (const borders of Object.values(BorderStyles)) {
                css(
                    View.styles.initial,
                    ...this._getButtonStyle(type, borders),
                );
            }
        }
    };

    _getFocusStyle = (type) => {
        let focusBackgroundStyle;
        if (
            type === KeyTypes.INPUT_NAVIGATION ||
            type === KeyTypes.KEYPAD_NAVIGATION
        ) {
            focusBackgroundStyle = styles.light;
        } else {
            focusBackgroundStyle = styles.bright;
        }

        return [styles.focusBox, focusBackgroundStyle];
    };

    _getButtonStyle = (type, borders, style?) => {
        // Select the appropriate style for the button.
        let backgroundStyle;
        switch (type) {
            case KeyTypes.EMPTY:
                backgroundStyle = styles.empty;
                break;

            case KeyTypes.MANY:
            case KeyTypes.VALUE:
                backgroundStyle = styles.value;
                break;

            case KeyTypes.OPERATOR:
                backgroundStyle = styles.operator;
                break;

            case KeyTypes.INPUT_NAVIGATION:
            case KeyTypes.KEYPAD_NAVIGATION:
                backgroundStyle = styles.control;
                break;

            case KeyTypes.ECHO:
                backgroundStyle = null;
                break;
        }

        const borderStyle = [];
        if (borders.includes(BorderDirections.LEFT)) {
            // @ts-expect-error TS2345
            borderStyle.push(styles.leftBorder);
        }
        if (borders.includes(BorderDirections.BOTTOM)) {
            // @ts-expect-error TS2345
            borderStyle.push(styles.bottomBorder);
        }

        return [
            styles.buttonBase,
            backgroundStyle,
            ...borderStyle,
            type === KeyTypes.ECHO && styles.echo,
            this.buttonSizeStyle,
            // React Native allows you to set the 'style' props on user defined
            // components.
            //   See: https://facebook.github.io/react-native/docs/style.html
            ...(Array.isArray(style) ? style : [style]),
        ];
    };

    render() {
        const {
            ariaLabel,
            borders,
            childKeys,
            disabled,
            focused,
            icon,
            onTouchCancel,
            onTouchEnd,
            onTouchMove,
            onTouchStart,
            popoverEnabled,
            style,
            type,
        } = this.props;

        // We render in the focus state if the key is focused, or if it's an
        // echo.
        const renderFocused =
            (!disabled && focused) || popoverEnabled || type === KeyTypes.ECHO;
        const buttonStyle = this._getButtonStyle(type, borders, style);
        const focusStyle = this._getFocusStyle(type);
        let iconWrapperStyle = [styles.iconWrapper];

        if (disabled) {
            iconWrapperStyle = [...iconWrapperStyle, styles.disabled];
        }

        const eventHandlers = {
            onTouchCancel,
            onTouchEnd,
            onTouchMove,
            onTouchStart,
        };

        const maybeFocusBox = renderFocused && <View style={focusStyle} />;
        const maybeCornerDecal = !renderFocused &&
            !disabled &&
            childKeys &&
            childKeys.length > 0 && <CornerDecal style={styles.decalInset} />;

        if (type === KeyTypes.EMPTY) {
            return <View style={buttonStyle} {...eventHandlers} />;
        } else if (type === KeyTypes.MANY) {
            // TODO(charlie): Make the long-press interaction accessible. See
            // the TODO in key-configs.js for more.
            const manyButtonA11yMarkup = {
                role: "button",
                ariaLabel: childKeys[0].ariaLabel,
            };
            const icons = childKeys.map((keyConfig) => {
                return keyConfig.icon;
            });
            return (
                <View
                    style={buttonStyle}
                    {...eventHandlers}
                    {...manyButtonA11yMarkup}
                >
                    {maybeFocusBox}
                    <View style={iconWrapperStyle}>
                        <MultiSymbolGrid
                            icons={icons}
                            focused={renderFocused}
                        />
                    </View>
                    {maybeCornerDecal}
                </View>
            );
        } else {
            const a11yMarkup = {
                role: "button",
                ariaLabel: ariaLabel,
            };

            return (
                <View style={buttonStyle} {...eventHandlers} {...a11yMarkup}>
                    {maybeFocusBox}
                    <View style={iconWrapperStyle}>
                        <Icon icon={icon} focused={renderFocused} />
                    </View>
                    {maybeCornerDecal}
                </View>
            );
        }
    }
}

const focusInsetPx = 4;
const focusBoxZIndex = 0;

const styles = StyleSheet.create({
    buttonBase: {
        flex: 1,
        cursor: "pointer",
        // Make the text unselectable
        userSelect: "none",
        justifyContent: "center",
        alignItems: "center",
        // Borders are made selectively visible.
        borderColor: innerBorderColor,
        borderStyle: innerBorderStyle,
        boxSizing: "border-box",
    },

    decalInset: {
        top: focusInsetPx,
        right: focusInsetPx,
    },

    // Overrides for the echo state, where we want to render the borders for
    // layout purposes, but we don't want them to be visible.
    echo: {
        borderColor: "transparent",
    },

    // Background colors and other base styles that may vary between key types.
    value: {
        backgroundColor: valueGrey,
    },
    operator: {
        backgroundColor: operatorGrey,
    },
    control: {
        backgroundColor: controlGrey,
    },
    empty: {
        backgroundColor: emptyGrey,
        cursor: "default",
    },

    bright: {
        backgroundColor: wonderBlocksBlue,
    },
    light: {
        backgroundColor: "rgba(33, 36, 44, 0.1)",
    },

    iconWrapper: {
        zIndex: focusBoxZIndex + 1,
    },

    focusBox: {
        position: "absolute",
        zIndex: focusBoxZIndex,
        left: focusInsetPx,
        right: focusInsetPx,
        bottom: focusInsetPx,
        top: focusInsetPx,
        borderRadius: 1,
    },

    disabled: {
        opacity: 0.3,
    },

    // Styles used to render the appropriate borders. Buttons are only allowed
    // to render left and bottom borders, to simplify layout.
    leftBorder: {
        borderLeftWidth: innerBorderWidthPx,
    },
    bottomBorder: {
        borderBottomWidth: innerBorderWidthPx,
    },
});

const styleForButtonDimensions = (heightPx, widthPx) => {
    return StyleSheet.create({
        // eslint-disable-next-line react-native/no-unused-styles
        buttonSize: {
            height: heightPx,
            width: widthPx,
            maxWidth: widthPx,
        },
    }).buttonSize;
};

const mapStateToProps = (state) => {
    return state.layout.buttonDimensions;
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(
    KeypadButton,
);
