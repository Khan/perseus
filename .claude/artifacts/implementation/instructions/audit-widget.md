# Audit the widget

## Expected Progress Report Output
- Document all bash commands used to conduct the audit.
- List files with found colors that need changing
    - Preface this section with "Colors to be Tokenized:"
        - List the files that have `color` token usage within them.
            - After each file, include a list of the color tokens used and the line numbers where they are used.
        - List the files that have hard coded color values (either hex or rgb(a)) within them.
            - After each file, list the line number and the color found.
- List files with font attributes that need changing
    - Preface this section with "Fonts to be Tokenized:"
        - List the files that have any of the 4 font attributes within them.
            - After each file, include a list of the font attributes and their line numbers

## GATE CHECK
**Before creating the regression story files**: Update the progress report with the research you've done so far (files examined, test data discovered, import paths
verified, interaction patterns identified). The progress report file itself should already exist from the reporting.md step.

## Actions to take
Grep the widget directory for color and font usage:

```bash
# Find primitive color token usage
grep -r "color\." packages/perseus/src/widgets/[widget-name]/ --include="*.tsx" --include="*.ts" --include="*.css"

# Find hardcoded hex values
grep -r "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/widgets/[widget-name]/

# Find hardcoded rgb(a) values
grep -r "rgba?\([^)]+\)" packages/perseus/src/widgets/[widget-name]/

# Check 4 font attributes
grep -rE "fontSize|fontWeight|lineHeight|fontFamily" packages/perseus/src/widgets/free-response/
```
