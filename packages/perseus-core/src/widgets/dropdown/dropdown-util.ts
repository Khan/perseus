import type {PerseusDropdownWidgetOptions} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusDropdownWidgetOptions type
 */
export type DropdownPublicWidgetOptions = {
    choices: ReadonlyArray<{content: string}>;
    placeholder: PerseusDropdownWidgetOptions["placeholder"];
    static: PerseusDropdownWidgetOptions["static"];
    visibleLabel?: PerseusDropdownWidgetOptions["visibleLabel"];
    ariaLabel?: PerseusDropdownWidgetOptions["ariaLabel"];
};

/**
 * Given a PerseusDropdownWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getDropdownPublicWidgetOptions(
    options: PerseusDropdownWidgetOptions,
): DropdownPublicWidgetOptions {
    return {
        choices: options.choices.map((choice) => ({content: choice.content})),
        placeholder: options.placeholder,
        static: options.static,
        visibleLabel: options.visibleLabel,
        ariaLabel: options.ariaLabel,
    };
}

export default getDropdownPublicWidgetOptions;
