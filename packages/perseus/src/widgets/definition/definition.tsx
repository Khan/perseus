import Clickable from "@khanacademy/wonder-blocks-clickable";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {color} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import {DefinitionConsumer} from "../../definition-context";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/definition/definition-ai-utils";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {DefinitionPromptJSON} from "../../widget-ai-utils/definition/definition-ai-utils";
import type {
    PerseusRenderer,
    PerseusDefinitionWidgetOptions,
} from "@khanacademy/perseus-core";

type RenderProps = PerseusDefinitionWidgetOptions;

type DefinitionProps = WidgetProps<RenderProps> & {
    widgets: PerseusRenderer["widgets"];
};

type DefaultProps = {
    togglePrompt: string;
    definition: string;
};

class Definition extends React.Component<DefinitionProps> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        togglePrompt: "define me",
        definition: "definition goes here",
    };

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    getPromptJSON(): DefinitionPromptJSON {
        return _getPromptJSON(this.props);
    }

    render(): React.ReactNode {
        return (
            <DefinitionConsumer>
                {({activeDefinitionId, setActiveDefinitionId}) => (
                    <Popover
                        content={
                            <PopoverContentCore
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
    widget: Definition,
} satisfies WidgetExports<typeof Definition>;
