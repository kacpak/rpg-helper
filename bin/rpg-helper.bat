@echo off
cd %~dp0\..

IF EXIST node_modules GOTO RUN
echo Application dependencies not found. Installing dependencies...
call yarn install --production

:RUN
echo Running RPG Helper application...
call yarn run start
