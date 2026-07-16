import type {PerseusImageWidgetOptions} from "@khanacademy/perseus-core";
import type {LinterContextProps} from "@khanacademy/perseus-linter";
import type {APIOptions} from "@khanacademy/perseus";

export interface CommonImageProps {
    options: PerseusImageWidgetOptions;
    linterContext: LinterContextProps;
    apiOptions: APIOptions;
    widgetId: string;
    isGifPlaying: boolean;
    setIsGifPlaying: (isPaused: boolean) => void;
}
