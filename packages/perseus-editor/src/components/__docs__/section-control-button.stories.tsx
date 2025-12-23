import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import SectionControlButton from "../section-control-button";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Editors/Components/Section Control Button",
} as Story;

export const ButtonForEditingSectionsOfContentWithInArticleEditor = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <SectionControlButton
            icon={trashIcon}
            disabled={false}
            onClick={() => {}}
            title="Remove image widget"
        />
    );
};
