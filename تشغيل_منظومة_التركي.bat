@echo off
set "APP=%~dp0index.html"
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app="file:///%APP:/=/%"
if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app="file:///%APP:/=/%"
if not exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" if not exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" start "" "%APP%"
