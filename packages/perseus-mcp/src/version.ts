import packageJson from "../package.json" with {type: "json"};

// This package is never published, so the publish build that injects
// versions into the other packages doesn't run on it; package.json is the
// source of truth instead.
export const libVersion: string = packageJson.version;
