/** @jsx React.DOM */

var React = require('react');
var Util = require("./util.js");

var SearchAndReplaceDialog = React.createClass({

    getDefaultProps: function() {
        return {
            onSearchChange() {},    // TODO: throw an error
            onDocumentChange() {}
        };
    },

    getInitialState() {
        return {
            searchString: "",
            replaceString: "",
            searchIndex: 0,
            searchResultCount: 0
        }
    },

    updateSearchString(event) {
        var searchIndex = 0;
        var searchString = event.target.value;
        var searchResultCount = this.getSearchResultCount(searchString);

        this.setState({ searchString, searchIndex, searchResultCount });
        this.props.onSearchChange({ searchString, searchIndex });
    },

    updateReplaceString(event) {
        this.setState({ replaceString: event.target.value });
    },

    updateSearchResults() {
        var searchIndex = 0;
        var searchResultCount = this.getSearchResultCount(this.state.searchString);

        this.setState({ searchResultCount, searchIndex });
        this.props.onSearchChange({ searchIndex });
    },

    getSearchResultCount(searchString) {
        if (searchString === "") {
            return 0;
        }

        var count = 0;

        count += Util.countOccurences(this.props.question.content, searchString);
        this.props.hints.forEach(hint => {
            count += Util.countOccurences(hint.content, searchString);
        });

        return count;
    },

    handleNextSearchResult() {
        var searchIndex = this.state.searchIndex;
        searchIndex ++;
        searchIndex = searchIndex % this.state.searchResultCount;

        this.setState({ searchIndex }); // TODO: have a current of total indicator
        this.props.onSearchChange({ searchIndex });
    },

    handlePreviousSearchResult() {
        var searchIndex = this.state.searchIndex;
        searchIndex --;
        if (searchIndex < 0) {
            searchIndex = this.state.searchResultCount - 1;
        }

        this.setState({ searchIndex });
        this.props.onSearchChange({ searchIndex });
    },

    handleReplaceAll() {
        var searchString = this.state.searchString;
        var replaceString = this.state.replaceString;

        var question = this.props.question;
        var hints = this.props.hints;

        var regex = new RegExp(searchString, "g");

        question.content = question.content.replace(regex, replaceString);
        hints.forEach(hint => {
            hint.content = hint.content.replace(regex, replaceString)
        });

        // handle the case where the replaceString contains one or more copies
        // of searchString
        // TODO(kevinb7) this is quite right
        var searchResultCount = this.getSearchResultCount(searchString);

        this.setState({ searchIndex: 0, searchResultCount });
        this.props.onDocumentChange({ question, hints });
    },

    handleReplace() {
        var searchIndex = this.state.searchIndex;
        var searchString = this.state.searchString;
        var replaceString = this.state.replaceString;

        var question = this.props.question;
        var hints = this.props.hints;

        var regex = new RegExp(searchString, "g");
        var replaced = false;
        var globalIndex = 0;

        question.content = question.content.replace(regex, match => {
            if (!replaced && globalIndex === searchIndex) {
                replaced = true;
                globalIndex ++;
                return replaceString;
            } else {
                globalIndex ++;
                return match;
            }
        });

        if (!replaced) {
            hints.forEach(hint => {
                if (replaced) {
                    return;
                }
                hint.content = hint.content.replace(regex, match => {
                    if (!replaced && globalIndex === searchIndex) {
                        replaced = true;
                        globalIndex ++;
                        return replaceString;
                    } else {
                        globalIndex ++;
                        return match;
                    }
                });
            });
        }

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

        this.setState({ searchIndex, searchResultCount });
        this.props.onSearchChange({ searchIndex });
        this.props.onDocumentChange({ question, hints });
    },

    render() {
        var disabled = this.state.searchResultCount === 0;

        var displayIndex = this.state.searchIndex + 1;
        var displayCount = this.state.searchResultCount;
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
                    type="text"
                    value={this.state.searchString}
                    onChange={this.updateSearchString}
                    style={inputStyle} />
                <br />
                <input
                    type="text"
                    value={this.state.replaceString}
                    onChange={this.updateReplaceString}
                    style={inputStyle} />
                <br />
                <div>
                    <button
                        style={{ float: 'left', marginRight: gridSpace }}
                        onClick={this.handlePreviousSearchResult}
                        disabled={disabled}>&lt;</button>
                    <button
                        style={{ float: 'left'}}
                        onClick={this.handleNextSearchResult}
                        disabled={disabled}>&gt;</button>

                    <button
                        style={{ float: 'right', marginLeft: gridSpace }}
                        onClick={this.handleReplaceAll}
                        disabled={disabled}>Replace All</button>
                    <button
                        style={{ float: 'right' }}
                        onClick={this.handleReplace}
                        disabled={disabled}>Replace</button>
                </div>
            </div>
        </div>;
    }

});

module.exports = SearchAndReplaceDialog;
