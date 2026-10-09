import * as React from "react";

type Props = {
    className?: string | null | undefined;
    translationIndex?: number;
    paragraphIndex?: number;
    children?: React.ReactNode;
    inline?: boolean;
};

const QuestionParagraph = (props: Props): React.ReactNode => {
    const className = props.className
        ? "deprecated-perseus-container " + props.className
        : "deprecated-perseus-container";
    const isJipt = props.translationIndex != null;
    // For perseus-article just-in-place-translation (jipt), we need
    // to attach some metadata to top-level QuestionParagraphs:
    return (
        <div
            className={props.inline ? props.className ?? undefined : className}
            data-perseus-component-index={
                isJipt ? props.translationIndex : undefined
            }
            data-perseus-paragraph-index={
                isJipt ? props.paragraphIndex : undefined
            }
        >
            {props.children}
        </div>
    );
};

export default QuestionParagraph;
