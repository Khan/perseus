// @flow
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import QuestionMarkers from "../question-markers.jsx";

import type {MarkerType} from "@khanacademy/perseus";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Editor/Widgets/Label Image/Question Markers",
}: Story);

const styles = StyleSheet.create({
    wrapper: {
        // The maximum width of a widget in the editor.
        width: 338,
    },
});

const Wrapper = (props) => (
    <div className={css(styles.wrapper)}>
        <QuestionMarkers {...props} />
    </div>
);

class WithState extends React.Component<
    {||},
    {|markers: $ReadOnlyArray<MarkerType>|},
> {
    state = {
        markers: [
            {
                answers: [],
                label: "",
                x: 50,
                y: 50,
            },
        ],
    };

    render(): React.Node {
        const {markers} = this.state;

        return (
            <div className={css(styles.wrapper)}>
                <QuestionMarkers
                    choices={[
                        "Lamborghini",
                        "BMW",
                        "Volkswagen",
                        "Fiat",
                        "Porsche",
                        "Ferrari",
                    ]}
                    imageUrl="https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png"
                    imageWidth={1280}
                    imageHeight={1024}
                    markers={markers}
                    onChange={(markers) => this.setState({markers})}
                />
            </div>
        );
    }
}

export const Empty = (args: StoryArgs): React.Node => {
    const props = {
        choices: [],
        imageUrl: "",
        imageWidth: 0,
        imageHeight: 0,
        markers: [],
        onChange: () => {},
    };
    return <Wrapper {...props} />;
};

export const Filled = (args: StoryArgs): React.Node => {
    const props = {
        choices: [],
        imageUrl:
            "https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",
        imageWidth: 1280,
        imageHeight: 1024,
        markers: [
            {
                answers: [],
                label: "",
                x: 50,
                y: 50,
            },
        ],
        onChange: () => {},
    };
    return <Wrapper {...props} />;
};

export const Interactive = (args: StoryArgs): React.Node => {
    return <WithState />;
};
