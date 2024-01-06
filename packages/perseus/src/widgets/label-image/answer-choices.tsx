/**
 * Enables single or multiple answers selection using WonderBlocks dropdowns.
 */

import {mathMatcher} from "@khanacademy/pure-markdown";
import {
    MultiSelect,
    SingleSelect,
    OptionItem,
} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";
import _ from "underscore";

import Renderer from "../../renderer";
import * as SRE from "../../util/sre";

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

// `mathMatcher` comes from our very own PureMarkdown library. It's the same
// parser used by the Renderer component, so it should have good parity.
const maybeGetTex = (content: string) => {
    const match = mathMatcher(content);
    return match?.length ? match[1] : undefined;
};

// If the content is only a TeX expression, convert to readable text using the
// same technology as MathJax internally: Speech Rule Engine (SRE).
// docs.mathjax.org/en/latest/basic/a11y-extensions.html#accessibility-extension
// The `option` role makes all descendents presentational, so the MathML is not
// read by screen readers. We use SRE, which is forked from the ChromeVox screen
// reader, to parse the TeX to MathML then generate a label.
const maybeMathLabelFromTex = (content: string) => {
    let label: string | undefined = undefined;
    const tex = maybeGetTex(content);
    if (tex) {
        label = SRE.texToText(tex);
    }
    return label;
};

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
        // Asynchrously add human-readable labels to the dropdown options.
        // This takes milliseconds, but since it's async we don't want to block
        // the render.
        SRE.setup().then(() =>
            setChildren(
                choices.map(({content}) => (
                    <OptionItem
                        {...optionArgs(content)}
                        aria-label={maybeMathLabelFromTex(content)}
                    />
                )),
            ),
        );
    }, [choices]);

    const args: Partial<
        React.ComponentProps<typeof MultiSelect> &
            React.ComponentProps<typeof SingleSelect>
    > = {
        // reset to allow child (answer pill) to control z-index
        style: {zIndex: "unset"},
        children,
        opener,
        onToggle,
        disabled,
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
