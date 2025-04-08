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



