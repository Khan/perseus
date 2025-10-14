/**
 * @fileoverview A React context for managing math rendering options.
 * @param shouldAddAriaLabels - Aria labels are only added when the math is
 * contained within an element with role="presentation". This option forces the
 * addition of aria labels for times when the element is not within such
 * containers.
 */
import * as React from "react";

export type MathRenderingContextType = {
    shouldAddAriaLabels: boolean;
};

export const MathRenderingContext: React.Context<MathRenderingContextType> =
    React.createContext<{
        shouldAddAriaLabels: boolean;
    }>({
        shouldAddAriaLabels: false,
    });

export default MathRenderingContext;
