# Update Color Imports

## Expected Progress Report Output
- List any files where imports were needed.

## GATE CHECK
**Before creating any files**: Update the progress report with the research you've done so far (files examined, test data discovered, import paths
verified, interaction patterns identified).

## Actions to Take
- Update color imports for locations found in the audit
  - See the diff below for an example
  - Reference the progress report step 1 record to confirm all relevant locations were updated

```diff
- import {color} from "@khanacademy/wonder-blocks-tokens";
+ import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

// If other tokens are also imported:
- import {color, font, spacing} from "@khanacademy/wonder-blocks-tokens";
+ import {semanticColor, font, spacing} from "@khanacademy/wonder-blocks-tokens";
```
