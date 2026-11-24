// The Jest adapter for Rstest: stands in for `@jest/globals` (see
// `resolve.alias` in rstest.config.mts), so tests that import the test
// functions or `jest` from it run under Rstest.
export {
    afterAll,
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    rs as jest,
    test,
} from "@rstest/core";
