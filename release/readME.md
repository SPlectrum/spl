# SPlectrum v0.0.1

This is the initial version of SPlectrum.  
It implements the folder structure and the execution flow for 3 fixed (static) sessions: boot, system and client.  
It implements only a dummy command for demonstration purposes, v0.0.2 will provide the means to configure a simple meaningful client app.

The execution of requests is triggered by filewatcher on the respective session queue folders.  
To have all three session active you need three terminal windoes to start the watchers.
All terminal windows have to be opened in the root of the extracted spl package.

```
node testWatcher.js boot

node testWatcher.js system

node testWatcher.js client

```

To execute the dummy request, open a terminal window and invoke *spl*.
On Linux:
```
./spl boot|system|client hello-world 
``` 
On windows
```
spl.cmd boot|system|client hello-world
```
---

## Miscellaneous

To create the selfextracting package from the git repository run the command below in the root:

(linux) 7z a -sfx spl.exe ./spl
(windows)"C:\Program Files\7-Zip\7z.exe" a -sfx spl.exe ./spl
