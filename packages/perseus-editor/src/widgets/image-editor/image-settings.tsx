import {Util, components} from "@khanacademy/perseus";
import * as React from "react";

import Editor from "../../editor";

import type {APIOptions} from "@khanacademy/perseus";
import type {PerseusImageWidgetOptions} from "@khanacademy/perseus-core";

const {InfoTip} = components;

interface ImageSettingsProps extends PerseusImageWidgetOptions {
    apiOptions: APIOptions;
    onChange: (newValues: Partial<PerseusImageWidgetOptions>) => void;
}

export default function ImageSettings({
    apiOptions,
    alt,
    backgroundImage,
    caption,
    onChange,
}: ImageSettingsProps) {
    if (!backgroundImage.url) {
        return null;
    }

    return (
        <div className="image-settings">
            {!Util.isLabeledSVG(backgroundImage.url) && (
                <div>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- TODO(LEMS-2871): Address a11y error */}
                    <label>
                        <div>Preview:</div>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt -- TODO(LEMS-2871): Address a11y error */}
                        <img
                            alt="Editor preview of image"
                            src={backgroundImage.url}
                            style={{
                                width: "100%",
                            }}
                        />
                    </label>
                </div>
            )}
            <div>
                <label>
                    <div>Dimensions:</div>
                    <p>
                        {backgroundImage.width}x{backgroundImage.height}
                    </p>
                </label>
            </div>

            <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- TODO(LEMS-2871): Address a11y error */}
                <label>
                    <div>
                        Alt text:
                        <InfoTip>
                            This is important for screenreaders. The content of
                            this alt text will be formatted as markdown (tables,
                            emphasis, etc. are supported).
                        </InfoTip>
                    </div>
                    <Editor
                        apiOptions={apiOptions}
                        content={alt}
                        onChange={(props) => {
                            if (props.content != null) {
                                onChange({alt: props.content});
                            }
                        }}
                        widgetEnabled={false}
                    />
                </label>
            </div>
            <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control -- TODO(LEMS-2871): Address a11y error */}
                <label>
                    <div>Caption:</div>
                    <Editor
                        apiOptions={apiOptions}
                        content={caption}
                        onChange={(props) => {
                            if (props.content != null) {
                                onChange({caption: props.content});
                            }
                        }}
                        widgetEnabled={false}
                    />
                </label>
            </div>
        </div>
    );
}
