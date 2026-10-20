import type {APIOptions} from "@khanacademy/perseus";

export type WidgetEditorProps<OptionsT> = OptionsT & {
    apiOptions?: APIOptions;
    static?: boolean;
    onChange: (options: OptionsT) => void;
};
