/* eslint-disable react/sort-comp */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import AssetContext from "../asset-context";
import SvgImage from "../components/svg-image";
import * as Changeable from "../mixins/changeable";
import Renderer from "../renderer";

import type {Range, PerseusImageWidgetOptions} from "../perseus-types";
import type {
    ChangeFn,
    PerseusScore,
    WidgetExports,
    WidgetProps,
} from "../types";

const defaultBoxSize = 400;
const defaultRange: Range = [0, 10];
const defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0,
} as const;

const editorAlignments = ["block", "full-width"];

const DEFAULT_ALIGNMENT = "block";

type RenderProps = PerseusImageWidgetOptions; // there is no transform as part of exports
type Rubric = PerseusImageWidgetOptions;
type UserInput = null;

type ExternalProps = WidgetProps<RenderProps, Rubric>;

type Props = ExternalProps & {
    alignment: NonNullable<ExternalProps["alignment"]>;
    title: NonNullable<ExternalProps["title"]>;
    range: NonNullable<ExternalProps["range"]>;
    box: NonNullable<ExternalProps["box"]>;
    backgroundImage: NonNullable<ExternalProps["backgroundImage"]>;
    labels: NonNullable<ExternalProps["labels"]>;
    alt: NonNullable<ExternalProps["alt"]>;
    caption: NonNullable<ExternalProps["caption"]>;
    linterContext: NonNullable<ExternalProps["linterContext"]>;
};

type DefaultProps = {
    alignment: Props["alignment"];
    title: Props["title"];
    range: Props["range"];
    box: Props["box"];
    backgroundImage: Props["backgroundImage"];
    labels: Props["labels"];
    alt: Props["alt"];
    caption: Props["caption"];
    linterContext: Props["linterContext"];
};

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

    simpleValidate: (arg1: Rubric) => PerseusScore = (rubric) => {
        return ImageWidget.validate(this.getUserInput(), rubric);
    };

    focus: () => void = () => {}; // no-op

    render(): React.ReactNode {
        let image;
        let alt;
        const {apiOptions} = this.props;

        const backgroundImage = this.props.backgroundImage;

        if (backgroundImage.url) {
            const url = backgroundImage.url;
            image = (
                <AssetContext.Consumer>
                    {({setAssetStatus}) => (
                        <SvgImage
                            src={url}
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
                            setAssetStatus={setAssetStatus}
                        />
                    )}
                </AssetContext.Consumer>
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
                    <figcaption
                        className={className}
                        style={{
                            maxWidth: backgroundImage.width,
                        }}
                    >
                        <div
                            style={{
                                // @ts-expect-error - TS2322 - Type 'string | null' is not assignable to type 'MinWidth<string | number> | undefined'.
                                minWidth: minWidth,
                            }}
                        >
                            <Renderer
                                content={title + this.props.caption}
                                apiOptions={apiOptions}
                                linterContext={this.props.linterContext}
                            />
                        </div>
                    </figcaption>
                );
            }

            return (
                <figure
                    className="perseus-image-widget"
                    style={{
                        maxWidth: backgroundImage.width,
                    }}
                >
                    {image}
                    {alt}
                    {titleAndCaption}
                </figure>
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
                <figcaption
                    className="perseus-image-caption"
                    style={{
                        maxWidth: backgroundImage.width,
                    }}
                >
                    <Renderer
                        content={this.props.caption}
                        apiOptions={apiOptions}
                        linterContext={this.props.linterContext}
                    />
                </figcaption>
            );
        }

        return (
            <figure
                className="perseus-image-widget"
                style={{
                    maxWidth: backgroundImage.width,
                }}
            >
                {title}
                {image}
                {alt}
                {caption}
            </figure>
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

export default {
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
} as WidgetExports<typeof ImageWidget>;
