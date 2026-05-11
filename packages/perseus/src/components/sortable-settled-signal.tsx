import {SchedulePolicy, useTimeout} from "@khanacademy/wonder-blocks-timing";
import * as React from "react";

import AssetContext from "../asset-context";

// Quiescence window after the last onMeasure before we report "settled".
const SORTABLE_SETTLED_MS = 50;

export type SortableSettledSignalHandle = {
    // Restart the quiescence timer. After SORTABLE_SETTLED_MS of no further
    // bumps, the asset is reported as loaded.
    bump: () => void;
};

type Props = {
    assetKey: string;
};

// Renders nothing. The parent calls `bump()` after each measurement; if the
// timer reaches SORTABLE_SETTLED_MS without another bump, the asset is
// reported as loaded. Cleanup on unmount is handled by `useTimeout`.
const SortableSettledSignal = React.forwardRef<
    SortableSettledSignalHandle,
    Props
>(function SortableSettledSignal({assetKey}, ref) {
    const {setAssetStatus} = React.useContext(AssetContext);
    const timer = useTimeout(
        () => setAssetStatus(assetKey, true),
        SORTABLE_SETTLED_MS,
        {schedulePolicy: SchedulePolicy.OnDemand},
    );
    React.useImperativeHandle(ref, () => ({bump: () => timer.set()}), [timer]);
    return null;
});

export default SortableSettledSignal;
