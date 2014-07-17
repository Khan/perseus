# Perseus

Perseus is Khan Academy's new exercise question editor and renderer. It allows
you to create and display interactive questions.

![screenshot of Perseus](https://s3.amazonaws.com/uploads.hipchat.com/6574/26709/TfZBRXV0nmRH64g/upload.png)

## Live demo

Our test page isn't much yet, but you can check out a
[live demo of it here](http://khan.github.io/perseus/)!

## Getting Started

To get the dev server running locally, try `make server PORT=9000` which will run the local perseus server on localhost:9000.

To package perseus for distribution, run `make build` and to package a debug-friendy build, run `make debug`.

Both the `build` and the `server` make targets will run `npm install` but you can also run it yourself to install all node dependencies.


## Versioning

Perseus uses two types of version numbers: the version of the itemData/content
that can be sent to `ItemRenderer`/`Renderer`, and the version of the api
exposed through the `ItemRenderer/`Renderer` apiOptions prop.

### itemData versioning

Item data versioning has two subtypes of versions: a global `itemDataVersion`
for the itemData/content format sent to ItemRenderer/Renderer, and per-widget
version numbers for the `options` sent to each widget. All of these version
numbers exist both in perseus.js and in the itemData saved to the datastore
by the Perseus editor.

Each of these versions consists of a major and minor version number.
A perseus version can render an itemData version iff its global
`itemDataVersion` and each of its widget versions are greater than or equal
to those sent to perseus as itemData. A major version increase will happen
when the saving format of this itemData has changed. Perseus clients should
not need to care about this distinction, but it is important to Perseus'
implementation of backwards-compatibility.

### apiOptions versioning

The version of the `apiOptions` prop sent to `ItemRenderer` or `Renderer`
is stored on `Perseus.apiVersion`. A minor version increase indicates an
optional additional parameter to this interface. A major version increase
indicates a not-backwards-compatible change to this API. A perseus client
should rely on a specific major version of perseus, and should be able to
use any future minor version increase without changes, but not necessarily
previous minor versions. For example, if a client begins using version 1.2,
Perseus api versions 1.3 or 1.4 will work transparently, but Perseus api
versions 1.0, 1.1, 2.0, or 2.2 will not work.


## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for a walkthrough of how some
of the Perseus code works and how to extend it.


## License

[MIT License](http://opensource.org/licenses/MIT)
