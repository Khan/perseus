var React = require("react");
var _ = require("underscore");

var ApiOptions = require("./perseus-api.jsx").Options;
var Renderer = require("./renderer.jsx");

var rendererProps = React.PropTypes.shape({
    content: React.PropTypes.string,
    widgets: React.PropTypes.object,
    images: React.PropTypes.object,
});

var ArticleRenderer = React.createClass({

    propTypes: {
        apiOptions: ApiOptions.propTypes,
        json: React.PropTypes.oneOfType([
            rendererProps,
            React.PropTypes.arrayOf(rendererProps)
        ]).isRequired,
        enabledFeatures: React.PropTypes.object,

        editorOnChange: React.PropTypes.func.isRequired,
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    },

    render: function() {
        // TODO(alex): Add mobile api functions and pass them down here
        var sections = this._sections().map((section, i) => {
            return <Renderer
                {...section}
                key={i}
                apiOptions={this.props.apiOptions}
                editorOnChange={this._handleEditorChange}
                enabledFeatures={this.props.enabledFeatures} />;
        });

        return <div className="framework-perseus perseus-article">
            {sections}
        </div>;
    },

    _handleEditorChange: function(newProps) {
        this.props.editorOnChange(newProps);
    },

    _sections: function() {
        return _.isArray(this.props.json) ?
            this.props.json :
            [this.props.json];
    },
});

module.exports = ArticleRenderer;
