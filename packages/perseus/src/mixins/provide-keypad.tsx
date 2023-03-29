/**
 * A mixin that renders a custom software keypad in additional to the base
 * component. The base component will receive blur events when the keypad is
 * dismissed and can access the keypad element itself so as to manage its
 * activation and dismissal.
 *
 * TODO(charlie): This would make a nicer higher-order component, except that
 * we need to expose methods on the base component (i.e., `ItemRenderer`). When
 * `ItemRenderer` and friends are written as ES6 Classes, we can have them
 * extend a `ProvideKeypad` component instead of using this mixin.
 */

import {Keypad} from "@khanacademy/math-input";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";

import reactRender from '../util/react-render';

import type {CSSProperties} from "aphrodite";

export type KeypadProps = {
    // An Aphrodite style object, to be applied to the keypad container.
    // Note that, given our awkward structure of injecting the keypad, this
    // style won't be applied or updated dynamically. Rather, it will only
    // be applied in `componentDidMount`.
    keypadStyle?: CSSProperties
};

export type KeypadApiOptions = {
    customKeypad: boolean,
    // eslint-disable-next-line ft-flow/no-weak-types
    nativeKeypadProxy: any
};

// NOTE: This is not a real component.  It's a collection of methods used to
// create and manage a Keypad instances.
// TODO(LP-10789): replace this with a React Context object to pass information
// between Perseus and the Keypad.
const ProvideKeypad = {
    propTypes: {
        apiOptions: (PropTypes.shape({
            customKeypad: PropTypes.bool,
            nativeKeypadProxy: PropTypes.func,
        }) as React.PropType<{
            customKeypad?: boolean,
            nativeKeypadProxy?: (...a: ReadonlyArray<any>) => unknown
        }>),
        // An Aphrodite style object, to be applied to the keypad container.
        // Note that, given our awkward structure of injecting the keypad, this
        // style won't be applied or updated dynamically. Rather, it will only
        // be applied in `componentDidMount`.
        keypadStyle: PropTypes.any,
    },

    getInitialState(): {
        keypadElement: any | null
    } {
        const _this = this;
        let keypadElement = null;
        if (
            _this.props.apiOptions &&
            _this.props.apiOptions.customKeypad &&
            _this.props.apiOptions.nativeKeypadProxy
        ) {
            keypadElement = _this.props.apiOptions.nativeKeypadProxy(
                () => _this.blur && _this.blur(),
            );
        }
        return {keypadElement};
    },

    componentDidMount() {
        const _this = this;
        if (
            _this.props.apiOptions &&
            _this.props.apiOptions.customKeypad &&
            !_this.props.apiOptions.nativeKeypadProxy
        ) {
            // TODO(charlie): Render this and the wrapped component in the same
            // React tree. We may also want to add this keypad asynchronously
            // or on-demand in the future.
            _this._keypadContainer = document.createElement("div");
            document.body?.appendChild(_this._keypadContainer);

            reactRender(
                <Keypad
                    onElementMounted={(element) => {
                        // NOTE(kevinb): The reason why this setState works is
                        // b/c we're calling it manually from item-renderer.jsx
                        // and we're manually setting the 'this' by using 'call'
                        _this.setState({
                            keypadElement: element,
                        });
                    }}
                    onDismiss={() => {
                        _this.blur && _this.blur();
                    }}
                    style={_this.props.keypadStyle}
                />,
                _this._keypadContainer,
            );
        }
    },

    componentWillUnmount() {
        const _this = this;
        if (_this._keypadContainer) {
            ReactDOM.unmountComponentAtNode(_this._keypadContainer);
            if (_this._keypadContainer.parentNode) {
                // Note ChildNode.remove() isn't available in older Android
                // webviews.
                _this._keypadContainer.parentNode.removeChild(
                    _this._keypadContainer,
                );
            }
            _this._keypadContainer = null;
        }
    },

    keypadElement(): any {
        const _this = this;
        return _this.state.keypadElement;
    },
} as const;

export default ProvideKeypad;
