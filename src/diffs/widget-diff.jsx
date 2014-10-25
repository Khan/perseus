var cx = React.addons.classSet;
var performDiff = require("./widget-diff-performer.jsx");

var indentationFromDepth = function(depth) {
    return (depth - 1) * 20;
};

var BEFORE = "before";
var AFTER = "after";

var UNCHANGED = "unchanged";

var DiffSide = React.createClass({
    propTypes: {
        side: React.PropTypes.oneOf([BEFORE, AFTER]).isRequired,
        className: React.PropTypes.string.isRequired,
        showKey: React.PropTypes.bool.isRequired,
        propKey: React.PropTypes.string.isRequired,
        value: React.PropTypes.string,
        depth: React.PropTypes.number.isRequired
    },

    render: function() {
        var className = this.props.className + " " + cx({
            "diff-row": true,
            before: this.props.side === BEFORE,
            after: this.props.side === AFTER
        });
        return <div className={className} >
            <div style={{
                paddingLeft: indentationFromDepth(this.props.depth)
            }} >
                {this.props.showKey && this.props.propKey + ": "}
                <span className={"inner-value dark " + this.props.className} >
                    {this.props.value}
                </span>
            </div>
        </div>;
    }
});

var CollapsedRow = React.createClass({
    propTypes: {
        depth: React.PropTypes.number,
        onClick: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            depth: 0
        };
    },

    render: function() {
        var self = this;
        return <div onClick={self.props.onClick}>
            {_.map([BEFORE, AFTER], function(side) {
                return <div className={"diff-row collapsed " + side}
                    key={side} >
                        <div style={{
                            paddingLeft: indentationFromDepth(self.props.depth)
                        }}>
                        <span> [ show unmodified ] </span>
                    </div>
                </div>;
            })}
        </div>;
    }
});

// Component representing a single property that may be nested.
var DiffEntry = React.createClass({
    propTypes: {
        entry: React.PropTypes.shape({
            key: React.PropTypes.string,
            children: React.PropTypes.array,
            before: React.PropTypes.string,
            after: React.PropTypes.string
        }),
        depth: React.PropTypes.number,
        expanded: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            depth: 0
        };
    },

    getInitialState: function() {
        return {
            expanded: this.props.expanded
        };
    },

    render: function() {
        var entry = this.props.entry;
        var propertyDeleted = entry.status === "removed";
        var propertyAdded   = entry.status === "added";
        var propertyChanged = entry.status === "changed";

        var hasChildren = entry.children.length > 0;

        var leftClass = cx({
            "removed": (propertyDeleted || propertyChanged) && !hasChildren,
            "dark": propertyDeleted,
            "blank-space": propertyAdded
        });

        var rightClass = cx({
            "added": (propertyAdded || propertyChanged) && !hasChildren,
            "dark": propertyAdded,
            "blank-space": propertyDeleted
        });

        var shownChildren;
        if (this.state.expanded) {
            shownChildren = entry.children;
        } else {
            shownChildren = _(entry.children).select(function(child) {
                return child.status !== UNCHANGED;
            });
        }

        var collapsed = shownChildren.length < entry.children.length;

        // don't hide just one entry
        if (entry.children.length === shownChildren.length + 1) {
            shownChildren = entry.children;
            collapsed = false;
        }

        var self = this;
        return <div>
            {entry.key && <div>
            <DiffSide
                side={BEFORE}
                className={leftClass}
                depth={this.props.depth}
                propKey={entry.key}
                showKey={!propertyAdded}
                value={entry.before} />
            <DiffSide
                side={AFTER}
                className={rightClass}
                depth={this.props.depth}
                propKey={entry.key}
                showKey={!propertyDeleted}
                value={entry.after} />
            </div>}
            {_.map(shownChildren, function(child) {
                return <DiffEntry
                    key={child.key}
                    depth={self.props.depth + 1}
                    entry={child}
                    expanded={self.state.expanded} />;
            })}
            {collapsed &&
                <CollapsedRow
                    depth={this.props.depth + 1}
                    onClick={this.expand} />}
        </div>;
    },

    expand: function() {
        this.setState({ expanded: true });
    }
});

var WidgetDiff = React.createClass({
    propTypes: {
        before: React.PropTypes.shape({
            options: React.PropTypes.object
        }).isRequired,
        after: React.PropTypes.shape({
            options: React.PropTypes.object
        }).isRequired,
        title: React.PropTypes.string.isRequired
    },

    render: function() {
        var diff = performDiff(this.props.before,
                               this.props.after);
        return <div>
            <div className="ui-helper-clearfix">
                <DiffEntry entry={diff} />
            </div>
        </div>;
    }
});

module.exports = WidgetDiff;
