import {linterContextDefault} from "@khanacademy/perseus-linter";
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

type ExternalProps = WidgetProps<PerseusImageWidgetOptions>;

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
