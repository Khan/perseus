/**
 * @fileoverview A React context for managing math rendering options.
 */
import * as React from "react";

type MathRenderingContextType = {
    shouldAddAriaLabels: boolean;
};

/**
 * A React context for managing math rendering options.
 * Currently, it only manages whether to add aria labels to math elements,
 * but can be expanded for other options.
 *
 * @param shouldAddAriaLabels - Aria labels are only added when the math is
 * contained within an element with role="presentation". This option forces the
 * addition of aria labels for times when the element is not within such
 * containers.
 */
const MathRenderingContext: React.Context<MathRenderingContextType> =
    React.createContext<{
        shouldAddAriaLabels: boolean;
    }>({
        shouldAddAriaLabels: false,
    });

export default MathRenderingContext;
