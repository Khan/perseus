/**
 * This is a video widget for embedding videos in articles.
 */

import {View} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import _ from "underscore";

import FixedToResponsive from "../../components/fixed-to-responsive";
import {PerseusI18nContext} from "../../components/i18n-context";
import {getDependencies} from "../../dependencies";
import * as Changeable from "../../mixins/changeable";
import a11y from "../../util/a11y";
import noopValidator from "../__shared__/noop-validator";

import VideoTranscriptLink from "./video-transcript-link";

import type {PerseusVideoWidgetOptions} from "../../perseus-types";
import type {WidgetExports, WidgetProps} from "../../types";
import type {PerseusVideoRubric} from "../../validation.types";

// Current default is 720p, based on the typical videos we upload currently
const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

const KA_EMBED = "{host}/embed_video?slug={slug}" + "&internal_video_only=1";
const IS_URL = /^https?:\/\//;
const IS_KA_SITE = /(khanacademy\.org|localhost)/;
const IS_VIMEO = /(vimeo\.com)/;

type RenderProps = PerseusVideoWidgetOptions; // exports has no 'transform'
type Props = WidgetProps<RenderProps, PerseusVideoRubric> & {
    alignment: string; // Where does this get set?
};

/**
 * Video renderer.
 */
class Video extends React.Component<Props> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    /**
     * This is the widget's grading function.
     * Points for videos are tallied by the embedded video itself, in the case
     * of Khan Academy videos.
     */
    // TODO (LEMS-2396): remove validation logic from widgets that don't validate
    static validate() {
        return noopValidator();
    }

    getUserInput: () => undefined | null | undefined = () => {
        return null;
    };

    // TODO (LEMS-2396): remove validation logic from widgets that don't validate
    simpleValidate() {
        return noopValidator();
    }

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    render(): React.ReactNode {
        const {InitialRequestUrl} = getDependencies();

        const location = this.props.location;
        if (!location) {
            return <div />;
        }

        let url;

        if (IS_URL.test(location)) {
            url = location;
            if (IS_VIMEO.test(url)) {
                // If this is a vimeo video, we need to add the query string
                // parameter "dnt" so that analytics/tracking cookies aren't set.
                // https://help.vimeo.com/hc/en-us/articles/12426260232977-Player-parameters-overview
                if (url.indexOf("?") === -1) {
                    url += "?dnt=1";
                } else {
                    url += "&dnt=1";
                }
            }
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
                        {this.context.strings.videoWrapper}
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

export default {
    name: "video",
    displayName: "Video",
    defaultAlignment: "block",
    supportedAlignments: ["block", "float-left", "float-right", "full-width"],
    widget: Video,
} as WidgetExports<typeof Video>;
