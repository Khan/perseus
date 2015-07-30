var ApiOptions = require("../perseus-api.jsx").Options;
var SectionControlButton = require("../components/section-control-button.jsx");
var WidgetEditor = require("../widget-editor.jsx");

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
        apiOptions: ApiOptions.propTypes,
        widgetInfo: React.PropTypes.object.isRequired,
        id: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
    },

    getInitialState: function() {
        return { showEditor: true };
    },

    render: function() {
        return <div>
            <FloatingWidgetButtons
                onEditClicked={this._toggleEditor}
                onTrashClicked={this._handleWidgetRemove} />
            {this.state.showEditor &&
                <WidgetEditor
                    apiOptions={this.props.apiOptions}
                    ref="widget"
                    onChange={this.props.onChange}
                    onRemove={this._handleWidgetRemove}
                    id={this.props.id}
                    {...this.props.widgetInfo} />
            }
        </div>;
    },

    _toggleEditor: function() {
        this.setState({ showEditor: !this.state.showEditor });
    },

    _handleWidgetRemove: function() {
        console.log("TODO: Delete widget.");
    },
});

module.exports = FloatingWidgetEditor;
