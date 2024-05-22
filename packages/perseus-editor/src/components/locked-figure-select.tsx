/**
 * Dropdown for selecting a locked figure to add to an interactive graph.
 * Locked figures are elements (points, segmeents, etc.) that are not
 * interactive, just present in the graph's background.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
import {spacing, color} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    id: string;
    onChange: (value: string) => void;
};

const LockedFigureSelect = (props: Props) => {
    const {id, onChange} = props;

    return (
        <ActionMenu
            menuText="Add locked figure"
            style={styles.addElementSelect}
        >
            {[
                <ActionItem
                    key={`${id}-point`}
                    label="Point"
                    onClick={() => onChange("point")}
                >
                    Point
                </ActionItem>,
                <ActionItem
                    key={`${id}-line`}
                    label="Line"
                    onClick={() => onChange("line")}
                >
                    Line
                </ActionItem>,
            ]}
        </ActionMenu>
    );
};

const styles = StyleSheet.create({
    addElementSelect: {
        backgroundColor: color.fadedBlue8,
        borderRadius: spacing.xxxSmall_4,
        height: spacing.xLarge_32,
    },
});

export default LockedFigureSelect;
