import type Registry from "./registry";

/**
 * Whether a lookup for an unregistered key is an error.
 *
 * Off everywhere until the registration migration is far enough along that a
 * miss reliably means someone forgot to register rather than that the caller
 * hasn't been migrated yet; callers opt in with `setStrictRegistration` in the
 * meantime. Production must never enable it — content naming a widget this
 * build doesn't know about has to keep rendering.
 */
let strict = false;

export function isStrictRegistration(): boolean {
    return strict;
}

export function setStrictRegistration(enabled: boolean): void {
    strict = enabled;
}

/**
 * Run `fn` with strict registration forced on or off, then restore it.
 *
 * The previous value is saved rather than assumed, so overlapping scopes nest.
 */
export function withStrictRegistration<T>(enabled: boolean, fn: () => T): T {
    const previous = strict;
    strict = enabled;
    try {
        return fn();
    } finally {
        strict = previous;
    }
}

/**
 * Look up `key`, throwing under strict registration if it is missing.
 *
 * `hint` names the call the caller should have made, e.g.
 * `registerWidgets([radioWidget])`.
 */
export function strictGet<T>(
    registry: Registry<T>,
    key: string,
    hint: string,
): T | undefined {
    const value = registry.get(key);
    if (value === undefined && strict) {
        throw new Error(
            `Widget "${key}" is not registered. Register it first: ${hint}.`,
        );
    }
    return value;
}
