# uuid-apikey

[![Actual version published on npm](http://img.shields.io/npm/v/uuid-apikey.svg)](https://www.npmjs.org/package/uuid-apikey)
[![Travis build status](https://travis-ci.org/chronosis/uuid-apikey.svg)](https://www.npmjs.org/package/uuid-apikey)
[![Total npm module downloads](http://img.shields.io/npm/dt/uuid-apikey.svg)](https://www.npmjs.org/package/uuid-apikey)

A Base32-Crockford encoded API Key generator, validator, and converter to turn UUIDs into human readable API Keys

API Keys are 31 characters in length (e.g. XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX), are fully-uppercase, tricky characters are treated equivalently (0 = O / 1 = L = I ), and the letter U is omitted to avoid common profanities.

A common use for this library is to allow APIKeys to be stored in a host DB as UUID, but to display the APIKey version in its encoded form to users.

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
```
true
false
```

### .toAPIKey(uuid)
Converts a valid UUID into an API Key. Throws a `TypeError` if the UUID is invalid.
```es2016
uuidAPIKey.toAPIKey('0b9ca335-92a8-46d8-b477-eb2ed83ac927');
```
```
'1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X'
```

### .toUUID(apiKey)
Converts a valid API Key into an UUID. Throws a `TypeError` if the API Key is invalid.
```es2016
uuidAPIKey.toUUID('1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X');
```
```
'0b9ca335-92a8-46d8-b477-eb2ed83ac927'
```

### .check(apiKey, uuid)
Test that an API Key and a UUID are identical. Throws a `TypeError` if either the API Key or the UUID is invalid.
```es2016
uuidAPIKey.check('1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X', '0b9ca335-92a8-46d8-b477-eb2ed83ac927');
```
```
true
```

### .create()
Returns a new UUID and API Key pair
```es2016
uuidAPIKey.create();
```
```
{ uuid: '0b9ca335-92a8-46d8-b477-eb2ed83ac927',
  apiKey: '1EEA6DC-JAM4DP2-PHVYPBN-V0XCJ9X' }
```

## License
MIT
