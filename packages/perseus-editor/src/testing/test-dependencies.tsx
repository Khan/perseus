// Importing this module preserves the legacy test behavior: register every
// Perseus widget before exposing the test dependencies.
import {initPerseus} from "@khanacademy/perseus/init";

initPerseus();

export * from "./test-dependencies-data";
