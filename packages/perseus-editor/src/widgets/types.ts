/**
 * Functions that a Widget Editor component must support (either through the
 * React class-component's methods or a useImperativeHandle()'s API).
 */
export interface WidgetEditorRefHandle {
    serialize(): unknown;
    getSaveWarnings?: () => string[];
}
