import {TextField} from "@khanacademy/wonder-blocks-form";
import * as React from "react";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

/**
 * This is a custom text field of type="number" for use in Perseus Editors.
 *
 * This makes it so that the text field's input number updates on scroll
 * without scrolling the page.
 *
 * NOTE 1: Native HTML number inputs do not update the number value on scroll,
 * they only scroll the page. For some reason, inputs in React do NOT work
 * this way. By default, scrolling on a focused number input in React causes
 * BOTH the input value to change AND the page to scroll. The behavior in
 * this component is an improvement on the React behavior, but it's the
 * opposite of the native HTML behavior.
 *
 * NOTE 2: Firefox seems to have a custom override for this. Even with this
 * stopPropogation, Firefox matches the native HTML behavior.
 */
const ScrolllessNumberTextField = (props: PropsFor<typeof TextField>) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const ref = inputRef.current;

        // stopPropogation makes it so that the page scroll event is not
        // triggered when the input is focused and the user scrolls.
        // The input value will still change on scroll.
        const ignoreScroll = (e) => {
            e.stopPropagation();
        };

        ref?.addEventListener("wheel", ignoreScroll);

        return () => {
            ref?.removeEventListener("wheel", ignoreScroll);
        };
    }, [inputRef]);

    return <TextField type="number" {...props} ref={inputRef} />;
};

export default ScrolllessNumberTextField;
