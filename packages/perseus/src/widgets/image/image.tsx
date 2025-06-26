import {linterContextDefault} from "@khanacademy/perseus-linter";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import AssetContext from "../../asset-context";
import {PerseusI18nContext} from "../../components/i18n-context";
import SvgImage from "../../components/svg-image";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/image/image-ai-utils";

import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {ImagePromptJSON} from "../../widget-ai-utils/image/image-ai-utils";
import type {Range, PerseusImageWidgetOptions} from "@khanacademy/perseus-core";

const defaultBoxSize = 400;
const defaultRange: Range = [0, 10];
const defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0,
} as const;

type RenderProps = PerseusImageWidgetOptions; // there is no transform as part of exports

type ExternalProps = WidgetProps<RenderProps>;

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

class ImageWidget extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        alignment: "block",
        title: "",
        range: [defaultRange, defaultRange],
        box: [defaultBoxSize, defaultBoxSize],
        backgroundImage: defaultBackgroundImage,
        labels: [],
        alt: "",
        caption: "",
        linterContext: linterContextDefault,
    };

    // this just helps with TS weak typing when a Widget
    // doesn't implement any Widget methods
    isWidget = true as const;

    getPromptJSON(): ImagePromptJSON {
        return _getPromptJSON(this.props);
    }

    render(): React.ReactNode {
        let image;
        const alt = this.props.caption === this.props.alt ? "" : this.props.alt;
        const {apiOptions} = this.props;

        const backgroundImage = this.props.backgroundImage;

        if (backgroundImage.url) {
            const url = backgroundImage.url;
            image = (
                <AssetContext.Consumer>
                    {({setAssetStatus}) => (
                        <SvgImage
                            src={url}
                            alt={alt}
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
                                strings={this.context.strings}
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
                        strings={this.context.strings}
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
                        strings={this.context.strings}
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
                {caption}
            </figure>
        );
    }
}

export default {
    name: "image",
    displayName: "Image",
    widget: ImageWidget,
    isLintable: true,
} satisfies WidgetExports<typeof ImageWidget>;
