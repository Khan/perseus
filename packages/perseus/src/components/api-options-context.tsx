import * as React from "react";

import {ApiOptions} from "../perseus-api";

import type {APIOptions} from "../types";

export const APIOptionsContext = React.createContext<APIOptions>({
    ...ApiOptions.defaults,
});

export function useAPIOptionsContext(): APIOptions {
    return React.useContext(APIOptionsContext);
}
