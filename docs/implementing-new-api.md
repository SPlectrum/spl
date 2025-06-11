[← Home](../README.md)

# Implementing New APIs in SPlectrum

This document provides a comprehensive guide for implementing new API modules in the SPlectrum platform, using the `tools/7zip` API implementation as a practical example. This guide covers the complete development workflow from initial design through testing and integration.

## Overview

SPlectrum APIs follow a consistent modular pattern that enables seamless integration with the execution engine, command parsing system, and error handling framework. Each API consists of multiple methods that operate on shared data structures and provide cohesive functionality around a specific domain (e.g., git operations, archive management, data processing).

## API Architecture Patterns

### 1. **Module Structure**
Every API follows a standardized directory and file structure:

```
modules/{category}/{api_name}/
├── {api_name}.js                    # Core auxiliary library
├── index.js                         # Main API entry point
├── {api_name}_arguments.json        # Main API arguments schema
├── {method}.js                      # Individual method implementations
├── {method}_arguments.json          # Method-specific arguments
└── ...                              # Additional methods
```

### 2. **Naming Conventions**
- **API URI**: `{category}/{api_name}` (e.g., `tools/7zip`)
- **Method URI**: `{category}/{api_name}/{method}` (e.g., `tools/7zip/add`)
- **Function names**: `{category}_{api_name}_{method}` (e.g., `tools_7zip_add`)
- **File names**: Use hyphens for multi-word methods (e.g., `extract-flat.js`)

### 3. **Core Components**

#### Auxiliary Library (`{api_name}.js`)
Contains shared functionality used across all methods:

```javascript
//  name        API Name Auxiliary Functions
//  URI         {category}/{api_name}/{api_name}
//  type        Auxiliary Library
//  description Core functionality for the API
///////////////////////////////////////////////////////////////////////////////

// Core execution function
exports.executeCommand = function(input, spl, args, workingPath) {
    // Common command execution logic
    // Error handling and return code processing
    // Integration with SPL error handling system
}

// Path/resource resolution
exports.getResourcePath = function(resource, appRoot, cwd) {
    // Handle relative and absolute paths
    // Cross-platform compatibility
}

// Common argument processing
exports.buildCommonArgs = function(input, spl) {
    // Extract common parameters from spl.action() calls
    // Build command-line arguments
}
```

#### Main Entry Point (`index.js`)
Provides context management and default behavior:

```javascript
//  name        The API Name Package
//  URI         {category}/{api_name}
//  type        Module Package
//  description High-level description of API functionality
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl/spl.js")
const apiLib = require("./{api_name}.js")
///////////////////////////////////////////////////////////////////////////////

exports.default = function {category}_{api_name}(input) {
    // Context setup and parameter extraction
    // Default behavior or context validation
    // Common initialization tasks
    
    spl.completed(input);
}
```

#### Method Implementation Pattern
Each method follows a consistent structure:

```javascript
//  name        Method Description
//  URI         {category}/{api_name}/{method}
//  type        API Method
//  description Detailed method functionality description
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl/spl.js")
const apiLib = require("./{api_name}.js")
///////////////////////////////////////////////////////////////////////////////

exports.default = function {category}_{api_name}_{method}(input) {
    // 1. Parameter extraction using spl.action()
    const param1 = spl.action(input, 'param1');
    const param2 = spl.action(input, 'param2');
    
    // 2. Context and path resolution
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    
    // 3. Build command arguments
    const args = ['command'];
    if (param1) args.push(`--param1=${param1}`);
    
    // 4. Execute operation
    const output = apiLib.executeCommand(input, spl, args, cwd);
    
    // 5. Process and display results
    console.log('Operation Results:');
    console.log('=================');
    console.log(output);
    
    // 6. Mark completion
    spl.completed(input);
}
```

## Implementation Walkthrough: tools/7zip Example

### 1. **Design Phase**
Before implementation, define:
- **API scope**: Archive management operations
- **Target domain**: 7zip command-line tool wrapper
- **Methods needed**: add, extract, list, test, update, delete
- **Common functionality**: Path resolution, command execution, error handling

### 2. **Directory Structure Creation**
```bash
mkdir -p modules/tools/7zip
```

### 3. **Core Auxiliary Library** (`7zip.js`)
```javascript
const { execSync } = require('child_process');

exports.execute7zip = function(input, spl, args, workingPath) {
    const executable = process.platform === 'win32' ? '7z.exe' : '7z';
    const command = `${executable} ${args.join(' ')}`;
    
    try {
        const output = execSync(command, {
            cwd: workingPath,
            encoding: 'utf8'
        });
        return output;
    } catch (error) {
        spl.throwError(input, `7zip command failed: ${error.message}`);
    }
};

exports.getArchivePath = function(archive, appRoot, cwd) {
    const path = require('path');
    if (path.isAbsolute(archive)) {
        return archive;
    }
    return path.resolve(cwd, appRoot, 'data', archive);
};
```

### 4. **Arguments Schema** (`7zip_arguments.json`)
```json
{
    "headers": {
        "header": [
            { "header": "tools/7zip" },
            { "content": "7zip archive management operations." },
            { "content": "{bold syntax}: {italic ./spl tools/7zip <options>}" }
        ]
    },
    "value": [
        { "name": "help", "alias": "h", "type": "Boolean", "description": "show help information", "typeLabel": "flag" },
        { "name": "archive", "alias": "a", "type": "String", "description": "default archive file path" },
        { "name": "working", "alias": "w", "type": "String", "description": "working directory" }
    ]
}
```

### 5. **Method Implementation** (`add.js`)
```javascript
exports.default = function tools_7zip_add(input) {
    const archive = spl.action(input, 'archive');
    const files = spl.action(input, 'files');
    const compression = spl.action(input, 'compression');
    
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    const archivePath = zip.getArchivePath(archive, appRoot, cwd);
    
    const args = ['a'];
    if (compression) args.push(`-mx${compression}`);
    args.push(archivePath, files);
    
    const output = zip.execute7zip(input, spl, args, cwd);
    
    console.log('Archive created successfully');
    console.log(output);
    
    spl.completed(input);
}
```

## Development Workflow

### 1. **Planning Phase**
- Define API scope and purpose
- Identify target tools/systems to wrap
- List required methods and their functionality
- Design common data structures and workflows
- Review existing similar APIs for patterns

### 2. **Scaffolding Phase**
- Create directory structure
- Generate skeleton files for all methods
- Define argument schemas
- Set up basic file headers and exports
- Create placeholder implementations

### 3. **Core Implementation**
- Implement auxiliary library functions
- Build common argument processing
- Add error handling and validation
- Implement path/resource resolution
- Create command execution framework

### 4. **Method Implementation**
- Implement methods in priority order
- Test each method individually
- Validate argument parsing
- Ensure proper error handling
- Add comprehensive logging

### 5. **Integration Testing**
- Test with SPL execution system
- Validate help system integration
- Test cross-platform compatibility
- Verify error propagation
- Test in different app contexts

## Best Practices

### 1. **Error Handling**
- Use `spl.throwError(input, message)` for fatal errors
- Validate required parameters early
- Provide helpful error messages
- Handle external tool failures gracefully

### 2. **Parameter Processing**
- Use `spl.action(input, 'param')` for method parameters
- Use `spl.context(input, 'property')` for execution context
- Validate required parameters before processing
- Provide sensible defaults

### 3. **Path Handling**
- Support both relative and absolute paths
- Use `path.resolve()` for cross-platform compatibility
- Resolve paths relative to app context when appropriate
- Handle special paths (home directory, etc.)

### 4. **Command Execution**
- Use `execSync` for synchronous operations
- Capture both stdout and stderr
- Handle command failures appropriately
- Set proper working directories

### 5. **Console Output**
- Provide clear operation feedback
- Use consistent formatting
- Show progress for long operations
- Include relevant details in output

## Testing Strategy

### 1. **Unit Testing**
Test individual methods in isolation:
```bash
./spl_execute test-app tools/7zip/add --archive test.7z --files ./data
./spl_execute test-app tools/7zip/list --archive test.7z
./spl_execute test-app tools/7zip/extract --archive test.7z --output ./extracted
```

### 2. **Integration Testing**
Test API integration with SPL system:
```bash
# Test help system
./spl_execute test-app tools/7zip --help
./spl_execute test-app tools/7zip/add --help

# Test error handling
./spl_execute test-app tools/7zip/add --archive missing.7z

# Test with different apps
./spl_execute watcher tools/7zip/list --archive ../data/backup.7z
```

## Common Pitfalls

### 1. **Argument Conflicts**
- Avoid parameter name collisions with SPL system arguments
- Use descriptive aliases that don't conflict
- Test argument parsing with complex scenarios

### 2. **Path Resolution Issues**
- Don't assume specific filesystem structures
- Handle spaces and special characters in paths
- Test with relative and absolute paths

### 3. **Error Propagation**
- Ensure errors from external tools are properly captured
- Provide context about what operation failed
- Don't suppress important error details

## Related Documentation

- [Execute API Properties](execute-api-properties.md) - Execution context and flow
- [7zip API Methods](7zip-api-methods.md) - Complete 7zip implementation example
- [Git API Methods](git-api-methods.md) - Reference implementation pattern
- [How To Guide](how-to.md) - Basic SPL usage and command execution

---

[← Home](../README.md)