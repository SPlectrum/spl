# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

**Batch File with Arguments Development Workflow**:
1. **Create/Edit**: Modify `.batch` file with command sequence and parameter placeholders (`$1`, `$2`, etc.)
2. **Test Batch**: Use `spl/app/exec -f {file}.batch -a arg1 arg2` to test batch file execution
3. **Generate Command**: Convert to usr/ command with `spl/app/create -f {file}.batch`  
4. **Test Command**: Test generated usr/ command with `usr/{command} -a arg1 arg2`
5. **Parameter Patterns**: `$1`, `$2` (positional), `$@` (array), `$*` (space-separated string)

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

## Data Layer Specifics

- Immutable record storage using directory/file structure
- Topic encoding: `package/topic` structure similar to modules
- Primary key encoding: subdirectories as partitions
- Schema files at topic directory level
- AVRO containers for high-volume directories