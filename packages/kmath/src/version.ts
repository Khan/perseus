// This file is processed by a Rollup plugin (replace) to inject the production
// version number during the release build.
// In dev, you'll never see the version number.

// We use a shared, symlinked directory to bring in this function so that we
// don't need to have cross-package dependencies just for a few hundred bytes
// of shared code.
// ESLint's import/no-relative-packages doesn't understand symlinks! If this
// lint suppression is removed, it autofixes the import path to an invalid
// package+path entry.
// eslint-disable-next-line import/no-relative-packages
import {addLibraryVersionToPerseusDebug} from "./shared-utils/add-library-version-to-perseus-debug";

const libName = "@khanacademy/kmath";
export const libVersion = "__lib_version__";

addLibraryVersionToPerseusDebug(libName, libVersion);
