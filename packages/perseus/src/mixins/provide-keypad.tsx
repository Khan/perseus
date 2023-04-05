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

import reactRender from "../util/react-render";

import type {CSSProperties} from "aphrodite";

export type KeypadProps = {
    // An Aphrodite style object, to be applied to the keypad container.
    // Note that, given our awkward structure of injecting the keypad, this
    // style won't be applied or updated dynamically. Rather, it will only
    // be applied in `componentDidMount`.
    keypadStyle?: CSSProperties;
};

export type KeypadApiOptions = {
    customKeypad: boolean;
    nativeKeypadProxy: any;
};

// NOTE: This is not a real component.  It's a collection of methods used to
// create and manage a Keypad instances.
// TODO(LP-10789): replace this with a React Context object to pass information
// between Perseus and the Keypad.
const ProvideKeypad = {
    propTypes: {
        apiOptions: PropTypes.shape({
            customKeypad: PropTypes.bool,
            nativeKeypadProxy: PropTypes.func,
        }),
        // An Aphrodite style object, to be applied to the keypad container.
        // Note that, given our awkward structure of injecting the keypad, this
        // style won't be applied or updated dynamically. Rather, it will only
        // be applied in `componentDidMount`.
        keypadStyle: PropTypes.any,
    },

    getInitialState(): {
        keypadElement: any | null;
    } {
        const _this = this;
        let keypadElement = null;
        if (
            // @ts-expect-error [FEI-5003] - TS2339 - Property 'props' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
            _this.props.apiOptions &&
            // @ts-expect-error [FEI-5003] - TS2339 - Property 'props' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
            _this.props.apiOptions.customKeypad &&
            // @ts-expect-error [FEI-5003] - TS2339 - Property 'props' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
            _this.props.apiOptions.nativeKeypadProxy
        ) {
            // @ts-expect-error [FEI-5003] - TS2339 - Property 'props' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
            keypadElement = _this.props.apiOptions.nativeKeypadProxy(
                // @ts-expect-error [FEI-5003] - TS2339 - Property 'blur' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'. | TS2339 - Property 'blur' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
                () => _this.blur && _this.blur(),
            );
        }
        return {keypadElement};
    },

    componentDidMount() {
        const _this = this;
        if (
            // @ts-expect-error [FEI-5003] - TS2339 - Property 'props' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
            _this.props.apiOptions &&
            // @ts-expect-error [FEI-5003] - TS2339 - Property 'props' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
            _this.props.apiOptions.customKeypad &&
            // @ts-expect-error [FEI-5003] - TS2339 - Property 'props' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
            !_this.props.apiOptions.nativeKeypadProxy
        ) {
            // TODO(charlie): Render this and the wrapped component in the same
            // React tree. We may also want to add this keypad asynchronously
            // or on-demand in the future.
            // @ts-expect-error [FEI-5003] - TS2339 - Property '_keypadContainer' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
            _this._keypadContainer = document.createElement("div");
            // @ts-expect-error [FEI-5003] - TS2339 - Property '_keypadContainer' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
            document.body?.appendChild(_this._keypadContainer);

            reactRender(
                <Keypad
                    onElementMounted={(element) => {
                        // NOTE(kevinb): The reason why this setState works is
                        // b/c we're calling it manually from item-renderer.jsx
                        // and we're manually setting the 'this' by using 'call'
                        // @ts-expect-error [FEI-5003] - TS2339 - Property 'setState' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
                        _this.setState({
                            keypadElement: element,
                        });
                    }}
                    onDismiss={() => {
                        // @ts-expect-error [FEI-5003] - TS2339 - Property 'blur' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'. | TS2339 - Property 'blur' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
                        _this.blur && _this.blur();
                    }}
                    // @ts-expect-error [FEI-5003] - TS2339 - Property 'props' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
                    style={_this.props.keypadStyle}
                />,
                // @ts-expect-error [FEI-5003] - TS2339 - Property '_keypadContainer' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
                _this._keypadContainer,
            );
        }
    },

    componentWillUnmount() {
        const _this = this;
        // @ts-expect-error [FEI-5003] - TS2339 - Property '_keypadContainer' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
        if (_this._keypadContainer) {
            // @ts-expect-error [FEI-5003] - TS2339 - Property '_keypadContainer' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
            ReactDOM.unmountComponentAtNode(_this._keypadContainer);
            // @ts-expect-error [FEI-5003] - TS2339 - Property '_keypadContainer' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
            if (_this._keypadContainer.parentNode) {
                // Note ChildNode.remove() isn't available in older Android
                // webviews.
                // @ts-expect-error [FEI-5003] - TS2339 - Property '_keypadContainer' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
                _this._keypadContainer.parentNode.removeChild(
                    // @ts-expect-error [FEI-5003] - TS2339 - Property '_keypadContainer' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
                    _this._keypadContainer,
                );
            }
            // @ts-expect-error [FEI-5003] - TS2339 - Property '_keypadContainer' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
            _this._keypadContainer = null;
        }
    },

    keypadElement(): any {
        const _this = this;
        // @ts-expect-error [FEI-5003] - TS2339 - Property 'state' does not exist on type '{ readonly propTypes: { readonly apiOptions: React.PropType<{ customKeypad?: boolean | undefined; nativeKeypadProxy?: ((...a: readonly any[]) => unknown) | undefined; }>; readonly keypadStyle: Requireable<any>; }; readonly getInitialState: () => { ...; }; readonly componentDidMount: () => void; readonly componentWil...'.
        return _this.state.keypadElement;
    },
} as const;

export default ProvideKeypad;
