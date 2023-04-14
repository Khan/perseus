/* eslint-disable react/no-unsafe */
import * as React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import {
    activateKeypad,
    dismissKeypad,
    configureKeypad,
    setCursor,
    setKeyHandler,
} from "../actions/index";
import {createStore} from "../store/index";

import KeypadContainer from "./keypad-container";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {
    onElementMounted?: (arg1: any) => void;
    onDismiss?: () => unknown;
    style?: StyleType;
};

class ProvidedKeypad extends React.Component<Props> {
    // @ts-expect-error [FEI-5003] - TS2564 - Property 'mounted' has no initializer and is not definitely assigned in the constructor.
    mounted: boolean;
    store: any;

    UNSAFE_componentWillMount() {
        this.store = createStore();
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    activate: () => void = () => {
        this.store.dispatch(activateKeypad());
    };

    dismiss: () => void = () => {
        this.store.dispatch(dismissKeypad());
    };

    // @ts-expect-error [FEI-5003] - TS2322 - Type '(configuration: any, cb: any) => void' is not assignable to type '() => void'.
    configure: () => void = (configuration, cb) => {
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

    // @ts-expect-error [FEI-5003] - TS2322 - Type '(cursor: any) => void' is not assignable to type '() => void'.
    setCursor: () => void = (cursor) => {
        this.store.dispatch(setCursor(cursor));
    };

    setKeyHandler: (keyHandler: any) => void = (keyHandler) => {
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
                        onElementMounted &&
                            onElementMounted(elementWithDispatchMethods);
                    }}
                    onDismiss={onDismiss}
                    style={style}
                />
            </Provider>
        );
    }
}

export default ProvidedKeypad;
