# Perseus

[![codecov](https://codecov.io/gh/Khan/perseus/branch/main/graph/badge.svg)](https://codecov.io/gh/Khan/perseus)

<p align="center"><img src="logo.png" alt="perseus logo" width="150px"/></p>

<p align="center"><strong>Perseus Exercise Renderer</strong></p>

Perseus is Khan Academy's exercise system. This repo contains the code needed to take a problem in the perseus format and present it, allow interaction, and grade the result of a learner's work.

<p align="center"><img src="sample.png" alt="sample of perseus in use" height="150px"/></p>

This repo is a constellation of sub-repos for showing exercise content. Please see individual projects in in the `packages/` folder for more information about each sub-project.

## Getting started

### Prerequisites

- [Node.JS v12](https://nodejs.org/download/release/v10.18.1/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/)

### Installation

To install perseus, you need to run the following commands:

#### `yarn install`

Installs project dependencies

### Using Storybook

The components and widgets of perseus are devleoped using [Storybook](https://github.com/storybookjs/storybook). After you clone the project and get dependencies installed, the next step is to start storybook by running `yarn storybook`. This will start a server and give you a playground to use each component.

### Using Changesets

We use [changesets](https://github.com/changesets/changesets) to help manage our versioning/releases. Before pushing a new PR, add a changeset by running `yarn changeset`. Commit and submit that with the PR.

## Contributing

The Perseus project is not accepting external contributions. We’re releasing the code for others to refer to and learn from, but we are not open to pull requests or issues at this time.

## KA Contribution Guide

For a slightly more detailed overview, see the "Shipping a Change to Perseus" document in Confluence.

Perseus is a monorepo - a single repository that ships multiple npm packages. Generally you can treat Perseus as a single code base; things should generally just work as you expect them to during the development process. We use scripts and a tool called changesets to keep package inter-dependencies organized, release the one repo to multiple npm packages, and version changes appropriately.

### Working

1. `git checkout main; git pull`
2. `git checkout -b [FEATURE_BRANCH_NAME]`
3. ☢️ We don’t use deploy branches in Perseus
4. `yarn start` will start [Storybook](https://storybook.js.org/) on localhost:6006
5. Do stuff
6. `yarn test` will run [Jest](https://jestjs.io/)/[RTL](https://testing-library.com/docs/react-testing-library/intro/) tests; `yarn cypress` will run [Cypress](https://www.cypress.io/) tests
7. `yarn changeset` will walk you through creating a [changeset](https://github.com/changesets/changesets) (we generally stick to [semver](https://semver.org/))
8. ☢️ Empty changesets should be considered an exception to the rule and should generally be avoided
9. `git add` and `git commit`
10. `git pull-request` will walk you through creating a pull request

### CI/CD aka Github

1. When you create/update a PR, we run a series of checks against your code
    - Gerald requests reviewers (there’s a “perseus” user group that primary maintainers are in)
    - Linting/Types/Tests; checks to make sure code is properly covered
    - Check for a changeset
2. 🍀 A [snapshot release](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md) is made and can be used to check changes before merging/releasing
3. Once checks pass and code is approved, land your changes into main
4. 🚨 main should remain releasable! Don’t land code to main that you’re not ready to ship!
5. 🍀 Use stacked feature branches if you’re working on a big change that depends on multiple PRs

### Releasing Perseus to npm

1. Landing changes to main creates/updates a “Version Packages” PR
2. To cut a Perseus release, approve and land the “Version Packages” PR
3. ☢️ If the CI/CD checks aren’t running, you might need to close and reopen the PR
4. After the release script runs, you should see the new releases on the [release page](https://github.com/Khan/perseus/releases)

## License

[MIT License](http://opensource.org/licenses/MIT)
