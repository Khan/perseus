// @flow
import * as React from "react";

import VideoTranscriptLink from "../video-transcript-link.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Video Transcript Link",
}: Story);

export const YoutubeVideoLink = (args: StoryArgs): React.Node => {
    return (
        <VideoTranscriptLink location="https://www.youtube.com/watch?v=YoutubeId" />
    );
};

export const SlugVideoLink = (args: StoryArgs): React.Node => {
    return <VideoTranscriptLink location="slug-video-id" />;
};
