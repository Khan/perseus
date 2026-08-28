import {sorterLogic} from "@khanacademy/perseus-core";
import * as React from "react";
import {action} from "storybook/actions";

import SorterEditor from "./sorter-editor";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Sorter/Editor Demo",
    component: SorterEditor,
    tags: ["!dev"],
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
