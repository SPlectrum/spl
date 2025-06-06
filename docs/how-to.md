[Home](../README.md)
# How To for SPlectrum

## Execute a Command within the context of an app

Execute the command in a terminal in the spl folder of the repository (e.g. command spl/console/log hello world in the test-suite app):
(close the terminal window after command execution)
```
./apps/test-suite/spl spl/console/log hello world
```
Use the global debug flag -d for detailed execution information.
```
./apps/test-suite/spl -d spl/console/log hello world
``` 

## Where to find the command code

Core commands that are available to all apps are found in the modules folder of the repo.
App specific commands are to be found in the modules folder of the app, they carry the usr prefix.

## How to deal with errors

Do not put in any error handling, the errors are caught at the execution pipeline level.