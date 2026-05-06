import type labelImage from "../../widgets/label-image/label-image";
import type React from "react";

/**
 * A marker placed on the image, representing a location the learner must
 * label. Used in the `options` section to describe the marker's identity and
 * correct answers.
 */
type BaseMarker = {
    /**
     * The text label identifying this marker's position on the image. Not
     * shown directly to the learner; used to correlate options markers with
     * user input markers.
     */
    label: string;
};

/**
 * A marker as it appears in the user input section. Extends the base marker
 * with optional correct answers (when present) and the learner's current
 * selections.
 */
type UserInputMarker = {
    /**
     * The text label identifying this marker's position on the image.
     * Corresponds to the matching marker in `options.markers`.
     */
    label: string;

    /**
     * The set of correct answer labels for this marker, as defined by the
     * content creator. Only present when the marker has designated correct
     * answers. A marker without answers is used purely for labeling purposes
     * and is not scored.
     */
    // TODO(LEMS-4033): `answers` is not part of the user input. It should be
    // moved to `options`.
    answers?: string[];

    /**
     * The answer labels the learner has selected for this marker. Each entry
     * is one of the strings from `options.choices`. May be absent or empty if
     * the learner has not yet made a selection for this marker.
     */
    selected?: ReadonlyArray<string>;
};

/**
 * JSON describing a label-image widget. Intended for consumption by AI tools.
 * A label-image widget displays an image with interactive markers placed at
 * specific locations. The learner selects one or more answer labels from a
 * shared list of choices for each marker.
 */
export type LabelImagePromptJSON = {
    type: "label-image";

    /**
     * The configuration of the widget, set by the content creator.
     */
    options: {
        /**
         * The list of answer choices available to the learner. Each marker's
         * selection must come from this list.
         */
        choices: ReadonlyArray<string>;

        /**
         * The URL of the image on which markers are placed.
         */
        imageUrl: string;

        /**
         * Accessible alternative text for the image, used in the `alt`
         * attribute.
         */
        imageAlt: string;

        /**
         * The markers placed on the image by the content creator, each
         * identifying a location the learner must label.
         */
        markers: BaseMarker[];
    };

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /**
         * The learner's selections for each marker, parallel to
         * `options.markers`. Each element corresponds to the marker at the
         * same index.
         */
        markers: UserInputMarker[];
    };
};

export const getPromptJSON = (
    widgetData: React.ComponentProps<typeof labelImage.widget>,
): LabelImagePromptJSON => {
    const propMarkers = widgetData.markers.map((marker) => {
        const userInputMarker: UserInputMarker = {
            label: marker.label,
        };
        if (marker.answers?.length) {
            userInputMarker.answers = marker.answers;
        }
        return userInputMarker;
    });

    const inputMarkers = widgetData.userInput.markers.map((marker) => {
        return {
            label: marker.label,
            selected: marker.selected,
        };
    });

    return {
        type: "label-image",
        options: {
            choices: widgetData.choices,
            imageUrl: widgetData.imageUrl,
            imageAlt: widgetData.imageAlt,
            markers: propMarkers,
        },
        userInput: {
            markers: inputMarkers,
        },
    };
};
