/** @jsx React.DOM */

var React = require('react');
var Util = require("./util.js");

var SearchAndReplaceDialog = React.createClass({

    getInitialState() {
        return {
            searchString: "",
            replaceString: "",
            searchIndex: 0
        }
    },

    updateSearchValue(event) {
        var searchString = event.target.value;

        this.setState({ searchString });
        this.props.onChange({
            searchString, searchIndex: 0
        });
    },

    updateReplaceValue(event) {
        this.setState({ replaceString: event.target.value });
    },

    getTotalSearchCount: function() {
        var count = 0;

        count += Util.countOccurences(this.props.question.content, this.state.searchString);
        count += Util.countOccurences(this.props.answerArea.options.content, this.state.searchString);
        this.props.hints.forEach(hint => {
            count += Util.countOccurences(hint.content, this.state.searchString);
        });

        return count;
    },

    handleNextSearchResult() {
        var searchIndex = this.state.searchIndex;
        searchIndex ++;
        searchIndex = searchIndex % this.getTotalSearchCount();

        this.setState({ searchIndex }); // TODO: have a current of total indicator
        this.props.onChange({ searchIndex });
    },

    handlePreviousSearchResult() {
        var searchIndex = this.state.searchIndex;
        searchIndex --;
        if (searchIndex < 0) {
            searchIndex = this.getTotalSearchCount() - 1;
        }

        this.setState({ searchIndex });
        this.props.onChange({ searchIndex });
    },

    handleReplaceAll: function () {
        // TODO: replace results in answerArea
        var searchString = this.state.searchString;
        var replaceString = this.state.replaceString;

        var question = this.props.question;
        var hints = this.props.hints;

        var regex = new RegExp(searchString, "g");

        question.content = question.content.replace(regex, replaceString);
        hints.forEach(hint => {
            hint.content = hint.content.replace(regex, replaceString)
        });

        this.props.onReplaceAll({ question, hints });
    },

    render() {
        var style = {
            padding: '10px',
            position: 'fixed',
            right: 0,
            top: 0,
            width: '300px',
            backgroundColor: '#EEE',
            border: 'solid 1px #DDD',
            zIndex: 100
        };

        var labelStyle = {
            display: 'inline-block',
            float: 'right',
            textAlign: 'right',
            width: '60px',
            marginRight: '8px'
        };

        var inputStyle = {
            display: 'inline-block',
            float: 'right',
            clear: 'right',
            width: '220px'
        };

        var buttonStyle = {
            float: 'right',
            marginLeft: '8px'
        };

        return <div style={style}>
            <div style={{ overflow: 'auto' }}>
                <input
                    type="text"
                    value={this.state.searchString}
                    onChange={this.updateSearchValue}
                    style={inputStyle} />
                <label style={labelStyle}>Search:</label>

                <input
                    type="text"
                    value={this.state.replaceString}
                    onChange={this.updateReplaceValue}
                    style={inputStyle} />
                <label style={labelStyle}>Replace:</label>

            </div>
            <div style={{ overflow: 'auto', marginTop: '8px' }}>
                <button style={buttonStyle} onClick={this.handleReplaceAll}>Replace All</button>
                <button style={buttonStyle} onClick={this.handleNextSearchResult}>Next</button>
                <button style={buttonStyle} onClick={this.handlePreviousSearchResult}>Previous</button>
                <button style={buttonStyle} disabled>Replace</button>
            </div>
        </div>;
    }

});

module.exports = SearchAndReplaceDialog;
