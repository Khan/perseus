/* Collection of classes for rendering the hint editor area,
 * hint editor boxes, and hint previews
 */

var React = require('react');
var _ = require("underscore");

var Editor = require("./editor.jsx");
var HintRenderer = require("./hint-renderer.jsx");
var InfoTip = require("react-components/info-tip.jsx");
var Util = require("./util.js");

/* Renders a hint editor box
 *
 * This includes:
 *  ~ A "Hint" title
 *  ~ the textarea for the hint
 *  ~ the "remove this hint" box
 *  ~ the move hint up/down arrows
 */
var HintEditor = React.createClass({
    propTypes: {
        imageUploader: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            content: ""
        };
    },

    render: function() {
        return <div className="perseus-hint-editor perseus-editor-left-cell">
            <div className="pod-title">Hint</div>
            <Editor ref="editor"
                    widgets={this.props.widgets}
                    content={this.props.content}
                    images={this.props.images}
                    placeholder="Type your hint here..."
                    imageUploader={this.props.imageUploader}
                    onChange={this.props.onChange}
                    searchString={this.props.searchString}
                    searchIndex={this.props.searchIndex} />
            <div className="hint-controls-container clearfix">
                <span className="reorder-hints">
                    <button type="button"
                            className={this.props.isLast ? "hidden" : ""}
                            onClick={_.partial(this.props.onMove, 1)}>
                        <span className="icon-circle-arrow-down" />
                    </button>
                    {' '}
                    <button type="button"
                            className={this.props.isFirst ? "hidden" : ""}
                            onClick={_.partial(this.props.onMove, -1)}>
                        <span className="icon-circle-arrow-up" />
                    </button>
                    {' '}
                    {this.props.isLast &&
                    <InfoTip>
                        <p>The last hint is automatically bolded.</p>
                    </InfoTip>}
                </span>
                <button type="button"
                        className="remove-hint simple-button orange"
                        onClick={this.props.onRemove}>
                    <span className="icon-trash" /> Remove this hint{' '}
                </button>
            </div>
        </div>;
    },

    focus: function() {
        this.refs.editor.focus();
    },

    getSaveWarnings: function() {
        return this.refs.editor.getSaveWarnings();
    },

    serialize: function(options) {
        return this.refs.editor.serialize(options);
    }
});


/* A single hint-row containing a hint editor and preview */
var CombinedHintEditor = React.createClass({
    propTypes: {
        imageUploader: React.PropTypes.func
    },

    render: function() {
        var shouldBold = this.props.isLast &&
                         !(/\*\*/).test(this.props.hint.content);
        return <div className={"perseus-combined-hint-editor " +
                    "perseus-editor-row"}>
            <HintEditor
                ref="editor"
                isFirst={this.props.isFirst}
                isLast={this.props.isLast}
                widgets={this.props.hint.widgets}
                content={this.props.hint.content}
                images={this.props.hint.images}
                imageUploader={this.props.imageUploader}
                onChange={this.props.onChange}
                onRemove={this.props.onRemove}
                onMove={this.props.onMove}
                searchString={this.props.searchString}
                searchIndex={this.props.searchIndex} />

            <div className="perseus-editor-right-cell">
                <HintRenderer hint={this.props.hint} bold={shouldBold} />
            </div>
        </div>;
    },

    getSaveWarnings: function() {
        return this.refs.editor.getSaveWarnings();
    },

    serialize: function(options) {
        return this.refs.editor.serialize(options);
    },

    focus: function() {
        this.refs.editor.focus();
    }
});


/* The entire hints editing/preview area
 *
 * Includes:
 *  ~ All the hint edit boxes, move and remove buttons
 *  ~ All the hint previews
 *  ~ The "add a hint" button
 */
var CombinedHintsEditor = React.createClass({
    propTypes: {
        imageUploader: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            onChange: () => {},
            hints: []
        };
    },

    render: function() {
        var hints = this.props.hints;
        var searchIndex = this.props.searchIndex;
        var searchString = this.props.searchString;
        
        var hintElems = _.map(hints, function(hint, i) {
            var hintSearchCount = Util.countOccurences(hint.content, searchString);
            var hintSearchIndex = -1;
            if (searchIndex >= 0) {
                if (searchIndex < hintSearchCount) {
                    hintSearchIndex = searchIndex;
                }
                searchIndex -= hintSearchCount;
            }

            return <CombinedHintEditor
                        ref={"hintEditor" + i}
                        key={"hintEditor" + i}
                        isFirst={i === 0}
                        isLast={i + 1 === hints.length}
                        hint={hint}
                        imageUploader={this.props.imageUploader}
                        onChange={this.handleHintChange.bind(this, i)}
                        onRemove={this.handleHintRemove.bind(this, i)}
                        onMove={this.handleHintMove.bind(this, i)}
                        searchString={searchString}
                        searchIndex={hintSearchIndex} />;
        }, this);

        return <div className="perseus-hints-editor perseus-editor-table">
            {hintElems}
            <div className="perseus-editor-row">
                <div className="add-hint-container perseus-editor-left-cell">
                <button type="button"
                        className="add-hint simple-button orange"
                        onClick={this.addHint}>
                    <span className="icon-plus" />
                    {' '}Add a hint
                </button>
                </div>
                <div className="perseus-editor-right-cell" />
            </div>
        </div>;
    },

    handleHintChange: function(i, newProps, cb, silent) {
        // TODO(joel) - lens
        var hints = _(this.props.hints).clone();
        hints[i] = _.extend(
            {},
            this.serializeHint(i, {keepDeletedWidgets: true}),
            newProps
        );

        this.props.onChange({hints: hints}, cb, silent);
    },

    handleHintRemove: function(i) {
        var hints = _(this.props.hints).clone();
        hints.splice(i, 1);
        this.props.onChange({hints: hints});
    },

    handleHintMove: function(i, dir) {
        var hints = _(this.props.hints).clone();
        var hint = hints.splice(i, 1)[0];
        hints.splice(i + dir, 0, hint);
        this.props.onChange({hints: hints}, () => {
            this.refs["hintEditor" + (i + dir)].focus();
        });
    },

    addHint: function() {
        var hints = _(this.props.hints).clone().concat([{ content: "" }]);
        this.props.onChange({hints: hints}, () => {
            var i = hints.length - 1;
            this.refs["hintEditor" + i].focus();
        });
    },

    getSaveWarnings: function() {
        return this.props.hints.map((hint, i) => {
            return this.refs["hintEditor" + i].getSaveWarnings();
        });
    },

    serialize: function(options) {
        return this.props.hints.map((hint, i) => {
            return this.serializeHint(i, options);
        });
    },

    serializeHint: function(index, options) {
        return this.refs["hintEditor" + index].serialize(options);
    }
});

module.exports = CombinedHintsEditor;
