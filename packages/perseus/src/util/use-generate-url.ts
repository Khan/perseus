import {createContext, useCallback, useContext} from "react";

import {getDependencies} from "../dependencies";

import {toAbsoluteUrl} from "./url-utils";

import type {GenerateUrlArgs, GenerateUrlFn} from "../types";

export const GenerateUrlContext = createContext<GenerateUrlFn | undefined>(
    undefined,
);

export const useGenerateUrl = () => {
    const staticUrl = getDependencies().staticUrl;

    const generateUrl = useContext(GenerateUrlContext);

    return useCallback(
        (args: GenerateUrlArgs) => {
            let updatedUrl = args.url;

            switch (args.context) {
                case "image_loader":
                    updatedUrl = staticUrl(args.url);
                    break;
                case "python_program:program_url":
                    updatedUrl = toAbsoluteUrl(args.url);
                    break;
            }

            if (!generateUrl) {
                return updatedUrl;
            }

            return generateUrl({
                ...args,
                url: updatedUrl,
            });
        },
        [generateUrl, staticUrl],
    );
};
