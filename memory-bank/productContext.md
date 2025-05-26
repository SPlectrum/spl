# Product Context

This file provides a high-level overview of the SPL project and the expected product that will be created. Based on the project documentation and structure analysis.

2025-05-26 20:45:00 - Initial Memory Bank creation for SPL project analysis.

## Project Goal

SPL (SPlectrum) is the minimum core functionality package for the SPlectrum platform. It provides:
- Execution layer for request pipeline processing
- Data layer for record management and storage
- Package management system
- Command pipeline implementation
- Client management capabilities

The emphasis is on minimal viable implementation, with more advanced features to be installed as additional module packages. Every SPlectrum installation begins with this core package.

## Key Features

### Core APIs (v0.2 - First App)
- **spl/execute**: Manages execution flow of request pipelines, data layer access, and error handling
- **spl/data**: Manages data layer access with kafka-style record read/write and conventional file operations
- **spl/package**: Standalone module for managing installation of module and data packages
- **spl/command**: Implements parsing and execution of command-line commands

### Extended APIs (v0.3 - AVRO)
- **spl/record**: Methods for operating on data records
- **spl/schema**: Schema management and schema registry
- **spl/avro**: AVRO container handling (files and in-memory)
- **spl/blob**: Blob data layer management

### Additional Components
- **spl/app**: Application-level functionality
- **spl/console**: Console output and logging
- **spl/error**: Error handling and catching
- **spl/void**: Utility functions

## Overall Architecture

The SPL package follows a modular architecture where:
- Actions are organized around specific data structures (single concern principle)
- Each module package contains APIs serving specific purposes
- Module structure supports the main SPlectrum paradigms
- Minimal implementations can be extended through additional module packages
- AVRO schemas are used for data storage and manipulation
- JSON files handle compact topic data, AVRO containers store historical records

Target: MVP for application development by version 1.0, with earlier versions supporting application addition but potentially lacking complete tooling.