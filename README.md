# RPG Helper
[![Build Status](https://travis-ci.org/kacpak/rpg-helper.svg?branch=master)](https://travis-ci.org/kacpak/rpg-helper)
[![npm version](https://badge.fury.io/js/rpg-helper.svg)](https://badge.fury.io/js/rpg-helper)

> Dungeons &amp; Dragons Session Helper

**Important** It is a simple side project published only for sharing with friends. Do **NOT** expect any support or working system until at least **v1.0.0** hits.

## Demo
Current master demo is available at [rpghelper.herokuapp.com](https://rpghelper.herokuapp.com)

## Requirements
* Node ^8
* `openssl` to generate ssl certificate

## CLI
```bash
$ rpg-helper -h
Usage: rpg-helper <command> [options]

Commands:
  start  start RPG Helper

start
  --ssl-dir, --ssl      directory with ssl certificate                                                           [string]
  --database-dir, --db  directory for storing database files                                                     [string]
  --secret, -s          long secret string for encryption purposes                                    [string] [required]
  --port, -p            port on which server will be available                                    [number] [default: 443]

Options:
  --version, -v  Show version number                                                                            [boolean]
  --help, -h     Show help                                                                                      [boolean]

Examples:
  rpg-helper start --db=./path/to/dir --ssl=./path/to/dir       start RPG Helper storing database in the given directory,
  --secret=SECRET-KEY                                           with provided certificates

Copyright © 2017 Mateusz Kasprzak
```
## Certificate generation
* `cd ./sslcert`
* `openssl genrsa 1024 > private.key`
* `openssl req -new -key private.key -out cert.csr`
* `openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem`

## For developers
* `cp .env-sample .env` use default environmental variables
* `yarn build` build project for production
* `yarn start` start built project
* `yarn dev` start project in development mode (watch mode with auto reload)

### Publishing new version
* `yarn full-publish`
