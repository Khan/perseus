/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, react/forbid-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var ReactDOM = require("react-dom");
var _ = require("underscore");

var ApiOptions = require("./perseus-api.jsx").Options;
var CombinedHintsEditor = require("./hint-editor.jsx");
var EnabledFeatures = require("./enabled-features.jsx");
var FixPassageRefs = require("./util/fix-passage-refs.jsx");
var ItemEditor = require("./item-editor.jsx");
var ItemRenderer = require("./item-renderer.jsx");
var JsonEditor = require("./json-editor.jsx");
var ViewportResizer = require("./components/viewport-resizer.jsx");

var EditorPage = React.createClass({
    propTypes: {
        // We don't specify a more specific type here because it's valid
        // for a client of Perseus to specify a subset of the API options,
        // in which case we default the rest in `this._apiOptions()`
        apiOptions: React.PropTypes.object,
        enabledFeatures: EnabledFeatures.propTypes,
        // A function which takes a file object (guaranteed to be an image) and
        // a callback, then calls the callback with the url where the image
        // will be hosted. Image drag and drop is disabled when imageUploader
        // is null.
        imageUploader: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            apiOptions: {}, // deep defaults on updateRenderer
            developerMode: false,
            enabledFeatures: {
                toolTipFormats: true,
                useMathQuill: true,
            },
            jsonMode: false,
        };
    },

    getInitialState: function() {
        return {
            json: _.pick(
                this.props,
                'question',
                'answerArea',
                'hints',
                'itemDataVersion'
            ),
            gradeMessage: "",
            wasAnswered: false,
            previewWidth: ViewportResizer.DEFAULT_WIDTH,
        };
    },

    handleCheckAnswer: function() {
        var result = this.scorePreview();
        this.setState({
            gradeMessage: result.message,
            wasAnswered: result.correct,
        });
    },

    toggleJsonMode: function() {
        this.setState({
            json: this.serialize({keepDeletedWidgets: true}),
        }, function() {
            this.props.onChange({
                jsonMode: !this.props.jsonMode,
            });
        });
    },

    componentDidMount: function() {
        this.rendererMountNode = document.createElement("div");
        this.updateRenderer();
    },

    componentDidUpdate: function() {
        this.updateRenderer();
    },

    updateRenderer: function(cb) {
        // Some widgets (namely the image widget) like to call onChange before
        // anything has actually been mounted, which causes problems here. We
        // just ensure don't update until we've mounted
        if (this.rendererMountNode == null || this.props.jsonMode) {
            return;
        }
        var rendererConfig = _({
            item: this.serialize(),
            enabledFeatures: {
                toolTipFormats: true,
            },
            apiOptions: this._apiOptions(),
            initialHintsVisible: 0,  /* none; to be displayed below */
        }).extend(
            _(this.props).pick("workAreaSelector",
                               "solutionAreaSelector",
                               "hintsAreaSelector",
                               "problemNum",
                               "enabledFeatures")
        );

        this.renderer = ReactDOM.render(
            <ItemRenderer {...rendererConfig} />,
            this.rendererMountNode,
            cb);
    },

    _apiOptions: function() {
        return _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions
        );
    },

    handleChange: function(toChange, cb, silent) {
        var newProps = _(this.props).pick("question", "hints", "answerArea");
        _(newProps).extend(toChange);
        this.props.onChange(newProps, cb, silent);
    },

    handleViewportSizeChanged: function(width, height) {
        this.setState({previewWidth: width});
    },

    changeJSON: function(newJson) {
        this.setState({
            json: newJson,
        });
        this.props.onChange(newJson);
    },

    _fixPassageRefs: function() {
        var itemData = this.serialize();
        var newItemData = FixPassageRefs(itemData);
        this.setState({
            json: newItemData,
        });
        this.props.onChange(newItemData);
    },

    scorePreview: function() {
        if (this.renderer) {
            return this.renderer.scoreInput();
        } else {
            return null;
        }
    },

    render: function() {

        return <div id="perseus" className="framework-perseus">
            <div style={{marginBottom: 10}}>
                {this.props.developerMode &&
                    <span>
                        <label>
                            {' '}Developer JSON Mode:{' '}
                            <input
                                type="checkbox"
                                checked={this.props.jsonMode}
                                onChange={this.toggleJsonMode}
                            />
                        </label>
                        {" "}
                        <button type="button" onClick={this._fixPassageRefs}>
                            Fix passage-refs
                        </button>
                        {" "}
                    </span>
                }

                {!this.props.jsonMode &&
                    <ViewportResizer
                        onViewportSizeChanged={
                            this.handleViewportSizeChanged}
                    />
                }
            </div>

            {this.props.developerMode && this.props.jsonMode &&
                <div>
                    <JsonEditor
                        multiLine={true}
                        value={this.state.json}
                        onChange={this.changeJSON}
                    />
                </div>
            }

            {(!this.props.developerMode || !this.props.jsonMode) &&
                <ItemEditor
                    ref="itemEditor"
                    rendererOnly={this.props.jsonMode}
                    question={this.props.question}
                    answerArea={this.props.answerArea}
                    imageUploader={this.props.imageUploader}
                    onChange={this.handleChange}
                    wasAnswered={this.state.wasAnswered}
                    gradeMessage={this.state.gradeMessage}
                    onCheckAnswer={this.handleCheckAnswer}
                    apiOptions={this._apiOptions()}
                    previewWidth={this.state.previewWidth}
                />
            }

            {(!this.props.developerMode || !this.props.jsonMode) &&
                <CombinedHintsEditor
                    ref="hintsEditor"
                    hints={this.props.hints}
                    imageUploader={this.props.imageUploader}
                    onChange={this.handleChange}
                    previewWidth={this.state.previewWidth}
                />
            }
        </div>;

    },

    getSaveWarnings: function() {
        var issues1 = this.refs.itemEditor.getSaveWarnings();
        var issues2 = this.refs.hintsEditor.getSaveWarnings();
        return issues1.concat(issues2);
    },

    serialize: function(options) {
        if (this.props.jsonMode) {
            return this.state.json;
        } else {
            return _.extend(this.refs.itemEditor.serialize(options), {
                hints: this.refs.hintsEditor.serialize(options),
            });
        }
    },

});

module.exports = EditorPage;
