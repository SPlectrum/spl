# SPL Node Philosophy

It is the aim to use the SPlectrum node wherever we can. That is during module development, testing, etc. up to production.  

It is important that there is a simple way to make it work for module develpment,  
where a node should be run within (embedded) without the need to use submodules and the like  
and without the need to move the code.

I think this can be achieved by using within every module repository (each will have their own repo) the same *spl* folder.  
The idea is as follows:
 - each repository has a *spl* subfolder
 - the module code sits in the *modules* folder as if it were installed.
 - testing asses sit in the *test* folder
 - both these folders are tracked - the only ones
 - a (minimal required) SPlection release is unpacked in the folder
 - it is installed
 - now the module can be developed against the tests, i.e. its specfications.

 The simple tests of the module would be the equivalend of unit tests.  
 However, integration test can be included by upgrading the minimal release install.  
 More work needs to be done on the tests, simple and structured, and the tooling to manage these test suites.
