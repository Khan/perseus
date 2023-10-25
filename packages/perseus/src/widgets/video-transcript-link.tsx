/**
 * This is a component that adds a link to the transcript for embedded videos in articles.
 */

import {View, Text} from "@khanacademy/wonder-blocks-core";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Link from "@khanacademy/wonder-blocks-link";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {getDependencies} from "../dependencies";

const IS_URL = /^https?:\/\//;

const getYoutubeId = (url: string): string => {
    const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[7].length === 11) {
        return match[7];
    }
    return "videoNotFound";
};

// will accept a youtube link or a video's slug name from embedded video and then query accordingly.
type Props = {
    location: string;
};

/**
 * Video Transcript Link Component.
 */
const VideoTranscriptLink = (props: Props): React.ReactElement => {
    const {location} = props;
    const {useVideo} = getDependencies();
    const [id, kind] = IS_URL.test(location)
        ? [getYoutubeId(location), "YOUTUBE_ID"]
        : [location, "READABLE_ID"];
    // The result value conforms to the wonder-blocks-data `Result` type
    // which is used by our GraphQL framework.
    // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type 'VideoKind'.
    const result = useVideo(id, kind);

    switch (result.status) {
        case "loading":
            return <View>{i18n._("Loading...")}</View>;
        case "success": {
            const video = result.data?.video;
            return (
                <View style={styles.transcriptLink}>
                    <Text>{video?.title}</Text>
                    <Strut size={10} />
                    <Link
                        href={
                            "/transcript/" +
                            (video?.contentId || "videoNotFound")
                        }
                        target="_blank"
                        className="visited-no-recolor"
                    >
                        {i18n._("See video transcript")}
                    </Link>
                </View>
            );
        }
        case "error":
            return <View>{i18n._("Something went wrong.")}</View>;
        case "aborted":
            return <View>{i18n._("Something went wrong.")}</View>;
        default:
            return <View>{i18n._("Something went wrong.")}</View>;
    }
};

const styles = StyleSheet.create({
    transcriptLink: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
    },
});

export default VideoTranscriptLink;
