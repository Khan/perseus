/**
 * A component that renders a keypad button.
 */

import Color from "@khanacademy/wonder-blocks-color";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import {connect} from "react-redux";

import {BorderDirection, BorderStyles, KeyTypes} from "../../enums";
import {View} from "../../fake-react-native-web/index";
import {
    wonderBlocksBlue,
    innerBorderColor,
    innerBorderStyle,
    innerBorderWidthPx,
    valueGrey,
    operatorGrey,
    controlGrey,
    emptyGrey,
} from "../common-style";

import CornerDecal from "./corner-decal";
import Icon from "./icon";
import MultiSymbolGrid from "./multi-symbol-grid";

import type {KeyType} from "../../enums";
import type {Border, NonManyKeyConfig, IconConfig} from "../../types";
import type {State} from "./store/types";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

interface ReduxProps {
    heightPx: number;
    widthPx: number;
}

interface Props extends ReduxProps {
    ariaLabel?: string;
    borders: Border;
    childKeys: ReadonlyArray<NonManyKeyConfig>;
    disabled: boolean;
    focused: boolean;
    popoverEnabled: boolean;
    type: KeyType;
    icon?: IconConfig;
    style?: StyleType;
    onTouchCancel?: (evt: React.TouchEvent<HTMLDivElement>) => void;
    onTouchEnd?: (evt: React.TouchEvent<HTMLDivElement>) => void;
    onTouchMove?: (evt: React.TouchEvent<HTMLDivElement>) => void;
    onTouchStart?: (evt: React.TouchEvent<HTMLDivElement>) => void;
    // NOTE(matthewc)[LC-754] this is a normal React thing, but TS
    // gets mad if I don't explicitly set it as a prop
    ref?: (any) => void;
}

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
        for (const type of KeyTypes) {
            css(View.styles.initial, ...this._getFocusStyle(type));

            for (const borders of Object.values(BorderStyles)) {
                css(
                    View.styles.initial,
                    ...this._getButtonStyle(type, borders),
                );
            }
        }
    };

    _getFocusStyle = (type: KeyType) => {
        let focusBackgroundStyle;
        if (type === "INPUT_NAVIGATION" || type === "KEYPAD_NAVIGATION") {
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
            case "EMPTY":
                backgroundStyle = styles.empty;
                break;

            case "MANY":
            case "VALUE":
                backgroundStyle = styles.value;
                break;

            case "OPERATOR":
                backgroundStyle = styles.operator;
                break;

            case "INPUT_NAVIGATION":
            case "KEYPAD_NAVIGATION":
                backgroundStyle = styles.control;
                break;

            case "ECHO":
                backgroundStyle = null;
                break;
        }

        const borderStyle = [];
        if (borders.includes(BorderDirection.LEFT)) {
            // @ts-expect-error TS2345
            borderStyle.push(styles.leftBorder);
        }
        if (borders.includes(BorderDirection.BOTTOM)) {
            // @ts-expect-error TS2345
            borderStyle.push(styles.bottomBorder);
        }

        return [
            styles.buttonBase,
            backgroundStyle,
            ...borderStyle,
            type === "ECHO" && styles.echo,
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
            (!disabled && focused) || popoverEnabled || type === "ECHO";
        const buttonStyle = this._getButtonStyle(type, borders, style);
        const focusStyle = this._getFocusStyle(type);
        const iconWrapperStyle = [
            styles.iconWrapper,
            disabled ? styles.disabled : undefined,
        ];

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

        if (type === "EMPTY") {
            return <View style={buttonStyle} {...eventHandlers} />;
        } else if (type === "MANY") {
            // TODO(charlie): Make the long-press interaction accessible. See
            // the TODO in key-configs.js for more.
            const manyButtonA11yMarkup = {
                role: "button",
                ariaLabel: childKeys[0].ariaLabel,
            };
            const icons = childKeys.map((keyConfig) => {
                return keyConfig.icon;
            }) as ReadonlyArray<IconConfig>;
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
                        <Icon
                            icon={icon as IconConfig}
                            focused={renderFocused}
                        />
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
        backgroundColor: Color.offBlack32,
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

const mapStateToProps = (state: State): ReduxProps => {
    return {
        heightPx: state.layout.buttonDimensions.height,
        widthPx: state.layout.buttonDimensions.width,
    };
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(
    KeypadButton,
);
