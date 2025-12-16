import {components} from "@khanacademy/perseus";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import DiffEntry from "./shared/diff-entry";
import performDiff from "./shared/widget-diff-performer";

import type {ImageWidget, PerseusWidget} from "@khanacademy/perseus-core";

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

type WidgetDiffProps = {
    after: PerseusWidget | undefined;
    before: PerseusWidget | undefined;
    title: string;
    type: PerseusWidget["type"] | undefined;
};

class WidgetDiff extends React.Component<WidgetDiffProps> {
    render(): React.ReactNode {
        const {after, before, title, type} = this.props;

        // If before or after is undefined, pass an empty object to performDiff.
        const diff = performDiff(before ? before : {}, after ? after : {});
        return (
            <>
                <div className="diff-header">{title}</div>
                <div className="diff-header">{title}</div>
                <div className="diff-body ui-helper-clearfix">
                    {type === "image" && (
                        <ImageWidgetDiff
                            before={before as ImageWidget | undefined}
                            after={after as ImageWidget | undefined}
                        />
                    )}
                    <DiffEntry entry={diff} />
                </div>
            </>
        );
    }
}

export default WidgetDiff;
