/**
 * A component that renders a keypad button.
 */

const React = require("react");
const PropTypes = require("prop-types");
const {connect} = require("react-redux");

const {StyleSheet, css} = require("aphrodite");
const {View} = require("../fake-react-native-web");
const Icon = require("./icon");
const MultiSymbolGrid = require("./multi-symbol-grid");
const CornerDecal = require("./corner-decal");
const {KeyTypes, BorderDirections, BorderStyles} = require("../consts");
const {
    wonderBlocksBlue,
    innerBorderColor,
    innerBorderStyle,
    innerBorderWidthPx,
    valueGrey,
    operatorGrey,
    controlGrey,
    emptyGrey,
} = require("./common-style");
const {
    bordersPropType,
    iconPropType,
    keyConfigPropType,
} = require("./prop-types");

class KeypadButton extends React.PureComponent {
    static propTypes = {
        ariaLabel: PropTypes.string,
        // The borders to display on the button. Typically, this should be set
        // using one of the preset `BorderStyles` options.
        borders: bordersPropType,
        // Any additional keys that can be accessed by long-pressing on the
        // button.
        childKeys: PropTypes.arrayOf(keyConfigPropType),
        // Whether the button should be rendered in a 'disabled' state, i.e.,
        // without any touch feedback.
        disabled: PropTypes.bool,
        focused: PropTypes.bool,
        heightPx: PropTypes.number.isRequired,
        icon: iconPropType,
        onTouchCancel: PropTypes.func,
        onTouchEnd: PropTypes.func,
        onTouchMove: PropTypes.func,
        onTouchStart: PropTypes.func,
        popoverEnabled: PropTypes.bool,
        style: PropTypes.any,
        type: PropTypes.oneOf(Object.keys(KeyTypes)).isRequired,
        // NOTE(charlie): We may want to make this optional for phone layouts
        // (and rely on Flexbox instead), since it might not be pixel perfect
        // with borders and such.
        widthPx: PropTypes.number.isRequired,
    };

    static defaultProps = {
        borders: BorderStyles.ALL,
        childKeys: [],
        disabled: false,
        focused: false,
        popoverEnabled: false,
    };

    componentWillMount() {
        this.buttonSizeStyle = styleForButtonDimensions(
            this.props.heightPx,
            this.props.widthPx,
        );
    }

    componentDidMount() {
        this._preInjectStyles();
    }

    componentWillUpdate(newProps, newState) {
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

    _getButtonStyle = (type, borders, style) => {
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
        if (borders.indexOf(BorderDirections.LEFT) !== -1) {
            borderStyle.push(styles.leftBorder);
        }
        if (borders.indexOf(BorderDirections.BOTTOM) !== -1) {
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
        const iconWrapperStyle = [
            styles.iconWrapper,
            disabled && styles.disabled,
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
        // HACK(benkomalo): support old style flex box in Android browsers
        "-webkit-box-flex": "1",
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

module.exports = connect(mapStateToProps, null, null, {forwardRef: true})(
    KeypadButton,
);
