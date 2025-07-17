/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import LabelImageEditor from "../label-image-editor";

import type {PerseusLabelImageWidgetOptions} from "@khanacademy/perseus-core";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Label Image/Editor Demo",
    tags: ["!autodocs"],
} as Story;

const styles = StyleSheet.create({
    wrapper: {
        // The maximum width of a widget in the editor.
        width: 338,
    },
});

type State = {
    imageAlt: string;
    choices: ReadonlyArray<string>;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
    markers: PerseusLabelImageWidgetOptions["markers"];
};

class WithState extends React.Component<Empty, State> {
    // @ts-expect-error [FEI-5003] - TS2564 - Property '_widget' has no initializer and is not definitely assigned in the constructor.
    _widget: LabelImageEditor;

    state = {
        imageAlt: "Map of Europe",
        choices: [
            "Lamborghini",
            "BMW",
            "Volkswagen",
            "Fiat",
            "Porsche",
            "Ferrari",
        ],
        imageUrl:
            "https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",
        imageWidth: 1280,
        imageHeight: 1024,
        markers: [
            {
                answers: ["BMW", "Volkswagen", "Porsche"],
                label: "Germany",
                x: 37.3,
                y: 53.6,
            },
            {
                answers: [],
                label: "",
                x: 21,
                y: 46,
            },
            {
                answers: ["Lamborghini", "Fiat", "Ferrari"],
                label: "Italy",
                x: 41.4,
                y: 78.8,
            },
        ],
    };

    render(): React.ReactNode {
        return (
            <div className={css(styles.wrapper)}>
                <LabelImageEditor
                    {...this.state}
                    onChange={(props) =>
                        this.setState({
                            ...this._widget.serialize(),
                            ...props,
                        })
                    }
                    // @ts-expect-error [FEI-5003] - TS2322 - Type 'LabelImageEditor | null' is not assignable to type 'LabelImageEditor'.
                    ref={(widget) => (this._widget = widget)}
                />
            </div>
        );
    }
}

export const Default = (args: StoryArgs): React.ReactElement => {
    return <WithState />;
};
