/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-undef, no-unused-vars, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const Renderer = require("./renderer.jsx");
const i18n = window.i18n;

/* Renders just a hint preview */
const HintRenderer = React.createClass({
    propTypes: {
        hint: React.PropTypes.any,
        lastHint: React.PropTypes.bool,
        pos: React.PropTypes.number,
        totalHints: React.PropTypes.number,
    },

    getSerializedState: function() {
        return this.refs.renderer.getSerializedState();
    },

    restoreSerializedState: function(state, callback) {
        this.refs.renderer.restoreSerializedState(state, callback);
    },

    render: function() {
        const {
            hint,
            lastHint,
            pos,
            totalHints,
        } = this.props;
        const classNames = lastHint ? "perseus-hint-renderer last-hint" :
            "perseus-hint-renderer";

        return <div className={classNames} tabIndex="-1">
            <span className="perseus-sr-only">
                {i18n._("Hint #%(pos)s", {pos: pos + 1})}
            </span>
            {totalHints && pos != null && <span
                className="perseus-hint-label"
            >
                {`${pos + 1} / ${totalHints}`}
            </span>}
            <Renderer
                ref="renderer"
                widgets={hint.widgets}
                content={hint.content || ""}
                images={hint.images}
            />
        </div>;
    },
});

module.exports = HintRenderer;
