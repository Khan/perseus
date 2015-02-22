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
            count += Util.countOccurences(this.props.question.content, searchString);
        }

        if (this.props.hints) {
            this.props.hints.forEach(hint => {
                count += Util.countOccurences(hint.content, searchString);
            });
        }

        if (this.props.particle) {
            var particle = this.props.particle;
            if (Array.isArray(particle)) {
                particle.forEach(section => {
                    if (section.content) {
                        count += Util.countOccurences(section.content, searchString);
                    }
                });
            } else {
                if (particle.content) {
                    count += Util.countOccurences(particle.content, searchString);
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
        var searchString = this.props.searchString;
        var replaceString = this.state.replaceString;

        var question = this.props.question;
        var hints = this.props.hints;
        var particle = this.props.particle;

        var regex = new RegExp(searchString, "g");

        if (question) {
            question.content = question.content.replace(regex, replaceString);
        }

        if (hints) {
            hints.forEach(hint => {
                hint.content = hint.content.replace(regex, replaceString);
            });
        }

        if (particle) {
            if (Array.isArray(particle)) {
                particle.forEach(section => {
                    section.content = section.content.replace(regex, replaceString);
                });
            } else {
                particle.content = particle.content.replace(regex, replaceString);
            }
        }

        // handle the case where the replaceString contains one or more copies
        // of searchString
        // TODO(kevinb7) this is quite right
        var searchResultCount = this.getSearchResultCount(searchString);

        this.setState({ searchResultCount });
        this.props.onChange({ question, hints, json: particle, searchIndex: 0 });
    },

    handleReplace() {
        var searchIndex = this.props.searchIndex;
        var searchString = this.props.searchString;
        var replaceString = this.state.replaceString;

        var question = this.props.question;
        var hints = this.props.hints;
        var particle = this.props.particle;

        var regex = new RegExp(searchString, "g");
        var replaced = false;
        var globalIndex = 0;

        if (!replaced && question) {
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
        }

        if (!replaced && hints) {
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

        if (!replaced && particle) {
            if (Array.isArray(particle)) {
                particle.forEach(section => {
                    if (replaced) {
                        return;
                    }
                    section.content = section.content.replace(regex, match => {
                        if (!replaced && globalIndex === searchIndex) {
                            replaced = true;
                            globalIndex ++;
                            return replaceString;
                        } else {
                            globalIndex ++;
                            return match;
                        }
                    });
                })
            } else {
                particle.content = particle.content.replace(regex, match => {
                    if (!replaced && globalIndex === searchIndex) {
                        replaced = true;
                        globalIndex ++;
                        return replaceString;
                    } else {
                        globalIndex ++;
                        return match;
                    }
                });
            }
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
                    type="text"
                    value={this.props.searchString}
                    onChange={this.updateSearchString}
                    style={inputStyle} />
                <br />
                <input
                    type="text"
                    value={this.props.replaceString}
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
