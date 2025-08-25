/* eslint-disable jsx-a11y/anchor-is-valid */
import {components, EditorJsonify, Util} from "@khanacademy/perseus";
import {
    imageLogic,
    type ImageDefaultWidgetOptions,
    type Range,
    type Size,
    type PerseusImageWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";
import _ from "underscore";

import BlurInput from "../../components/blur-input";

import ImageSettings from "./image-settings";

import type {APIOptions} from "@khanacademy/perseus";

const {InfoTip} = components;

// Match any image URL (including "web+graphie" links) that is hosted by KA.
// We're somewhat generous in our AWS URL matching
// ("ka-<something>.s3.amazonaws.com") so that we don't have to update Perseus
// every time we add a new proxied AWS bucket.
const INTERNALLY_HOSTED_DOMAINS =
    "(" +
    "ka-.*.s3.amazonaws.com|" +
    "(fastly|cdn).kastatic.org|" +
    "khanacademy.org|" +
    "kasandbox.org" +
    ")";
const INTERNALLY_HOSTED_URL_RE = new RegExp(
    "^(https?|web\\+graphie)://[^/]*" + INTERNALLY_HOSTED_DOMAINS,
);

interface Props {
    apiOptions: APIOptions;

    title: string;
    range: [Readonly<Range>, Readonly<Range>];
    box: Size;
    backgroundImage: any;
    labels: ReadonlyArray<string>;
    alt: string;
    caption: string;
    onChange: (newValues: Partial<PerseusImageWidgetOptions>) => void;
}

type State = {
    backgroundImageError?: string;
};

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding an image widget that allows users to display and configure images within content.
 */
class ImageEditor extends React.Component<Props> {
    static displayName = "ImageEditor";
    static widgetName = "image";
    _isMounted = false;

    static defaultProps: ImageDefaultWidgetOptions =
        imageLogic.defaultWidgetOptions;

    state: State = {
        backgroundImageError: "",
    };

    componentDidMount() {
        // TODO(scottgrant): This is a hack to remove the deprecated call to
        // this.isMounted() but is still considered an anti-pattern.
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setUrl(url, width, height, silent) {
        // Because this calls into WidgetEditor._handleWidgetChange, which
        // checks for this widget's ref to serialize it.
        //
        // Errors if you switch items before the `Image` from `onUrlChange`
        // loads.
        if (!this._isMounted) {
            return;
        }

        const image = _.clone(this.props.backgroundImage);
        image.url = url;
        image.width = width;
        image.height = height;
        const box = [image.width, image.height] satisfies [number, number];
        this.props.onChange({
            backgroundImage: image,
            box: box,
        });
    }

    // silently load the image when the component mounts
    // silently update url and sizes when the image loads
    // noisily load the image in response to the author changing it
    async onUrlChange(url: string | undefined | null, silent: boolean) {
        // Check if we've been passed something that looks like a URL
        if (!url) {
            this.setUrl(url, 0, 0, silent);
            return;
        }

        // All article content must be KA-owned!
        if (!INTERNALLY_HOSTED_URL_RE.test(url)) {
            this.setState({
                backgroundImageError:
                    "Images must be from sites hosted by Khan Academy. " +
                    "Please input a Khan Academy-owned address, or use the " +
                    "Add Image tool to rehost an existing image",
            });
            return;
        }

        // Clear previous errors
        this.setState({backgroundImageError: ""});

        try {
            const size = await Util.getImageSizeModern(url);
            this.setUrl(url, size[0], size[1], true);
        } catch (error) {
            this.setState({
                backgroundImageError: `There was an error loading the image URL: ${JSON.stringify(
                    error,
                    null,
                    2,
                )}`,
            });
        }
    }

    serialize() {
        return EditorJsonify.serialize.call(this);
    }

    render() {
        const backgroundImage = this.props.backgroundImage;

        const backgroundImageErrorText = (
            <div className="renderer-widget-error">
                {this.state.backgroundImageError}
            </div>
        );

        return (
            <div className="perseus-image-editor">
                <label>
                    Image url:
                    <InfoTip>Paste an image or graphie image URL.</InfoTip>
                    {this.state.backgroundImageError &&
                        backgroundImageErrorText}
                    <BlurInput
                        value={backgroundImage.url || ""}
                        style={{width: 332}}
                        onChange={(url) => this.onUrlChange(url, false)}
                    />
                </label>

                {backgroundImage.url && (
                    <ImageSettings
                        apiOptions={this.props.apiOptions}
                        backgroundImage={backgroundImage}
                        onChange={this.props.onChange}
                    />
                )}
            </div>
        );
    }
}

export default ImageEditor;
