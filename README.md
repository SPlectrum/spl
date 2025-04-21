# spl

This module implements the platform within which a SPlectrum install runs.  
Functionality is installed as modules on the platform and this module contributes the *spl* module
which contains the core functionality needed for the platform to be able to run.

It is primed with the end result of *hello-splectrum*.

User notes are available in the readMe.md file of the spl folder (the root of the self-extracting package).

## Main Areas of Work

 The initial implementation of the platform is on top of a file system.  

 - Platform overall structure
 - Runtime structure
 - client specification and implementation (e.g terminals)
 - Process specification: boot, system, user sessions
 - Platform data layer ( AVRO integration, dynamic indexes )
 - Implement *boot* process
 - Implement *system* process
 - Implement *session* process
 - Implement install/uninstall and backup functionality
 - Create releases as self-extracting zips



## Miscellaneous

### Creating a Release

To create an install package that can be zipped up, run the following command from the root of the repository:
```
node createInstall
```

This will copy the files in the relase folder and the repository modules folder to the release  

To create the selfextracting package from the git repository run the command below in the root:

(linux) 7z a -sfx spl.exe ./spl
(windows)"C:\Program Files\7-Zip\7z.exe" a -sfx spl.exe ./spl
