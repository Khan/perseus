import {linterError} from "../lint";
import Rule from "../rule";

/**
 * Placeholders that name no widget, or one widget more than once. A widget
 * that's never placed has no node in the content to report on, so this
 * linter doesn't check for it.
 */
export const WidgetPlaceholderMissingWidget = Rule.makeRule({
    name: "widget-placeholder-missing-widget",
    selector: "widget",
    lint(state, content, nodes, match, context) {
        const {id} = state.currentNode();
        // Without the widgets map there's nothing to check against.
        if (!id || context?.widgets == null) {
            return;
        }
        if (context.widgets[id] == null) {
            return linterError(
                `[[☃ ${id}]] has no widget: nothing will render here.`,
            );
        }
    },
});

export const WidgetPlaceholderDuplicate = Rule.makeRule({
    name: "widget-placeholder-duplicate",
    selector: "widget",
    lint(state, content, nodes, match, context) {
        const {id} = state.currentNode();
        if (!id || context?.content == null) {
            return;
        }
        const placeholder = `[[☃ ${id}]]`;
        const count = context.content.split(placeholder).length - 1;
        // Reported at each copy: each one is part of the problem.
        if (count > 1) {
            return linterError(
                `${placeholder} appears ${count} times; a widget can be ` +
                    `placed only once.`,
            );
        }
    },
});

// The markdown parser only makes widget nodes of ids like "radio 1", so any
// other placeholder is left as plain text, and renders as such.
const UNRENDERABLE_PLACEHOLDER = /\[\[☃ ([^\]]*)\]\]/;

export const WidgetPlaceholderUnrenderable = Rule.makeRule({
    name: "widget-placeholder-unrenderable",
    pattern: UNRENDERABLE_PLACEHOLDER,
    lint(state, content, nodes, match) {
        return linterError(
            `[[☃ ${match[1]}]] won't render: widget ids must be a lowercase ` +
                `type and a number, such as "radio 1".`,
            {
                location: {
                    start: match.index,
                    end: match.index + match[0].length,
                },
            },
        );
    },
});
