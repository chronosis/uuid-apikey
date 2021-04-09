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

let uuidCheck, apiKeyCheck, compareCheck, out, opts;

opts = program.opts();

const pLog = (type, value) => {
  switch (type) {
    case 'uuid':
      return `${colors.cyan('UUID')}(${colors.grey.underline(value)})`;
    case 'apikey':
      return `${colors.cyan('APIKey')}(${colors.grey.underline(value)})`;
  }
}

if (opts.generate) {
  out = uuidAPIKey.create();
  console.log(pLog('uuid', out.uuid));
  console.log(pLog('apikey', out.apiKey));
} else if (opts.check) {
  if (!opts.uuid && !opts.apikey) {
    program.help();
  }

  console.log('');
  if (opts.uuid) {
    uuidCheck = uuidAPIKey.isUUID(opts.uuid);
    out = uuidCheck ? colors.green('valid') : colors.red('invalid');
    console.log(pLog('uuid', opts.uuid) + ` : ${out}`);
  }

  if (opts.apikey) {
    apiKeyCheck = uuidAPIKey.isAPIKey(opts.apikey);
    out = apiKeyCheck ? colors.green('valid') : colors.red('invalid');
    console.log(pLog('apikey', opts.apikey) + ` : ${out}`);
  }

  // Both were passed and both are valid
  if (opts.uuid && opts.apikey && uuidCheck && apiKeyCheck) {
    compareCheck = uuidAPIKey.check(opts.apikey, opts.uuid);
    out = compareCheck ? colors.green('true') : colors.red('false');
    console.log(`UUID & APIKey are identical                : ${out}`);
  }

  console.log('');
} else {
  if (!opts.apikey && !opts.uuid) {
    program.help();
  }

  console.log('');

  if (opts.uuid) {
    uuidCheck = uuidAPIKey.isUUID(opts.uuid);
    if (uuidCheck) {
      console.log(pLog('uuid', opts.uuid) + ` ${colors.yellow('=>')} ` + pLog('apikey', uuidAPIKey.toAPIKey(opts.uuid)));
    } else {
      console.log(pLog('uuid', opts.uuid) + ` ${colors.red('is invalid')}.`);
    }
  }

  if (opts.apikey) {
    apiKeyCheck = uuidAPIKey.isAPIKey(opts.apikey);
    if (apiKeyCheck) {
      console.log(pLog('apikey', opts.apikey) + ` ${colors.yellow('=>')} ` + pLog('uuid', uuidAPIKey.toUUID(opts.apikey)));
    } else {
      console.log(pLog('apikey', opts.apikey) + ` ${colors.red('is invalid')}.`);
    }
  }

  console.log('');
}
