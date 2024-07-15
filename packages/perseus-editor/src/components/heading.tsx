import {View} from "@khanacademy/wonder-blocks-core";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import ToggleableCaret from "./toggleable-caret";

function Heading({
    title,
    isOpen,
    onToggle,
}: {
    title: string;
    isOpen: boolean;
    onToggle?: (isOpen: boolean) => void;
}) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: color.offBlack8,
                padding: spacing.xSmall_8,
                marginTop: spacing.small_12,
                // NOTE(jeremy): This is the inverse of the @editorPadding CSS
                // variable found in perseus-editor.less. For now, it must
                // match otherwise there's a gap from this header to the edge
                // of the editor borders.
                marginInline: -10,
                cursor: "pointer",
            }}
            onClick={() => onToggle?.(!isOpen)}
        >
            <HeadingXSmall>{title}</HeadingXSmall>
            <ToggleableCaret isExpanded={isOpen} />
        </View>
    );
}

export default Heading;
