/** @jsx React.DOM */

var React = require('react');
var CombinedHintsEditor = require("./hint-editor.jsx");
var EnabledFeatures = require("./enabled-features.jsx");
var ItemEditor = require("./item-editor.jsx");
var ItemRenderer = require("./item-renderer.jsx");
var PropCheckBox = require("./components/prop-check-box.jsx");
var ApiOptions = require("./perseus-api.jsx").Options;

var JsonEditor = React.createClass({

    getInitialState: function() {
        return {
            currentValue: JSON.stringify(this.props.value, null, 4),
            valid: true
        };
    },

    componentWillReceiveProps: function(nextProps) {
        var shouldReplaceContent = !this.state.valid ||
            !_.isEqual(
                nextProps.value,
                JSON.parse(this.state.currentValue)
            );

        if (shouldReplaceContent) {
            this.setState(this.getInitialState());
        }
    },

    render: function() {
        var classes = "perseus-json-editor " +
            (this.state.valid ? "valid" : "invalid");

        return <textarea
            className={classes}
            value={this.state.currentValue}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur} />;
    },

    handleKeyDown: function(e) {
        // This handler allows the tab character to be entered by pressing
        // tab, instead of jumping to the next (non-existant) field
        if (e.key === "Tab") {
            var cursorPos = e.target.selectionStart;
            var v = e.target.value;
            var textBefore = v.substring(0, cursorPos);
            var textAfter = v.substring(cursorPos, v.length);
            e.target.value = textBefore+ "    " +textAfter;
            e.target.selectionStart = textBefore.length + 4;
            e.target.selectionEnd = textBefore.length + 4;

            e.preventDefault();
            this.handleChange(e);
        }
    },

    handleChange: function(e) {
        var nextString = e.target.value;
        try {
            var json = JSON.parse(nextString);
            // Some extra handling to allow copy-pasting from /api/vi
            if (_.isString(json)) {
                json = JSON.parse(json);
            }
            // This callback unfortunately causes multiple renders,
            // but seems to be necessary to avoid componentWillReceiveProps
            // being called before setState has gone through
            this.setState({
                currentValue: nextString,
                valid: true
            }, function() {
                this.props.onChange(json);
            });
        } catch (ex) {
            this.setState({
                currentValue: nextString,
                valid: false
            });
        }
    },

    handleBlur: function(e) {
        var nextString = e.target.value;
        try {
            var json = JSON.parse(nextString);
            // Some extra handling to allow copy-pasting from /api/vi
            if (_.isString(json)) {
                json = JSON.parse(json);
            }
            // This callback unfortunately causes multiple renders,
            // but seems to be necessary to avoid componentWillReceiveProps
            // being called before setState has gone through
            this.setState({
                currentValue: JSON.stringify(json, null, 4),
                valid: true
            }, function() {
                this.props.onChange(json);
            });
        } catch (ex) {
            this.setState({
                currentValue: JSON.stringify(this.props.value, null, 4),
                valid: true
            });
        }
    }
});

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
        apiOptions: React.PropTypes.object,
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

    render: function() {

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
                    apiOptions={this._apiOptions()} />
            }

            {(!this.props.developerMode || !this.props.jsonMode) &&
                <CombinedHintsEditor
                    ref="hintsEditor"
                    hints={this.props.hints}
                    imageUploader={this.props.imageUploader}
                    onChange={this.handleChange} />
            }
        </div>;

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
            json: this.serialize()
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
        if (this.props.jsonMode) {
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

        this.renderer = React.renderComponent(
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
            json: newJson,
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

    serialize: function() {
        if (this.props.jsonMode) {
            return this.state.json;
        } else {
            return _.extend(this.refs.itemEditor.serialize(), {
                hints: this.refs.hintsEditor.serialize()
            });
        }
    }

});

module.exports = EditorPage;
