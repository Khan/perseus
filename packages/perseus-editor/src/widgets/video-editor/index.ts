import {videoRegistration} from "@khanacademy/perseus/widgets/video";

import {defineEditorRegistration} from "../../editor-registration";

import VideoEditor from "./video-editor";

export const videoEditorRegistration = defineEditorRegistration({
    widgetRegistration: videoRegistration,
    editor: VideoEditor,
});

export default VideoEditor;
