// @flow
import * as React from "react";

import {ApiOptions} from "../../perseus-all-package/perseus-api.jsx";
import {getFixtureFnFor} from "../../testing/sandbox/fixture.js";

import LabelImageWidget from "./label-image.jsx";

const LabelImage = LabelImageWidget.widget;
type Props = React.ElementConfig<typeof LabelImage>;
class WithState extends React.Component<Props, Props> {
    constructor(props: Props) {
        super(props);

        this.state = {
            ...props,
        };
    }

    handleChange(options) {
        this.setState({
            ...options,
        });
    }

    render(): React.Node {
        return (
            <div
                // Apply absolute position style to the nested image element.
                className="framework-perseus"
                style={{width: 768}}
            >
                <LabelImage
                    {...this.state}
                    onChange={(options) => this.handleChange(options)}
                />
            </div>
        );
    }
}

const fixture = getFixtureFnFor(LabelImage);
export const instances: $ReadOnlyArray<mixed> = [
    fixture(
        "Default",
        {
            apiOptions: ApiOptions.defaults,
            choices: [
                "Lamborghini",
                "BMW",
                "Volkswagen",
                "Fiat",
                "$\\displaystyle f(x)=\\frac{1}{x}$",
                "Porsche",
                "Ferrari",
            ],
            imageAlt: "Map of Europe",
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
                    label: "Ukraine",
                    x: 70.0,
                    y: 50.0,
                },
                {
                    answers: [],
                    label: "England",
                    x: 21,
                    y: 46,
                },
                {
                    answers: [],
                    label: "France",
                    x: 25,
                    y: 65,
                },
                {
                    answers: ["Lamborghini", "Fiat", "Ferrari"],
                    label: "Italy",
                    x: 41.4,
                    y: 78.8,
                },
                {
                    answers: [],
                    label: "Russia",
                    x: 75.0,
                    y: 35.0,
                },
            ],
            multipleAnswers: true,
            hideChoicesFromInstructions: false,
            questionCompleted: false,
            onChange: () => {},
        },
        WithState,
    ),

    fixture(
        "Question graded",
        {
            apiOptions: ApiOptions.defaults,
            choices: [
                "Lamborghini",
                "BMW",
                "Volkswagen",
                "Fiat",
                "Porsche",
                "Ferrari",
            ],
            imageAlt: "Map of Europe",
            imageUrl:
                "https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",
            imageWidth: 1280,
            imageHeight: 1024,
            markers: [
                {
                    answers: ["BMW", "Volkswagen", "Porsche"],
                    selected: ["BMW", "Volkswagen", "Porsche"],
                    label: "Germany",
                    x: 37.3,
                    y: 53.6,
                    showCorrectness: "correct",
                },
                {
                    answers: [],
                    label: "England",
                    x: 21,
                    y: 46,
                },
                {
                    answers: ["Lamborghini", "Fiat", "Ferrari"],
                    selected: ["Lamborghini", "Ferrari"],
                    label: "Italy",
                    x: 41.4,
                    y: 78.8,
                    showCorrectness: "incorrect",
                },
            ],
            multipleAnswers: true,
            hideChoicesFromInstructions: false,
            questionCompleted: true,
            onChange: () => {},
        },
        WithState,
    ),

    fixture(
        "Question completed",
        {
            apiOptions: ApiOptions.defaults,
            choices: [
                "Lamborghini",
                "BMW",
                "Volkswagen",
                "Fiat",
                "Porsche",
                "Ferrari",
            ],
            imageAlt: "Map of Europe",
            imageUrl:
                "https://ka-perseus-images.s3.amazonaws.com/2ee5fc32e35c5178373b39fd304b325b2994c913.png",
            imageWidth: 1280,
            imageHeight: 1024,
            markers: [
                {
                    answers: ["BMW", "Volkswagen", "Porsche"],
                    selected: ["BMW", "Volkswagen", "Porsche"],
                    label: "Germany",
                    x: 37.3,
                    y: 53.6,
                },
                {
                    answers: [],
                    label: "England",
                    x: 21,
                    y: 46,
                },
                {
                    answers: ["Lamborghini", "Fiat", "Ferrari"],
                    selected: ["Lamborghini", "Fiat", "Ferrari"],
                    label: "Italy",
                    x: 41.4,
                    y: 78.8,
                },
            ],
            multipleAnswers: true,
            hideChoicesFromInstructions: false,
            questionCompleted: true,
            onChange: () => {},
        },
        WithState,
    ),

    fixture(
        "Graphie",
        {
            apiOptions: ApiOptions.defaults,
            choices: ["Min", "Max", "Q1", "Q3", "median"],
            imageAlt: "Error bar",
            imageUrl:
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/d72dcfc0990c79dd0b9d680f053789a6a77fc30f",
            imageWidth: 480,
            imageHeight: 175,
            markers: [
                {
                    answers: ["Min"],
                    selected: [],
                    label: "Min",
                    x: 12.5,
                    y: 41.5,
                },
                {
                    answers: ["Q1"],
                    selected: [],
                    label: "Q1",
                    x: 33.5,
                    y: 41.5,
                },
                {
                    answers: ["median"],
                    selected: ["median"],
                    label: "median",
                    x: 58.5,
                    y: 41.5,
                },
                {
                    answers: ["Q3"],
                    selected: [],
                    label: "Q3",
                    x: 75,
                    y: 41.5,
                },
                {
                    answers: ["Max"],
                    selected: [],
                    label: "Max",
                    x: 87.5,
                    y: 41.5,
                },
            ],
            multipleAnswers: true,
            hideChoicesFromInstructions: false,
            questionCompleted: false,
            onChange: () => {},
        },
        WithState,
    ),
];
