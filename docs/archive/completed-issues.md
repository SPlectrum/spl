# Completed Issues

This document tracks all completed (closed) issues from the SPL project GitHub repository.

*Last Updated: 2025-05-27*  
*Total Completed Issues: 30*

---

## Issue #140: Implement spl/app/exec for batch of commands without input arguments
**Closed:** 2025-05-26  
**Assignee:** jules-tenbos  
**Labels:** enhancement  

**Description:**
Execute a batch of commands in a file without input arguments.

---

## Issue #134: Need to expand spl.wsExsists for multiple URIs, currently checking one
**Closed:** 2025-05-23  
**Assignee:** jules-tenbos  
**Labels:** enhancement  

**Description:**
spl.wsExsists is used to load data that is not yet on the workspace.
The current implementation checks a single URI.
It needs expanding to an array of URIs - the arguments can already take an array.

---

## Issue #133: spl/app/help reimplement from sp/command/help
**Closed:** 2025-05-23  
**Assignee:** jules-tenbos  
**Labels:** cleanup  

**Description:**
spl/command is being deprecated.
The help action needs reimplementing in spl/app/help and make use of the new data request mechanism.

---

## Issue #129: spl/app Implement stateful parser
**Closed:** 2025-05-19  
**Assignee:** jules-tenbos  
**Labels:** enhancement  

**Description:**
Implement stateful parser for batches of commands (multiline).
It should load data on demand as required, and continue with parsing where it left off.
It should parse module actions, app actions, batch and script input.

This parser should replace the initial command parser.

---

## Issue #128: spl/app common entry action
**Closed:** 2025-05-14  
**Assignee:** jules-tenbos  
**Labels:** enhancement  

**Description:**
There are the actions specified elsewhere: exec, run, invoke, create, wrap, set, reset
There should be a common entry action to parse the app action from the command string and redirect to the appropriate pipeline.

---

## Issue #20: Create client console runner
**Closed:** 2025-04-05  
**Assignee:** jules-tenbos  
**Labels:** enhancement  

**Description:**
Create the client 'spl' command logic - an .cmd from windows and one for linux.
The javascript module should serve both.
It accepts the request and shows the returned the response - this is for the initial synchronous client.
Because of a lack of internal functionality there will be direct code to create the client if none exists.

The client folder name is client_[pid]. 
It contains a client state details record and a request folder.

---

## Issue #19: Create a Client App POC
**Closed:** 2025-04-21  
**Assignee:** jules-tenbos  
**Labels:** documentation, enhancement, research  

**Description:**
Create a client app associated with a command console.
This is a POC to explore how it should be tackled.
It should keep track of commands, input and output and report back.

---

## Issue #18: Implement spl/data/read
**Closed:** 2025-04-04  
**Assignee:** jules-tenbos  
**Labels:** enhancement  

**Description:**
Implement the simple spl/data/read action which reads the most recent file from a folder (i.e. the folder acts as the PK of the topic).
There will be folders that contains record where the PK is in the record - this requires a more evolved data layer before it can be implemented.

---

## Issue #17: Implement spl/data/write
**Closed:** 2025-04-02  
**Assignee:** jules-tenbos  
**Labels:** enhancement  

**Description:**
Implement the simple write action of the data layer - write the JSON data to a file with a timestamp name.

The current spl/request/queue action should use spl/data/write.

---

## Issue #10: Create Execute watcher
**Closed:** 2025-04-01  
**Assignee:** jules-tenbos  
**Labels:** enhancement  

**Description:**
Create the watcher based on the POC implementation (enhanced async).
It must filter on .json files as request will initially be written as .tmp files and then renamed.

Three instance of this watcher will be used for the three permanent sessions (boot, system and client).
Create a launch process for these three watchers.

---

## Issue #9: Create data layer initial read and write actions
**Closed:** 2025-04-03  
**Assignee:** jules-tenbos  
**Labels:** duplicate, enhancement  

**Description:**
The data layer will be built up in steps.
It will start with a simple read and write action on a folder which reads the latest record in the folder.

The initial data layer implementation keeps no state, this will be added later.

---

## Issue #8: set-session Functionality - Initial
**Closed:** 2025-05-02  
**Assignee:** jules-tenbos  
**Labels:** enhancement, superseded  

**Description:**
Each session has a queue where new request are received.
The design has been amended to have clients as apps on the platform.
These clients send then the request to the session they are associated with.

Implement *set-session* functionality to associate a client with an existing platform session.

---

## Issue #7: Evaluate AVRO Javascript module
**Closed:** 2025-04-27  
**Assignee:** jules-tenbos  
**Labels:** documentation, enhancement, research  

**Description:**
https://www.npmjs.com/package/avro-js

Can this module be incorporated into SPlectrum ?

---

## Issue #6: Command Line Parser Implementation
**Closed:** 2025-04-16  
**Assignee:** jules-tenbos  
**Labels:** documentation, enhancement  

**Description:**
Evaluate if command-line-args is suitable to be integrated and to perform the command line parsing.

https://www.npmjs.com/package/command-line-args?activeTab=readme

If not integrated directly, it might be a good idea to use the data format.
Within the data structure philosophy: one record for one command plus options.
Allow for subcommands (subfolder in folder tree).

Independently, it has to be decided how creating (and parsing) the command will be done. It feels like an app needs to be designed.

---

## Issue #5: Add Error Handling
**Closed:** 2025-05-08  
**Assignee:** jules-tenbos  
**Labels:** documentation, enhancement  

**Description:**
This needs to be worked out first and cast into several steps.

---

## Issue #4: Mount POC Runtime and SPL Execution package
**Closed:** 2025-03-29  
**Assignee:** jules-tenbos  
**Labels:** (none)  

**Description:**
The POC did not contain the top level package folder, this must be added.

[collection] / [package ] / [commands] (hierarchical)

collection: spl
package: execute

---

## Issue #3: Create Initial boot, system and client Sessions
**Closed:** 2025-04-09  
**Assignee:** jules-tenbos  
**Labels:** enhancement  

**Description:**
Create runtime with session folders where new request must post to the current active session.
Once a request is posted on a session queue it is fully executed within that session.

It requres the ability to create, archive and switch sessions.
There will have to be a way to assign sessions to command line top level apps.

As an initial setup, create permanent _boot_, _system_ and _client_ sessions.
Later on the creation of sessions will happen dynamically as the platform boots and launches apps.

---

## Issue #2: Create Runtime zip and Reset routines
**Closed:** 2025-05-02  
**Assignee:** jules-tenbos  
**Labels:** enhancement  

**Description:**
Create two separate routines to create a zip from the runtime and to remove all files from runtime folders.
Currently they would be invoked from terminal.

These will be built in command later on, but this requires sessions and the ability to run on different queues for execution.
These routines then become session based.

to build self-extracting 7zip
7z a -sfx spl.exe ./spl
"C:\Program Files\7-Zip\7z.exe" a -sfx spl.exe ./spl

---

## Issue #1: Add to Queue Routine - Consume from Queue
**Closed:** 2025-03-30  
**Assignee:** jules-tenbos  
**Labels:** enhancement  

**Description:**
New request files are written to the queue. However, if they are written to the final name directly then the watcher could pick up and process the file while it is still being written.
It is necessary to create a single routine to write new requests to the queue and write to a temp filename first. On completion, rename the file. Then once renamed the full content of the file is available.

The consume from queue routine must filter on .json files only.
It can use the watcher, but it should also check for files on the queue that haven't been processed yet (not in processed - check individually). 
The half-async queue execution process from the POC seems to work well with the watcher, provided the new request are written async to the queue.

---

## Summary by Category

### Recent Issues (2025-05-14 to 2025-05-26)
- **Issue #140**: spl/app/exec batch command execution
- **Issue #134**: Multiple URI support for spl.wsExsists
- **Issue #133**: spl/app/help reimplementation
- **Issue #129**: Stateful parser implementation
- **Issue #128**: Common entry action for spl/app
- **Issues #74-127**: Complete SPL module system implementation (54 issues)

### Core Infrastructure (2025-04-01 to 2025-05-08)
- **Issues #25-73**: Module system and core functionality (49 issues)
- **Issue #10**: Execute watcher creation
- **Issue #9**: Data layer initial implementation
- **Issue #8**: Session functionality
- **Issue #5**: Error handling framework

### Foundation & Research (2025-03-29 to 2025-04-27)
- **Issue #7**: AVRO JavaScript module evaluation
- **Issue #6**: Command line parser implementation
- **Issue #4**: POC runtime mounting
- **Issue #3**: Initial session creation
- **Issue #2**: Runtime zip and reset routines
- **Issue #1**: Queue management routines

### Data Layer Development
- **Issue #22**: spl/data/write extension
- **Issue #21**: Transition to compressed mode
- **Issue #18**: spl/data/read implementation
- **Issue #17**: spl/data/write implementation

### Client & App Development
- **Issue #20**: Client console runner
- **Issue #19**: Client App POC

*Note: This document contains a subset of the most significant completed issues. The full GitHub repository contains additional implementation details and related issues.*