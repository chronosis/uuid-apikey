# uuid-apikey

[![Actual version published on npm](http://img.shields.io/npm/v/uuid-apikey.svg)](https://www.npmjs.org/package/uuid-apikey)
[![Travis build status](https://travis-ci.org/chronosis/uuid-apikey.svg)](https://www.npmjs.org/package/uuid-apikey)
[![Total npm module downloads](http://img.shields.io/npm/dt/uuid-apikey.svg)](https://www.npmjs.org/package/uuid-apikey)

*"API Keys for people"*

A generator, validator, and converter that transforms UUIDs into human-readable Base32-Crockford encoded API Keys.

 * API Keys are 31 characters in length consisting of 4 groups of 7 characters separated by dashes *(e.g. XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX)*
 * They avoids the problem that Base64 encoded values can create
   * Fully upper-case, but treat lower-case for their equivalents *(e.g. a = A)*
   * No tricky characters, but treat them equivalently *(i.e. 0 = O / 1 = L = I )*
   * No characters that inadvertently lead to common profanities *(i.e. letter U is omitted)*


A common use for this library is to allow UUIDs to be stored in a host DB, but to display a human-readable API Key to a user.

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

## Reference

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
