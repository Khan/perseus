import type {InitializeWidgetOptionsParams} from "../editor";
import type {APIOptions} from "@khanacademy/perseus";
import type {
    PerseusWidget,
    PerseusWidgetOptions,
} from "@khanacademy/perseus-core";
import type * as React from "react";

export interface BestPracticesLink {
    url: string;
    label: string;
}

/**
 * Functions that a Widget Editor component must support (either through the
 * React class-component's methods or a useImperativeHandle()'s API).
 */
export interface WidgetEditorRefHandle {
    serialize(): unknown;
    getSaveWarnings?: () => string[];
}

/**
 * Props that all Widget Editors (must) accept.
 */
export interface WidgetEditorProps {
    onChange: (newOptions: PerseusWidget["options"]) => void;
    static?: boolean;
    graded?: boolean;
    apiOptions: APIOptions;
}

/**
 * Static functions (or functions attached to functional components) that
 * Widget Editor components _may_ implement.
 */
type WidgetEditorStatics = {
    initializeWidgetOptions?: (
        params: InitializeWidgetOptionsParams,
    ) => PerseusWidgetOptions;
    bestPractices?: BestPracticesLink;
};

type WidgetEditorClassComponent<
    P extends WidgetEditorProps = WidgetEditorProps,
> = {
    new (props: P): React.Component<P> & WidgetEditorRefHandle;
};

type WidgetEditorFunctionalComponent<
    P extends WidgetEditorProps = WidgetEditorProps,
> = {
    (props: P & React.RefAttributes<WidgetEditorRefHandle>): React.ReactNode;
};

export type WidgetEditor<P extends WidgetEditorProps = WidgetEditorProps> = (
    | WidgetEditorClassComponent<P>
    | WidgetEditorFunctionalComponent<P>
) &
    WidgetEditorStatics & {defaultProps?: Partial<P>};
