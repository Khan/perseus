var ApiOptions = require("../perseus-api.jsx").Options;
var Changeable   = require("../mixins/changeable.jsx");
var Editor = require("../editor.jsx");
var Renderer = require("../renderer.jsx");
var Util = require("../util.js");

var StepControlButton = React.createClass({
    render: function() {
        return <a
                href="#"
                className={
                    "step-control-button " +
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

var Sequence = React.createClass({
    mixins: [Changeable],

    propTypes: {
        json:  React.PropTypes.arrayOf(React.PropTypes.shape({
            content: React.PropTypes.string,
            widgets: React.PropTypes.object,
            images: React.PropTypes.object
        })),
        apiOptions: ApiOptions.propTypes
    },

    getDefaultProps: function() {
        return {
            json: [{
                content: "",
                widgets: {},
                images: {},
            }]
        };
    },

    getInitialState: function() {
        return {
            visible: 1
        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    },

    render: function() {
        var icon = <div className="icon-ok" style={{color: "green"}} />;

        var content = _.chain(this.props.json)
                .first(this.state.visible)
                .map((step, i) => {
                    return "[[" + Util.snowman + " group " + i + "]]";
                })
                .join("\n\n")
                .value();
        
        var widgets = {};
        _.each(this.props.json, (step, i) => {
            var widgetId = "group " + i;
            widgets[widgetId] = {
                type: "group",
                graded: true,
                version: {major: 0, minor: 0},
                options: _.extend({}, step, {
                    onInteractWithWidget: _.partial(
                            this._handleInteraction, i),
                    icon: i < this.state.visible - 1 ? icon : null
                })
            };
        });

        return <div className="perseus-sequence">
            <Renderer
                ref="renderer"
                content={content}
                widgets={widgets}
                apiOptions={this.props.apiOptions}
                enabledFeatures={this.props.enabledFeatures} />
        </div>;
    },

    _handleInteraction: function(step) {
        if (step === this.state.visible - 1) {
            var widget = this.refs.renderer.getWidgetInstance("group " + step);
            var score = widget.simpleValidate();

            if (score.type === "points" && score.total === score.earned) {
                this.setState({
                    visible: this.state.visible + 1
                });
            }
        }
    },

    statics: {
        displayMode: "block"
    }
});


var SequenceEditor = React.createClass({
    propTypes: {
        json:  React.PropTypes.arrayOf(React.PropTypes.shape({
            content: React.PropTypes.string,
            widgets: React.PropTypes.object,
            images: React.PropTypes.object
        })),
        apiOptions: ApiOptions.propTypes,
        onChange: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            json: [{
                content: "",
                widgets: {},
                images: {},
            }]
        };
    },

    render: function() {
        return <div className="perseus-sequence-editor">
            {_.map(this.props.json, (json, i) => {
                return <div>
                    Step {i+1}
                    <div style={{
                        display: "inline-block",
                        float: "right"
                    }}>
                        {(i + 1 < this.props.json.length) &&
                            <StepControlButton
                                icon="icon-circle-arrow-down"
                                onClick={() => {
                                    this._handleMoveStepLater(i);
                                }} />
                        }
                        {(i > 0) &&
                            <StepControlButton
                                icon="icon-circle-arrow-up"
                                onClick={() => {
                                    this._handleMoveStepEarlier(i);
                                }} />
                        }
                        <StepControlButton
                            icon="icon-trash"
                            onClick={() => {
                                var msg = "Are you sure you " +
                                    "want to remove step " +
                                    (i + 1) + "?";
                                if (confirm(msg)) {
                                    this._handleRemoveStep(i);
                                }
                            }} />
                        <StepControlButton
                            icon="icon-plus"
                            onClick={() => {
                                this._handleAddStepAfter(i);
                            }} />
                    </div>
                    <Editor
                        ref={"editor" + i}
                        content={json.content}
                        widgets={json.widgets}
                        images={json.images}
                        widgetEnabled={true}
                        immutableWidgets={false}
                        onChange={_.partial(this._handleEditorChange, i)} />
                </div>;
            })}
        </div>;
    },

    _handleEditorChange: function(i, newProps) {
        var steps = _.clone(this.props.json);
        steps[i] = _.extend({}, steps[i], newProps);
        this.props.onChange({json: steps});
    },

    serialize: function() {
        return {
            json: _.times(this.props.json.length, (i) => {
                return this.refs["editor" + i].serialize();
            })
        };
    },

    _handleMoveStepEarlier: function(i) {
        if (i === 0) {
            return;
        }
        var steps = _.clone(this.props.json);
        var step = steps[i];
        steps.splice(i, 1);
        steps.splice(i - 1, 0, step);
        this.props.onChange({
            json: steps
        });
    },

    _handleMoveStepLater: function(i) {
        var steps = _.clone(this.props.json);
        if (i + 1 === steps.length) {
            return;
        }
        var step = steps[i];
        steps.splice(i, 1);
        steps.splice(i + 1, 0, step);
        this.props.onChange({
            json: steps
        });
    },

    _handleAddStepAfter: function(i) {
        // We do a full serialization here because we
        // might be copying widgets:
        var steps = _.clone(this.props.json);
        // Here we do magic to allow you to copy-paste
        // things from the previous section into the new
        // section while preserving widgets.
        // To enable this, we preserve the widgets
        // object for the new section, but wipe out
        // the content.
        var newStep = (i >= 0) ? {
            widgets: steps[i].widgets
        } : {};
        steps.splice(i + 1, 0, newStep);
        this.props.onChange({
            json: steps
        });
    },

    _handleRemoveStep: function(i) {
        var steps = _.clone(this.props.json);
        steps.splice(i, 1);
        this.props.onChange({
            json: steps
        });
    },
});

module.exports = {
    name: "sequence",
    displayName: "Sequence",
    widget: Sequence,
    editor: SequenceEditor,
    hidden: true,
};
