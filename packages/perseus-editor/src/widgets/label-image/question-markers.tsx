/**
 * Controlled component to display question image and create markers to
 * label image with answers from list of choices.
 */

import {Util, Dependencies, globalStyles} from "@khanacademy/perseus";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import Marker from "./marker";

import type {MarkerType} from "@khanacademy/perseus";

const {colors, typography} = globalStyles;

type Props = {
    // The list of possible answers in a specific order.
    choices: ReadonlyArray<string>;
    // The question image properties.
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
    // The list of markers placed on the question image.
    markers: ReadonlyArray<MarkerType>;
    // Callback for when any of markers change.
    onChange: (markers: ReadonlyArray<MarkerType>) => void;
};

export default class QuestionMarkers extends React.Component<Props> {
    _markers: Array<Marker | null | undefined> = [];

    openDropdownForMarkerIndices(indices: ReadonlyArray<number>) {
        // Open answer selection dropdown for each of the specified markers.
        indices.forEach((index) => {
            if (this._markers[index]) {
                // @ts-expect-error - TS2533 - Object is possibly 'null' or 'undefined'.
                this._markers[index].openDropdown();
            }
        });
    }

    handleImageDoubleClick: (e: React.MouseEvent) => void = (
        e: React.MouseEvent,
    ) => {
        e.preventDefault();

        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

        // Calculate marker position on the question image as percentage offset
        // rounded to one decimal place.
        const x =
            Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10;
        const y =
            Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10;

        const {markers, onChange} = this.props;

        // Add the new marker to the end of the list.
        onChange([
            ...markers,
            {
                answers: [],
                label: "",
                x,
                y,
            },
        ]);
    };

    render(): React.ReactNode {
        const {choices, imageUrl, imageWidth, imageHeight, markers, onChange} =
            this.props;

        const staticUrl = Dependencies.getDependencies().staticUrl;

        // TODO(michaelpolyak): If a Graphie image is specified, only its SVG
        // layer will be rendered, as when rendering the full Graphie its
        // dynamic content may overflow the widget editor, CP-253
        return (
            <div>
                <div className={css(styles.title)}>Markers</div>

                <div className={css(styles.subtitle)}>
                    {imageUrl ? (
                        <span>
                            Double-click on the image to add a marker.
                            <br />
                            <br />
                            Markers are read by screen readers in the order that
                            you add them here, so add in a logical order for the
                            learner (e.g. sequentially, clockwise). You can test
                            order by using keyboard tabbing.
                        </span>
                    ) : (
                        "Upload an image to place markers."
                    )}
                </div>

                {imageUrl && (
                    <div
                        className={css(styles.markersCanvas)}
                        style={{
                            maxWidth: imageWidth,
                            maxHeight: imageHeight,
                        }}
                    >
                        <img
                            alt=""
                            className={css(styles.image)}
                            src={staticUrl(Util.getRealImageUrl(imageUrl))}
                            onDoubleClick={this.handleImageDoubleClick}
                        />

                        {markers.map((marker, index) => (
                            <Marker
                                {...marker}
                                choices={choices}
                                key={`${marker.x}.${marker.y}`}
                                // Update marker in the list.
                                onChange={(marker) =>
                                    onChange([
                                        ...markers.slice(0, index),
                                        marker,
                                        ...markers.slice(index + 1),
                                    ])
                                }
                                // Remove marker from the list.
                                onRemove={() =>
                                    onChange([
                                        ...markers.slice(0, index),
                                        ...markers.slice(index + 1),
                                    ])
                                }
                                ref={(node) => (this._markers[index] = node)}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        ...typography.bodyXsmallBold,

        marginBottom: 6,

        color: colors.gray17,
    },

    subtitle: {
        ...typography.labelSmall,

        marginBottom: 12,

        color: colors.gray68,
    },

    markersCanvas: {
        position: "relative",

        border: "solid 1px rgba(33, 36, 44, 0.16)",
    },

    image: {
        // This makes `markersCanvas` have the same height as the image,
        // enabling to place markers precisely as they're positioned using
        // percentage offsets.
        display: "block",

        // Contain question image to the widget editor.
        maxWidth: "100%",
    },
});
