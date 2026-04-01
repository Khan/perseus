# CSS Module Conversion

## Expected Progress Report Output
- List each file that was converted and the command used
- List any patterns flagged with `// TODO` comments in the output that require manual review
- List any issues encountered and how they were resolved

## GATE CHECK
**Before running the script**: Update the progress report with the list of files identified for conversion.

## Actions to Take

### 1. Identify files to convert
Grep the widget directory for Aphrodite `StyleSheet.create` usage to find which files need conversion:

```bash
grep -rl "StyleSheet.create" packages/perseus/src/widgets/[widget-name]/ --include="*.tsx" --include="*.ts"
```

### 2. Run the conversion script on each file
Run `pnpm extract-css` on each file found above. **Always include `--keep-aphrodite`** to maintain the Aphrodite-compatible legacy styles file for backward compatibility:

```bash
pnpm extract-css packages/perseus/src/widgets/[widget-name]/[file-name].tsx --keep-aphrodite
```

Run the command once per file — do not batch multiple files in a single run.

### 3. Review the output for each file
After each run, check the generated `.module.css` file and updated `.tsx` for any `// TODO` comments the script inserted. These mark patterns it could not convert automatically and require manual resolution before proceeding.

### 4. Note on legacy styles files
The `--keep-aphrodite` flag generates a `[file-name]_legacy-styles.js` alongside the CSS module. These files contain a `// TODO (LEMS-3815): Remove this file` comment — this is expected and should be left as-is.