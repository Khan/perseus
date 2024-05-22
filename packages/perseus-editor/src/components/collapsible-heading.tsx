import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ToggleableCaret from "./toggleable-caret";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

function Heading({
    title,
    isOpen,
    onToggle,
    style,
}: {
    title: string;
    isOpen: boolean;
    onToggle?: (isOpen: boolean) => void;
    style?: StyleType;
}) {
    return (
        <Clickable onClick={() => onToggle?.(!isOpen)}>
            {() => (
                <View style={[styles.container, style]}>
                    <LabelSmall>{title}</LabelSmall>
                    <ToggleableCaret isExpanded={isOpen} />
                </View>
            )}
        </Clickable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: color.offBlack8,
        padding: spacing.xSmall_8,
        // NOTE(jeremy): This is the inverse of the @editorPadding CSS
        // variable found in perseus-editor.less. For now, it must
        // match otherwise there's a gap from this header to the edge
        // of the editor borders.
        marginInline: -10,
    },
});

export default Heading;
