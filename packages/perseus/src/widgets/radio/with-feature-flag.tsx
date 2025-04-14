import * as React from "react";

import type {APIOptions} from "../../types";

interface WithFeatureFlagProps {
    apiOptions?: APIOptions;
};

/**
 * A Higher-Order Component that conditionally renders either the new or old
 * version of a component based on a feature flag in apiOptions.
 *
 * @param OldComponent - The original/old version of the component
 * @param NewComponent - The new version of the component
 * @returns A new component that conditionally renders either the old or new version
 */
export function withFeatureFlag<T extends WithFeatureFlagProps>(
    OldComponent: React.ComponentType<T>,
    NewComponent: React.ComponentType<T>,
): React.ComponentType<T> {
    return function FeatureFlaggedComponent(props: T) {
        const useNewVersion = props.apiOptions?.useNewRadioWidget ?? false;
        const Component = useNewVersion ? NewComponent : OldComponent;
        return <Component {...props} />;
    };
}
