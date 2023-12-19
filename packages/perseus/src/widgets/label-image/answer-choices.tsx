/**
 * Enables single or multiple answers selection using WonderBlocks dropdowns.
 */

import {
    MultiSelect,
    SingleSelect,
    OptionItem,
} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";
import _ from "underscore";

import Renderer from "../../renderer";

export type AnswerType = {
    // The answer string, can be plain text or a KaTeX expression.
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
    opener: SingleSelect["props"]["opener"];
    opened: boolean;
};

const AnswerChoices = (props: AnswerChoicesProps) => {
    // const idFactory = useUniqueIdWithMock();
    // const switchId = idFactory.get("answer-choices-toggle");
    // const labelId = idFactory.get("hide-answers-label");

    const onAnswerChange = (selected: string[]) => {
        const {choices, multipleSelect, onChange} = props;

        const selection: Array<boolean> = [];

        // Compile the selection state of answer choices. In single selection
        // mode (radio input type), only 0 or 1 answer may be chosen.
        for (const choice of choices) {
            const included = selected.includes(choice.content);
            selection.push(
                multipleSelect
                    ? included
                        ? true
                        : choice.checked
                    : included
                    ? true
                    : false,
            );
        }

        onChange(selection);
    };

    // WB Dropdown types only take an array of nodes, so we can't use a
    // functional component, which can only return a single node.
    const AnswerItems = (choices: readonly AnswerType[]) =>
        choices.map(({content}) => (
            <OptionItem
                key={content}
                value={content}
                label={<Renderer content={content} inline />}
            />
        ));

    const selectedValues = props.choices
        .filter((choice) => choice.checked)
        .map((choice) => choice.content);

    const args = {
        // reset to allow child (answer pill) to control z-index
        style: {zIndex: "unset"},
        children: AnswerItems(props.choices),
        opener: props.opener,
        opened: props.opened,
    };

    return props.multipleSelect ? (
        <MultiSelect
            selectedValues={selectedValues}
            onChange={(selected) => onAnswerChange(selected)}
            {...args}
        />
    ) : (
        <SingleSelect
            selectedValue={selectedValues[0]}
            onChange={(selected) => onAnswerChange([selected])}
            {...args}
            placeholder={props.choices[0].content} // not visible, but required
        />
    );
};

export default AnswerChoices;
