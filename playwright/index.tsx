// The Component Testing entry point. This module runs in the browser before
// any component is mounted. We use the `beforeMount` hook to perform the same
// global setup the Cypress tests used to do in `beforeEach`: initialize
// Perseus and register its (V1) dependencies.
import {beforeMount} from "@playwright/experimental-ct-react/hooks";

import {Dependencies, init} from "@khanacademy/perseus";

// `browserTestDependencies` is an internal test helper (not part of the package's
// public API), so we reach into the source directly. This file lives outside the
// packages/ tree, hence the relative import.
// eslint-disable-next-line import/no-relative-packages
import {browserTestDependencies} from "../packages/perseus/src/testing/test-dependencies";

beforeMount(async () => {
    init();
    Dependencies.setDependencies(browserTestDependencies);
});
