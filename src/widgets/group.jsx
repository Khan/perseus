/** @jsx React.DOM */

var ApiOptions = require("../perseus-api.jsx").Options;
var Changeable   = require("../mixins/changeable.jsx");
var Editor = require("../editor.jsx");
var Renderer = require("../renderer.jsx");

var Group = React.createClass({
    mixins: [Changeable],

    propTypes: {
        content: React.PropTypes.string,
        widgets: React.PropTypes.object,
        images: React.PropTypes.object,
    },

    getDefaultProps: function() {
        return {
            content: "",
            widgets: {},
            images: {},
        };
    },

    render: function() {
        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions,
            {
                // Api Rewriting to support correct onFocus/onBlur
                // events for the mobile API
                onFocusChange: (newFocus, oldFocus) => {
                    if (oldFocus) {
                        this.props.onBlur(oldFocus);
                    }
                    if (newFocus) {
                        this.props.onFocus(newFocus);
                    }
                }
            }
        );

        return <div className="perseus-group">
            <Renderer
                {...this.props}
                ref="renderer"
                apiOptions={apiOptions} />
        </div>;
    },

    getUserInput: function() {
        return this.refs.renderer.getUserInput();
    },

    simpleValidate: function(rubric) {
        return this.refs.renderer.score();
    },

    // Mobile API:
    getInputPaths: function() {
        return this.refs.renderer.getInputPaths();
    },

    setInputValue: function(path, newValue, cb) {
        return this.refs.renderer.setInputValue(path, newValue, cb);
    },

    getAcceptableFormatsForInputPath: function(path) {
        return this.refs.renderer.getAcceptableFormatsForInputPath(path);
    },

    focus: function(path) {
        if (path == null) {
            return this.refs.renderer.focus();
        } else {
            this.refs.renderer.focusPath(path);
        }
    },

    blur: function(path) {
        this.refs.renderer.blurPath(path);
    },

    statics: {
        displayMode: "block"
    }
});

var GroupEditor = React.createClass({
    mixins: [Changeable],

    propTypes: {
        content: React.PropTypes.string,
        widgets: React.PropTypes.object,
        images: React.PropTypes.object,
    },

    getDefaultProps: function() {
        return {
            content: "",
            widgets: {},
            images: {},
        };
    },

    render: function() {
        return <div className="perseus-group-editor">
            <Editor
                ref="editor"
                content={this.props.content}
                widgets={this.props.widgets}
                images={this.props.images}
                widgetEnabled={true}
                immutableWidgets={false}
                onChange={this.props.onChange} />
        </div>;
    },

    serialize: function() {
        return this.refs.editor.serialize();
    },
});

module.exports = {
    name: "group",
    displayName: "Group",
    widget: Group,
    editor: GroupEditor,
    hidden: true
};

