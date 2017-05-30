# RPG Helper
[![Build Status](https://travis-ci.org/kacpak/rpg-helper.svg?branch=master)](https://travis-ci.org/kacpak/rpg-helper)
[![npm version](https://badge.fury.io/js/rpg-helper.svg)](https://badge.fury.io/js/rpg-helper)

Dungeons &amp; Dragons Session Helper

## CLI

## Developer
* `cp .env-sample .env`
* Generate SSL Certifacte
    * `cd ./sslcert`
    * `openssl genrsa 1024 > private.key`
    * `openssl req -new -key private.key -out cert.csr`
    * `openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem`
