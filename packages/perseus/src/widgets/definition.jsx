// @flow

import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
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

type DefintionState = {|
    popoverOpen: boolean,
|};

class Definition extends React.Component<DefinitionProps, DefintionState> {
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

    constructor(props: DefinitionProps) {
        super(props);
        this.state = {popoverOpen: false};
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
                opened={this.state.popoverOpen}
                onClose={() => {
                    this.setState({popoverOpen: false});
                }}
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
                            size="small"
                            kind="tertiary"
                            onClick={() => {
                                this.props.trackInteraction();
                                this.setState({popoverOpen: true});
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
        fontSize: 20,
        fontWeight: 500,
        lineHeight: "30px",
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
