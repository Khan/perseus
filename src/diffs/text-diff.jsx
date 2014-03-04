var diff = require("../../lib/jsdiff");
var cx = React.addons.classSet;

var BEFORE = "before";
var AFTER = "after";

var classFor = function(entry, ifAdded, ifRemoved) {
    if (entry.added) {
        return ifAdded;
    } else if (entry.removed) {
        return ifRemoved;
    } else {
        return "";
    }
};

var TextDiff = React.createClass({
    propTypes: {
        before: React.PropTypes.string.isRequired,
        after: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            collapsed: this.props.before === this.props.after
        };
    },
    render: function() {
        var diffed = diff.diffWords(this.props.before, this.props.after);

        var contents = {};

        contents.before = _(diffed).map(function(entry) {
            var className = classFor(entry, "not-present", "removed dark");
            return <span
                key={entry.value}
                className={className}>{entry.value}</span>;
        });

        contents.after = _(diffed).map(function(entry) {
            var className = classFor(entry, "added dark", "not-present");
            return <span
                key={entry.value}
                className={className}>{entry.value}</span>;
        });

        var className = cx({
            "diff-header": true,
            "diff-row": true,
            "collapsed": this.state.collapsed
        });

        return <div>
            <div className="ui-helper-clearfix">
                <div className="diff-header">
                    {this.props.title}
                </div>
                {_.map([BEFORE, AFTER], side => {
                    return <div className={"diff-row " + side} >
                        {!this.state.collapsed && contents[side]}
                        </div>;
                })}
            </div>
            {_.map([BEFORE, AFTER], side => {
                return <div className={className + " " + side}
                    onClick={this.handleExpand} >
                    {this.state.collapsed &&
                    <span>
                        <span className="expand-button" >
                            {" "}[ show unmodified ]
                        </span>
                    </span>}
                </div>
            })}
        </div>;
    },
    handleExpand: function() {
        this.setState({ collapsed: false });
    }
});

module.exports = TextDiff;
