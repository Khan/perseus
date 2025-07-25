import * as React from "react";
import {action} from "storybook/actions";

import {basicDropdown} from "../../../../perseus/src/widgets/dropdown/dropdown.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import DropdownEditor from "../dropdown-editor";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Dropdown/Editor Demo",
    component: DropdownEditor,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding a dropdown widget that allow users to select an\
                    option from a predefined list.",
            },
        },
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    return (
        <div className="framework-perseus">
            <DropdownEditor onChange={action("onChange")} />
        </div>
    );
};

export const Preview = (): React.ReactElement => (
    <EditorPageWithStorybookPreview question={basicDropdown} />
);
