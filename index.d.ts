declare module 'uuid-apikey';

export interface UUIDOptions {
  noDashes: boolean;
}

export interface ApiKeyInfo {
  uuid: string;
  apiKey: string;
}

export function checkDashes(positions: number[], str: string): boolean;
export function isUUID(uuid: string): boolean;
export function isAPIKey(apiKey: string): boolean;
export function toAPIKey(uuid: string, options?: Partial<UUIDOptions>): string;
export function toUUID(apiKey: string): string;
export function check(apiKey: string, uuid: string): boolean;
export function create(options?: Partial<UUIDOptions>): ApiKeyInfo;
