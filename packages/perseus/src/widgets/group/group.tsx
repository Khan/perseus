import {linterContextDefault} from "@khanacademy/perseus-linter";
import classNames from "classnames";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import * as Changeable from "../../mixins/changeable";
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/group/prompt-utils";

import type {PerseusGroupWidgetOptions} from "../../perseus-types";
import type {
    APIOptions,
    ChangeFn,
    FocusPath,
    Widget,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {PerseusGroupRubric, UserInputArray} from "../../validation.types";
import type {GroupPromptJSON} from "../../widget-ai-utils/group/prompt-utils";

type RenderProps = PerseusGroupWidgetOptions; // exports has no 'transform'
type Props = WidgetProps<RenderProps, PerseusGroupRubric>;
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

    change: ChangeFn = (...args) => {
        return Changeable.change.apply(this, args);
    };

    getUserInputMap() {
        return this.rendererRef?.getUserInputMap();
    }

    /**
     * @deprecated getUserInputMap should be used for Groups
     */
    getUserInput(): UserInputArray | undefined {
        return this.rendererRef?.getUserInput();
    }

    getPromptJSON(): GroupPromptJSON {
        return _getPromptJSON(this.rendererRef?.getPromptJSON());
    }

    getSerializedState: () => any = () => {
        return this.rendererRef?.getSerializedState();
    };

    restoreSerializedState: (arg1: any, arg2: any) => null = (
        state,
        callback,
    ) => {
        this.rendererRef?.restoreSerializedState(state, callback);
        // Tell our renderer that we have no props to change
        // (all our changes were in state):
        return null;
    };

    // Mobile API:
    getInputPaths() {
        return this.rendererRef?.getInputPaths() ?? [];
    }

    setInputValue: (
        arg1: FocusPath,
        arg2: string,
        arg3: () => unknown,
    ) => void = (path, newValue, callback) => {
        return this.rendererRef?.setInputValue(path, newValue, callback);
    };

    focus() {
        return this.rendererRef?.focus() ?? false;
    }

    focusInputPath: (arg1: FocusPath) => void = (path) => {
        this.rendererRef?.focusPath(path);
    };

    blurInputPath: (arg1: FocusPath) => void = (path) => {
        this.rendererRef?.blurPath(path);
    };

    showRationalesForCurrentlySelectedChoices: () => void = () => {
        this.rendererRef?.showRationalesForCurrentlySelectedChoices();
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

        // This is a little strange because the id of the widget that actually
        // changed is going to be lost in favor of the group widget's id. The
        // widgets prop also wasn't actually changed, and this only serves to
        // alert our renderer (our parent) of the fact that some interaction
        // has occurred.
        const onInteractWithWidget = (id) => {
            if (this.rendererRef) {
                this.change("widgets", this.rendererRef.props.widgets);
            }
        };

        const score = this.rendererRef?.score();
        const isValid = score && score.type !== "invalid";
        const isInvalid = score && score.type === "invalid";

        // TODO(mdr): Widgets inside this Renderer are not discoverable through
        //     the parent Renderer's `findWidgets` function.
        return (
            <div
                className={classNames({
                    "perseus-group": true,
                    "perseus-group-valid-answer": isValid,
                    "perseus-group-invalid-answer": isInvalid,
                })}
            >
                {problemNumComponent}
                <Renderer
                    content={this.props.content}
                    widgets={this.props.widgets}
                    images={this.props.images}
                    ref={(ref) => (this.rendererRef = ref)}
                    apiOptions={apiOptions}
                    findExternalWidgets={this.props.findWidgets}
                    reviewMode={this.props.reviewMode}
                    onInteractWithWidget={onInteractWithWidget}
                    linterContext={this.props.linterContext}
                    strings={this.context.strings}
                />
                {/* @ts-expect-error - TS2339 - Property 'icon' does not exist on type 'Readonly<Props> & Readonly<{ children?: ReactNode; }>'. */}
                {this.props.icon && (
                    // @ts-expect-error - TS2339 - Property 'icon' does not exist on type 'Readonly<Props> & Readonly<{ children?: ReactNode; }>'.
                    <div className="group-icon">{this.props.icon}</div>
                )}
            </div>
        );
    }
}

const traverseChildWidgets = function (props: any, traverseRenderer: any): any {
    return {...props, ...traverseRenderer(props)};
};

export default {
    name: "group",
    displayName: "Group (SAT only)",
    widget: Group,
    traverseChildWidgets: traverseChildWidgets,
    hidden: true,
    isLintable: true,
} satisfies WidgetExports<typeof Group>;
