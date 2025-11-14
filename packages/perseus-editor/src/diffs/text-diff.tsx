/* eslint-disable react/no-unsafe */
import {components} from "@khanacademy/perseus";
import classNames from "classnames";
// eslint-disable-next-line import/no-extraneous-dependencies
import jsdiff from "jsdiff";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import splitDiff from "./split-diff";
import stringArrayDiff from "./string-array-diff";

const {SvgImage} = components;

const BEFORE = "before";
const AFTER = "after";

const IMAGE_REGEX = /http.*?\.png|web\+graphie[^)]*/g;

const imagesInString = function (str: any) {
    return str.match(IMAGE_REGEX) || [];
};

const classFor = function (entry: any, ifAdded: string, ifRemoved: string) {
    if (entry.added) {
        return ifAdded;
    }
    if (entry.removed) {
        return ifRemoved;
    }
    return "";
};

class ImageDiffSide extends React.Component<any> {
    static propTypes = {
        images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    };

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
                                {/* @ts-expect-error - TS2741 - Property 'alt' is missing in type '{ src: any; title: any; }' but required in type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "children" | "height" | "width" | "title" | "alt" | "trackInteraction" | "preloader" | "allowFullBleed" | "extraGraphie" | "overrideAriaHidden">'. */}
                                <SvgImage
                                    src={entry.value}
                                    title={entry.value}
                                    allowZoom={false}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

class TextDiff extends React.Component<any, any> {
    static propTypes = {
        after: PropTypes.string,
        before: PropTypes.string,
        title: PropTypes.string.isRequired,
    };

    static defaultProps: any = {
        after: "",
        before: "",
    };

    state: any = {
        collapsed: this.props.before === this.props.after,
    };

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        this.setState({
            collapsed: nextProps.before === nextProps.after,
        });
    }

    handleExpand: () => void = () => {
        this.setState({collapsed: false});
    };

    render(): React.ReactNode {
        const diffed = jsdiff.diffWords(this.props.before, this.props.after);

        const lines = splitDiff(diffed);

        const beforeImages = imagesInString(this.props.before);
        const afterImages = imagesInString(this.props.after);
        const images = stringArrayDiff(beforeImages, afterImages);

        const renderedLines = _.map(lines, (line) => {
            const contents: Record<string, any> = {};

            contents.before = _(line).map(function (entry, i) {
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

            contents.after = _(line).map(function (entry, i) {
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
