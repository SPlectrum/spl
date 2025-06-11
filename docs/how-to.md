[← Home](../README.md)
# How To for SPlectrum

## Command Execution
```bash
./spl_execute <app> <api/method> [options] [args]
./spl_execute test-suite spl/console/log hello world
./spl_execute watcher -d tools/git/status --repo data/project
```

## Module Locations
- Core: `modules/spl/{api}/{method}.js` + `modules/tools/{tool}/{method}.js`
- App-specific: `spl/apps/{app}/modules/usr/{method}.js`
- Arguments: `{method}_arguments.json`

## Development Rules
- No manual error handling (use `spl.throwError()` for fatal only)
- Always test help flags (`-h`, `--help`) separately
- Use `spl.action(input, 'param')` and `spl.context(input, 'prop')`
- Call `spl.completed(input)` at method end  

## Writing Documentation

### Document Location and Structure

- **Location**: All documentation files go in the `docs/` folder
- **File naming**: Use kebab-case (e.g., `implementing-new-api.md`)
- **Header link**: Start every document with `[← Home](../README.md)`
- **Footer link**: End every document with `---` followed by `[← Home](../README.md)`

### Adding to README

When creating new documentation:
1. Add the link to `README.md` in the documentation list
2. Use format: `- [Document Title](./docs/filename.md)`
3. Keep the list in logical order (not necessarily alphabetical)

### Documentation Guidelines

- **Be concise**: Write for Claude Code to understand and work with the system efficiently
- **Use standard markdown**: Consistent formatting across all documents
- **Include practical examples**: Show actual commands and code snippets
- **Cross-reference**: Link to related documentation using relative paths
- **Use code blocks**: Specify language for syntax highlighting (`bash`, `javascript`, `json`)

### Document Template

```markdown
[← Home](../README.md)

# Document Title

Brief description of what this document covers.

## Main Content Sections

Content organized logically.

---

[← Home](../README.md)
```

