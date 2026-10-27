import {
    videoLogic,
    type PerseusVideoWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";

import VideoSettings from "./video-settings";

import type {WidgetEditorProps} from "../widget-editor-props";

export type VideoEditorProps = WidgetEditorProps<PerseusVideoWidgetOptions>;

/**
 * This is the main editor for this widget, to specify all the options.
 */
class VideoEditor extends React.Component<VideoEditorProps> {
    static defaultProps: PerseusVideoWidgetOptions =
        videoLogic.defaultWidgetOptions;

    render(): React.ReactNode {
        return <VideoSettings {...this.props} />;
    }
}

export default VideoEditor;
