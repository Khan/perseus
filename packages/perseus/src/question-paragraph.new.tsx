import * as React from "react";

type Props = {
    className?: string | null | undefined;
    translationIndex?: number;
    paragraphIndex?: number;
    children?: React.ReactNode;
};

const QuestionParagraph = ({
    className,
    translationIndex,
    paragraphIndex,
    children,
}: Props): React.ReactNode => {
    const isJIPT = translationIndex != null;
    const resolvedClassName =
        className && className.trim().length > 0 ? className : undefined;

    if (!isJIPT && resolvedClassName == null) {
        return children;
    }

    // For perseus-article just-in-place-translation (jipt), we need
    // to attach some metadata to top-level QuestionParagraphs:
    return (
        <div
            className={resolvedClassName}
            data-perseus-component-index={translationIndex}
            data-perseus-paragraph-index={isJIPT ? paragraphIndex : undefined}
        >
            {children}
        </div>
    );
};

export default QuestionParagraph;
