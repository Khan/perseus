# perseus-build

This is not a real package. It ensures that publishing bumps every package's
version when build settings change, because those changes can affect published
output without changing package source code.

## Package builds

Perseus packages ship only ECMAScript modules (ESM). Vite builds each package's
public entry points together and saves the output in `dist/`, so entry points
can share code.

See `vite.config.js` and `get-entry-points.js` for implementation details.
