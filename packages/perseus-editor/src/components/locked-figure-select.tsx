/**
 * Dropdown for selecting a locked figure to add to an interactive graph.
 * Locked figures are elements (points, segmeents, etc.) that are not
 * interactive, just present in the graph's background.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {View} from "@khanacademy/wonder-blocks-core";
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
        <View style={styles.container}>
            <ActionMenu menuText="Add element" style={styles.addElementSelect}>
                {[
                    <ActionItem
                        key={`${id}-point`}
                        label="Point"
                        onClick={() => onChange("point")}
                    >
                        Point
                    </ActionItem>,
                ]}
            </ActionMenu>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.medium_16,
    },
    addElementSelect: {
        backgroundColor: color.fadedBlue16,
        borderRadius: spacing.xxxSmall_4,
    },
});

export default LockedFigureSelect;
