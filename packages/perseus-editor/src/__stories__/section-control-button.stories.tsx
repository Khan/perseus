import {icons} from "@khanacademy/perseus";
import * as React from "react";

import SectionControlButton from '../section-control-button';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus Editor/Widgets/Section Control Button",
} as Story;

export const ButtonForEditingSectionsOfContentWithInArticleEditor: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
// @ts-expect-error [FEI-5003] - TS2786 - 'SectionControlButton' cannot be used as a JSX component.
        <SectionControlButton
            icon={icons.iconTrash}
            onClick={() => {}}
            title="Remove image widget"
        />
    );
};
