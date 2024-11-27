import {UniqueIDProvider, View} from "@khanacademy/wonder-blocks-core";
import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import ReactDOM from "react-dom";

import {PerseusI18nContext} from "../../components/i18n-context";
import {ApiOptions} from "../../perseus-api";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/dropdown/dropdown-ai-utils";

import scoreDropdown from "./score-dropdown";

import type {PerseusDropdownWidgetOptions} from "../../perseus-types";
import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {
    PerseusDropdownRubric,
    PerseusDropdownUserInput,
} from "../../validation.types";
import type {DropdownPromptJSON} from "../../widget-ai-utils/dropdown/dropdown-ai-utils";

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
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

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
            <UniqueIDProvider scope="dropdown-widget" mockOnFirstRender={true}>
                {(ids) => (
                    <View
                        // NOTE(jared): These are required to prevent weird behavior
                        // When there's a dropdown in a zoomable table.
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onTouchStart={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {this.props.visibleLabel && (
                            <LabelLarge
                                tag="label"
                                id={ids.get("dropdown-label")}
                            >
                                {this.props.visibleLabel}
                            </LabelLarge>
                        )}
                        <SingleSelect
                            id={ids.get("dropdown")}
                            placeholder=""
                            onChange={(value) =>
                                this._handleChange(parseInt(value))
                            }
                            selectedValue={String(this.props.selected)}
                            disabled={this.props.apiOptions.readOnly}
                            aria-label={
                                this.props.ariaLabel ||
                                this.context.strings.selectAnAnswer
                            }
                            aria-labelledby={ids.get("dropdown-label")}
                            // This is currently necessary for SRs to read the labels properly.
                            // However, WB is working on a change to add the "combobox" role to
                            // all dropdowns.
                            // See https://khanacademy.atlassian.net/browse/WB-1671
                            role="combobox"
                        >
                            {children}
                        </SingleSelect>
                    </View>
                )}
            </UniqueIDProvider>
        );
    }
}

type RenderProps = {
    placeholder: PerseusDropdownWidgetOptions["placeholder"];
    visibleLabel: PerseusDropdownWidgetOptions["visibleLabel"];
    ariaLabel: PerseusDropdownWidgetOptions["ariaLabel"];
    choices: ReadonlyArray<string>;
};

const optionsTransform: (arg1: PerseusDropdownWidgetOptions) => RenderProps = (
    widgetOptions,
) => {
    return {
        placeholder: widgetOptions.placeholder,
        visibleLabel: widgetOptions.visibleLabel,
        ariaLabel: widgetOptions.ariaLabel,
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
    // TODO(LEMS-2656): remove TS suppression
    // @ts-expect-error: Type 'UserInput' is not assignable to type 'PerseusDropdownUserInput'.
    scorer: scoreDropdown,
} satisfies WidgetExports<typeof Dropdown>;
