/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable array-bracket-spacing, no-var, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var _ = require("underscore");

const ApiClassNames = require("./perseus-api.jsx").ClassNames;
const ApiOptionsProps = require("./mixins/api-options-props.js");
var CombinedHintsEditor = require("./hint-editor.jsx");
var FixPassageRefs = require("./util/fix-passage-refs.jsx");
var ItemEditor = require("./item-editor.jsx");
var JsonEditor = require("./json-editor.jsx");
var ViewportResizer = require("./components/viewport-resizer.jsx");

var EditorPage = React.createClass({
    propTypes: {
        answerArea: React.PropTypes.any, // related to the question

        developerMode: React.PropTypes.bool,

        // Source HTML for the iframe to render
        frameSource: React.PropTypes.string.isRequired,

        hints: React.PropTypes.any, // related to the question

        // A function which takes a file object (guaranteed to be an image) and
        // a callback, then calls the callback with the url where the image
        // will be hosted. Image drag and drop is disabled when imageUploader
        // is null.
        imageUploader: React.PropTypes.func,

        // Part of the question
        itemDataVersion: React.PropTypes.shape({
            major: React.PropTypes.number,
            minor: React.PropTypes.number,
        }),

        // Whether the question is displaying as JSON or if it is
        // showing the editor itself with the rendering
        jsonMode: React.PropTypes.bool,

        // A function which is called with the new JSON blob of content
        onChange: React.PropTypes.func,

        onPreviewDeviceChange: React.PropTypes.func,
        previewDevice: React.PropTypes.string,

        // Initial value of the question being edited
        question: React.PropTypes.any,
    },

    mixins: [ ApiOptionsProps ],

    getDefaultProps: function() {
        return {
            developerMode: false,
            jsonMode: false,
            onChange: () => {},
            ref: '',
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

    updateRenderer: function() {
        // Some widgets (namely the image widget) like to call onChange before
        // anything has actually been mounted, which causes problems here. We
        // just ensure don't update until we've mounted
        const hasEditor = !this.props.developerMode || !this.props.jsonMode;
        if (!this.isMounted() || !hasEditor) {
            return;
        }

        const touch = this.props.previewDevice === 'phone' ||
            this.props.previewDevice === 'tablet';
        const deviceBasedApiOptions = Object.assign(
            this.getApiOptions(), {
                customKeypad: touch,
                isMobile: touch,
            });

        this.refs.itemEditor.triggerPreviewUpdate({
            type: "question",
            data: _({
                item: this.serialize(),
                apiOptions: deviceBasedApiOptions,
                initialHintsVisible: 0,
                device: this.props.previewDevice,
            }).extend(
                _(this.props).pick("workAreaSelector",
                                   "solutionAreaSelector",
                                   "hintsAreaSelector",
                                   "problemNum")
            ),
        });
    },

    handleChange: function(toChange, cb, silent) {
        var newProps = _(this.props).pick("question", "hints", "answerArea");
        _(newProps).extend(toChange);
        this.props.onChange(newProps, cb, silent);
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
        let className = "framework-perseus";

        const touch = this.props.previewDevice === 'phone' ||
            this.props.previewDevice === 'tablet';
        const deviceBasedApiOptions = Object.assign(
            this.getApiOptions(), {
                customKeypad: touch,
                isMobile: touch,
            });

        if (deviceBasedApiOptions.isMobile) {
            className += " " + ApiClassNames.MOBILE;
        }

        return <div id="perseus" className={className}>
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
                        deviceType={this.props.previewDevice}
                        onViewportSizeChanged={
                            this.props.onPreviewDeviceChange}
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
                    deviceType={this.props.previewDevice}
                    apiOptions={deviceBasedApiOptions}
                    frameSource={this.props.frameSource}
                />
            }

            {(!this.props.developerMode || !this.props.jsonMode) &&
                <CombinedHintsEditor
                    ref="hintsEditor"
                    hints={this.props.hints}
                    imageUploader={this.props.imageUploader}
                    onChange={this.handleChange}
                    deviceType={this.props.previewDevice}
                    apiOptions={deviceBasedApiOptions}
                    frameSource={this.props.frameSource}
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
