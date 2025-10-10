import * as migration_20251010_200854 from './20251010_200854';

export const migrations = [
  {
    up: migration_20251010_200854.up,
    down: migration_20251010_200854.down,
    name: '20251010_200854'
  },
];
