import {ApiOptions} from "@khanacademy/perseus";
import {getDefaultFigureForType} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {useState} from "react";

import LockedFiguresSection from "../../widgets/interactive-graph-editor/locked-figures/locked-figures-section";

import type {Meta, StoryFn, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof LockedFiguresSection> = {
    title: "Editors/Components/Locked Figures Section",
    component: LockedFiguresSection,
};

export default meta;

export const Default: StoryObj<typeof LockedFiguresSection> = {
    args: {},
};

type Story = StoryFn<typeof LockedFiguresSection>;

export const Controlled: Story = () => {
    const [figures, setFigures] = useState([]);

    const handlePropsUpdate = (newProps) => {
        setFigures(newProps.lockedFigures);
    };

    return (
        <LockedFiguresSection
            figures={figures}
            onChange={handlePropsUpdate}
            apiOptions={ApiOptions.defaults}
        />
    );
};

export const WithProdWidth: Story = () => {
    const [figures, setFigures] = useState([
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
                apiOptions={ApiOptions.defaults}
            />
        </View>
    );
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
