import {StyleType} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import ReactDOM from "react-dom";

import Key from "../../data/keys";
import {View} from "../../fake-react-native-web/index";
import {Cursor, KeypadConfiguration, KeyHandler} from "../../types";

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

class MobileKeypad extends React.Component<Props, State> {
    hasMounted = false;

    state: State = {
        active: false,
    };

    activate: () => void = () => {
        this.setState({active: true});
    };

    dismiss: () => void = () => {
        this.setState({active: false});
    };

    configure: (configuration: KeypadConfiguration, cb: () => void) => void = (
        configuration,
        cb,
    ) => {
        this.setState({keypadConfig: configuration});

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
        const {active, cursor, keypadConfig} = this.state;

        const containerStyle = [
            styles.keypadContainer,
            active ? styles.activeKeypadContainer : null,
        ];

        const isExpression = keypadConfig?.keypadType === "EXPRESSION";

        return (
            <View
                style={containerStyle}
                ref={(element) => {
                    if (!this.hasMounted && element) {
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
                    sendEvent={async () => {}}
                    extraKeys={keypadConfig?.extraKeys}
                    onClickKey={(key) => this._handleClickKey(key)}
                    cursorContext={cursor?.context}
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
