import type {PerseusIFrameWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type IFrameDefaultWidgetOptions = Pick<
    PerseusIFrameWidgetOptions,
    | "url"
    | "settings"
    | "width"
    | "height"
    | "allowFullScreen"
    | "allowTopNavigation"
>;

const defaultWidgetOptions: IFrameDefaultWidgetOptions = {
    url: "",
    settings: [{name: "", value: ""}],
    width: "400",
    height: "400",
    allowFullScreen: false,
    allowTopNavigation: false,
};

const iframeWidgetLogic: WidgetLogic = {
    name: "iframe",
    defaultWidgetOptions,
};

export default iframeWidgetLogic;
