// This file contains a very select few aliases and custom types related to
// React. It covers cases where the React type defs are lacking in some way.

import * as React from "react";

declare module "react" {
    type ElementConfig<T> = JSX.LibraryManagedAttributes<
        T,
        React.ComponentProps<T>
    >;
}
