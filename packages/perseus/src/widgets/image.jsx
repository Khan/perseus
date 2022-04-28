/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
// @flow
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import SvgImage from "../components/svg-image.jsx";
import {linterContextDefault} from "../gorgon/proptypes.js";
import * as Changeable from "../mixins/changeable.jsx";
import Renderer from "../renderer.jsx";
import {baseUnitPx} from "../styles/constants.js";
import mediaQueries from "../styles/media-queries.js";

import type {PerseusImageWidgetOptions} from "../perseus-types.js";
import type {
    ChangeFn,
    PerseusScore,
    WidgetExports,
    WidgetProps,
} from "../types.js";

const defaultBoxSize = 400;
const defaultRange = [0, 10];
const defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0,
};

const editorAlignments = ["block", "full-width"];

const DEFAULT_ALIGNMENT = "block";

type RenderProps = PerseusImageWidgetOptions; // there is no transform as part of exports
type Rubric = PerseusImageWidgetOptions;
type UserInput = null;

type ExternalProps = WidgetProps<RenderProps, Rubric>;

type Props = {|
    ...ExternalProps,
    alignment: $NonMaybeType<ExternalProps["alignment"]>,
    title: $NonMaybeType<ExternalProps["title"]>,
    range: $NonMaybeType<ExternalProps["range"]>,
    box: $NonMaybeType<ExternalProps["box"]>,
    backgroundImage: $NonMaybeType<ExternalProps["backgroundImage"]>,
    labels: $NonMaybeType<ExternalProps["labels"]>,
    alt: $NonMaybeType<ExternalProps["alt"]>,
    caption: $NonMaybeType<ExternalProps["caption"]>,
    linterContext: $NonMaybeType<ExternalProps["linterContext"]>,
|};

type DefaultProps = {|
    alignment: Props["alignment"],
    title: Props["title"],
    range: Props["range"],
    box: Props["box"],
    backgroundImage: Props["backgroundImage"],
    labels: Props["labels"],
    alt: Props["alt"],
    caption: Props["caption"],
    linterContext: Props["linterContext"],
|};

class ImageWidget extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        alignment: DEFAULT_ALIGNMENT,
        title: "",
        range: [defaultRange, defaultRange],
        box: [defaultBoxSize, defaultBoxSize],
        backgroundImage: defaultBackgroundImage,
        labels: [],
        alt: "",
        caption: "",
        linterContext: linterContextDefault,
    };

    change: ChangeFn = (...args) => {
        return Changeable.change.apply(this, args);
    };

    getUserInput: () => UserInput = () => {
        return null;
    };

    simpleValidate: (Rubric) => PerseusScore = (rubric) => {
        return ImageWidget.validate(this.getUserInput(), rubric);
    };

    focus: () => void = () => {}; // no-op

    render(): React.Node {
        let image;
        let alt;
        const {apiOptions} = this.props;

        const backgroundImage = this.props.backgroundImage;

        if (backgroundImage.url) {
            image = (
                <SvgImage
                    src={backgroundImage.url}
                    alt={
                        /* alt text is formatted in a sr-only
                               div next to the image in addition to
                               the alt attribute.
                               If there is no alt text at all,
                               we don't put an alt attribute on
                               the image, so that screen readers
                               know there's something they can't
                               read there :(.
                               NOTE: React <=0.13 (maybe later)
                               has a bug where it won't ever
                               remove an attribute, so if this
                               alt node is ever defined it's
                               not removed. This is sort of
                               dangerous, but we usually re-key
                               new renderers so that they're
                               rendered from scratch anyways,
                               so this shouldn't be a problem
                               in practice right now, although
                               it will exhibit weird behaviour
                               while editing. */
                        this.props.alt
                    }
                    overrideAriaHidden={true}
                    width={backgroundImage.width}
                    height={backgroundImage.height}
                    preloader={apiOptions.imagePreloader}
                    extraGraphie={{
                        box: this.props.box,
                        range: this.props.range,
                        labels: this.props.labels,
                    }}
                    trackInteraction={this.props.trackInteraction}
                    zoomToFullSizeOnMobile={apiOptions.isMobile}
                    constrainHeight={apiOptions.isMobile}
                    allowFullBleed={apiOptions.isMobile}
                />
            );
        }

        if (this.props.alt) {
            alt = (
                <span className="perseus-sr-only">
                    <Renderer
                        content={this.props.alt}
                        apiOptions={apiOptions}
                        linterContext={this.props.linterContext}
                    />
                </span>
            );
        }

        // For mobile we combine an image's title and caption.
        if (apiOptions.isMobile) {
            let titleAndCaption;

            if (this.props.title || this.props.caption) {
                let title = this.props.title;

                // Bold the title, and make it the first sentence of the
                // caption.
                if (title) {
                    // We add a period to separate the title from the caption
                    // (if it exists), unless the title already ends with a
                    // punctuation symbol (whitespace ignored). Copied from
                    // webapp: https://github.com/Khan/webapp/blob/6e930637edb65696d0749ea0f7558214aee32b4e/javascript/tutorial-shared-package/components/content-description.jsx#L80
                    // TODO(charlie): Internationalize this check, and the
                    // delimiter that is being inserted.
                    if (this.props.caption && !/[.?!"']\s*$/.test(title)) {
                        title += ".";
                    }

                    title = `**${title}** `;
                }

                const className = classNames({
                    "perseus-image-caption": true,
                    "has-title": !!title,
                });

                // Caption is left-aligned within a container that's centered
                // below the image, with these width constraints:
                //
                // 1. Size caption to width of the image on-screen.
                // 2. ... but constrain its width to a range based on the
                //    device to optimize readability - e.g. [320px, 450px] for
                //    phones.
                // 3. ... unless the image is floated, in which case we don't
                //    want the caption to overflow the image size.
                //
                // TODO(david): If caption is only 1 line long, center-align
                //     the text.
                const alignment = this.props.alignment;
                const isImageFullWidth =
                    alignment === "block" || alignment === "full-width";

                // This minWidth takes precedence over minWidth applied via
                // Aphrodite.
                const minWidth = isImageFullWidth ? null : "0 !important";

                titleAndCaption = (
                    <div className={className}>
                        <div
                            className={css(styles.caption)}
                            style={{
                                minWidth: minWidth,
                            }}
                        >
                            <Renderer
                                content={title + this.props.caption}
                                apiOptions={apiOptions}
                                linterContext={this.props.linterContext}
                            />
                        </div>
                    </div>
                );
            }

            return (
                <div className="perseus-image-widget">
                    {image}
                    {alt}
                    {titleAndCaption}
                </div>
            );
        }
        let title;
        let caption;

        if (this.props.title) {
            title = (
                <div className="perseus-image-title">
                    <Renderer
                        content={this.props.title}
                        apiOptions={apiOptions}
                        linterContext={this.props.linterContext}
                    />
                </div>
            );
        }

        if (this.props.caption) {
            caption = (
                <div className="perseus-image-caption">
                    <Renderer
                        content={this.props.caption}
                        apiOptions={apiOptions}
                        linterContext={this.props.linterContext}
                    />
                </div>
            );
        }

        return (
            <div className="perseus-image-widget">
                {title}
                {image}
                {alt}
                {caption}
            </div>
        );
    }

    static validate(userInput: UserInput, rubric: Rubric): PerseusScore {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }
}

const styles = StyleSheet.create({
    caption: {
        display: "inline-block",
        marginTop: baseUnitPx,
        maxWidth: 640,

        [mediaQueries.lgOrSmaller]: {
            // TODO(david): This maxWidth is not being used because
            //     it's overriden by the 512px max-width we have on
            //     paragraphs.
            maxWidth: 540,
        },

        [mediaQueries.smOrSmaller]: {
            maxWidth: 450,
        },
    },
});

export default ({
    name: "image",
    // This widget's accessibility depends on its contents: if the image has
    // has a background but no alt text, it is not accessible
    accessible: (widgetOptions: PerseusImageWidgetOptions): boolean => {
        const bgImage = widgetOptions.backgroundImage;
        return !(bgImage && bgImage.url && !widgetOptions.alt);
    },
    defaultAlignment: DEFAULT_ALIGNMENT,
    supportedAlignments: editorAlignments,
    displayName: "Image",
    widget: ImageWidget,
    isLintable: true,
}: WidgetExports<typeof ImageWidget>);
