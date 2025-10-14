import {EditorJsonify, Util} from "@khanacademy/perseus";
import {labelImageLogic} from "@khanacademy/perseus-core";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import FormWrappedTextField from "../../components/form-wrapped-text-field";

import AnswerChoices from "./answer-choices";
import Behavior from "./behavior";
import QuestionMarkers from "./question-markers";
import SelectImage from "./select-image";

import type {PreferredPopoverDirection} from "./behavior";
import type {APIOptions} from "@khanacademy/perseus";
import type {
    PerseusLabelImageWidgetOptions,
    LabelImageDefaultWidgetOptions,
} from "@khanacademy/perseus-core";

type Props = {
    apiOptions: APIOptions;
    // List of answer choices to label question image with.
    choices: string[];
    // The question image properties.
    imageAlt: string;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
    // The list of label markers on the question image.
    markers: PerseusLabelImageWidgetOptions["markers"];
    // Whether multiple answer choices may be selected for markers.
    multipleAnswers: boolean;
    // Whether to hide answer choices from user instructions.
    hideChoicesFromInstructions: boolean;
    // Callback for when a widget prop is changed.
    onChange: (options: any) => void;
    // Whether the editor is disabled.
    editingDisabled: boolean;
    preferredPopoverDirection: PreferredPopoverDirection;
};

// JSDoc will be shown in Storybook widget editor description
/**
 * Direct image labeling widget editor.
 *
 * Label on image widget enables creating more natural, conceptual questions
 * that involve the use of images, and enable learners to demonstrate their
 * knowledge by directly interacting with the image.
 */
class LabelImageEditor extends React.Component<Props> {
    _questionMarkers: QuestionMarkers | null | undefined;

    static defaultProps: LabelImageDefaultWidgetOptions =
        labelImageLogic.defaultWidgetOptions;

    static widgetName = "label-image" as const;

    componentDidUpdate(prevProps: Props) {
        const coordsToMarkers: Record<string, any> = {};

        prevProps.markers.forEach(
            (marker) => (coordsToMarkers[`${marker.x}.${marker.y}`] = marker),
        );

        // Find the newly added marker indices.
        const newIndices = this.props.markers
            .map((marker, index) =>
                // eslint-disable-next-line no-prototype-builtins
                coordsToMarkers.hasOwnProperty(`${marker.x}.${marker.y}`)
                    ? -1
                    : index,
            )
            .filter((index) => index !== -1);

        // Automatically reveal their dropdowns as a prompt to the content
        // creator to select answers and set the ARIA label.
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (newIndices.length && this._questionMarkers) {
            this._questionMarkers.openDropdownForMarkerIndices(newIndices);
        }
    }

    getSaveWarnings: () => ReadonlyArray<any | string> = () => {
        const {choices, imageAlt, imageUrl, markers} = this.props;

        const warnings: Array<string> = [];

        if (choices.length < 2) {
            warnings.push("Question requires at least two answer choices");
        }

        if (!imageUrl) {
            warnings.push("Image is not specified for question");
        } else if (!imageAlt) {
            warnings.push("Question image has no alt text");
        }

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!markers.length) {
            warnings.push("Question has no markers, to label answers on image");
        } else {
            let numNoAnswers = 0;
            let numNoLabels = 0;

            for (const marker of markers) {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (!marker.answers.length) {
                    numNoAnswers++;
                }

                if (!marker.label) {
                    numNoLabels++;
                }
            }

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (numNoAnswers) {
                warnings.push(
                    `Question has ${numNoAnswers} markers with no ` +
                        "answers selected",
                );
            }

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (numNoLabels) {
                warnings.push(
                    `Question has ${numNoLabels} markers with no ` +
                        "ARIA label",
                );
            }
        }

        return warnings;
    };

    serialize(): any {
        return EditorJsonify.serialize.call(this);
    }

    handleImageChange: (url: string) => void = (url: string) => {
        this.props.onChange({
            imageUrl: url,
            // Initially reset image size when URL is changed so it can be later
            // measured.
            imageWidth: 0,
            imageHeight: 0,
        });

        if (url) {
            Util.getImageSize(url, (width, height) => {
                this.props.onChange({
                    /**
                     * Sending `imageUrl` up again
                     * (even though we did so at the beginning of handleImageChange)
                     * because we ran into a race condition (LEMS-2583) where
                     * `imageUrl` was getting set to an empty string if measuring
                     * happened too fast.
                     */
                    imageUrl: url,
                    imageWidth: width,
                    imageHeight: height,
                });
            });
        }
    };

    handleAltChange: (alt: string) => void = (alt: string) => {
        this.props.onChange({imageAlt: alt});
    };

    handleChoicesChange: (choices: ReadonlyArray<string>) => void = (
        choices: ReadonlyArray<string>,
    ) => {
        this.props.onChange({choices});
    };

    handleMarkersChange: (
        markers: PerseusLabelImageWidgetOptions["markers"],
    ) => void = (markers: PerseusLabelImageWidgetOptions["markers"]) => {
        this.props.onChange({markers});
    };

    handleBehaviorChange: (options?: any) => void = (options: any) => {
        this.props.onChange(options);
    };

    render(): React.ReactNode {
        const {
            choices,
            imageAlt,
            imageUrl,
            imageWidth,
            imageHeight,
            markers,
            multipleAnswers,
            hideChoicesFromInstructions,
            preferredPopoverDirection,
        } = this.props;

        const imageSelected = imageUrl && imageWidth > 0 && imageHeight > 0;

        return (
            <div>
                <SelectImage onChange={this.handleImageChange} url={imageUrl} />

                <div className={css(styles.smallSpacer)} />

                {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
                {imageSelected && (
                    <FormWrappedTextField
                        placeholder="Alt text (for screen readers)"
                        onChange={(e) => this.handleAltChange(e.target.value)}
                        value={imageAlt}
                        width="100%"
                    />
                )}

                <div className={css(styles.largeSpacer)} />

                <QuestionMarkers
                    choices={choices}
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    imageUrl={imageSelected ? imageUrl : ""}
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                    markers={markers}
                    onChange={this.handleMarkersChange}
                    ref={(node) => (this._questionMarkers = node)}
                />

                <div className={css(styles.largeSpacer)} />

                <AnswerChoices
                    choices={choices}
                    editingDisabled={
                        this.props.apiOptions?.editingDisabled ?? false
                    }
                    onChange={this.handleChoicesChange}
                />

                <div className={css(styles.largeSpacer)} />

                <Behavior
                    preferredPopoverDirection={preferredPopoverDirection}
                    multipleAnswers={multipleAnswers}
                    hideChoicesFromInstructions={hideChoicesFromInstructions}
                    onChange={this.handleBehaviorChange}
                />
            </div>
        );
    }
}

const styles = StyleSheet.create({
    largeSpacer: {
        height: 32,
    },

    smallSpacer: {
        height: 16,
    },
});

export default LabelImageEditor;
