import type {UserEvent} from "@testing-library/user-event";

// "[MouseLeft>]" holds the button down without releasing — triggers drag-start
// handlers and the CSS :active pseudo-state. The ">" is userEvent pointer syntax
// for "press without release".
export async function mouseDown(
    target: Element,
    userEvent: UserEvent,
): Promise<void> {
    await userEvent.pointer({target, keys: "[MouseLeft>]"});
}
