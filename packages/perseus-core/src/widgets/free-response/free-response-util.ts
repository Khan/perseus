import type {PerseusFreeResponseWidgetOptions} from "../../data-schema";

/**
 * For details on the individual options, see the
 * {@link PerseusFreeResponseWidgetOptions} type
 */
type FreeResponsePublicWidgetOptions = {
    allowUnlimitedCharacters: PerseusFreeResponseWidgetOptions["allowUnlimitedCharacters"];
    characterLimit: PerseusFreeResponseWidgetOptions["characterLimit"];
    placeholder: PerseusFreeResponseWidgetOptions["placeholder"];
    question: PerseusFreeResponseWidgetOptions["question"];
};

/**
 * Given a FreeResponsePublicWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getFreeResponsePublicWidgetOptions(
    options: PerseusFreeResponseWidgetOptions,
): FreeResponsePublicWidgetOptions {
    return {
        allowUnlimitedCharacters: options.allowUnlimitedCharacters,
        characterLimit: options.characterLimit,
        placeholder: options.placeholder,
        question: options.question,
    };
}

export default getFreeResponsePublicWidgetOptions;
