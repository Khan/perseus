/**
 * VisibilityObserver watches a target element for changes to visibility,
 * relative to a given root node.
 *
 * When the target element entirely disappears, or partially reappears, the
 * caller is notified via the `onVisibilityChange` callback.
 *
 * Potential visibility changes include:
 *   - Being scrolled out of view, by any scroll container between the target
 *         and the root.
 *   - Style changes to the target element or an ancestor, like `display: none`.
 *
 * The VisibilityObserver relies on the IntersectionObserver, which does not
 * exist on Safari and is buggy on Edge.  Instead, we will polyfill the
 * IntersectionObserver on those platforms.
 *
 * TODO(mdr): Currently, we emulate the API of IntersectionObserver. It might
 *     be nicer to instead use a more React-y API: let `targetElement` be a
 *     required prop, and render the element only when it's present. Then, we
 *     can use React lifecycle methods to set-up/tear-down handlers. Not sure
 *     that's _actually_ a net win, though, in complexity or performance - but
 *     worth thinking about if this API is causing too much entanglement!
 */
// NOTE(jeresig): As of 2021-03-02 there are still a non-trivial number of
// pre-Safari 12.1 users and they need a polyfill for IntersectionObserver
// eslint-disable-next-line import/no-unassigned-import
import "intersection-observer";

export interface VisibilityObserver {
    // Set the element whose visibility we're observing.
    setTargetElement(targetElement: HTMLElement): void;
    // Stop observing the previously-set target element, if any.
    //
    // When the target element unmounts, please call this method to clean up!
    disconnect(): void;
}

type VisibilityChangeCallback = (
    isVisible: boolean,
    rootBounds: DOMRectReadOnly,
) => void;

/**
 * Create a new VisibilityObserver.
 */
export function createVisibilityObserver(
    rootElement: HTMLElement | null | undefined,
    onVisibilityChange: VisibilityChangeCallback,
    rootMargin?: string,
): VisibilityObserver {
    return new NativeVisibilityObserver(
        rootElement,
        onVisibilityChange,
        rootMargin,
    );
}

/**
 * A VisibilityObserver that uses IntersectionObserver to leverage the
 * browser's native ability to determine how much of an element is visible.
 * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
class NativeVisibilityObserver implements VisibilityObserver {
    _intersectionObserver: IntersectionObserver;
    _onVisibilityChange: VisibilityChangeCallback;

    constructor(
        rootElement: HTMLElement | null | undefined,
        onVisibilityChange: VisibilityChangeCallback,
        rootMargin?: string,
    ) {
        // Create an IntersectionObserver with a threshold of "epsilon", the
        // smallest positive non-zero number. This means that, whenever the
        // target element enters or exits total invisibility, the handler will
        // be called.
        this._intersectionObserver = new IntersectionObserver(
            this._handleIntersection,
            {
                root: rootElement,
                threshold: Number.EPSILON,
                rootMargin,
            },
        );
        this._onVisibilityChange = onVisibilityChange;
    }

    _handleIntersection = (
        entries: ReadonlyArray<IntersectionObserverEntry>,
    ) => {
        // There should be exactly one entry, but let's be defensive and loop.
        //
        for (const entry of entries) {
            // @ts-expect-error - TS2345 - Argument of type 'DOMRectReadOnly | null' is not assignable to parameter of type 'DOMRectReadOnly'.
            this._onVisibilityChange(entry.isIntersecting, entry.rootBounds);
        }
    };

    setTargetElement(targetElement: HTMLElement) {
        // Because this class only watches one element at a time, we disconnect
        // from all other observed elements first, just in case.
        this._intersectionObserver.disconnect();
        this._intersectionObserver.observe(targetElement);
    }

    disconnect() {
        this._intersectionObserver.disconnect();
    }
}
