# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Code Quick Reference

### Essential First Steps
1. **Read TodoList**: Use `TodoRead` tool at start of sessions to understand current tasks
2. **Environment Validation**: Run essential tests to validate environment setup instead of manual checking
3. **Plan Complex Tasks**: Use `TodoWrite` for multi-step tasks, mark as `in_progress` before starting work

### Environment Validation Through Testing
**Philosophy**: Instead of manually checking configurations, validate environment through successful execution of essential tests.

**Essential Test Suite** (to be implemented):
- **Basic Execution**: `./spl_execute spl boot --help` (validates basic app execution)
- **Module Resolution**: `./spl_execute spl boot spl/console/log "test"` (validates module loading)
- **Package System**: `./spl_execute spl boot spl/package/create --help` (validates core APIs)
- **Tools Integration**: `./spl_execute spl boot tools/7zip/add --help` (validates tools modules)

**Test-Driven Environment Setup**:
- If essential tests pass → environment is correctly configured
- If tests fail → use debug flag to identify and fix configuration issues
- Eliminates need for manual path/context checking in routine development
- Provides immediate feedback on environment state

### Core Work Patterns
**Testing & Development**:
- Test changes in `spl/` install directory before packaging to `release/`
- Use incremental batch file testing before generating permanent usr/ methods
- Always clean up test artifacts to restore pre-test state
- Package apps to release folder before committing: `./spl usr/apps_to_release`

**File Operations**:
- **Read First**: Always use `Read` tool before `Edit` or `Write` operations
- **Edit Existing**: Prefer `Edit`/`MultiEdit` over `Write` for existing files
- **Path Resolution**: Relative paths resolve from SPL install root (`spl.context(input, "cwd")`)

**Git Operations**:
- **Status Check**: Run `git status`, `git diff`, `git log` before commits
- **Package First**: Always package changes to release folder before committing
- **Commit Pattern**: Use conventional commit format with Claude attribution
- **Push Regularly**: Use `git push` to keep remote updated

### Command Execution Patterns
**From Repository Root**:
```bash
./spl_execute spl <app-name> <command>          # Execute from external directory
./spl_execute install <app-name> <command>      # Execute from install directory
```

**From Install Directory** (`spl/apps/{app-name}/`):
```bash
./spl <command>                                 # Direct execution
./spl spl/app/exec -f {file}.batch             # Test batch files
./spl spl/app/create -f {file}.batch           # Generate usr/ methods
```

**Testing Workflow**:
```bash
./spl spl/app/exec -f test.batch               # Test batch file
./spl spl/app/create -f test.batch             # Generate method
./spl usr/test-command                         # Test generated method
./spl usr/apps_to_release                      # Package for release
```

### Error Resolution Patterns
- **Command Not Found**: Verify working directory and use correct relative paths
- **SPL Errors**: Check `spl.throwError()` integration in auxiliary libraries
- **Path Issues**: Confirm paths resolve from install root, not repository root
- **Testing Failures**: Clean up previous test artifacts and ensure prerequisites installed
- **Module Resolution Errors**: Check if `appRoot` is set in context for API methods
- **Path Resolution Debugging**: Use debug flag (`-d`) for detailed execution context

### Documentation Maintenance
- **Update CLAUDE.md**: Document new patterns and architectural insights immediately
- **Continuous Learning**: Ask "What have I learned?" and update docs accordingly
- **Optimize for Claude**: Structure information for quick reference and common operations

## Project Overview

SPlectrum is a modular execution platform with a core engine providing minimal viable functionality for application development. This is the second iteration (spl1) starting from spl0 state. The platform uses a self-extracting package system with immutable Kafka-like record storage.

## Architecture

### Core Components

**Execution Layer** (`modules/spl/execute/`):
- `execute.js` - Main execution engine managing pipeline segments with TTL protection
- `initialise.js`, `next.js`, `complete.js` - Execution flow control with status routing
- Uses `headers.spl.execute` for execution context with TTL mechanism preventing infinite loops
- Status-based routing: `data`→`data_next`, `blob`→`blob_next`, `error`→`spl/error/catch`, `completed`→`spl/execute/set-next`

**Data Layer** (`modules/spl/data/`):
- Kafka-like immutable record storage using file directory structure
- Topic/PK encoding: directories encode topic and primary key, files are single records
- `data.js`, `read.js`, `write.js`, `queue.js` - Data persistence operations
- Schema attachment at topic level, AVRO containers for high record count directories

**Package Management** (`modules/spl/package/`):
- Complete lifecycle: `create.js`, `deploy.js`, `load.js`, `save.js`, `remove.js`
- Self-extracting package system with JSON storage format
- Flexible location specification: arrays, URI strings, or objects
- Workspace reference pattern: `spl/package.${spl.fURI(packageName)}`

**Application Framework** (`modules/spl/app/`):
- Command line parsing with `command-line-args` library
- Pipeline processing: `parse.js`, `pipeline.js`, `process.js`
- Application lifecycle: `create.js`, `generate.js`, `run.js`
- Support for multi-line and multi-part commands

**Supporting APIs**:
- `modules/spl/blob/` - Binary/file storage operations
- `modules/spl/console/` - Logging with `error`, `log`, `trace`, `warn`
- `modules/spl/command/` - Command execution framework
- `modules/spl/error/` - Error handling with `spl.throwError()`
- `modules/tools/git/` - Git integration wrapper (status implemented, others defined)
- `modules/tools/7zip/` - Archive management wrapper (scaffolded)

### Key Architectural Patterns

**Module System**: URI-based addressing (`spl/execute/next`) with `modules/` directory structure

**Workspace Model**: 
- `input.value` - workspace data with nested structure using dot notation
- `input.headers.spl.execute` - execution context 
- `input.headers.spl.request` - request properties
- Deep property access via `spl.rcRef()`, `spl.rcSet()`, `spl.rcGet()`

**Action-Based Execution**: Actions referenced by URI, executed via `spl.moduleAction()`

**Configuration Hierarchy**: Multi-level resolution: method → workspace method → workspace API → execution headers

**Error Handling**: No manual error handling - caught at execution pipeline level using `spl.throwError()`

## Common Development Commands

This is a Node.js project without package.json. Execute commands using the SPL application:

```bash
# Main execution command (from root)
./spl_execute <install-folder> <app-name> <command> [options] [args]

# Examples
./spl_execute spl test-suite spl/console/log hello world
./spl_execute spl test-suite -d spl/console/log hello world  # debug mode
./spl_execute install boot usr/boot_to_release  # Execute from install folder

# Boot app commands (from spl/apps/boot/ - used when working directly in install)
./spl usr/apps_to_release        # Release all apps
./spl usr/deploy_apps            # Deploy all apps
./spl usr/all_apps_to_release    # Release all apps (master batch)
./spl usr/{app-name}_to_release  # Release specific app
./spl usr/deploy_{app-name}      # Deploy specific app

# Batch file to method generation
./spl spl/app/create -f {batch-file}.batch  # Generate usr/ method from batch file

# API testing commands
./spl_execute spl test-tools-git usr/git-status-tests
./spl_execute spl test-tools-7zip --help  # 7zip tests (scaffolded)

# Git API (example commands)
./spl tools/git/status --repo <path>
./spl tools/git/add --files "." --repo <path>
./spl tools/git/commit --message "commit msg" --repo <path>
```

## Release and Deployment Process

SPlectrum uses Linux-only deployment with .batch file extension:

1. **Release Apps**: `./spl usr/apps_to_release` or `./spl usr/all_apps_to_release`
2. **Deploy Apps**: `./spl usr/deploy_apps` 
3. **Individual Operations**: `./spl usr/{app-name}_to_release`, `./spl usr/deploy_{app-name}`
4. **Method Generation**: After creating/updating .batch files, run `./spl spl/app/create -f {file}.batch`

## Key Files for Understanding

- `modules/spl/spl.js` - Core utility library with workspace/context management (267 lines)
- `modules/spl/execute/execute.js` - Main execution engine with TTL and logging
- `modules/arguments.json` - Root command line argument definitions
- `docs/how-to.md` - Essential usage instructions with batch file patterns
- `docs/creating-new-apps.md` - Complete guide for building applications
- `docs/implementing-new-api.md` - Guide for creating new modules with test apps
- `docs/spl-package-api-analysis.md` - Package lifecycle management
- `spl/apps/boot/modules/usr/` - Boot application functionality (auto-generated from .batch files)

## Working with the Codebase

**Module Pattern**: All modules export `default` function taking `input` object

**URI Conventions**: Forward slashes for paths (`spl/execute/next`), dots for config keys

**Input Structure**:
```javascript
{
  headers: {
    spl: {
      execute: { action, session, TTL, status, ... },
      request: { action, status, repeat, ... },
      [api]: { ... }  // API-specific headers
    }
  },
  value: {
    // Nested workspace data accessed via dot notation
  }
}
```

**Core Functions**:
- `spl.context(input, key)` - Get/set execution context
- `spl.request(input, key)` - Get/set request properties  
- `spl.action(input, key)` - Get current action config
- `spl.moduleAction(input, module)` - Execute module
- `spl.completed(input)` - Mark completion
- `spl.throwError(input, message)` - Error handling

**Location Specifications**: Support arrays `[repo, dir, file]`, URI strings, or objects with `path`/`uri`

**Path Resolution**: 
- `spl.context(input, "cwd")` points to SPlectrum install root (e.g., `/path/to/spl`)
- All relative paths are resolved from this install root, not project root
- Example: `apps/boot/batches` resolves to `{install-root}/apps/boot/batches`

**Console Operations**: Use direct calls (`console.log()`, `console.error()`) within methods, not moduleAction calls

**Dual Output Pattern**: 
- Store full structured results in workspace via `spl.wsSet()`
- Stream concise human-readable output to console
- Success: Short acknowledgment only (`✓ Operation completed`)
- Failure: Essential failure information only (`✗ Failed: reason`)
- Verbose details available in workspace for programmatic access

**Testing**: Use help flag (`-h`, `--help`) in separate tests - always takes precedence

**Console Modes**: `debug` (full object dump), `verbose`, `silent`, or standard completion messages

## Application Development Patterns

**Existing Apps**:
- `boot` - Release/deployment management 
- `model` - Template for new apps
- `test-suite` - Core platform testing
- `test-tools-git` - Git API testing
- `test-tools-7zip` - 7zip API testing (scaffolded)
- `test-boot` - Boot app functionality testing
- `watcher` - Development/monitoring

**Test App Patterns**:
- Naming: `test-{target}` (e.g., `test-boot`, `test-tools-git`)
- Test source locations rather than deployed locations
- Use auxiliary libraries (`modules/{domain}/{domain}.js`) for implementation logic
- Method files act as thin wrappers calling library functions
- Hybrid approach: Use Node.js modules when SPlectrum functionality incomplete

**Batch Files (.batch extension)**:
- Contain command sequences for automation
- Auto-converted to JavaScript usr/ methods via `spl/app/create -f {file}.batch`
- Essential for release management and testing workflows
- Boot app manages release/deployment for all apps via batch files
- Support parameter substitution: `$1`, `$2`, `$@`, `$*` for dynamic arguments
- Arguments passed via `-a` or `--args` flag to both `spl/app/exec` and generated usr/ commands
- **Testing Rule**: Always test batch files directly using `spl/app/exec -f {file}.batch` before generating usr/ commands - this isolates batch logic from generation issues

**Batch File with Arguments Development Workflow**:
1. **Create/Edit**: Modify `.batch` file with command sequence and parameter placeholders (`$1`, `$2`, etc.)
2. **Test Batch First**: Use `spl/app/exec -f {file}.batch -a arg1 arg2` to test batch file execution
3. **Debug Batch Issues**: If batch fails, fix the batch file logic before generation
4. **Generate Command**: Only after batch tests pass, convert to usr/ command with `spl/app/create -f {file}.batch`  
5. **Test Command**: Test generated usr/ command with `usr/{command} -a arg1 arg2`
6. **Parameter Patterns**: `$1`, `$2` (positional), `$@` (array), `$*` (space-separated string)

**Testing Principle**: Batch files are the source of truth - test them directly first to isolate logic issues from code generation problems.

**Boot App Development Workflow**:
1. **Modify**: Edit batch files or usr/ commands in `spl/apps/boot/`
2. **Test**: Use temporary spl-prefixed folders for testing (e.g., `spl-test-install`)
3. **Regenerate**: If batch files changed, use `spl/app/create -f {file}.batch` to update usr/ commands
4. **Publish**: Use `usr/boot_to_release` to publish changes to release folder
5. **Avoid**: Never test deployment in development `spl/` directory - use separate test folders

**App Creation Workflow** (Complete all steps):
1. Copy structure from model app (`spl`, `spl.js`, `modules/`)
2. Create batch files for app functionality
3. Update boot app release system (add to `apps_to_release.batch`, etc.)
4. Generate usr/ methods from batch files
5. Test integration with `./spl_execute {app} --help`
6. Package to release folder via `usr/boot_to_release` and `usr/apps_to_release`

**API Development Workflow**:
1. Create API structure in `modules/{category}/{api-name}/`
2. Implement auxiliary library, index.js, methods, and argument schemas
3. Create corresponding test app (`test-{category}-{api-name}`)
4. Create test batch files and generate usr/ methods
5. Integrate with boot app release system

## Git Repository Management

**Claude Code Responsibility**: Claude Code takes full responsibility for git repository interactions, including staging, committing, and maintaining commit history.

**Release Process Rule**: Always package changes to release folder before committing. Changes in `spl/` install directory are not git-tracked.

**Commit Message Standards**:
- Use conventional commit format: `type: concise description`
- Types: `fix`, `feat`, `docs`, `refactor`, `test`, `chore`
- Keep first line under 50 characters
- Include brief explanation in body when helpful
- Always include Claude Code attribution footer

**Commit Process**:
1. Verify changes are packaged to release folder (not just in `spl/` install)
2. Stage relevant changes with `git add`
3. Create descriptive but concise commit messages
4. Include context about why changes were made
5. Verify commit success with `git status`
6. Push commits to remote regularly with `git push`

**Example Commit Structure**:
```
fix: remove .txt files from boot app release and document deployment flow

Cleaned up deployment artifacts and enhanced documentation 
with architecture guidelines.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Repository Maintenance**:
- Monitor for deployment artifacts (.txt files, build outputs)
- Document architectural decisions and special characteristics
- Maintain clean commit history with meaningful messages
- Stage changes systematically (documentation + related code changes together)

## Development Workflow Strategy

**Full Strategy**: See [Development Workflow Strategy](docs/development-workflow-strategy.md) for comprehensive details.

**Current Mode**: Interactive context switching (single instance, collaborative work)

**Key Principles**:
- **TDD Approach**: Write tests before implementation, objective pass/fail criteria
- **Context Management**: Interactive mode for learning, autonomous mode for proven workflows  
- **Repository Planning**: Future domain separation (spl-core, spl-apps, spl-tools)

**Testing Requirements**:
- Verify state before and after changes (e.g., only .batch files in release)
- Create automated verification scripts for complex workflows
- Document test procedures for autonomous operation
- Build self-correcting feedback loops through objective testing

## Critical Code Quality Patterns

### Dangerous Default Anti-Pattern

**Problem**: In-code defaults using `|| "value"` syntax hide configuration errors and create unpredictable behavior.

**Example of Bad Pattern**:
```javascript
const fileDir = spl.action(input, "dir") || "batches";  // DANGEROUS
```

**Correct Approach**: 
- Remove in-code defaults entirely
- Set defaults in `arguments.json` files if needed
- Let missing configuration fail explicitly for debugging

**Bug Discovery**: `spl/app/run` was incorrectly looking in `batches/` folder instead of `scripts/` due to dangerous default in `spl/app/process-file.js`. The `|| "batches"` default masked the missing `dir` parameter.

### Module Location Consistency

**Critical Issue**: SPL has both global modules (`/modules/`) and install modules (`/spl/modules/`).

**Resolution Pattern**:
- Test apps typically use global modules (`../../../modules/spl/spl.js`)
- Install modules are for deployment packages
- Always verify which module location is being used in failing tests
- Check `spl.js` file in app for module path references

### Script vs Batch File Separation

**Design Discovery**: SPL distinguishes between different execution contexts:
- **Scripts** (`scripts/` folder): For `spl/app/run` and `spl/app/wrap` - multi-language capable
- **Batches** (`batches/` folder): For `spl/app/exec` and `spl/app/create` - SPL command sequences

**Key Insight**: Keep JavaScript as default script type while extending for multi-language support (bash, python, etc.) via file extension detection.

### Three-Step Release Process

**Critical Process**: Changes must flow through specific sequence:
1. **Release → Install**: `usr/release_to_install -a {folder}`
2. **Install → Boot**: `usr/modules_to_boot` 
3. **Boot → Release**: `usr/boot_to_release`

**Why Important**: Ensures all changes are properly packaged and module dependencies are synchronized across the system.

### Directory Management Rule

**Critical Practice**: Always return to repository root directory (`/mnt/c/SPlectrum/spl0`) after any operations in subdirectories.

**Why Essential**: 
- Prevents path confusion in git operations
- Ensures consistent relative path behavior
- Avoids git staging/commit errors due to wrong working directory
- Maintains predictable command execution context

**Implementation**: Use `cd /mnt/c/SPlectrum/spl0` after any subdirectory operations.

### Script Testing Framework Pattern

**Comprehensive Testing Strategy**: When implementing script execution functionality, establish baseline tests before extending features.

**Test Structure**:
```
scripts/
  simple-test.js           # Basic execution
  args-test.js            # Argument substitution ($1, $2, $@, $*)
  spl-context-test.js     # SPL integration testing

batches/
  js-run-tests.batch      # Test spl/app/run functionality
  js-wrap-tests.batch     # Test spl/app/wrap functionality  
  js-wrapped-execution-tests.batch  # Test generated usr/ commands
  js-help-tests.batch     # Test help functionality
```

**Testing Workflow**:
1. Create test scripts covering edge cases
2. Create batch files to automate testing
3. Generate usr/ commands from batch files
4. Validate all functionality before extending

**Benefits**: Prevents regressions when adding multi-language support and provides clear validation of functionality.

## Continuous Learning Rule

**Learning Trigger**: At regular appropriate intervals during development sessions, ask: "What have I learned from this?" and update knowledge accordingly.

**Learning Integration Process**:
1. **Pattern Recognition**: Identify new patterns, workflows, or solutions discovered
2. **Documentation Update**: Add new insights to CLAUDE.md, how-to.md, or create new docs
3. **Process Improvement**: Update workflows and procedures based on lessons learned
4. **Knowledge Synthesis**: Connect new learning to existing patterns and architecture

**Appropriate Intervals**:
- After completing complex problem-solving sessions
- When discovering new architectural insights or patterns
- Following successful resolution of previously unknown issues
- At the end of significant development milestones
- When transitioning between different types of work

**Learning Documentation**:
- Update CLAUDE.md with new working patterns
- Add to how-to.md for procedural learning
- Create new docs for significant architectural discoveries
- Enhance existing documentation with refined understanding

## API Testing Methodology

**Incremental Testing Pattern**: Discovered during 7zip API implementation - test in phases before committing to permanent methods.

**Phase-Based Testing Workflow**:
1. **Batch File Development**: Create `.batch` files with test commands first
2. **Direct Batch Testing**: Use `spl/app/exec -f {file}.batch` to validate functionality
3. **Issue Resolution**: Fix API issues discovered during batch testing
4. **usr/ Method Generation**: Only generate permanent methods after batch validation
5. **Method Verification**: Test generated usr/ methods work correctly

**Testing Command Patterns**:
- Use `spl_execute` from repository root: `./spl_execute spl {app-name} {command}`
- Test help first: Create comprehensive help test batch files for all methods
- Validate arguments: Fix alias issues (single character only) before testing operations
- Path resolution: Varies by API implementation (see Path Resolution Patterns below)

**API Validation Checklist**:
- All argument aliases are single characters (not "sfx", "slt" - use "s", "t")
- Help functionality works for all methods (test with both `-h` and `--help`)
- Required parameters properly validated (e.g., output paths for extraction)
- File path resolution documented and tested per API implementation
- Error handling integrates with SPL error system (`spl.throwError()`)

**Test Data Management**:
- Create test files in `{app}/data/` directory for input
- Archives created/stored in same `{app}/data/` directory
- Use simple text files with varied content for basic testing
- Create subdirectories for extraction testing (`extracted/`, `extracted-flat/`)

**Test Cleanup Requirements**:
- Remove created archives between test runs to ensure repeatability
- Clean extraction directories to prevent "file exists" conflicts
- Reset test environment to known state before each test execution
- Include cleanup commands in batch files for reliable automation

**Testing Benefits of This Approach**:
- Catches implementation errors before method generation
- Allows iteration on batch file design
- Provides immediate feedback on API usability
- Prevents creation of broken usr/ methods
- Enables testing of complete workflows before committing

## Path Resolution Patterns

**IMPORTANT**: Path resolution varies by API implementation. Each API can define its own path resolution strategy.

**Default SPL Path Resolution**:
- Relative paths resolved from SPL install root (`spl.context(input, 'cwd')`)
- Working directory: SPL install root
- Example: `file.txt` → `/path/to/spl-install/file.txt`

**Tools APIs Custom Path Resolution**:
- **tools/git**: Relative paths resolved to `{cwd}/{appRoot}/data/{repo}/`
- **tools/7zip**: Relative paths resolved to `{cwd}/{appRoot}/data/`
- Working directory: Still SPL install root, but file paths prefixed with app data location

**Path Resolution Implementation Pattern**:
```javascript
// In API auxiliary library (e.g., git.js, 7zip.js)
function getResourcePath(resource, appRoot, cwd) {
    if (path.isAbsolute(resource)) {
        return resource;  // Absolute paths used as-is
    }
    
    // Custom resolution for this API
    const fullAppRoot = path.resolve(cwd, appRoot, 'data');
    return path.resolve(fullAppRoot, resource);
}
```

**Testing Implications by API Type**:
- **Core SPL APIs**: Create test files in install root
- **tools/git**: Create test repos in `{test-app}/data/` 
- **tools/7zip**: Create test files in `{test-app}/data/`
- **Custom APIs**: Check auxiliary library for path resolution logic

**Path Resolution Debugging**:
- APIs log resolved paths via `console.log("PATH:" + resolvedPath)` 
- Check auxiliary library for `getResourcePath`, `getArchivePath`, etc. functions
- Test with both relative and absolute paths during development

## System Prerequisites and Dependency Management

**Current Issue**: SPL APIs depend on external tools but lack prerequisite validation.

**Tools API Dependencies Discovered**:
- **tools/7zip**: Requires `7z` executable (p7zip-full package on Ubuntu/Debian)
- **tools/git**: Requires `git` executable
- **Future tools**: Will have similar external dependencies

**Proposed Solution**: Implement prerequisite checking system.

**Target Implementation**:
```javascript
// In API auxiliary libraries
function checkPrerequisites() {
    const executable = get7zipExecutable();
    if (!isExecutableAvailable(executable)) {
        throw new Error(`7zip prerequisite missing: ${executable} not found. Install with: apt install p7zip-full`);
    }
}

// SPL utility for checking executables
spl.checkExecutable(command, installHint = null)
```

**Prerequisite Check Integration**:
- Run checks during API initialization or first use
- Provide helpful installation instructions in error messages
- Consider optional vs. required dependencies
- Support for different platforms (Linux, Windows, macOS)

**Installation Documentation Needs**:
- System requirements section in documentation
- Platform-specific installation guides  
- Docker/container images with pre-installed dependencies
- Development vs. production dependency lists

## Future Refactoring: Standardized Path Resolution

**Current Issue**: Each API implements custom path resolution, creating inconsistency and maintenance burden.

**Proposed Solution**: Standardize on app data pattern with optional scope parameter.

**Target API Design**:
```javascript
// Default: All relative paths resolve to app data directory
spl.resolvePath(input, relativePath)  
// → {cwd}/{appRoot}/data/{relativePath}

// With scope parameter for special cases
spl.resolvePath(input, relativePath, scope)
// Scopes: 'app-data' (default), 'install-root', 'repository', 'working-dir'
```

**Scope Examples**:
- `'app-data'` (default): `{appRoot}/data/file.txt` - Isolated app storage
- `'install-root'`: `{cwd}/file.txt` - SPL install directory  
- `'repository'`: `{cwd}/file.txt` - Repository root (for development tools)
- `'working-dir'`: `{process.cwd()}/file.txt` - Current working directory
- `'external'`: `/external/data/file.txt` - External data sources (mounts, shared storage)
- `'user-home'`: `{user.home}/file.txt` - User-specific configuration/data

**Migration Benefits**:
- **Consistency**: One pattern across all APIs
- **Simplicity**: Default behavior works for 80% of cases
- **Flexibility**: Scope parameter handles special requirements
- **Centralized**: Single implementation, consistent debugging
- **Testing**: Predictable test file locations
- **External Integration**: Clean abstraction for external data sources and shared storage
- **Enterprise Ready**: Support for mounted volumes, network storage, user directories

**Implementation Steps**:
1. Add `spl.resolvePath(input, path, scope = 'app-data')` utility
2. Migrate tools/git and tools/7zip to use standard utility
3. Remove custom path resolution from auxiliary libraries
4. Update core SPL APIs to use app-data scope by default
5. Update documentation and testing patterns

**External Data Integration Patterns**:
```javascript
// Data ingestion from external sources
spl.resolvePath(input, "dataset.csv", "external")
// → /mnt/shared-storage/dataset.csv

// User-specific configuration
spl.resolvePath(input, ".spl-config", "user-home") 
// → /home/user/.spl-config

// Processing files from mounted volumes
spl.resolvePath(input, "input/batch-001.json", "external")
// → /external/data/input/batch-001.json
```

**Enterprise Use Cases**:
- **Data Pipelines**: Process files from network attached storage
- **Shared Resources**: Access common datasets across multiple SPL instances
- **User Workspaces**: Isolated user data in home directories
- **Cloud Integration**: Mount cloud storage as external scopes
- **Legacy Systems**: Bridge to existing file system hierarchies

**Configuration-Driven Scopes**:
Future implementation could allow scope configuration:
```json
{
  "pathScopes": {
    "external": "/mnt/data-lake",
    "shared": "/company/shared-storage", 
    "user-home": "~/spl-workspace"
  }
}
```

**Backward Compatibility**:
- Maintain current behavior temporarily with deprecation warnings
- Provide migration guide for custom APIs
- Phase out custom path resolution over multiple releases

## App Context Configuration Patterns

### Critical spl.js Configuration Discovery

**Context vs Config Distinction**: SPL APIs distinguish between execution context and action configuration.

**Required Context Elements**:
```javascript
const context = {
    action: "spl/execute/initialise", 
    consoleProgress: "start",  
    consoleMode: "standard",
    runtimeMode: "silent", 
    cwd: splRoot, 
    session: session, 
    modules: `${appRoot}/modules`, 
    appRoot: appRoot,  // CRITICAL: Required for API path resolution
    TTL: 100 
};
```

**Context vs Config Pattern**:
- **Context**: `spl.context(input, 'appRoot')` - Retrieved via `spl.setContext()`
- **Config**: `spl.action(input, 'appRoot')` - Retrieved via `spl.setConfig()`
- **API Dependencies**: Tools APIs require `appRoot` in context, not just config

**App Architecture Comparison**:
- **Boot App**: Uses local modules (`./modules/spl/spl.js`), requires explicit context setup
- **Test Apps**: Use global modules (`../../../modules/spl/spl.js`), include moduleOverlay patterns

**Module Update Workflow for Apps**:
1. **Update Install**: `usr/release_to_install -a {install-dir}` - Copy modules to install folder
2. **Update App**: `usr/modules_to_boot` - Deploy modules from install to app
3. **Limitation**: `modules_to_boot` only copies `spl/` subdirectory, not top-level `tools/`
4. **Manual Override**: Direct copy required for tools: `cp -r install/modules/tools apps/{app}/modules/`

**Debug Flag Benefits**:
- Use `-d` flag to see complete execution context and workspace state
- Shows context values like `appRoot`, `cwd`, execution history
- Essential for diagnosing module resolution and path issues

**Batch Command Argument Pattern**:
- Batch commands generated from `.batch` files use `--args` or `-a` flag for parameters
- Arguments passed via `-a` flag get substituted into batch commands as `$1`, `$2`, etc.
- Example: `usr/release_to_install -a spl` passes `spl` as `$1` in batch file
- Without `-a` flag, arguments are treated as command paths, causing parse errors

## Advanced Testing Insights

### Incremental Testing Workflow

**Phase-Based Testing Discovery**: The 7zip API implementation revealed an effective incremental testing pattern that should be standardized across all API development.

**Testing Phases**:
1. **Batch File Testing**: Test command sequences as batch files before generating permanent usr/ methods
2. **Command Line Validation**: Verify argument parsing and alias constraints (single character requirement)
3. **Integration Testing**: Test real operations with actual tools and file system interactions
4. **State Management**: Clean up test artifacts to ensure repeatable test runs
5. **Packaging Verification**: Confirm changes are properly packaged to release folder

**Key Learning**: Use `spl/app/exec -f {file}.batch` for rapid iteration before committing to permanent usr/ method generation.

### Argument Schema Validation

**Alias Constraint Discovery**: All command line argument aliases must be single characters, causing validation failures with longer aliases like "sfx" or "slt".

**Validation Requirements**:
- Aliases must be exactly one character
- Parameter names should be descriptive (e.g., "sfx" vs. "selfExtracting")
- Test both short (-h) and long (--help) help flags
- Verify alias uniqueness within method scope

### Error Integration Patterns

**SPL Error Handling**: Successfully integrated native tool error codes with SPL's error handling system using `spl.throwError()`.

**Error Handling Strategy**:
```javascript
function processReturnCode(code, spl, input) {
    const errorMessages = {
        1: "Warning (Non fatal error(s))",
        2: "Fatal error", 
        7: "Command line error",
        8: "Not enough memory for operation",
        255: "User stopped the process"
    };
    
    if (code !== 0 && errorMessages[code]) {
        spl.throwError(input, `7zip error (${code}): ${errorMessages[code]}`);
    }
}
```

### Workspace Context Management

**API-Specific Context Paths**: Use API-specific workspace paths for result storage rather than generic patterns.

**Best Practice**: Store results using `spl.wsSet(input, 'tools/7zip.result', result)` instead of generic `result` key for better namespace isolation.

### Cross-Platform Executable Detection

**Platform Compatibility**: Implement robust executable detection for cross-platform tools.

**Detection Strategy**:
```javascript
function get7zipExecutable() {
    // Try platform-specific executables
    const executables = process.platform === 'win32' ? ['7z.exe', '7za.exe'] : ['7z', '7za'];
    
    for (const executable of executables) {
        try {
            execSync(`which ${executable}`, { stdio: 'ignore' });
            return executable;
        } catch (error) {
            continue;
        }
    }
    throw new Error('7zip not found. Install with: sudo apt-get install p7zip-full');
}
```

### System Prerequisites Management

**Dependency Documentation**: Document system prerequisites clearly and provide installation guidance.

**Prerequisites Framework Needs**:
- Automated prerequisite checking during API first use
- Platform-specific installation instructions
- Graceful degradation when optional tools are missing
- Clear error messages with installation commands

## Data Layer Specifics

- Immutable record storage using directory/file structure
- Topic encoding: `package/topic` structure similar to modules
- Primary key encoding: subdirectories as partitions
- Schema files at topic directory level
- AVRO containers for high-volume directories