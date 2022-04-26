// @flow
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import LabelImageEditor from "../label-image-editor.jsx";

import type {MarkerType} from "@khanacademy/perseus";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Editor/Widgets/Label Image Editor",
}: Story);

const styles = StyleSheet.create({
    wrapper: {
        // The maximum width of a widget in the editor.
        width: 338,
    },
});

type State = {|
    imageAlt: string,
    choices: $ReadOnlyArray<string>,
    imageUrl: string,
    imageWidth: number,
    imageHeight: number,
    markers: $ReadOnlyArray<MarkerType>,
|};

class WithState extends React.Component<Empty, State> {
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

    render(): React.Node {
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
                    // TODO(mdr): We found a new Flow error when upgrading:
                    //     "widget (null) This type is incompatible with this._widget (LabelImageEditor)"
                    // $FlowFixMe[incompatible-type](0.52.0->0.53.0)
                    ref={(widget) => (this._widget = widget)}
                />
            </div>
        );
    }
}

export const Default = (args: StoryArgs): React.Node => {
    return <WithState />;
};
