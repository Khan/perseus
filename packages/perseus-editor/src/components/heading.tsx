import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import ToggleableCaret from "./toggleable-caret";

function Heading({
    title,
    isOpen,
    isCollapsible,
    onToggle,
}: {
    title: string;
    isOpen: boolean;
    isCollapsible: boolean;
    onToggle?: (isOpen: boolean) => void;
}) {
    return (
        <Clickable
            style={[styles.container, !isCollapsible && styles.notClickable]}
            disabled={!isCollapsible}
            onClick={() => isCollapsible && onToggle?.(!isOpen)}
        >
            {() => (
                <View style={styles.heading}>
                    <LabelLarge
                        style={{
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        {title}
                    </LabelLarge>
                    {isCollapsible && <ToggleableCaret isExpanded={isOpen} />}
                </View>
            )}
        </Clickable>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.small_12,
        // NOTE(jeremy): This is the inverse of the @editorPadding CSS
        // variable found in perseus-editor.css. For now, it must
        // match otherwise there's a gap from this header to the edge
        // of the editor borders.
        marginInline: -10,
        backgroundColor: semanticColor.core.background.neutral.subtle,
        padding: spacing.xSmall_8,
        width: "calc(100% + 20px)",
    },
    heading: {
        flexDirection: "row",
        justifyContent: "space-between",
        userSelect: "none",
    },
    notClickable: {
        // We don't need the text to be grayed out.
        color: "inherit",
        // We don't need the pointer to show the "not allowed" symbol.
        cursor: "default",
    },
});

export default Heading;
