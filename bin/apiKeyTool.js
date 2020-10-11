#!/usr/bin/env node
/* eslint no-console: "off" */

const program = require('commander'),
  colors = require('colors'),
  uuidAPIKey = require('../index'),
  pkg = require('../package.json');

program
  .version(pkg.version)
  .option(
    '-g, --generate',
    'Create a new API Key/UUID pair. Ignores other parameters if passed.'
  )
  .option(
    '-u, --uuid <uuid>',
    'UUID for operation. If no other parameter is passed this is converted to an API Key.'
  )
  .option(
    '-a, --apikey <apikey>',
    'API Key for operation. If no other parameter is passed this is converted to an UUID.'
  )
  .option(
    '-c, --check',
    'Check the API Key and/or UUID provided are valid. If both API Key and UUID are passed then they are checked against each other.'
  );

program.on('--help', () => {
  console.log('');
  console.log(`  Version: ${pkg.version}`);
});

program.parse(process.argv);

let uuidCheck, apiKeyCheck, compareCheck, out;

if (program.generate) {
  out = uuidAPIKey.create();
  console.log(`  ${colors.cyan('UUID')}(${colors.grey.underline(out.uuid)})`);
  console.log(`${colors.cyan('APIKey')}(${colors.grey.underline(out.apiKey)})`);
} else if (program.check) {
  if (!program.uuid && !program.apikey) {
    program.help();
  }

  console.log('');
  if (program.uuid) {
    uuidCheck = uuidAPIKey.isUUID(program.uuid);
    out = uuidCheck ? colors.green('valid') : colors.red('invalid');
    console.log(`${colors.cyan('UUID')}(${colors.grey.underline(program.uuid)}) : ${out}`);
  }

  if (program.apikey) {
    apiKeyCheck = uuidAPIKey.isAPIKey(program.apikey);
    out = apiKeyCheck ? colors.green('valid') : colors.red('invalid');
    console.log(`${colors.cyan('APIKey')}(${colors.grey.underline(program.apikey)})    : ${out}`);
  }

  // Both were passed and both are valid
  if (program.uuid && program.apikey && uuidCheck && apiKeyCheck) {
    compareCheck = uuidAPIKey.check(program.apikey, program.uuid);
    out = compareCheck ? colors.green('true') : colors.red('false');
    console.log(`UUID & APIKey are identical                : ${out}`);
  }

  console.log('');
} else {
  if (!program.apikey && !program.uuid) {
    program.help();
  }

  console.log('');

  if (program.uuid) {
    uuidCheck = uuidAPIKey.isUUID(program.uuid);
    if (uuidCheck) {
      console.log(`${colors.cyan('UUID')}(${colors.grey.underline(program.uuid)}) ${colors.yellow('=>')} ${colors.cyan('APIKey')}(${colors.grey.underline(uuidAPIKey.toAPIKey(program.uuid))})`);
    } else {
      console.log(`${colors.cyan('UUID')}(${colors.grey.underline(program.uuid)}) ${colors.red('is invalid')}.`);
    }
  }

  if (program.apikey) {
    apiKeyCheck = uuidAPIKey.isAPIKey(program.apikey);
    if (apiKeyCheck) {
      console.log(`${colors.cyan('APIKey')}(${colors.grey.underline(program.apikey)})    ${colors.yellow('=>')} ${colors.cyan('UUID')}(${colors.grey.underline(uuidAPIKey.toUUID(program.apikey))})`);
    } else {
      console.log(`${colors.cyan('APIKey')}(${colors.grey.underline(program.apikey)}) ${colors.red('is invalid')}.`);
    }
  }

  console.log('');
}
