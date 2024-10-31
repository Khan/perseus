import {textQuestion} from "./__tests__/label-image.testdata";
import {getPromptJSON} from "./prompt-utils";

describe("LabelImage getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const labelImageOptions = textQuestion.widgets["label-image 1"].options;

        const renderProps: any = {
            markers: labelImageOptions.markers,
            choices: labelImageOptions.choices,
            imageUrl: labelImageOptions.imageUrl,
            imageAlt: labelImageOptions.imageAlt,
        };

        const userInput: any = {
            markers: [
                {
                    label: labelImageOptions.markers[0].label,
                    selected: [labelImageOptions.choices[1]],
                },
                {
                    label: labelImageOptions.markers[1].label,
                    selected: [labelImageOptions.choices[0]],
                },
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        const expectedMarkers = renderProps.markers.map((marker) => {
            return {
                label: marker.label,
            };
        });

        expect(resultJSON).toEqual({
            type: "label-image",
            options: {
                choices: renderProps.choices,
                imageUrl: renderProps.imageUrl,
                imageAlt: renderProps.imageAlt,
                markers: expectedMarkers,
            },
            userInput: {
                markers: userInput.markers,
            },
        });
    });
});
