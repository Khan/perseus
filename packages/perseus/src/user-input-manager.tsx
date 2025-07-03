import {entries} from "@khanacademy/wonder-stuff-core";
import {useState} from "react";

import {getWidgetTypeByWidgetId} from "./widget-type-utils";
import * as Widgets from "./widgets";

import type {PerseusWidgetsMap, UserInputMap} from "@khanacademy/perseus-core";

export type InitializeUserInputCallback = (
    widgetOptions: PerseusWidgetsMap,
    problemNum: number,
) => void;

export type RestoreUserInputFromSerializedStateCallback = (
    serializedState: any,
    widgetOptions: PerseusWidgetsMap,
) => void;

export type HandleUserInputCallback = (
    id: string,
    userInput: UserInputMap[keyof UserInputMap],
) => void;

type WrapperPayload = {
    initialized: boolean;
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
    children: (payload: WrapperPayload) => JSX.Element | null;
};

export default function UserInputManager(props: Props) {
    const [initialized, setInitialized] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<UserInputMap>({});

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

    /**
     * Initialize the starting UserInput state:
     * - for static widgets, that's the correct UserInput
     * - some widgets just like having something to start with
     * - some widgets use initial UserInput state as the "shuffled state"
     *   (which is why we need problemNum since it's the seed)
     */
    function initializeUserInput(
        widgetOptions: PerseusWidgetsMap,
        problemNum: number,
    ) {
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
        setUserInput(startUserInput);
        setInitialized(true);
    }

    /**
     * Restore UserInput from SerializedState (please do not add new uses of this)
     */
    function restoreUserInputFromSerializedState(
        serializedState: any,
        widgetOptions: PerseusWidgetsMap,
    ) {
        const restoredUserInput = {};
        Object.entries(serializedState.question).forEach(
            ([widgetId, props]) => {
                const widgetType = getWidgetTypeByWidgetId(
                    widgetId,
                    widgetOptions,
                );
                const widgetExport = Widgets.getWidgetExport(
                    widgetType as string,
                );

                if (widgetExport?.getUserInputFromSerializedState) {
                    const restoreResult =
                        widgetExport.getUserInputFromSerializedState(props);
                    restoredUserInput[widgetId] = restoreResult;
                }
            },
        );
        setUserInput(restoredUserInput);
    }

    return props.children({
        initialized,
        userInput,
        handleUserInput,
        initializeUserInput,
        restoreUserInputFromSerializedState,
    });
}
