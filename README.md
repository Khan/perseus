# Perseus

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

## License

[MIT License](http://opensource.org/licenses/MIT)
