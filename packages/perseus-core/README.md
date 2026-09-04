# @khanacademy/perseus-core

Perseus Core provides a set of utility functions and types that are used by the
rest of the Perseus ecosystem (`@khanacademy/perseus`,
`@khanacademy/math-input`, etc).

## Registering widget logic

Some functions read the core widget registry but never write to it; the caller
registers first. These are the ones to watch:

- `applyDefaultsToWidget` / `applyDefaultsToWidgets` — version, default options,
  and alignment all come from the registry.
- `splitPerseusItem` / `splitPerseusItemJSON` (also published as
  `@khanacademy/perseus-core/item-splitting`) and `splitPerseusRenderer` — they
  apply defaults and then call each widget's public-options function.
- `traverse` and `isItemAccessible`.

Parsing and migration (`parseAndMigratePerseusItem` and friends) read nothing
from the registry, so they work without registration. Applying defaults to what
they return does not.

To register everything:

```ts
import {initPerseusCore} from "@khanacademy/perseus-core/init";

initPerseusCore();
```

If you only handle a known set of widget types, register just those:

```ts
import {CoreWidgetRegistry} from "@khanacademy/perseus-core";
import radioLogic from "@khanacademy/perseus-core/widgets/radio";

CoreWidgetRegistry.registerLogics([radioLogic]);
```

Apps rendering Perseus content get this for free: `initPerseus()` (from
`@khanacademy/perseus/init`) registers every widget's core logic too.

Outside production, asking the registry about a widget nobody registered throws
and names the call you meant to make. In production the same lookup falls back
to defaults, so content naming a widget the build doesn't know about still
renders. A test that means to exercise an unknown type opts out:

```ts
import {withStrictRegistration} from "@khanacademy/perseus-core";

withStrictRegistration(false, () => render(<WidgetContainer type="unknown" />));
```

Nothing is registered as a side effect of importing the package: the barrel used
to register everything, which coupled every consumer to every widget.
