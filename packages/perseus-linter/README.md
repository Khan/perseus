# @khanacademy/perseus-linter

> It’s to Perseus JSON what ESLint is to Javascript.
>
> \- Jeremy, on the role of perseus-linter

A set of linting rules to help content creators use Perseus. Finds common pitfalls and lets editors know.

## Registering widget logic

The linter reads the core widget registry — `inaccessible-widget`, for
instance, asks whether a widget type is accessible — but it never registers
anything itself. Register before you lint content containing widgets:

```ts
import {initPerseusCore} from "@khanacademy/perseus-core/init";

initPerseusCore();
```

If you only lint a known set of widget types, register just those instead:

```ts
import {CoreWidgetRegistry} from "@khanacademy/perseus-core";
import radioLogic from "@khanacademy/perseus-core/widgets/radio";

CoreWidgetRegistry.registerLogics([radioLogic]);
```