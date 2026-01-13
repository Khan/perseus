import type {Version} from "../data-schema";
import type {Alignment} from "../types";

export type WidgetOptionsUpgradeMap = {
    // OldProps => NewProps,
    [targetMajorVersion: string]: (arg1: any) => any;
};

/**
 * A generic function type for transforming widget options into their public
 * (client-safe) version by filtering out answer/rubric data.
 */
export type PublicWidgetOptionsFunction<
    TWidgetOptions,
    TPublicWidgetOptions = TWidgetOptions,
> = (options: TWidgetOptions) => TPublicWidgetOptions;

export type WidgetLogic<
    TWidgetOptions,
    TPublicWidgetOptions = TWidgetOptions,
> = {
    name: string;
    version?: Version;
    defaultWidgetOptions?: any;
    supportedAlignments?: ReadonlyArray<Alignment>;
    defaultAlignment?: Alignment;
    accessible?: boolean | ((options: TWidgetOptions) => boolean);
    traverseChildWidgets?: (props: any, traverseRenderer: any) => any;

    /**
     * A function that provides a public version of the widget options that can
     * be shared with the client.
     */
    getPublicWidgetOptions?: PublicWidgetOptionsFunction<
        TWidgetOptions,
        TPublicWidgetOptions
    >;
};
