echo off
title Splectrum
for /f %%i in ('console.cmd') do set RESULT=%%i

node spl.js %RESULT% %*
