# Perseus

![npm Version](https://img.shields.io/npm/v/@khanacademy/perseus)
![License](https://img.shields.io/github/license/Khan/perseus)

<p align="center"><img src="logo.png" alt="perseus logo" width="150px"/></p>

<p align="center"><strong>Perseus Exercise Renderer</strong></p>

Perseus is Khan Academy's exercise system. This repo contains the code needed to take a problem in the Perseus format and present it, allow interaction, and grade the result of a learner's work.

<p align="center"><img src="sample.png" alt="sample of Perseus in use" height="150px"/></p>

This repo is a constellation of sub-repos for showing exercise content. Please see individual projects in in the `packages/` folder for more information about each sub-project.

## Getting started

### Prerequisites

- [Node.js v20](https://nodejs.org/en/blog/announcements/v20-release-announce)
- [pnpm](https://pnpm.io/)

### Installation

To install Perseus, you need to run the following commands:

#### `pnpm install`

Installs project dependencies and tooling

### Using Storybook

The components and widgets of Perseus are developed using [Storybook](https://github.com/storybookjs/storybook). After you clone the project and get dependencies installed, the next step is to start storybook by running `pnpm storybook`. This will start a server and give you a playground to use each component.

### Using Changesets

We use [changesets](https://github.com/changesets/changesets) to help manage our versioning/releases. Before pushing a new PR, add a changeset by running `pnpm changeset`. Commit and submit that with the PR.

### Updating Dependencies

If you want to use another library in Perseus, you will need up update the dependencies.
Use `peerDependencies` and `devDependencies` for dependencies that
khan/frontend is already using, such as Wonder Blocks or React.

1. `cd` into to the package in which you would like to update the dependency.
```
cd packages/[package-name]

// Example
cd packages/perseus-editor
```

2. Run the following command to update the dev dependencies and the peer dependencies.
```
// All dependencies
pnpm add --dev [dependency name]
// Include this too if khan/frontend is using this dependency
pnpm add --peer [dependency name]

// Example
pnpm add --dev @khanacademy/wonder-blocks-button
pnpm add --peer @khanacademy/wonder-blocks-button
```

## Contributing

The Perseus project is not accepting external contributions. We’re releasing the code for others to refer to and learn from, but we are not open to pull requests or issues at this time.

## KA Contribution Guide

For a slightly more detailed overview, see the "Shipping a Change to Perseus" document in Confluence.

Perseus is a monorepo - a single repository that ships multiple npm packages. Generally you can treat Perseus as a single code base; things should generally just work as you expect them to during the development process. We use scripts and a tool called changesets to keep package inter-dependencies organized, release the one repo to multiple npm packages, and version changes appropriately.

### Working

1. `git checkout main; git pull`
2. `git checkout -b [FEATURE_BRANCH_NAME]`
3. ☢️ We don’t use deploy branches in Perseus
4. Start a dev server

    a. `pnpm start` will start [Storybook](https://storybook.js.org/) on [localhost:6006](http://localhost:6006)

    b. `pnpm dev` will start the custom Dev UI on
    [localhost:5173](http://localhost:5173/)

5. Do stuff
6. `pnpm test` will run [Jest](https://jestjs.io/)/[RTL](https://testing-library.com/docs/react-testing-library/intro/) tests; `pnpm cypress` will run [Cypress](https://www.cypress.io/) tests
7. `pnpm changeset` will walk you through creating a [changeset](https://github.com/changesets/changesets) (we generally stick to [semver](https://semver.org/))
8. ☢️ Empty changesets should be considered an exception to the rule and should generally be avoided
9. `git add` and `git commit`
10. `git pull-request` will walk you through creating a pull request

### CI/CD aka Github

1. When you create/update a PR, we run a series of checks against your code
    - Gerald requests reviewers (there’s a “perseus” user group that primary maintainers are in)
    - Linting/Types/Tests; checks to make sure code is properly covered
    - Check for a changeset
2. 🍀 A [snapshot release](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md) is made and can be used to check changes before merging/releasing
3. Once checks pass and code is approved, land your changes into `main` using `git land`
4. 🚨 `main` should always be releasable! Don’t land code to main that you’re not ready to ship!
5. 🍀 Use stacked feature branches if you’re working on a big change that depends on multiple PRs

### Releasing Perseus to npm

1. Landing changes to `main` creates/updates a “Version Packages” PR
2. To cut a Perseus release, approve and land the “Version Packages” PR
   (typically with `git land`)
3. ☢️ If the CI/CD checks aren’t running, you might need to close and reopen the PR
4. After the release script runs, you should see the new releases on the [release page](https://github.com/Khan/perseus/releases)

## Random notes

- We use `v8` to track Jest coverage. There's some old legacy code that we don't want coverage for, so we ignore that with `c8 ignore`. It might look like `c8` isn't be used, but it's used by the `v8` `coverageProvider` (defined in config/test/test.config.js).

## License

[MIT License](http://opensource.org/licenses/MIT)
