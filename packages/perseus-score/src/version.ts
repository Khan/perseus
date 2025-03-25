// This file is processed by a Rollup plugin (replace) to inject the production
// version number during the release build.
// In dev, you'll never see the version number.

import {addLibraryVersionToPerseusDebug} from "@khanacademy/perseus-utils";

const libName = "@khanacademy/perseus-score";
export const libVersion = "__lib_version__";

addLibraryVersionToPerseusDebug(libName, libVersion);
