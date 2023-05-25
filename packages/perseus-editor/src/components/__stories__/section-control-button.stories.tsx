import {icons} from "@khanacademy/perseus";
import * as React from "react";

import SectionControlButton from "../section-control-button";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Editor/Components/Section Control Button",
} as Story;

export const ButtonForEditingSectionsOfContentWithInArticleEditor = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <SectionControlButton
            icon={icons.iconTrash}
            onClick={() => {}}
            title="Remove image widget"
        />
    );
};
