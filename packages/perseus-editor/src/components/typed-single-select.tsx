import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

/**
 * An object representing the options of a `<select>` element in HTML.
 * Each property key in the object is a `value` of an option, and each
 * property value is the text of that option in the dropdown. If a property
 * value is falsey, the corresponding option is hidden from the dropdown.
 */
type SelectOptions<ValueT extends string> = Record<
    ValueT,
    string | null | undefined | false
>;

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
 */
export function TypedSingleSelect<ValueT extends string>(props: Props<ValueT>) {
    return (
        <SingleSelect
            {...props}
            // eslint-disable-next-line no-restricted-syntax
            onChange={props.onChange as (selectedValue: string) => void}
        >
            {Object.entries(props.options).map(([key, value]) => {
                if (value) {
                    return (
                        <OptionItem
                            key={key}
                            value={key}
                            label={String(value)}
                        />
                    );
                }
                return null;
            })}
        </SingleSelect>
    );
}
