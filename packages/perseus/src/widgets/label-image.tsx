/**
 * Direct image labeling widget.
 *
 * Label on image widget enables creating more natural, conceptual questions
 * that involve the use of images, and enable learners to demonstrate their
 * knowledge by directly interacting with the image.
 */

import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import * as ReactDOM from "react-dom";

import AssetContext from "../asset-context";
import SvgImage from "../components/svg-image";
import {useDependencies} from "../dependencies";
import Renderer from "../renderer";
import {typography} from "../styles/global-styles";
import mediaQueries from "../styles/media-queries";

import AnswerChoices from "./label-image/answer-choices";
import {HideAnswersToggle} from "./label-image/hide-answers-toggle";
import Marker from "./label-image/marker";

import type {
    InteractiveMarkerType,
    InteractiveMarkerScore,
} from "./label-image/types";
import type {DependencyProps} from "../dependencies";
import type {ChangeableProps} from "../mixins/changeable";
import type {APIOptions, PerseusScore, WidgetExports} from "../types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {CSSProperties} from "aphrodite";

export type PreferredPopoverDirection =
    | "NONE"
    | "UP"
    | "DOWN"
    | "LEFT"
    | "RIGHT";

type MarkersState = {
    markers: ReadonlyArray<InteractiveMarkerType>;
};

/**
 * Represents a direction vector.
 * No diagonals allowed.
 */
type Direction =
    | {
          x: 0;
          y: 1 | -1;
      }
    | {
          x: 1 | -1;
          y: 0;
      }
    | {
          x: 0;
          y: 0;
      };

type Point = {
    x: number;
    y: number;
};

type LabelImageProps = ChangeableProps &
    DependencyProps & {
        apiOptions: APIOptions;
        // The list of possible answer choices.
        choices: ReadonlyArray<string>;
        // The question image properties.
        imageAlt: string;
        imageUrl: string;
        imageWidth: number;
        imageHeight: number;
        // The list of label markers on the question image.
        markers: ReadonlyArray<InteractiveMarkerType>;
        // Whether multiple answer choices may be selected for markers.
        multipleAnswers: boolean;
        // Whether to hide answer choices from user instructions.
        hideChoicesFromInstructions: boolean;
        // Whether the question has been answered by the user.
        questionCompleted: boolean;
        // preferred placement for popover (preference, not MUST)
        preferredPopoverDirection?: PreferredPopoverDirection;
    };

type LabelImageState = {
    // The user selected marker index, defaults to -1, no selection.
    activeMarkerIndex: number;
    // Whether any of the markers were interacted with by the user.
    markersInteracted: boolean;
    // Hide answer pills.
    hideAnswers: boolean;
};

export class LabelImage extends React.Component<
    LabelImageProps,
    LabelImageState
> {
    // The rendered markers on the question image for labeling.
    _markers: Array<Marker | null | undefined>;

    static gradeMarker(marker: InteractiveMarkerType): InteractiveMarkerScore {
        const score = {
            hasAnswers: false,
            isCorrect: false,
        } as const;

        if (marker.selected && marker.selected.length > 0) {
            // @ts-expect-error - TS2540 - Cannot assign to 'hasAnswers' because it is a read-only property.
            score.hasAnswers = true;
        }

        if (marker.answers.length > 0) {
            if (
                marker.selected &&
                marker.selected.length === marker.answers.length
            ) {
                // All correct answers are selected by the user.
                // @ts-expect-error - TS2540 - Cannot assign to 'isCorrect' because it is a read-only property.
                score.isCorrect = marker.selected.every((choice) =>
                    marker.answers.includes(choice),
                );
            }
        } else if (!marker.selected || marker.selected.length === 0) {
            // Correct as no answers should be selected by the user.
            // @ts-expect-error - TS2540 - Cannot assign to 'isCorrect' because it is a read-only property.
            score.isCorrect = true;
        }

        return score;
    }

    static validate(
        state: MarkersState,
        rubric?: LabelImageProps,
    ): PerseusScore {
        let numAnswered = 0;
        let numCorrect = 0;

        for (const marker of state.markers) {
            const score = LabelImage.gradeMarker(marker);

            if (score.hasAnswers) {
                numAnswered++;
            }

            if (score.isCorrect) {
                numCorrect++;
            }
        }

        // We expect all question markers to be answered before grading.
        if (numAnswered !== state.markers.length) {
            return {
                type: "invalid",
                message: null,
            };
        }

        return {
            type: "points",
            // Markers with no expected answers are graded as correct if user
            // makes no answer selection.
            earned: numCorrect === state.markers.length ? 1 : 0,
            total: 1,
            message: null,
        };
    }

    /**
     * Test whether point is contained within triangle.
     *
     * Implementation taken from: https://stackoverflow.com/a/2049593
     */
    static pointInTriangle(p: Point, a: Point, b: Point, c: Point): boolean {
        const sign = (p1: Point, p2: Point, p3) =>
            (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);

        const b1 = sign(p, a, b) < 0;
        const b2 = sign(p, b, c) < 0;
        const b3 = sign(p, c, a) < 0;

        return b1 === b2 && b2 === b3;
    }

    /**
     * Determine the image side given a marker position (as percent of size).
     */
    static imageSideForMarkerPosition(
        x: number,
        y: number,
        preferredDirection: PreferredPopoverDirection | undefined,
    ): "bottom" | "left" | "right" | "top" | "center" {
        // Special handling for preferred size
        if (preferredDirection && preferredDirection !== "NONE") {
            if (preferredDirection === "LEFT" && x > 20) {
                return "right";
            } else if (preferredDirection === "RIGHT" && x < 80) {
                return "left";
            } else if (preferredDirection === "UP" && y > 20) {
                return "bottom";
            } else if (preferredDirection === "DOWN" && y < 80) {
                return "top";
            }
        }

        // Special handling for when marker is positioned near the horizontal
        // edges of the image. We want to ensure the returned side would not
        // result in a popup rendering that may overflow outside the page.
        if (x < 20) {
            return "left";
        }
        if (x > 80) {
            return "right";
        }

        // Points to define corners (and center) of a rectangle representing
        // the constrained area of the image for which we want to determine the
        // image side.
        const tl = {x: 20, y: 0} as const;
        const tr = {x: 80, y: 0} as const;
        const br = {x: 80, y: 100} as const;
        const bl = {x: 20, y: 100} as const;
        const cp = {x: 50, y: 50} as const;

        // The triangles representing the sides to test.
        const triangles = {
            top: [tl, tr, cp],
            right: [cp, tr, br],
            bottom: [bl, cp, br],
            left: [tl, cp, bl],
        } as const;

        const p = {x, y} as const;

        // Test whether marker is positioned within one of the triangles
        // representing the sides.
        for (const side of Object.keys(triangles)) {
            const corners = triangles[side];

            // @ts-expect-error - TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
            if (LabelImage.pointInTriangle(p, ...corners)) {
                // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"left" | "top" | "center" | "right" | "bottom"'.
                return side;
            }
        }

        // Fallback, if side was not found for marker position.
        return "center";
    }

    /**
     * Calculate the next marker to navigate to, from the "this marker".
     *
     * Given a cardinal navigation direction (in the x or y axis), return the
     * next marker index to visit.
     */
    static navigateToMarkerIndex(
        navigateDirection: Direction,
        markers: ReadonlyArray<InteractiveMarkerType>,
        thisIndex: number,
    ): number {
        const thisMarker = markers[thisIndex];

        // Sort markers along the direction of navigation from "this" marker.
        const sortedMarkers = markers
            .map((otherMarker, index) => {
                // Calculate distance and (normalized) vector to the marker from
                // "this" marker.
                const x = otherMarker.x - thisMarker.x;
                const y = otherMarker.y - thisMarker.y;

                const dist = Math.sqrt(x ** 2 + y ** 2);

                return {
                    index,
                    dist,
                    dir: {
                        x: dist !== 0 ? x / dist : 0,
                        y: dist !== 0 ? y / dist : 0,
                    },
                };
            })
            .filter((marker) => {
                if (marker.index === thisIndex) {
                    return false;
                }

                // Exclude any marker that has been answered correctly,
                // as it should no longer be interacted with by the user.
                return markers[marker.index].showCorrectness !== "correct";
            })
            .sort((a, b) => {
                // Project distances to the two markers being sorted (from the
                // "this" marker) along the direction of navigation. This will
                // order by the "closest" marker in the direction of navigation,
                // not the "absolute" closest marker to "this" marker.
                // We round the calculated distances so that if markers are
                // found to be positioned "close enough" to the "this" marker,
                // they will be treated as coplanar with it.
                const distA = Math.round(
                    a.dist *
                        (navigateDirection.x * a.dir.x +
                            navigateDirection.y * a.dir.y),
                );
                const distB = Math.round(
                    b.dist *
                        (navigateDirection.x * b.dir.x +
                            navigateDirection.y * b.dir.y),
                );

                let dirA;
                let dirB;
                // Determine whether the two markers lie ahead or behind the
                // "this" marker. A marker that lies in the same plane as the
                // "this" marker will be considered to be behind it.
                // Only navigation in the "x" or "y" axis is supported, no
                // diagonals.
                if (navigateDirection.x > 0) {
                    dirA = a.dir.x > 0 && distA !== 0;
                    dirB = b.dir.x > 0 && distB !== 0;
                } else if (navigateDirection.x < 0) {
                    dirA = a.dir.x < 0 && distA !== 0;
                    dirB = b.dir.x < 0 && distB !== 0;
                } else if (navigateDirection.y > 0) {
                    dirA = a.dir.y > 0 && distA !== 0;
                    dirB = b.dir.y > 0 && distB !== 0;
                } else if (navigateDirection.y < 0) {
                    dirA = a.dir.y < 0 && distA !== 0;
                    dirB = b.dir.y < 0 && distB !== 0;
                }

                // If one of the markers is positioned behind, sort the other
                // marker ahead of it in the order.
                if (dirA !== dirB) {
                    if (dirA) {
                        return -1;
                    }
                    return 1;
                }

                // Both markers are either positioned ahead or behind, sort the
                // closest (or furthest if behind, to "wrap" navigation) marker
                // ahead in the order.
                return distA - distB;
            });

        // Return the index in the provided markers array of the closest marker
        // found along the direction of navigation, or "this" index if no other
        // marker was found. This may happen if the user has answered all but
        // one ("this" marker) of the markers correctly in the question.
        return sortedMarkers.length > 0 ? sortedMarkers[0].index : thisIndex;
    }

    constructor(props: LabelImageProps) {
        super(props);

        this._markers = [];

        this.state = {
            activeMarkerIndex: -1,
            markersInteracted: false,
            hideAnswers: false,
        };
    }

    simpleValidate(rubric: LabelImageProps): PerseusScore {
        return LabelImage.validate(this.getUserInput(), rubric);
    }

    getUserInput(): MarkersState {
        const {markers} = this.props;
        return {markers};
    }

    showRationalesForCurrentlySelectedChoices(rubric: LabelImageProps) {
        const {markers} = this.props;
        const {onChange} = this.props;

        const updatedMarkers = markers.map((marker) => {
            const score = LabelImage.gradeMarker(marker);

            return {
                ...marker,
                // Reveal correctness state for markers with answers.
                showCorrectness: score.hasAnswers
                    ? score.isCorrect
                        ? "correct"
                        : "incorrect"
                    : undefined,
            };
        });

        // Update Perseus widget state with user selected answers without
        // triggering interaction events for listeners.
        // @ts-expect-error - TS2345 - Argument of type 'null' is not assignable to parameter of type '(() => unknown) | undefined'.
        onChange({markers: updatedMarkers}, null, true);
    }

    handleMarkerChange(index: number, marker: InteractiveMarkerType) {
        const {markers, onChange} = this.props;

        // Replace marker with a changed version at the specified index.
        const updatedMarkers = [
            ...markers.slice(0, index),
            {
                ...marker,
                // Do not show correctness state if user changes answer
                // selection for marker.
                showCorrectness: undefined,
            },
            ...markers.slice(index + 1),
        ];

        // Update Perseus widget state with user selected answers.
        onChange({markers: updatedMarkers});
    }

    activateMarker(index: number, opened: boolean) {
        this.props.analytics?.onAnalyticsEvent({
            type: "perseus:label-image:marker-interacted-with",
            payload: null,
        });

        const {activeMarkerIndex} = this.state;
        // Set index of opened marker
        if (activeMarkerIndex !== index && opened) {
            this.setState({
                activeMarkerIndex: index,
                markersInteracted: true,
            });
        } else {
            this.setState({activeMarkerIndex: -1});
        }
    }

    handleMarkerKeyDown(index: number, e: React.KeyboardEvent) {
        const {markers} = this.props;

        // One is the loneliest number.
        if (markers.length < 2) {
            return;
        }

        // Only navigation in the "x" or "y" axis is supported, no diagonals.
        const navigateDirection = {
            ArrowUp: {x: 0, y: -1},
            ArrowRight: {x: 1, y: 0},
            ArrowDown: {x: 0, y: 1},
            ArrowLeft: {x: -1, y: 0},
        }[e.key];

        if (!navigateDirection) {
            return;
        }

        e.preventDefault();

        // Focus on the closest marker along the direction of navigation.
        const marker =
            this._markers[
                LabelImage.navigateToMarkerIndex(
                    // @ts-expect-error - TS2345 - Argument of type '{ x: number; y: number; } | { x: number; y: number; } | { x: number; y: number; } | { x: number; y: number; }' is not assignable to parameter of type 'Direction'.
                    navigateDirection,
                    markers,
                    index,
                )
            ];

        if (marker) {
            (ReactDOM.findDOMNode(marker) as HTMLElement).focus();
        }
    }

    handleAnswerChoicesChangeForMarker(
        index: number,
        selection: ReadonlyArray<boolean>,
    ) {
        const {choices, markers} = this.props;

        // Compile the user selected answer choices.
        const selected = choices.filter((_, index) => selection[index]);

        this.handleMarkerChange(index, {
            ...markers[index],
            selected: selected.length ? selected : undefined,
        });
    }

    renderMarkers(): ReadonlyArray<React.ReactNode> {
        const {markers, questionCompleted, preferredPopoverDirection} =
            this.props;

        const {activeMarkerIndex, markersInteracted} = this.state;

        // Render all markers for widget.
        return markers.map((marker, index): React.ReactElement => {
            // Determine whether page is rendered in a narrow browser window.
            const isNarrowPage = window.matchMedia(
                mediaQueries.xsOrSmaller.replace("@media ", ""),
            ).matches;

            // Determine whether the image is wider than it is tall.
            const isWideImage =
                this.props.imageWidth / 2 > this.props.imageHeight;

            let side: "bottom" | "left" | "right" | "top";
            let markerPosition;
            // Position popup closest to the center, preferring it renders
            // entirely within the image area.
            if (isNarrowPage || isWideImage) {
                side = marker.y > 50 ? "top" : "bottom";
                markerPosition = marker.y > 50 ? "bottom" : "top";
            } else {
                markerPosition = LabelImage.imageSideForMarkerPosition(
                    marker.x,
                    marker.y,
                    preferredPopoverDirection,
                );
                if (markerPosition === "center") {
                    markerPosition = "bottom";
                }
                // This mirrors the calculated side of where the marker is
                // located within the image, so that popup appears closer to
                // the image center.
                side = {
                    left: "right",
                    top: "bottom",
                    right: "left",
                    bottom: "top",
                }[markerPosition];
            }

            const score = LabelImage.gradeMarker(marker);
            // Once the question is answered, show markers
            // with correct answers, otherwise passthrough
            // the correctness state.
            const showCorrectness =
                questionCompleted && score.hasAnswers && score.isCorrect
                    ? "correct"
                    : marker.showCorrectness;

            // Disable marker interaction once the question is answered correctly.
            const disabled = showCorrectness === "correct";

            const adjustPillDistance: CSSProperties = {
                [`margin${
                    markerPosition.charAt(0).toUpperCase() +
                    markerPosition.slice(1)
                }`]: 10, // move pill further from marker
            };

            const answerChoicesActive = index === activeMarkerIndex;

            const showAnswerChoice =
                marker.selected &&
                !answerChoicesActive &&
                !this.state.hideAnswers;

            return (
                <View
                    style={{
                        position: "absolute",
                        left: `${marker.x}%`,
                        top: `${marker.y}%`,
                        // reset to allow child (answer pill) to control z-index
                        zIndex: "unset",
                    }}
                >
                    <AnswerChoices
                        key={`answers-${marker.x}.${marker.y}`}
                        choices={this.props.choices.map((choice) => ({
                            content: choice,
                            checked: marker.selected
                                ? marker.selected.includes(choice)
                                : false,
                        }))}
                        multipleSelect={this.props.multipleAnswers}
                        onChange={(selection) => {
                            this.props.analytics?.onAnalyticsEvent({
                                type: "perseus:label-image:choiced-interacted-with",
                                payload: null,
                            });
                            this.handleAnswerChoicesChangeForMarker(
                                index,
                                selection,
                            );
                        }}
                        onToggle={(opened) =>
                            this.activateMarker(index, opened)
                        }
                        // cannot change answer choices once question is answered
                        disabled={disabled}
                        opener={({opened, text}) => (
                            <Clickable
                                role="button"
                                key={`marker-${marker.x}.${marker.y}`}
                                aria-label={
                                    // already translated in: /widgets/graded-group.tsx
                                    showCorrectness === "correct"
                                        ? i18n._("Correct!")
                                        : marker.label
                                }
                            >
                                {({hovered, focused, pressed}) => (
                                    <Marker
                                        {...marker}
                                        showCorrectness={showCorrectness}
                                        showSelected={opened}
                                        showPulsate={!markersInteracted}
                                        ref={(node) =>
                                            (this._markers[index] = node)
                                        }
                                        showAnswer={showAnswerChoice}
                                        answerSide={side}
                                        answerStyles={adjustPillDistance}
                                        analytics={this.props.analytics}
                                        focused={focused || pressed}
                                        hovered={hovered}
                                    />
                                )}
                            </Clickable>
                        )}
                    />
                </View>
            );
        });
    }

    renderInstructions(): React.ReactNode {
        const {
            apiOptions: {isMobile},
            choices,
            multipleAnswers,
            hideChoicesFromInstructions: hideChoices,
        } = this.props;

        const promptString = isMobile
            ? multipleAnswers
                ? i18n._(
                      "Tap each dot on the image to select all answers that apply.",
                  )
                : i18n._("Tap each dot on the image to select an answer.")
            : multipleAnswers
            ? i18n._(
                  "Click each dot on the image to select all answers that apply.",
              )
            : i18n._("Click each dot on the image to select an answer.");

        const choicesString = i18n._("Choices:");

        return (
            <div
                className={classNames(
                    "perseus-label-image-widget-instructions",
                    css(styles.instructions),
                )}
            >
                <div className={css(styles.instructionsCaption)}>
                    {promptString} {!hideChoices && choicesString}
                </div>

                {!hideChoices && (
                    <div className={css(styles.instructionsChoices)}>
                        {choices.map((choice, index) => (
                            <div
                                className={css(styles.instructionsChoice)}
                                key={index}
                            >
                                <Renderer content={choice} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    render(): React.ReactNode {
        const {imageAlt, imageUrl, imageWidth, imageHeight} = this.props;

        const {activeMarkerIndex} = this.state;

        return (
            <div>
                {this.renderInstructions()}
                <div
                    className={css(styles.markersCanvas)}
                    style={{
                        maxWidth: imageWidth,
                        maxHeight: imageHeight,
                    }}
                >
                    <div
                        className={css(
                            styles.imageContainer,
                            // Ensure image interaction is disabled while answer
                            // choices popup is visible. This addresses specific
                            // case where user may click on question image to
                            // dismiss the popup. If the image is larger in size
                            // than its rendered in the widget, this would
                            // result in a zoom of the image.
                            activeMarkerIndex !== -1 &&
                                styles.imageInteractionDisabled,
                        )}
                    >
                        <AssetContext.Consumer>
                            {({setAssetStatus}) => (
                                <SvgImage
                                    alt={imageAlt}
                                    src={imageUrl}
                                    width={imageWidth}
                                    height={imageHeight}
                                    setAssetStatus={setAssetStatus}
                                />
                            )}
                        </AssetContext.Consumer>
                    </div>
                    {this.renderMarkers()}
                </div>
                <HideAnswersToggle
                    areAnswersHidden={this.state.hideAnswers}
                    onChange={(hideAnswers) => {
                        this.props.analytics?.onAnalyticsEvent({
                            type: "perseus:label-image:toggle-answers-hidden",
                            payload: null,
                        });
                        this.setState({hideAnswers});
                    }}
                />
            </div>
        );
    }
}

const styles = StyleSheet.create({
    instructions: {
        paddingBottom: 16,
    },

    instructionsCaption: {
        ...typography.bodyXsmallBold,

        paddingBottom: 16,
    },

    instructionsChoices: {
        display: "flex",
        flexWrap: "wrap",

        margin: "-8px 0",
    },

    instructionsChoice: {
        display: "flex",
        alignItems: "center",

        margin: "8px 0",

        ":not(:last-child)": {
            "::after": {
                content: "''",
                display: "inline-block",
                position: "relative",

                width: 2,
                height: 2,

                marginLeft: 5,
                marginRight: 5,

                background: "rgba(33, 36, 44, 0.32)",

                borderRadius: 2,
            },
        },
    },

    markersCanvas: {
        position: "relative",
    },

    imageContainer: {
        // Remove the additional height added due to white-spacing, this ensures
        // markers canvas will have the same height as the question image.
        display: "flex",
    },

    imageInteractionDisabled: {
        pointerEvents: "none",
    },
});

const LabelImageWithDependencies = React.forwardRef<
    LabelImage,
    Omit<PropsFor<typeof LabelImage>, keyof ReturnType<typeof useDependencies>>
>((props, ref) => {
    const deps = useDependencies();
    return <LabelImage ref={ref} analytics={deps.analytics} {...props} />;
});

// HACK: Propogate "static" methods onto our wrapper component.
// In the future we should adjust client apps to not depend on these static
// methods and instead adjust Peresus to provide these facilities through
// instance methods on our Renderers.
// @ts-expect-error - TS2339 - Property 'validate' does not exist on type
LabelImageWithDependencies.validate = LabelImage.validate;
// @ts-expect-error - TS2339 - Property 'gradeMarker' does not exist on type
LabelImageWithDependencies.gradeMarker = LabelImage.gradeMarker;

export default {
    name: "label-image",
    displayName: "Label Image",
    widget: LabelImageWithDependencies,
    accessible: true,
    isLintable: true,
} as WidgetExports<typeof LabelImageWithDependencies>;
