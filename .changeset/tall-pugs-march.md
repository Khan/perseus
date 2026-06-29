---
---

Upgrade TypeScript to 6.0.3. This is a dev-tooling-only change: no package
source changed and the emitted declaration files are unchanged, so no package
release is needed. The build:types config now explicitly lists the `node` and
`jest` ambient `@types` packages, which TS 6.0 no longer auto-includes when
building project references.
