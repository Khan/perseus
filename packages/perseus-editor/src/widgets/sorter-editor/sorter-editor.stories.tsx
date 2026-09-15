import {ApiOptions} from "@khanacademy/perseus";
import {
    generateSorterOptions,
    generateSorterWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import sorterLogic from "@khanacademy/perseus-core/widgets/sorter";
import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerWidgetEditorDecorator} from "../../__docs__/register-widget-editor-decorator";
import {PROD_EDITOR_WIDTH} from "../storybook-constants";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

import SorterEditor, {sorterEditorRegistration} from "./index";

const withinEditorPageDecorator = (_, {args, parameters}) => {
    return (
        <div style={{width: PROD_EDITOR_WIDTH}}>
            <EditorPageWithStorybookPreview
                apiOptions={parameters?.apiOptions ?? ApiOptions.defaults}
                question={generateTestPerseusRenderer({
                    content: "[[☃ sorter 1]]",
                    widgets: {
                        "sorter 1": generateSorterWidget({
                            options: generateSorterOptions({
                                ...args,
                            }),
                        }),
                    },
                })}
            />
        </div>
    );
};

const meta: Meta = {
    title: "Widgets/Sorter/Editor Demo",
    component: SorterEditor,
    decorators: [registerWidgetEditorDecorator([sorterEditorRegistration])],
} satisfies Meta<typeof SorterEditor>;
export default meta;

const InteractiveSorterEditor = () => {
    const [options, setOptions] = React.useState<PerseusSorterWidgetOptions>(
        sorterLogic.defaultWidgetOptions,
    );

    const onChange = (newOptions: Partial<PerseusSorterWidgetOptions>) => {
        action("onChange")(newOptions);
        setOptions((prevOptions) => ({...prevOptions, ...newOptions}));
    };

    return <SorterEditor {...options} onChange={onChange} />;
};

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    render: () => <InteractiveSorterEditor />,
};

/**
 * This Sorter widget editor does not have any options set.
 */
export const WithinEditorPage: Story = {
    decorators: [withinEditorPageDecorator],
    args: {},
};
