import {StyleSheet} from "aphrodite";
import * as React from "react";
import {connect} from "react-redux";

import {LayoutMode, KeypadType} from "../../enums";
import {View} from "../../fake-react-native-web/index";
import {
    innerBorderColor,
    innerBorderStyle,
    innerBorderWidthPx,
    compactKeypadBorderRadiusPx,
} from "../common-style";

import ExpressionKeypad from "./expression-keypad";
import FractionKeypad from "./fraction-keypad";
import NavigationPad from "./navigation-pad";
import {setPageSize} from "./store/actions";
import Styles from "./styles";
import * as zIndexes from "./z-indexes";

import type {State as ReduxState} from "./store/types";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const {row, centered, fullWidth} = Styles;

interface ReduxProps {
    active?: boolean;
    extraKeys?: ReadonlyArray<string>;
    keypadType?: KeypadType;
    layoutMode?: LayoutMode;
    navigationPadEnabled?: boolean;
}

interface Props extends ReduxProps {
    onDismiss?: () => void;
    onElementMounted: (element: any) => void;
    onPageSizeChange?: (
        pageWidth: number,
        pageHeight: number,
        containerWidth: number,
        containerHeight: number,
    ) => void;
    style?: StyleType;
}

type State = {
    hasBeenActivated: boolean;
    viewportWidth: string | number;
};

// eslint-disable-next-line react/no-unsafe
class KeypadContainer extends React.Component<Props, State> {
    _containerRef = React.createRef<HTMLDivElement>();
    _containerResizeObserver: ResizeObserver | null = null;
    _resizeTimeout: number | null | undefined;
    hasMounted: boolean | undefined;

    state = {
        hasBeenActivated: false,
        viewportWidth: "100vw",
    };

    UNSAFE_componentWillMount() {
        if (this.props.active) {
            this.setState({
                hasBeenActivated: this.props.active,
            });
        }
    }

    componentDidMount() {
        // Relay the initial size metrics.
        this._onResize();

        // And update it on resize.
        window.addEventListener("resize", this._throttleResizeHandler);
        window.addEventListener(
            "orientationchange",
            this._throttleResizeHandler,
        );

        this._containerResizeObserver = new ResizeObserver(
            this._throttleResizeHandler,
        );

        if (this._containerRef.current) {
            this._containerResizeObserver.observe(this._containerRef.current);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!this.state.hasBeenActivated && nextProps.active) {
            this.setState({
                hasBeenActivated: true,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.active && !this.props.active) {
            this.props.onDismiss && this.props.onDismiss();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._throttleResizeHandler);
        window.removeEventListener(
            "orientationchange",
            this._throttleResizeHandler,
        );
        this._containerResizeObserver?.disconnect();
    }

    _throttleResizeHandler = () => {
        // Throttle the resize callbacks.
        // https://developer.mozilla.org/en-US/docs/Web/Events/resize
        if (this._resizeTimeout == null) {
            this._resizeTimeout = window.setTimeout(() => {
                this._resizeTimeout = null;

                this._onResize();
            }, 66);
        }
    };

    _onResize = () => {
        // Whenever the page resizes, we need to force an update, as the button
        // heights and keypad width are computed based on horizontal space.
        this.setState({
            viewportWidth: window.innerWidth,
        });
        const containerWidth = this._containerRef.current?.clientWidth || 0;
        const containerHeight = this._containerRef.current?.clientHeight || 0;
        this.props.onPageSizeChange?.(
            window.innerWidth,
            window.innerHeight,
            containerWidth,
            containerHeight,
        );
    };

    renderKeypad = () => {
        const {extraKeys, keypadType, layoutMode, navigationPadEnabled} =
            this.props;

        const keypadProps = {
            extraKeys,
            // HACK(charlie): In order to properly round the corners of the
            // compact keypad, we need to instruct some of our child views to
            // crop themselves. At least we're colocating all the layout
            // information in this component, though.
            roundTopLeft:
                layoutMode === LayoutMode.COMPACT && !navigationPadEnabled,
            roundTopRight: layoutMode === LayoutMode.COMPACT,
        };

        // Select the appropriate keyboard given the type.
        // TODO(charlie): In the future, we might want to move towards a
        // data-driven approach to defining keyboard layouts, and have a
        // generic keyboard that takes some "keyboard data" and renders it.
        // However, the keyboards differ pretty heavily right now and it's not
        // clear what that format would look like exactly. Plus, there aren't
        // very many of them. So to keep us moving, we'll just hardcode.
        switch (keypadType) {
            case KeypadType.FRACTION:
                return <FractionKeypad {...keypadProps} />;

            case KeypadType.EXPRESSION:
                return <ExpressionKeypad {...keypadProps} />;

            default:
                throw new Error("Invalid keypad type: " + keypadType);
        }
    };

    render() {
        const {
            active,
            layoutMode,
            navigationPadEnabled,
            onElementMounted,
            style,
        } = this.props;
        const {hasBeenActivated} = this.state;

        // NOTE(charlie): We render the transforms as pure inline styles to
        // avoid an Aphrodite bug in mobile Safari.
        //   See: https://github.com/Khan/aphrodite/issues/68.
        let dynamicStyle = {
            ...(active ? inlineStyles.active : inlineStyles.hidden),
        };

        if (!active && !hasBeenActivated) {
            dynamicStyle = {
                ...dynamicStyle,
                ...inlineStyles.invisible,
            };
        }

        const keypadContainerStyle = [
            row,
            centered,
            fullWidth,
            styles.keypadContainer,
            ...(Array.isArray(style) ? style : [style]),
        ];

        const keypadStyle = [
            row,
            styles.keypadBorder,
            layoutMode === LayoutMode.FULLSCREEN
                ? styles.fullscreen
                : styles.compact,
        ];

        // TODO(charlie): When the keypad is shorter than the width of the
        // screen, add a border on its left and right edges, and round out the
        // corners.
        return (
            <View
                style={keypadContainerStyle}
                dynamicStyle={dynamicStyle}
                extraClassName="keypad-container"
                forwardRef={this._containerRef}
            >
                <View
                    style={keypadStyle}
                    ref={(element) => {
                        if (!this.hasMounted && element) {
                            this.hasMounted = true;
                            onElementMounted(element);
                        }
                    }}
                >
                    {navigationPadEnabled && (
                        <NavigationPad
                            roundTopLeft={layoutMode === LayoutMode.COMPACT}
                            style={styles.navigationPadContainer}
                        />
                    )}
                    <View style={styles.keypadLayout}>
                        {this.renderKeypad()}
                    </View>
                </View>
            </View>
        );
    }
}

const keypadAnimationDurationMs = 300;
const borderWidthPx = 1;

const styles = StyleSheet.create({
    keypadContainer: {
        bottom: 0,
        left: 0,
        right: 0,
        position: "fixed",
        transition: `${keypadAnimationDurationMs}ms ease-out`,
        transitionProperty: "transform",
        zIndex: zIndexes.keypad,
    },

    keypadBorder: {
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.1)",
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderStyle: "solid",
    },

    fullscreen: {
        borderTopWidth: borderWidthPx,
    },

    compact: {
        borderTopRightRadius: compactKeypadBorderRadiusPx,
        borderTopLeftRadius: compactKeypadBorderRadiusPx,

        borderTopWidth: borderWidthPx,
        borderRightWidth: borderWidthPx,
        borderLeftWidth: borderWidthPx,
    },

    navigationPadContainer: {
        // Add a separator between the navigation pad and the keypad.
        borderRight:
            `${innerBorderWidthPx}px ${innerBorderStyle} ` +
            `${innerBorderColor}`,
        boxSizing: "content-box",
    },

    // Defer to the navigation pad, such that the navigation pad is always
    // rendered at full-width, and the keypad takes up just the remaining space.
    // TODO(charlie): Avoid shrinking the keys and, instead, make the keypad
    // scrollable.
    keypadLayout: {
        flexGrow: 1,
        // Avoid unitless flex-basis, per: https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
        flexBasis: "0%",
    },
});

// Note: these don't go through an autoprefixer/aphrodite.
const inlineStyles = {
    // If the keypad is yet to have ever been activated, we keep it invisible
    // so as to avoid, e.g., the keypad flashing at the bottom of the page
    // during the initial render.
    invisible: {
        visibility: "hidden",
    },

    hidden: {
        transform: "translate3d(0, 100%, 0)",
    },

    active: {
        transform: "translate3d(0, 0, 0)",
    },
};

const mapStateToProps = (state: ReduxState): ReduxProps => {
    return {
        extraKeys: state.keypad.extraKeys,
        keypadType: state.keypad.keypadType,
        active: state.keypad.active,
        layoutMode: state.layout.layoutMode,
        navigationPadEnabled: state.layout.navigationPadEnabled,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPageSizeChange: (
            pageWidth: number,
            pageHeight: number,
            containerWidth: number,
            containerHeight: number,
        ) => {
            dispatch(
                setPageSize(
                    pageWidth,
                    pageHeight,
                    containerWidth,
                    containerHeight,
                ),
            );
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
})(KeypadContainer);
