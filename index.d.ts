export interface UUIDOptions {
  noDashes: boolean;
}

export interface ApiKeyInfo {
  uuid: string;
  apiKey: string;
}

declare class UUIDAPIKey {
  readonly defaultOptions: UUIDOptions;

  checkDashes(positions: number[], str: string): boolean;
  isUUID(uuid: string): boolean;
  isAPIKey(apiKey: string): boolean;
  toAPIKey(uuid: string, options?: Partial<UUIDOptions>): string;
  toUUID(apiKey: string): string;
  check(apiKey: string, uuid: string): boolean;
  create(options?: Partial<UUIDOptions>): ApiKeyInfo;
}

declare const obj: UUIDAPIKey;
export default obj;
