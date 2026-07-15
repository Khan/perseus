/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/sort-comp */
import * as React from "react";

import type {PerseusBlankWidgetOptions} from "@khanacademy/perseus-core";

type DefaultProps = {
    id: PerseusBlankWidgetOptions["id"];
    displayType: PerseusBlankWidgetOptions["displayType"];
    correct: PerseusBlankWidgetOptions["correct"];
};

type Props = DefaultProps & {
    onChange: (arg1: {
        id: PerseusBlankWidgetOptions["id"];
        displayType: PerseusBlankWidgetOptions["displayType"];
        correct: PerseusBlankWidgetOptions["correct"];
    }) => void;
};

class BlankEditor extends React.Component<Props> {
    static defaultProps: DefaultProps = {
        id: "",
        displayType: "normal",
        correct: undefined,
    };

    static widgetName = "my-new-widget" as const;

    render(): React.ReactNode {
        return (
          // Add your HTML here
        );
    }

    serialize(): PerseusBlankWidgetOptions {
        return {
            id: this.props.id,
            displayType: this.props.displayType,
            correct: this.props.correct,
        };
    }

    getSaveWarnings(): Array<string> {
        return [];
    }
}

export default BlankEditor;