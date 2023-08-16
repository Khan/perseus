import {StyleSheet} from "aphrodite";
import * as React from "react";
import ReactDOM from "react-dom";

import {View} from "../../fake-react-native-web/index";

import type Key from "../../data/keys";
import type {
    Cursor,
    KeypadConfiguration,
    KeyHandler,
    KeypadAPI,
} from "../../types";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import Keypad from "./index";

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

type Props = {
    onElementMounted?: (arg1: any) => void;
    onDismiss?: () => void;
    style?: StyleType;
};

type State = {
    active: boolean;
    keypadConfig?: KeypadConfiguration;
    keyHandler?: KeyHandler;
    cursor?: Cursor;
};

class MobileKeypad extends React.Component<Props, State> implements KeypadAPI {
    hasMounted = false;

    state: State = {
        active: false,
    };

    activate: () => void = () => {
        this.setState({active: true});
    };

    dismiss: () => void = () => {
        this.setState({active: false}, () => {
            this.props.onDismiss?.();
        });
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
        const {style} = this.props;
        const {active, cursor, keypadConfig} = this.state;

        const containerStyle = [
            // internal styles
            styles.keypadContainer,
            active ? styles.activeKeypadContainer : null,
            // styles passed as props
            ...(Array.isArray(style) ? style : [style]),
        ];

        const isExpression = keypadConfig?.keypadType === "EXPRESSION";

        return (
            <View
                style={containerStyle}
                ref={(element) => {
                    if (!this.hasMounted && element) {
                        // TODO(matthewc)[LC-1081]: clean up this weird
                        // object and type the onElementMounted callback
                        // Append the dispatch methods that we want to expose
                        // externally to the returned React element.
                        const elementWithDispatchMethods = {
                            ...element,
                            activate: this.activate,
                            dismiss: this.dismiss,
                            configure: this.configure,
                            setCursor: this.setCursor,
                            setKeyHandler: this.setKeyHandler,
                            getDOMNode: this.getDOMNode,
                        } as const;

                        this.hasMounted = true;
                        this.props.onElementMounted?.(
                            elementWithDispatchMethods,
                        );
                    }
                }}
            >
                <Keypad
                    // TODO(jeremy)
                    sendEvent={async () => {}}
                    extraKeys={keypadConfig?.extraKeys}
                    onClickKey={(key) => this._handleClickKey(key)}
                    cursorContext={cursor?.context}
                    fractionsOnly={!isExpression}
                    multiplicationDot={isExpression}
                    divisionKey={isExpression}
                    trigonometry={isExpression}
                    preAlgebra={isExpression}
                    logarithms={isExpression}
                    basicRelations={isExpression}
                    advancedRelations={isExpression}
                    showDismiss
                />
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
        transition: `200ms ease-out`,
        transitionProperty: "transform",
        transform: "translate3d(0, 100%, 0)",
    },

    activeKeypadContainer: {
        transform: "translate3d(0, 0, 0)",
    },
});

export default MobileKeypad;
