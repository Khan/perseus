import {shuffleSorter} from "@khanacademy/perseus-core";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";

import Sortable from "../../components/sortable";
import {withAssetContext} from "../../components/with-asset-context";
import {withDependencies} from "../../components/with-dependencies";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/sorter/sorter-ai-utils";

import type {SortableOption} from "../../components/sortable";
import type {
    PerseusDependenciesV2,
    Widget,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {SorterPromptJSON} from "../../widget-ai-utils/sorter/sorter-ai-utils";
import type {
    PerseusSorterWidgetOptions,
    PerseusSorterUserInput,
    SorterPublicWidgetOptions,
} from "@khanacademy/perseus-core";

type Props = WidgetProps<PerseusSorterWidgetOptions, PerseusSorterUserInput> & {
    dependencies: PerseusDependenciesV2;
    // `setAssetStatus` is assumed to be idempotent; Sorter may call it with
    // the same value on every measurement.
    setAssetStatus: (assetKey: string, loaded: boolean) => void;
    assetKey: string;
};

type DefaultProps = {
    correct: Props["correct"];
    layout: Props["layout"];
    padding: Props["padding"];
    problemNum: Props["problemNum"];
    linterContext: Props["linterContext"];
};

export class Sorter extends React.Component<Props> implements Widget {
    _isMounted: boolean = false;

    static defaultProps: DefaultProps = {
        correct: [],
        layout: "horizontal",
        padding: true,
        problemNum: 0,
        linterContext: linterContextDefault,
    };

    componentDidMount() {
        this._isMounted = true;
        this.props.dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "sorter",
                widgetId: this.props.widgetId,
            },
        });
        // Register as unsettled; we'll flip to settled on first onMeasure.
        // An empty options list won't fire onMeasure, so settle immediately
        // in that case to avoid hanging the renderer's onRendered.
        this._setAssetStatus(this.props.userInput.options.length === 0);
    }

    componentWillUnmount() {
        this._isMounted = false;
        // Settle on unmount so a tear-down mid-cascade doesn't block the
        // renderer's onRendered indefinitely.
        this._setAssetStatus(true);
    }

    onMeasure: () => void = () => {
        // Unlike Matcher, Sorter doesn't resize its items to a shared height,
        // so the first measurement means the cards have finished rendering.
        // Settle on every measurement (see Props re: idempotency).
        this._setAssetStatus(true);
    };

    _setAssetStatus: (loaded: boolean) => void = (loaded) => {
        this.props.setAssetStatus(this.props.assetKey, loaded);
    };

    handleChange: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        if (!this._isMounted) {
            return;
        }

        this.props.handleUserInput({
            options: this._getOptionsFromSortable(),
            changed: true,
        });

        this.props.trackInteraction();
    };

    /**
     * This is kind of a problem. Sortable maintains an internal state
     * but we also want the user input state to include the same state.
     * This is to help keep the two in sync for now.
     */
    _getOptionsFromSortable(): string[] {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'getOptions' does not exist on type 'ReactInstance'.
        const options = this.refs.sortable.getOptions();
        return options;
    }

    getPromptJSON(): SorterPromptJSON {
        return _getPromptJSON(this.props.userInput);
    }

    moveOptionToIndex: (option: SortableOption, index: number) => void = (
        option,
        index,
    ) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'moveOptionToIndex' does not exist on type 'ReactInstance'.
        this.refs.sortable.moveOptionToIndex(option, index);
    };

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState
     */
    getSerializedState(): any {
        const {
            userInput,
            setAssetStatus: _,
            assetKey: __,
            ...rest
        } = this.props;
        return {
            ...rest,
            changed: userInput.changed,
            options: userInput.options,
        };
    }

    render(): React.ReactNode {
        const {apiOptions, userInput} = this.props;
        const marginPx = apiOptions.isMobile ? 8 : 5;

        return (
            <div className="perseus-widget-sorter perseus-clearfix">
                <Sortable
                    options={userInput.options}
                    layout={this.props.layout}
                    margin={marginPx}
                    padding={this.props.padding}
                    onChange={this.handleChange}
                    onMeasure={this.onMeasure}
                    linterContext={this.props.linterContext}
                    // eslint-disable-next-line react/no-string-refs
                    ref="sortable"
                />
            </div>
        );
    }
}

function getStartUserInput(
    options: SorterPublicWidgetOptions,
    problemNum: number,
): PerseusSorterUserInput {
    const shuffled = shuffleSorter(options, problemNum);

    return {
        options: shuffled,
        changed: false,
    };
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusSorterUserInput {
    return {
        changed: serializedState.changed,
        options: serializedState.options,
    };
}

const WrappedSorter = withAssetContext(withDependencies(Sorter), "sorter");

export default {
    name: "sorter",
    displayName: "Sorter",
    widget: WrappedSorter,
    isLintable: true,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof WrappedSorter>;
