import {Util} from "@khanacademy/perseus";
import {labelImageLogic} from "@khanacademy/perseus-core";
import * as React from "react";

import FormWrappedTextField from "../../components/form-wrapped-text-field";
import EditorJsonify from "../../mixins/editor-jsonify";

import AnswerChoices from "./answer-choices";
import Behavior from "./behavior";
import styles from "./label-image-editor.module.css";
import QuestionMarkers from "./question-markers";
import SelectImage from "./select-image";

import type {WidgetEditorRefHandle} from "../types";
import type {APIOptions} from "@khanacademy/perseus";
import type {PerseusLabelImageWidgetOptions} from "@khanacademy/perseus-core";

export interface Props extends PerseusLabelImageWidgetOptions {
    apiOptions: APIOptions;
    onChange: (options: PerseusLabelImageWidgetOptions) => void;
}

// JSDoc will be shown in Storybook widget editor description
/**
 * Direct image labeling widget editor.
 *
 * Label on image widget enables creating more natural, conceptual questions
 * that involve the use of images, and enable learners to demonstrate their
 * knowledge by directly interacting with the image.
 */
class LabelImageEditor
    extends React.Component<Props>
    implements WidgetEditorRefHandle
{
    private _questionMarkers: QuestionMarkers | null | undefined;

    static defaultProps: PerseusLabelImageWidgetOptions =
        labelImageLogic.defaultWidgetOptions;

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

    handleChange(changes: Partial<PerseusLabelImageWidgetOptions>) {
        this.props.onChange({
            choices: this.props.choices,
            imageUrl: this.props.imageUrl,
            imageAlt: this.props.imageAlt,
            imageHeight: this.props.imageHeight,
            imageWidth: this.props.imageWidth,
            markers: this.props.markers,
            hideChoicesFromInstructions: this.props.hideChoicesFromInstructions,
            multipleAnswers: this.props.multipleAnswers,
            preferredPopoverDirection: this.props.preferredPopoverDirection,
            ...changes,
        });
    }

    // TODO(LEMS-3643): Remove `getSaveWarnings` once the frontend uses
    // the new linter rules for save warnings.
    getSaveWarnings(): string[] {
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
    }

    serialize(): any {
        return EditorJsonify.serialize.call(this);
    }

    handleImageChange = (url: string) => {
        this.handleChange({
            imageUrl: url,
            // Initially reset image size when URL is changed so it can be later
            // measured.
            imageWidth: 0,
            imageHeight: 0,
        });

        if (url) {
            Util.getImageSize(url, (width, height) => {
                // Prevent unnecessary updates if values haven't changed
                // This helps prevent infinite loops
                if (
                    this.props.imageUrl === url &&
                    this.props.imageWidth === width &&
                    this.props.imageHeight === height
                ) {
                    return;
                }

                this.handleChange({
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
        this.handleChange({imageAlt: alt});
    };

    handleChoicesChange = (choices: string[]) => {
        this.handleChange({choices});
    };

    handleMarkersChange: (
        markers: PerseusLabelImageWidgetOptions["markers"],
    ) => void = (markers: PerseusLabelImageWidgetOptions["markers"]) => {
        this.handleChange({markers});
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

        const editingDisabled = this.props.apiOptions?.editingDisabled ?? false;

        const imageSelected = imageUrl && imageWidth > 0 && imageHeight > 0;

        return (
            <div className={styles.editor}>
                <SelectImage
                    onChange={this.handleImageChange}
                    url={imageUrl}
                    editingDisabled={editingDisabled}
                />

                {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
                {imageSelected && (
                    <FormWrappedTextField
                        placeholder="Alt text (for screen readers)"
                        onChange={(e) => this.handleAltChange(e.target.value)}
                        value={imageAlt}
                        width="100%"
                    />
                )}

                <QuestionMarkers
                    editingDisabled={editingDisabled}
                    choices={choices}
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    imageUrl={imageSelected ? imageUrl : ""}
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                    markers={markers}
                    onChange={this.handleMarkersChange}
                    ref={(node) => (this._questionMarkers = node)}
                />

                <AnswerChoices
                    choices={choices}
                    editingDisabled={editingDisabled}
                    onChange={this.handleChoicesChange}
                />

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

export default LabelImageEditor;
