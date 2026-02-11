/**
 * Dropdown for selecting a locked figure to add to an interactive graph.
 * Locked figures are elements (points, segmeents, etc.) that are not
 * interactive, just present in the graph's background.
 *
 * Used in the interactive graph editor's locked figures section.
 */
import {View} from "@khanacademy/wonder-blocks-core";
import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
import {spacing, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {LockedFigureType} from "@khanacademy/perseus-core";

type Props = {
    id: string;
    onChange: (value: LockedFigureType) => void;
};

const LockedFigureSelect = (props: Props) => {
    const {id, onChange} = props;

    const figureTypes: ReadonlyArray<LockedFigureType> = [
        "point",
        "line",
        "vector",
        "ellipse",
        "polygon",
        "function",
        "label",
    ];

    return (
        <View style={styles.container}>
            <ActionMenu
                menuText="Add locked figure"
                style={styles.addElementSelect}
            >
                {figureTypes.map((figureType) => (
                    <ActionItem
                        key={`${id}-${figureType}`}
                        label={figureType}
                        onClick={() => onChange(figureType)}
                    />
                ))}
            </ActionMenu>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.xSmall_8,
    },
    addElementSelect: {
        backgroundColor: semanticColor.core.background.instructive.subtle,
        borderRadius: spacing.xxxSmall_4,
    },
});

export default LockedFigureSelect;
