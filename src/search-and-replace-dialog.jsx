/** @jsx React.DOM */

var React = require('react');
var Util = require("./util.js");

var SearchAndReplaceDialog = React.createClass({

    getDefaultProps: function() {
        return {
            onChange() {}    // TODO: throw an error
        };
    },

    getInitialState() {
        return {
            replaceString: "",
            searchResultCount: 0
        }
    },

    updateSearchString(event) {
        var searchIndex = 0;
        var searchString = event.target.value;
        var searchResultCount = this.getSearchResultCount(searchString);

        this.setState({ searchResultCount });
        this.props.onChange({ searchString, searchIndex });
    },

    updateReplaceString(event) {
        this.setState({ replaceString: event.target.value });
    },

    updateSearchResults() {
        var searchIndex = 0;
        var searchResultCount = this.getSearchResultCount(this.props.searchString);

        this.setState({ searchResultCount });
        this.props.onChange({ searchIndex });
    },

    getSearchResultCount(searchString) {
        if (searchString === "") {
            return 0;
        }

        var count = 0;

        if (this.props.question) {
            count += Util.countOccurrences(this.props.question.content, searchString);
        }

        if (this.props.hints) {
            this.props.hints.forEach(hint => {
                count += Util.countOccurrences(hint.content, searchString);
            });
        }

        if (this.props.particle) {
            var particle = this.props.particle;
            if (Array.isArray(particle)) {
                particle.forEach(section => {
                    if (section.content) {
                        count += Util.countOccurrences(section.content, searchString);
                    }
                });
            } else {
                if (particle.content) {
                    count += Util.countOccurrences(particle.content, searchString);
                }
            }
        }

        return count;
    },

    handleNextSearchResult() {
        var searchIndex = this.props.searchIndex;
        searchIndex ++;
        searchIndex = searchIndex % this.state.searchResultCount;

        this.props.onChange({ searchIndex });
    },

    handlePreviousSearchResult() {
        var searchIndex = this.props.searchIndex;
        searchIndex --;
        if (searchIndex < 0) {
            searchIndex = this.state.searchResultCount - 1;
        }

        this.props.onChange({ searchIndex });
    },

    handleReplaceAll() {
        var replaceString = this.state.replaceString;
        var { searchString, question, hints, particle } = this.props;

        var regex = new RegExp(Util.escapeRegExp(searchString), "g");

        var replaceFunc = function(obj) {
            if (obj) {
                if (Array.isArray(obj)) {
                    obj.forEach(replaceFunc);
                } else {
                    // excludes occurrences within widget references
                    var indices = Util.getIndicesOf(obj.content, searchString);
                    obj.content = obj.content.replace(regex, (match, offset) => {
                        // make sure this match isn't inside a widget reference
                        if (indices.indexOf(offset) !== -1) {
                            return replaceString
                        } else {
                            return match;
                        }
                    });
                }
            }
        };

        replaceFunc(question);
        replaceFunc(hints);
        replaceFunc(particle);

        // handle the case where the replaceString contains one or more copies
        // of searchString
        // TODO(kevinb7) this is quite right
        var searchResultCount = this.getSearchResultCount(searchString);

        this.setState({ searchResultCount });
        this.props.onChange({ question, hints, json: particle, searchIndex: 0 });
    },

    handleReplace() {
        var replaceString = this.state.replaceString;
        var { searchIndex, searchString, question, hints, particle } = this.props;

        var regex = new RegExp(searchString, "g");
        var replaced = false;
        var globalIndex = 0;

        var replaceFunc = function(obj) {
            if (!replaced && obj) {
                if (Array.isArray(obj)) {
                    obj.forEach(replaceFunc);
                } else {
                    // excludes occurrences within widget references
                    var indices = Util.getIndicesOf(obj.content, searchString);
                    obj.content = obj.content.replace(regex, (match, offset) => {
                        // make sure this match isn't inside a widget reference
                        if (indices.indexOf(offset) !== -1) {
                            if (!replaced && globalIndex === searchIndex) {
                                replaced = true;
                                globalIndex++;
                                return replaceString;
                            } else {
                                globalIndex++;
                                return match;
                            }
                        } else {
                            return match;
                        }
                    });
                }
            }
        };

        replaceFunc(question);
        replaceFunc(hints);
        replaceFunc(particle);

        var searchResultCount = this.state.searchResultCount;

        if (replaceString.indexOf(searchString) === -1) {
            // normal case: replaceString doesn't contain searchString so we
            // can decrement searchResultCount because we just replaced one 
            // occurence of searchString
            searchResultCount --;
        } else {
            // edge case: replaceString contains one or more instances of
            // searchString which means the searchResultCount will either 
            // stay the same if the number of instances is one or increase
            // if it's more than one
            var matches = replaceString.match(regex);
            if (matches) {
                searchResultCount += matches.length - 1;
            }
        }

        if (searchIndex >= searchResultCount) {
            searchIndex = searchResultCount - 1;
        }

        this.setState({ searchResultCount });
        this.props.onChange({ question, hints, json: particle, searchIndex });
    },

    render() {
        var displayCount = this.state.searchResultCount;
        var disabled = displayCount === 0;

        var displayIndex = this.props.searchIndex + 1;
        if (displayIndex > displayCount) {
            displayIndex = displayCount;
        }

        var gridSpace = 8;

        var style = {
            padding: 10,
            position: 'fixed',
            right: 0,
            top: 0,
            width: 300,
            backgroundColor: '#EEE',
            border: 'solid 1px #DDD',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'row'
        };

        var labelStyle = {
            display: 'inline-block',
            textAlign: 'right',
            width: 60,
            marginRight: gridSpace
        };

        var inputStyle = {
            display: 'inline-block',
            width: '100%',
            boxSizing: 'border-box'
        };

        return <div style={style}>
            <div style={{ flexShrink: 0, flexGrow: 0 }}>
                <label style={labelStyle}>Search:</label>
                <br />
                <label style={labelStyle}>Replace:</label>
                <br />
                <span style={labelStyle}>{displayIndex} of {displayCount}</span>
            </div>
            <div style={{ flexShrink: 0, flexGrow: 1 }}>
                <input
                    ref="searchInput"
                    type="text"
                    value={this.props.searchString}
                    onChange={this.updateSearchString}
                    style={inputStyle} />
                <br />
                <input
                    ref="replaceInput"
                    type="text"
                    value={this.props.replaceString}
                    onChange={this.updateReplaceString}
                    style={inputStyle} />
                <br />
                <div>
                    <button
                        ref="previousButton"
                        style={{ float: 'left', marginRight: gridSpace }}
                        onClick={this.handlePreviousSearchResult}
                        disabled={disabled}>&lt;</button>
                    <button
                        ref="nextButton"
                        style={{ float: 'left'}}
                        onClick={this.handleNextSearchResult}
                        disabled={disabled}>&gt;</button>

                    <button
                        ref="replaceAllButton"
                        style={{ float: 'right', marginLeft: gridSpace }}
                        onClick={this.handleReplaceAll}
                        disabled={disabled}>Replace All</button>
                    <button
                        ref="replaceButton"
                        style={{ float: 'right' }}
                        onClick={this.handleReplace}
                        disabled={disabled}>Replace</button>
                </div>
            </div>
        </div>;
    }

});

module.exports = SearchAndReplaceDialog;
