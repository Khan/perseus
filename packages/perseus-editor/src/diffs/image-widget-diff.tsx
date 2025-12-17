import {components} from "@khanacademy/perseus";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import type {ImageWidget} from "@khanacademy/perseus-core";

const {SvgImage} = components;

type ImageWidgetDiffProps = {
    after: ImageWidget | undefined;
    before: ImageWidget | undefined;
};

// For image widgets, show the actual image
class ImageWidgetDiff extends React.Component<ImageWidgetDiffProps> {
    render(): React.ReactNode {
        const {before, after} = this.props;
        const beforeSrc: string = before?.options?.backgroundImage?.url
            ? before?.options.backgroundImage.url
            : "";
        const afterSrc: string = after?.options?.backgroundImage?.url
            ? after?.options.backgroundImage.url
            : "";

        const beforeAlt: string = before?.options?.alt
            ? before?.options.alt
            : "";
        const afterAlt: string = after?.options?.alt ? after?.options.alt : "";
        return (
            <div>
                <div className="diff-row before">
                    {beforeSrc && (
                        <div
                            className={classNames({
                                image: true,
                                "image-unchanged": beforeSrc === afterSrc,
                                "image-removed": beforeSrc !== afterSrc,
                            })}
                        >
                            <SvgImage
                                src={beforeSrc}
                                title={beforeSrc}
                                allowZoom={false}
                                alt={beforeAlt}
                            />
                        </div>
                    )}
                </div>
                <div className="diff-row after">
                    {afterSrc && (
                        <div
                            className={classNames({
                                image: true,
                                "image-unchanged": beforeSrc === afterSrc,
                                "image-added": beforeSrc !== afterSrc,
                            })}
                        >
                            <SvgImage
                                src={afterSrc}
                                title={afterSrc}
                                allowZoom={false}
                                alt={afterAlt}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ImageWidgetDiff;
