#!/usr/bin/env bash

# Check if SNAPSHOT_RELEASE is set and the version does not start with 0.0.0-PR
if [ "$SNAPSHOT_RELEASE" = "1" ] && ! [[ "$npm_package_version" =~ ^0\.0\.0-PR ]]; then
    echo "Error: Snapshot publish attempted, but $npm_package_name@$npm_package_version does not match version scheme for snapshots. Publish disallowed."
    exit 1
fi
