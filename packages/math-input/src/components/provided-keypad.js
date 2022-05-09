/* eslint-disable react/no-unsafe */
// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import {
    activateKeypad,
    dismissKeypad,
    configureKeypad,
    setCursor,
    setKeyHandler,
} from "../actions/index.js";
import {createStore} from "../store/index.js";

import KeypadContainer from "./keypad-container.js";

import type {CSSProperties} from "aphrodite";

type Props = {|
    onElementMounted?: ($FlowFixMe) => void,
    onDismiss?: () => mixed,
    style?: CSSProperties,
|};

class ProvidedKeypad extends React.Component<Props> {
    mounted: boolean;
    store: $FlowFixMe;

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

    setCursor: () => void = (cursor) => {
        this.store.dispatch(setCursor(cursor));
    };

    setKeyHandler: (keyHandler: $FlowFixMe) => void = (keyHandler) => {
        this.store.dispatch(setKeyHandler(keyHandler));
    };

    getDOMNode: () => $Call<typeof ReactDOM.findDOMNode, any> = () => {
        return ReactDOM.findDOMNode(this);
    };

    render(): React.Node {
        const {onElementMounted, ...rest} = this.props;

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
                        };
                        onElementMounted &&
                            onElementMounted(elementWithDispatchMethods);
                    }}
                    {...rest}
                />
            </Provider>
        );
    }
}

export default ProvidedKeypad;
