import type passage from "../../widgets/passage/passage";
import type React from "react";

export type PassagePromptJSON = {
    type: "passage";
    options: {
        passageTitle: string;
        passageText: string;
        footnotes: string;
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof passage.widget>,
): PassagePromptJSON => {
    return {
        type: "passage",
        options: {
            passageTitle: renderProps.passageTitle,
            passageText: renderProps.passageText,
            footnotes: renderProps.footnotes,
        },
    };
};
