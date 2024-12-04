import React, {useEffect, useRef} from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.JSX.Element;
}

const FocusTrap: React.FunctionComponent<Props> = ({
    isOpen,
    onClose,
    children,
}) => {
    const trapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isOpen) {
                return;
            }

            if (event.key === "Tab") {
                const focusableElements: NodeListOf<HTMLElement> | undefined =
                    trapRef.current?.querySelectorAll(
                        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
                    );

                if (!focusableElements || focusableElements.length === 0) {
                    return;
                }

                const firstFocusableElement = focusableElements[0];
                const lastFocusableElement =
                    focusableElements[focusableElements.length - 1];

                if (event.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        event.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        event.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            } else if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            // Focus on the first focusable element when the trap opens
            setTimeout(() => {
                const focusableElements: NodeListOf<HTMLElement> | undefined =
                    trapRef.current?.querySelectorAll(
                        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
                    );
                if (focusableElements && focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
            }, 0);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            ref={trapRef}
            aria-modal="true"
            role="dialog"
            aria-hidden={!isOpen}
        >
            {children}
        </div>
    );
};

export default FocusTrap;
