// This file is processed by a Rollup plugin (replace) to inject the production
// version number during the release build.
// In dev, you'll never see the version number.

// Relative export so we bundle this in instead of needing this in the
// perseus-core package (which leads to many packages depending on it, which is
// problematic).
// eslint-disable-next-line import/no-relative-packages
import {addLibraryVersionToPerseusDebug} from "../../../utils/internal/add-library-version-to-perseus-debug";

const libName = "@khanacademy/perseus";
export const libVersion = "__lib_version__";

addLibraryVersionToPerseusDebug(libName, libVersion);
