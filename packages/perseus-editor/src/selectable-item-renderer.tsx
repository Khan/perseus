/**
 * SelectableItemRenderer
 *
 * A component that renders a Perseus item with selectable regions for
 * variable creation. This is used by the Scale Item feature to allow
 * content creators to create variables from item content.
 *
 * The component exposes selectable regions via callbacks, and consumers
 * can use opaque tokens to identify regions without understanding
 * Perseus internals.
 */
import {
    ServerItemRenderer,
    type APIOptions,
    type PerseusDependenciesV2,
} from "@khanacademy/perseus";
import {
    extractSelectableRegions,
    type PerseusItem,
    type SelectableRegion,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import * as React from "react";

type Props = {
    /** The Perseus item to render */
    item: PerseusItem;
    /** Called once with all selectable regions when item loads */
    onRegionsExtracted?: (regions: SelectableRegion[]) => void;
    /** Tokens to highlight as already selected (for visual feedback) */
    selectedTokens?: Set<string>;
    /** Standard Perseus dependencies */
    dependencies: PerseusDependenciesV2;
    /** Optional API options */
    apiOptions?: APIOptions;
};

/**
 * Renders a Perseus item with selectable regions for variable creation.
 */
export function SelectableItemRenderer({
    item,
    onRegionsExtracted,
    selectedTokens,
    dependencies,
    apiOptions,
}: Props): React.ReactElement {
    // Extract regions on mount/item change
    React.useEffect(() => {
        const regions = extractSelectableRegions(item);
        onRegionsExtracted?.(regions);
    }, [item, onRegionsExtracted]);

    return (
        <View style={styles.container}>
            <div className="framework-perseus">
                <ServerItemRenderer
                    item={item}
                    problemNum={0}
                    reviewMode={false}
                    dependencies={dependencies}
                    apiOptions={{
                        ...apiOptions,
                        readOnly: true,
                    }}
                />
            </div>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "auto",
    },
});

export default SelectableItemRenderer;

