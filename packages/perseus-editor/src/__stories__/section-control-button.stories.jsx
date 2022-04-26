// @flow
import {icons} from "@khanacademy/perseus";
import * as React from "react";

import SectionControlButton from "../section-control-button.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus Editor/Widgets/Section Control Button",
}: Story);

export const ButtonForEditingSectionsOfContentWithInArticleEditor = (
    args: StoryArgs,
): React.Node => {
    return (
        <SectionControlButton
            icon={icons.iconTrash}
            onClick={() => {}}
            title="Remove image widget"
        />
    );
};
