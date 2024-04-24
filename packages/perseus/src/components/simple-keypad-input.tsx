/**
 * A version of the `math-input` subrepo's KeypadInput component that adheres to
 * the same API as Perseus's  MathOuput and NumberInput, allowing it to be
 * dropped in as a replacement for those components without any modifications.
 *
 * TODO(charlie): Once the keypad API has stabilized, move this into the
 * `math-input` subrepo and use it everywhere as a simpler, keypad-coupled
 * interface to `math-input`'s MathInput component.
 */

import {
    KeypadInput,
    KeypadType,
    keypadElementPropType,
} from "@khanacademy/math-input";
import PropTypes from "prop-types";
import * as React from "react";

export default class SimpleKeypadInput extends React.Component<any> {
    _isMounted = false;

    componentDidMount() {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    focus() {
        // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'.
        this.refs.input.focus(); // eslint-disable-line react/no-string-refs
    }

    blur() {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
        if (typeof this.refs.input?.blur === "function") {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'blur' does not exist on type 'ReactInstance'.
            this.refs.input?.blur();
        }
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
                // eslint-disable-next-line react/no-string-refs
                ref="input"
                keypadElement={keypadElement}
                onFocus={() => {
                    if (keypadElement) {
                        keypadElement.configure(
                            {
                                keypadType: KeypadType.FRACTION,
                            },
                            () => {
                                if (_this._isMounted) {
                                    onFocus && onFocus();
                                }
                            },
                        );
                    } else {
                        onFocus && onFocus();
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
