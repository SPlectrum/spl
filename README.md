# spl

The modules implemented in this repository make up the minimum core functionality of the SPlectrum platform.  
The core functionality consists of the execution layer, the data layer and package management,
but also minimal implementations of the command pipeline and client management and probably other component not yet in scope.  

The emphasis is on minimal viable implementation. more advanced implementation will be installed as additional module packages.  
A SPlectum install will always begin with the install of this core package.

Each release comes with notes about the functionality that has been added or improved.  
The aim is to come to a MVP for application development by version 1.0  
It will already be possible to add applications to earlier versions, but tooling may still be lacking at that stage.

User notes are available in the readMe.md file of the spl folder (the root of the self-extracting package).

## Main Areas of Work

 - Create releases as self-extracting zips and install routines
 - Platform overall structure - functional modules and data covering both runtime and application data
 - client specification and implementation (e.g terminals) - a client is an application
 - Process specification and implementation: boot, system, user sessions - data backup and housekeeping
 - Platform data layer ( filesystem, AVRO integration, dynamic indexes )

## SPlectrum Philosophy

This project is at the proof of concept phase, which means that there remains a lot of fluidity in the design and implementation flow.  
However, it already has chosen a lot of paradigms, a more complete wish list of which can be found in the SRS documentation repository.  

The Platform aims to be self-documenting but in the early stages documentation will be added separately to the repository.

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
