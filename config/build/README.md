# persus-build

This is not a real package. It is used to ensure publishing bumps the version numbers in all of the actual packages if any of the build settings change. This is necessary since build settings can affect the built versions of the code which should result in a minor version bump even if the source for a particular package hasn't changed.
