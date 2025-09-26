import {EditorJsonify} from "@khanacademy/perseus";
import {
    imageLogic,
    type ImageDefaultWidgetOptions,
    type PerseusImageWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";

import ImageSettings from "./components/image-settings";
import ImageUrlInput from "./image-url-input";

import type {APIOptions} from "@khanacademy/perseus";

export interface Props extends PerseusImageWidgetOptions {
    apiOptions: APIOptions;
    onChange: (newValues: Partial<PerseusImageWidgetOptions>) => void;
}

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding an image widget that allows users to display and configure images within content.
 */
class ImageEditor extends React.Component<Props> {
    static displayName = "ImageEditor";
    static widgetName = "image";

    static defaultProps: ImageDefaultWidgetOptions =
        imageLogic.defaultWidgetOptions;

    serialize() {
        return EditorJsonify.serialize.call(this);
    }

    render() {
        return (
            <div className="perseus-image-editor">
                <ImageUrlInput {...this.props} />

                {this.props.backgroundImage.url && (
                    <ImageSettings {...this.props} />
                )}
            </div>
        );
    }
}

export default ImageEditor;
