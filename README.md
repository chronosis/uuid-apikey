# uuid-apikey

[![NPM](https://nodei.co/npm/uuid-apikey.png?downloads=true)](https://nodei.co/npm/uuid-apikey/)

[![Actual version published on npm](http://img.shields.io/npm/v/uuid-apikey.svg)](https://www.npmjs.org/package/uuid-apikey)
[![Actions Status](https://github.com/chronosis/uuid-apikey/workflows/Build%20and%20Test%20Master/badge.svg)](https://github.com/chronosis/uuid-apikey/workflows/actions)
[![Total npm module downloads](http://img.shields.io/npm/dt/uuid-apikey.svg)](https://www.npmjs.org/package/uuid-apikey)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6c4ea28976c54c0493f8c0a4e742a95a)](https://www.codacy.com/app/chronosis/uuid-apikey?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=chronosis/uuid-apikey&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/6c4ea28976c54c0493f8c0a4e742a95a)](https://www.codacy.com/app/chronosis/uuid-apikey?utm_source=github.com&utm_medium=referral&utm_content=chronosis/uuid-apikey&utm_campaign=Badge_Coverage)

*"API Keys are for people"*

This module is a generator, validator, and converter that transforms UUIDs into human-readable Base32-Crockford encoded API Keys.

It turns this:
```
9b3ac4c9-0228-4e42-a244-927059b1a5ea
```
into this:
```
KCXC9JD-08M4WGH-M9294W1-B6RTBTH
```

## Notes about Base32-Crockford API Keys
 * API Keys are 31 characters in length and consist of 4 groups of 7 characters separated by dashes *(e.g. XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX)*
 * API Keys are ideal for readable transports where they may be manually entered by a human and similarty character glyphs within the printed typeface may cause confusion. "Is that an O or a 0?"

Base32-Crockford API Keys it avoids these problems by doing the following:
   * API Keys have no lower-case characters. The API Key parser handles all lower-case characters as their upper-case equivalent. *(e.g. `a` ≡ `A`)*
   * API Keys do not use similar characters glyphs which can be confused in some typefaces. The parser handles confusing characters as the same values.  
     * the letters `O`, `o`, and the number `0`
     * the letters `L`, `l`, `I`, `i`, and the number `1`
   * API Keys do not use the letter `U` which could inadvertently lead to common English profanities.

## Common Uses
 * Generating and using REST API Keys where a UUID is stored in a host DB but the API Key is shown to the user.
 * Generating APIKeys and storing the associated equivalent UUIDs values for use as software license keys in software distribution.

***NOTE***: This package makes use of ES6 and ES7 functionality. If you are using a version of node prior to version 8 then you will need to use a polyfill (e.g. babel) for compatibility.

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
Copyright (c) 2018,2019 Jay Reardon -- Licensed under the MIT license.
