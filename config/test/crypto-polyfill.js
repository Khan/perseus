/**
 * Polyfill crypto.randomUUID for the test environment
 * This runs before all test files to ensure crypto is available during module imports
 */
// TODO: Convert this file to TypeScript
Object.defineProperty(global, "crypto", {
    value: {
        randomUUID: () => "0-0-0-0-0",
    },
    writable: true,
    configurable: true,
});
