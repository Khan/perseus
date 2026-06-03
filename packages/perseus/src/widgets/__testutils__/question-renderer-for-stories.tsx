import * as React from "react";

import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {mockStrings} from "../../strings";
import {StorybookFeatureFlagsContext} from "../../testing/feature-flags-context";
import UserInputManager from "../../user-input-manager";

import type {APIOptions} from "../../types";
import type {PerseusRenderer, UserInputMap} from "@khanacademy/perseus-core";

export default function QuestionRendererForStories(props: {
    question: PerseusRenderer;
    apiOptions?: APIOptions;
    initialUserInput?: UserInputMap;
}) {
    const {question, apiOptions, initialUserInput} = props;
    const contextFlags = React.useContext(StorybookFeatureFlagsContext);
    const mergedApiOptions = React.useMemo(
        () => ({
            ...(apiOptions ?? ApiOptions.defaults),
            flags: {...contextFlags, ...apiOptions?.flags},
        }),
        [apiOptions, contextFlags],
    );
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
                    apiOptions={mergedApiOptions}
                />
            )}
        </UserInputManager>
    );
}
