// @flow
import {getFixtureFnFor} from "../../testing/sandbox/fixture.js";

import VideoTranscriptLink from "./video-transcript-link.jsx";

const fixture = getFixtureFnFor(VideoTranscriptLink);

export const instances: $ReadOnlyArray<mixed> = [
    fixture(
        "Youtube Video Link",
        {
            // Mock provided by test-dependencies.js
            location: "https://www.youtube.com/watch?v=YoutubeId",
        },
        VideoTranscriptLink,
    ),
    fixture(
        "Slug Video Link",
        {
            // Mock provided by test-dependencies.js
            location: "slug-video-id",
        },
        VideoTranscriptLink,
    ),
];
