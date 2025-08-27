# Perseus Release Notes Reviewer

A comprehensive tool to review, analyze, and summarize release notes from the Perseus repository. This tool helps developers, maintainers, and stakeholders quickly understand changes across the Perseus monorepo packages.

## Features

- 📦 **Multi-Package Support**: Analyze releases across all Perseus packages
- 🔍 **Powerful Search**: Find specific changes across release history
- 📊 **Release Statistics**: Get summaries with change counts and contributor information
- 🏷️ **Semantic Versioning**: Automatic categorization of Major, Minor, and Patch changes
- 🌐 **Multiple Interfaces**: Command-line tool and HTML viewer
- 📋 **Export Options**: Formatted output for sharing and documentation

## Installation & Setup

The tool is located in the `utils/` directory and requires Node.js to run:

```bash
# From the Perseus repository root
cd utils/
chmod +x release-notes-reviewer.js
```

## Usage

### Command Line Interface

#### List Available Packages

```bash
node utils/release-notes-reviewer.js list
```

**Output:**
```
Available packages:
  - kas
  - keypad-context
  - kmath
  - math-input
  - perseus
  - perseus-core
  - perseus-editor
  - perseus-linter
  - perseus-score
  - perseus-utils
  - pure-markdown
  - simple-markdown
```

#### Recent Releases Summary

```bash
# Show summary of last 5 releases (default)
node utils/release-notes-reviewer.js recent

# Show summary of last 10 releases
node utils/release-notes-reviewer.js recent 10
```

**Example Output:**
```
=== Perseus Release Summary (Last 5 releases) ===
Total Releases: 5
Packages: 1
Changes: 1 major, 8 minor, 40 patch

Recent Releases:
  perseus@67.0.0 (no date)
    Changes: 1M, 1m, 7p
    Authors: handeyeco, nishasy, SonicScrewdriver
  perseus@66.5.0 (no date)
    Changes: 0M, 1m, 7p
    Authors: nishasy, handeyeco, MikeKlemarewski
```

#### Package-Specific Releases

```bash
# Show last 3 releases for perseus package (default)
node utils/release-notes-reviewer.js package perseus

# Show last 5 releases for perseus-core package
node utils/release-notes-reviewer.js package perseus-core 5
```

**Example Output:**
```
=== perseus Releases (Latest 1) ===

=== perseus@67.0.0  ===

Major Changes:
  • Remove deprecated onWidgetStartProps API from APIOptions
    (@handeyeco, #2805)

Minor Changes:
  • Export deriveUserInputFromSerializedState from perseus
    (@handeyeco, #2829)

Patch Changes:
  • [Image](DX) Add an image generator + use it in testdata
    (@nishasy, #2809)
  • [Radio] Adjust the transition time of the indicator
    (#2815)
```

#### Search Releases

```bash
# Search across all packages
node utils/release-notes-reviewer.js search "radio widget"

# Search within a specific package
node utils/release-notes-reviewer.js search "bug fix" perseus

# Search for feature additions
node utils/release-notes-reviewer.js search "interactive graph"
```

**Example Output:**
```
=== Search Results for "radio" ===

perseus@67.0.0:
  change: [Radio] Adjust the transition time of the indicator
  change: [Radio] Adjust horizontal scroll fade bar color
  change: New Storybook Docs for Radio Widget (New)

perseus@66.5.0:
  change: [Radio] Enhance content for screen reader access
  change: [Radio] Add comments explaining accessibility coding
```

### HTML Viewer Interface

Open `utils/release-notes-viewer.html` in a web browser for a graphical interface to the release notes reviewer. The HTML interface provides:

- **Interactive Controls**: Dropdown menus and input fields for easy command building
- **Visual Output**: Styled release notes with syntax highlighting
- **Responsive Design**: Works on desktop and mobile devices
- **Command Generation**: Shows the exact CLI commands to run

## Release Notes Structure

The tool parses CHANGELOG.md files that follow the Changesets format:

```markdown
# @khanacademy/package-name

## 1.2.3

### Major Changes

-   [#123](link) [`commit`](link) Thanks [@author]! - Description of breaking change

### Minor Changes

-   [#124](link) [`commit`](link) Thanks [@author]! - Description of new feature

### Patch Changes

-   [#125](link) [`commit`](link) Thanks [@author]! - Description of bug fix
-   Updated dependencies:
    -   @khanacademy/other-package@2.0.0
```

## Extracted Information

For each release, the tool extracts:

- **Version Number**: Semantic version (e.g., "67.0.0")
- **Change Categories**: Major, Minor, Patch changes
- **Change Details**: Description, PR number, commit hash, author
- **Dependencies**: Updated package dependencies
- **Metadata**: Release dates (when available)

## Use Cases

### For Developers

- **Impact Assessment**: Understand how changes affect your code
- **Upgrade Planning**: Identify breaking changes before updating
- **Feature Discovery**: Find new capabilities added to packages
- **Bug Tracking**: Search for specific bug fixes

### For Project Managers

- **Release Planning**: Review what's been delivered recently
- **Contributor Recognition**: See who's contributing to different areas
- **Change Velocity**: Track the pace of development across packages
- **Documentation**: Generate release summaries for stakeholders

### For Quality Assurance

- **Testing Focus**: Identify areas that need testing attention
- **Regression Tracking**: Find related changes that might interact
- **Feature Validation**: Verify that announced features are working
- **Risk Assessment**: Evaluate the impact of major changes

## Advanced Features

### Search Capabilities

The search function supports:

- **Text Matching**: Case-insensitive substring matching
- **Component Filtering**: Search within specific packages
- **Change Type Filtering**: Find only major/minor/patch changes
- **Multi-term Search**: Use multiple keywords

### Output Formatting

- **Clean Descriptions**: Extracts human-readable change descriptions
- **Linked References**: Preserves PR and commit links for traceability
- **Author Attribution**: Shows contributor information
- **Structured Data**: Organized by change type and significance

## Integration Options

### CI/CD Integration

```bash
# Generate release summary for deployment notifications
node utils/release-notes-reviewer.js recent 3 > release-summary.txt

# Check for breaking changes before deployment
node utils/release-notes-reviewer.js search "breaking" | grep -q "Major Changes"
```

### Documentation Generation

```bash
# Create widget-specific documentation
node utils/release-notes-reviewer.js search "radio widget" > radio-changes.md
node utils/release-notes-reviewer.js search "interactive graph" > graph-changes.md
```

### Release Validation

```bash
# Verify recent changes include expected features
node utils/release-notes-reviewer.js recent 1 | grep "feature name"
```

## Troubleshooting

### Common Issues

1. **No results found**: Ensure you're running from the Perseus repository root
2. **Package not found**: Check the package name with `node utils/release-notes-reviewer.js list`
3. **Empty output**: Some packages may have different changelog formats
4. **Permission errors**: Make sure the script is executable (`chmod +x utils/release-notes-reviewer.js`)

### File Locations

The tool automatically finds CHANGELOG.md files in:
- `packages/*/CHANGELOG.md` (package-specific changelogs)
- `./CHANGELOG.md` (root changelog, if present)
- Other locations with `find . -name "CHANGELOG.md"`

## Contributing

To improve the release notes reviewer:

1. **Add Features**: Extend the `ReleaseNotesReviewer` class
2. **Improve Parsing**: Enhance the changelog parsing logic
3. **Add Formats**: Support additional changelog formats
4. **Enhance UI**: Improve the HTML viewer interface

### Code Structure

```javascript
class ReleaseNotesReviewer {
    findChangelogFiles()     // Locate all CHANGELOG.md files
    parseChangelog()         // Parse individual changelog files
    getAllReleases()         // Aggregate releases from all packages
    searchReleases()         // Search functionality
    generateSummary()        // Create summaries and statistics
    printRelease()           // Format output for display
}
```

## Examples

### Finding Widget Changes

```bash
# See all radio widget changes
node utils/release-notes-reviewer.js search "radio"

# See all interactive graph changes
node utils/release-notes-reviewer.js search "interactive graph"

# See all math input changes
node utils/release-notes-reviewer.js search "math input"
```

### Tracking Contributors

```bash
# See recent work by a specific contributor
node utils/release-notes-reviewer.js search "@handeyeco"

# See all accessibility improvements
node utils/release-notes-reviewer.js search "accessibility"
```

### Release Analysis

```bash
# Compare packages by recent activity
for pkg in perseus perseus-core perseus-editor; do
    echo "=== $pkg ==="
    node utils/release-notes-reviewer.js package $pkg 1
done
```

## License

This tool is part of the Perseus project and follows the same license terms.