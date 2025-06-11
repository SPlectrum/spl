# SPlectrum Platform Core

SPlectrum is a modular execution platform designed for Linux environments, providing a comprehensive framework for building and deploying applications through a command-based architecture.

## Quick Start

Execute commands using the SPL execution system:

```bash
# Basic command execution
./spl_execute <app-name> <module/api/method> [options] [arguments]

# Examples
./spl_execute test-suite spl/console/log "Hello World"
./spl_execute watcher tools/git/status --repo data/project
./spl_execute boot usr/create_linux_installer
```

**Debug Mode**: Add `-d` flag for detailed execution information.

## Core Architecture

SPlectrum consists of several key components:

- **Execution Layer** (`modules/spl/execute/`) - Pipeline management with TTL protection and status-based routing
- **Data Layer** (`modules/spl/data/`) - Immutable Kafka-like record storage using file directory structures  
- **Package Management** (`modules/spl/package/`) - Complete lifecycle management for deployment packages
- **Application Framework** (`modules/spl/app/`) - Command parsing and application lifecycle management
- **Tool Wrappers** (`modules/tools/`) - Git and 7zip command-line tool integration

## Available Apps

- **test-suite** - Core platform testing and validation
- **test-tools-git** - Git API testing and validation
- **test-tools-7zip** - 7zip API testing and validation (scaffolded)
- **watcher** - Development and monitoring tools
- **boot** - Release and deployment operations  
- **git** - Git repository management operations
- **model** - Template for creating new apps

## Linux-Only Design

SPlectrum is built exclusively for Linux environments:
- Native Linux distributions
- WSL2 (Windows Subsystem for Linux)
- Container deployments (planned)

## Getting Started

1. **Execute your first command**:
   ```bash
   ./spl_execute test-suite spl/console/log "Getting started with SPlectrum"
   ```

2. **Explore available commands**:
   ```bash
   ./spl_execute test-suite --help
   ./spl_execute watcher spl/console/log --help
   ```

3. **Check system status**:
   ```bash
   ./spl_execute watcher tools/git/status --repo .
   ```

## Development

For developers working on SPlectrum:
- Read [How to](./docs/how-to.md) for essential development guidelines
- See [Implementing New API](./docs/implementing-new-api.md) for creating new modules
- Review [Execute API Properties](./docs/execute-api-properties.md) for execution context details

## Documentation

### Essential Guides
- [How to](./docs/how-to.md) - Essential development and usage guidelines
- [Implementing New API](./docs/implementing-new-api.md) - Guide for creating new modules
- [Creating New Apps](./docs/creating-new-apps.md) - Complete guide for building applications
- [Creating a Release](./docs/creating-a-release.md) - Release process and deployment
- [Linux Installer Design](./docs/linux-installer-design.md) - Linux-first deployment strategy

### API Documentation  
- [Execute API Properties](./docs/execute-api-properties.md) - Execution context and pipeline properties
- [Package API Properties](./docs/package-api-properties.md) - Package management system
- [git API Methods](./docs/git-api-methods.md) - Git wrapper implementation (status: partial)
- [7zip API Methods](./docs/7zip-api-methods.md) - Archive management wrapper (status: scaffolded)
- [App API Properties](./docs/app-api-properties.md) - Application framework properties

### System Architecture
- [Boot App Functionality](./docs/boot-app-functionality.md) - Release and deployment operations
- [spl Data Layer](./docs/spl-data-layer.md) - Immutable data storage design
- [Schema and Repo Notes](./docs/schema-and-repo-notes.md) - Data structure design notes
- [Federated Monorepo Design](./docs/federated-monorepo-design.md) - Future distributed API architecture

### Tool References
- [7zip Command Line API](./docs/7zip-command-line-api.md) - Raw 7zip command reference
- [spl Package API Analysis](./docs/spl-package-api-analysis.md) - Package system analysis

## Project Status

**Current Version**: Core platform with essential functionality
**Target**: MVP for application development by version 1.0
**Platform**: Linux-first design with WSL support
