import {ApiOptions} from "@khanacademy/perseus";
import {
    imageLogic,
    type PerseusImageWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";

import ImageSettings from "./components/image-settings";
import ImageUrlInput from "./components/image-url-input";

import type {WidgetEditorProps} from "../widget-editor-props";

type Props = WidgetEditorProps<PerseusImageWidgetOptions>;

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

    render() {
        return (
            <>
                <ImageUrlInput {...this.props} onChange={this.handleChange} />
                <ImageSettings
                    {...this.props}
                    apiOptions={{
                        // TODO(LEMS-4681): Remove ApiOptions.defaults once all
                        //  apiOptions are passed to this component.
                        ...ApiOptions.defaults,
                        ...this.props.apiOptions,
                    }}
                    onChange={this.handleChange}
                />
            </>
        );
    }
}

export default ImageEditor;
