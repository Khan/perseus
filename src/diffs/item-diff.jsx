/**
 * A side by side diff view for Perseus exercise items.
 */

const React = require("react");
const _ = require("underscore");

const RendererDiff = require("./renderer-diff.jsx");
const WidgetDiff = require("./widget-diff.jsx");

const itemProps = React.PropTypes.shape({
    question: React.PropTypes.shape({}).isRequired,
    answerArea: React.PropTypes.shape({}).isRequired,
    hints: React.PropTypes.array.isRequired,
});


const ItemDiff = React.createClass({
    propTypes: {
        after: itemProps.isRequired,
        before: itemProps.isRequired,
    },

    render: function() {
        const {before, after} = this.props;

        const hintCount = Math.max(before.hints.length, after.hints.length);

        const question = <RendererDiff
            before={before.question}
            after={after.question}
            title="Question"
            showAlignmentOptions={false}
            showSeparator={true}
        />;

        const extras = <WidgetDiff
            before={before.answerArea}
            after={after.answerArea}
            title="Question extras"
        />;

        const hints = _.times(hintCount, function(n) {
            return <RendererDiff
                before={n < before.hints.length ? before.hints[n] : undefined}
                after={n < after.hints.length ? after.hints[n] : undefined}
                title={`Hint ${n + 1}`}
                showAlignmentOptions={false}
                showSeparator={n < hintCount - 1}
                key={n}
            />;
        });

        return <div className="framework-perseus">
            {question}
            {extras}
            {hints && <div className="diff-separator"/>}
            {hints}
        </div>;
    },
});

module.exports = ItemDiff;
