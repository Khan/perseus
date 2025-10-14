import {iconTrash} from "@khanacademy/perseus";
import * as React from "react";

import SectionControlButton from "../section-control-button";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Components/Section Control Button",
} as Story;

export const ButtonForEditingSectionsOfContentWithInArticleEditor = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <SectionControlButton
            icon={iconTrash}
            disabled={false}
            onClick={() => {}}
            title="Remove image widget"
        />
    );
};
