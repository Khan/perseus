/* eslint-disable no-console */

/**
 * Demonstrates the rendered result of a Perseus article
 */

const React = require('react');
const ArticleEditor = require('./article-editor.jsx');
const StatefulArticleEditor = require('./stateful-article-editor.jsx');
const Util = require('./util.js');

const enabledFeatures = {
    highlight: true,
    toolTipFormats: true,
    useMathQuill: true,
};

const ArticleDemo = React.createClass({
    propTypes: {
        content: React.PropTypes.any.isRequired,
    },

    serialize: function() {
        console.log(JSON.stringify(this.refs.editor.serialize(), null, 4));
    },

    scorePreview: function() {
        console.log(this.refs.editor.scorePreview());
    },

    _getContentHash: function() {
        return Util.strongEncodeURIComponent(
            JSON.stringify(this.refs.editor.serialize())
        );
    },

    permalink: function(e) {
        window.location.hash = `content=${this._getContentHash()}`;
        e.preventDefault();
    },

    getEditorProps() {
        const xomManatee = !!localStorage.xomManatee;

        return {
            json: this.props.content,
            enabledFeatures: enabledFeatures,
            imageUploader: function(image, callback) {
                setTimeout(callback, 1000, "http://fake.image.url");
            },
            apiOptions: {
                customKeypad: xomManatee,
                fancyDropdowns: true,
                onFocusChange: function(newPath, oldPath) {
                    console.log("onFocusChange", newPath, oldPath);
                },
                trackInteraction: function(trackData) {
                    console.log("Interaction with", trackData.type,
                           trackData);
                },
                xomManatee,
            },

            useNewStyles: true,
            componentClass: ArticleEditor,
        };
    },

    render: function() {
        const featuresDisplay = Object.keys(enabledFeatures).map((feature) => {
            return <span
                key={feature}
                style={{
                    marginLeft: 5,
                    background: enabledFeatures[feature] ? '#aaffaa'
                                                         : '#ffcccc',
                }}
            >
                {feature}
            </span>;
        });

        return (
            <div id="perseus-index">
                <div id="extras">
                    <button onClick={this.serialize}>serialize</button>{' '}
                    <button onClick={this.scorePreview}>score</button>{' '}
                    <button onClick={this.permalink}>permalink</button>{' '}
                    <span>Features:{featuresDisplay}</span>{' '}
                </div>
                <div style={{margin: 20}}>
                    <StatefulArticleEditor
                        ref="editor"
                        {...this.getEditorProps()}
                    />
                </div>
            </div>
        );
    },
});

module.exports = ArticleDemo;
