var SectionControlButton = require("../components/section-control-button.jsx");

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
        onChange: React.PropTypes.func.isRequired,
    },

    render: function() {
        return <div>
            <FloatingWidgetButtons
                onEditClicked={this._toggleEditor}
                onTrashClicked={() => console.log("TODO: Delete widget.")} />
        </div>;
    },

    _toggleEditor: function() {
        console.log("TODO: Show/hide editor");
    }
});

module.exports = FloatingWidgetEditor;
