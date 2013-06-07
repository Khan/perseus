/** @jsx React.DOM */
(function(Perseus) {

var Table = React.createClass({
    render: function() {
        var headers = this.props.headers;
        console.log('rendering table');
        return <table>
            <thead>
                <tr>{
                    headers.map(function(header) {
                        return <th>{header}</th>;
                    })
                }
                </tr>
            </thead>
            <tbody>{
                _(this.props.rows).times(function(r) {
                    return <tr>{
                        headers.map(function(c) {
                            return <td>
                                <input
                                    type="text"
                                    />
                            </td>;
                        })
                    }</tr>;
                })
            }
            </tbody>
        </table>;
    },
});

var TableEditor = React.createClass({
    getInitialState: function() {
        return {
            headers: [""],
            rows: 4
        };
    },

    render: function() {
        return <div>
            Column headers:
            <ul>{
                this.state.headers.map(function (header, i) {
                    return <li>
                        <input
                            ref={"header" + i}
                            type="text"
                            value={header}
                            onKeyUp={this.headerKeyUp} />
                    </li>;
                }, this)
            }</ul>
            <div>
                <a href="#" onClick={this.addHeader}>Add column</a>
            </div>
            <div>
                <label>
                    <input
                        ref="numberOfRows"
                        type="text"
                        value={this.state.rows}
                        onKeyUp={this.rowsKeyUp} />
                </label>
            </div>
        </div>;
    },

    updateState: function (update) {
        this.setState(update);
        this.props.onChange();
    },

    headerKeyUp: React.autoBind(function() {
        var headers = this.state.headers.map(function (header, i) {
            return this.refs["header" + i].getDOMNode().value;
        }, this);
        this.updateState({headers: headers});
    }),

    rowsKeyUp: React.autoBind(function() {
        this.updateState({rows: this.refs.numberOfRows.getDOMNode().value});
    }),

    addHeader: React.autoBind(function() {
        this.state.headers.push("");
        this.updateState({headers: this.state.headers});
    }),

    toJSON: function() {
        return {
            headers: this.state.headers,
            rows: this.state.rows
        };
    },
});

Perseus.Widgets.register("table", Table);
Perseus.Widgets.register("table-editor", TableEditor);

})(Perseus);
