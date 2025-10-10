import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import xIcon from "@phosphor-icons/core/regular/x.svg";
import * as React from "react";

import styles from "./preview-panel.module.css";

type PreviewPanelProps = {
    /**
     * The content to display inside the panel
     */
    children: React.ReactNode;
    /**
     * Text to display on the "open panel" button
     */
    openButtonText: string;
    /**
     * Optional: Control the panel open state externally
     */
    isOpen?: boolean;
    /**
     * Optional: Callback when panel open state changes
     */
    onOpenChange?: (isOpen: boolean) => void;
    /**
     * Optional: Additional CSS class for the open button
     */
    openButtonClassName?: string;
};

/**
 * A reusable component that provides a toggleable preview panel with:
 * - A fixed-position panel on the right side
 * - A button to open the panel when closed
 * - A close button (X) when the panel is open
 * - Accepts any children to render inside the panel
 */
function PreviewPanel({
    children,
    openButtonText,
    isOpen: controlledIsOpen,
    onOpenChange,
    openButtonClassName,
}: PreviewPanelProps) {
    const [internalIsOpen, setInternalIsOpen] = React.useState<boolean>(false);

    // Use controlled state if provided, otherwise use internal state
    const isOpen = controlledIsOpen ?? internalIsOpen;

    const handleToggle = () => {
        const newState = !isOpen;
        setInternalIsOpen(newState);
        onOpenChange?.(newState);
    };

    return (
        <View>
            {/* Button to open panel */}
            {!isOpen && (
                <div
                    className={`${styles.openPanelButton} ${openButtonClassName || ""}`}
                >
                    <Button onClick={handleToggle}>{openButtonText}</Button>
                </div>
            )}

            {/* Panel */}
            {isOpen && (
                <div className={styles.panel}>
                    {/* Close button */}
                    <div className={styles.closeButton}>
                        <IconButton
                            icon={xIcon}
                            kind="tertiary"
                            aria-label="Close panel"
                            onClick={handleToggle}
                        />
                    </div>

                    <View className={styles.innerPanel}>{children}</View>
                </div>
            )}
        </View>
    );
}

export default PreviewPanel;
