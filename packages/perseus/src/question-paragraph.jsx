// @flow
import * as React from "react";

type Props = {|
    className?: ?string,
    translationIndex: number,
    paragraphIndex?: number,
    children?: React.Node,
|};

class QuestionParagraph extends React.Component<Props> {
    render(): React.Node {
        const className = this.props.className
            ? "paragraph " + this.props.className
            : "paragraph";
        // For perseus-article just-in-place-translation (jipt), we need
        // to attach some metadata to top-level QuestionParagraphs:
        return (
            <div
                className={className}
                data-perseus-component-index={this.props.translationIndex}
                data-perseus-paragraph-index={this.props.paragraphIndex}
            >
                {this.props.children}
            </div>
        );
    }
}

export default QuestionParagraph;
