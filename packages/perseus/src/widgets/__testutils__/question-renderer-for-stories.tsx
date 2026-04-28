import * as React from "react";

import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {mockStrings} from "../../strings";
import UserInputManager from "../../user-input-manager";

import type {APIOptions} from "../../types";
import type {PerseusRenderer, UserInputMap} from "@khanacademy/perseus-core";

export default function QuestionRendererForStories(props: {
    question: PerseusRenderer;
    apiOptions?: APIOptions;
    initialUserInput?: UserInputMap;
}) {
    const {question, apiOptions, initialUserInput} = props;
    return (
        <UserInputManager
            widgets={question.widgets}
            problemNum={0}
            initialUserInput={initialUserInput}
        >
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
