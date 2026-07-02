/**
 * A version of the `math-input` subrepo's KeypadInput component that adheres to
 * the same API as Perseus's  MathOuput and NumberInput, allowing it to be
 * dropped in as a replacement for those components without any modifications.
 */

import {KeypadContext} from "@khanacademy/keypad-context";
import {KeypadInput} from "@khanacademy/math-input";
import * as React from "react";

import type {Focusable} from "../types";
import type {KeypadAPI} from "@khanacademy/math-input";

type Props = {
    value: string;
    keypadElement?: KeypadAPI;
    onChange: (value: string, callback?: unknown) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    ariaLabel?: string;
    style?: React.CSSProperties;
};

export default class SimpleKeypadInput
    extends React.Component<Props>
    implements Focusable
{
    static defaultProps = {value: ""};
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

    getValue(): string {
        return this.props.value;
    }

    render(): React.ReactNode {
        const {
            keypadElement,
            onFocus,
            value,
            onChange,
            onBlur,
            ariaLabel,
            style,
        } = this.props;

        return (
            <KeypadInput
                ref={this.inputRef}
                keypadElement={keypadElement}
                // Intercept onFocus to configure the keypad before delegating.
                onFocus={() => {
                    if (keypadElement) {
                        keypadElement.configure(
                            {keypadType: "FRACTION"},
                            () => {
                                if (this._isMounted) {
                                    onFocus?.();
                                }
                            },
                        );
                    } else {
                        onFocus?.();
                    }
                }}
                value={value}
                onChange={onChange}
                onBlur={onBlur ?? (() => {})}
                ariaLabel={ariaLabel ?? ""}
                style={style}
            />
        );
    }
}
