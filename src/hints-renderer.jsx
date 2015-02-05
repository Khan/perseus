var React = require('react');
var _ = require("underscore");

var HintRenderer = require("./hint-renderer.jsx");
var SvgImage = require("./components/svg-image.jsx");

var HintsRenderer = React.createClass({
    render: function() {
        var hintsVisible = this._hintsVisible();
        var hints = this.props.hints
            .slice(0, hintsVisible)
            .map(function(hint, i) {
                var shouldBold = i === this.props.hints.length - 1 &&
                                 !(/\*\*/).test(hint.content);
                return <HintRenderer
                            bold={shouldBold}
                            hint={hint}
                            ref={"hintRenderer" + i}
                            key={"hintRenderer" + i}
                            enabledFeatures={this.props.enabledFeatures}
                            apiOptions={this.props.apiOptions} />;
            }, this);

        return <div>{hints}</div>;
    },

    _hintsVisible: function() {
        if (this.props.hintsVisible == null ||
                this.props.hintsVisible === -1) {
            return this.props.hints.length;
        } else {
            return this.props.hintsVisible;
        }
    },

    componentDidMount: function() {
        this._cacheHintImages();
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (!_.isEqual(prevProps.hints, this.props.hints) ||
            prevProps.hintsVisible !== this.props.hintsVisible) {
            this._cacheHintImages();
        }
    },

    _cacheImagesInHint: function(hint) {
        _.each(hint.images, (data, src) => {
            var image = new Image();
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
        var numCallbacks = 1;
        var fireCallback = () => {
            --numCallbacks;
            if (callback && numCallbacks === 0) {
                callback();
            }
        };

        _.each(state, (hintState, i) => {
            var hintRenderer = this.refs["hintRenderer" + i];
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
});

module.exports = HintsRenderer;
