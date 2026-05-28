import * as React from "react";

import AssetContext from "../asset-context";

type SetAssetStatus = (assetKey: string, loaded: boolean) => void;

type InjectedProps = {
    setAssetStatus: SetAssetStatus;
    assetKey: string;
};

export function withAssetContext<P extends InjectedProps>(
    WrappedComponent: React.ComponentType<P>,
    keyPrefix: string,
): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<Omit<P, keyof InjectedProps>> &
        React.RefAttributes<any>
> {
    const WithAssetContextComponent = React.forwardRef<
        any,
        Omit<P, keyof InjectedProps>
    >((props, ref) => {
        const {setAssetStatus} = React.useContext(AssetContext);
        const uniqueId = React.useId();
        const assetKey = `${keyPrefix}-${uniqueId}`;

        return (
            <WrappedComponent
                // eslint-disable-next-line no-restricted-syntax -- TypeScript can't verify that spreading `Omit<P, K>` + adding `K`-properties reconstitutes P (the "P could be a different subtype" limitation). The runtime behavior is sound: we provide every field P needs.
                {...(props as P)}
                setAssetStatus={setAssetStatus}
                assetKey={assetKey}
                ref={ref}
            />
        );
    });

    WithAssetContextComponent.displayName = `withAssetContext(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    return WithAssetContextComponent;
}
