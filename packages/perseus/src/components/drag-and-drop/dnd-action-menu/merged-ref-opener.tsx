import {CustomOpener} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";

/**
 * Points a ref at `value`. React refs are either a callback function or
 * an object with `.current`, so setting one means handling both shapes.
 */
function assignRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
    if (typeof ref === "function") {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
}

type MergedRefOpenerProps = {
    /** The parent-facing ref, forwarded by DndActionMenu for focus return. */
    openerRef: React.ForwardedRef<HTMLButtonElement>;
    disabled: boolean;
    "aria-labelledby": string;
    "aria-describedby": string;
    className: string;
    children: React.ReactNode;
};

/**
 * Two things need a ref to the opener button: ActionMenu (to restore focus
 * when the menu closes) and our parent (to move focus after a tile moves).
 * ActionMenu overwrites any ref we set directly, so this wrapper catches
 * ActionMenu's ref and writes the button into both.
 */
export const MergedRefOpener = React.forwardRef<
    HTMLButtonElement,
    MergedRefOpenerProps
>(function MergedRefOpener({openerRef, ...rest}, injectedRef) {
    const mergedRef = (node: HTMLButtonElement | null) => {
        assignRef(injectedRef, node);
        assignRef(openerRef, node);
    };
    return <CustomOpener ref={mergedRef} {...rest} />;
});
