import * as React from "react";

import VideoTranscriptLink from "./video-transcript-link";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Video/Video Transcript Link",
} as Story;

export const YoutubeVideoLink = (args: StoryArgs): React.ReactElement => {
    return (
        <VideoTranscriptLink location="https://www.youtube.com/watch?v=YoutubeId" />
    );
};

export const SlugVideoLink = (args: StoryArgs): React.ReactElement => {
    return <VideoTranscriptLink location="slug-video-id" />;
};
