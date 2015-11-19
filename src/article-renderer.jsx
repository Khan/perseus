/* eslint-disable react/prop-types, react/jsx-closing-bracket-location */
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
        json: React.PropTypes.oneOfType([
            rendererProps,
            React.PropTypes.arrayOf(rendererProps),
        ]).isRequired,
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    },

    _sections: function() {
        return _.isArray(this.props.json) ?
            this.props.json :
            [this.props.json];
    },

    render: function() {
        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions,
            {
                isArticle: true,
            }
        );


        // TODO(alex): Add mobile api functions and pass them down here
        var sections = this._sections().map((section, i) => {
            return <div key={i} className="clearfix">
                <Renderer
                    {...section}
                    key={i}
                    key_={i}
                    apiOptions={apiOptions}
                    enabledFeatures={this.props.enabledFeatures}
                />
            </div>;
        });

        return <div className="framework-perseus perseus-article">
            {sections}
        </div>;
    },
});

module.exports = ArticleRenderer;
