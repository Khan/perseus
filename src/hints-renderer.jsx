const React = require('react');
const ReactDOM = require("react-dom");
const _ = require("underscore");
const i18n = window.i18n;

const HintRenderer = require("./hint-renderer.jsx");
const SvgImage = require("./components/svg-image.jsx");


const HintsRenderer = React.createClass({
    propTypes: {
        apiOptions: React.PropTypes.any,
        className: React.PropTypes.string,
        enabledFeatures: React.PropTypes.any,
        hints: React.PropTypes.arrayOf(React.PropTypes.any),
        hintsVisible: React.PropTypes.number,
    },

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
                    enabledFeatures={this.props.enabledFeatures}
                    apiOptions={this.props.apiOptions}
                />;

                if (hint.replace && hints.length > 0) {
                    hints[hints.length - 1] = renderer;
                } else {
                    hints.push(renderer);
                }
            });

        const showGetAnotherHint = (
            this.props.apiOptions.getAnotherHint &&
            hintsVisible > 0 &&
            hintsVisible < this.props.hints.length
        );

        return <div className={this.props.className}>
            {hints}
            {showGetAnotherHint &&
                <button
                    rel="button"
                    className="perseus-show-another-hint"
                    onClick={evt => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        this.props.apiOptions.getAnotherHint();
                    }}
                >
                    <span className="perseus-show-another-hint-plus">
                      +
                    </span>
                    {i18n._("Get another hint")
                    } ({hintsVisible}/{this.props.hints.length})
                </button>}
        </div>;
    },
});

module.exports = HintsRenderer;
