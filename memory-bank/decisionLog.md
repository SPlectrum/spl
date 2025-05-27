# Decision Log

This file records architectural and implementation decisions using a list format.

2025-05-26 20:47:00 - Initial Memory Bank creation and project analysis.

## Decision

Modular API Architecture with Single Concern Principle

## Rationale 

The SPL project implements a modular architecture where:
- Actions are organized around specific data structures
- All methods of an API operate on the same data structure (single concern)
- Module packages contain sets of APIs serving specific purposes
- Minimal implementations can be extended through additional module packages

This approach provides clear separation of concerns, maintainability, and extensibility.

## Implementation Details

- Core APIs: execute, data, package, command (v0.2)
- Extended APIs: record, schema, avro, blob (v0.3)
- Support APIs: app, console, error, void
- Each API module has its own directory with dedicated functionality
- JSON argument files define API contracts
- AVRO schemas used for data storage and manipulation

## Decision

AVRO Integration for Schema Management

## Rationale

AVRO provides robust schema evolution and efficient data serialization, essential for a data platform like SPlectrum.

## Implementation Details

- JSON files handle compact topic data
- AVRO containers store historical data records
- Schema registry manages data record types
- Supports both file-based and in-memory AVRO operations
2025-05-26 20:57:00 - App API Analysis: Shared Data Structure Pattern

## Decision

App API methods operate on a unified application context data structure stored in the workspace at `spl/app`.

## Rationale

The app API demonstrates perfect adherence to the single concern principle - all methods work with the same core application data structure that manages command processing lifecycle.

## Implementation Details

### Core Data Structure (`spl/app`)
```javascript
{
  headers: { 
    spl: { 
      app: { 
        currentLine: -1, 
        currentPart: -1 
      } 
    } 
  }, 
  value: { 
    batch: {},           // Original batch input
    input: {},           // Prepared command lines/parts  
    parsed: {},          // Parsed command structures
    options: {}          // Configuration options
  }
}
```

### Method Coordination
- **[`prepare`](spl/modules/spl/app/prepare.js)**: Initializes the data structure, splits batch input into lines/parts
- **[`parse`](spl/modules/spl/app/parse.js)**: Processes input lines, populates parsed commands using auxiliary functions
- **[`exec`](spl/modules/spl/app/exec.js)**: Creates execution pipeline for file-based command processing
- **[`process`](spl/modules/spl/app/process.js)**: Entry point that orchestrates prepare→parse→pipeline→finalise flow

### Auxiliary Functions ([`app.js`](spl/modules/spl/app/app.js))
- `getNext()`, `setCurrent()`: Navigate through command lines/parts
- `commandString()`, `parsed()`: Access current command data
- `setParsed()`: Update parsed command structures
- `reset()`: Reset processing state

All methods share and coordinate through this single application context, ensuring consistent state management throughout the command processing lifecycle.
2025-05-26 21:59:00 - Execute API Analysis: Pipeline Management Data Structure Pattern

## Decision

Execute API methods operate on a unified execution context that manages pipeline state and flow control.

## Rationale

The execute API demonstrates sophisticated pipeline management where all methods coordinate through shared execution context data structures, enabling flexible runtime pipeline composition and execution flow control.

## Implementation Details

### Core Execution Context Structure
```javascript
// Context data (stored in input.headers.spl)
{
  action: "current_action_uri",           // Current action being executed
  pipeline: [...],                       // Array of pipeline steps to execute
  graph: { UUID, ancestors, children },   // Execution graph tracking
  TTL: 100,                              // Time-to-live counter
  status: "green",                       // Execution status
  startTime: timestamp,                  // Execution start time
  session: "session_id",                 // Session context
  repeatRequest: false                   // Repeat flag for data operations
}
```

### Method Coordination Pattern
- **[`initialise`](spl/modules/spl/execute/initialise.js)**: Sets up execution context, initializes pipeline array, graph tracking, TTL
- **[`set-pipeline`](spl/modules/spl/execute/set-pipeline.js)**: Dynamically adds new pipeline steps to existing pipeline array
- **[`set-next`](spl/modules/spl/execute/set-next.js)**: Manages pipeline progression, shifts next step from pipeline array to current request
- **[`next`](spl/modules/spl/execute/next.js)**: Executes current action, routes based on status (data/blob/error/execute/completed)
- **[`execute`](spl/modules/spl/execute/execute.js)**: Main execution loop, manages TTL, logging, and recursive execution flow

### Pipeline Flow Control
1. **Pipeline Setup**: `set-pipeline` prepends new steps to existing pipeline
2. **Step Execution**: `set-next` shifts next step from pipeline to current request
3. **Action Routing**: `next` executes action and routes based on completion status
4. **Flow Management**: `execute` provides main execution loop with TTL protection

### Key Design Features
- **Dynamic Pipeline Composition**: Runtime pipeline modification through `set-pipeline`
- **Status-Based Routing**: Different completion statuses route to appropriate next actions
- **TTL Protection**: Prevents infinite loops with time-to-live counter
- **Session Management**: Execution context tied to session for logging and state persistence
- **Graph Tracking**: UUID-based execution graph for complex workflow management

All methods share and coordinate through this execution context, enabling sophisticated pipeline orchestration while maintaining clear separation of concerns.
2025-05-26 22:05:00 - Data API Analysis: Kafka-Style Data Layer Pattern

## Decision

Data API methods operate on a unified data record structure that abstracts filesystem operations with Kafka-style semantics.

## Rationale

The data API implements a data layer abstraction where all methods work with standardized data record structures, providing consistent access patterns for both read and write operations while maintaining location flexibility.

## Implementation Details

### Core Data Record Structure
```javascript
// Data record format (stored in workspace at spl/data.{path})
{
  headers: { 
    spl: { 
      data: { 
        repo: "repository_path",     // Repository location
        dir: "directory_path",       // Directory within repo
        file: "filename.json"        // Actual filename (for writes)
      } 
    } 
  },
  value: { /* actual data content */ }
}
```

### Location Specification Pattern
All methods use standardized location objects:
```javascript
{
  repo: "repository_path",    // Base repository
  dir: "directory_path",      // Directory within repo  
  file: "filename.json",      // Optional specific file
  // Alternative formats supported:
  path: [repo, dir, file],    // Array format
  uri: "repo/dir/file"        // URI format
}
```

### Method Coordination Pattern
- **[`read`](spl/modules/spl/data/read.js)**: Reads latest or specific data records, normalizes location, stores in workspace with metadata
- **[`write`](spl/modules/spl/data/write.js)**: Writes timestamped data records, creates unique filenames, updates metadata
- **[`queue`](spl/modules/spl/data/queue.js)**: Queues action requests using Kafka-style record writing to session queues

### Auxiliary Functions ([`data.js`](spl/modules/spl/data/data.js))
- `setLocation()`: Normalizes various location formats (array, string, URI, object) to standard structure
- `readFileRecord()`: Filesystem read with automatic latest-file selection
- `writeFileRecord()`: Atomic write with timestamp-based naming and collision avoidance

### Key Design Features
- **Location Abstraction**: Multiple input formats normalized to consistent internal structure
- **Kafka-Style Semantics**: Timestamped records, latest-record reading, append-only writes
- **Workspace Integration**: All data records stored in workspace with standardized paths (`spl/data.{repo/dir/file}`)
- **Atomic Operations**: Safe file operations with temporary files and collision handling
- **Session Awareness**: Queue operations tied to session context for proper isolation
- **Reference/Copy Support**: Flexible data sharing through reference and copy mechanisms

All methods share the same data record structure and location semantics, enabling consistent data layer operations across different storage patterns while maintaining the single concern principle.
2025-05-26 22:11:00 - Blob API Analysis: Traditional Filesystem Operations Pattern

## Decision

Blob API methods operate on a unified filesystem location structure that abstracts traditional file operations with workspace integration.

## Rationale

The blob API implements traditional filesystem operations where all methods work with standardized location structures, providing consistent access patterns for file/directory operations while maintaining location flexibility. Currently handles UTF-8 text and JSON, with binary support identified as incomplete but sufficient for current operations.

## Implementation Details

### Core Filesystem Location Structure
```javascript
// Location specification (normalized by setLocation())
{
  repo: "repository_path",      // Base repository
  dir: "directory_path",        // Directory within repo
  file: "filename.ext",         // Optional specific file
  // Alternative input formats supported:
  path: [repo, dir, file],      // Array format
  uri: "repo/dir/file",         // URI format
  format: "json|text"           // Content format (get operations)
}
```

### Workspace Storage Pattern
```javascript
// Files stored in workspace at spl/blob.{repo/dir/file}
{
  headers: {},                  // Metadata (format-dependent)
  value: content                // File content (string or parsed JSON)
}
```

### Method Coordination Pattern
- **[`get`](spl/modules/spl/blob/get.js)**: Reads files with format detection (JSON/text), stores in workspace with parsed content
- **[`put`](spl/modules/spl/blob/put.js)**: Writes files asynchronously, creates directories as needed
- **[`contents`](spl/modules/spl/blob/contents.js)**: Lists directory contents, stores file/folder arrays in workspace
- **[`copy`](spl/modules/spl/blob/copy.js)**: Copies files/directories asynchronously using from/to location pairs
- **[`move`](spl/modules/spl/blob/move.js)**: Moves files/directories asynchronously using from/to location pairs
- **[`delete`](spl/modules/spl/blob/delete.js)**: Deletes files asynchronously

### Auxiliary Functions ([`blob.js`](spl/modules/spl/blob/blob.js))
- `setLocation()`: Normalizes various location formats (identical to data API pattern)
- `getFile()`: Synchronous file read (UTF-8)
- `putFile()`: Asynchronous file write with error logging
- `copyFile()`, `moveFile()`, `deleteFile()`: Asynchronous operations with completion logging
- `dirContents()`: Synchronous directory listing
- `addDir()`: Recursive directory creation

### Key Design Features
- **Traditional Filesystem Semantics**: Direct file operations (get/put/copy/move/delete/contents)
- **Asynchronous Operations**: Write operations execute asynchronously with completion logging
- **Format Flexibility**: Supports both JSON parsing and plain text handling
- **Location Abstraction**: Same location normalization pattern as data API
- **Workspace Integration**: All content stored in workspace with standardized paths (`spl/blob.{repo/dir/file}`)
- **Reference/Copy Support**: Flexible data sharing through reference and copy mechanisms
- **Error Handling**: Comprehensive error logging for asynchronous operations

### Current Limitations (Acknowledged)
- **Binary Support**: Currently incomplete - only UTF-8 text and JSON supported
- **Content Type Detection**: Limited format detection (should handle binary, string, JSON consistently)
- **Synchronous Reads**: Only read operations are synchronous, writes are asynchronous

All methods share the same filesystem location structure and workspace storage patterns, enabling consistent file operations across different operation types while maintaining the single concern principle for filesystem abstraction.

2025-05-27 00:26:00 - Test Suite Infrastructure Analysis: File-Based Testing Framework Pattern

## Decision

Implement comprehensive test suite leveraging existing `spl/app/exec` infrastructure for file-based test execution with automated validation.

## Rationale

The successful execution of test commands revealed that SPlectrum already has robust testing infrastructure in place. The `spl/app/exec` module provides a proven execution engine that can serve as the foundation for automated testing, while the existing request/response logging system provides built-in test validation capabilities.

## Implementation Details

### Test Execution Infrastructure
- **File-Based Test Definition**: Tests defined in batch files (e.g., `test-commands.txt`) executed via `spl/app/exec`
- **Pipeline Execution**: Complete validation through process → prepare → parse → pipeline → finalise → exec flow
- **Automatic Logging**: Request/response capture in timestamped JSON files for audit and validation
- **Debug Mode**: Comprehensive execution traces with 65ms performance metrics

### Test Command Format
```
spl/console/log Testing file-based command execution
spl/console/warn This is a warning message
spl/blob/put -r test-repo -d temp -f test.txt -c "Test content"
spl/blob/get -r test-repo -d temp -f test.txt
```

### Test Infrastructure Components
- **Execution Engine**: Reuses production `spl/app/exec` for consistent test execution
- **Validation Framework**: Built-in output validation through pipeline result comparison
- **Performance Metrics**: Automatic execution timing and duration tracking (65ms baseline)
- **Error Handling**: Comprehensive error capture and status reporting
- **Request/Response Logging**: Automatic capture in `commands/requests/` and `commands/responses/`

### Test Suite Architecture
```
spl/test-suite/
├── unit/                    # Unit tests for individual modules
├── integration/            # Integration tests for pipeline flows
├── fixtures/               # Test data and expected outputs
└── runners/               # Test execution and validation utilities
```

### Key Design Features
- **Infrastructure Reuse**: Leverages existing execution pipeline for test consistency
- **Automated Validation**: Built-in comparison of actual vs expected pipeline results
- **Performance Tracking**: Execution timing for performance regression detection
- **Modular Organization**: Tests organized by module (console, blob, data, package)
- **CI/CD Ready**: File-based tests suitable for automated execution environments

### Implementation Roadmap
- **Phase 1**: Foundation and basic test runners (Weeks 1-2)
- **Phase 2**: Core module testing (console, blob, data) (Weeks 3-4)
- **Phase 3**: Advanced features (performance, regression) (Weeks 5-6)
- **Phase 4**: Optimization and CI/CD integration (Weeks 7-8)

This approach provides comprehensive test coverage while leveraging proven infrastructure, ensuring test execution consistency with production behavior and enabling robust quality assurance as the system evolves.
2025-05-27 02:54:00 - **Issue Management System Architecture**: Decided to create comprehensive three-tier documentation structure: docs/current/ for active work, docs/archive/ for historical reference, and docs/future-issues.md for backlog. This provides clear separation of concerns and workflow progression from current → future → archive.

2025-05-27 02:54:00 - **Local Issue Numbering Strategy**: Chose to start local project issues at #150 to avoid conflicts with existing GitHub issues (#1-143). This ensures clean integration between local project tracking and GitHub repository management while maintaining traceability.

2025-05-27 02:54:00 - **GitHub CLI Integration**: Implemented automated fetching of GitHub issues (both open and closed) to maintain complete project visibility. This enables comprehensive issue management combining local project work with repository-wide context.
## Decision

[2025-05-27 15:04:00] - **Debug Flag Testing Methodology Implementation**: Adopted comprehensive debug flag (-d) testing approach for API validation with execution tracing.

## Rationale

The debug flag testing methodology provides detailed execution traces, performance metrics, and comprehensive validation capabilities that enable thorough testing of each API operation while maintaining consistency with production execution patterns.

## Implementation Details

- **Test Structure**: Tests organized in `apps/test-suite/` with `batches/` for command files and `data/` for fixtures
- **Debug Execution**: Using `-d` flag with SPL commands for comprehensive execution tracing
- **Validation Approach**: Execution traces provide detailed validation of API operations and data flow
- **Performance Tracking**: Debug output includes timing and performance metrics for regression detection
- **Error Detection**: Comprehensive error capture and status reporting through debug traces
- **Test Data Management**: Organized fixture structure in `apps/test-suite/data/` directory

This approach leverages existing SPL infrastructure while providing robust testing capabilities for quality assurance.
## Decision

[2025-05-27 18:21:00] - **PRINCE2 Project Management Framework Adoption**: Applied PRINCE2 principles to SPL test suite implementation for structured project delivery.

## Rationale

PRINCE2 provides proven project management methodology with emphasis on:
- **Just-in-Time Planning**: Plan only the immediate next step in detail, avoiding over-planning
- **Learn from Experience**: Apply lessons learned from previous work packages to improve delivery
- **Stage-Based Delivery**: Structure work into manageable stages with clear deliverables
- **Work Package Management**: Break stages into discrete work packages with defined quality criteria

This approach reduces planning overhead while maintaining project control and quality assurance.

## Implementation Details

### Project Structure
- **Current Stage**: Executing Stage (Test Suite Implementation)
- **Stage Purpose**: Deliver functional test suite for SPL core APIs
- **Work Packages**: Issues #151-154 (Blob, Data, Execute, Package API testing)

### Just-in-Time Planning Application
- **Detailed Planning**: Only for immediate next step (Issue #151 completion)
- **High-Level Planning**: Subsequent work packages planned at summary level
- **Planning Horizon**: One work package ahead with flexibility for changes

### Lessons Learned Integration
- Debug flag methodology validated through Issue #150 experience
- Encoding parameter standardization prevents API inconsistencies
- App-based testing structure enables production-like validation

### Quality Management
- Work package completion criteria defined upfront
- Debug trace validation provides quality assurance
- Lessons learned captured for future work packages

This framework ensures efficient delivery while maintaining flexibility and quality standards.