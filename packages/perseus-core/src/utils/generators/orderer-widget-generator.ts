import ordererWidgetLogic from "../../widgets/orderer";

import type {
    OrdererWidget,
    PerseusOrdererWidgetOptions,
    PerseusRenderer,
} from "../../data-schema";

/**
 * Builds a single orderer card. The orderer stores each card as a
 * PerseusRenderer so that cards can contain math and images, but most tests
 * only care about the card's text.
 */
export function generateOrdererOption(content: string): PerseusRenderer {
    return {
        content,
        widgets: {},
        images: {},
    };
}

export function generateOrdererOptions(
    options?: Partial<PerseusOrdererWidgetOptions>,
): PerseusOrdererWidgetOptions {
    const merged = {
        ...ordererWidgetLogic.defaultWidgetOptions,
        ...options,
    };

    return {
        ...merged,
        // `options` holds every card in the bank: the correct answer plus the
        // distractors. We derive it so that overriding only `correctOptions`
        // or `otherOptions` still produces a valid widget.
        options: options?.options ?? [
            ...merged.correctOptions,
            ...merged.otherOptions,
        ],
    };
}

export function generateOrdererWidget(
    ordererWidgetProperties?: Partial<Omit<OrdererWidget, "type">>,
): OrdererWidget {
    return {
        type: "orderer",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        ...ordererWidgetProperties,
        options: generateOrdererOptions(ordererWidgetProperties?.options),
    };
}
