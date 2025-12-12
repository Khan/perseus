import {TextArea} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import * as React from "react";

import type {VideoEditorProps} from "./video-editor";

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

/**
 * Specific settings for the Video widget.
 */
export default function VideoSettings(props: VideoEditorProps) {
    const [inputValue, setInputValue] = React.useState(props.location);

    function handleUrlChange(url: string) {
        props.onChange({location: getSlugFromUrl(url)});
    }

    return (
        <LabeledField
            label="KA Video Slug"
            description="KA video URLs will be converted to just the slug."
            field={
                <TextArea
                    value={inputValue}
                    onChange={setInputValue}
                    onBlur={(e) => handleUrlChange(e.target.value)}
                    autoResize={true}
                />
            }
        />
    );
}
