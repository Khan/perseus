import * as React from "react";
import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {
    questionWithPassage,
    choicesWithImages,
    multiChoiceQuestion,
    SingleSelectOverflowContent,
    SingleSelectOverflowImageContent,
} from "../../../widgets/radio/__tests__/radio.testdata";

import styles from "./radio-states-gallery.module.css";

import type {Meta} from "@storybook/react-vite";
import type {APIOptions} from "../../../types";
import type {PerseusItem} from "@khanacademy/perseus-core";

export default {
    title: "Widgets/RadioNew/Widget States Gallery",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        viewMode: "docs",
        previewTabs: {
            canvas: {hidden: true},
        },
    },
} as Meta;

// Helper function to create RadioNew widget item with specific properties
const createRadioNewItem = (
    questionData: any,
    options: {
        static?: boolean;
        reviewMode?: boolean;
        showSolutions?: "none" | "all" | "selected";
        selected?: number[];
    } = {},
): PerseusItem => {
    const item = generateTestPerseusItem({
        question: questionData,
    });

    const widgetKeys = Object.keys(item.question.widgets);
    const updatedItem = {
        ...item,
        question: {
            ...item.question,
            widgets: {},
        },
        apiOptions: {
            flags: {
                "new-radio-widget": true,
            },
        },
    };

    for (const widgetId of widgetKeys) {
        const widget = item.question.widgets[widgetId];
        updatedItem.question.widgets[widgetId] = {
            ...widget,
            static: options.static ?? false,
            selected: options.selected,
        };
    }

    return updatedItem;
};

// API options to enable the new radio widget
const apiOptions: APIOptions = {
    flags: {
        "new-radio-widget": true,
    },
};

export const StateGallery = () => (
    <div>
        <h1>RadioNew Widget States Gallery</h1>
        <p>
            This page showcases the various states of the RadioNew widget. Each
            state represents how the widget appears under different conditions
            and configurations.
        </p>

        <div className={styles.stateContainer}>
            <h2 className={styles.stateTitle}>Default State (Single Select)</h2>
            <div className={styles.stateDescription}>
                The default appearance of the RadioNew widget before any user
                interaction.
            </div>
            <div className={styles.stateDemo}>
                <ServerItemRendererWithDebugUI
                    item={createRadioNewItem(questionWithPassage)}
                    apiOptions={apiOptions}
                />
            </div>
        </div>

        <div className={styles.stateContainer}>
            <h2 className={styles.stateTitle}>
                Selected State (Single Select)
            </h2>
            <div className={styles.stateDescription}>
                The appearance when a user has selected an option.
            </div>
            <div className={styles.stateDemo}>
                <ServerItemRendererWithDebugUI
                    item={createRadioNewItem(questionWithPassage, {
                        selected: [0],
                    })}
                    apiOptions={apiOptions}
                />
            </div>
        </div>

        <div className={styles.stateContainer}>
            <h2 className={styles.stateTitle}>Multiple Select State</h2>
            <div className={styles.stateDescription}>
                When configured for multiple selection, the RadioNew widget
                allows users to select multiple options.
            </div>
            <div className={styles.stateDemo}>
                <ServerItemRendererWithDebugUI
                    item={createRadioNewItem(multiChoiceQuestion, {
                        selected: [0, 2],
                    })}
                    apiOptions={apiOptions}
                />
            </div>
        </div>

        <div className={styles.stateContainer}>
            <h2 className={styles.stateTitle}>Correct Answer Feedback</h2>
            <div className={styles.stateDescription}>
                After submission, the RadioNew widget shows feedback for correct
                answers.
            </div>
            <div className={styles.stateDemo}>
                <ServerItemRendererWithDebugUI
                    item={createRadioNewItem(questionWithPassage, {
                        selected: [1],
                    })}
                    apiOptions={apiOptions}
                    reviewMode={true}
                    showSolutions="all"
                />
            </div>
        </div>

        <div className={styles.stateContainer}>
            <h2 className={styles.stateTitle}>Incorrect Answer Feedback</h2>
            <div className={styles.stateDescription}>
                After submission, the RadioNew widget shows feedback for
                incorrect answers.
            </div>
            <div className={styles.stateDemo}>
                <ServerItemRendererWithDebugUI
                    item={createRadioNewItem(questionWithPassage, {
                        selected: [0],
                    })}
                    apiOptions={apiOptions}
                    reviewMode={true}
                    showSolutions="all"
                />
            </div>
        </div>

        <div className={styles.stateContainer}>
            <h2 className={styles.stateTitle}>Options with Images</h2>
            <div className={styles.stateDescription}>
                The RadioNew widget supports options that include both text and
                images.
            </div>
            <div className={styles.stateDemo}>
                <ServerItemRendererWithDebugUI
                    item={createRadioNewItem(choicesWithImages, {
                        selected: [1],
                    })}
                    apiOptions={apiOptions}
                />
            </div>
        </div>

        <div className={styles.stateContainer}>
            <h2 className={styles.stateTitle}>Static Mode (Read Only)</h2>
            <div className={styles.stateDescription}>
                When in static mode, the RadioNew widget shows options that
                cannot be interacted with.
            </div>
            <div className={styles.stateDemo}>
                <ServerItemRendererWithDebugUI
                    item={createRadioNewItem(questionWithPassage, {
                        static: true,
                        selected: [0],
                    })}
                    apiOptions={apiOptions}
                />
            </div>
        </div>

        <div className={styles.stateContainer}>
            <h2 className={styles.stateTitle}>
                Content Overflow with Scrolling
            </h2>
            <div className={styles.stateDescription}>
                When content is too large, the RadioNew widget provides
                scrolling capabilities.
            </div>
            <div className={styles.stateDemo}>
                <ServerItemRendererWithDebugUI
                    item={createRadioNewItem(SingleSelectOverflowContent, {
                        selected: [1],
                    })}
                    apiOptions={apiOptions}
                />
            </div>
        </div>

        <div className={styles.stateContainer}>
            <h2 className={styles.stateTitle}>Image Content with Scrolling</h2>
            <div className={styles.stateDescription}>
                The RadioNew widget handles large images with appropriate
                scrolling.
            </div>
            <div className={styles.stateDemo}>
                <ServerItemRendererWithDebugUI
                    item={createRadioNewItem(SingleSelectOverflowImageContent, {
                        selected: [1],
                    })}
                    apiOptions={apiOptions}
                />
            </div>
        </div>
    </div>
);
