const classNames = require("classnames");
const React = require("react");
const _ = require("underscore");

const performDiff = require("./widget-diff-performer.jsx");
const SvgImage = require("../components/svg-image.jsx");

const indentationFromDepth = function(depth) {
    return (depth - 1) * 20;
};

const BEFORE = "before";
const AFTER = "after";

const UNCHANGED = "unchanged";

const DiffSide = React.createClass({
    propTypes: {
        className: React.PropTypes.string.isRequired,
        depth: React.PropTypes.number.isRequired,
        propKey: React.PropTypes.string.isRequired,
        showKey: React.PropTypes.bool.isRequired,
        side: React.PropTypes.oneOf([BEFORE, AFTER]).isRequired,
        value: React.PropTypes.string,
    },

    render: function() {
        const className = classNames(this.props.className, {
            "diff-row": true,
            before: this.props.side === BEFORE,
            after: this.props.side === AFTER,
        });
        return <div className={className} >
            <div style={{paddingLeft: indentationFromDepth(this.props.depth)}}>
                {this.props.showKey && this.props.propKey + ": "}
                <span className={"inner-value dark " + this.props.className}>
                    {this.props.value}
                </span>
            </div>
        </div>;
    },
});

const CollapsedRow = React.createClass({
    propTypes: {
        depth: React.PropTypes.number,
        onClick: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            depth: 0,
        };
    },

    render: function() {
        const self = this;
        return <div onClick={self.props.onClick} style={{clear: "both"}}>
            {_.map([BEFORE, AFTER], function(side) {
                return <div
                    className={"diff-row collapsed " + side}
                    key={side}
                >
                    <div
                        style={{paddingLeft:
                            indentationFromDepth(self.props.depth),
                        }}
                    >
                        <span> [ show unmodified ] </span>
                    </div>
                </div>;
            })}
        </div>;
    },
});

// Component representing a single property that may be nested.
const DiffEntry = React.createClass({
    propTypes: {
        depth: React.PropTypes.number,
        entry: React.PropTypes.shape({
            after: React.PropTypes.string,
            before: React.PropTypes.string,
            children: React.PropTypes.array,
            key: React.PropTypes.string,
        }),
        expanded: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            depth: 0,
        };
    },

    getInitialState: function() {
        return {
            expanded: this.props.expanded,
        };
    },

    expand: function() {
        this.setState({expanded: true});
    },

    render: function() {
        const entry = this.props.entry;
        const propertyDeleted = entry.status === "removed";
        const propertyAdded   = entry.status === "added";
        const propertyChanged = entry.status === "changed";

        const hasChildren = entry.children.length > 0;

        const leftClass = classNames({
            "removed": propertyDeleted || (propertyChanged && !hasChildren),
            "dark": propertyDeleted,
            "blank-space": propertyAdded,
        });

        const rightClass = classNames({
            "added": propertyAdded || (propertyChanged && !hasChildren),
            "dark": propertyAdded,
            "blank-space": propertyDeleted,
        });

        let shownChildren;
        if (this.state.expanded) {
            shownChildren = entry.children;
        } else {
            shownChildren = _(entry.children).select(function(child) {
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
        return <div>
            {entry.key && <div style={{clear: "both"}}>
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
            </div>}
            {_.map(shownChildren, function(child) {
                return <DiffEntry
                    key={child.key}
                    depth={self.props.depth + 1}
                    entry={child}
                    expanded={self.state.expanded}
                />;
            })}
            {collapsed &&
                <CollapsedRow
                    depth={this.props.depth + 1}
                    onClick={this.expand}
                />}
        </div>;
    },
});

// For image widgets, show the actual image
const ImageWidgetDiff = React.createClass({
    propTypes: {
        after: React.PropTypes.shape({
            options: React.PropTypes.object,
        }).isRequired,
        before: React.PropTypes.shape({
            options: React.PropTypes.object,
        }).isRequired,
    },

    render: function() {
        const {before, after} = this.props;
        const beforeSrc = (before.options && before.options.backgroundImage) ?
            before.options.backgroundImage.url : "";
        const afterSrc = (after.options && after.options.backgroundImage) ?
            after.options.backgroundImage.url : "";
        return <div>
            <div className="diff-row before">
                {beforeSrc &&
                <div
                    className={classNames({
                        "image": true,
                        "image-unchanged": beforeSrc === afterSrc,
                        "image-removed": beforeSrc !== afterSrc,
                    })}
                >
                    <SvgImage src={beforeSrc} title={beforeSrc} />
                </div>}
            </div>
            <div className="diff-row after">
                {afterSrc &&
                <div
                    className={classNames({
                        "image": true,
                        "image-unchanged": beforeSrc === afterSrc,
                        "image-added": beforeSrc !== afterSrc,
                    })}
                >
                    <SvgImage src={afterSrc} title={afterSrc} />
                </div>}
            </div>
        </div>;
    },
});

const WidgetDiff = React.createClass({
    propTypes: {
        after: React.PropTypes.shape({
            options: React.PropTypes.object,
        }),
        before: React.PropTypes.shape({
            options: React.PropTypes.object,
        }),
        title: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            after: {},
            before: {},
            type: "",
        };
    },

    render: function() {
        const {after, before, title, type} = this.props;
        const diff = performDiff(before, after);
        return <div>
            <div className="diff-header">{title}</div>
            <div className="diff-header">{title}</div>
            <div className="diff-body ui-helper-clearfix">
                {type === "image" &&
                    <ImageWidgetDiff before={before} after={after} />}
                <DiffEntry entry={diff} />
            </div>
        </div>;
    },
});

module.exports = WidgetDiff;
