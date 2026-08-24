import type {
    PerseusOrdererWidgetOptions,
    PerseusRenderer,
} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusOrdererWidgetOptions type
 */
export type OrdererPublicWidgetOptions = Pick<
    PerseusOrdererWidgetOptions,
    "options" | "height" | "layout"
>;

/**
 * Given a PerseusOrdererWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
export function getOrdererPublicWidgetOptions(
    fullOptions: PerseusOrdererWidgetOptions,
): OrdererPublicWidgetOptions {
    const {options, height, layout} = fullOptions;
    return {options, height, layout};
}

export const toCard = (content: string): PerseusRenderer => ({
    content,
    widgets: {},
    images: {},
});

// Cards are displayed grouped by content: numbers first, then everything
// else, then bare variables and $tex$.
const getCategoryScore = (content: string): number => {
    if (/\d/.test(content)) {
        return 0;
    }
    if (/^\$?[a-zA-Z]+\$?$/.test(content)) {
        return 2;
    }
    return 1;
};

/**
 * The cards the student picks from: the correct answer and the distractors,
 * with duplicates and empty cards removed.
 *
 * The sort is what keeps the answer ordering out of the card bank, so this is
 * the only way `options` should ever be derived — it ships to the client
 * verbatim via getOrdererPublicWidgetOptions.
 */
export const mergeCards = (
    correctOptions: PerseusRenderer[],
    otherOptions: PerseusRenderer[],
): PerseusRenderer[] => {
    const allCards = [...correctOptions, ...otherOptions];

    return [...new Set(allCards.map((card) => card.content))]
        .filter((content) => content !== "")
        .sort()
        .sort((a, b) => getCategoryScore(a) - getCategoryScore(b))
        .map(toCard);
};
