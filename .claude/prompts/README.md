# Perseus Prompt Library

This directory contains modular documentation for AI assistants working on the Perseus codebase. Each document focuses on a specific aspect of development.

## Available Documents

### Core References
- **[codebase-map.md](./codebase-map.md)** - Package structure, data flow, and module boundaries
- **[widget-development.md](./widget-development.md)** - Complete guide for creating and maintaining widgets
- **[testing-best-practices.md](./testing-best-practices.md)** - Testing patterns, utilities, and guidelines

### Development Guidelines
- **[component-best-practices.md](./component-best-practices.md)** - React components, Wonder Blocks, accessibility
- **[file-organization.md](./file-organization.md)** - Directory structure, naming conventions, imports
- **[iteration-and-feedback.md](./iteration-and-feedback.md)** - When to ask for help vs. iterate autonomously

## How to Use

These documents are referenced from the main `CLAUDE.md` file. When working on specific tasks, the relevant documents will be loaded into context.

## Maintenance

When updating these documents:
1. Verify information against actual code (not just documentation)
2. Use concrete examples from the codebase
3. Include file paths and line numbers where helpful
4. Mark deprecated patterns clearly
5. Date any time-sensitive information

## Recent Updates

- **2024-02-05**: Initial prompt library created based on current codebase analysis
- **2024-02-05**: Corrected widget patterns after discovering Rubric is still used (but only for scoring)