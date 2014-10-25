var React = require("react");
var _ = require("underscore");

var Changeable   = require("../mixins/changeable.jsx");
var EditorJsonify = require("../mixins/editor-jsonify.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");
var Renderer = require("../renderer.jsx");

var PassageRefTarget = React.createClass({
    mixins: [WidgetJsonifyDeprecated, Changeable],

    propTypes: {
        content: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            content: ""
        };
    },

    render: function() {
        return <Renderer
            content={this.props.content}
            inline={true}
            enabledFeatures={this.props.enabledFeatures}
            apiOptions={this.props.apiOptions}
            />;
    },

    simpleValidate: function(rubric) {
        return PassageRefTarget.validate(this.getUserInput(), rubric);
    },

    statics: {
        displayMode: "inline"
    }
});

_.extend(PassageRefTarget, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    }
});

var PassageRefTargetEditor = React.createClass({
    mixins: [EditorJsonify, Changeable],

    propTypes: {
        content: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            content: ""
        };
    },

    render: function() {
        return <div>
            Content:
            <input type="text"
                value={this.props.content}
                onChange={this.handleContentChange} />
        </div>;
    },

    handleContentChange: function(e) {
        this.change({content: e.target.value});
    }
});

module.exports = {
    name: "passage-ref-target",
    displayName: "PassageRefTarget",
    widget: PassageRefTarget,
    editor: PassageRefTargetEditor,
    hidden: true,
    transform: (editorProps) => {
        return _.pick(editorProps, "content");
    },
    version: {major: 0, minor: 0}
};
