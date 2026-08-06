import * as React from "react";
import {render} from "@testing-library/react";
import AssetContext from "./asset-context";

function AssetContextConsumer() {
    const {setAssetStatus} = React.useContext(AssetContext);

    React.useEffect(() => {
        setAssetStatus("demo", false);
    }, []);

    return <div>Hello</div>;
}

describe("AssetContext", () => {
    it("should provide safe defaults", () => {
        expect(() => render(<AssetContextConsumer />)).not.toThrow();
    });
});
