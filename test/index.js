const chai = require('chai');
const expect = chai.expect;

const testKey = {
  uuid: '872a6f67-7d93-4e9c-8d9a-4637a3feff65',
  apiKey: 'GWN6YSX-FP9MX73-HPD4CDY-MFZFYSC'
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

  it('test good API Key', () => {
    expect(MainClass.isAPIKey(testKey.apiKey)).to.be.equal(true);
  });

  it('test good lower-case API Key', () => {
    expect(MainClass.isAPIKey(testKey.apiKey.toLowerCase())).to.be.equal(true);
  });

  it('test bad API Key', () => {
    expect(MainClass.isAPIKey(testKey.uuid)).to.be.equal(false);
  });

  it('convert to UUID', () => {
    expect(MainClass.isUUID(MainClass.toUUID(testKey.apiKey))).to.be.equal(true);
  });

  it('convert to API Key', () => {
    expect(MainClass.isAPIKey(MainClass.toAPIKey(testKey.uuid))).to.be.equal(true);
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
