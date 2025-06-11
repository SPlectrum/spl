[← Home](../README.md)
# How To for SPlectrum

## Quick Command Reference
```bash
# Pattern: ./spl_execute <app> <api/method> [options] [args]
./spl_execute test-suite spl/console/log hello world
./spl_execute test-tools-git usr/git-status-tests
./spl_execute test-tools-7zip usr/7zip-add-tests
./spl_execute watcher -d tools/git/status --repo data/project
./spl_execute boot usr/create_linux_installer --help
```

## File Structure (For Code Generation)
```
modules/spl/{api}/{method}.js              # Core APIs
modules/tools/{tool}/{method}.js           # Tool wrappers  
spl/apps/{app}/modules/usr/{method}.js     # App methods
{method}_arguments.json                    # All argument schemas
```

## Method Implementation Template
```javascript
exports.default = function api_method_name(input) {
    // 1. Extract parameters
    const param = spl.action(input, 'paramName');
    const context = spl.context(input, 'contextProp');
    
    // 2. Execute logic
    
    // 3. Complete
    spl.completed(input);
}
```

## Development Rules
- Use `spl.action(input, 'param')` for CLI args, `spl.context(input, 'prop')` for execution state
- Call `spl.completed(input)` at method end (required)
- Use `spl.throwError(input, 'message')` for fatal errors only
- Test help flags separately: `./spl_execute app method --help`  

## Batch Files and Method Generation

### Creating Batch Files
Batch files (`.batch` extension) contain command sequences for automation:
```bash
# Example: deploy_myapp.batch
spl/package/load -r install -d packages -f apps_myapp.json
spl/package/deploy -r apps -d . -f apps_myapp.json
```

### Auto-generating Methods from Batch Files
Use `spl/app/create` to generate JavaScript methods from batch files:
```bash
# Navigate to app directory
cd spl/apps/{app-name}

# Generate usr/ method from batch file
./spl spl/app/create -f mybatch.batch

# Creates:
# - modules/usr/mybatch.js (JavaScript method)
# - modules/usr/mybatch_arguments.json (argument schema)
```

### Batch File Usage Pattern
```bash
# 1. Create batch file with command sequence
echo "spl/console/log Hello World" > hello.batch

# 2. Generate method from batch
./spl spl/app/create -f hello.batch

# 3. Execute generated method
./spl usr/hello
```

### Common Use Cases
- **Release management**: Create packages and save to release directory
- **Deployment**: Load packages and deploy to target locations  
- **Testing**: Run test suites with specific configurations
- **Build processes**: Compile and package applications

## Creating New Documentation

### File Creation Checklist
```
1. Create in docs/ folder (kebab-case naming)
2. Start with [← Home](../README.md) 
3. End with --- and [← Home](../README.md)
4. Add to README.md documentation list
```

### Documentation Standards (For AI Efficiency)
- **Token-efficient**: Front-load key information, use scannable format
- **Code examples**: Always include working command/code snippets
- **Consistent structure**: Use template below for predictable parsing
- **Proactive optimization**: Claude Code should propose improvements without hesitation

### Standard Template
```markdown
[← Home](../README.md)

# Title (Descriptive, not generic)

Brief description - what this solves/enables.

## Quick Reference
Key commands/patterns first.

## Implementation Details  
Technical specifics.

---

[← Home](../README.md)
```

### Adding to README.md
```markdown
- [Document Title](./docs/filename.md) - Brief purpose
```

