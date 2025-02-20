import {Passage} from "./passage";

/**
 * A function that detects if the given widget is a `Passage` widget. This is
 * also a type guard so that after this function is called, the widget that was
 * passed in is refined to be a `Passage` widget on success.
 *
 * This makes it a handy function to use with `.filter()` calls on arrays of
 * widgets.
 *
 * Type guards: https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
 */
export function isPassageWidget(widget: any): widget is Passage {
    return widget instanceof Passage;
}
