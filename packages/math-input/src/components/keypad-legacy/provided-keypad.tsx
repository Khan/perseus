import * as React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import KeypadContainer from "./keypad-container";
import {
    activateKeypad,
    dismissKeypad,
    configureKeypad,
    setCursor,
    setKeyHandler,
} from "./store/actions";
import {createStore} from "./store/index";

import type {
    Cursor,
    KeypadConfiguration,
    KeyHandler,
    KeypadAPI,
} from "../../types";
import type {AnalyticsEventHandlerFn} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    setKeypadActive: (keypadActive: boolean) => void;
    keypadActive: boolean;
    onElementMounted?: (arg1: any) => void;
    onDismiss?: () => void;
    style?: StyleType;

    onAnalyticsEvent: AnalyticsEventHandlerFn;
};

class ProvidedKeypad extends React.Component<Props> implements KeypadAPI {
    store: any;

    constructor(props) {
        super(props);
        this.store = createStore();
    }

    componentDidUpdate(prevProps) {
        if (this.props.keypadActive && !prevProps.keypadActive) {
            this.store.dispatch(activateKeypad());
        }

        if (!this.props.keypadActive && prevProps.keypadActive) {
            this.store.dispatch(dismissKeypad());
        }
    }

    activate: () => void = () => {
        this.props.setKeypadActive(true);
    };

    dismiss: () => void = () => {
        this.props.setKeypadActive(false);
    };

    configure: (configuration: KeypadConfiguration, cb: () => void) => void = (
        configuration,
        cb,
    ) => {
        this.store.dispatch(configureKeypad(configuration));

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
        this.store.dispatch(setCursor(cursor));
    };

    setKeyHandler: (keyHandler: KeyHandler) => void = (keyHandler) => {
        this.store.dispatch(setKeyHandler(keyHandler));
    };

    getDOMNode: () => ReturnType<typeof ReactDOM.findDOMNode> = () => {
        return ReactDOM.findDOMNode(this);
    };

    render(): React.ReactNode {
        const {onElementMounted, onDismiss, style} = this.props;

        return (
            <Provider store={this.store}>
                <KeypadContainer
                    onElementMounted={(element) => {
                        this.props.onAnalyticsEvent({
                            type: "math-input:keypad-opened",
                            payload: {
                                virtualKeypadVersion: "MATH_INPUT_KEYPAD_V1",
                            },
                        });

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
                        onElementMounted?.(elementWithDispatchMethods);
                    }}
                    onDismiss={() => {
                        this.props.onAnalyticsEvent({
                            type: "math-input:keypad-closed",
                            payload: {
                                virtualKeypadVersion: "MATH_INPUT_KEYPAD_V1",
                            },
                        });

                        onDismiss?.();
                    }}
                    style={style}
                />
            </Provider>
        );
    }
}

export default ProvidedKeypad;
