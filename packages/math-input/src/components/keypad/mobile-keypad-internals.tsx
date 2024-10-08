import {StyleSheet} from "aphrodite";
import * as React from "react";
import ReactDOM from "react-dom";

import {View} from "../../fake-react-native-web/index";
import AphroditeCssTransitionGroup from "../aphrodite-css-transition-group";

import Keypad from "./keypad";
import {expandedViewThreshold} from "./utils";

import type Key from "../../data/keys";
import type {
    Cursor,
    KeypadConfiguration,
    KeyHandler,
    KeypadAPI,
} from "../../types";
import type {AnalyticsEventHandlerFn} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

const AnimationDurationInMS = 200;

type Props = {
    onElementMounted?: (arg1: any) => void;
    onDismiss?: () => void;
    style?: StyleType;
    onAnalyticsEvent: AnalyticsEventHandlerFn;
    setKeypadActive: (keypadActive: boolean) => void;
    keypadActive: boolean;
};

type State = {
    containerWidth: number;
    keypadConfig?: KeypadConfiguration;
    keyHandler?: KeyHandler;
    cursor?: Cursor;
};

/**
 * This is the v2 equivalent of v1's ProvidedKeypad. It follows the same
 * external API so that it can be hot-swapped with the v1 keypad and
 * is responsible for connecting the keypad with MathInput and the Renderer.
 *
 * Ideally this strategy of attaching methods on the class component for
 * other components to call will be replaced props/callbacks since React
 * doesn't support this type of code anymore (functional components
 * can't have methods attached to them).
 */
class MobileKeypadInternals
    extends React.Component<Props, State>
    implements KeypadAPI
{
    _containerRef = React.createRef<HTMLDivElement>();
    _containerResizeObserver: ResizeObserver | null = null;
    _throttleResize = false;

    state: State = {
        containerWidth: 0,
    };

    componentDidMount() {
        this._resize();

        window.addEventListener("resize", this._throttleResizeHandler);
        window.addEventListener(
            "orientationchange",
            this._throttleResizeHandler,
        );

        // LC-1213: some common older browsers (as of 2023-09-07)
        // don't support ResizeObserver
        if ("ResizeObserver" in window) {
            this._containerResizeObserver = new window.ResizeObserver(
                this._throttleResizeHandler,
            );

            if (this._containerRef.current) {
                this._containerResizeObserver.observe(
                    this._containerRef.current,
                );
            }
        }

        this.props.onElementMounted?.({
            activate: this.activate,
            dismiss: this.dismiss,
            configure: this.configure,
            setCursor: this.setCursor,
            setKeyHandler: this.setKeyHandler,
            getDOMNode: this.getDOMNode,
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._throttleResizeHandler);
        window.removeEventListener(
            "orientationchange",
            this._throttleResizeHandler,
        );
        this._containerResizeObserver?.disconnect();
    }

    _resize = () => {
        const containerWidth = this._containerRef.current?.clientWidth || 0;
        this.setState({containerWidth});
    };

    _throttleResizeHandler = () => {
        if (this._throttleResize) {
            return;
        }

        this._throttleResize = true;

        setTimeout(() => {
            this._resize();
            this._throttleResize = false;
        }, 100);
    };

    activate: () => void = () => {
        this.props.setKeypadActive(true);
    };

    dismiss: () => void = () => {
        this.props.setKeypadActive(false);
        this.props.onDismiss?.();
    };

    configure: (configuration: KeypadConfiguration, cb: () => void) => void = (
        configuration,
        cb,
    ) => {
        this.setState({keypadConfig: configuration});

        // TODO(matthewc)[LC-1080]: this was brought in from v1's ProvidedKeypad.
        // We need to investigate whether we still need this.
        // HACK(charlie): In Perseus, triggering a focus causes the keypad to
        // animate into view and re-configure. We'd like to provide the option
        // to re-render the re-configured keypad before animating it into view,
        // to avoid jank in the animation. As such, we support passing a
        // callback into `configureKeypad`. However, implementing this properly
        // would require middleware, etc., so we just hack it on with
        // `setTimeout` for now.
        setTimeout(() => cb && cb());
    };

    setCursor: (cursor: Cursor) => void = (cursor) => {
        this.setState({cursor});
    };

    setKeyHandler: (keyHandler: KeyHandler) => void = (keyHandler) => {
        this.setState({keyHandler});
    };

    getDOMNode: () => ReturnType<typeof ReactDOM.findDOMNode> = () => {
        return ReactDOM.findDOMNode(this);
    };

    _handleClickKey(key: Key) {
        if (key === "DISMISS") {
            this.dismiss();
            return;
        }

        const cursor = this.state.keyHandler?.(key);
        this.setState({cursor});
    }

    render(): React.ReactNode {
        const {keypadActive, style} = this.props;
        const {containerWidth, cursor, keypadConfig} = this.state;

        const containerStyle = [
            styles.keypadContainer,
            // styles passed as props
            ...(Array.isArray(style) ? style : [style]),
        ];

        const isExpression = keypadConfig?.keypadType === "EXPRESSION";
        const convertDotToTimes = keypadConfig?.times;

        return (
            <View style={containerStyle} forwardRef={this._containerRef}>
                <AphroditeCssTransitionGroup
                    transitionEnterTimeout={AnimationDurationInMS}
                    transitionLeaveTimeout={AnimationDurationInMS}
                    transitionStyle={{
                        enter: {
                            transform: "translate3d(0, 100%, 0)",
                            transition: `${AnimationDurationInMS}ms ease-out`,
                        },
                        enterActive: {
                            transform: "translate3d(0, 0, 0)",
                        },
                        leave: {
                            transform: "translate3d(0, 0, 0)",
                            transition: `${AnimationDurationInMS}ms ease-out`,
                        },
                        leaveActive: {
                            transform: "translate3d(0, 100%, 0)",
                        },
                    }}
                >
                    {keypadActive ? (
                        <Keypad
                            onAnalyticsEvent={this.props.onAnalyticsEvent}
                            extraKeys={keypadConfig?.extraKeys}
                            onClickKey={(key) => this._handleClickKey(key)}
                            cursorContext={cursor?.context}
                            fractionsOnly={!isExpression}
                            convertDotToTimes={convertDotToTimes}
                            divisionKey={isExpression}
                            trigonometry={isExpression}
                            preAlgebra={isExpression}
                            logarithms={isExpression}
                            basicRelations={isExpression}
                            advancedRelations={isExpression}
                            expandedView={
                                containerWidth > expandedViewThreshold
                            }
                            showDismiss
                        />
                    ) : null}
                </AphroditeCssTransitionGroup>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keypadContainer: {
        bottom: 0,
        left: 0,
        right: 0,
        position: "fixed",
    },
});

export default MobileKeypadInternals;
