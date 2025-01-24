import type {PerseusPassageRefWidgetOptions} from "../../data-schema";

export const currentVersion = {major: 0, minor: 1};

export type PassageRefDefaultWidgetOptions = Pick<
    PerseusPassageRefWidgetOptions,
    "passageNumber" | "referenceNumber" | "summaryText"
>;

export const defaultWidgetOptions: PassageRefDefaultWidgetOptions = {
    passageNumber: 1,
    referenceNumber: 1,
    summaryText: "",
};
