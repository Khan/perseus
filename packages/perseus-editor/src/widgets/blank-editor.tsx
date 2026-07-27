/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/sort-comp */
import * as React from "react";

import type {PerseusBlankWidgetOptions} from "@khanacademy/perseus-core";

type DefaultProps = {
    displayType: PerseusBlankWidgetOptions["displayType"];
    correct: PerseusBlankWidgetOptions["correct"];
};

type Props = DefaultProps & {
    onChange: (arg1: {
        displayType: PerseusBlankWidgetOptions["displayType"];
        correct: PerseusBlankWidgetOptions["correct"];
    }) => void;
};

/**
 * Editor is going to be handled by the Parent DnD widget (such as FITB)
 * This editor is just a stub
 */
class BlankEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        displayType: "normal",
        correct: "answer-tile-1",
    };

    static widgetName = "blank" as const;

    render(): React.ReactNode {
        return (
            <span>
                Blank Widget Editor Stub : Do not use this blank widget editor.
                The Blank Widget should only be used within the Fill in the
                Blank widget, which will handle the holistic editor experience.
            </span>
        );
    }

    serialize(): PerseusBlankWidgetOptions {
        return {
            displayType: this.props.displayType,
            correct: this.props.correct,
        };
    }

    getSaveWarnings(): Array<string> {
        return [];
    }
}

export default BlankEditor;
