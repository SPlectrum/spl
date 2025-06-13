# Future Development Roadmap

## spl/app API Redesign/Split

**Current Issue**: The spl/app API is not well designed and needs architectural refactoring.

**Problems Identified**:
- Mixed responsibilities between script execution and batch processing
- Inconsistent command patterns and naming
- Complex pipeline structure that could be simplified
- Unclear separation of concerns

**Proposed Improvements**:
- Split into distinct APIs: `spl/script` for script execution, `spl/batch` for command sequences
- Standardize command patterns across script types
- Simplify pipeline architecture
- Clear separation between execution contexts

**Priority**: Medium - Should be addressed after multi-language script support is implemented

**Dependencies**: Complete multi-language extension first to understand full requirements

## Multi-Language Script Support

**Current State**: JavaScript baseline established with comprehensive testing framework

**Next Steps**:
- Extend `spl/app/run` and `spl/app/wrap` for file extension detection
- Add bash script support (`.sh` files)
- Add Python script support (`.py` files)  
- Maintain JavaScript as default script type
- Ensure all existing tests pass with new functionality

**Status**: Ready for implementation - solid foundation in place

## Standardized Path Resolution

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

**Implementation Steps**:
1. Add `spl.resolvePath(input, path, scope = 'app-data')` utility
2. Migrate tools/git and tools/7zip to use standard utility
3. Remove custom path resolution from auxiliary libraries
4. Update core SPL APIs to use app-data scope by default
5. Update documentation and testing patterns

## System Prerequisites Management

**Current Issue**: SPL APIs depend on external tools but lack prerequisite validation.

**Tools API Dependencies Discovered**:
- **tools/7zip**: Requires `7z` executable (p7zip-full package on Ubuntu/Debian)
- **tools/git**: Requires `git` executable
- **Future tools**: Will have similar external dependencies

**Proposed Solution**: Implement prerequisite checking system with helpful installation instructions in error messages.