import KeyConfigs from "../../../data/key-configs";

import type {MathInputStrings} from "../../../strings";

export const getTestDataTabs = (strings: MathInputStrings) => [
    {
        name: "Operators",
        specialButton: "EXP_2",
        label: KeyConfigs(strings)["EXP_2"].ariaLabel,
    },
    {
        name: "Extras",
        specialButton: "PI",
        label: KeyConfigs(strings)["PI"].ariaLabel,
    },
    {
        name: "Geometry",
        specialButton: "COS",
        label: KeyConfigs(strings)["COS"].ariaLabel,
    },
    {
        name: "Numbers",
        specialButton: "NUM_7",
        label: KeyConfigs(strings)["NUM_7"].ariaLabel,
    },
];
