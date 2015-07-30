var React = require('react');
var _ = require("underscore");

var ApiOptions = require("./perseus-api.jsx").Options;
var PropCheckBox = require("./components/prop-check-box.jsx");
var Widgets = require("./widgets.js");

var WIDGET_PROP_BLACKLIST = require("./mixins/widget-prop-blacklist.jsx");

// This component handles upgading widget editor props via prop
// upgrade transforms. Widget editors will always be rendered
// with all available transforms applied, but the results of those
// transforms will not be propogated upwards until serialization.
var WidgetEditor = React.createClass({
    propTypes: {
        // Unserialized props
        id: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onRemove: React.PropTypes.func.isRequired,
        apiOptions: ApiOptions.propTypes,

        // Serialized props
        type: React.PropTypes.string.isRequired,
        graded: React.PropTypes.bool,
        options: React.PropTypes.object,
        version: React.PropTypes.shape({
            major: React.PropTypes.number.isRequired,
            minor: React.PropTypes.number.isRequired,
        }),
    },

    getInitialState: function() {
        return {
            showWidget: true
        };
    },

    componentWillMount: function() {
        this._upgradeWidgetInfo(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        this._upgradeWidgetInfo(nextProps);
    },

    _upgradeWidgetInfo: function(props) {
        // We can't call serialize here because this.refs.widget
        // doesn't exist before this component is mounted.
        var filteredProps = _.omit(props, WIDGET_PROP_BLACKLIST);
        this.setState({
            widgetInfo: Widgets.upgradeWidgetInfoToLatestVersion(filteredProps)
        });
    },

    render: function() {
        var widgetInfo = this.state.widgetInfo;

        var Ed = Widgets.getEditor(widgetInfo.type);
        var supportedAlignments;
        if (this.props.apiOptions.showAlignmentOptions) {
            supportedAlignments =
                Widgets.getSupportedAlignments(widgetInfo.type);
        } else {
            supportedAlignments = ["default"];
        }

        var isUngradedEnabled = (widgetInfo.type === "transformer");
        var gradedPropBox = <PropCheckBox label="Graded:"
                                graded={widgetInfo.graded}
                                onChange={this.props.onChange} />;

        return <div className="perseus-widget-editor">
            <div className={"perseus-widget-editor-title " +
                    (this.state.showWidget ? "open" : "closed")}>
                <a href="#" onClick={this._toggleWidget}>
                    {this.props.id}
                    <i className={"icon-chevron-" +
                            (this.state.showWidget ? "down" : "right")} />
                </a>
                {supportedAlignments.length > 1 &&
                <select
                        className="alignment"
                        value={widgetInfo.alignment}
                        onChange={this._handleAlignmentChange} >
                    {supportedAlignments.map((alignment) =>
                        <option key={alignment}>{alignment}</option>)}
                </select>}
                <a href="#" className={
                            "remove-widget " +
                            "simple-button simple-button--small orange"
                        }
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.onRemove();
                        }}>
                    <span className="icon-trash" />
                </a>
            </div>
            <div className={"perseus-widget-editor-content " +
                    (this.state.showWidget ? "enter" : "leave")}>
                {isUngradedEnabled && gradedPropBox}
                <Ed
                    ref="widget"
                    onChange={this._handleWidgetChange}
                    apiOptions={this.props.apiOptions}
                    {...widgetInfo.options} />
            </div>
        </div>;
    },

    _toggleWidget: function(e) {
        e.preventDefault();
        this.setState({showWidget: !this.state.showWidget});
    },

    _handleWidgetChange: function(newProps, cb, silent) {
        var newWidgetInfo = _.clone(this.state.widgetInfo);
        newWidgetInfo.options = _.extend(
            this.refs.widget.serialize(),
            newProps
        );
        this.props.onChange(newWidgetInfo, cb, silent);
    },

    _handleAlignmentChange: function (e) {
        var newAlignment = e.target.value;
        var newWidgetInfo = _.clone(this.state.widgetInfo);
        newWidgetInfo.alignment = newAlignment;
        this.props.onChange(newWidgetInfo);
    },

    getSaveWarnings: function() {
        var issuesFunc = this.refs.widget.getSaveWarnings;
        return issuesFunc ? issuesFunc() : [];
    },

    serialize: function() {
        // TODO(alex): Make this properly handle the case where we load json
        // with a more recent widget version than this instance of Perseus
        // knows how to handle.
        var widgetInfo = this.state.widgetInfo;
        return {
            type: widgetInfo.type,
            alignment: widgetInfo.alignment,
            graded: widgetInfo.graded,
            options: this.refs.widget.serialize(),
            version: widgetInfo.version,
        };
    }
});

module.exports = WidgetEditor;
