// index.js

// Dependencies
const
  base32            = require('encode32')
  , uuidv4            = require('uuid/v4')
;

// APIKeys are a Base32-Crockford encoded representation of UUIDs
// Base32-Crockford encoding is used to maintain human readability of the values
// and to eliminate confusing overlapping characters (0 -> O; l -> 1; etc.)
class UUIDAPIKey {
  constructor() {
		this.defaultOptions = {
			noDashes: false
		}
  }

	checkDashes(positions, str) {
		let test = true;
		for (let pos in positions) {
			let chr = str.charAt(positions[pos]);
			test = test && (chr == "-");
		}
		return test;
	}

  isUUID(uuid) {
		let uuidCheck = this.checkDashes([8, 13, 18], uuid);  // Only check the first three dashes as ColdFusion implementations erroneously omit the last dash
    uuid = uuid.replace(/-/g, '');
    let re = /[0-9A-Fa-f]*/g;
    return (uuidCheck && uuid.length === 32 && re.test(uuid));
  }

  isAPIKey(apiKey) {
	  apiKey = apiKey.replace(/-/g, '');
    let re = /[0-9A-Z]*/g;
    return (apiKey.length === 28 && re.test(apiKey));
  }

  toAPIKey(uuid, options) {
		options = options || this.defaultOptions;
    if (this.isUUID(uuid)) {
			uuid = uuid.replace(/-/g, '');
      let s1 = uuid.substr(0,8);
      let s2 = uuid.substr(8,8);
      let s3 = uuid.substr(16,8);
      let s4 = uuid.substr(24,8);
      let n1 = Number('0x' + s1);
      let n2 = Number('0x' + s2);
      let n3 = Number('0x' + s3);
      let n4 = Number('0x' + s4);
      let e1 = base32.encode32(n1);
      let e2 = base32.encode32(n2);
      let e3 = base32.encode32(n3);
      let e4 = base32.encode32(n4);
			if (options.noDashes) return `${e1}${e2}${e3}${e4}`;
      return `${e1}-${e2}-${e3}-${e4}`;
    } else {
      throw(new TypeError(`The value provide '${uuid}' is not a valid uuid.`));
    }
  }

  toUUID(apiKey) {
    if (this.isAPIKey(apiKey)) {
			apiKey = apiKey.replace(/-/g, '');
    	let e1 = apiKey.substr(0,7);
      let e2 = apiKey.substr(7,7);
      let e3 = apiKey.substr(14,7);
      let e4 = apiKey.substr(21,7);
      let n1 = base32.decode32(e1);
      let n2 = base32.decode32(e2);
      let n3 = base32.decode32(e3);
      let n4 = base32.decode32(e4);
      let s1 = n1.toString(16);
      let s2 = n2.toString(16);
      let s3 = n3.toString(16);
      let s4 = n4.toString(16);
      let s2a = s2.substr(0,4);
      let s2b = s2.substr(4,4);
      let s3a = s3.substr(0,4);
      let s3b = s3.substr(4,4);
      return `${s1}-${s2a}-${s2b}-${s3a}-${s3b}${s4}`;
    } else {
      throw(new TypeError(`The value provide '${apiKey}' is not a valid apiKey.`));
    }
  }

	check(apiKey, uuid) {
		let apiTest = this.isAPIKey(apiKey);
		let uuidTest = this.isUUID(uuid);
		let uuidCheck;
		if (apiTest && uuidTest) {
			uuidCheck = this.toUUID(apiKey);
			return (uuid === uuidCheck)
		} else {
			let errMsg = '';
			if (!apiTest) errMsg += `The value provide '${apiKey}' is not a valid apiKey. `;
			if (!uuidTest) errMsg += `The value provide '${uuid}' is not a valid uuid. `;
		  throw(new TypeError(errMsg));
		}
		return false;
	}

  create(options) {
		options = options || this.defaultOptions;
    let uid = uuidv4(); // Generate a new UUIDv4
    let apiKey = this.toAPIKey(uid, options);
    return { 'apiKey': apiKey, 'uuid': uid };
  }
}

module.exports = new UUIDAPIKey();
