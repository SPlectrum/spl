[Home](../README.md)
# Creating a Release

To create an install package that can be zipped up, run the following command from the root of the repository:
```
node createInstall
```

This will copy the files in the relase directory and the repository modules directory to the release  

To create the selfextracting package from the git repository run the command below in the root:

(linux) 7z a -sfx spl.exe ./spl
(windows)"C:\Program Files\7-Zip\7z.exe" a -sfx spl.exe ./spl
