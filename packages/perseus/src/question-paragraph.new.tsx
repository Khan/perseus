import * as React from "react";

type Props = {
    className?: string | null | undefined;
    translationIndex?: number;
    paragraphIndex?: number;
    children?: React.ReactNode;
    inline?: boolean;
};

class QuestionParagraph extends React.Component<Props> {
    render(): React.ReactNode {
        const isJIPT = this.props.translationIndex != null;
        const classProvided = (this.props.className ?? "").trim().length > 0;

        if (!isJIPT && !classProvided) {
            return this.props.children;
        }

        const className =
            `${this.props.className ?? ""} ${isJIPT && !this.props.inline ? "paragraph" : ""}`.trim();
        // For perseus-article just-in-place-translation (jipt), we need
        // to attach some metadata to top-level QuestionParagraphs:
        return (
            <div
                className={className.length > 0 ? className : undefined}
                data-perseus-component-index={this.props.translationIndex}
                data-perseus-paragraph-index={
                    isJIPT ? this.props.paragraphIndex : undefined
                }
            >
                {this.props.children}
            </div>
        );
    }
}

export default QuestionParagraph;
