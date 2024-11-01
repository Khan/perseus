import type {WidgetType} from "../../prompt-types";
import type passage from "../../widgets/passage/passage";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof passage.widget>;

export type PassagePromptJSON = {
    type: WidgetType;
    options: {
        passageTitle: WidgetProps["passageTitle"];
        passageText: WidgetProps["passageText"];
        footnotes: WidgetProps["footnotes"];
    };
};

export const getPromptJSON = (renderProps: WidgetProps): PassagePromptJSON => {
    return {
        type: "passage",
        options: {
            passageTitle: renderProps.passageTitle,
            passageText: renderProps.passageText,
            footnotes: renderProps.footnotes,
        },
    };
};
