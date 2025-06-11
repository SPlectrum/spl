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
./spl_execute <app-name> <command> [options] [args]

# Examples
./spl_execute test-suite spl/console/log hello world
./spl_execute test-suite -d spl/console/log hello world  # debug mode

# Boot app commands (from spl/apps/boot/)
./spl usr/apps_to_release        # Release all apps
./spl usr/deploy_apps            # Deploy all apps
./spl usr/all_apps_to_release    # Release all apps (master batch)
./spl usr/{app-name}_to_release  # Release specific app
./spl usr/deploy_{app-name}      # Deploy specific app

# Batch file to method generation
./spl spl/app/create -f {batch-file}.batch  # Generate usr/ method from batch file

# API testing commands
./spl_execute test-tools-git usr/git-status-tests
./spl_execute test-tools-7zip --help  # 7zip tests (scaffolded)

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

**Testing**: Use help flag (`-h`, `--help`) in separate tests - always takes precedence

**Console Modes**: `debug` (full object dump), `verbose`, `silent`, or standard completion messages

## Application Development Patterns

**Existing Apps**:
- `boot` - Release/deployment management 
- `model` - Template for new apps
- `test-suite` - Core platform testing
- `test-tools-git` - Git API testing
- `test-tools-7zip` - 7zip API testing (scaffolded)
- `watcher` - Development/monitoring

**Batch Files (.batch extension)**:
- Contain command sequences for automation
- Auto-converted to JavaScript usr/ methods via `spl/app/create -f {file}.batch`
- Essential for release management and testing workflows
- Boot app manages release/deployment for all apps via batch files

**App Creation Workflow**:
1. Copy structure from model app (`spl`, `spl.js`, `modules/`)
2. Create batch files for app functionality
3. Update boot app release system (add to `apps_to_release.batch`, etc.)
4. Generate usr/ methods from batch files
5. Test integration with `./spl_execute {app} --help`

**API Development Workflow**:
1. Create API structure in `modules/{category}/{api-name}/`
2. Implement auxiliary library, index.js, methods, and argument schemas
3. Create corresponding test app (`test-{category}-{api-name}`)
4. Create test batch files and generate usr/ methods
5. Integrate with boot app release system

## Data Layer Specifics

- Immutable record storage using directory/file structure
- Topic encoding: `package/topic` structure similar to modules
- Primary key encoding: subdirectories as partitions
- Schema files at topic directory level
- AVRO containers for high-volume directories