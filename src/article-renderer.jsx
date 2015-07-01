var React = require("react");
var _ = require("underscore");

var ApiOptions = require("./perseus-api.jsx").Options;
var Renderer = require("./renderer.jsx");
var Util = require("./util.js");

var rendererProps = React.PropTypes.shape({
    content: React.PropTypes.string,
    widgets: React.PropTypes.object,
    images: React.PropTypes.object,
});

var ArticleRenderer = React.createClass({

    propTypes: {
        json: React.PropTypes.oneOfType([
            rendererProps,
            React.PropTypes.arrayOf(rendererProps)
        ]).isRequired,
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    },

    render: function() {
        // TODO(alex): Make this render in multiple Renderers vs. in one
        var content = this._sections().map((section, i) => {
            return "[[" + Util.snowman + " group " + i + "]]";
        }).join("\n\n");
        
        var widgets = {};
        _.each(this._sections(), (section, i) => {
            var widgetId = "group " + i;
            widgets[widgetId] = {
                type: "group",
                graded: true,
                version: {major: 0, minor: 0},
                options: section
            };
        });

        return <div className="framework-perseus perseus-article">
            <Renderer
                content={content}
                widgets={widgets}
                apiOptions={this.props.apiOptions}
                enabledFeatures={this.props.enabledFeatures} />
        </div>;
    },

    _sections: function() {
        return _.isArray(this.props.json) ?
            this.props.json :
            [this.props.json];
    },
});

module.exports = ArticleRenderer;
