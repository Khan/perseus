class Registry<T> {
    private name: string;
    private contents: Record<string, T> = {};
    private anythingRegistered = false;

    constructor(name = "Registry") {
        this.name = name;
    }

    private throwIfUnregistered() {
        if (!this.anythingRegistered) {
            throw new Error(`${this.name} accessed before initialization!`);
        }
    }

    has(key: string): boolean {
        this.throwIfUnregistered();
        return Object.prototype.hasOwnProperty.call(this.contents, key);
    }

    get(key: string): T | undefined {
        this.throwIfUnregistered();
        return this.contents[key];
    }

    keys(): Array<string> {
        this.throwIfUnregistered();
        return Object.keys(this.contents);
    }

    entries(): Array<[string, T]> {
        this.throwIfUnregistered();
        return Object.entries(this.contents);
    }

    set(key: string, value: T): void {
        this.anythingRegistered = true;
        this.contents[key] = value;
    }
}

export default Registry;
