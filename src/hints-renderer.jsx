/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable array-bracket-spacing, object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const ReactDOM = require("react-dom");
const {StyleSheet, css} = require("aphrodite");
const classnames = require('classnames');
const _ = require("underscore");
const i18n = window.i18n;

const HintRenderer = require("./hint-renderer.jsx");
const SvgImage = require("./components/svg-image.jsx");
const ApiOptionsProps = require("./mixins/api-options-props.js");

const mediaQueries = require("./styles/media-queries.js");
const sharedStyles = require("./styles/shared.js");
const {
    baseUnitPx,
    hintBorderWidth,
    kaGreen,
    gray85,
    gray17,
} = require("./styles/constants.js");

const HintsRenderer = React.createClass({
    propTypes: {
        // Also accepts apiOptions, via the ApiOptionsProps mixin.
        className: React.PropTypes.string,
        hints: React.PropTypes.arrayOf(React.PropTypes.any),
        hintsVisible: React.PropTypes.number,
    },

    mixins: [ ApiOptionsProps ],

    componentDidMount: function() {
        this._cacheHintImages();
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (!_.isEqual(prevProps.hints, this.props.hints) ||
            prevProps.hintsVisible !== this.props.hintsVisible) {
            this._cacheHintImages();
        }

        // When a new hint is displayed we immediately focus it
        if (prevProps.hintsVisible < this.props.hintsVisible) {
            const pos = this.props.hintsVisible - 1;
            ReactDOM.findDOMNode(this.refs["hintRenderer" + pos]).focus();
        }
    },

    _hintsVisible: function() {
        if (this.props.hintsVisible == null ||
                this.props.hintsVisible === -1) {
            return this.props.hints.length;
        } else {
            return this.props.hintsVisible;
        }
    },

    _cacheImagesInHint: function(hint) {
        _.each(hint.images, (data, src) => {
            const image = new Image();
            image.src = SvgImage.getRealImageUrl(src);
        });
    },

    _cacheHintImages: function() {
        // Only cache images in the first hint at the start. When hints are
        // taken, cache images in the rest of the hints
        if (this._hintsVisible() > 0) {
            _.each(this.props.hints, this._cacheImagesInHint);
        } else if (this.props.hints.length > 0) {
            this._cacheImagesInHint(this.props.hints[0]);
        }
    },

    getSerializedState: function() {
        return _.times(this._hintsVisible(), (i) => {
            return this.refs["hintRenderer" + i].getSerializedState();
        });
    },

    restoreSerializedState: function(state, callback) {
        // We need to wait until all the renderers are finished restoring their
        // state before we fire our callback.
        let numCallbacks = 1;
        const fireCallback = () => {
            --numCallbacks;
            if (callback && numCallbacks === 0) {
                callback();
            }
        };

        _.each(state, (hintState, i) => {
            const hintRenderer = this.refs["hintRenderer" + i];
            // This is not ideal in that it doesn't restore state
            // if the hint isn't visible, but we can't exactly restore
            // the state to an unmounted renderer, so...
            // If you want to restore state to hints, make sure to
            // have the appropriate number of hints visible already.
            if (hintRenderer) {
                ++numCallbacks;
                hintRenderer.restoreSerializedState(hintState, fireCallback);
            }
        });

        // This makes sure that the callback is fired if there aren't any
        // mounted renderers.
        fireCallback();
    },

    render: function() {
        const apiOptions = this.getApiOptions();
        const hintsVisible = this._hintsVisible();
        const hints = [];
        this.props.hints
            .slice(0, hintsVisible)
            .forEach((hint, i) => {
                const lastHint = i === this.props.hints.length - 1 &&
                    !(/\*\*/).test(hint.content);
                const lastRendered = i === hintsVisible - 1;

                const renderer = <HintRenderer
                    lastHint={lastHint}
                    lastRendered={lastRendered}
                    hint={hint}
                    pos={i}
                    totalHints={this.props.hints.length}
                    ref={"hintRenderer" + i}
                    key={"hintRenderer" + i}
                    apiOptions={apiOptions}
                />;

                if (hint.replace && hints.length > 0) {
                    hints[hints.length - 1] = renderer;
                } else {
                    hints.push(renderer);
                }
            });

        const showGetAnotherHint = (
            apiOptions.getAnotherHint &&
            hintsVisible > 0 &&
            hintsVisible < this.props.hints.length
        );

        const classNames = classnames(
            this.props.className,
            apiOptions.isMobile && hintsVisible > 0 &&
                css(styles.mobileHintStylesHintsRenderer)
        );

        return <div className={classNames}>
            {apiOptions.isMobile && hintsVisible > 0 &&
                <div
                    className={css(
                        styles.mobileHintStylesHintTitle,
                        sharedStyles.responsiveLabel
                    )}
                >
                    {i18n._("Hints")}
                </div>
            }
            {hints}
            {showGetAnotherHint &&
                <button
                    rel="button"
                    className={css(
                        styles.linkButton,
                        styles.getAnotherHintButton,
                        apiOptions.isMobile &&
                            styles.mobileHintStylesGetAnotherHintButton
                    )}
                    onClick={evt => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        apiOptions.getAnotherHint();
                    }}
                >
                    <span
                        className={css(
                            styles.plusText,
                            apiOptions.isMobile &&
                                styles.mobileHintStylesPlusText
                        )}
                    >
                      +
                    </span>
                    <span className={css(styles.getAnotherHintText)}>
                        {i18n._("Get another hint")
                        } ({hintsVisible}/{this.props.hints.length})
                    </span>
                </button>}
        </div>;
    },
});

const hintIndentation = baseUnitPx + hintBorderWidth;

const styles = StyleSheet.create({
    rendererMargins: {
        marginTop: baseUnitPx,
    },

    linkButton: {
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: '100%',
        fontFamily: 'inherit',
        fontWeight: 'bold',
        color: kaGreen,
        padding: 0,
        position: 'relative',
    },

    plusText: {
        fontSize: 20,
        position: 'absolute',
        top: -3,
        left: 0,
    },
    getAnotherHintText: {
        marginLeft: 16,
    },

    mobileHintStylesHintsRenderer: {
        marginTop: 4 * baseUnitPx,
        border: `solid ${gray85}`,
        borderWidth: "1px 0 0 0",

        position: 'relative',
        ':before': {
            content: '""',
            display: 'table',
            clear: 'both',
        },
        ':after': {
            content: '""',
            display: 'table',
            clear: 'both',
        },
    },

    mobileHintStylesHintTitle: {
        fontFamily: 'inherit',
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: gray17,

        paddingTop: baseUnitPx,
        paddingBottom: 1.5 * baseUnitPx,

        [mediaQueries.lgOrSmaller]: {
            paddingLeft: 0,
        },
        [mediaQueries.smOrSmaller]: {
            // On phones, ensure that the button is aligned with the hint body
            // content, which is inset at the standard `baseUnitPx`, plus an
            // additional `hintBorderWidth`.
            paddingLeft: hintIndentation,
        },
    },

    getAnotherHintButton: {
        marginTop: 1.5 * baseUnitPx,
    },

    mobileHintStylesGetAnotherHintButton: {
        [mediaQueries.lgOrSmaller]: {
            paddingLeft: 0,
        },
        [mediaQueries.smOrSmaller]: {
            // As with the title, on phones, ensure that the button is aligned
            // with the hint body content.
            paddingLeft: hintIndentation,
        },
    },

    mobileHintStylesPlusText: {
        [mediaQueries.lgOrSmaller]: {
            left: 0,
        },
        [mediaQueries.smOrSmaller]: {
            left: hintIndentation,
        },
    },
});

module.exports = HintsRenderer;
