var SectionControlButton = require("../components/section-control-button.jsx");
var Widgets = require("../widgets.js");

var FloatingWidgetButtons = React.createClass({
    displayName: "FloatingWidgetButtons",

    propTypes: {
        onEditClicked: React.PropTypes.func.isRequired,
        onTrashClicked: React.PropTypes.func.isRequired,
    },

    render: function () {
        return <div>
            <SectionControlButton
                icon="icon-edit"
                onClick={this.props.onEditClicked} />
            <SectionControlButton
                icon="icon-trash"
                onClick={this.props.onTrashClicked} />
        </div>;
    },
});

var FloatingWidgetEditor = React.createClass({
    displayName: "FloatingWidgetEditor",

    propTypes: {
        widgetInfo: React.PropTypes.object.isRequired,
        id: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
    },

    getInitialState: function() {
        return { showEditor: false };
    },

    render: function() {
        var WidgetEditor = Widgets.getEditor(this.props.widgetInfo.type);

        return <div>
            <FloatingWidgetButtons
                onEditClicked={this._toggleEditor}
                onTrashClicked={() => console.log("TODO: Delete widget.")} />
            {this.state.showEditor &&
                <WidgetEditor
                    ref="widget"
                    onChange={this._handleWidgetChange}
                    {...this.props.widgetInfo.options} />
            }
        </div>;
    },

    _toggleEditor: function() {
        this.setState({ showEditor: !this.state.showEditor });
    },

    // TODO(sam): Make this work
    _handleWidgetChange: function(newOptions, cb, silent) {
        var newWidgetInfo = _.clone(this.props.widgetInfo);
        newWidgetInfo.options = _.extend(
            this.refs.widget.serialize(),
            newOptions
        );
        this.props.onChange(newWidgetInfo, cb, silent);
    },
});

module.exports = FloatingWidgetEditor;
