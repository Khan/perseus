import {initPerseus} from "@khanacademy/perseus/init";

import AllEditors from "./all-editors";
import {registerEditors, replaceDeprecatedEditors} from "./editor-registry";

/** Registers every production widget, its core logic, and its editor. */
export const initPerseusEditor = (): void => {
    initPerseus();
    registerEditors(AllEditors);
    replaceDeprecatedEditors();
};
