/** @jsx React.DOM */

var React = require('react');

var SearchAndReplaceDialog = React.createClass({

    getInitialState() {
        return {
            searchString: "",
            replaceString: "",
            searchIndex: 0
        }
    },

    updateSearchValue(event) {
        this.setState({ searchString: event.target.value });
        this.props.onSearchStringChange(event.target.value, this.state.searchIndex);
    },
    
    updateSearchIndex() {
        var searchIndex = this.state.searchIndex;
        searchIndex ++;
        this.setState({ searchIndex });
        this.props.onSearchStringChange(this.state.searchString, searchIndex);
    },
    
    updateReplaceValue(event) {
        this.setState({ replaceString: event.target.value });
    },

    handleReplaceAll: function () {
        this.props.onReplaceAll(this);
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
                results: {this.state.count}
                <button style={buttonStyle} onClick={this.handleReplaceAll}>Replace All</button>
                <button style={buttonStyle} onClick={this.updateSearchIndex}>Next</button>
                <button style={buttonStyle} disabled>Replace</button>
            </div>
        </div>;
    }

});

module.exports = SearchAndReplaceDialog;
