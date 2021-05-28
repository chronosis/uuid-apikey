import { expectType } from 'tsd';
import uuidApiKey, { ApiKeyInfo, UUIDOptions } from '..';

// check type exports
type Options = UUIDOptions;
type Info = ApiKeyInfo;

const info = uuidApiKey.create();
expectType<ApiKeyInfo>(info);
expectType<string>(info.apiKey);
expectType<string>(info.uuid);

expectType<boolean>(uuidApiKey.isAPIKey(info.apiKey));
expectType<string>(uuidApiKey.toAPIKey(info.uuid));
expectType<string>(uuidApiKey.toAPIKey(info.uuid, { noDashes: true }));
expectType<string>(uuidApiKey.toUUID(info.apiKey));
expectType<boolean>(uuidApiKey.check(info.apiKey, info.uuid));
expectType<boolean>(uuidApiKey.checkDashes([8, 13, 18], info.uuid));

expectType<UUIDOptions>(uuidApiKey.defaultOptions);
