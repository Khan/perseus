/**
 * A side by side diff view for Perseus exercise items
 * in the standard layout.
 */

import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import RendererDiff from './renderer-diff';
import WidgetDiff from './widget-diff';

const itemProps = PropTypes.shape({
    question: PropTypes.shape({}).isRequired,
    answerArea: PropTypes.shape({}).isRequired,
    hints: PropTypes.arrayOf(PropTypes.any).isRequired,
});

type Props = any;

class ItemDiff extends React.Component<Props> {
    static propTypes = {
        after: itemProps.isRequired,
        before: itemProps.isRequired,
    };

    render(): React.ReactElement {
        const {before, after} = this.props;

        const hintCount = Math.max(before.hints.length, after.hints.length);

        const question = (
// @ts-expect-error [FEI-5003] - TS2786 - 'RendererDiff' cannot be used as a JSX component.
            <RendererDiff
                before={before.question}
                after={after.question}
                title="Question"
                showAlignmentOptions={false}
                showSeparator={true}
            />
        );

        const extras = (
// @ts-expect-error [FEI-5003] - TS2786 - 'WidgetDiff' cannot be used as a JSX component.
            <WidgetDiff
                before={before.answerArea}
                after={after.answerArea}
                title="Question extras"
            />
        );

        const hints = _.times(hintCount, function (n) {
            return (
// @ts-expect-error [FEI-5003] - TS2786 - 'RendererDiff' cannot be used as a JSX component.
                <RendererDiff
                    before={
                        n < before.hints.length ? before.hints[n] : undefined
                    }
                    after={n < after.hints.length ? after.hints[n] : undefined}
                    title={`Hint ${n + 1}`}
                    showAlignmentOptions={false}
                    showSeparator={n < hintCount - 1}
                    key={n}
                />
            );
        });

        return (
            <div className="framework-perseus">
                {question}
                {extras}
                {hints && <div className="diff-separator" />}
                {hints}
            </div>
        );
    }
}

export default ItemDiff;
