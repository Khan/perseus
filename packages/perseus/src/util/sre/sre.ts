import {getLocale} from "@khanacademy/wonder-blocks-i18n";
import Engine from "speech-rule-engine/js/common/engine";
import * as Api from "speech-rule-engine/js/common/system";
import {Variables} from "speech-rule-engine/js/common/variables";

export type {Highlighter} from "speech-rule-engine/js/highlighter/highlighter";
export type {SpeechGenerator} from "speech-rule-engine/js/speech_generator/speech_generator";
export type {Walker} from "speech-rule-engine/js/walker/walker";

// Setting delay stops SRE from setting itself up (and loading locales) when it
// is not actually being used.
Engine.getInstance().delay = true;

export const locales = Variables.LOCALES;
export const toSpeech = Api.toSpeech;

const defaultOptions = {
    domain: "mathspeak",
    style: "default",
    locale: locales.has(getLocale()) ? getLocale() : "en",
};

/**
 * Sets up the speech rule engine with given options.
 * @param options Options to pass to the speech rule engine.
 * @returns A promise that resolves when the speech rule engine is ready: a string containing the locale.
 */
export const setup = async (
    options: Parameters<typeof Api.setupEngine>[0] = {},
): Promise<string> =>
    await Api.setupEngine({
        ...defaultOptions,
        ...options,
    });
