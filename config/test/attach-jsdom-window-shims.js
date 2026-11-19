/* eslint-disable no-prototype-builtins */
/**
 * Provides a method for attaching some shims to a window object that JSDOM
 * otherwise doesn't support.
 */

/**
 * Attaches various shims to the window object that JSDOM doesn't or didn't
 * provide.
 *
 * @param {window} targetWindow
 */
const attachShims = (targetWindow) => {
    // JSDOM window doesn't support matchMedia. Let's stub it.
    if (!targetWindow.matchMedia) {
        targetWindow.matchMedia = (query) => {
            // Simulate a desktop browser: return `true` if the window is at
            // least 768px wide.
            const windowWidth = 768;

            const minWidthMatcher = /min-width:\s*(\d+)/i;
            const match = query.match(minWidthMatcher);

            const matches = !!(match && match[1] >= windowWidth);

            return {
                matches,
                addListener: () => {},
                removeListener: () => {},
            };
        };
    }

    // JSDOM doesn't implement scrollTo
    targetWindow.scrollTo = () => {};

    // JSDOM doesn't implement ResizeObserver. @dnd-kit/dom constructs one
    // as soon as it is imported, so any test that renders a draggable or
    // droppable component needs at least this inert stub.
    if (!targetWindow.ResizeObserver) {
        targetWindow.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    }

    // JSDOM doesn't define PointerEvent, and @dnd-kit/dom's pointer sensor
    // runs `event instanceof PointerEvent` on every pointerdown. This shim
    // only needs to exist for that check; user-event's synthesized pointer
    // events are MouseEvents, so the check stays false and no drag starts
    // (which is what tests want — pointer drags aren't simulated in JSDOM).
    // Suites in the node test environment have no MouseEvent to extend and
    // no DOM to dispatch events into, so they need no shim.
    if (targetWindow.MouseEvent && !targetWindow.PointerEvent) {
        targetWindow.PointerEvent = class PointerEvent extends (
            targetWindow.MouseEvent
        ) {};
    }

    // JSDOM doesn't implement the CSS Font Loading API, so `document.fonts`
    // doesn't exist at all — which also means there's no accessor for
    // `rs.spyOn(document, "fonts", "get")` to wrap. Defining it as a getter
    // returning undefined (which code must tolerate anyway) lets tests spy on
    // it, with Rstest handling the restore.
    if (
        targetWindow.Document &&
        !targetWindow.Document.prototype.hasOwnProperty("fonts")
    ) {
        Object.defineProperty(targetWindow.Document.prototype, "fonts", {
            get: () => undefined,
            configurable: true,
        });
    }

    // jQuery's `.width()` and `.height()` check feature support by measuring
    // a hidden table, and repeat the check until the table is visible (taking
    // a width of 0 to mean the page isn't visible yet). JSDOM has no layout,
    // so the check never considers the page to be visible nor discards the
    // hidden table. It runs again on every call and adds 8 more nodes to the
    // same table each time (jquery/jquery#5932), so each call is slower than
    // the last, and a test file that measures many elements (like Graphie
    // labels in plotter.test.tsx) slows down test by test. Giving jQuery's
    // test table, and no other table, a width lets the check finish on its
    // first run.
    //
    // Test files in a Node environment have no HTMLTableElement to patch.
    if (targetWindow.HTMLTableElement) {
        const offsetWidth = Object.getOwnPropertyDescriptor(
            targetWindow.HTMLElement.prototype,
            "offsetWidth",
        );
        Object.defineProperty(
            targetWindow.HTMLTableElement.prototype,
            "offsetWidth",
            {
                get() {
                    // jQuery 4.0.0 marks its test table with `left: -11111px`.
                    return this.style.left === "-11111px"
                        ? 1
                        : offsetWidth.get.call(this);
                },
                configurable: true,
            },
        );
    }
};

// TODO: Rewrite this file in TypeScript.
export default attachShims;
