// @flow

import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import * as React from "react";

import Renderer from "../renderer.jsx";

import type {
    PerseusRenderer,
    PerseusDefinitionWidgetOptions,
} from "../perseus-types.js";
import type {PerseusScore, WidgetExports, WidgetProps} from "../types.js";

type RenderProps = PerseusDefinitionWidgetOptions;

type Rubric = PerseusDefinitionWidgetOptions;

type UserInput = Empty;

type DefinitionProps = {|
    ...WidgetProps<RenderProps, Rubric>,
    widgets: PerseusRenderer["widgets"],
|};

class Definition extends React.Component<DefinitionProps> {
    static defaultProps: $FlowFixMe = {
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

    simpleValidate: (Rubric) => PerseusScore = (rubric) => {
        return Definition.validate(this.getUserInput(), rubric);
    };

    render(): React.Node {
        return (
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
                placement="top"
            >
                {({open}) => (
                    <span className="perseus-widget-definition">
                        <Button
                            kind="tertiary"
                            onClick={() => {
                                this.props.trackInteraction();
                                open();
                            }}
                        >
                            {this.props.togglePrompt}
                        </Button>
                    </span>
                )}
            </Popover>
        );
    }
}

const styles = {
    tooltipBody: {
        color: Color.offBlack,
        display: "block",
        fontSize: 20,
        fontWeight: 500,
        lineHeight: "30px",
        margin: Spacing.xSmall_8,
    },
};

export default ({
    name: "definition",
    displayName: "Definition",
    accessible: true,
    defaultAlignment: "inline",
    widget: Definition,
    transform: (x: any) => x,
}: WidgetExports<typeof Definition>);
