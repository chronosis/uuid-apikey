const test = require('unit.js');

let testKey = { uuid: '872a6f67-7d93-4e9c-8d9a-4637a3feff65', apiKey: 'GWN6YSX-FP9MX73-HPD4CDY-MFZFYSC' };
let testUUID = '0b9ca335-92a8-46d8-b277-ec2ed83ac427';

describe('uuid-apikey', () => {

  let MainClass = require('../');

  it('load', () => {
    let myModule = require('../');

    test.assert(typeof myModule == typeof MainClass);
  });

  it('test good UUID', () => {
    test.assert(MainClass.isUUID(testKey.uuid));
  })

  it('test bad UUID', () => {
    test.assert(!MainClass.isUUID(testKey.apiKey));
  })

  it('test good API Key', () => {
    test.assert(MainClass.isAPIKey(testKey.apiKey));
  })

  it('test good lower-case API Key', () => {
    test.assert(MainClass.isAPIKey(testKey.apiKey.toLowerCase()));
  })

  it('test bad API Key', () => {
    test.assert(!MainClass.isAPIKey(testKey.uuid));
  })

  it('convert to UUID', () => {
    test.assert(MainClass.isUUID(MainClass.toUUID(testKey.apiKey)));
  });

  it('convert to API Key', () => {
    test.assert(MainClass.isAPIKey(MainClass.toAPIKey(testKey.uuid)));
  });

  it('test good matching API Key / UUID', () => {
    test.assert(MainClass.check(testKey.apiKey, testKey.uuid));
  });

  it('test not matching API Key / UUID', () => {
    test.assert(!MainClass.check(testKey.apiKey, testUUID));
  });

  it('key creation', () => {
    test.object(MainClass.create());
  });

});
