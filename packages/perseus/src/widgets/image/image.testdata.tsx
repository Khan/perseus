import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {getFeatureFlags} from "../../../../../testing/feature-flags-util";
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {mockStrings} from "../../strings";
import UserInputManager from "../../user-input-manager";

export const question = generateTestPerseusRenderer({
    content:
        "[[☃ image 1]]\n\n=====\n\nA quilter wants to make the design shown at left using the Golden Ratio. Specifically, he wants the ratio of the triangle heights $A:B$ and $B:C$ to each equal $1.62$. If the quilter makes the triangle height $A=8\\ \\text{in}$, approximately how tall should he make triangle height $C$?",
    widgets: {
        "image 1": generateImageWidget({
            options: generateImageOptions({
                title: "Image Title",
                caption: "Image Caption",
                alt: "An array of isosceles triangles. A triangle has height A. Two smaller triangle, one with height B and one with height C, have approximately the same combined height as A.",
                backgroundImage: {
                    url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2ac8f769a7323f55e41c12cfa39e774be08bc138",
                    width: 420,
                    height: 345,
                },
            }),
        }),
    },
});

export const questionWithZoom = generateTestPerseusRenderer({
    content:
        "[[☃ image 1]]\n\n=====\n\nIn the apse, or semicircular recess, The Offer of the Casa Madre to Victory (L’Offerta della Casa Madre alla Vittoria) fresco recalls medieval apse decorative schemes with Christ surrounded by saints to whom the Church is dedicated. Santagata replaced Mary with a triumphant and wingless figure representing Victory, and he replaced saints with sentries. The charismatic wounded veteran Carlo Delcroix, who became the AMNIG president, is depicted presenting a model of the Casa Madre to Victory (not unlike the medieval patron Enrico Scrovegni, who offered the Arena chapel he commissioned to the Virgin Mary).",
    widgets: {
        "image 1": generateImageWidget({
            options: generateImageOptions({
                title: "The Offer of the Casa Madre to Victory, 1932",
                caption:
                    "Carlo Delcroix presenting the Casa Madre (highlighted) to Victory. Antonio Giuseppe Santagata, The Offer of the Casa Madre to Victory, 1932, fresco (apse, assembly hall, Home for Wounded War Veterans, Rome, photo ©ANMIG)",
                alt: "Carlo Delcroix presenting the Casa Madre (highlighted) to Victory. Antonio Giuseppe Santagata, The Offer of the Casa Madre to Victory, 1932, fresco (apse, assembly hall, Home for Wounded War Veterans, Rome, photo ©ANMIG)",
                backgroundImage: {
                    url: "https://cdn.kastatic.org/ka-perseus-images/01f44d5b73290da6bec97c75a5316fb05ab61f12.jpg",
                    width: 1698,
                    height: 955,
                },
            }),
        }),
    },
});

export const earthMoonImageCaption =
    "The Moon above Earth's horizon, captured by the International Space Station, [NASA](https://images.nasa.gov/details/iss071e515452)";

export function ImageQuestionRenderer(props: {question: PerseusRenderer}) {
    const {question} = props;
    return (
        <UserInputManager widgets={question.widgets} problemNum={0}>
            {({userInput, handleUserInput, initializeUserInput}) => (
                <Renderer
                    userInput={userInput}
                    handleUserInput={handleUserInput}
                    initializeUserInput={initializeUserInput}
                    strings={mockStrings}
                    content={question.content}
                    widgets={question.widgets}
                    images={question.images}
                    apiOptions={{
                        ...ApiOptions.defaults,
                        flags: getFeatureFlags({"image-widget-upgrade": true}),
                    }}
                />
            )}
        </UserInputManager>
    );
}

// Breaking this out instead of using it globally, so that the
// right-to-left story can wrap the ImageQuestionRenderer with the
// right-to-left wrapper.
export const rendererDecorator = (_, {args, parameters}) => {
    return (
        <ImageQuestionRenderer
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            ...args,
                        }),
                    }),
                },
            })}
        />
    );
};
