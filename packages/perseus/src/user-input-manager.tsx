import {entries} from "@khanacademy/wonder-stuff-core";
import {useEffect, useRef, useState} from "react";

import {getWidgetTypeByWidgetId} from "./widget-type-utils";
import * as Widgets from "./widgets";

import type {PerseusWidgetsMap, UserInputMap} from "@khanacademy/perseus-core";

export type InitializeUserInputCallback = (
    widgetOptions: PerseusWidgetsMap,
    problemNum: number,
) => void;

export type RestoreUserInputFromSerializedStateCallback = (
    serializedState: unknown,
    widgetOptions: PerseusWidgetsMap,
) => void;

export type HandleUserInputCallback = (
    id: string,
    userInput: UserInputMap[keyof UserInputMap],
) => void;

type UserInputManagerPayload = {
    userInput: UserInputMap;
    handleUserInput: HandleUserInputCallback;
    initializeUserInput: InitializeUserInputCallback;
    // TODO(LEMS-3185): remove serializedState/restoreSerializedState
    /**
     * @deprecated - do not use in new code.
     */
    restoreUserInputFromSerializedState: RestoreUserInputFromSerializedStateCallback;
};

type Props = {
    widgets: PerseusWidgetsMap;
    problemNum: number;
    children: (payload: UserInputManagerPayload) => JSX.Element | null;
};

/**
 * Initialize the starting UserInput state:
 * - for static widgets, that's the correct UserInput
 * - some widgets just like having something to start with
 * - some widgets use initial UserInput state as the "shuffled state"
 *   (which is why we need problemNum since it's the seed)
 */
export function sharedInitializeUserInput(
    widgetOptions: PerseusWidgetsMap,
    problemNum: number,
): UserInputMap {
    const startUserInput: UserInputMap = {};
    entries(widgetOptions).forEach(([id, widgetInfo]) => {
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

// TODO(LEMS-3185): remove serializedState/restoreSerializedState
/**
 * Restore user input from serialized state. It's tricky
 * because there is no definite type for serialized state,
 * so widgets need to handle it themselves and overall the process
 * is very fragile.
 *
 * @deprecated - do not use in new code.
 */
export function sharedRestoreUserInputFromSerializedState(
    serializedState: unknown,
    widgetOptions: PerseusWidgetsMap,
): UserInputMap {
    const restoredUserInput: UserInputMap = {};
    Object.entries(serializedState as any).forEach(([widgetId, props]) => {
        const widgetType = getWidgetTypeByWidgetId(widgetId, widgetOptions);
        const widgetExport = Widgets.getWidgetExport(widgetType as string);

        if (widgetExport?.getUserInputFromSerializedState) {
            const restoreResult = widgetExport.getUserInputFromSerializedState(
                props,
                widgetOptions[widgetId].options,
            );
            restoredUserInput[widgetId] = restoreResult;
        }
    });

    return restoredUserInput;
}

export default function UserInputManager(props: Props) {
    const [initialized, setInitialized] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<UserInputMap>({});
    const prevProblemNum = useRef<number>(props.problemNum);

    useEffect(() => {
        if (prevProblemNum.current !== props.problemNum) {
            prevProblemNum.current = props.problemNum;
            setInitialized(false);
        }
    }, [props.problemNum]);

    useEffect(() => {
        if (!initialized) {
            initializeUserInput(props.widgets, props.problemNum ?? 0);
        }
    }, [initialized, props.widgets, props.problemNum]);

    /**
     * Update userInput state by merging existing full UserInput
     * with partial UserInput (using widget ID)
     */
    function handleUserInput(
        id: string,
        nextUserInput: UserInputMap[keyof UserInputMap],
    ) {
        setUserInput({
            ...userInput,
            [id]: nextUserInput,
        });
    }

    function initializeUserInput(
        widgetOptions: PerseusWidgetsMap,
        problemNum: number,
    ) {
        setUserInput(sharedInitializeUserInput(widgetOptions, problemNum));
        setInitialized(true);
    }

    /**
     * Restore UserInput from SerializedState (please do not add new uses of this)
     */
    function restoreUserInputFromSerializedState(
        serializedState: unknown,
        widgetOptions: PerseusWidgetsMap,
    ) {
        setUserInput(
            sharedRestoreUserInputFromSerializedState(
                serializedState,
                widgetOptions,
            ),
        );
    }

    if (!initialized) {
        return null;
    }

    return props.children({
        userInput,
        handleUserInput,
        initializeUserInput,
        restoreUserInputFromSerializedState,
    });
}
