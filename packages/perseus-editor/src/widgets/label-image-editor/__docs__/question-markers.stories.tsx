import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import QuestionMarkers from "../question-markers";

import type {PerseusLabelImageWidgetOptions} from "@khanacademy/perseus-core";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Label Image/Widget Internal Components/Question Markers",
} as Story;

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
    Record<any, any>,
    {
        markers: PerseusLabelImageWidgetOptions["markers"];
    }
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

    render(): React.ReactNode {
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

export const Empty = (args: StoryArgs): React.ReactElement => {
    const props = {
        choices: [],
        imageUrl: "",
        imageWidth: 0,
        imageHeight: 0,
        markers: [],
        onChange: () => {},
    } as const;
    return <Wrapper {...props} />;
};

export const Filled = (args: StoryArgs): React.ReactElement => {
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
    } as const;
    return <Wrapper {...props} />;
};

export const Interactive = (args: StoryArgs): React.ReactElement => {
    return <WithState />;
};
