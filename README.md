# uuid-apikey

[![NPM](https://nodei.co/npm/uuid-apikey.png?downloads=true)](https://nodei.co/npm/uuid-apikey/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fchronosis%2Fuuid-apikey.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fchronosis%2Fuuid-apikey?ref=badge_shield)

[![Actual version published on npm](http://img.shields.io/npm/v/uuid-apikey.svg)](https://www.npmjs.org/package/uuid-apikey)
[![Travis build status](https://travis-ci.org/chronosis/uuid-apikey.svg)](https://www.npmjs.org/package/uuid-apikey)
[![Total npm module downloads](http://img.shields.io/npm/dt/uuid-apikey.svg)](https://www.npmjs.org/package/uuid-apikey)
[![Package Quality](http://npm.packagequality.com/shield/uuid-apikey.svg)](http://packagequality.com/#?package=uuid-apikey)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6c4ea28976c54c0493f8c0a4e742a95a)](https://www.codacy.com/app/chronosis/uuid-apikey?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=chronosis/uuid-apikey&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/6c4ea28976c54c0493f8c0a4e742a95a)](https://www.codacy.com/app/chronosis/uuid-apikey?utm_source=github.com&utm_medium=referral&utm_content=chronosis/uuid-apikey&utm_campaign=Badge_Coverage)

*"API Keys for people"*

A generator, validator, and converter that transforms UUIDs into human-readable Base32-Crockford encoded API Keys.

 * API Keys are 31 characters in length consisting of 4 groups of 7 characters separated by dashes *(e.g. XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX)*
 * They avoids the problem that Base64 encoded values can create
   * Fully upper-case, but treat lower-case for their equivalents *(e.g. a = A)*
   * No tricky characters, but treat them equivalently *(i.e. 0 = O / 1 = L = I )*
   * No characters that inadvertently lead to common profanities *(i.e. letter U is omitted)*

One common use for this library is in REST APIs, by storing a UUIDs in a host DB but displaying the human-readable API Key to a user.
Another use for this library is creating and validating product keys for distributed software.

***NOTE***: This package makes use of ES6 and ES7 functionality. If you are using a version of node `< v8.0`, then you will need to use babel or a polyfill for compatibility.

## Installation
You can install `uuid-apikey` with NPM.
```shell
npm install uuid-apikey
```
## Usage
```es2016
const uuidAPIKey = require('uuid-apikey');

console.log(uuidAPIKey.create());
```
**Output**:
```
{ uuid: '0b9ca335-92a8-46d8-b477-eb2ed83ac927',
  apiKey: '1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X' }
```

## Command Line
`uuid-apikey` installs with a command line tool. The tool is available using the command `apiKeyTool` which can be install globally using:

```
  npm install uuid-apikey -g
```

### Options
```shell
$ apiKeyTool.js

  Usage: apiKeyTool [options]


  Options:

    -V, --version          output the version number
    -g, --generate         Create a new API Key/UUID pair. Ignores other parameters if passed.
    -u, --uuid <uuid>      UUID for operation. If no other parameter is passed this is converted to an API Key.
    -a, --apikey <apikey>  API Key for operation. If no other parameter is passed this is converted to an UUID.
    -c, --check            Check the API Key and/or UUID provided are valid. If both API Key and UUID are passed then they are checked against each other.
    -h, --help             output usage information
```

### Examples
#### Generation
```shell
$ apiKeyTool.js -g

  UUID(9b3ac4c9-0228-4e42-a244-927059b1a5ea)
APIKey(KCXC9JD-08M4WGH-M9294W1-B6RTBTH)
```
#### Conversion
```shell
$ apiKeyTool.js -a KCXC9JD-08M4WGH-M9294W1-B6RTBTH -u 9b3ac4c9-0228-4e42-a244-927059b1a5ea

UUID(9b3ac4c9-0228-4e42-a244-927059b1a5ea) => APIKey(KCXC9JD-08M4WGH-M9294W1-B6RTBTH)
APIKey(KCXC9JD-08M4WGH-M9294W1-B6RTBTH)    => UUID(9b3ac4c9-0228-4e42-a244-927059b1a5ea)
```

#### Testing
```shell
$ apiKeyTool.js -a KCXC9JD-08M4WGH-M9294W1-B6RTBTH -u 9b3ac4c9-0228-4e42-a244-927059b1a5ea -c

UUID(9b3ac4c9-0228-4e42-a244-927059b1a5ea) : valid
APIKey(KCXC9JD-08M4WGH-M9294W1-B6RTBTH)    : valid
UUID & APIKey are identical                : true
```

## API Reference

### .isUUID(uuid)
Tests if the UUID string passed is a valid UUID.
```es2016
uuidAPIKey.isUUID('0b9ca335-92a8-46d8-b477-eb2ed83ac927');
uuidAPIKey.isUUID('NodeJS');
```
**Output**:
```
true
false
```

### .isAPIKey(apiKey)
Tests if the API Key string passed is a valid API Key.
```es2016
uuidAPIKey.isAPIKey('1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X');
uuidAPIKey.isAPIKey('NodeJS');
```
**Output**:
```
true
false
```

### .toAPIKey(uuid, [options])
Converts a valid UUID into an API Key. Throws a `TypeError` if the UUID is invalid.
```es2016
uuidAPIKey.toAPIKey('0b9ca335-92a8-46d8-b477-eb2ed83ac927');
uuidAPIKey.toAPIKey('0b9ca335-92a8-46d8-b477-eb2ed83ac927', { 'noDashes': true });
```
**Output**:
```
'1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X'
'1EEA6DCJAM4DP2PHVYPBNV0XCJ9X'
```
**Options**

| Option | Type | Desc |
| ------ | ---- | ---- |
| noDashes | boolean | Generates an APIKey without dashes |

### .toUUID(apiKey)
Converts a valid API Key into an UUID. Throws a `TypeError` if the API Key is invalid.
```es2016
uuidAPIKey.toUUID('1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X');
```
**Output**:
```
'0b9ca335-92a8-46d8-b477-eb2ed83ac927'
```

### .check(apiKey, uuid)
Test that an API Key and a UUID are identical. Throws a `TypeError` if either the API Key or the UUID is invalid.
```es2016
uuidAPIKey.check('1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X', '0b9ca335-92a8-46d8-b477-eb2ed83ac927');
```
**Output**:
```
true
```

### .create([options])
Returns a new UUID and API Key pair
```es2016
uuidAPIKey.create();
```
**Output**:
```
{ uuid: '0b9ca335-92a8-46d8-b477-eb2ed83ac927',
  apiKey: '1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X' }
```
**Options**

| Option | Type | Desc |
| ------ | ---- | ---- |
| noDashes | boolean | Generates an APIKey without dashes |

## License
MIT


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fchronosis%2Fuuid-apikey.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fchronosis%2Fuuid-apikey?ref=badge_large)