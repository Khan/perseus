#!/usr/bin/env bash

# Build the main javascript files and watches for file changes to make
# rebuilding faster.

set -e

# When we are killed, kill all background processes as well.
trap 'kill $(jobs -pr)' SIGINT SIGTERM EXIT

WEBPACK=./node_modules/.bin/webpack

NODE_ENV=production $WEBPACK --watch &
NODE_ENV=production INCLUDE_EDITORS=true $WEBPACK --watch
# TODO(emily): watch for LESS changes, and build perseus.css
