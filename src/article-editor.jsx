var React = require('react');
var _ = require("underscore");

var ApiOptions = require("./perseus-api.jsx").Options;
var ArticleRenderer = require("./article-renderer.jsx");
var Editor = require("./editor.jsx");
var EnabledFeatures = require("./enabled-features.jsx");
var JsonEditor = require("./json-editor.jsx");
var Renderer = require("./renderer.jsx");
var Util = require("./util.js");

var rendererProps = React.PropTypes.shape({
    content: React.PropTypes.string,
    widgets: React.PropTypes.object,
    images: React.PropTypes.object,
});

var SectionControlButton = React.createClass({
    render: function() {
        return <a
                href="#"
                className={
                    "section-control-button " +
                    "simple-button " +
                    "simple-button--small " +
                    "orange"
                }
                onClick={(e) => {
                    e.preventDefault();
                    this.props.onClick();
                }}>
            <span className={this.props.icon} />
        </a>;
    }
});

var ArticleEditor = React.createClass({

    propTypes: {
        json: React.PropTypes.oneOfType([
            rendererProps,
            React.PropTypes.arrayOf(rendererProps)
        ]),
        apiOptions: React.PropTypes.object,
        developerMode: React.PropTypes.bool,
        enabledFeatures: EnabledFeatures.propTypes,
        imageUploader: React.PropTypes.func,
        onChange: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            developerMode: false,
            json: [{}],
            enabledFeatures: {
                toolTipFormats: true,
                useMathQuill: true
            },
        };
    },

    getInitialState: function() {
        return {
            mode: "edit"
        };
    },

    render: function() {

        return <div className="framework-perseus perseus-article">
            <div>
                <label>
                    Mode:{" "}
                    <select
                            value={this.state.mode}
                            onChange={this._changeMode}>
                        <option value="edit">Edit</option>
                        <option value="preview">Preview</option>
                        {this.props.developerMode &&
                            <option value="json">
                                Dev-only JSON
                            </option>
                        }
                    </select>
                </label>
            </div>

            {(this.state.mode === "edit") &&
                this._renderEditor()
            }

            {(this.state.mode === "preview") &&
                this._renderPreviewMode()
            }

            {(this.props.developerMode && this.state.mode === "json") &&
                <div>
                    <JsonEditor
                        multiLine={true}
                        value={this.props.json}
                        onChange={this._handleJsonChange} />
                </div>
            }
        </div>;
    },

    _sections: function() {
        return _.isArray(this.props.json) ?
            this.props.json :
            [this.props.json];
    },

    _renderEditor: function() {
        return <div>
            {this._renderSections()}
            {this._renderAddSection()}
        </div>;
    },

    _renderSections: function() {
        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions
        );

        var sections = this._sections();
        var searchIndex = this.props.searchIndex;
        var searchString = this.props.searchString;

        var adjustedSearchIndices = _.map(sections, section => {
            var adjustedIndex = searchIndex;
            var content = section.content || "";
            searchIndex -= Util.countOccurrences(content, searchString);
            return adjustedIndex;
        });

        return <div className="perseus-editor-table">
            {sections.map((section, i) => {
                return [
                    <div className="perseus-editor-row">
                        <div className="perseus-editor-left-cell">
                            <div className="pod-title">
                                Section {i+1}
                                <div style={{
                                    display: "inline-block",
                                    float: "right"
                                }}>
                                    {(i + 1 < sections.length) &&
                                        <SectionControlButton
                                            icon="icon-circle-arrow-down"
                                            onClick={() => {
                                                this._handleMoveSectionLater(i);
                                            }} />
                                    }
                                    {(i > 0) &&
                                        <SectionControlButton
                                            icon="icon-circle-arrow-up"
                                            onClick={() => {
                                                this._handleMoveSectionEarlier(i);
                                            }} />
                                    }
                                    <SectionControlButton
                                        icon="icon-trash"
                                        onClick={() => {
                                            var msg = "Are you sure you " +
                                                "want to remove section " +
                                                (i + 1) + "?";
                                            if (confirm(msg)) {
                                                this._handleRemoveSection(i);
                                            }
                                        }} />
                                    <SectionControlButton
                                        icon="icon-plus"
                                        onClick={() => {
                                            this._handleAddSectionAfter(i);
                                        }} />
                                </div>
                            </div>
                            <Editor
                                {...section}
                                ref={"editor" + i}
                                placeholder="Type your section text here..."
                                imageUploader={this.props.imageUploader}
                                onChange={
                                    _.partial(this._handleEditorChange, i)
                                }
                                apiOptions={apiOptions}
                                enabledFeatures={this.props.enabledFeatures}
                                searchString={searchString}
                                searchIndex={adjustedSearchIndices[i]} />
                        </div>

                        <div className="perseus-editor-right-cell">
                            <Renderer
                                {...section}
                                ref={"renderer" + i}
                                apiOptions={apiOptions}
                                enabledFeatures={this.props.enabledFeatures} />
                        </div>
                    </div>
                ];
            })}
        </div>;
    },

    _renderAddSection: function() {
        return <div className="perseus-editor-row">
            <div className="perseus-editor-left-cell">
                <a href="#" className="simple-button orange"
                        onClick={() => {
                            this._handleAddSectionAfter(
                                this._sections().length - 1
                            );
                        }}>
                    <span className="icon-plus" /> Add a section
                </a>
            </div>
            <div className="perseus-editor-right-cell" />
        </div>;
    },

    _renderPreviewMode: function() {
        return <ArticleRenderer
            json={this.props.json}
            apiOptions={this.props.apiOptions}
            enabledFeatures={this.props.enabledFeatures} />;
    },

    _changeMode: function(e) {
        var newMode = e.target.value;
        this.props.onChange({
            json: this.serialize()
        }, () => {
            this.setState({mode: newMode});
        });
    },

    _handleJsonChange: function(newJson) {
        this.props.onChange({json: newJson});
    },

    _handleEditorChange: function(i, newProps) {
        var sections = _.clone(this._sections());
        sections[i] = _.extend({}, sections[i], newProps);
        this.props.onChange({json: sections});
    },

    _handleMoveSectionEarlier: function(i) {
        if (i === 0) {
            return;
        }
        var sections = _.clone(this._sections());
        var section = sections[i];
        sections.splice(i, 1);
        sections.splice(i - 1, 0, section);
        this.props.onChange({
            json: sections
        });
    },

    _handleMoveSectionLater: function(i) {
        var sections = _.clone(this._sections());
        if (i + 1 === sections.length) {
            return;
        }
        var section = sections[i];
        sections.splice(i, 1);
        sections.splice(i + 1, 0, section);
        this.props.onChange({
            json: sections
        });
    },

    _handleAddSectionAfter: function(i) {
        // We do a full serialization here because we
        // might be copying widgets:
        var sections = _.clone(this.serialize());
        // Here we do magic to allow you to copy-paste
        // things from the previous section into the new
        // section while preserving widgets.
        // To enable this, we preserve the widgets
        // object for the new section, but wipe out
        // the content.
        var newSection = (i >= 0) ? {
            widgets: sections[i].widgets
        } : {};
        sections.splice(i + 1, 0, newSection);
        this.props.onChange({
            json: sections
        });
    },

    _handleRemoveSection: function(i) {
        var sections = _.clone(this._sections());
        sections.splice(i, 1);
        this.props.onChange({
            json: sections
        });
    },

    serialize: function() {
        if (this.state.mode === "edit") {
            return this._sections().map((section, i) => {
                return this.refs["editor" + i].serialize();
            });
        } else if (this.state.mode === "preview" ||
                this.state.mode === "json") {
            return this.props.json;
        } else {
            throw new Error("Could not serialize; mode " +
                this.state.mode + " not found"
            );
        }
    },
});

module.exports = ArticleEditor;
