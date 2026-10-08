import {
    videoLogic,
    type PerseusVideoWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";

import VideoSettings from "./video-settings";

import type {WidgetEditorRefHandle} from "../types";

export interface VideoEditorProps extends PerseusVideoWidgetOptions {
    onChange: (options: PerseusVideoWidgetOptions) => void;
}

/**
 * This is the main editor for this widget, to specify all the options.
 */
class VideoEditor
    extends React.Component<VideoEditorProps>
    implements WidgetEditorRefHandle
{
    static defaultProps: PerseusVideoWidgetOptions =
        videoLogic.defaultWidgetOptions;

    serialize: () => PerseusVideoWidgetOptions = () => {
        return {
            location: this.props.location,
        };
    };

    render(): React.ReactNode {
        return <VideoSettings {...this.props} />;
    }
}

export default VideoEditor;
