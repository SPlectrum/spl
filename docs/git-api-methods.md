# Git API Wrapper - Methods Implementation Guide

[← Back to Documentation Home](README.md)

This document outlines all the methods that should be implemented for the SPL Git API wrapper, based on the existing implementation pattern and design specifications.

## Overview

The SPL Git API provides a comprehensive wrapper around git commands, following the established SPL module pattern. Each method executes git commands through the auxiliary [`git.js`](../modules/tools/git/git.js) library and integrates seamlessly with the SPL platform's execution and error handling systems.

## Core Git API Methods

### 1. Repository Context Management
- **URI**: `tools/git`
- **Function**: `tools_git(input)`
- **Purpose**: Set repository path context for all subsequent git operations
- **Arguments**:
  - `path` (String, optional): Repository path (defaults to current working directory)
  - `create` (Boolean, optional): Create directory if it doesn't exist
  - `help` (Boolean, alias: `h`): Show help information

### 2. Initialize Repository
- **URI**: `tools/git/init`
- **Function**: `tools_git_init(input)`
- **Purpose**: Initialize a new git repository
- **Arguments**:
  - `repo` (String, alias: `r`): Repository path
  - `bare` (Boolean): Create bare repository
  - `template` (String): Template directory path
  - `help` (Boolean, alias: `h`): Show help information

### 3. Clone Repository
- **URI**: `tools/git/clone`
- **Function**: `tools_git_clone(input)`
- **Purpose**: Clone a remote repository
- **Arguments**:
  - `url` (String, required): Repository URL to clone
  - `directory` (String, alias: `d`): Target directory name
  - `branch` (String, alias: `b`): Specific branch to clone
  - `depth` (Number): Shallow clone depth
  - `repo` (String, alias: `r`): Repository path
  - `help` (Boolean, alias: `h`): Show help information

### 4. Stage Files (Add)
- **URI**: `tools/git/add`
- **Function**: `tools_git_add(input)`
- **Purpose**: Add files to staging area
- **Arguments**:
  - `files` (String, required): Files to add (supports patterns like ".", "*.js")
  - `all` (Boolean, alias: `A`): Add all modified files
  - `force` (Boolean, alias: `f`): Force add ignored files
  - `repo` (String, alias: `r`): Repository path
  - `help` (Boolean, alias: `h`): Show help information

### 5. Commit Changes
- **URI**: `tools/git/commit`
- **Function**: `tools_git_commit(input)`
- **Purpose**: Commit staged changes
- **Arguments**:
  - `message` (String, alias: `m`, required): Commit message
  - `all` (Boolean, alias: `a`): Commit all modified files
  - `amend` (Boolean): Amend previous commit
  - `repo` (String, alias: `r`): Repository path
  - `help` (Boolean, alias: `h`): Show help information

### 6. Push Changes
- **URI**: `tools/git/push`
- **Function**: `tools_git_push(input)`
- **Purpose**: Push commits to remote repository
- **Arguments**:
  - `remote` (String): Remote name (defaults to "origin")
  - `branch` (String, alias: `b`): Branch name (defaults to current branch)
  - `force` (Boolean, alias: `f`): Force push
  - `tags` (Boolean, alias: `t`): Push tags
  - `repo` (String, alias: `r`): Repository path
  - `help` (Boolean, alias: `h`): Show help information

### 7. Pull Changes
- **URI**: `tools/git/pull`
- **Function**: `tools_git_pull(input)`
- **Purpose**: Pull changes from remote repository
- **Arguments**:
  - `remote` (String): Remote name (defaults to "origin")
  - `branch` (String, alias: `b`): Branch name (defaults to current branch)
  - `rebase` (Boolean): Use rebase instead of merge
  - `repo` (String, alias: `r`): Repository path
  - `help` (Boolean, alias: `h`): Show help information

### 8. Repository Status ✅ (Already Implemented)
- **URI**: `tools/git/status`
- **Function**: `tools_git_status(input)`
- **Purpose**: Get current repository status
- **Arguments**:
  - `repo` (String, alias: `r`): Repository path
  - `porcelain` (Boolean, alias: `p`): Machine-readable output
  - `short` (Boolean, alias: `s`): Short format output
  - `help` (Boolean, alias: `h`): Show help information
- **Files**: [`status.js`](../modules/tools/git/status.js), [`status_arguments.json`](../modules/tools/git/status_arguments.json)

### 9. Commit History
- **URI**: `tools/git/log`
- **Function**: `tools_git_log(input)`
- **Purpose**: Get commit history
- **Arguments**:
  - `count` (Number, alias: `n`): Number of commits to show
  - `oneline` (Boolean): One line per commit
  - `graph` (Boolean): Show commit graph
  - `since` (String): Show commits since date
  - `until` (String): Show commits until date
  - `repo` (String, alias: `r`): Repository path
  - `help` (Boolean, alias: `h`): Show help information

## Extended Git API Methods

### 10. Branch Management
- **URI**: `tools/git/branch`
- **Function**: `tools_git_branch(input)`
- **Purpose**: Create, delete, or list branches
- **Arguments**:
  - `name` (String): Branch name to create
  - `delete` (String, alias: `d`): Branch name to delete
  - `list` (Boolean, alias: `l`): List all branches
  - `remote` (Boolean, alias: `r`): Include remote branches
  - `repo` (String, alias: `r`): Repository path
  - `help` (Boolean, alias: `h`): Show help information

### 11. Checkout
- **URI**: `tools/git/checkout`
- **Function**: `tools_git_checkout(input)`
- **Purpose**: Switch branches or restore files
- **Arguments**:
  - `branch` (String, alias: `b`): Branch name to checkout
  - `create` (Boolean, alias: `c`): Create new branch
  - `files` (String): Specific files to checkout
  - `repo` (String, alias: `r`): Repository path
  - `help` (Boolean, alias: `h`): Show help information

### 12. Remote Management
- **URI**: `tools/git/remote`
- **Function**: `tools_git_remote(input)`
- **Purpose**: Manage remote repositories
- **Arguments**:
  - `add` (String): Add remote with name
  - `url` (String): Remote URL
  - `remove` (String): Remove remote by name
  - `list` (Boolean, alias: `l`): List all remotes
  - `verbose` (Boolean, alias: `v`): Verbose output
  - `repo` (String, alias: `r`): Repository path
  - `help` (Boolean, alias: `h`): Show help information

### 13. Diff
- **URI**: `tools/git/diff`
- **Function**: `tools_git_diff(input)`
- **Purpose**: Show changes between commits, commit and working tree, etc.
- **Arguments**:
  - `staged` (Boolean): Show staged changes
  - `files` (String): Specific files to diff
  - `commit` (String): Compare with specific commit
  - `repo` (String, alias: `r`): Repository path
  - `help` (Boolean, alias: `h`): Show help information

### 14. Reset
- **URI**: `tools/git/reset`
- **Function**: `tools_git_reset(input)`
- **Purpose**: Reset current HEAD to the specified state
- **Arguments**:
  - `mode` (String): Reset mode (soft, mixed, hard)
  - `commit` (String): Target commit
  - `files` (String): Specific files to reset
  - `repo` (String, alias: `r`): Repository path
  - `help` (Boolean, alias: `h`): Show help information

### 15. Stash
- **URI**: `tools/git/stash`
- **Function**: `tools_git_stash(input)`
- **Purpose**: Stash changes in a dirty working directory
- **Arguments**:
  - `save` (String): Save stash with message
  - `pop` (Boolean): Pop latest stash
  - `list` (Boolean, alias: `l`): List all stashes
  - `apply` (String): Apply specific stash
  - `drop` (String): Drop specific stash
  - `repo` (String, alias: `r`): Repository path
  - `help` (Boolean, alias: `h`): Show help information

## Implementation Pattern

Each method follows the established SPL pattern demonstrated in the existing [`status.js`](../modules/tools/git/status.js) implementation:

```javascript
exports.default = function tools_git_methodname(input) {
    // 1. Parameter extraction using spl.action()
    const repo = spl.action(input, 'repo');
    const param = spl.action(input, 'paramName');
    
    // 2. Repository path resolution
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    const repoPath = git.getAppRelativeRepoPath(repo, appRoot, cwd);
    
    // 3. Command argument building
    const args = ['git-command'];
    if (param) {
        args.push('--param');
    }
    
    // 4. Git command execution
    const output = git.executeGit(input, spl, args, repoPath);
    
    // 5. Output processing and console logging
    console.log('Git Command Output:');
    console.log('==================');
    console.log(output);
    
    // 6. Completion
    spl.completed(input);
}
```

## File Structure Requirements

Each method requires two files in the [`modules/tools/git/`](../modules/tools/git/) directory:

1. **Implementation file**: `{method}.js`
   - Contains the method implementation following the pattern above
   - Exports a `default` function with the naming convention `tools_git_{method}`

2. **Arguments schema file**: `{method}_arguments.json`
   - Defines the command-line arguments and help information
   - Follows the JSON schema pattern established in [`status_arguments.json`](../modules/tools/git/status_arguments.json)

## Existing Infrastructure

The implementation leverages the existing auxiliary functions in [`git.js`](../modules/tools/git/git.js):

- **`executeGit(input, spl, args, repoPath)`**: Core git command execution
- **`getAppRelativeRepoPath(repo, appRoot, cwd)`**: Repository path resolution

## Usage Examples

```bash
# Initialize a new repository
./spl tools/git/init --repo my-project

# Clone a repository
./spl tools/git/clone --url https://github.com/user/repo.git --repo my-clone

# Basic workflow
./spl tools/git/add --files "." --repo my-project
./spl tools/git/commit --message "Initial commit" --repo my-project
./spl tools/git/push --repo my-project

# Check status and history
./spl tools/git/status --porcelain --repo my-project
./spl tools/git/log --count 10 --oneline --repo my-project
```

## Related Documentation

- [SPL Git API Design](spl-git-api-design.md) - Comprehensive design specification
- [How To Guide](how-to.md) - General SPL usage instructions
- [Main Areas of Work](main-areas-of-work.md) - Project overview

---

[← Back to Documentation Home](README.md)