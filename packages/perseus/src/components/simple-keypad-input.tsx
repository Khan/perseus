/**
 * A version of the `math-input` subrepo's KeypadInput component that adheres to
 * the same API as Perseus's  MathOuput and NumberInput, allowing it to be
 * dropped in as a replacement for those components without any modifications.
 *
 * TODO(charlie): Once the keypad API has stabilized, move this into the
 * `math-input` subrepo and use it everywhere as a simpler, keypad-coupled
 * interface to `math-input`'s MathInput component.
 */

import {KeypadContext} from "@khanacademy/keypad-context";
import {KeypadInput, keypadElementPropType} from "@khanacademy/math-input";
import PropTypes from "prop-types";
import * as React from "react";

type SimpleKeypadInputProps = {
    keypadElement?: any;
    onFocus: () => void;
    onBlur: () => void;
    onChange: (value: string, callback: any) => void;
    value?: string | number | null;
    ariaLabel?: string;
    style?: React.CSSProperties;
};

const SimpleKeypadInput = React.forwardRef<HTMLElement, SimpleKeypadInputProps>(
    function SimpleKeypadInput(props, ref) {
        const keypadInputRef = React.useRef<any>(null);
        const context = React.useContext(KeypadContext);

        // Use imperative handle to expose the DOM node properties and custom methods
        // required for consuming Perseus widgets to handle focus/blur events.
        React.useImperativeHandle(ref, () => {
            const keypadInstance = keypadInputRef.current;
            if (!keypadInstance) {
                return null;
            }

            // Get the actual DOM node from the KeypadInput (MathInput) component's
            // internal inputRef.
            const inputElement = keypadInstance.inputRef;

            if (!inputElement) {
                return null;
            }

            // Return the DOM node with focus/blur methods attached.
            return {
                ...inputElement,
                focus: () => {
                    keypadInstance.focus(context.setKeypadActive);
                },
                blur: () => {
                    keypadInstance.blur();
                },
                getValue: () => {
                    return props.value;
                },
            };
        });

        const {keypadElement, onFocus, value, ...rest} = props;

        return (
            <KeypadInput
                ref={keypadInputRef}
                keypadElement={keypadElement}
                onFocus={() => {
                    if (keypadElement) {
                        keypadElement.configure({
                            keypadType: "FRACTION",
                        });
                    }
                    onFocus?.();
                }}
                value={value == null ? "" : "" + value}
                ariaLabel={props.ariaLabel || ""}
                {...rest}
            />
        );
    },
);

SimpleKeypadInput.propTypes = {
    keypadElement: keypadElementPropType,
    onFocus: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SimpleKeypadInput;
