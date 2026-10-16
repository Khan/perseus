import {type APIOptionsWithDefaults} from "@khanacademy/perseus";

export type WidgetEditorProps<OptionsT> = OptionsT & {
    apiOptions?: APIOptionsWithDefaults;
    onChange: (options: OptionsT) => void;
};
