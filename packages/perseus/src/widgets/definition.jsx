// @flow

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Tooltip from "@khanacademy/wonder-blocks-tooltip";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import {ApiOptions} from "../perseus-api.jsx";
import Renderer from "../renderer.jsx";

import type {
    PerseusRenderer,
    PerseusDefinitionWidgetOptions,
} from "../perseus-types.js";
import type {
    APIOptionsWithDefaults,
    PerseusScore,
    WidgetExports,
    WidgetProps,
} from "../types.js";

type DefinitionContentProps = {|
    apiOptions: APIOptionsWithDefaults,
    content: string,
    trackInteraction: () => mixed,
    widgets: PerseusRenderer["widgets"],
|};

class DefinitionContent extends React.Component<DefinitionContentProps> {
    static propTypes = {
        apiOptions: ApiOptions.propTypes,
        content: PropTypes.string,
        trackInteraction: PropTypes.func.isRequired,
        widgets: PropTypes.objectOf(PropTypes.any),
    };

    componentDidMount() {
        this.props.trackInteraction();
    }

    render(): React.Node {
        return (
            <View style={styles.tooltipBody}>
                <Renderer
                    apiOptions={this.props.apiOptions}
                    content={this.props.content}
                    widgets={this.props.widgets}
                />
            </View>
        );
    }
}

type RenderProps = PerseusDefinitionWidgetOptions; // transform = _.identity

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
        const content = (
            <DefinitionContent
                apiOptions={this.props.apiOptions}
                content={this.props.definition}
                key={this.props.definition}
                trackInteraction={this.props.trackInteraction}
                widgets={this.props.widgets}
            />
        );

        return (
            // $FlowFixMe[incompatible-type]: content prop
            <Tooltip content={content} placement="top">
                <span className="perseus-widget-definition">
                    <View style={styles.definitionLink}>
                        {this.props.togglePrompt}
                    </View>
                </span>
            </Tooltip>
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

    definitionLink: {
        borderBottom: `dashed 1px ${Color.blue}`,
        color: Color.blue,
        cursor: "pointer",
        display: "inline-block",
        textDecoration: "none",
    },
};

export default ({
    name: "definition",
    displayName: "Definition",
    accessible: true,
    defaultAlignment: "inline",
    widget: Definition,
    transform: _.identity,
}: WidgetExports<typeof Definition>);
