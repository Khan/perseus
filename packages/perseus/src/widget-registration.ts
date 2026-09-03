import type {WidgetExports} from "./types";
import type {PerseusWidgetTypes, WidgetLogic} from "@khanacademy/perseus-core";

/**
 * The authoring options for a widget type, as declared in the data schema.
 * Widget types absent from the schema (test-only mocks, `deprecated-standin`)
 * have no declared options, so they impose no constraint.
 */
type FullWidgetOptions<TName extends string> =
    TName extends keyof PerseusWidgetTypes
        ? PerseusWidgetTypes[TName]["options"]
        : any;

/**
 * The pairing of one widget type's React export with its core logic.
 *
 * A registration is inert data; registering it is the caller's job.
 */
export type WidgetRegistration<TName extends string = string> = Readonly<{
    widget: WidgetExports<TName, any, any>;
    logic: WidgetLogic<TName, any, any>;
}>;

// Intersected into the argument type when the public options are not derivable
// from the widget options; the impossible property makes the call fail to
// compile with the property name as the explanation.
type PublicOptionsMismatch = {
    readonly publicWidgetOptionsMustBeASubsetOfTheWidgetOptions: never;
};

/**
 * Pair a widget's React export with its core logic, checking at compile time
 * that the two describe the same widget type. Returns its input unchanged.
 */
export function defineWidgetRegistration<
    TName extends string,
    TPublicOptions = FullWidgetOptions<TName>,
>(
    registration: {
        widget: WidgetExports<TName, any, any>;
        // NoInfer pins the type name to the widget's, so a logic for another
        // widget is a name mismatch rather than a widened union of both.
        logic: WidgetLogic<
            NoInfer<TName>,
            FullWidgetOptions<TName>,
            TPublicOptions
        >;
    } & (FullWidgetOptions<TName> extends TPublicOptions
        ? unknown
        : PublicOptionsMismatch),
): WidgetRegistration<TName> {
    return registration;
}
