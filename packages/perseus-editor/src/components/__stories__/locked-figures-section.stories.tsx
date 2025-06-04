import {View} from "@khanacademy/wonder-blocks-core";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import LockedFiguresSection from "../../widgets/interactive-graph-editor/locked-figures/locked-figures-section";
import {getDefaultFigureForType} from "../../widgets/interactive-graph-editor/locked-figures/util";

import type {Meta, StoryObj} from "@storybook/react-vite";

export default {
    title: "PerseusEditor/Components/Locked Figures Section",
    component: LockedFiguresSection,
} as Meta<typeof LockedFiguresSection>;

export const Default = (args): React.ReactElement => {
    return <LockedFiguresSection {...args} />;
};

type StoryComponentType = StoryObj<typeof LockedFiguresSection>;

// Set the default values in the control panel.
Default.args = {};

export const Controlled: StoryComponentType = {
    render: function Render() {
        const [figures, setFigures] = React.useState([]);

        const handlePropsUpdate = (newProps) => {
            setFigures(newProps.lockedFigures);
        };

        return (
            <LockedFiguresSection
                figures={figures}
                onChange={handlePropsUpdate}
            />
        );
    },
};

export const WithProdWidth: StoryComponentType = {
    render: function Render() {
        const [figures, setFigures] = React.useState([
            getDefaultFigureForType("point"),
            getDefaultFigureForType("line"),
        ]);

        const handlePropsUpdate = (newProps) => {
            setFigures(newProps.lockedFigures);
        };

        return (
            <View style={styles.prodSizeContainer}>
                <LockedFiguresSection
                    figures={figures}
                    onChange={handlePropsUpdate}
                />
            </View>
        );
    },
};

const contentSize = 310;
const padding = 10;
// Padding on each side
const containerSize = contentSize + 2 * padding;

const styles = StyleSheet.create({
    prodSizeContainer: {
        width: containerSize,
        padding: padding,
        marginInlineStart: spacing.medium_16,
        border: `1px solid ${color.offBlack32}`,
        borderRadius: spacing.xxxSmall_4,
    },
});
