import {freeResponseLogic} from "@khanacademy/perseus-core";
import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import * as React from "react";

import type {
    PerseusFreeResponseWidgetOptions,
    FreeResponseDefaultWidgetOptions,
} from "@khanacademy/perseus-core";

type Props = PerseusFreeResponseWidgetOptions & {
    onChange: (options: Partial<PerseusFreeResponseWidgetOptions>) => void;
};

class FreeResponseEditor extends React.Component<Props> {
    static defaultProps: FreeResponseDefaultWidgetOptions =
        freeResponseLogic.defaultWidgetOptions;

    static widgetName = "free-response" as const;

    serialize(): PerseusFreeResponseWidgetOptions {
        return {
            question: this.props.question,
        };
    }

    getSaveWarnings(): Array<string> {
        const warnings: Array<string> = [];
        if (!this.props.question) {
            warnings.push("The question is empty");
        }
        return warnings;
    }

    render(): React.ReactNode {
        return (
            <LabeledTextField
                label={"Question"}
                value={this.props.question}
                onChange={(question: string) => this.props.onChange({question})}
                style={{
                    marginBottom: spacing.large_24,
                }}
            />
        );
    }
}

export default FreeResponseEditor;
