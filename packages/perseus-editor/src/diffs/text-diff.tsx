import {components} from "@khanacademy/perseus";
import classNames from "classnames";
import jsdiff from "jsdiff";
import * as React from "react";
import _ from "underscore";

import splitDiff from "./shared/split-diff";
import stringArrayDiff from "./shared/string-array-diff";

import type {Entry} from "./shared/split-diff";
import type {ImageDiffResult} from "./shared/string-array-diff";

const {SvgImage} = components;

const BEFORE = "before";
const AFTER = "after";

const IMAGE_REGEX = /http.*?\.png|web\+graphie[^)]*/g;

type ContentDiff = {
    before: React.JSX.Element[];
    after: React.JSX.Element[];
};

const imagesInString = function (str: string | undefined) {
    return str?.match(IMAGE_REGEX) || [];
};

const classFor = function (entry: Entry, ifAdded: string, ifRemoved: string) {
    if (entry.added) {
        return ifAdded;
    }
    if (entry.removed) {
        return ifRemoved;
    }
    return "";
};

type Image = {
    value: string;
    status: "unchanged" | "added" | "removed";
};

type ImageDiffSideProps = {
    images: Image[];
};

class ImageDiffSide extends React.Component<ImageDiffSideProps> {
    render(): React.ReactNode {
        return (
            <div>
                {_.map(this.props.images, (entry, index) => {
                    const className = classNames({
                        image: true,
                        "image-unchanged": entry.status === "unchanged",
                        "image-added": entry.status === "added",
                        "image-removed": entry.status === "removed",
                    });
                    return (
                        <div key={index}>
                            <div className={className}>
                                <SvgImage
                                    src={entry.value}
                                    title={entry.value}
                                    allowZoom={false}
                                    alt={"entry.value"}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export type TextDiffProps = {
    title: string;
    after?: string;
    before?: string;
};

type TextDiffState = {
    collapsed: boolean;
};

class TextDiff extends React.Component<TextDiffProps, TextDiffState> {
    static defaultProps: Partial<TextDiffProps> = {
        after: "",
        before: "",
    };

    state: TextDiffState = {
        collapsed: this.props.before === this.props.after,
    };

    UNSAFE_componentWillReceiveProps(nextProps: TextDiffProps) {
        this.setState({
            collapsed: nextProps.before === nextProps.after,
        });
    }

    handleExpand: () => void = () => {
        this.setState({collapsed: false});
    };

    render(): React.ReactNode {
        // Fun note: I'm adding our own custom object here because jsdiff
        // is an old js library (11 years with no changes as of this comment)
        // with no typing.
        const diffed: Entry[] = jsdiff.diffWords(
            this.props.before,
            this.props.after,
        );

        const lines: Entry[][] = splitDiff(diffed);

        const beforeImages = imagesInString(this.props.before);
        const afterImages = imagesInString(this.props.after);
        const images: ImageDiffResult = stringArrayDiff(
            beforeImages,
            afterImages,
        );

        const renderedLines = _.map(lines, (line) => {
            const contents: ContentDiff = {before: [], after: []};

            contents.before = _(line).map(function (entry: Entry, i: number) {
                return (
                    <span
                        key={i}
                        className={classFor(
                            entry,
                            "not-present",
                            "removed dark",
                        )}
                    >
                        {entry.value}
                    </span>
                );
            });

            contents.after = _(line).map(function (entry: Entry, i: number) {
                return (
                    <span
                        key={i}
                        className={classFor(entry, "added dark", "not-present")}
                    >
                        {entry.value}
                    </span>
                );
            });

            return contents;
        });

        const className = classNames({
            "diff-row": true,
            collapsed: this.state.collapsed,
        });

        return (
            <div>
                <div className="diff-header">{this.props.title}</div>
                <div className="diff-header">{this.props.title}</div>
                <div className="diff-body ui-helper-clearfix">
                    {_.map([BEFORE, AFTER], (side, index) => {
                        return (
                            <div className={"diff-row " + side} key={index}>
                                {!this.state.collapsed &&
                                    _.map(renderedLines, (line, lineNum) => {
                                        const changed = line[side].length > 1;
                                        const lineClass = classNames({
                                            "diff-line": true,
                                            added: side === AFTER && changed,
                                            removed: side === BEFORE && changed,
                                        });
                                        return (
                                            <div
                                                className={lineClass}
                                                key={lineNum}
                                            >
                                                {line[side]}
                                            </div>
                                        );
                                    })}
                                {!this.state.collapsed && (
                                    <ImageDiffSide images={images[side]} />
                                )}
                            </div>
                        );
                    })}
                </div>
                {_.map([BEFORE, AFTER], (side, index) => {
                    return (
                        // Leaving this eslint ignore for now, since this is an internal tool.
                        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- TODO(LEMS-2871): Address a11y error
                        <div
                            className={className + " " + side}
                            key={index}
                            onClick={this.handleExpand}
                        >
                            {this.state.collapsed && (
                                <span>
                                    <span className="expand-button">
                                        {" "}
                                        [ show unmodified ]{" "}
                                    </span>
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default TextDiff;
