export default function getInaccessibleProxy(name = "InaccessibleProxy") {
    const handler = {
        throw() {
            throw new Error(`${name} accessed before initialization!`);
        },
        get() {
            this.throw();
        },
        set() {
            this.throw();
        },
        has() {
            this.throw();
        },
        deleteProperty() {
            this.throw();
        },
    };

    return new Proxy({}, handler as any);
}
