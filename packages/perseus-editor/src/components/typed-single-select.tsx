import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

/**
 * A single option in a `TypedSingleSelect`.
 *
 * - A non-empty string is the option's visible label.
 * - The object form additionally allows a `leftAccessory` (e.g. an icon or
 *   swatch) to be rendered before the label. Objects are always shown, so this
 *   form is the way to render an accessory-only option (empty `label`).
 * - Any falsey value (`""`, `false`, `null`, `undefined`) hides the option.
 *   This supports the `condition && "Label"` idiom for conditionally showing an
 *   option without dropping it from the `options` object.
 */
type SelectOption =
    | string
    | null
    | undefined
    | false
    // FUTURE: add `rightAccessory`, `labelAsText`, or other options as needed
    // to configure the underlying Option component.
    | {label: string; leftAccessory?: React.ReactNode};

/**
 * An object representing the options of a `<select>` element in HTML.
 * Each property key in the object is a `value` of an option, and each
 * property value describes how that option appears in the dropdown. If a
 * property value is falsey, the corresponding option is hidden.
 */
type SelectOptions<ValueT extends string> = Record<ValueT, SelectOption>;

interface OwnProps<ValueT extends string> {
    options: SelectOptions<ValueT>;
    selectedValue?: NoInfer<ValueT> | null | undefined;
    onChange: (selectedValue: NoInfer<ValueT>) => void;
}

export type Props<ValueT extends string> = OwnProps<ValueT> &
    Omit<PropsFor<typeof SingleSelect>, keyof OwnProps<string>>;

/**
 * A typesafe version of Wonder Blocks' `SingleSelect` component. Use this
 * when you need a `SingleSelect` to choose among the branches of a union
 * type like `"foo" | "bar" | "baz"`.
 *
 * `ValueT` is inferred from the keys of `options`, so `selectedValue` and the
 * value passed to `onChange` are guaranteed to be members of that union — no
 * cast or runtime check is needed at the call site.
 */
export function TypedSingleSelect<ValueT extends string>(props: Props<ValueT>) {
    // `options` is this wrapper's own prop; don't forward it to `SingleSelect`
    // (and thence to the DOM). `onChange` is re-typed below.
    const {options, onChange, ...rest} = props;
    return (
        <SingleSelect
            {...rest}
            // Wonder Blocks types `onChange` as `(value: string) => void`.
            // Every value `SingleSelect` can emit is one of the option keys we
            // gave it, so narrowing that `string` back to `ValueT` is sound.
            // This is the single unavoidable cast; it lets call sites stay
            // cast-free.
            // eslint-disable-next-line no-restricted-syntax
            onChange={onChange as (selectedValue: string) => void}
        >
            {Object.entries<SelectOption>(options).map(([value, option]) => {
                // Object form: a label plus an optional accessory.
                if (typeof option === "object" && option !== null) {
                    return (
                        <OptionItem
                            key={value}
                            value={value}
                            label={option.label}
                            leftAccessory={option.leftAccessory}
                        />
                    );
                }
                // String form: a non-empty string is a label. Anything
                // falsey (empty string, false, null, undefined) hides the
                // option.
                if (typeof option === "string" && option !== "") {
                    return (
                        <OptionItem key={value} value={value} label={option} />
                    );
                }
                return null;
            })}
        </SingleSelect>
    );
}
