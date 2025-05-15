import getInaccessibleProxy from "./get-inaccessible-proxy";

describe("getInaccessibleProxy", () => {
    const defaultMessage = "InaccessibleProxy accessed before initialization!";

    it("should throw when getting", () => {
        const proxy: any = getInaccessibleProxy();
        expect(() => proxy.test).toThrow(defaultMessage);
        expect(() => proxy["test"]).toThrow(defaultMessage);
    });

    it("should throw when setting", () => {
        const proxy: any = getInaccessibleProxy();
        expect(() => (proxy.test = true)).toThrow(defaultMessage);
        expect(() => (proxy["test"] = true)).toThrow(defaultMessage);
    });

    it("should throw when reading", () => {
        const proxy: any = getInaccessibleProxy();
        expect(() => "test" in proxy).toThrow(defaultMessage);
        // eslint-disable-next-line no-prototype-builtins
        expect(() => proxy.hasOwnProperty("test")).toThrow(defaultMessage);
    });

    it("should throw when deleting", () => {
        const proxy: any = getInaccessibleProxy();
        expect(() => delete proxy.test).toThrow(defaultMessage);
    });

    it("accepts an optional name", () => {
        const proxy: any = getInaccessibleProxy("TestName");
        expect(() => proxy.test).toThrow(
            "TestName accessed before initialization!",
        );
    });
});
