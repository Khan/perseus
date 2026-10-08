import {
    imageLogic,
    type PerseusImageWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";

import EditorJsonify from "../../mixins/editor-jsonify";

import ImageSettings from "./components/image-settings";
import ImageUrlInput from "./components/image-url-input";

import type {APIOptions} from "@khanacademy/perseus";

interface Props extends PerseusImageWidgetOptions {
    apiOptions: APIOptions;
    onChange: (options: PerseusImageWidgetOptions) => void;
}

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding an image widget that allows users to display and configure images within content.
 */
class ImageEditor extends React.Component<Props> {
    static displayName = "ImageEditor";

    static defaultProps: PerseusImageWidgetOptions =
        imageLogic.defaultWidgetOptions;

    handleChange = (changes: Partial<PerseusImageWidgetOptions>) => {
        this.props.onChange({
            title: this.props.title,
            caption: this.props.caption,
            alt: this.props.alt,
            longDescription: this.props.longDescription,
            decorative: this.props.decorative,
            backgroundImage: this.props.backgroundImage,
            scale: this.props.scale,
            labels: this.props.labels,
            range: this.props.range,
            box: this.props.box,
            ...changes,
        });
    };

    serialize() {
        return EditorJsonify.serialize.call(this);
    }

    render() {
        return (
            <>
                <ImageUrlInput {...this.props} onChange={this.handleChange} />
                <ImageSettings {...this.props} onChange={this.handleChange} />
            </>
        );
    }
}

export default ImageEditor;
