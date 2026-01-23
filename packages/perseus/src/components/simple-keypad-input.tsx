/**
 * A version of the `math-input` subrepo's KeypadInput component that adheres to
 * the same API as Perseus's  MathOuput and NumberInput, allowing it to be
 * dropped in as a replacement for those components without any modifications.
 */

import {KeypadContext} from "@khanacademy/keypad-context";
import {KeypadInput, keypadElementPropType} from "@khanacademy/math-input";
import PropTypes from "prop-types";
import * as React from "react";

import type {Focusable} from "../types";

export default class SimpleKeypadInput
    extends React.Component<any>
    implements Focusable
{
    static contextType = KeypadContext;
    declare context: React.ContextType<typeof KeypadContext>;
    _isMounted = false;
    inputRef = React.createRef<KeypadInput>();

    componentDidMount() {
        // NOTE(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    focus() {
        // The inputRef is a ref to a MathInput, which
        // also controls the keypad state during focus events.
        this.inputRef.current?.focus(this.context.setKeypadActive);
    }

    blur() {
        this.inputRef.current?.blur();
    }

    getValue(): string | number {
        return this.props.value;
    }

    render(): React.ReactNode {
        const _this = this;
        // Intercept the `onFocus` prop, as we need to configure the keypad
        // before continuing with the default focus logic for Perseus inputs.
        // Intercept the `value` prop so as to map `null` to the empty string,
        // as the `KeypadInput` does not support `null` values.
        const {keypadElement, onFocus, value, ...rest} = _this.props;

        return (
            // @ts-expect-error - TS2769 - No overload matches this call.
            <KeypadInput
                ref={this.inputRef}
                keypadElement={keypadElement}
                onFocus={() => {
                    if (keypadElement) {
                        keypadElement.configure(
                            {
                                keypadType: "FRACTION",
                            },
                            () => {
                                if (_this._isMounted) {
                                    onFocus?.();
                                }
                            },
                        );
                    } else {
                        onFocus?.();
                    }
                }}
                value={value == null ? "" : "" + value}
                {...rest}
            />
        );
    }
}

// @ts-expect-error - TS2339 - Property 'propTypes' does not exist on type 'typeof SimpleKeypadInput'.
SimpleKeypadInput.propTypes = {
    keypadElement: keypadElementPropType,
    onFocus: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
