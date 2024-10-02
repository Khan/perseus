import Clickable from "@khanacademy/wonder-blocks-clickable";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {color} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import {DefinitionConsumer} from "../../definition-context";
import Renderer from "../../renderer";
import noopValidator from "../__shared__/noop-validator";

import type {
    PerseusRenderer,
    PerseusDefinitionWidgetOptions,
} from "../../perseus-types";
import type {WidgetExports, WidgetProps} from "../../types";
import type {PerseusDefinitionRubric} from "../../validation.types";

type RenderProps = PerseusDefinitionWidgetOptions;

type DefinitionProps = WidgetProps<RenderProps, PerseusDefinitionRubric> & {
    widgets: PerseusRenderer["widgets"];
};

type DefaultProps = {
    togglePrompt: string;
    definition: string;
};

class Definition extends React.Component<DefinitionProps> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        togglePrompt: "define me",
        definition: "definition goes here",
    };

    render(): React.ReactNode {
        return (
            <DefinitionConsumer>
                {({activeDefinitionId, setActiveDefinitionId}) => (
                    <Popover
                        content={
                            <PopoverContentCore
                                color="white"
                                style={styles.tooltipBody}
                                closeButtonVisible={true}
                            >
                                <Renderer
                                    apiOptions={this.props.apiOptions}
                                    content={this.props.definition}
                                    widgets={this.props.widgets}
                                    strings={this.context.strings}
                                />
                            </PopoverContentCore>
                        }
                        opened={activeDefinitionId === this.props.widgetId}
                        onClose={() => setActiveDefinitionId(null)}
                        placement="top"
                    >
                        <Clickable
                            onClick={() => {
                                this.props.trackInteraction();
                                setActiveDefinitionId(this.props.widgetId);
                            }}
                        >
                            {({hovered, focused, pressed}) => (
                                <span
                                    style={{
                                        color: color.blue,
                                        borderBottom:
                                            hovered || focused || pressed
                                                ? `2px solid ${color.blue}`
                                                : "none",
                                    }}
                                >
                                    {this.props.togglePrompt}
                                </span>
                            )}
                        </Clickable>
                    </Popover>
                )}
            </DefinitionConsumer>
        );
    }
}

const styles = {
    tooltipBody: {
        color: color.offBlack,
        fontSize: 20,
        fontWeight: 500,
        lineHeight: "30px",
    },
} as const;

export default {
    name: "definition",
    displayName: "Definition",
    accessible: true,
    defaultAlignment: "inline",
    widget: Definition,
    transform: (x: any) => x,
    // TODO: things that aren't interactive shouldn't need validators
    validator: noopValidator,
} as WidgetExports<typeof Definition>;
