type RegistryOptions<T> = {
    /**
     * A fixed set of keys that always resolve to `value`. Aliased keys can't
     * be registered.
     */
    aliases?: {
        keys: ReadonlyArray<string>;
        value: T;
    };
};

class Registry<T> {
    private name: string;
    private contents: Record<string, T> = {};
    private aliasKeys: ReadonlySet<string>;
    private aliasValue: T | undefined;
    private anythingRegistered = false;

    constructor(name = "Registry", options: RegistryOptions<T> = {}) {
        this.name = name;
        this.aliasKeys = new Set(options.aliases?.keys);
        this.aliasValue = options.aliases?.value;
    }

    private throwIfUnregistered() {
        if (!this.anythingRegistered) {
            throw new Error(`${this.name} accessed before initialization!`);
        }
    }

    has(key: string): boolean {
        this.throwIfUnregistered();
        return (
            this.aliasKeys.has(key) ||
            Object.prototype.hasOwnProperty.call(this.contents, key)
        );
    }

    get(key: string): T | undefined {
        this.throwIfUnregistered();
        return this.aliasKeys.has(key) ? this.aliasValue : this.contents[key];
    }

    /**
     * Includes aliased keys so that callers can recognize every key this
     * registry resolves.
     */
    keys(): Array<string> {
        this.throwIfUnregistered();
        return [...this.aliasKeys, ...Object.keys(this.contents)];
    }

    /**
     * Excludes aliased keys: they all share one value, so listing them would
     * repeat that value once per alias.
     */
    entries(): Array<[string, T]> {
        this.throwIfUnregistered();
        return Object.entries(this.contents);
    }

    set(key: string, value: T): void {
        if (this.aliasKeys.has(key)) {
            throw new Error(
                `${this.name}: "${key}" is an alias and cannot be registered.`,
            );
        }
        this.anythingRegistered = true;
        this.contents[key] = value;
    }
}

export default Registry;
