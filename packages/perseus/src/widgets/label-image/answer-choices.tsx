/**
 * Enables single or multiple answers selection using WonderBlocks dropdowns.
 */

import {mathMatcher} from "@khanacademy/pure-markdown";
import {
    MultiSelect,
    SingleSelect,
    OptionItem,
} from "@khanacademy/wonder-blocks-dropdown";
import sre from "latex-to-speech";
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
    // Callback to handle toggle of dropdown.
    onToggle: (opened: boolean) => unknown;
    // Whether the answer choices are disabled.
    disabled: boolean;
};

const optionArgs = (content: string) => ({
    key: content,
    value: content,
    label: <Renderer content={content} inline />,
});

const AnswerChoices = (props: AnswerChoicesProps) => {
    const {opener, onToggle, disabled, choices} = props;

    // This will be asynchronously replaced with OptionItems with
    // human-readable labels. It should be near-instantaneous, but we still
    // need to account for the loading state.
    const [children, setChildren] = React.useState<JSX.Element[]>(
        choices.map(({content}) => <OptionItem {...optionArgs(content)} />),
    );

    const onAnswerChange = (selected: string[]) => {
        const {choices, onChange} = props;
        onChange(choices.map((choice) => selected.includes(choice.content)));
    };

    const selectedValues = props.choices
        .filter((choice) => choice.checked)
        .map((choice) => choice.content);

    React.useEffect(() => {
        const setChildrenWithLabels = async () => {
            setChildren(
                await Promise.all(
                    choices.map(async ({content}) => (
                        <OptionItem
                            {...optionArgs(content)}
                            labelAsText={
                                // If the content is a TeX expression, convert
                                // to readable text using the same technology as
                                // MathJax internally: Speech Rule Engine.
                                // https://docs.mathjax.org/en/latest/basic/a11y-extensions.html#accessibility-extension
                                mathMatcher(content)
                                    ? await sre([content.slice(1, -1)])[0]
                                    : undefined
                            }
                        />
                    )),
                ),
            );
        };
        setChildrenWithLabels();
    }, [choices]);

    const args = {
        // reset to allow child (answer pill) to control z-index
        style: {zIndex: "unset"},
        children,
        opener,
        onToggle,
        disabled,
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
