"use strict";

/**
 * An article renderer. Articles are long-form pieces of content,
 * composed of multiple (Renderer) sections concatenated together.
 */

const React = require("react");

const ApiOptions = require("./perseus-api.jsx").Options;
const Renderer = require("./renderer.jsx");

const rendererProps = React.PropTypes.shape({
    content: React.PropTypes.string,
    widgets: React.PropTypes.object,
    images: React.PropTypes.object,
});

const ArticleRenderer = React.createClass({
    propTypes: {
        apiOptions: React.PropTypes.shape({}),
        enabledFeatures: React.PropTypes.shape({}),
        json: React.PropTypes.oneOfType([
            rendererProps,
            React.PropTypes.arrayOf(rendererProps),
        ]).isRequired,

        // Whether to use the new Bibliotron styles for articles
        useNewStyles: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            useNewStyles: false,
        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    },

    _sections: function() {
        return Array.isArray(this.props.json) ?
            this.props.json :
            [this.props.json];
    },

    render: function() {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
            isArticle: true,
        };

        let className = "framework-perseus perseus-article";
        if (this.props.useNewStyles) {
            className += " bibliotron-article";
        }

        // TODO(alex): Add mobile api functions and pass them down here
        const sections = this._sections().map((section, i) => {
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

        return <div className={className}>
            {sections}
        </div>;
    },
});

module.exports = ArticleRenderer;
