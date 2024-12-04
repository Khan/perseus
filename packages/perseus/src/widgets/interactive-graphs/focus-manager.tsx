import * as React from "react";
import * as ReactDOM from "react-dom";

import InitialFocus from "./initial-focus";
import {findFocusableNodes} from "./utils";

type Props = {
    /**
     * The popover content container
     */
    children: React.ReactElement<any>;
    /**
     * A reference to the trigger element
     */
    anchorElement: HTMLElement | null | undefined;
    /**
     * The selector for the element that will be focused when the dialog shows.
     * When not set, the first tabbable element within the dialog will be used.
     */
    initialFocusId?: string;
};

/**
 * This component ensures that focus flows correctly when the popover is open.
 *
 * Inside the popover:
 * - `tab`: Moves focus to the next focusable element.
 * - `shift + tab`: Moves focus to the previous focusable element.
 *
 * After the focus reaches the start/end of the popover,  then we handle two
 * different scenarios:
 *
 * 1. If the focus has reached the last focusable element inside the popover,
 *    the next tab will set focus on the next focusable element that exists
 *    after the PopoverAnchor.
 * 2. If the focus is set to the first focusable element inside the popover, the
 *    next shift + tab will set focus on the PopoverAnchor element.
 *
 */
export default class FocusManager extends React.Component<Props> {
    /**
     * The focusable element that is positioned after the trigger element
     */
    nextElementAfterPopover: HTMLElement | null | undefined;

    /**
     * Tabbing is restricted to descendents of this element.
     */
    rootNode: HTMLElement | null | undefined;

    /**
     * List of focusable elements within the popover content
     */
    elementsThatCanBeFocusableInsidePopover: Array<HTMLElement> = [];

    /**
     * The first focusable element inside the popover (if it exists)
     */
    firstFocusableElementInPopover: HTMLElement | null | undefined = null;

    /**
     * The last focusable element inside the popover (if it exists)
     */
    lastFocusableElementInPopover: HTMLElement | null | undefined = null;

    componentDidMount() {
        this.addEventListeners();
    }

    componentDidUpdate() {
        // Ensure that the event listeners are not duplicated.
        this.removeEventListeners();
        this.addEventListeners();
    }

    /**
     * Remove keydown listeners
     */
    componentWillUnmount() {
        // Reset focusability
        this.changeFocusabilityInsidePopover(true);

        this.removeEventListeners();
    }

    /**
     * Add keydown listeners
     */
    addEventListeners: () => void = () => {
        const {anchorElement} = this.props;

        if (anchorElement) {
            anchorElement.addEventListener(
                "keydown",
                this.handleKeydownPreviousFocusableElement,
            );
        }

        if (this.rootNode) {
            // store the list of possible focusable elements inside the popover
            this.elementsThatCanBeFocusableInsidePopover = findFocusableNodes(
                this.rootNode,
            );

            // find the first and last focusable elements inside the popover
            this.firstFocusableElementInPopover =
                this.elementsThatCanBeFocusableInsidePopover[0];
            this.lastFocusableElementInPopover =
                this.elementsThatCanBeFocusableInsidePopover[
                    this.elementsThatCanBeFocusableInsidePopover.length - 1
                ];
        }

        // tries to get the next focusable element outside of the popover
        this.nextElementAfterPopover = this.getNextFocusableElement();

        // NOTE: This is only needed when the trigger element is the last
        // focusable element in the document. It's specially useful for when the
        // focus is set in the address bar and the user presses `shift+tab` to
        // focus back on the document.
        if (!this.nextElementAfterPopover) {
            window.addEventListener("blur", () => {
                this.changeFocusabilityInsidePopover(true);
            });
        }

        if (this.firstFocusableElementInPopover) {
            this.firstFocusableElementInPopover.addEventListener(
                "keydown",
                this.handleKeydownFirstFocusableElement,
            );
        }

        if (this.lastFocusableElementInPopover) {
            this.lastFocusableElementInPopover.addEventListener(
                "keydown",
                this.handleKeydownLastFocusableElement,
            );
        }

        if (this.nextElementAfterPopover) {
            this.nextElementAfterPopover.addEventListener(
                "keydown",
                this.handleKeydownNextFocusableElement,
            );
        }
    };

    removeEventListeners() {
        const {anchorElement} = this.props;

        if (anchorElement) {
            anchorElement.removeEventListener(
                "keydown",
                this.handleKeydownPreviousFocusableElement,
            );
        }

        if (!this.nextElementAfterPopover) {
            window.removeEventListener("blur", () => {
                this.changeFocusabilityInsidePopover(true);
            });
        }

        if (this.firstFocusableElementInPopover) {
            this.firstFocusableElementInPopover.removeEventListener(
                "keydown",
                this.handleKeydownFirstFocusableElement,
            );
        }

        if (this.lastFocusableElementInPopover) {
            this.lastFocusableElementInPopover.removeEventListener(
                "keydown",
                this.handleKeydownLastFocusableElement,
            );
        }

        if (this.nextElementAfterPopover) {
            this.nextElementAfterPopover.removeEventListener(
                "keydown",
                this.handleKeydownNextFocusableElement,
            );
        }
    }

    handleKeydownFirstFocusableElement: (e: KeyboardEvent) => void = (e) => {
        // It will try focus only if the user is pressing `Shift+tab`
        if (e.key === "Tab" && e.shiftKey) {
            e.preventDefault();
            this.props.anchorElement?.focus();
        }
    };

    handleKeydownLastFocusableElement: (e: KeyboardEvent) => void = (e) => {
        // It will try focus only if the user is pressing `Shift+tab`
        if (this.nextElementAfterPopover && e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            this.nextElementAfterPopover?.focus();
        }
    };

    /**
     * Gets the next focusable element after the anchor element
     */
    getNextFocusableElement: () => HTMLElement | null | undefined = () => {
        const {anchorElement} = this.props;

        if (!anchorElement) {
            return;
        }

        // get the total list of focusable elements within the document
        const focusableElements = findFocusableNodes(document);

        const focusableElementsOutside = focusableElements.filter((element) => {
            const index =
                this.elementsThatCanBeFocusableInsidePopover.indexOf(element);
            return index < 0;
        });

        // get anchor element index
        const anchorIndex = focusableElementsOutside.indexOf(anchorElement);

        if (
            anchorIndex >= 0 &&
            anchorIndex !== focusableElementsOutside.length - 1
        ) {
            // guess next focusable element index
            const nextElementIndex =
                anchorIndex < focusableElementsOutside.length - 1
                    ? anchorIndex + 1
                    : 0;

            // get next element's DOM reference
            return focusableElementsOutside[nextElementIndex];
        }

        return;
    };

    /**
     * Gets the list of focusable elements inside the popover
     */
    // @ts-expect-error [FEI-5019] - TS2322 - Type '(node: any) => void' is not assignable to type '() => void'.
    getComponentRootNode: () => void = (node: any) => {
        if (!node) {
            // The component is being umounted
            return;
        }

        const rootNode: HTMLElement = ReactDOM.findDOMNode(node) as any;

        if (!rootNode) {
            throw new Error(
                "Assertion error: root node should exist after mount",
            );
        }

        this.rootNode = rootNode as HTMLElement;
    };

    /**
     * Triggered when the focus is set to the first sentinel. This way, the
     * focus will be redirected to the anchor element.
     */
    handleFocusPreviousFocusableElement: () => void = () => {
        if (this.props.anchorElement) {
            this.props.anchorElement.focus();
        }
    };

    /**
     * Toggle focusability for all the focusable elements inside the popover.
     * This is useful to prevent the user from tabbing into the popover when it
     * reaches to the last focusable element within the document.
     */
    changeFocusabilityInsidePopover = (enabled = true) => {
        const tabIndex = enabled ? "0" : "-1";

        // Enable/disable focusability for all the focusable elements inside the
        // popover.
        this.elementsThatCanBeFocusableInsidePopover.forEach((element) => {
            element.setAttribute("tabIndex", tabIndex);
        });
    };

    /**
     * Triggered when the focus is set to the last sentinel. This way, the focus
     * will be redirected to next element after the anchor element.
     */
    handleFocusNextFocusableElement: () => void = () => {
        if (this.nextElementAfterPopover) {
            this.nextElementAfterPopover.focus();
        }
    };

    /**
     * Triggered when the focus is leaving the previous focusable element. This
     * way, the focus is redirected to the first focusable element inside the
     * popover.
     */
    handleKeydownPreviousFocusableElement: (e: KeyboardEvent) => void = (e) => {
        // It will try focus only if the user is pressing `tab`
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            this.firstFocusableElementInPopover?.focus();
        }
    };

    /**
     * Triggered when the focus is leaving the next focusable element. This way,
     * the focus is redirected to the last focusable element inside the popover.
     */
    handleKeydownNextFocusableElement: (e: KeyboardEvent) => void = (e) => {
        // It will try focus only if the user is pressing `Shift+tab`
        if (e.key === "Tab" && e.shiftKey) {
            e.preventDefault();
            this.lastFocusableElementInPopover?.focus();
        }
    };

    render(): React.ReactNode {
        const {children} = this.props;

        return (
            <div
                ref={this.getComponentRootNode}
                onClick={() => {
                    this.changeFocusabilityInsidePopover(true);
                }}
                onFocus={() => {
                    this.changeFocusabilityInsidePopover(true);
                }}
                onBlur={() => {
                    this.changeFocusabilityInsidePopover(false);
                }}
            >
                <InitialFocus initialFocusId={this.props.initialFocusId}>
                    {children}
                </InitialFocus>
            </div>
        );
    }
}
