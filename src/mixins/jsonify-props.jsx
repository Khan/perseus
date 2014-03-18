/** @jsx React.DOM */

var JsonifyProps = {
    toJSON: function() {
        // Omit props that get passed to all widgets
        return _.omit(this.props,
            // standard props "added" by react
            // (technically the renderer still adds them)
            "key",
            "ref",
            // added by src/renderer.jsx
            "onChange",
            "problemNum"
        );
    }
};

module.exports = JsonifyProps;
