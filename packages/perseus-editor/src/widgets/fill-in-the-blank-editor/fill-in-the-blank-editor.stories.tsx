import {ApiOptions} from "@khanacademy/perseus";
import {
    fillInTheBlankLogic,
    generateFillInTheBlankOptions,
    generateFillInTheBlankWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {getFeatureFlags} from "../../testing/feature-flags-util";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import {PROD_EDITOR_WIDTH} from "../storybook-constants";

import FillInTheBlankEditor from "./fill-in-the-blank-editor";

import type {PerseusFillInTheBlankWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

// The editor and the widget both render nothing without their flag.
const apiOptions = {
    ...ApiOptions.defaults,
    flags: getFeatureFlags({"dnd-widget-fitb": true}),
};

const withinEditorPageDecorator = (_, {args, parameters}) => {
    return (
        <div style={{width: PROD_EDITOR_WIDTH}}>
            <EditorPageWithStorybookPreview
                apiOptions={parameters?.apiOptions ?? apiOptions}
                question={generateTestPerseusRenderer({
                    content: "[[☃ fill-in-the-blank 1]]",
                    widgets: {
                        "fill-in-the-blank 1": generateFillInTheBlankWidget({
                            options: generateFillInTheBlankOptions({
                                ...args,
                            }),
                        }),
                    },
                })}
            />
        </div>
    );
};

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Fill in the Blank/Editor Demo",
    component: FillInTheBlankEditor,
} satisfies Meta<typeof FillInTheBlankEditor>;
export default meta;

const InteractiveFillInTheBlankEditor = () => {
    const [options, setOptions] =
        React.useState<PerseusFillInTheBlankWidgetOptions>(
            fillInTheBlankLogic.defaultWidgetOptions,
        );

    const onChange = (
        newOptions: Partial<PerseusFillInTheBlankWidgetOptions>,
    ) => {
        action("onChange")(newOptions);
        setOptions((prevOptions) => ({...prevOptions, ...newOptions}));
    };

    return (
        <FillInTheBlankEditor
            {...options}
            apiOptions={apiOptions}
            onChange={onChange}
        />
    );
};

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    render: () => <InteractiveFillInTheBlankEditor />,
};

/**
 * The editor as the content editor shows it, alongside a preview of the widget.
 */
export const WithinEditorPage: Story = {
    decorators: [withinEditorPageDecorator],
    args: {},
};
