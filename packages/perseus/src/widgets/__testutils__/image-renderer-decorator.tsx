// Breaking this out instead of using it globally, so that the
// right-to-left story can wrap the ImageQuestionRenderer with the
// right-to-left wrapper.
import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {mockStrings} from "../../strings";
import UserInputManager from "../../user-input-manager";

import type {APIOptions} from "../../types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

export const imageRendererDecorator = (_, {args, parameters}) => {
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
            apiOptions={parameters?.apiOptions}
        />
    );
};

export function ImageQuestionRenderer(props: {
    question: PerseusRenderer;
    apiOptions?: APIOptions;
}) {
    const {question, apiOptions} = props;
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
                    apiOptions={apiOptions ?? ApiOptions.defaults}
                />
            )}
        </UserInputManager>
    );
}
