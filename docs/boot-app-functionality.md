[← Home](../README.md)

# Boot App Functionality Overview

## Introduction

The Boot App implements a number of actions to deal with the boot app update, the release folder update and the deployment of an install.
The functionality is in folder `/release/install/boot/modules/usr/`.

## Functionality

### Boot app Update

#### [`modules_to_boot.js`](../release/install/boot/modules/usr/modules_to_boot.js)
- **URI**: `usr/modules_to_boot`
- **Purpose**: Updates the spl package within the modules folder of the boot app with the version in the spl/modules folder.

### Release Update

#### [`boot_to_release.js`](../release/install/boot/modules/usr/boot_to_release.js)
- **URI**: `usr/boot_to_release`
- **Purpose**: Updates the boot app code in the release folder.

#### [`apps_to_release.js`](../release/install/boot/modules/usr/apps_to_release.js)
- **URI**: `usr/apps_to_release`
- **Purpose**: Updates the apps packages in the release folder with the current state in spl/apps.

### Release Deploy

#### [`release_to_install.js`](../release/install/boot/modules/usr/release_to_install.js)
- **URI**: `usr/release_to_install`
- **Purpose**: Deploys the release and modules folder to the spl/install folder. (Done prior to created the zip file.)

### Deployment Operations

Execute the first three in the listed order to unpack and deploy an install.

#### [`deploy_install.js`](../release/install/boot/modules/usr/deploy_install.js)
- **URI**: `usr/deploy_install`
- **Purpose**: Handles installation deployment operations

#### [`deploy_modules.js`](../release/install/boot/modules/usr/deploy_modules.js)
- **URI**: `usr/deploy_modules`
- **Purpose**: Manages module deployment operations

#### [`deploy_apps.js`](../release/install/boot/modules/usr/deploy_apps.js)
- **URI**: `usr/deploy_apps`
- **Purpose**: Deploys multiple application packages to the apps directory
- **Supported Applications**:
  - Boot application (`apps_boot.json`)
  - Git application (`apps_git.json`)
  - Test suite application (`apps_test-suite.json`)
- **Process**: Loads each package from the install/packages directory and deploys it to the apps directory

Additional commands:

#### [`deploy_watcher.js`](../release/install/boot/modules/usr/deploy_watcher.js)
- **URI**: `usr/deploy_watcher`
- **Purpose**: Deploy the watcher app.

#### [`remove_install.js`](../release/install/boot/modules/usr/remove_install.js)
- **URI**: `usr/remove_install`
- **Purpose**: Remove the deployed install (all folders except for install folder).
