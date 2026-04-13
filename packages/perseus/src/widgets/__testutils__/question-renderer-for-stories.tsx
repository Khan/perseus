import * as React from "react";

import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {mockStrings} from "../../strings";
import UserInputManager from "../../user-input-manager";

import type {APIOptions} from "../../types";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

export default function QuestionRendererForStories(props: {
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
