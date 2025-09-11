import {useState} from "react";

import {getWidgetTypeByWidgetId} from "./widget-type-utils";
import * as Widgets from "./widgets";

import type {PerseusWidgetsMap, UserInputMap} from "@khanacademy/perseus-core";

export type InitializeUserInputCallback = (
    widgetOptions: PerseusWidgetsMap,
    problemNum: number,
) => void;

export type HandleUserInputCallback = (
    widgetId: string,
    userInput: UserInputMap[keyof UserInputMap],
    widgetsEmpty: boolean,
) => void;

type FunctionChildParams = {
    userInput: UserInputMap;
    handleUserInput: HandleUserInputCallback;
    initializeUserInput: InitializeUserInputCallback;
};

type Props = {
    widgets: PerseusWidgetsMap;
    problemNum: number;
    initialUserInput?: UserInputMap;
    handleUserInput?: (userInput: UserInputMap, widgetsEmpty: boolean) => void;
    children: (payload: FunctionChildParams) => JSX.Element | null;
};

/**
 * Initialize the starting UserInput state:
 * - for static widgets, that's the correct UserInput
 * - some widgets just like having something to start with
 * - some widgets use initial UserInput state as the "shuffled state"
 *   (which is why we need problemNum since it's the seed)
 */
export function sharedInitializeUserInput(
    widgetOptions: PerseusWidgetsMap | undefined,
    problemNum: number,
): UserInputMap {
    const startUserInput: UserInputMap = {};

    if (!widgetOptions) {
        return startUserInput;
    }

    Object.entries(widgetOptions).forEach(([id, widgetInfo]) => {
        const widgetExports = Widgets.getWidgetExport(widgetInfo.type);
        if (widgetInfo.static && widgetExports?.getCorrectUserInput) {
            startUserInput[id] = widgetExports.getCorrectUserInput(
                widgetInfo.options,
            );
        } else if (widgetExports?.getStartUserInput) {
            startUserInput[id] = widgetExports.getStartUserInput(
                widgetInfo.options,
                problemNum ?? 0,
            );
        }
    });

    return startUserInput;
}

// TODO(LEMS-3185): remove serializedState
/**
 * Restore user input from serialized state. It's tricky
 * because there is no definite type for serialized state,
 * so widgets need to handle it themselves and overall the process
 * is very fragile.
 *
 * @deprecated - do not use in new code.
 */
export function deriveUserInputFromSerializedState(
    serializedState: unknown,
    widgetsMap: PerseusWidgetsMap,
): UserInputMap {
    const restoredUserInput: UserInputMap = {};
    Object.entries(serializedState as any).forEach(([widgetId, props]) => {
        const widgetType = getWidgetTypeByWidgetId(widgetId, widgetsMap);
        const widgetExport = Widgets.getWidgetExport(widgetType as string);

        if (widgetExport?.getUserInputFromSerializedState) {
            const restoreResult = widgetExport.getUserInputFromSerializedState(
                props,
                widgetsMap[widgetId].options,
            );
            restoredUserInput[widgetId] = restoreResult;
        }
    });

    return restoredUserInput;
}

/**
 * UserInputManager is a stateful wrapper for handling and storing user input.
 * Ideally we'll get to a place where widgets are functional components
 * (or wrapped in functional components) and we can replace this with a
 * combination of Context/Hooks so that it can just wrap all of Perseus and
 * widgets can managing fetching/updating their own state via hooks.
 */
export default function UserInputManager(props: Props) {
    const [userInput, setUserInput] = useState<UserInputMap>(
        props.initialUserInput ||
            sharedInitializeUserInput(props.widgets, props.problemNum ?? 0),
    );

    /**
     * Update userInput state by merging existing full UserInput
     * with partial UserInput (using widget ID)
     */
    function handleUserInput(
        id: string,
        nextUserInput: UserInputMap[keyof UserInputMap],
        widgetsEmpty: boolean,
    ) {
        const next = {
            ...userInput,
            [id]: nextUserInput,
        };
        setUserInput(next);
        props.handleUserInput?.(next, widgetsEmpty);
    }

    function initializeUserInput(
        widgetOptions: PerseusWidgetsMap,
        problemNum: number,
    ) {
        setUserInput(
            props.initialUserInput ||
                sharedInitializeUserInput(widgetOptions, problemNum),
        );
    }

    return props.children({
        userInput,
        handleUserInput,
        initializeUserInput,
    });
}
