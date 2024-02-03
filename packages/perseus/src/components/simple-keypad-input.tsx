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
    inputRef: React.RefObject<React.ComponentRef<typeof KeypadInput>> | null =
        null;

    constructor(props: any) {
        super(props);
        this.inputRef =
            React.createRef<React.ComponentRef<typeof KeypadInput>>();
    }

    componentDidMount() {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    focus() {
        this.inputRef?.current?.focus();
    }

    blur() {
        this.inputRef?.current?.blur();
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
            <KeypadInput
                ref={this.inputRef}
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
                onBlur={this.props.onBlur}
                onChange={this.props.onChange}
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
