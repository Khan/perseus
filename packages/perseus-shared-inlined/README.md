# @khanacademy/shared-inline

This is a container package for utilities and source files that we want to
share across all packages, but not publish itself.

The build is configured to bundle source files from this package into whichever
package uses source from this package.

We need this because our tooling doesn't support having a set of shared source
files that live outside the package's directory and symlinking a shared source
dir into each package also breaks our tools (specifically ESLint with
@typescript/eslint-parser).

## Should I add code to this package?

You should only add code to this package if it is a tiny amount of code and is
needed by all packages.
