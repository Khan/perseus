var React = require('react');
var _ = require("underscore");

var ApiOptions = require("./perseus-api.jsx").Options;
var Editor = require("./editor.jsx");
var JsonEditor = require("./json-editor.jsx");
var Renderer = require("./renderer.jsx");

var ArticleEditor = React.createClass({

    propTypes: {
        json: React.PropTypes.shape({
            content: React.PropTypes.string,
            widgets: React.PropTypes.object,
            images: React.PropTypes.object,
        }),
        apiOptions: React.PropTypes.object,
        developerMode: React.PropTypes.bool,
        imageUploader: React.PropTypes.func,
        onChange: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            developerMode: false,
            json: {},
        };
    },

    getInitialState: function() {
        return {
            jsonMode: false 
        };
    },

    render: function() {
        var apiOptions = _.extend({},
                                  ApiOptions.defaults,
                                  this.props.apiOptions);

        return <div id="perseus" className="framework-perseus">
            {this.props.developerMode &&
                <div>
                    <label>
                        Developer JSON Mode:{' '}
                        <input type="checkbox"
                            checked={this.state.jsonMode}
                            onChange={this.toggleJsonMode} />
                    </label>
                </div>
            }

            {this.props.developerMode && this.state.jsonMode &&
                <div>
                    <JsonEditor
                        multiLine={true}
                        value={this.props.json}
                        onChange={this.handleJsonChange} />
                </div>
            }

            {(!this.props.developerMode || !this.state.jsonMode) &&
                <div className="perseus-editor-table">
                    <div className="perseus-editor-row">
                        <div className="perseus-editor-left-cell">
                            <div className="pod-title">Article</div>
                            <Editor
                                {...this.props.json}
                                ref="editor"
                                placeholder="Type your article text here..."
                                imageUploader={this.props.imageUploader}
                                onChange={this.handleEditorChange}
                                apiOptions={apiOptions} />
                        </div>

                        <div className="perseus-editor-right-cell">
                            <Renderer
                                {...this.props.json}
                                ref="renderer"
                                apiOptions={apiOptions} />
                        </div>
                    </div>
                </div>
            }
        </div>;

    },

    toggleJsonMode: function() {
        this.props.onChange({
            json: this.serialize()
        }, () => {
            this.setState({jsonMode: !this.state.jsonMode});
        });
    },

    handleJsonChange: function(newJson) {
        this.props.onChange({json: newJson});
    },

    handleEditorChange: function(newProps) {
        this.props.onChange({json: _.extend({}, this.props.json, newProps)});
    },

    serialize: function() {
        if (this.state.jsonMode) {
            return this.props.json;
        } else {
            return this.refs.editor.serialize();
        }
    }
});

module.exports = ArticleEditor;
