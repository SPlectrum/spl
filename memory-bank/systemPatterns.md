# System Patterns

This file documents recurring patterns and standards used in the project.

2025-05-26 20:47:00 - Initial Memory Bank creation and project analysis.

## Coding Patterns

- **JSON Argument Files**: Each module function has a corresponding `*_arguments.json` file defining its API contract
- **Index File Organization**: Each module directory contains an `index.js` file for module exports
- **Modular Structure**: Clear separation between different functional areas (app, blob, command, console, data, execute, package, record, void)
- **Single Concern APIs**: Each API module operates on a specific data structure or functional domain

## Architectural Patterns

- **Execution Pipeline**: Request processing follows a pipeline pattern managed by the execute API
- **Data Layer Abstraction**: Data access is abstracted through the data API, supporting both kafka-style and conventional file operations
- **Package Management**: Standalone package API for module and data package installation
- **Command Processing**: Dedicated command API for parsing and executing command-line operations
- **Schema-Driven Development**: AVRO schemas define data structures and enable schema evolution
- **Minimal Core + Extensions**: Core functionality is minimal, with advanced features added through additional packages

## Testing Patterns

- **File-Based Test Execution**: Tests defined in batch files executed via `spl/app/exec`
- **Request/Response Logging**: Automatic capture of execution context in `commands/requests/` and `commands/responses/`
- **Pipeline Testing**: Complete execution pipeline validation (process → prepare → parse → pipeline → finalise → exec)
- **Modular Test Structure**: Tests organized by module (console, blob, data, package) with standardized command format
- **Debug Mode Testing**: Comprehensive execution traces and data structure capture for validation
- **Timestamped Test Records**: Automatic timestamping of test requests and responses for audit trails
- **Test Environment Isolation**: Separate test applications (test, test2) with independent configurations
- **Batch Command Format**: Standardized command syntax for test file definitions
- Test files located in `spl/release/` directory
- `test.js` and `testParser.js` suggest unit testing approach
- Installation testing through `spl/release/install/` structure
- Package-based testing with JSON configuration files in `spl/release/install/packages/`

## Test Infrastructure Patterns

- **Execution Engine Reuse**: Leverages production `spl/app/exec` for test execution
- **Validation Framework**: Built-in output validation through pipeline result comparison
- **Performance Metrics**: Automatic execution timing and duration tracking
- **Error Handling**: Comprehensive error capture and status reporting
- **Test Data Management**: Organized fixture structure with expected outputs
- **Automated Cleanup**: Test environment reset and temporary file management

## File Organization Patterns

- **Hierarchical Module Structure**: `spl/modules/spl/[api-name]/[function].js`
- **Documentation Co-location**: `docs/` directory with comprehensive documentation
- **Release Management**: Dedicated `release/` directory with installation and testing infrastructure
- **Configuration Files**: JSON files for arguments, packages, and parser configuration
[2025-05-27 14:55:00] - **Debug Flag Testing Pattern**: Updated testing methodology to use debug flag (-d) with SPL commands for comprehensive execution tracing. Test files organized by API module with one file per method, using apps/test-suite/data/ directory for test data storage. This provides detailed validation, performance metrics, and error detection capabilities.
## Testing Patterns

[2025-05-27 15:04:00] - **Active Debug Flag Testing Implementation**: Currently applying debug flag methodology to blob API testing with comprehensive execution tracing. Test files organized in apps/test-suite/ structure with batches/ directory for command files and data/ directory for test fixtures. This provides detailed validation capabilities and performance metrics for each API operation.
## Project Management Patterns

[2025-05-27 18:21:00] - **PRINCE2 Framework Implementation**: Applied structured project management approach with:
- **Just-in-Time Planning**: Detailed planning only for immediate next step (current work package)
- **Stage-Based Delivery**: Test suite implementation organized as executing stage with clear deliverables
- **Work Package Management**: Issues #151-154 structured as discrete work packages with defined quality criteria
- **Lessons Learned Integration**: Previous work package experiences inform current planning and execution
- **Quality Assurance**: Debug flag methodology provides consistent validation across all work packages

## Planning Patterns

[2025-05-27 18:21:00] - **Adaptive Planning Methodology**: 
- **Immediate Horizon**: Detailed planning for current work package only
- **Short-term Horizon**: High-level planning for next 2-3 work packages
- **Long-term Horizon**: Strategic direction without detailed implementation planning
- **Planning Reviews**: Lessons learned from completed work packages inform subsequent planning
- **Flexibility Maintenance**: Avoid over-planning to maintain adaptability to changing requirements