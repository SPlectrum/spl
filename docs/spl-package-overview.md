[Home](../README.md)
# SPL Package Overview

The spl package module provides the (minimum) core functionality to have an operational SPlectrum node.  
The implementations are minimal, and these can be extended by installing modules with more extensive implementations.  

The module structure that is aimed for is as follows:
 - Actions are organised around a specific data structure such that all methods of an API operate on the same data structure - single concern.
 - A module package contains a set of Module APIs that serve a specific purpose. In case of the __spl__ package the API modules implement the main paradigms of SPlectrum.

The overview is structured along the milestones.

## v0.2 - First App

The aim is to have some simple install routine, the ability to execute a request pipeline and read / write data records, and to be able to parse a command.

### spl/execute
The __execute API__ manages the execution flow of the request pipeline.  
It also provides a request access to the data layer and error handling, both of which are not directly accessed by the request.  
There are also methods to notify the execution context of a new request or a new request pipeline.

### spl/data

The __data API__ manages access to the data layer. The core implementation of the data layer is quite simple and would not scale for large data use cases.  
There are methods to read / write the latest record (for a specific key) - the kafka record read / write API.  
The put and delete methods are the more conventional file write and read methods.  

### spl/package

The __package API__ is a standalone module package to manage the install of module and data packages.  

### spl/command

The __command API__ implements the parsing and execution of commandline commands.  

## v0.3 - AVRO

The third milestone is all about introducing schemas and implementing the manipulation of specific data record types.  
AVRO is being used for the schema and it is also used for data storage. 
The current idea is to leave the compact part of a topic in JSON files and write the historical data records into AVRO containers.

### spl/record

The __record API__ brings together all the methods operating on a data record.

### spl/schema

The __schema API__ implements schema management and the schema registry. 

### spl/avro

The __avro API__ deals with AVRO containers, both files or in memory.

### spl/blob

The __blob API__ manages to the blob data layer.