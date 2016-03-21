"use strict";

/**
 * An article editor. Articles are long-form pieces of content, composed of
 * multiple (Renderer) sections concatenated together.
 */

const React = require('react');
const _ = require("underscore");

const ApiOptions = require("./perseus-api.jsx").Options;
const ArticleRenderer = require("./article-renderer.jsx");
const Editor = require("./editor.jsx");
const EnabledFeatures = require("./enabled-features.jsx");
const JsonEditor = require("./json-editor.jsx");

const rendererProps = React.PropTypes.shape({
    content: React.PropTypes.string,
    widgets: React.PropTypes.object,
    images: React.PropTypes.object,
});

const SectionControlButton = React.createClass({
    propTypes: {
        icon: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired,
        title: React.PropTypes.string.isRequired,
    },
    render: function() {
        const { icon, onClick, title } = this.props;
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
                onClick();
            }}
            title={title}
        >
            <span className={icon} />
        </a>;
    },
});

const ArticleEditor = React.createClass({
    propTypes: {
        apiOptions: React.PropTypes.shape({}),
        enabledFeatures: EnabledFeatures.propTypes,
        imageUploader: React.PropTypes.func,
        json: React.PropTypes.oneOfType([
            rendererProps,
            React.PropTypes.arrayOf(rendererProps),
        ]),
        mode: React.PropTypes.oneOf(["diff", "edit", "json", "preview"]),
        onChange: React.PropTypes.func.isRequired,
        screen: React.PropTypes.oneOf(["desktop", "mobile"]),
        sectionImageUploadGenerator: React.PropTypes.func,
        useNewStyles: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            enabledFeatures: {
                toolTipFormats: true,
                useMathQuill: true,
            },
            json: [{}],
            mode: "edit",
            screen: "desktop",
            sectionImageUploadGenerator: () => <span />,
            useNewStyles: false,
        };
    },

    _getPreviewWidth: function() {
        const { screen } = this.props;
        if (screen === "mobile") {
            return 320;
        } else if (screen === "desktop") {
            return 1200;
        } else {
            return "100%";
        }
    },

    _sections: function() {
        return _.isArray(this.props.json) ?
            this.props.json :
            [this.props.json];
    },

    _renderEditor: function() {
        return <div style={{display: "inline-block"}}>
            {this._renderSections()}
            {this._renderAddSection()}
        </div>;
    },

    _renderSections: function() {
        const apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions,
            {
                // Alignment options are always available in article editors
                showAlignmentOptions: true,
                isArticle: true,
            }
        );

        const sections = this._sections();
        const previewWidth = this._getPreviewWidth();

        return <div className="perseus-editor-table">
            {sections.map((section, i) => {
                return [
                    <div className="perseus-editor-row">
                        <div className="perseus-editor-left-cell">
                            <div className="pod-title">
                                Section {i + 1}
                                <div
                                    style={{
                                        display: "inline-block",
                                        float: "right",
                                    }}
                                >
                                    {(i + 1 < sections.length) &&
                                    <SectionControlButton
                                        icon="icon-circle-arrow-down"
                                        onClick={() => {
                                            this._handleMoveSectionLater(i);
                                        }}
                                        title="Move this section down"
                                    />
                                    }
                                    {(i > 0) &&
                                    <SectionControlButton
                                        icon="icon-circle-arrow-up"
                                        onClick={() => {
                                            this._handleMoveSectionEarlier(i);
                                        }}
                                        title="Move this section up"
                                    />
                                    }
                                    <SectionControlButton
                                        icon="icon-trash"
                                        onClick={() => {
                                            const msg = "Are you sure you " +
                                                "want to delete section " +
                                                (i + 1) + "?";
                                            /* eslint-disable no-alert */
                                            if (confirm(msg)) {
                                                this._handleRemoveSection(i);
                                            }
                                            /* eslint-enable no-alert */
                                        }}
                                        title="Delete this section"
                                    />
                                    <SectionControlButton
                                        icon="icon-plus"
                                        onClick={() => {
                                            this._handleAddSectionAfter(i);
                                        }}
                                        title={
                                            "Add a new section after this one"
                                        }
                                    />
                                    {this.props.sectionImageUploadGenerator(i)}
                                </div>
                            </div>
                            <Editor
                                {...section}
                                apiOptions={apiOptions}
                                enabledFeatures={this.props.enabledFeatures}
                                imageUploader={this.props.imageUploader}
                                onChange={
                                    _.partial(this._handleEditorChange, i)
                                }
                                placeholder="Type your section text here..."
                                ref={"editor" + i}
                            />
                        </div>

                        <div
                            className="perseus-editor-right-cell"
                            style={{
                                width: previewWidth,
                                maxWidth: previewWidth,
                            }}
                        >
                            <ArticleRenderer
                                apiOptions={apiOptions}
                                enabledFeatures={this.props.enabledFeatures}
                                json={section}
                                ref={"renderer" + i}
                                useNewStyles={this.props.useNewStyles}
                            />
                        </div>
                    </div>,
                ];
            })}
        </div>;
    },

    _renderAddSection: function() {
        return <div className="perseus-editor-row">
            <div className="perseus-editor-left-cell">
                <a
                    href="#"
                    className="simple-button orange"
                    onClick={() => {
                        this._handleAddSectionAfter(
                            this._sections().length - 1
                        );
                    }}
                >
                    <span className="icon-plus" /> Add a section
                </a>
            </div>
        </div>;
    },

    _renderPreviewMode: function() {
        const previewWidth = this._getPreviewWidth();
        return <div
            className="article-preview-container"
            style={{
                width: previewWidth,
                maxWidth: previewWidth,
            }}
        >
            <ArticleRenderer
                apiOptions={this.props.apiOptions}
                enabledFeatures={this.props.enabledFeatures}
                json={this.props.json}
                useNewStyles={this.props.useNewStyles}
            />
        </div>;
    },

    _handleJsonChange: function(newJson) {
        this.props.onChange({json: newJson});
    },

    _handleEditorChange: function(i, newProps) {
        const sections = _.clone(this._sections());
        sections[i] = _.extend({}, sections[i], newProps);
        this.props.onChange({json: sections});
    },

    _handleMoveSectionEarlier: function(i) {
        if (i === 0) {
            return;
        }
        const sections = _.clone(this._sections());
        const section = sections[i];
        sections.splice(i, 1);
        sections.splice(i - 1, 0, section);
        this.props.onChange({
            json: sections,
        });
    },

    _handleMoveSectionLater: function(i) {
        const sections = _.clone(this._sections());
        if (i + 1 === sections.length) {
            return;
        }
        const section = sections[i];
        sections.splice(i, 1);
        sections.splice(i + 1, 0, section);
        this.props.onChange({
            json: sections,
        });
    },

    _handleAddSectionAfter: function(i) {
        // We do a full serialization here because we
        // might be copying widgets:
        const sections = _.clone(this.serialize());
        // Here we do magic to allow you to copy-paste
        // things from the previous section into the new
        // section while preserving widgets.
        // To enable this, we preserve the widgets
        // object for the new section, but wipe out
        // the content.
        const newSection = (i >= 0) ? {
            widgets: sections[i].widgets,
        } : {};
        sections.splice(i + 1, 0, newSection);
        this.props.onChange({
            json: sections,
        });
    },

    _handleRemoveSection: function(i) {
        const sections = _.clone(this._sections());
        sections.splice(i, 1);
        this.props.onChange({
            json: sections,
        });
    },

    serialize: function() {
        if (this.props.mode === "edit") {
            return this._sections().map((section, i) => {
                return this.refs["editor" + i].serialize();
            });
        } else if (this.props.mode === "preview" ||
                this.props.mode === "json") {
            return this.props.json;
        } else {
            throw new Error("Could not serialize; mode " +
                this.props.mode + " not found"
            );
        }
    },

    render: function() {
        return <div className="framework-perseus perseus-article-editor">
            {(this.props.mode === "json") &&
            <div className="json-editor-warning">
                <span>
                    Warning: Editing in this mode can lead to broken articles!
                </span>
            </div>}

            {(this.props.mode === "edit") &&
                this._renderEditor()
            }

            {(this.props.mode === "preview") &&
                this._renderPreviewMode()
            }

            {(this.props.mode === "json") &&
                <JsonEditor
                    multiLine={true}
                    onChange={this._handleJsonChange}
                    value={this.props.json}
                />
            }
        </div>;
    },
});

module.exports = ArticleEditor;
