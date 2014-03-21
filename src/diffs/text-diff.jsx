/** @jsx React.DOM */

var diff = require("../../lib/jsdiff");
var splitDiff = require("./split-diff.jsx");

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

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            collapsed: nextProps.before === nextProps.after
        });
    },

    render: function() {
        var diffed = diff.diffWords(this.props.before, this.props.after);

        var lines = splitDiff(diffed);

        var renderedLines = _.map(lines, (line) => {
            var contents = {};

            contents.before = _(line).map(function(entry, i) {
                var className = classFor(entry, "not-present", "removed dark");
                return <span
                    key={i}
                    className={className}>{entry.value}</span>;
            });

            contents.after = _(line).map(function(entry, i) {
                var className = classFor(entry, "added dark", "not-present");
                return <span
                    key={i}
                    className={className}>{entry.value}</span>;
            });
            return contents;
        });

        var className = cx({
            "diff-row": true,
            "collapsed": this.state.collapsed
        });

        return <div>
            <div className="ui-helper-clearfix">
                {_.map([BEFORE, AFTER], side => {
                    return <div className={"diff-row " + side} >
                        {!this.state.collapsed &&
                            _.map(renderedLines, (line) => {
                                var changed = line[side].length > 1;
                                var lineClass = cx({
                                    "diff-line": true,
                                    "added": side === AFTER && changed,
                                    "removed": side === BEFORE && changed
                                });
                                return <div className={lineClass} >
                                    {line[side]}
                                </div>;
                            })}
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
                </div>;
            })}
        </div>;
    },

    handleExpand: function() {
        this.setState({ collapsed: false });
    }
});

module.exports = TextDiff;
