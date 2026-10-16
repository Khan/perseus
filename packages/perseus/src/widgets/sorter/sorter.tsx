import {isFeatureOn} from "@khanacademy/perseus-core";
import * as React from "react";
import {forwardRef} from "react";

import NewSorter from "./new/sorter";
import OldSorter from "./old/sorter";

import type {SorterHandle} from "./new/sorter";
import type {WidgetProps} from "../../types";
import type {
    PerseusSorterWidgetOptions,
    PerseusSorterUserInput,
} from "@khanacademy/perseus-core";

type Props = WidgetProps<PerseusSorterWidgetOptions, PerseusSorterUserInput>;

const Sorter = forwardRef<SorterHandle, Props>(function Sorter(props, ref) {
    if (isFeatureOn(props, "dnd-widget-sorter")) {
        return <NewSorter {...props} ref={ref} />;
    }
    return <OldSorter {...props} ref={ref} />;
});

export default Sorter;
