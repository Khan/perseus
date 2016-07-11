/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, object-curly-spacing, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var classNames = require("classnames");
var React = require("react");
const _ = require("underscore");

var diff = require("../../lib/jsdiff");
var splitDiff = require("./split-diff.jsx");
var stringArrayDiff = require("./string-array-diff.jsx");

var BEFORE = "before";
var AFTER = "after";

var IMAGE_REGEX = /http.*?\.png/g;

var imagesInString = function(str) {
    return str.match(IMAGE_REGEX) || [];
};

var classFor = function(entry, ifAdded, ifRemoved) {
    if (entry.added) {
        return ifAdded;
    } else if (entry.removed) {
        return ifRemoved;
    } else {
        return "";
    }
};

var ImageDiffSide = React.createClass({
    propTypes: {
        side: React.PropTypes.oneOf([BEFORE, AFTER]).isRequired,
        images: React.PropTypes.array.isRequired
    },

    render: function() {
        return <div>
            {this.props.images.length > 0 &&
                <div className="diff-header">Images</div>}
            {_.map(this.props.images, (entry, index) => {
                var className = classNames({
                    "image": true,
                    "image-unchanged": entry.status === "unchanged",
                    "image-added": entry.status === "added",
                    "image-removed": entry.status === "removed"
                });
                return <div key={index}>
                    <img src={entry.value}
                        title={entry.value}
                        className={className} />
                </div>;
            })}
        </div>;
    }
});

var TextDiff = React.createClass({
    propTypes: {
        before: React.PropTypes.string,
        after: React.PropTypes.string,
        title: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            before: "",
            after: "",
            title: ""
        };
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

        const beforeImages = imagesInString(this.props.before);
        const afterImages = imagesInString(this.props.after);

        var images = stringArrayDiff(beforeImages, afterImages);

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

        var className = classNames({
            "diff-row": true,
            "collapsed": this.state.collapsed
        });

        return <div>
            <div className="perseus-clearfix">
                {_.map([BEFORE, AFTER], (side, index) => {
                    return <div className={"diff-row " + side} key={index}>
                        {!this.state.collapsed &&
                            _.map(renderedLines, (line, lineNum) => {
                                var changed = line[side].length > 1;
                                var lineClass = classNames({
                                    "diff-line": true,
                                    "added": side === AFTER && changed,
                                    "removed": side === BEFORE && changed
                                });
                                return <div
                                    className={lineClass}
                                    key={lineNum}
                                >
                                    {line[side]}
                                </div>;
                            })}
                         {!this.state.collapsed &&
                             <ImageDiffSide
                                 side={side}
                                 images={images[side]} />}
                    </div>;
                })}
            </div>
            {_.map([BEFORE, AFTER], (side, index) => {
                return <div
                    className={className + " " + side}
                    key={index}
                    onClick={this.handleExpand}
                >
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
