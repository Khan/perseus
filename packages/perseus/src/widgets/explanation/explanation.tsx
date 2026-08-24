import Button from "@khanacademy/wonder-blocks-button";
import {useOnMountEffect, View} from "@khanacademy/wonder-blocks-core";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import caretUp from "@phosphor-icons/core/regular/caret-up.svg";
import * as React from "react";
import {forwardRef, useId, useImperativeHandle, useState} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import {useDependencies} from "../../dependencies";
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

function mediaQueryIsMatched(mediaQuery: string): boolean {
    if (typeof window.matchMedia !== "function") {
        return false;
    }
    return window.matchMedia(mediaQuery).matches;
}

const Explanation = forwardRef<Widget, Props>(function Explanation(props, ref) {
    const {strings} = usePerseusI18n();
    const dependencies = useDependencies();
    const [expanded, setExpanded] = useState(false);
    const contentId = useId();

    const {hidePrompt, showPrompt, explanation, widgets} = props.options;

    useOnMountEffect(() => {
        dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "explanation",
                widgetId: props.widgetId,
            },
        });
    });

    useImperativeHandle(ref, () => ({
        getPromptJSON(): ExplanationPromptJSON {
            return _getPromptJSON(props);
        },
    }));

    function onClick() {
        setExpanded(!expanded);
        props.trackInteraction();
    }

    // TODO (LEMS-3815): Remove legacy styles
    const legacyContentStyling = [
        stylesLegacy.content,
        expanded ? stylesLegacy.contentExpanded : stylesLegacy.contentCollapsed,
        mediaQueryIsMatched("(prefers-reduced-motion: no-preference)") &&
            (expanded
                ? stylesLegacy.transitionExpanded
                : stylesLegacy.transitionCollapsed),
    ];

    const contentClasses = [
        styles.content,
        expanded ? styles.contentExpanded : styles.contentCollapsed,
        expanded ? styles.transitionExpanded : styles.transitionCollapsed,
    ];

    return (
        <>
            <Button
                aria-expanded={expanded}
                aria-controls={contentId}
                endIcon={expanded ? caretUp : caretDown}
                kind="tertiary"
                labelStyle={stylesLegacy.labelStyle}
                onClick={onClick}
                size="small"
                style={stylesLegacy.buttonStyleOverrides}
            >
                {expanded ? hidePrompt : showPrompt}
            </Button>

            <View
                id={contentId}
                style={legacyContentStyling}
                className={contentClasses.join(" ")}
                aria-hidden={!expanded}
                testId="content-container"
            >
                <View
                    className={styles.contentWrapper}
                    style={stylesLegacy.contentWrapper}
                >
                    <UserInputManager widgets={widgets} problemNum={0}>
                        {({
                            userInput,
                            handleUserInput,
                            initializeUserInput,
                        }) => {
                            return (
                                <Renderer
                                    apiOptions={props.apiOptions}
                                    content={explanation}
                                    widgets={widgets}
                                    linterContext={props.linterContext}
                                    strings={strings}
                                    userInput={userInput}
                                    handleUserInput={handleUserInput}
                                    initializeUserInput={initializeUserInput}
                                />
                            );
                        }}
                    </UserInputManager>
                </View>
            </View>
        </>
    );
});

export default {
    name: "explanation",
    displayName: "Explanation",
    widget: Explanation,
    isLintable: true,
} satisfies WidgetExports<typeof Explanation>;
