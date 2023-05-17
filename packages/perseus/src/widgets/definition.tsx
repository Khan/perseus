import Clickable from "@khanacademy/wonder-blocks-clickable";
import Color from "@khanacademy/wonder-blocks-color";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import * as React from "react";

import {DefinitionConsumer} from "../definition-context";
import Renderer from "../renderer";

import type {
    PerseusRenderer,
    PerseusDefinitionWidgetOptions,
} from "../perseus-types";
import type {PerseusScore, WidgetExports, WidgetProps} from "../types";

// TODO(FEI-5054): Figure out how to get global .d.ts files working with monorepos
type Empty = Record<never, never>;

type RenderProps = PerseusDefinitionWidgetOptions;

type Rubric = PerseusDefinitionWidgetOptions;

type UserInput = Empty;

type DefinitionProps = WidgetProps<RenderProps, Rubric> & {
    widgets: PerseusRenderer["widgets"];
};

type DefaultProps = {
    togglePrompt: string;
    definition: string;
};

class Definition extends React.Component<DefinitionProps> {
    static defaultProps: DefaultProps = {
        togglePrompt: "define me",
        definition: "definition goes here",
    };

    static validate(userInput: UserInput, rubric: Rubric): PerseusScore {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }

    getUserInput: () => UserInput = () => {
        return {};
    };

    simpleValidate: (arg1: Rubric) => PerseusScore = (rubric) => {
        return Definition.validate(this.getUserInput(), rubric);
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
                                        color: Color.blue,
                                        borderBottom:
                                            hovered || focused || pressed
                                                ? `2px solid ${Color.blue}`
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
        color: Color.offBlack,
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
} as WidgetExports<typeof Definition>;
