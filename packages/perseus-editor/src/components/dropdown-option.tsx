/* eslint-disable @khanacademy/ts-no-error-suppressions */
/**
 * The Option is an item to be used in the Select components and the
 * derivations such as MultiSelect, CheckList, and CheckBoxList. Also includes
 * OptionGroup which is an internal component used in the dropdowns to house
 * a list of options.
 **/
import {components} from "@khanacademy/perseus";
import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import ReactDOM from "react-dom";

import {gray17, gray76, gray95} from "../styles/global-colors";

import {focusWithChromeStickyFocusBugWorkaround} from "./util";

const {Icon} = components;

const findAndFocusElement = (component?: Element | null) => {
    const DOMNode: Element | Text | null | undefined =
        ReactDOM.findDOMNode(component);
    const button = DOMNode as HTMLInputElement;
    // @ts-expect-error - TS2774 - This condition will always return true since this function is always defined. Did you mean to call it instead?
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (button.focus) {
        focusWithChromeStickyFocusBugWorkaround(button);
    }
};

type Props = {
    // The value to use when the option is selected
    value: string;
    // The display of the option
    children?: React.ReactNode;
    // Is the current option selected?
    selected?: boolean;
    // Is the current option disabled?
    disabled?: boolean;
    // An event when an option is clicked
    onClick?: () => void;
    // An optional function to call when the dropdown should close
    // Only relevant if the Option is inside of a dropdown menu
    onDropdownClose?: () => void;
    // An optional value to override the focus styling of an option.
    // Use caution when using this - keyboard users need to know what they're
    // focused on in order to interact with the product!
    hideFocusState?: boolean;
    // An optional test id that can be used to identify this Option in automated tests.
    testId?: string;
    // Text to provide for assistive tech users
    ariaLabel?: string;
};

const check = `M10,3.8C10,4,9.9,4.2,9.8,4.3L5.1,8.9L4.3,9.8C4.2,9.9,4,10,3.8,10
 S3.5,9.9,3.4,9.8L2.5,8.9L0.2,6.6C0.1,6.5,0,6.3,0,6.2s0.1-0.3,0.2-0.4
 l0.9-0.9c0.1-0.1,0.3-0.2,0.4-0.2s0.3,0.1,0.4,0.2l1.9,1.9l4.2-4.2c0.1
 -0.1,0.3-0.2,0.4-0.2c0.2,0,0.3,0.1,0.4,0.2l0.9,0.9C9.9,3.5,10,3.7,
 10,3.8z`;

const optionHeight = 30;

class Option extends React.Component<Props> {
    // @ts-expect-error - TS2564 - Property 'node' has no initializer and is not definitely assigned in the constructor.
    node: HTMLDivElement;

    handleKeyDown(event: any): void {
        const {onDropdownClose} = this.props;
        const pressedKey = event.key;
        const focusedElement = event.target;

        if (pressedKey === "ArrowDown" && focusedElement.nextSibling) {
            event.preventDefault();
            focusedElement.nextSibling.focus();
        }
        if (pressedKey === "ArrowUp" && focusedElement.previousSibling) {
            event.preventDefault();
            focusedElement.previousSibling.focus();
        }
        if (
            pressedKey === "ArrowUp" &&
            !focusedElement.previousSibling &&
            onDropdownClose
        ) {
            event.preventDefault();
            onDropdownClose();
        }
        if (
            (pressedKey === "Escape" || pressedKey === "Tab") &&
            onDropdownClose
        ) {
            onDropdownClose();
        }
    }

    render(): React.ReactNode {
        const {
            selected,
            value,
            onClick,
            children,
            disabled,
            hideFocusState,
            testId,
            ariaLabel,
        } = this.props;

        return (
            <button
                // @ts-expect-error - TS2322 - Type 'HTMLButtonElement | null' is not assignable to type 'HTMLDivElement'.
                ref={(node) => (this.node = node)}
                value={value}
                role="menuitemradio"
                aria-checked={selected}
                className={css(
                    styles.notAButton,
                    disabled && styles.cursorDefault,
                    hideFocusState && styles.noFocus,
                )}
                // @ts-expect-error - TS2322 - Type '(value: string) => void' is not assignable to type 'MouseEventHandler<HTMLButtonElement>'.
                onClick={(value: string) => {
                    if (!disabled && onClick) {
                        // @ts-expect-error - TS2554 - Expected 0 arguments, but got 1.
                        onClick(value);
                    }
                }}
                // @ts-expect-error - TS2322 - Type '(event: KeyboardEvent) => void' is not assignable to type 'KeyboardEventHandler<HTMLButtonElement>'.
                onKeyDown={(event: KeyboardEvent) => this.handleKeyDown(event)}
                aria-disabled={disabled}
                aria-label={ariaLabel}
                data-testid={testId}
            >
                <span
                    className={css(
                        styles.option,
                        selected && styles.optionSelected,
                        disabled && styles.optionDisabled,
                    )}
                >
                    {children}
                    {selected && (
                        <span className={css(styles.check)}>
                            <Icon icon={check} />
                        </span>
                    )}
                </span>
            </button>
        );
    }
}

class OptionGroup extends React.Component<{
    // An event when an option is selected
    onSelected: (value: string) => void;
    // The list of options to display
    children?: Array<React.ReactElement<React.ComponentProps<typeof Option>>>;
    // The currently selected options
    selectedValues: Array<string>;
    // An override to skip the bit of top/bottom spacing around the group
    noMargin?: boolean;
    // An optional function to call when the dropdown should close
    onDropdownClose?: () => void;
    // An optional value to override the focus styling of an option.
    // Use caution when using this - keyboard users need to know what
    // they're focused on in order to interact with the product!
    hideFocusState?: boolean;
}> {
    // @ts-expect-error - TS2564 - Property 'focusedElement' has no initializer and is not definitely assigned in the constructor.
    focusedElement: Element;

    componentDidMount() {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (this.focusedElement) {
            findAndFocusElement(this.focusedElement);
        }
    }

    render(): React.ReactNode {
        const {
            children,
            onSelected,
            selectedValues,
            noMargin,
            onDropdownClose,
            hideFocusState,
        } = this.props;

        return (
            <div
                // @ts-expect-error - TS2322 - Type 'Window | null' is not assignable to type 'Top<string | number> | undefined'.
                style={{top}}
                className={css(
                    styles.optionGroup,
                    noMargin && styles.optionGroupNoMargin,
                )}
            >
                {React.Children.map(children, (child, index) => {
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                    const selected = selectedValues.includes(child.props.value);

                    const reference =
                        selected || index === 0
                            ? (node: Element) => (this.focusedElement = node)
                            : null;

                    // @ts-expect-error - TS2769 - No overload matches this call.
                    return React.cloneElement(child, {
                        // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                        ...child.props,
                        key: index,
                        selected: selected,
                        // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                        onClick: () => onSelected(child.props.value),
                        ref: reference,
                        onDropdownClose: onDropdownClose,
                        hideFocusState: hideFocusState,
                    });
                })}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    optionGroup: {
        margin: "4px 0",
    },
    optionGroupNoMargin: {
        margin: 0,
    },
    option: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 32,
        paddingRight: 32,
        height: optionHeight,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: gray17,
        userSelect: "none",

        ":hover": {
            backgroundColor: gray95,
        },
    },
    optionSelected: {
        backgroundColor: gray95,
        color: "#11ACCD",
    },
    optionDisabled: {
        color: gray76,
        ":hover": {
            backgroundColor: "transparent",
        },
    },
    check: {
        position: "absolute",
        left: 11,
    },
    notAButton: {
        backgroundColor: "transparent",
        border: "none",
        display: "block",
        padding: 0,
        margin: 0,
        width: "100%",
        // <button> uses user agent stylesheet over inherit so we need to set
        // it explicitly.
        font: "inherit",
    },
    noFocus: {
        outline: "none",
    },
    cursorDefault: {
        cursor: "default",
    },
});

export {OptionGroup};
export default Option;
