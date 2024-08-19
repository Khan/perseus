/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/sort-comp */
import {Changeable, EditorJsonify} from "@khanacademy/perseus";
import * as React from "react";

import BlurInput from "../components/blur-input";

type PhetSimEditorProps = any;

export class PhetSimEditor extends React.Component<PhetSimEditorProps> {
    static propTypes = {
        ...Changeable.propTypes,
    };

    static widgetName = "phet-sim" as const;

    static defaultProps: PhetSimEditorProps = {
        url: "",
        description: "",
    };

    change: (arg1: any, arg2: any) => any = (...args) => {
        return Changeable.change.apply(this, args);
    };

    render(): React.ReactNode {
        return (
            <div>
                <label>
                    URL:
                    <BlurInput
                        value={this.props.url}
                        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
                        onChange={this.change("url")}
                    />
                </label>
            </div>
        );
    }

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };
}

export default PhetSimEditor;
