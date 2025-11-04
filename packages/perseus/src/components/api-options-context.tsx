import * as React from "react";

import {ApiOptions} from "../perseus-api";

import type {APIOptions} from "../types";

export type ApiOptionsContextType = {
    apiOptions: APIOptions;
};

export const APIOptionsContext = React.createContext<ApiOptionsContextType>({
    apiOptions: ApiOptions.defaults,
});

export function useAPIOptionsContext(): ApiOptionsContextType {
    return React.useContext(APIOptionsContext);
}
