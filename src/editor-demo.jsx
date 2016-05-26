 /* eslint-disable max-len, no-console */

 /**
  * Demonstrates the main Perseus editor
  *
  * This is ran by demo-perseus.js and handles adding debugger
  * buttons and their event listeners above a StatefulEditorPage
  */

const React = require('react');
const StatefulEditorPage = require('./stateful-editor-page.jsx');
const EditorPage = require('./editor-page.jsx');
const Util = require('./util.js');
const Renderability = require('./renderability.jsx');

const enabledFeatures = {
    highlight: true,
    toolTipFormats: true,
    useMathQuill: true,
};

const EditorDemo = React.createClass({
    propTypes: {
        problemNum: React.PropTypes.number,
        question: React.PropTypes.any.isRequired,
    },

    getDefaultProps: function() {
        return {
            problemNum: 1,
        };
    },

    componentDidMount: function() {
        // Hacks to make debugging nicer
        window.editorPage = this.refs.editor.refs.editor;
        window.itemRenderer = window.editorPage.renderer;
    },

    serialize: function() {
        console.log(JSON.stringify(this.refs.editor.serialize(), null, 4));
    },

    scorePreview: function() {
        console.log(this.refs.editor.scorePreview());
    },

    _getContentHash: function() {
        return Util.strongEncodeURIComponent(JSON.stringify(this.refs.editor.serialize()));
    },

    permalink: function(e) {
        window.location.hash = `content=${this._getContentHash()}`;
        e.preventDefault();
    },

    viewRendered: function(e) {
        const link = document.createElement("a");
        link.href = window.location.pathname + "?renderer#content=" + this._getContentHash();
        link.target = "_blank";
        link.click();
        e.preventDefault();
    },

    inputVersion: function(e) {
        e.preventDefault();
        // print whether or not this item consists only of
        // input-numbers and numeric-inputs.
        // just for versioning testing
        console.log(Renderability.isItemRenderableByVersion(
            this.refs.editor.serialize(),
            {
                '::renderer::': { major: 100, minor: 0 },
                'group': { major: 100, minor: 0 },
                'sequence': { major: 100, minor: 0 },
                'input-number': { major: 100, minor: 0 },
                'numeric-input': { major: 100, minor: 0 },
            }
        ));
    },

    saveWarnings: function(e) {
        e.preventDefault();
        console.log(this.refs.editor.getSaveWarnings());
    },

    getEditorProps() {
        const xomManatee = !!localStorage.xomManatee;

        return {
            ...this.props.question,
            problemNum: this.props.problemNum,
            enabledFeatures: enabledFeatures,
            developerMode: true,
            imageUploader: function(image, callback) {
                setTimeout(callback, 1000, "http://fake.image.url");
            },
            apiOptions: {
                fancyDropdowns: true,
                // onInputError: function() {
                //     let args = Array.from(arguments);
                //     console.log.apply(console, ["onInputError:"].concat(args));
                //     return true;
                // },
                // interceptInputFocus: function() {
                //     let args = Array.from(arguments);
                //     console.log.apply(console, ["interceptInputFocus:"].concat(args));
                //     return;
                // },
                onFocusChange: function(newPath, oldPath) {
                    console.log("onFocusChange", newPath, oldPath);
                },
                // staticRender: true,
                // readOnly: true,
                customKeypad: location.search.indexOf('customKeypad') !== -1,
                xomManatee,
            },
            componentClass: EditorPage,
        };
    },

    render: function() {
        const editorProps = this.getEditorProps();

        const featuresDisplay = Object.keys(enabledFeatures).map((feature) => {
            return <span
                key={feature}
                style={{
                    marginLeft: 5,
                    background: enabledFeatures[feature] ? '#aaffaa' : '#ffcccc',
                }}
            >
                {feature}
            </span>;
        });

        return (
            <div id="perseus-index">
                <div className="extras">
                    <button onClick={this.serialize}>serialize</button>{' '}
                    <button onClick={this.scorePreview}>score</button>{' '}
                    <button onClick={this.permalink}>permalink</button>{' '}
                    <button onClick={this.viewRendered}>view rendered</button>{' '}
                    <button onClick={this.inputVersion}>contains only inputs?</button>{' '}
                    <button onClick={this.saveWarnings}>save warnings</button>{' '}
                    <span>Seed:{this.props.problemNum} </span>{' '}
                    <span>Features:{featuresDisplay}</span>{' '}
                    <span>Scratchpad:{Khan.scratchpad.enabled ? 'enabled' : 'disabled'}</span>
                </div>
                <StatefulEditorPage key={this.props.question} ref="editor" {...editorProps}/>
            </div>
        );
    },
});

module.exports = EditorDemo;
