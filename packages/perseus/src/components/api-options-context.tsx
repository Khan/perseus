import * as React from "react";

import {ApiOptions} from "../perseus-api";

import type {APIOptionsWithDefaults} from "../types";

export const APIOptionsContext = React.createContext<APIOptionsWithDefaults>({
    ...ApiOptions.defaults,
});

export function useAPIOptionsContext(): APIOptionsWithDefaults {
    return React.useContext(APIOptionsContext);
}
