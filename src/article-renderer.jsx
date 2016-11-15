/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable array-bracket-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

"use strict";

/**
 * An article renderer. Articles are long-form pieces of content,
 * composed of multiple (Renderer) sections concatenated together.
 */

const React = require("react");
const ReactDOM = require("react-dom");
const classNames = require("classnames");

const Util = require("./util.js");
const ApiOptions = require("./perseus-api.jsx").Options;
const ApiClassNames = require("./perseus-api.jsx").ClassNames;
const Renderer = require("./renderer.jsx");
const ProvideKeypad = require("./mixins/provide-keypad.jsx");

const rendererProps = React.PropTypes.shape({
    content: React.PropTypes.string,
    widgets: React.PropTypes.object,
    images: React.PropTypes.object,
});

const ArticleRenderer = React.createClass({
    propTypes: {
        apiOptions: React.PropTypes.shape({
            onFocusChange: React.PropTypes.func,
            isMobile: React.PropTypes.bool,
        }),
        json: React.PropTypes.oneOfType([
            rendererProps,
            React.PropTypes.arrayOf(rendererProps),
        ]).isRequired,

        // Whether to use the new Bibliotron styles for articles
        useNewStyles: React.PropTypes.bool,
    },

    mixins: [ ProvideKeypad ],

    getDefaultProps() {
        return {
            apiOptions: {},
            useNewStyles: false,
        };
    },

    componentDidMount() {
        this._currentFocus = null;
    },

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    },

    _handleFocusChange(newFocusPath, oldFocusPath) {
        // TODO(charlie): DRY this up--some of this logic is repeated in
        // ItemRenderer.
        if (newFocusPath) {
            this._setCurrentFocus(newFocusPath);
        } else {
            this._onRendererBlur(oldFocusPath);
        }
    },

    _setCurrentFocus(newFocusPath) {
        const keypadElement = this.keypadElement();

        const prevFocusPath = this._currentFocus;
        this._currentFocus = newFocusPath;

        // Use the section prefix to extract the relevant Renderer's input
        // paths, so as to check whether the focused path represents an
        // input.
        let didFocusInput = false;
        if (this._currentFocus) {
            const [sectionRef, ...focusPath] = this._currentFocus;
            const inputPaths = this.refs[sectionRef].getInputPaths();
            didFocusInput = inputPaths.some(inputPath => {
                return Util.inputPathsEqual(inputPath, focusPath);
            });
        }

        if (this.props.apiOptions.onFocusChange != null) {
            this.props.apiOptions.onFocusChange(
                this._currentFocus,
                prevFocusPath,
                didFocusInput && keypadElement &&
                    ReactDOM.findDOMNode(keypadElement)
            );
        }

        if (keypadElement) {
            if (didFocusInput) {
                keypadElement.activate();
            } else {
                keypadElement.dismiss();
            }
        }
    },

    _onRendererBlur(blurPath) {
        const blurringFocusPath = this._currentFocus;

        // Failsafe: abort if ID is different, because focus probably happened
        // before blur.
        if (!Util.inputPathsEqual(blurPath, blurringFocusPath)) {
            return;
        }

        // Wait until after any new focus events fire this tick before declaring
        // that nothing is focused, since if there were a focus change across
        // sections, we could receive the blur before the focus.
        setTimeout(() => {
            if (Util.inputPathsEqual(this._currentFocus, blurringFocusPath)) {
                this._setCurrentFocus(null);
            }
        });
    },

    blur() {
        if (this._currentFocus) {
            const [sectionRef, ...inputPath] = this._currentFocus;
            this.refs[sectionRef].blurPath(inputPath);
        }
    },

    _sections() {
        return Array.isArray(this.props.json) ?
            this.props.json :
            [this.props.json];
    },

    render() {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
            isArticle: true,
        };

        const classes = classNames({
            "framework-perseus": true,
            "perseus-article": true,
            "bibliotron-article": this.props.useNewStyles,
            // NOTE(charlie): For exercises, this is applied outside of Perseus
            // (in webapp).
            [ApiClassNames.MOBILE]: apiOptions.isMobile,
        });

        // TODO(alex): Add mobile api functions and pass them down here
        const sections = this._sections().map((section, i) => {
            const refForSection = `section-${i}`;
            return <div key={i} className="clearfix">
                <Renderer
                    {...section}
                    ref={refForSection}
                    key={i}
                    key_={i}
                    keypadElement={this.keypadElement()}
                    apiOptions={{
                        ...apiOptions,
                        onFocusChange: (newFocusPath, oldFocusPath) => {
                            // Prefix the paths with the relevant section, so as
                            // to allow us to distinguish between equivalently-
                            // named inputs across Renderers.
                            this._handleFocusChange(
                                newFocusPath &&
                                    [refForSection].concat(newFocusPath),
                                oldFocusPath &&
                                    [refForSection].concat(oldFocusPath)
                            );
                        },
                    }}
                />
            </div>;
        });

        return <div className={classes}>
            {sections}
        </div>;
    },
});

module.exports = ArticleRenderer;
