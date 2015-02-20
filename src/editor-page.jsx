var React = require('react');
var _ = require("underscore");

var CombinedHintsEditor = require("./hint-editor.jsx");
var EnabledFeatures = require("./enabled-features.jsx");
var ItemEditor = require("./item-editor.jsx");
var ItemRenderer = require("./item-renderer.jsx");
var JsonEditor = require("./json-editor.jsx");
var ApiOptions = require("./perseus-api.jsx").Options;
var SearchAndReplaceDialog = require("./search-and-replace-dialog.jsx");
var Util = require("./util.js");

var EditorPage = React.createClass({
    propTypes: {
        // A function which takes a file object (guaranteed to be an image) and
        // a callback, then calls the callback with the url where the image
        // will be hosted. Image drag and drop is disabled when imageUploader
        // is null.
        imageUploader: React.PropTypes.func,
        enabledFeatures: EnabledFeatures.propTypes,
        // We don't specify a more specific type here because it's valid
        // for a client of Perseus to specify a subset of the API options,
        // in which case we default the rest in `this._apiOptions()`
        apiOptions: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            developerMode: false,
            jsonMode: false,
            enabledFeatures: {
                toolTipFormats: true,
                useMathQuill: true
            },
            apiOptions: {} // deep defaults on updateRenderer
        };
    },

    getInitialState: function() {
        return {
            json: {
                question: this.props.question,
                answer: this.props.answerArea,
                hints: this.props.hints
            },
            gradeMessage: "",
            wasAnswered: false
        };
    },
    
    getItemEditorSearchCount: function() {
        var count = 0;
        
        count += Util.countOccurences(this.props.question.content, this.state.searchString);
        count += Util.countOccurences(this.props.answerArea.options.content, this.state.searchString);

        return count;
    },
    
    getCombinedHintsSearchCount: function() {
        var count = 0;
        
        this.props.hints.forEach(hint => {
            count += Util.countOccurences(hint.content, this.state.searchString);
        });

        return count;
    },

    render: function() {
        
        var itemEditorSearchIndex = -1;
        var combinedHintsSearchIndex = -1;

        if (this.state.searchIndex !== -1) {
            var itemEditorCount = this.getItemEditorSearchCount();
            var combinedHintsCount = this.getCombinedHintsSearchCount();

            if (this.state.searchIndex < itemEditorCount) {
                itemEditorSearchIndex = this.state.searchIndex;
            } else if (this.state.searchIndex < itemEditorCount + combinedHintsCount) {
                combinedHintsSearchIndex = this.state.searchIndex - itemEditorCount;
            }
        }

        return <div id="perseus" className="framework-perseus">
            {this.props.developerMode &&
                <div>
                    <label>
                        {' '}Developer JSON Mode:{' '}
                        <input type="checkbox"
                            checked={this.props.jsonMode}
                            onChange={this.toggleJsonMode} />
                    </label>
                </div>
            }

            {this.props.developerMode && this.props.jsonMode &&
                <div>
                    <JsonEditor
                        multiLine={true}
                        value={this.state.json}
                        onChange={this.changeJSON} />
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
                    searchString={this.state.searchString}
                    searchIndex={itemEditorSearchIndex} />
            }

            {(!this.props.developerMode || !this.props.jsonMode) &&
                <CombinedHintsEditor
                    ref="hintsEditor"
                    hints={this.props.hints}
                    imageUploader={this.props.imageUploader}
                    onChange={this.handleChange}
                    searchString={this.state.searchString}
                    searchIndex={combinedHintsSearchIndex} />
            }

            {(this.props.searchAndReplace) &&
                <SearchAndReplaceDialog
                    ref="searchAndReplace"
                    question={this.props.question}
                    answerArea={this.props.answerArea}
                    hints={this.props.hints}
                    onChange={this.handleStateChange}
                    onReplaceAll={this.props.onChange} />
            }
        </div>;

    },

    handleStateChange: function(newState, cb) {
        this.setState(newState, cb);
    },

    handleCheckAnswer: function() {
        var result = this.scorePreview();
        this.setState({
            gradeMessage: result.message,
            wasAnswered: result.correct
        });
    },

    toggleJsonMode: function() {
        this.setState({
            json: this.serialize({keepDeletedWidgets: true})
        }, function() {
            this.props.onChange({
                jsonMode: !this.props.jsonMode
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
                toolTipFormats: true
            },
            apiOptions: this._apiOptions(),
            initialHintsVisible: 0  /* none; to be displayed below */
        }).extend(
            _(this.props).pick("workAreaSelector",
                               "solutionAreaSelector",
                               "hintsAreaSelector",
                               "problemNum",
                               "enabledFeatures")
        );

        this.renderer = React.render(
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

    changeJSON: function(newJson) {
        this.setState({
            json: newJson
        });
        this.props.onChange(newJson);
    },

    scorePreview: function() {
        if (this.renderer) {
            return this.renderer.scoreInput();
        } else {
            return null;
        }
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
                hints: this.refs.hintsEditor.serialize(options)
            });
        }
    }

});

module.exports = EditorPage;
