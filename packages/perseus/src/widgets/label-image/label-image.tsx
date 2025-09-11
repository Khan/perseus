/**
 * Direct image labeling widget.
 *
 * Label on image widget enables creating more natural, conceptual questions
 * that involve the use of images, and enable learners to demonstrate their
 * knowledge by directly interacting with the image.
 */

import {scoreLabelImageMarker} from "@khanacademy/perseus-score";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import * as ReactDOM from "react-dom";

import AssetContext from "../../asset-context";
import {PerseusI18nContext} from "../../components/i18n-context";
import SvgImage from "../../components/svg-image";
import {useDependencies} from "../../dependencies";
import Renderer from "../../renderer";
import {bodyXsmallBold} from "../../styles/global-styles";
import mediaQueries from "../../styles/media-queries";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/label-image/label-image-ai-utils";

import AnswerChoices from "./answer-choices";
import {HideAnswersToggle} from "./hide-answers-toggle";
import Marker from "./marker";

import type {DependencyProps} from "../../dependencies";
import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {LabelImagePromptJSON} from "../../widget-ai-utils/label-image/label-image-ai-utils";
import type {
    InteractiveMarkerType,
    PerseusLabelImageWidgetOptions,
    PerseusLabelImageUserInput,
    LabelImagePublicWidgetOptions,
    ShowSolutions,
    PerseusLabelImageUserInputMarker,
} from "@khanacademy/perseus-core";
import type {InteractiveMarkerScore} from "@khanacademy/perseus-score";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";
import type {CSSProperties} from "aphrodite";

type PreferredPopoverDirection = "NONE" | "UP" | "DOWN" | "LEFT" | "RIGHT";

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

export type OptionalAnswersMarkerType = Omit<
    InteractiveMarkerType,
    "answers"
> & {
    answers?: string[];
};

type Options = Omit<PerseusLabelImageWidgetOptions, "markers"> & {
    // The list of label markers on the question image.
    markers: ReadonlyArray<OptionalAnswersMarkerType>;
};

type Props = WidgetProps<Options, PerseusLabelImageUserInput> & {
    analytics: DependencyProps["analytics"];
    // preferred placement for popover (preference, not MUST)
    // TODO: this is sus, probably never passed in
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

function isAnswerful(
    marker: OptionalAnswersMarkerType | InteractiveMarkerType,
): marker is InteractiveMarkerType {
    return marker.answers != null;
}

/**
 * Get user input marker with the appropriate selection state for current display mode.
 * When showing solutions, it auto-selects correct answers, or clears
 * selections for markers without answers.
 *
 * @param marker - The widget options marker (possibly with answer).
 * @param userInputMarker - The user input marker (with user selection).
 * @returns A modified version of user input, possibly with correct answer.
 */
export function getComputedSelectedState(
    marker: OptionalAnswersMarkerType,
    userInputMarker: PerseusLabelImageUserInputMarker,
    reviewMode: boolean,
    showSolutions?: ShowSolutions,
): PerseusLabelImageUserInputMarker {
    const shouldShowFeedback = showSolutions === "all" || reviewMode;

    if (!shouldShowFeedback) {
        return userInputMarker;
    }

    if (isAnswerful(marker)) {
        // Auto-select correct answers when feedback should be shown
        return {
            ...userInputMarker,
            selected: marker.answers,
        };
    } else {
        // For markers without answers, ensure no selection when showing feedback
        return {
            ...userInputMarker,
            selected: undefined,
        };
    }
}

export class LabelImage
    extends React.Component<Props, LabelImageState>
    implements Widget
{
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    // The rendered markers on the question image for labeling.
    _markers: Array<Marker | null | undefined>;
    _mounted: boolean = false;

    /**
     * Test whether point is contained within triangle.
     *
     * Implementation taken from: https://stackoverflow.com/a/2049593
     */
    static pointInTriangle(p: Point, a: Point, b: Point, c: Point): boolean {
        const sign = (p1: Point, p2: Point, p3: Point) =>
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

        const sides = ["top", "right", "bottom", "left"] as const;

        type Side = (typeof sides)[number];

        // The triangles representing the sides to test.
        const triangles: Record<Side, [Point, Point, Point]> = {
            top: [tl, tr, cp],
            right: [cp, tr, br],
            bottom: [bl, cp, br],
            left: [tl, cp, bl],
        };

        const p = {x, y} as const;

        // Test whether marker is positioned within one of the triangles
        // representing the sides.
        for (const side of sides) {
            const corners = triangles[side];

            if (LabelImage.pointInTriangle(p, ...corners)) {
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
        markers: ReadonlyArray<{
            x: number;
            y: number;
            showCorrectness?: "correct" | "incorrect";
        }>,
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

    constructor(props: Props) {
        super(props);

        this._markers = [];

        this.state = {
            activeMarkerIndex: -1,
            markersInteracted: false,
            hideAnswers: false,
        };
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    getPromptJSON(): LabelImagePromptJSON {
        return _getPromptJSON(this.props);
    }

    handleMarkerChange(
        index: number,
        marker: PerseusLabelImageUserInput["markers"][number],
    ) {
        const {userInput, handleUserInput} = this.props;

        // Update UserInput version of the marker
        const updatedUserInput = [
            ...userInput.markers.slice(0, index),
            {
                label: marker.label,
                selected: marker.selected,
            },
            ...userInput.markers.slice(index + 1),
        ];

        handleUserInput({markers: updatedUserInput});
    }

    activateMarker(index: number, opened: boolean) {
        // TODO(LEMS-2830): Remove analytics event in LEMS-2830 in favor of ti below.
        this.props.analytics?.onAnalyticsEvent({
            type: "perseus:label-image:marker-interacted-with",
            payload: null,
        });

        this.props.analytics?.onAnalyticsEvent({
            type: "perseus:label-image:marker-interacted-with:ti",
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
        const directions: Record<string, Direction> = {
            ArrowUp: {x: 0, y: -1},
            ArrowRight: {x: 1, y: 0},
            ArrowDown: {x: 0, y: 1},
            ArrowLeft: {x: -1, y: 0},
        };

        // Return early if key is not an arrow key
        if (!(e.key in directions)) {
            return;
        }

        const navigateDirection = directions[e.key];

        e.preventDefault();

        // Focus on the closest marker along the direction of navigation.
        const marker =
            this._markers[
                LabelImage.navigateToMarkerIndex(
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
            selected: selected.length > 0 ? selected : undefined,
        });
    }

    renderMarkers(): ReadonlyArray<React.ReactNode> {
        const {markers, preferredPopoverDirection, userInput} = this.props;
        const {markersInteracted, activeMarkerIndex} = this.state;

        // Determine whether page is rendered in a narrow browser window.
        const isNarrowPage =
            this._mounted &&
            window.matchMedia(mediaQueries.xsOrSmaller.replace("@media ", ""))
                .matches;

        // Determine whether the image is wider than it is tall.
        const isWideImage = this.props.imageWidth / 2 > this.props.imageHeight;

        // Render all markers for widget.
        return markers.map((marker, index): React.ReactElement => {
            const userInputMarker = userInput.markers[index];
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

            // Get the updated marker state depending on whether the question
            // has been answered or skipped by the user.
            const computedSelectedState = getComputedSelectedState(
                marker,
                userInputMarker,
                this.props.reviewMode,
                this.props.showSolutions,
            );

            let score: InteractiveMarkerScore;
            if (isAnswerful(marker)) {
                score = scoreLabelImageMarker(
                    computedSelectedState.selected,
                    marker.answers,
                );
            } else {
                score = {
                    hasAnswers: false,
                    isCorrect: false,
                };
            }

            // Once the question has been answered or skipped, show the markers
            // with their correct answers. Otherwise passthrough the correctness state.
            const shouldShowFeedback =
                this.props.showSolutions === "all" || this.props.reviewMode;
            const showCorrectness =
                shouldShowFeedback && score.isCorrect
                    ? "correct"
                    : marker.showCorrectness;

            // Disable marker interaction once the question has been answered or skipped.
            const disabled = shouldShowFeedback;

            // Determine whether the marker is currently being interacted with.
            const isActiveAnswerChoice = activeMarkerIndex === index;

            // Show the selected answer choices, if available, when they have not been manually hidden.
            // The correct answers will be automatically selected when the question is answered/skipped.
            const showAnswerChoice =
                computedSelectedState.selected &&
                !this.state.hideAnswers &&
                !isActiveAnswerChoice;

            const adjustPillDistance: CSSProperties = {
                [`margin${
                    markerPosition.charAt(0).toUpperCase() +
                    markerPosition.slice(1)
                }`]: 10, // move pill further from marker
            };

            return (
                <View
                    key={index}
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
                            checked: computedSelectedState.selected
                                ? computedSelectedState.selected.includes(
                                      choice,
                                  )
                                : false,
                        }))}
                        multipleSelect={this.props.multipleAnswers}
                        onChange={(selection) => {
                            // TODO(LEMS-2829): Remove analytics event in LEMS-2829 in favor of ti below.
                            this.props.analytics?.onAnalyticsEvent({
                                type: "perseus:label-image:choiced-interacted-with",
                                payload: null,
                            });
                            this.props.analytics?.onAnalyticsEvent({
                                type: "perseus:label-image:choiced-interacted-with:ti",
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
                        opener={({opened}) => (
                            <Clickable
                                role="button"
                                aria-expanded={opened}
                                key={`marker-${marker.x}.${marker.y}`}
                            >
                                {({hovered, focused, pressed}) => (
                                    <Marker
                                        label={marker.label}
                                        showCorrectness={showCorrectness}
                                        showSelected={opened}
                                        showPulsate={!markersInteracted}
                                        ref={(node) =>
                                            (this._markers[index] = node)
                                        }
                                        showAnswer={showAnswerChoice}
                                        answerSide={side}
                                        answerStyles={adjustPillDistance}
                                        focused={focused || pressed}
                                        hovered={hovered}
                                        selected={
                                            computedSelectedState.selected
                                        }
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
        const {strings} = this.context;

        const promptString = isMobile
            ? multipleAnswers
                ? strings.tapMultiple
                : strings.tapSingle
            : multipleAnswers
              ? strings.clickMultiple
              : strings.clickSingle;

        const choicesString = strings.choices;

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
                                <Renderer content={choice} strings={strings} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState
     */
    getSerializedState(): any {
        const {userInput, markers, ...rest} = this.props;
        return {
            ...rest,
            markers: markers.map((marker, index) => ({
                ...marker,
                selected: userInput.markers[index].selected,
            })),
        };
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
                        // TODO(LEMS-2831): Remove analytics event in LEMS-2831 in favor of ti below.
                        this.props.analytics?.onAnalyticsEvent({
                            type: "perseus:label-image:toggle-answers-hidden",
                            payload: null,
                        });
                        this.props.analytics?.onAnalyticsEvent({
                            type: "perseus:label-image:toggle-answers-hidden:ti",
                            payload: null,
                        });
                        this.setState({hideAnswers});
                    }}
                />
            </div>
        );
    }
}

const LabelImageWithDependencies = React.forwardRef<
    LabelImage,
    Omit<PropsFor<typeof LabelImage>, keyof ReturnType<typeof useDependencies>>
>((props, ref) => {
    const deps = useDependencies();
    return <LabelImage ref={ref} analytics={deps.analytics} {...props} />;
});

({}) as WidgetProps<
    PerseusLabelImageWidgetOptions,
    PerseusLabelImageUserInput
> satisfies PropsFor<typeof LabelImageWithDependencies>;

({}) as WidgetProps<
    LabelImagePublicWidgetOptions,
    PerseusLabelImageUserInput
> satisfies PropsFor<typeof LabelImageWithDependencies>;

function getStartUserInput(
    options: LabelImagePublicWidgetOptions,
): PerseusLabelImageUserInput {
    return {
        markers: options.markers.map((m) => ({
            label: m.label,
        })),
    };
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusLabelImageUserInput {
    return {
        markers: serializedState.markers.map((m) => ({
            label: m.label,
            selected: m.selected,
        })),
    };
}

export default {
    name: "label-image",
    displayName: "Label Image",
    widget: LabelImageWithDependencies,
    isLintable: true,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof LabelImageWithDependencies>;

const styles = StyleSheet.create({
    instructions: {
        paddingBottom: 16,
    },

    instructionsCaption: {
        ...bodyXsmallBold,

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
