import {TextArea} from "@khanacademy/wonder-blocks-form";
import * as React from "react";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type TextAreaProps = Omit<PropsFor<typeof TextArea>, "rows">;

// TODO(3326): Remove this whole component once WB TextArea supports
// dynamic resizing.
export const AutoResizingTextArea = (props: TextAreaProps) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        function adjustHeight() {
            const textArea = textAreaRef.current;
            if (textArea) {
                // Reset the height to get the correct scrollHeight.
                // 42px is the default height of the Wonder Blocks TextArea
                // when it has one row.
                textArea.style.height = "42px";
                // Set height to scrollHeight to fit all content.
                textArea.style.height = `${textArea.scrollHeight}px`;
            }
        }

        adjustHeight();
    }, [props.value]);

    return (
        <TextArea
            {...props}
            ref={textAreaRef}
            resizeType="none"
            style={{
                overflow: "hidden",
                ...props.style,
            }}
        />
    );
};
