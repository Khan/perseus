import {linterWarning} from "../lint";
import Rule from "../rule";

/**
 * How a choice reads once math delimiters and spacing are ignored, so that
 * "$\frac{1}{2}$" and "\frac{1}{2} " count as the same choice.
 */
function normalize(content: string): string {
    return content.replace(/\$/g, "").replace(/\s+/g, "");
}

export default Rule.makeRule({
    name: "duplicate-choices",
    selector: "widget",
    lint(state, content, nodes, match, context) {
        const {widgetType, id} = state.currentNode();
        if ((widgetType !== "radio" && widgetType !== "dropdown") || !id) {
            return;
        }
        const choices: ReadonlyArray<{content?: string}> =
            context?.widgets?.[id]?.options?.choices ?? [];

        // Choice numbers are 1-based, in the order the author wrote them.
        const firstWithText = new Map<string, number>();
        const lints = choices.flatMap((choice, i) => {
            const text = normalize(choice.content ?? "");
            // An empty choice (such as "None of the above") isn't a duplicate.
            if (text === "") {
                return [];
            }
            const first = firstWithText.get(text);
            if (first == null) {
                firstWithText.set(text, i + 1);
                return [];
            }
            return [
                linterWarning(
                    `${id}: choices ${first} and ${i + 1} are the same ` +
                        `("${choice.content?.trim()}").`,
                ),
            ];
        });
        return lints.length > 0 ? lints : undefined;
    },
});
