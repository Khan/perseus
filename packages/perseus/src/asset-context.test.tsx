import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import {render} from "@testing-library/react";
import * as React from "react";

import AssetContext from "./asset-context";

function AssetContextConsumer() {
    const {setAssetStatus} = React.useContext(AssetContext);

    useOnMountEffect(() => {
        setAssetStatus("demo", false);
    });

    return <div>Hello</div>;
}

describe("AssetContext", () => {
    it("should provide safe defaults", () => {
        expect(() => render(<AssetContextConsumer />)).not.toThrow();
    });
});
