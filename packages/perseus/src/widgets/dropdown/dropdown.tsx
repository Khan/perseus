import {Id, View} from "@khanacademy/wonder-blocks-core";
import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import ReactDOM from "react-dom";

import {PerseusI18nContext} from "../../components/i18n-context";
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/dropdown/dropdown-ai-utils";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {DropdownPromptJSON} from "../../widget-ai-utils/dropdown/dropdown-ai-utils";
import type {
    DropdownPublicWidgetOptions,
    PerseusDropdownWidgetOptions,
    PerseusDropdownUserInput,
} from "@khanacademy/perseus-core";

type RenderProps = {
    placeholder: PerseusDropdownWidgetOptions["placeholder"];
    visibleLabel: PerseusDropdownWidgetOptions["visibleLabel"];
    ariaLabel: PerseusDropdownWidgetOptions["ariaLabel"];
    choices: ReadonlyArray<string>;
};

type Props = WidgetProps<RenderProps, PerseusDropdownUserInput>;

type DefaultProps = {
    choices: Props["choices"];
    placeholder: Props["placeholder"];
    apiOptions: Props["apiOptions"];
    userInput: PerseusDropdownUserInput;
};

class Dropdown extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        choices: [],
        placeholder: "",
        apiOptions: ApiOptions.defaults,
        userInput: {value: 0},
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
        this.props.handleUserInput({value: selected});
    };

    /**
     * TODO: remove this when everything is pulling from Renderer state
     * @deprecated get user input from Renderer state
     */
    getUserInput(): PerseusDropdownUserInput {
        return this.props.userInput;
    }

    getPromptJSON(): DropdownPromptJSON {
        return _getPromptJSON(this.props, this.getUserInput());
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState/restoreSerializedState
     */
    getSerializedState(): any {
        return {
            choices: this.props.choices,
            placeholder: this.props.placeholder,
            selected: this.props.userInput.value,
        };
    }

    render(): React.ReactNode {
        const children = [
            <OptionItem
                key="placeholder"
                value="0"
                disabled
                label={
                    <Renderer
                        content={this.props.placeholder}
                        strings={this.context.strings}
                    />
                }
                labelAsText={this.props.placeholder}
            />,
            ...this.props.choices.map((choice, i) => (
                <OptionItem
                    key={String(i + 1)}
                    value={String(i + 1)}
                    label={
                        <Renderer
                            content={choice}
                            strings={this.context.strings}
                        />
                    }
                    labelAsText={choice}
                />
            )),
        ];

        return (
            <Id>
                {(dropdownId) => (
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
                            <LabelLarge tag="label" htmlFor={dropdownId}>
                                {this.props.visibleLabel}
                            </LabelLarge>
                        )}
                        <SingleSelect
                            id={dropdownId}
                            placeholder=""
                            className="perseus-dropdown"
                            onChange={(value) =>
                                this._handleChange(parseInt(value))
                            }
                            selectedValue={String(this.props.userInput.value)}
                            disabled={this.props.apiOptions.readOnly}
                            aria-label={
                                this.props.ariaLabel ||
                                this.props.visibleLabel ||
                                this.context.strings.selectAnAnswer
                            }
                            showOpenerLabelAsText={false}
                        >
                            {children}
                        </SingleSelect>
                    </View>
                )}
            </Id>
        );
    }
}

function transform(widgetOptions: DropdownPublicWidgetOptions): RenderProps {
    return {
        placeholder: widgetOptions.placeholder,
        visibleLabel: widgetOptions.visibleLabel,
        ariaLabel: widgetOptions.ariaLabel,
        choices: widgetOptions.choices.map((choice) => choice.content),
    };
}

export default {
    name: "dropdown",
    displayName: "Drop down",
    widget: Dropdown,
    transform,
} satisfies WidgetExports<typeof Dropdown>;
