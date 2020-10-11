// index.js

// Dependencies
const base32 = require('encode32');
const uuidv4 = require('uuid').v4;

// APIKeys are a Base32-Crockford encoded representation of UUIDs
// Base32-Crockford encoding is used to maintain human readability of the values
// and to eliminate confusing overlapping characters (0 -> O; l -> 1; etc.)
class UUIDAPIKey {
  constructor() {
    this.defaultOptions = { noDashes: false };
  }

  checkDashes(positions, str) {
    let test = true;
    for (const pos in positions) {
      if (positions.hasOwnProperty(pos)) {
        const chr = str.charAt(positions[pos]);
        test = test && chr === '-';
      }
    }
    return test;
  }

  isUUID(uuid) {
    if (!uuid) {
      throw new ReferenceError('The required parameter \'uuid\' is undefined.');
    }
    const uuidCheck = this.checkDashes([8, 13, 18], uuid);
    // Only check the first three dashes as ColdFusion implementations erroneously omit the last dash
    uuid = uuid.replace(/-/g, '');
    const re = /[0-9A-Fa-f]*/g;
    return uuidCheck && uuid.length === 32 && re.test(uuid);
  }

  isAPIKey(apiKey) {
    if (!apiKey) {
      throw new ReferenceError('The required parameter \'apiKey\' is undefined.');
    }
    apiKey = apiKey.toUpperCase().replace(/-/g, '');
    const re = /[0-9A-Z]*/g;
    return apiKey.length === 28 && re.test(apiKey);
  }

  toAPIKey(uuid, options) {
    if (!uuid) {
      throw new ReferenceError('The required parameter \'uuid\' is undefined.');
    }
    options = options || this.defaultOptions;
    if (this.isUUID(uuid)) {
      uuid = uuid.replace(/-/g, '');
      const s1 = uuid.substr(0, 8);
      const s2 = uuid.substr(8, 8);
      const s3 = uuid.substr(16, 8);
      const s4 = uuid.substr(24, 8);
      const n1 = Number(`0x${s1}`);
      const n2 = Number(`0x${s2}`);
      const n3 = Number(`0x${s3}`);
      const n4 = Number(`0x${s4}`);
      const e1 = base32.encode32(n1);
      const e2 = base32.encode32(n2);
      const e3 = base32.encode32(n3);
      const e4 = base32.encode32(n4);
      if (options.noDashes) {
        return `${e1}${e2}${e3}${e4}`;
      }
      return `${e1}-${e2}-${e3}-${e4}`;
    }
    throw new TypeError(`The value provide '${uuid}' is not a valid uuid.`);
  }

  toUUID(apiKey) {
    if (!apiKey) {
      throw new ReferenceError('The required parameter \'apiKey\' is undefined.');
    }
    if (this.isAPIKey(apiKey)) {
      apiKey = apiKey.replace(/-/g, '');
      const e1 = apiKey.substr(0, 7);
      const e2 = apiKey.substr(7, 7);
      const e3 = apiKey.substr(14, 7);
      const e4 = apiKey.substr(21, 7);
      const n1 = base32.decode32(e1);
      const n2 = base32.decode32(e2);
      const n3 = base32.decode32(e3);
      const n4 = base32.decode32(e4);
      const s1 = n1.toString(16).padStart(8, '0');
      const s2 = n2.toString(16).padStart(8, '0');
      const s3 = n3.toString(16).padStart(8, '0');
      const s4 = n4.toString(16).padStart(8, '0');
      const s2a = s2.substr(0, 4);
      const s2b = s2.substr(4, 4);
      const s3a = s3.substr(0, 4);
      const s3b = s3.substr(4, 4);
      return `${s1}-${s2a}-${s2b}-${s3a}-${s3b}${s4}`;
    }
    throw new TypeError(`The value provide '${apiKey}' is not a valid apiKey.`);
  }

  check(apiKey, uuid) {
    if (!apiKey) {
      throw new ReferenceError('The required parameter \'apiKey\' is undefined.');
    }
    if (!uuid) {
      throw new ReferenceError('The required parameter \'uuid\' is undefined.');
    }
    const apiTest = this.isAPIKey(apiKey.toUpperCase());
    const uuidTest = this.isUUID(uuid);
    let uuidCheck;
    if (apiTest && uuidTest) {
      uuidCheck = this.toUUID(apiKey);
      return uuid === uuidCheck;
    }
    let errMsg = '';
    if (!apiTest) {
      errMsg += `The value provide '${apiKey}' is not a valid apiKey. `;
    }
    if (!uuidTest) {
      errMsg += `The value provide '${uuid}' is not a valid uuid. `;
    }
    throw new TypeError(errMsg);
  }

  create(options) {
    options = options || this.defaultOptions;
    const uid = uuidv4();
    // Generate a new UUIDv4
    const apiKey = this.toAPIKey(uid, options);
    return { apiKey: apiKey, uuid: uid };
  }
}

module.exports = new UUIDAPIKey();
