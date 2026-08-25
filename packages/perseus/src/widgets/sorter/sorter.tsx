import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {forwardRef, useImperativeHandle, useRef} from "react";

import Sortable from "../../components/sortable";
import {useDependencies} from "../../dependencies";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/sorter/sorter-ai-utils";

import type {SortableOption} from "../../components/sortable";
import type {Widget, WidgetProps} from "../../types";
import type {SorterPromptJSON} from "../../widget-ai-utils/sorter/sorter-ai-utils";
import type {
    PerseusSorterWidgetOptions,
    PerseusSorterUserInput,
} from "@khanacademy/perseus-core";

type Props = WidgetProps<PerseusSorterWidgetOptions, PerseusSorterUserInput>;

export interface SorterHandle extends Widget {
    /**
     * Programatic API for moving options. This is used by testing.
     *
     * @deprecated prefer user interaction testing over backdoor
     * state manipulation
     */
    moveOptionToIndex: (option: SortableOption, index: number) => void;
}

const Sorter = forwardRef<SorterHandle, Props>(function Sorter(props, ref) {
    const dependencies = useDependencies();
    const sortable = useRef<Sortable>(null);

    const {options, userInput, widgetId, linterContext, apiOptions} = props;
    const {layout, padding} = options;

    useOnMountEffect(() => {
        dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "sorter",
                widgetId: widgetId,
            },
        });
    });

    useImperativeHandle(
        ref,
        () => ({
            moveOptionToIndex: (option, index) => {
                sortable.current?.moveOptionToIndex(option, index);
            },

            getPromptJSON: (): SorterPromptJSON =>
                _getPromptJSON(props.userInput),

            /**
             * @deprecated and likely very broken API
             * [LEMS-3185] do not trust serializedState
             */
            getSerializedState: (): any => {
                const {userInput, options, ...rest} = props;
                return {
                    ...rest,
                    ...options,
                    changed: userInput.changed,
                    options: userInput.options,
                };
            },
        }),
        [props],
    );

    function handleChange() {
        props.handleUserInput({
            /**
             * This is kind of a problem. Sortable maintains an internal state
             * but we also want the user input state to include the same state.
             * This is to help keep the two in sync for now.
             */
            options: sortable.current?.getOptions() ?? [],
            changed: true,
        });

        props.trackInteraction();
    }

    return (
        <div className="perseus-clearfix">
            <Sortable
                options={userInput.options}
                layout={layout}
                margin={apiOptions.isMobile ? 8 : 5}
                padding={padding}
                onChange={handleChange}
                linterContext={linterContext}
                ref={sortable}
            />
        </div>
    );
});

export default Sorter;
