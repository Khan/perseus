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

class BlankEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        displayType: "normal",
        correct: undefined,
    };

    static widgetName = "blank" as const;

    render(): React.ReactNode {
        return <span>Blank Widget Stub</span>;
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
