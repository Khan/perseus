import type {APIOptions} from "@khanacademy/perseus";

export type WidgetEditorProps<OptionsT> = OptionsT & {
    // TODO(benchristel): Rethink how APIOptions work in the editors:
    //  - This prop type should be APIOptionsWithDefaults, and should be
    //    required.
    //  - WidgetEditorContainer should merge in ApiOptions.defaults, e.g.
    //    `{...ApiOptions.defaults, ...this.props.apiOptions}`, ensuring all
    //    options are present.
    //  - Tests for widget editors should always pass apiOptions, using
    //    `ApiOptions.defaults` if no values need to be customized.
    //  - There should be no unnecessary defaults or `apiOptions?.` property
    //    access in editors.
    apiOptions?: APIOptions;
    static?: boolean;
    onChange: (options: OptionsT) => void;
};
