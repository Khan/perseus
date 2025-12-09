import {components} from "@khanacademy/perseus";
import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import performDiff from "./widget-diff-performer";

import type {ImageWidget, PerseusWidget} from "@khanacademy/perseus-core";

const {SvgImage} = components;

const indentationFromDepth = function (depth: any) {
    return (depth - 1) * 20;
};

const BEFORE = "before";
const AFTER = "after";

const UNCHANGED = "unchanged";

type DiffSideProps = {
    className: string;
    depth: number;
    propKey: string;
    showKey: boolean;
    side: "before" | "after";
    value: string;
};

class DiffSide extends React.Component<DiffSideProps> {
    render(): React.ReactNode {
        const className = classNames(this.props.className, {
            "diff-row": true,
            before: this.props.side === BEFORE,
            after: this.props.side === AFTER,
        });
        return (
            <div className={className}>
                <div
                    style={{
                        paddingLeft: indentationFromDepth(this.props.depth),
                    }}
                >
                    {this.props.showKey && this.props.propKey + ": "}
                    <span
                        className={"inner-value dark " + this.props.className}
                    >
                        {this.props.value}
                    </span>
                </div>
            </div>
        );
    }
}

type CollapsedRowProps = {
    depth: number;
    onClick: () => void;
};

class CollapsedRow extends React.Component<CollapsedRowProps> {
    static defaultProps = {
        depth: 0,
    };

    render(): React.ReactNode {
        const self = this;
        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- TODO(LEMS-2871): Address a11y error
            <div onClick={self.props.onClick} style={{clear: "both"}}>
                {_.map([BEFORE, AFTER], function (side) {
                    return (
                        <div
                            className={"diff-row collapsed " + side}
                            key={side}
                        >
                            <div
                                style={{
                                    paddingLeft: indentationFromDepth(
                                        self.props.depth,
                                    ),
                                }}
                            >
                                <span> [ show unmodified ] </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

type Entry = {
    after: string;
    before: string;
    children: Entry[];
    key: string;
    status: "unchanged" | "added" | "removed" | "changed";
};

type DiffEntryProps = {
    depth: number;
    entry: Entry;
    expanded?: boolean;
};

type DiffEntryState = {
    expanded: boolean;
};
// Component representing a single property that may be nested.
class DiffEntry extends React.Component<DiffEntryProps, DiffEntryState> {
    static defaultProps = {
        depth: 0,
    };

    state = {
        expanded: this.props.expanded ?? false,
    };

    expand = () => {
        this.setState({expanded: true});
    };

    render(): React.ReactNode {
        const entry = this.props.entry;
        const propertyDeleted = entry.status === "removed";
        const propertyAdded = entry.status === "added";
        const propertyChanged = entry.status === "changed";

        const hasChildren = entry.children.length > 0;

        const leftClass = classNames({
            removed: propertyDeleted || (propertyChanged && !hasChildren),
            dark: propertyDeleted,
            "blank-space": propertyAdded,
        });

        const rightClass = classNames({
            added: propertyAdded || (propertyChanged && !hasChildren),
            dark: propertyAdded,
            "blank-space": propertyDeleted,
        });

        let shownChildren;
        if (this.state.expanded) {
            shownChildren = entry.children;
        } else {
            shownChildren = _(entry.children).select(function (child) {
                return child.status !== UNCHANGED;
            });
        }

        let collapsed = shownChildren.length < entry.children.length;

        // don't hide just one entry
        if (entry.children.length === shownChildren.length + 1) {
            shownChildren = entry.children;
            collapsed = false;
        }

        const self = this;
        return (
            <div>
                {entry.key && (
                    <div style={{clear: "both"}}>
                        <DiffSide
                            side={BEFORE}
                            className={leftClass}
                            depth={this.props.depth}
                            propKey={entry.key}
                            showKey={!propertyAdded}
                            value={entry.before}
                        />
                        <DiffSide
                            side={AFTER}
                            className={rightClass}
                            depth={this.props.depth}
                            propKey={entry.key}
                            showKey={!propertyDeleted}
                            value={entry.after}
                        />
                    </div>
                )}
                {_.map(shownChildren, function (child) {
                    return (
                        <DiffEntry
                            key={child.key}
                            depth={self.props.depth + 1}
                            entry={child}
                            expanded={self.state.expanded}
                        />
                    );
                })}
                {collapsed && (
                    <CollapsedRow
                        depth={this.props.depth + 1}
                        onClick={this.expand}
                    />
                )}
            </div>
        );
    }
}

type ImageWidgetDiffProps = {
    after: ImageWidget;
    before: ImageWidget;
};

// For image widgets, show the actual image
class ImageWidgetDiff extends React.Component<ImageWidgetDiffProps> {
    static propTypes = {
        after: PropTypes.shape({
            options: PropTypes.objectOf(PropTypes.any),
        }).isRequired,
        before: PropTypes.shape({
            options: PropTypes.objectOf(PropTypes.any),
        }).isRequired,
    };

    render(): React.ReactNode {
        const {before, after} = this.props;
        const beforeSrc = before.options?.backgroundImage?.url
            ? before.options.backgroundImage.url
            : "";
        const afterSrc = after.options?.backgroundImage?.url
            ? after.options.backgroundImage.url
            : "";
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
                            {/* @ts-expect-error - TS2741 - Property 'alt' is missing in type '{ src: any; title: any; }' but required in type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "children" | "height" | "width" | "title" | "alt" | "trackInteraction" | "preloader" | "allowFullBleed" | "extraGraphie" | "overrideAriaHidden">'. */}
                            <SvgImage
                                src={beforeSrc}
                                title={beforeSrc}
                                allowZoom={false}
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
                            {/* @ts-expect-error - TS2741 - Property 'alt' is missing in type '{ src: any; title: any; }' but required in type 'Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "children" | "height" | "width" | "title" | "alt" | "trackInteraction" | "preloader" | "allowFullBleed" | "extraGraphie" | "overrideAriaHidden">'. */}
                            <SvgImage
                                src={afterSrc}
                                title={afterSrc}
                                allowZoom={false}
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
    type?: PerseusWidget["type"];
};

class WidgetDiff extends React.Component<WidgetDiffProps> {
    static defaultProps: any = {
        after: {},
        before: {},
        type: "",
    };

    render(): React.ReactNode {
        const {after, before, title, type} = this.props;
        const diff = performDiff(before, after);
        return (
            <div>
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
            </div>
        );
    }
}

export default WidgetDiff;
