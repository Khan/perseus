import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import BlurInput from "../components/blur-input";

const {InfoTip} = components;

const KA_VIDEO_URL = /khanacademy\.org\/.*\/v\/(.*)$/;

/**
 * Turns Khan Academy URLs into the KA slugs, if possible. Any other URLs are
 * returned unchanged.
 */
function getSlugFromUrl(url: string) {
    const match = KA_VIDEO_URL.exec(url);
    if (match) {
        return match[1];
    }
    return url;
}

type Props = any;

/**
 * This is the main editor for this widget, to specify all the options.
 */
class VideoEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        location: PropTypes.string,
        onChange: PropTypes.func,
    };

    static widgetName = "video" as const;

    static defaultProps: Props = {
        location: "",
    };

    _handleUrlChange: (arg1: string) => void = (url) => {
        this.props.onChange({location: getSlugFromUrl(url)});
    };

    change: (arg1: any, arg2: any, arg3: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        return (
            <div>
                <label>
                    KA Video Slug:{" "}
                    <BlurInput
                        value={this.props.location}
                        style={{width: 290}}
                        onChange={this._handleUrlChange}
                    />
                    <InfoTip>
                        KA video URLs will be converted to just the slug.
                    </InfoTip>
                </label>
            </div>
        );
    }
}

export default VideoEditor;
