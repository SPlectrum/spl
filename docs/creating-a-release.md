[← Home](../README.md)

# Creating a Release

It is important to keep app packages on significant change and to keep the release folder updated.  
This is where the app packages are added to the git project (the spl folder is not tracked by git).

The release folder contains a boot app with the functionality to create the install folder within the spl folder.
Within the spl folder, the boot app executes the deploy and remove operation.  
The boot app is fully self-contained, it contains all functional code to run.

To create an install package that can be zipped up, run the following command from the root of the boot app (release/install/boot):
```
./spl usr/release_to_install
```
This will copy the files in the relase directory and the repository modules directory to the install folder within the spl folder. 

To create the Linux installer package from the git repository run the command below in the root:

```bash
# Create Linux installer (future implementation)
./spl usr/create_linux_installer

# Current manual method using 7z for testing
7z a spl_package.tar.gz ./spl
```

**Note**: The release process is transitioning to Linux-first deployment. See [Linux Installer Design](linux-installer-design.md) for the planned installer implementation.
