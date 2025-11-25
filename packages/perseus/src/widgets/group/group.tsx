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
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {
    sharedInitializeUserInput,
    deriveUserInputFromSerializedState,
} from "../../user-input-manager";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/group/group-ai-utils";

import type {
    APIOptions,
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

type Props = WidgetProps<PerseusGroupWidgetOptions, PerseusGroupUserInput>;
type DefaultProps = {
    content: Props["content"];
    widgets: Props["widgets"];
    images: Props["images"];
    linterContext: Props["linterContext"];
};

class Group extends React.Component<Props> implements Widget {
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
        const apiOptions: APIOptions = {
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

        // TODO(mdr): Widgets inside this Renderer are not discoverable through
        //     the parent Renderer's `findWidgets` function.
        return (
            <div
                className={classNames({
                    "perseus-group": true,
                })}
            >
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
                    apiOptions={apiOptions}
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

export default {
    name: "group",
    displayName: "Group (Image widget only)",
    widget: Group,
    hidden: false,
    isLintable: true,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof Group>;
