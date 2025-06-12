[← Home](../README.md)

# Creating Install Directories

## Create Install from Release

```bash
# From boot app directory
./spl usr/release_to_install -a <install-directory-name>

# Examples
./spl usr/release_to_install -a install
./spl usr/release_to_install -a spl-production
```

## What Gets Created

- `<install-dir>/apps/` - Applications from release
- `<install-dir>/install/` - Core SPlectrum modules
- `<install-dir>/data/`, `runtime/` - Application data directories

## Usage

```bash
# Using spl_execute (if available)
./spl_execute <install-dir> <app> <command>

# Direct execution
cd <install-dir>/apps/<app>
./spl <command>
```

## Notes

- Install directories use `spl-*` naming pattern (git-ignored)
- Creates executable deployment from release packages
- Overwrites existing install if directory exists
- Use temporary names for testing (e.g., `spl-test-install`)

**Repository Context**: These instructions apply to creating installs within this development repository. Once zipped release packages are available, separate instructions will be needed for creating installs from distributed packages.

---

[← Home](../README.md)