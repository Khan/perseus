/**
 * Group widget (different than GradedGroup and GradedGroupSet)
 * is a widget that was specifically made for old SAT content
 * and no longer seems to be needed.
 * There's some question to whether we want to keep it
 * to let content creators access old content that is no longer
 * learner-facing, but new content cannot be made with Group.
 */

import {isFeatureOn} from "@khanacademy/perseus-core";
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
    groupRef = React.createRef<HTMLDivElement>();

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

        // Reorder image widgets for float wrapping behavior
        // Use setTimeout to ensure DOM is fully rendered before reordering
        setTimeout(() => {
            this.reorderImageWidgetsForViewport();
        }, 0);
    }

    componentDidUpdate(prevProps: Props) {
        // Reorder if mobile state changes
        if (prevProps.apiOptions.isMobile !== this.props.apiOptions.isMobile) {
            this.reorderImageWidgetsForViewport();
        }
    }

    /**
     * Reorders image widgets within the group to enable proper float wrapping.
     * On desktop: Moves wrapped images to the beginning for text to wrap around them.
     * On mobile: Moves images to the end to appear after content.
     */
    reorderImageWidgetsForViewport = () => {
        const imageUpgradeFF = isFeatureOn(
            {apiOptions: this.props.apiOptions},
            "image-widget-upgrade",
        );

        if (!imageUpgradeFF) {
            return;
        }

        const groupElement = this.groupRef.current;
        if (!groupElement) {
            return;
        }

        // Find the renderer inside the group (direct child)
        const rendererElement =
            groupElement.querySelector<HTMLElement>(".perseus-renderer");
        if (!rendererElement) {
            return;
        }

        // Determine if mobile by checking both apiOptions and CSS class
        // The .perseus-mobile class is automatically added by the framework
        const isMobileFromProps = this.props.apiOptions.isMobile;
        const isMobileFromCSS =
            groupElement.closest(".perseus-mobile") !== null;
        const isMobile = isMobileFromProps ?? isMobileFromCSS;

        // Find all wrapped image widgets (handles nested paragraph structures)
        const wrappedImageWidgets = Array.from(
            rendererElement.querySelectorAll<HTMLElement>(
                ".perseus-widget-container.widget-wrap-left, " +
                    ".perseus-widget-container.widget-wrap-right",
            ),
        );

        wrappedImageWidgets.forEach((widget) => {
            // Find the top-level paragraph within the renderer that contains this widget
            // This is the paragraph with data-perseus-paragraph-index
            let currentElement: HTMLElement | null = widget;
            let topLevelParagraph: HTMLElement | null = null;

            while (currentElement && currentElement !== rendererElement) {
                if (
                    currentElement.classList.contains("paragraph") &&
                    currentElement.hasAttribute("data-perseus-paragraph-index")
                ) {
                    topLevelParagraph = currentElement;
                    break;
                }
                currentElement = currentElement.parentElement;
            }

            if (!topLevelParagraph) {
                return;
            }

            if (isMobile) {
                // Mobile: Move image paragraph to end of renderer
                // Only move if it's not already the last child
                if (rendererElement.lastChild !== topLevelParagraph) {
                    rendererElement.appendChild(topLevelParagraph);
                }
            } else {
                // Desktop: Move image paragraph to start of renderer for float wrapping
                const firstChild = rendererElement.firstChild;
                if (firstChild !== topLevelParagraph) {
                    rendererElement.insertBefore(topLevelParagraph, firstChild);
                }
            }
        });
    };

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
                ref={this.groupRef}
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
