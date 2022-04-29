// @flow
/**
 * This is a video widget for embedding videos in articles.
 */

import {View} from "@khanacademy/wonder-blocks-core";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import * as React from "react";
import _ from "underscore";

import FixedToResponsive from "../components/fixed-to-responsive.jsx";
import {getDependencies} from "../dependencies.js";
import * as Changeable from "../mixins/changeable.jsx";
import a11y from "../util/a11y.js";

import VideoTranscriptLink from "./video-transcript-link.jsx";

import type {PerseusVideoWidgetOptions} from "../perseus-types.js";
import type {PerseusScore, WidgetExports, WidgetProps} from "../types.js";

// Current default is 720p, based on the typical videos we upload currently
const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

const KA_EMBED = "{host}/embed_video?slug={slug}" + "&internal_video_only=1";
const IS_URL = /^https?:\/\//;
const IS_KA_SITE = /(khanacademy\.org|localhost)/;

type UserInput = null;
type Rubric = PerseusVideoWidgetOptions;
type RenderProps = PerseusVideoWidgetOptions; // exports has no 'transform'
type Props = {|
    ...WidgetProps<RenderProps, Rubric>,
    alignment: string, // Where does this get set?
|};

/**
 * Video renderer.
 */
class Video extends React.Component<Props> {
    /**
     * This is the widget's grading function.
     * Points for videos are tallied by the embedded video itself, in the case
     * of Khan Academy videos.
     */
    static validate(userInput: UserInput, rubric: Rubric): PerseusScore {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    }

    getUserInput: () => ?void = () => {
        return null;
    };

    simpleValidate: (Rubric) => PerseusScore = (rubric) => {
        return Video.validate(null, rubric);
    };

    change: (...args: $ReadOnlyArray<mixed>) => $FlowFixMe = (...args) => {
        // $FlowFixMe[incompatible-call]
        return Changeable.change.apply(this, args);
    };

    render(): React.Node {
        const {InitialRequestUrl} = getDependencies();

        const location = this.props.location;
        if (!location) {
            return <div />;
        }

        let url;

        if (IS_URL.test(location)) {
            url = location;
        } else {
            url = KA_EMBED.replace("{slug}", location);
            let embedHostname = "https://www.khanacademy.org";
            if (IS_KA_SITE.test(InitialRequestUrl.host)) {
                embedHostname = InitialRequestUrl.origin;
            }
            url = url.replace("{host}", embedHostname);
        }

        return (
            <View>
                <FixedToResponsive
                    width={DEFAULT_WIDTH}
                    height={DEFAULT_HEIGHT}
                    // The key is here for the benefit of the editor, to ensure that
                    // any changes cause a re-rendering of the frame.
                    key={location + this.props.alignment}
                >
                    <View style={a11y.srOnly}>
                        {i18n._("Khan Academy video wrapper")}
                    </View>

                    <iframe
                        // TODO(joshuan): Consider not using iframes when we're
                        // loading this from webapp. This iframe is problematic
                        // for screenreaders.
                        className="perseus-video-widget"
                        sandbox="allow-same-origin allow-scripts"
                        width={DEFAULT_WIDTH}
                        height={DEFAULT_HEIGHT}
                        src={url}
                        allowFullScreen={true}
                    />
                </FixedToResponsive>
                <VideoTranscriptLink location={location} />
            </View>
        );
    }
}

export default ({
    name: "video",
    displayName: "Video",
    defaultAlignment: "block",
    supportedAlignments: ["block", "float-left", "float-right", "full-width"],
    widget: Video,
}: WidgetExports<typeof Video>);
