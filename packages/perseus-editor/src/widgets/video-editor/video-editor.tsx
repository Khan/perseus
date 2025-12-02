import {EditorJsonify} from "@khanacademy/perseus";
import {
    videoLogic,
    type VideoDefaultWidgetOptions,
    type PerseusVideoWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";

import VideoSettings from "./video-settings";

export interface VideoEditorProps extends PerseusVideoWidgetOptions {
    onChange: (options: PerseusVideoWidgetOptions) => void;
}

/**
 * This is the main editor for this widget, to specify all the options.
 */
class VideoEditor extends React.Component<VideoEditorProps> {
    static widgetName = "video" as const;

    static defaultProps: VideoDefaultWidgetOptions =
        videoLogic.defaultWidgetOptions;

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return <VideoSettings {...this.props} />;
    }
}

export default VideoEditor;
