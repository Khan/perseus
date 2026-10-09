/**
 * Enables single or multiple answers selection using WonderBlocks dropdowns.
 */
import {
    MultiSelect,
    SingleSelect,
    OptionItem,
} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import Renderer from "../../renderer";

import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type AnswerType = {
    // The answer string, can be plain text or a TeX expression.
    content: string;
    // Whether the answer is selected.
    checked: boolean;
};

type AnswerChoicesProps = {
    // The list of possible answers in a specific order.
    choices: ReadonlyArray<AnswerType>;
    // Whether multiple answers may be chosen.
    multipleSelect: boolean;
    // Callback to handle change to answer choices selection.
    onChange: (selection: ReadonlyArray<boolean>) => void;
    // Callback to define custom opener.
    opener: PropsFor<typeof SingleSelect>["opener"];
    // Callback to handle toggle of dropdown.
    onToggle: (opened: boolean) => unknown;
    // Whether the answer choices are disabled.
    disabled: boolean;
    // Whether a selection is required to move on from the question.
    "aria-required"?: boolean;
};

const AnswerChoices = (props: AnswerChoicesProps) => {
    const {strings} = usePerseusI18n();

    const onAnswerChange = (selected: string[]) => {
        const {choices, onChange} = props;
        onChange(choices.map((choice) => selected.includes(choice.content)));
    };

    // WB Dropdown types only take an array of nodes, so we can't use a
    // functional component, which can only return a single node.
    const AnswerItems = (choices: readonly AnswerType[]) =>
        choices.map(({content}) => (
            <OptionItem
                key={content}
                value={content}
                label={<Renderer content={content} strings={strings} inline />}
            />
        ));

    const selectedValues = props.choices
        .filter((choice) => choice.checked)
        .map((choice) => choice.content);

    const {opener, onToggle, disabled} = props;

    const args: Partial<
        React.ComponentProps<typeof MultiSelect> &
            React.ComponentProps<typeof SingleSelect>
    > = {
        // reset to allow child (answer pill) to control z-index
        style: {zIndex: "unset"},
        children: AnswerItems(props.choices),
        opener,
        onToggle,
        disabled,
        // We use `aria-required` rather than WB's `required` prop, since
        // `required` also enables WB's validation, which renders an error
        // message when the dropdown is closed without a selection.
        "aria-required": props["aria-required"],
    };

    return props.multipleSelect ? (
        <MultiSelect
            {...args}
            selectedValues={selectedValues}
            onChange={(selected) => onAnswerChange(selected)}
        />
    ) : (
        <SingleSelect
            {...args}
            selectedValue={selectedValues[0]}
            onChange={(selected) => onAnswerChange([selected])}
            placeholder={props.choices[0].content} // not visible, but required
        />
    );
};

export default AnswerChoices;
