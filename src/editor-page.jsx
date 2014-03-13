/** @jsx React.DOM */

require("./core.js");
require("./item-editor.jsx");
require("./item-renderer.jsx");
require("./hint-editor.jsx");
require("./diffs/revision-diff.jsx");

var BlurInput = require("./components/blur-input.jsx");
var PropCheckBox = require("./components/prop-check-box.jsx");

var ItemEditor = Perseus.ItemEditor;
var ItemRenderer = Perseus.ItemRenderer;
var CombinedHintsEditor = Perseus.CombinedHintsEditor;

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

Perseus.EditorPage = React.createClass({
    getDefaultProps: function() {
        return {
            developerMode: false,
            jsonMode: false
        };
    },

    getInitialState: function() {
        return {
            json: {
                question: this.props.question,
                answer: this.props.answerArea,
                hints: this.props.hints
            }
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
                    onChange={this.handleChange} />
            }

            {(!this.props.developerMode || !this.props.jsonMode) &&
                <CombinedHintsEditor
                    ref="hintsEditor"
                    hints={this.props.hints}
                    onChange={this.handleChange} />
            }
        </div>;

    },

    toggleJsonMode: function() {
        this.setState({
            json: this.toJSON(true)
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
            item: this.toJSON(true),
            initialHintsVisible: 0  /* none; to be displayed below */
        }).extend(
            _(this.props).pick("workAreaSelector",
                               "solutionAreaSelector",
                               "hintsAreaSelector",
                               "problemNum")
        );

        this.renderer = React.renderComponent(
            Perseus.ItemRenderer(rendererConfig),
            this.rendererMountNode,
            cb);
    },

    handleChange: function(toChange, cb) {
        var newProps = _(this.props).pick("question", "hints", "answerArea");
        _(newProps).extend(toChange);
        this.props.onChange(newProps, cb);
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

    toJSON: function(skipValidation) {
        if (this.props.jsonMode) {
            return this.state.json;
        } else {
            return _.extend(this.refs.itemEditor.toJSON(skipValidation), {
                hints: this.refs.hintsEditor.toJSON()
            });
        }
    }

});

/* Renders an EditorPage as a non-controlled component.
 *
 * Normally the parent of EditorPage must pass it an onChange callback and then
 * respond to any changes by modifying the EditorPage props to reflect those
 * changes. With StatefulEditorPage changes are stored in state so you can
 * query them with toJSON.
 */
Perseus.StatefulEditorPage = React.createClass({
    render: function() {
        return Perseus.EditorPage(this.state);
    },
    getInitialState: function() {
        return _({}).extend(this.props, {
            onChange: this.handleChange,
            ref: "editor"
        });
    },
    // getInitialState isn't called if the react component is re-rendered
    // in-place on the dom, in which case this is called instead, so we
    // need to update the state here.
    // (This component is currently re-rendered by the "Add image" button.)
    componentWillReceiveProps: function(nextProps) {
        this.setState(nextProps);
    },
    toJSON: function() {
        return this.refs.editor.toJSON();
    },
    handleChange: function(newState, cb) {
        this.setState(newState, cb);
    },
    scorePreview: function() {
        return this.refs.editor.scorePreview();
    }
});


