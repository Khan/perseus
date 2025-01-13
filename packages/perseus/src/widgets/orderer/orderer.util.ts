import type {
    PerseusOrdererWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

export type OrdererPublicWidgetOptions = {
    // All of the options available to the user. Place the cards in the correct order. The same card can be used more than once in the answer but will only be displayed once at the top of a stack of identical cards.
    options: ReadonlyArray<PerseusRenderer>;
    // "normal" for text options.  "auto" for image options.
    height: "normal" | "auto";
    // Use the "horizontal" layout for short text and small images. The "vertical" layout is best for longer text (e.g. proofs).
    layout: "horizontal" | "vertical";
};

function getOrdererPublicOptions(
    options: PerseusOrdererWidgetOptions,
): OrdererPublicWidgetOptions {
    return {
        options: options.options,
        height: options.height,
        layout: options.layout,
    };
}

export default getOrdererPublicOptions;
