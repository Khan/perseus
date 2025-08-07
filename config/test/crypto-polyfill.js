/**
 * Polyfill crypto.randomUUID for Jest test environment
 * This runs before all test files to ensure crypto is available during module imports
 */
Object.defineProperty(global, "crypto", {
    value: {
        randomUUID: () => "0-0-0-0-0",
    },
    writable: true,
    configurable: true,
});
