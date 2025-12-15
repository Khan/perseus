import {Id, View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import React, {forwardRef, useEffect, useImperativeHandle, useRef} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import {withDependencies} from "../../components/with-dependencies";
import {ApiOptions} from "../../perseus-api";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/dropdown/dropdown-ai-utils";

import type {
    FocusPath,
    PerseusDependenciesV2,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {DropdownPromptJSON} from "../../widget-ai-utils/dropdown/dropdown-ai-utils";
import type {
    PerseusDropdownUserInput,
    PerseusDropdownWidgetOptions,
} from "@khanacademy/perseus-core";

type Props = WidgetProps<
    PerseusDropdownWidgetOptions,
    PerseusDropdownUserInput
> & {
    dependencies: PerseusDependenciesV2;
};

// Widget interface methods exposed via ref
type WidgetHandle = {
    focus: () => boolean;
    getPromptJSON: () => DropdownPromptJSON;
    getDOMNodeForPath: (path: FocusPath) => Element | null;
    getSerializedState: () => any;
};

const Dropdown = forwardRef<WidgetHandle, Props>(function Dropdown(props, ref) {
    const {strings} = usePerseusI18n();

    const {
        choices = [],
        placeholder = "",
        apiOptions = ApiOptions.defaults,
        userInput = {value: 0},
        static: isStatic = false,
        dependencies,
        visibleLabel,
        ariaLabel,
        widgetId,
        trackInteraction,
        handleUserInput,
    } = props;

    // Fire analytics event on mount
    // We intentionally use an empty dependency array here because this analytics
    // event should only fire once when the component mounts, not when props change.
    useEffect(() => {
        dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "dropdown",
                widgetId: widgetId,
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handler for dropdown value changes
    const handleChange = (selected: number): void => {
        trackInteraction();
        handleUserInput({value: selected});
    };

    // Ref to the View wrapper for focus and event handling
    const rootRef = useRef<HTMLDivElement>(null);

    // Expose Widget interface methods via ref
    useImperativeHandle(ref, () => ({
        focus: (): boolean => {
            // Don't attempt to focus when interactions are disabled
            if (apiOptions.readOnly || isStatic) {
                return false;
            }

            if (!rootRef.current) {
                return false;
            }

            // SingleSelect doesn't forward refs, so we find the combobox button it renders
            const button = rootRef.current.querySelector("[role='combobox']");
            if (!(button instanceof HTMLElement)) {
                return false;
            }

            // Skip focusing if the button is disabled (either native or via aria-disabled)
            if (
                (button instanceof HTMLButtonElement && button.disabled) ||
                button.getAttribute("aria-disabled") === "true"
            ) {
                return false;
            }

            const previouslyFocused = document.activeElement;
            button.focus();
            // Return true only when focus actually moved onto the combobox; if it was
            // already focused (e.g., caller invoked focus twice) report false to avoid
            // signaling a state change that didn't happen.
            return (
                document.activeElement === button &&
                previouslyFocused !== button
            );
        },
        getPromptJSON: (): DropdownPromptJSON => {
            return _getPromptJSON(props);
        },
        getDOMNodeForPath: (path: FocusPath): Element | null => {
            // Dropdown is a simple widget with no internal focus paths
            // Return the root element for empty paths
            if (path?.length === 0) {
                return rootRef.current;
            }
            return null;
        },
        /**
         * @deprecated and likely very broken API
         * [LEMS-3185] do not trust serializedState
         */
        getSerializedState: (): any => {
            const {userInput, choices, ...rest} = props;
            return {
                ...rest,
                choices: choices.map((choice) => choice.content),
                selected: userInput.value,
            };
        },
    }));

    const children = [
        <OptionItem
            key="placeholder"
            value="0"
            disabled
            label={<Renderer content={placeholder} strings={strings} />}
            labelAsText={placeholder}
        />,
        ...choices.map((choice, i) => (
            <OptionItem
                key={String(i + 1)}
                value={String(i + 1)}
                label={<Renderer content={choice.content} strings={strings} />}
                labelAsText={choice.content}
            />
        )),
    ];

    return (
        <Id>
            {(dropdownId) => (
                <View
                    ref={rootRef}
                    // NOTE(jared): These are required to prevent weird behavior
                    // When there's a dropdown in a zoomable table.
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onTouchStart={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {visibleLabel && (
                        <LabelLarge tag="label" htmlFor={dropdownId}>
                            {visibleLabel}
                        </LabelLarge>
                    )}
                    <SingleSelect
                        id={dropdownId}
                        placeholder=""
                        className="perseus-dropdown"
                        onChange={(value) => handleChange(parseInt(value))}
                        selectedValue={String(userInput.value)}
                        disabled={apiOptions.readOnly || isStatic}
                        aria-label={
                            ariaLabel || visibleLabel || strings.selectAnAnswer
                        }
                        showOpenerLabelAsText={false}
                    >
                        {children}
                    </SingleSelect>
                </View>
            )}
        </Id>
    );
});

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusDropdownUserInput {
    return {value: serializedState.selected};
}

function getStartUserInput(): PerseusDropdownUserInput {
    return {
        value: 0,
    };
}

function getCorrectUserInput(
    options: PerseusDropdownWidgetOptions,
): PerseusDropdownUserInput {
    return {value: options.choices.findIndex((c) => c.correct) + 1};
}

const WrappedDropdown = withDependencies(Dropdown);

export default {
    name: "dropdown",
    displayName: "Drop down",
    widget: WrappedDropdown,
    getStartUserInput,
    getCorrectUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof WrappedDropdown>;
