var React = require('react');
var Renderer = require("./renderer.jsx");

/* Renders just a hint preview */
var HintRenderer = React.createClass({
    render: function() {
        var shouldBold = this.props.bold;
        var hint = this.props.hint;
        var classNames;
        if (shouldBold) {
            classNames = "perseus-hint-renderer last-hint";
        } else {
            classNames = "perseus-hint-renderer";
        }
        return <div className={classNames}>
            <Renderer
                ref="renderer"
                widgets={this.props.hint.widgets}
                content={this.props.hint.content || ""}
                images={this.props.hint.images} />
        </div>;
    },

    getSerializedState: function() {
        return this.refs.renderer.getSerializedState();
    },

    restoreSerializedState: function(state, callback) {
        this.refs.renderer.restoreSerializedState(state, callback);
    },
});

module.exports = HintRenderer;
