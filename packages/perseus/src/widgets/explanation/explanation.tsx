import {linterContextDefault} from "@khanacademy/perseus-linter";
import Button from "@khanacademy/wonder-blocks-button";
import {Id, View} from "@khanacademy/wonder-blocks-core";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretUp from "@phosphor-icons/core/regular/caret-up.svg";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import {withDependencies} from "../../components/with-dependencies";
import Renderer from "../../renderer";
import UserInputManager from "../../user-input-manager";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/explanation/explanation-ai-utils";

import styles from "./explanation.module.css";
import stylesLegacy from "./explanation_legacy-styles";

import type {
    PerseusDependenciesV2,
    Widget,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {ExplanationPromptJSON} from "../../widget-ai-utils/explanation/explanation-ai-utils";
import type {PerseusExplanationWidgetOptions} from "@khanacademy/perseus-core";

type Props = WidgetProps<PerseusExplanationWidgetOptions> & {
    dependencies: PerseusDependenciesV2;
};

type DefaultProps = {
    showPrompt: Props["showPrompt"];
    hidePrompt: Props["hidePrompt"];
    explanation: Props["explanation"];
    widgets: Props["widgets"];
    linterContext: Props["linterContext"];
};

type State = {
    expanded: boolean;
};

class Explanation extends React.Component<Props, State> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        showPrompt: "Explain",
        hidePrompt: "Hide explanation",
        explanation: "explanation goes here\n\nmore explanation",
        widgets: {},
        linterContext: linterContextDefault,
    };

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    state: State = {
        expanded: false,
    };

    componentDidMount() {
        this.props.dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "explanation",
                widgetId: this.props.widgetId,
            },
        });
    }

    _onClick: () => void = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
        this.props.trackInteraction();
    };

    getPromptJSON(): ExplanationPromptJSON {
        return _getPromptJSON(this.props);
    }

    render(): React.ReactNode {
        const promptText = this.state.expanded
            ? this.props.hidePrompt
            : this.props.showPrompt;

        const caretIcon = this.state.expanded ? caretUp : caretDown;

        // TODO (LEMS-3815): Remove legacy styles
        const legacyContentStyling = [
            stylesLegacy.content,
            this.state.expanded
                ? stylesLegacy.contentExpanded
                : stylesLegacy.contentCollapsed,
            this.state.expanded
                ? stylesLegacy.transitionExpanded
                : stylesLegacy.transitionCollapsed,
        ];

        const contentClasses = [
            styles.content,
            this.state.expanded
                ? styles.contentExpanded
                : styles.contentCollapsed,
            this.state.expanded
                ? styles.transitionExpanded
                : styles.transitionCollapsed,
        ];

        return (
            <Id>
                {(contentId) => (
                    <>
                        <Button
                            aria-expanded={this.state.expanded}
                            aria-controls={contentId}
                            endIcon={caretIcon}
                            kind="tertiary"
                            labelStyle={stylesLegacy.labelStyle}
                            onClick={this._onClick}
                            size="small"
                            style={stylesLegacy.buttonStyleOverrides}
                        >
                            {promptText}
                        </Button>

                        <View
                            id={contentId}
                            style={legacyContentStyling}
                            className={contentClasses.join(" ")}
                            aria-hidden={!this.state.expanded}
                            testId="content-container"
                        >
                            <View
                                className={styles.contentWrapper}
                                style={stylesLegacy.contentWrapper}
                            >
                                <UserInputManager
                                    widgets={this.props.widgets}
                                    problemNum={0}
                                >
                                    {({
                                        userInput,
                                        handleUserInput,
                                        initializeUserInput,
                                    }) => {
                                        return (
                                            <Renderer
                                                apiOptions={
                                                    this.props.apiOptions
                                                }
                                                content={this.props.explanation}
                                                widgets={this.props.widgets}
                                                linterContext={
                                                    this.props.linterContext
                                                }
                                                strings={this.context.strings}
                                                userInput={userInput}
                                                handleUserInput={
                                                    handleUserInput
                                                }
                                                initializeUserInput={
                                                    initializeUserInput
                                                }
                                            />
                                        );
                                    }}
                                </UserInputManager>
                            </View>
                        </View>
                    </>
                )}
            </Id>
        );
    }
}

const WrappedExplanation = withDependencies(Explanation);

export default {
    name: "explanation",
    displayName: "Explanation",
    widget: WrappedExplanation,
    isLintable: true,
} satisfies WidgetExports<typeof WrappedExplanation>;
