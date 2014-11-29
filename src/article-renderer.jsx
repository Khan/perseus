var React = require("react");

var ApiOptions = require("./perseus-api.jsx").Options;
var Renderer = require("./renderer.jsx");
var Util = require("./util.js");

var ArticleRenderer = React.createClass({

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    },

    render: function() {
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

        return <Renderer
            content={content}
            widgets={widgets}
            apiOptions={this.props.apiOptions}
            enabledFeatures={this.props.enabledFeatures} />;
    },

    _sections: function() {
        return _.isArray(this.props.json) ?
            this.props.json :
            [this.props.json];
    },
});

module.exports = ArticleRenderer;
