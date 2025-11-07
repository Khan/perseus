/**
 * Group widget (different than GradedGroup and GradedGroupSet)
 * is a widget that was specifically made for old SAT content
 * and no longer seems to be needed.
 * There's some question to whether we want to keep it
 * to let content creators access old content that is no longer
 * learner-facing, but new content cannot be made with Group.
 */

import {linterContextDefault} from "@khanacademy/perseus-linter";
import classNames from "classnames";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import withAPIOptions from "../../components/with-api-options";
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {
    sharedInitializeUserInput,
    deriveUserInputFromSerializedState,
} from "../../user-input-manager";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/group/group-ai-utils";

import type {
    APIOptions,
    APIOptionsWithDefaults,
    FocusPath,
    Widget,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {GroupPromptJSON} from "../../widget-ai-utils/group/group-ai-utils";
import type {
    PerseusGroupUserInput,
    PerseusGroupWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

type PropsWithAPIOptions = {
    apiOptions: APIOptionsWithDefaults;
};

type Props = PropsWithAPIOptions &
    WidgetProps<PerseusGroupWidgetOptions, PerseusGroupUserInput>;
type DefaultProps = {
    content: Props["content"];
    widgets: Props["widgets"];
    images: Props["images"];
    linterContext: Props["linterContext"];
};

class GroupClass extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    rendererRef: Renderer | null | undefined;

    static defaultProps: DefaultProps = {
        content: "",
        widgets: {},
        images: {},
        linterContext: linterContextDefault,
    };

    componentDidMount() {
        // TODO(marcia): See comment in render method about our cyclical
        // numbering scheme. We force another render so that we can annotate
        // the group with the correct number.
        this.forceUpdate();
    }

    getPromptJSON(): GroupPromptJSON {
        return _getPromptJSON(this.rendererRef?.getPromptJSON());
    }

    // TODO(LEMS-3185): remove serializedState
    /**
     * @deprecated - do not use in new code.
     */
    getSerializedState: () => any = () => {
        return this.rendererRef?.getSerializedState();
    };

    // Mobile API:
    getInputPaths() {
        return this.rendererRef?.getInputPaths() ?? [];
    }

    focus() {
        return this.rendererRef?.focus() ?? false;
    }

    focusInputPath: (arg1: FocusPath) => void = (path) => {
        this.rendererRef?.focusPath(path);
    };

    blurInputPath: (arg1: FocusPath) => void = (path) => {
        this.rendererRef?.blurPath(path);
    };

    render(): React.ReactNode {
        const groupAPIOptions: APIOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
            // Api Rewriting to support correct onFocus/onBlur
            // events for the mobile API
            onFocusChange: (newFocus, oldFocus) => {
                if (oldFocus) {
                    this.props.onBlur(oldFocus);
                }
                if (newFocus) {
                    this.props.onFocus(newFocus);
                }
            },
        };

        // Allow a problem number annotation to be added.
        // This is cyclical and should probably be reconsidered. In order to
        // render the annotation ("Question 3 of 10"), we call findWidgets to
        // figure out our index in the list of all fellow group widgets. On
        // first render, though, we don't exist yet in this list, and so we
        // give ourselves number -1. To combat this, we forceUpdate in
        // componentDidMount so that we can number ourselves properly. But,
        // really we should have a more unidirectional flow. TODO(marcia): fix.
        const groupWidgets: ReadonlyArray<Widget> =
            this.props.findWidgets("group");
        const number: number = groupWidgets.indexOf(this);
        const problemNumComponent = this.props.apiOptions.groupAnnotator(
            number,
            this.props.widgetId,
        );

        // TODO(mdr): Widgets inside this Renderer are not discoverable through
        //     the parent Renderer's `findWidgets` function.
        return (
            <div
                className={classNames({
                    "perseus-group": true,
                })}
            >
                {problemNumComponent}
                <Renderer
                    userInput={this.props.userInput}
                    handleUserInput={(widgetId, userInput) => {
                        this.props.handleUserInput({
                            ...this.props.userInput,
                            [widgetId]: userInput,
                        });
                    }}
                    content={this.props.content}
                    widgets={this.props.widgets}
                    images={this.props.images}
                    ref={(ref) => (this.rendererRef = ref)}
                    apiOptions={groupAPIOptions}
                    findExternalWidgets={this.props.findWidgets}
                    reviewMode={this.props.reviewMode}
                    showSolutions={this.props.showSolutions}
                    linterContext={this.props.linterContext}
                    strings={this.context.strings}
                />
            </div>
        );
    }
}

function getStartUserInput(
    options: PerseusRenderer,
    problemNum: number,
): PerseusGroupUserInput {
    return sharedInitializeUserInput(options.widgets, problemNum);
}

function getUserInputFromSerializedState(
    serializedState: unknown,
    widgetOptions: PerseusGroupWidgetOptions,
): PerseusGroupUserInput {
    return deriveUserInputFromSerializedState(
        serializedState,
        widgetOptions.widgets,
    );
}

const Group = withAPIOptions(GroupClass);

export default {
    name: "group",
    displayName: "Group (SAT only)",
    widget: Group,
    hidden: true,
    isLintable: true,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof Group>;
