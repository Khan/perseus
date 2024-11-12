import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import * as React from "react";
import ReactDOM from "react-dom";

import {ApiOptions} from "../../perseus-api";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/dropdown/prompt-utils";

import dropdownValidator from "./dropdown-validator";

import type {PerseusDropdownWidgetOptions} from "../../perseus-types";
import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {
    PerseusDropdownRubric,
    PerseusDropdownUserInput,
} from "../../validation.types";
import type {DropdownPromptJSON} from "../../widget-ai-utils/dropdown/prompt-utils";

type Props = WidgetProps<RenderProps, PerseusDropdownRubric> & {
    selected: number;
};

type DefaultProps = {
    choices: Props["choices"];
    selected: Props["selected"];
    placeholder: Props["placeholder"];
    apiOptions: Props["apiOptions"];
};

class Dropdown extends React.Component<Props> implements Widget {
    static defaultProps: DefaultProps = {
        choices: [],
        selected: 0,
        placeholder: "",
        apiOptions: ApiOptions.defaults,
    };

    focus: () => boolean = () => {
        // TODO(LP-10797): This focus() call doesn't do anything because our
        // root element is a <div> and that cannot be focused without a
        // tabIndex.
        // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'focus' does not exist on type 'Element | Text'.
        ReactDOM.findDOMNode(this).focus();
        return true;
    };

    _handleChangeEvent: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (
        e,
    ) => {
        this._handleChange(parseInt(e.target.value));
    };

    _handleChange: (arg1: number) => void = (selected) => {
        this.props.trackInteraction();
        this.props.onChange({selected: selected});
    };

    getUserInput(): PerseusDropdownUserInput {
        return {value: this.props.selected};
    }

    getPromptJSON(): DropdownPromptJSON {
        return _getPromptJSON(this.props, this.getUserInput());
    }

    render(): React.ReactNode {
        const children = [
            <OptionItem
                key="placeholder"
                value="0"
                disabled
                label={this.props.placeholder}
            />,
            ...this.props.choices.map((choice, i) => (
                <OptionItem
                    key={String(i + 1)}
                    value={String(i + 1)}
                    label={choice}
                />
            )),
        ];

        return (
            <div
                // NOTE(jared): These are required to prevent weird behavior
                // When there's a dropdown in a zoomable table.
                onClick={(e) => {
                    e.stopPropagation();
                }}
                onTouchStart={(e) => {
                    e.stopPropagation();
                }}
            >
                <SingleSelect
                    placeholder=""
                    onChange={(value) => this._handleChange(parseInt(value))}
                    selectedValue={String(this.props.selected)}
                    disabled={this.props.apiOptions.readOnly}
                >
                    {children}
                </SingleSelect>
            </div>
        );
    }
}

type RenderProps = {
    placeholder: string;
    choices: ReadonlyArray<string>;
};

const optionsTransform: (arg1: PerseusDropdownWidgetOptions) => RenderProps = (
    widgetOptions,
) => {
    return {
        placeholder: widgetOptions.placeholder,
        choices: widgetOptions.choices.map((choice) => choice.content),
    };
};

export default {
    name: "dropdown",
    displayName: "Drop down",
    defaultAlignment: "inline-block",
    accessible: true,
    widget: Dropdown,
    transform: optionsTransform,
    scorer: dropdownValidator,
} satisfies WidgetExports<typeof Dropdown>;
