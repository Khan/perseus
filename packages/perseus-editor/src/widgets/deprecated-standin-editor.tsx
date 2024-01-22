import {EditorJsonify} from "@khanacademy/perseus";
import * as React from "react";

type Props = {
    // Callback for when a widget prop is changed.
    onChange: (options: any) => void;
};

class DeprecatedStandinEditor extends React.Component<Props> {
    static widgetName = "deprecated-standin" as const;

    serialize(): any {
        return EditorJsonify.serialize.call(this);
    }

    render(): React.ReactNode {
        return (
            <div>
                <p>This widget has been deprecated and removed</p>
                <p>
                    Learners will see a message and they will not be graded on
                    this part. Please replace this widget with a supported one.
                </p>
            </div>
        );
    }
}

export default DeprecatedStandinEditor;
