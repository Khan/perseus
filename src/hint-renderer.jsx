/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-unused-vars, object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require('react');
const {StyleSheet, css} = require("aphrodite");
const classnames = require('classnames');
const i18n = window.i18n;

const Renderer = require("./renderer.jsx");

const ApiOptions = require("./perseus-api.jsx").Options;

const mediaQueries = require("./styles/media-queries.js");
const {
    baseUnitPx,
    hintBorderWidth,
    kaGreen,
    gray97,
} = require("./styles/constants.js");

/* Renders just a hint preview */
const HintRenderer = React.createClass({
    propTypes: {
        apiOptions: ApiOptions.propTypes,
        className: React.PropTypes.string,
        hint: React.PropTypes.any,
        lastHint: React.PropTypes.bool,
        lastRendered: React.PropTypes.bool,
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
            apiOptions,
            className,
            hint,
            lastHint,
            lastRendered,
            pos,
            totalHints,
        } = this.props;

        const {isMobile} = apiOptions;

        const classNames = classnames(
            !isMobile && 'perseus-hint-renderer',
            isMobile && css(styles.newHint),
            isMobile && lastRendered && css(styles.lastRenderedNewHint),
            lastHint && 'last-hint',
            lastRendered && 'last-rendered',
            className
        );

        // TODO(charlie): Allowing `staticRender` here would require that we
        // extend `HintsRenderer` and `HintRenderer` to implement the full
        // "input' API, so that clients could access the static inputs. Allowing
        // `customKeypad` would require that we extend `ItemRenderer` to support
        // nested inputs in the `HintsRenderer`. For now, we disable these
        // options. Instead, clients will get standard <input/> elements, which
        // aren't nice to use on mobile, but are at least usable.
        const rendererApiOptions = {
            ...apiOptions,
            customKeypad: false,
            staticRender: false,
        };

        return <div className={classNames} tabIndex="-1">
            {!apiOptions.isMobile && <span className="perseus-sr-only">
                {i18n._("Hint #%(pos)s", {pos: pos + 1})}
            </span>}
            {!apiOptions.isMobile && totalHints && pos != null && <span
                className="perseus-hint-label"
                style={{display: 'block'}}
            >
                {`${pos + 1} / ${totalHints}`}
            </span>}
            <Renderer
                ref="renderer"
                widgets={hint.widgets}
                content={hint.content || ""}
                images={hint.images}
                apiOptions={rendererApiOptions}
            />
        </div>;
    },
});

const styles = StyleSheet.create({
    newHint: {
        marginBottom: 1.5 * baseUnitPx,

        borderLeftColor: gray97,
        borderLeftStyle: 'solid',
        borderLeftWidth: hintBorderWidth,

        // Only apply left-padding on tablets, to avoid being flush with the
        // border. On phones, padding is applied internally by the child
        // renderers. Some content on phones that is rendered at full-bleed may
        // end up flush with the border, but that's acceptable for now.
        [mediaQueries.lgOrSmaller]: {
            paddingLeft: baseUnitPx,
        },
        [mediaQueries.smOrSmaller]: {
            paddingLeft: 0,
        },

        ':focus': {
            outline: 'none',
        },
    },

    lastRenderedNewHint: {
        marginBottom: 0,
        borderLeftColor: kaGreen,
    },
});

module.exports = HintRenderer;
