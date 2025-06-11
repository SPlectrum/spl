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

# Boot app commands (from release/install/boot/)
./spl usr/release_to_install   # Create install package
./spl usr/modules_to_boot      # Update boot app modules
./spl usr/boot_to_release      # Update release folder
./spl usr/deploy_install       # Deploy installation
./spl usr/deploy_modules       # Deploy modules
./spl usr/deploy_apps          # Deploy applications

# Git API (example commands)
./spl tools/git/status --repo <path>
./spl tools/git/add --files "." --repo <path>
./spl tools/git/commit --message "commit msg" --repo <path>
```

## Release and Deployment Process

1. **Create Release Package**: From `release/install/boot/`, run `./spl usr/release_to_install`
2. **Create Self-Extracting Archive**: 
   - Linux: `7z a spl-installer.tar.gz ./spl`
3. **Deploy Operations**: Execute `deploy_install`, `deploy_modules`, `deploy_apps` in sequence

## Key Files for Understanding

- `modules/spl/spl.js` - Core utility library with workspace/context management (267 lines)
- `modules/spl/execute/execute.js` - Main execution engine with TTL and logging
- `modules/arguments.json` - Root command line argument definitions
- `docs/how-to.md` - Essential usage instructions and error handling guidelines
- `docs/execute-api-properties.md` - Complete execution context documentation
- `docs/package-api-properties.md` - Package management system documentation
- `release/install/boot/modules/usr/` - Boot application functionality

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

## Data Layer Specifics

- Immutable record storage using directory/file structure
- Topic encoding: `package/topic` structure similar to modules
- Primary key encoding: subdirectories as partitions
- Schema files at topic directory level
- AVRO containers for high-volume directories