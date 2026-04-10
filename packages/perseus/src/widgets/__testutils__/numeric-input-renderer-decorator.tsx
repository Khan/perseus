import {
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {mockStrings} from "../../strings";
import UserInputManager from "../../user-input-manager";

import type {APIOptions} from "../../types";
import type {UserInputMap} from "@khanacademy/perseus-core";

export const numericInputRendererDecorator = (
    _,
    {
        args,
        parameters,
    }: {
        args: Record<string, unknown>;
        parameters?: {
            content?: string;
            apiOptions?: APIOptions;
            initialUserInput?: UserInputMap;
        };
    },
) => {
    const question = generateTestPerseusRenderer({
        content:
            parameters?.content ??
            "Registry numbers for USS Enterprise: [[☃ numeric-input 1]]",
        widgets: {
            "numeric-input 1": generateNumericInputWidget({
                options: generateNumericInputOptions({
                    ...args,
                }),
            }),
        },
    });

    return (
        <UserInputManager
            widgets={question.widgets}
            problemNum={0}
            initialUserInput={parameters?.initialUserInput}
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
                    apiOptions={parameters?.apiOptions ?? ApiOptions.defaults}
                />
            )}
        </UserInputManager>
    );
};
