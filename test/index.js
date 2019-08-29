const chai = require('chai');
const expect = chai.expect;

const testKey = {
  uuid: '872a6f67-7d93-4e9c-8d9a-4637a3feff65',
  apiKey: 'GWN6YSX-FP9MX73-HPD4CDY-MFZFYSC',
  apiKeyNoDashes: 'GWN6YSXFP9MX73HPD4CDYMFZFYSC'
};
const testUUID = '0b9ca335-92a8-46d8-b277-ec2ed83ac427';

describe('uuid-apikey', () => {
  const MainClass = require('../');

  it('load', () => {
    const myModule = require('../');

    expect(myModule.constructor.name).to.be.equal(MainClass.constructor.name);
  });

  it('test good UUID', () => {
    expect(MainClass.isUUID(testKey.uuid)).to.be.equal(true);
  });

  it('test bad UUID', () => {
    expect(MainClass.isUUID(testKey.apiKey)).to.be.equal(false);
  });

  it('test empty UUID', () => {
    expect(() => { MainClass.isUUID(null); }).to.throw(ReferenceError);
  });

  it('test good API Key', () => {
    expect(MainClass.isAPIKey(testKey.apiKey)).to.be.equal(true);
  });

  it('test good lower-case API Key', () => {
    expect(MainClass.isAPIKey(testKey.apiKey.toLowerCase())).to.be.equal(true);
  });

  it('test bad API Key', () => {
    expect(MainClass.isAPIKey(testKey.uuid)).to.be.equal(false);
  });
  it('test empty API Key', () => {
    expect(() => { MainClass.isAPIKey(null); }).to.throw(ReferenceError);
  });

  it('convert to UUID', () => {
    expect(MainClass.isUUID(MainClass.toUUID(testKey.apiKey))).to.be.equal(true);
  });

  it('convert bad UUID', () => {
    expect(() => { MainClass.isUUID(MainClass.toUUID('----')); }).to.throw(TypeError);
  });

  it('convert empty UUID', () => {
    expect(() => { MainClass.isUUID(MainClass.toUUID(null)); }).to.throw(ReferenceError);
  });

  it('convert to APIKey', () => {
    expect(MainClass.isAPIKey(MainClass.toAPIKey(testKey.uuid, { noDashes: true }))).to.be.equal(true);
  });

  it('convert bad APIKey', () => {
    expect(() => { MainClass.isUUID(MainClass.toAPIKey('----')); }).to.throw(TypeError);
  });

  it('convert empty APIKey', () => {
    expect(() => { MainClass.isUUID(MainClass.toAPIKey(null)); }).to.throw(ReferenceError);
  });

  it('test empty API Key', () => {
    expect(() => { MainClass.check(null, testKey.uuid); }).to.throw(ReferenceError);
  });

  it('test empty UUID Key', () => {
    expect(() => { MainClass.check(testKey.apiKey, null); }).to.throw(ReferenceError);
  });

  it('test bad API Key', () => {
    expect(() => { MainClass.check('-----', testKey.uuid); }).to.throw(TypeError);
  });

  it('test bad UUID Key', () => {
    expect(() => { MainClass.check(testKey.apiKey, '----'); }).to.throw(TypeError);
  });

  it('test good matching API Key / UUID', () => {
    expect(MainClass.check(testKey.apiKey, testKey.uuid)).to.be.equal(true);
  });

  it('test not matching API Key / UUID', () => {
    expect(MainClass.check(testKey.apiKey, testUUID)).to.be.equal(false);
  });

  it('key creation', () => {
    expect(MainClass.create()).to.be.an('object');
  });
});
