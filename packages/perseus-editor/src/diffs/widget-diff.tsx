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
        const beforeSrc = before?.options?.backgroundImage?.url
            ? before?.options.backgroundImage.url
            : "";
        const afterSrc = after?.options?.backgroundImage?.url
            ? after?.options.backgroundImage.url
            : "";

        const beforeAlt = before?.options?.alt ? before?.options.alt : "";
        const afterAlt = after?.options?.alt ? after?.options.alt : "";
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
    after: PerseusWidget;
    before: PerseusWidget;
    title: string;
    type: PerseusWidget["type"];
};

class WidgetDiff extends React.Component<WidgetDiffProps> {
    render(): React.ReactNode {
        const {after, before, title, type} = this.props;
        const diff = performDiff(before, after);
        return (
            <>
                <div className="diff-header">{title}</div>
                <div className="diff-header">{title}</div>
                <div className="diff-body ui-helper-clearfix">
                    {type === "image" && (
                        <ImageWidgetDiff
                            before={before as ImageWidget}
                            after={after as ImageWidget}
                        />
                    )}
                    <DiffEntry entry={diff} />
                </div>
            </>
        );
    }
}

export default WidgetDiff;
