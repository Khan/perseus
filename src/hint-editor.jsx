/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/* Collection of classes for rendering the hint editor area,
 * hint editor boxes, and hint previews
 */

const React = require('react');
const _ = require("underscore");

const Editor = require("./editor.jsx");
const HintRenderer = require("./hint-renderer.jsx");
const InfoTip = require("./components/info-tip.jsx");

/* Renders a hint editor box
 *
 * This includes:
 *  ~ A "Hint" title
 *  ~ the textarea for the hint
 *  ~ the "remove this hint" box
 *  ~ the move hint up/down arrows
 */
const HintEditor = React.createClass({
    propTypes: {
        content: React.PropTypes.string,
        imageUploader: React.PropTypes.func,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        images: React.PropTypes.any,
        isFirst: React.PropTypes.bool,
        isLast: React.PropTypes.bool,
        onChange: React.PropTypes.func.isRequired,
        onMove: React.PropTypes.func,
        onRemove: React.PropTypes.func,
        replace: React.PropTypes.bool,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        widgets: React.PropTypes.any,
    },

    getDefaultProps: function() {
        return {
            content: "",
            replace: false,
        };
    },

    handleChange: function(e) {
        this.props.onChange({replace:e.target.checked});
    },

    render: function() {
        return <div className="perseus-hint-editor perseus-editor-left-cell">
            <div className="pod-title">Hint</div>
            <Editor ref="editor"
                    widgets={this.props.widgets}
                    content={this.props.content}
                    images={this.props.images}
                    replace={this.props.replace}
                    placeholder="Type your hint here..."
                    imageUploader={this.props.imageUploader}
                    onChange={this.props.onChange} />
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
                <input type="checkbox"
                       checked={this.props.replace}
                       onChange={this.handleChange}
                />
                Replace previous hint
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
    },
});


/* A single hint-row containing a hint editor and preview */
const CombinedHintEditor = React.createClass({
    propTypes: {
        enabledFeatures: React.PropTypes.any,
        hint: React.PropTypes.any,
        imageUploader: React.PropTypes.func,
        isFirst: React.PropTypes.bool,
        isLast: React.PropTypes.bool,
        onChange: React.PropTypes.func.isRequired,
        onMove: React.PropTypes.func,
        onRemove: React.PropTypes.func,
        pos: React.PropTypes.number,
        previewWidth: React.PropTypes.number.isRequired,
    },

    render: function() {
        const shouldBold = this.props.isLast &&
                         !(/\*\*/).test(this.props.hint.content);
        const previewWidth = this.props.previewWidth;

        return <div className={"perseus-combined-hint-editor " +
                    "perseus-editor-row"}>
            <HintEditor
                ref="editor"
                isFirst={this.props.isFirst}
                isLast={this.props.isLast}
                widgets={this.props.hint.widgets}
                content={this.props.hint.content}
                images={this.props.hint.images}
                replace={this.props.hint.replace}
                imageUploader={this.props.imageUploader}
                onChange={this.props.onChange}
                onRemove={this.props.onRemove}
                onMove={this.props.onMove}
                previewWidth={this.props.previewWidth} />

            <div
                className="perseus-editor-right-cell"
                style={{width: previewWidth, maxWidth: previewWidth}}
            >
                <HintRenderer
                    hint={this.props.hint}
                    bold={shouldBold}
                    pos={this.props.pos}
                    enabledFeatures={this.props.enabledFeatures} />
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
    },
});


/* The entire hints editing/preview area
 *
 * Includes:
 *  ~ All the hint edit boxes, move and remove buttons
 *  ~ All the hint previews
 *  ~ The "add a hint" button
 */
const CombinedHintsEditor = React.createClass({
    propTypes: {
        enabledFeatures: React.PropTypes.any,
        hints: React.PropTypes.arrayOf(React.PropTypes.any),
        imageUploader: React.PropTypes.func,
        onChange: React.PropTypes.func.isRequired,
        previewWidth: React.PropTypes.number.isRequired,
    },

    getDefaultProps: function() {
        return {
            onChange: () => {},
            hints: [],
        };
    },

    render: function() {
        const hints = this.props.hints;
        const hintElems = _.map(hints, function(hint, i) {
            return <CombinedHintEditor
                        ref={"hintEditor" + i}
                        key={"hintEditor" + i}
                        isFirst={i === 0}
                        isLast={i + 1 === hints.length}
                        hint={hint}
                        pos={i}
                        imageUploader={this.props.imageUploader}
                        onChange={this.handleHintChange.bind(this, i)}
                        onRemove={this.handleHintRemove.bind(this, i)}
                        onMove={this.handleHintMove.bind(this, i)}
                        previewWidth={this.props.previewWidth}
                        enabledFeatures={this.props.enabledFeatures} />;
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
            </div>
        </div>;
    },

    handleHintChange: function(i, newProps, cb, silent) {
        // TODO(joel) - lens
        const hints = _(this.props.hints).clone();
        hints[i] = _.extend(
            {},
            this.serializeHint(i, {keepDeletedWidgets: true}),
            newProps
        );

        this.props.onChange({hints: hints}, cb, silent);
    },

    handleHintRemove: function(i) {
        const hints = _(this.props.hints).clone();
        hints.splice(i, 1);
        this.props.onChange({hints: hints});
    },

    handleHintMove: function(i, dir) {
        const hints = _(this.props.hints).clone();
        const hint = hints.splice(i, 1)[0];
        hints.splice(i + dir, 0, hint);
        this.props.onChange({hints: hints}, () => {
            this.refs["hintEditor" + (i + dir)].focus();
        });
    },

    addHint: function() {
        const hints = _(this.props.hints).clone().concat([{ content: "" }]);
        this.props.onChange({hints: hints}, () => {
            const i = hints.length - 1;
            this.refs["hintEditor" + i].focus();
        });
    },

    getSaveWarnings: function() {
        return _.chain(this.props.hints)
            .map((hint, i) => {
                return _.map(
                    this.refs["hintEditor" + i].getSaveWarnings(),
                    (issue) => ("Hint " + (i + 1) + ": " + issue));
            })
            .flatten(true)
            .value();
    },

    serialize: function(options) {
        return this.props.hints.map((hint, i) => {
            return this.serializeHint(i, options);
        });
    },

    serializeHint: function(index, options) {
        return this.refs["hintEditor" + index].serialize(options);
    },
});

module.exports = CombinedHintsEditor;
