// `reset` is keyed by a module-private symbol so that it cannot be reached
// through the published `Registry` type: resetting a registry is a test/story
// isolation tool, not something production code should ever do.
const RESET = Symbol("Registry.reset");

class Registry<T> {
    private name: string;
    private contents: Map<string, T> = new Map();
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
        return this.contents.has(key);
    }

    get(key: string): T | undefined {
        this.throwIfUnregistered();
        return this.contents.get(key);
    }

    keys(): Array<string> {
        this.throwIfUnregistered();
        return [...this.contents.keys()];
    }

    entries(): IterableIterator<[string, T]> {
        this.throwIfUnregistered();
        return this.contents.entries();
    }

    /**
     * Register a value under `key`, unless one is already registered.
     *
     * Registration is idempotent so that two callers registering the same
     * entry cannot fight over it. Use `replace` to overwrite deliberately.
     */
    set(key: string, value: T): void {
        this.anythingRegistered = true;
        if (this.contents.has(key)) {
            return;
        }
        this.contents.set(key, value);
    }

    /** Register a value under `key`, overwriting any existing entry. */
    replace(key: string, value: T): void {
        this.anythingRegistered = true;
        this.contents.set(key, value);
    }

    [RESET](): void {
        this.contents = new Map();
        this.anythingRegistered = false;
    }
}

/**
 * Empty a registry and return it to its uninitialized state.
 *
 * Not part of the published API; it exists so tests and Storybook can isolate
 * one another's registrations.
 */
export function resetRegistry<T>(registry: Registry<T>): void {
    registry[RESET]();
}

export default Registry;
