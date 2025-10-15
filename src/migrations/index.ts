import * as migration_20251015_011008 from './20251015_011008';

export const migrations = [
  {
    up: migration_20251015_011008.up,
    down: migration_20251015_011008.down,
    name: '20251015_011008'
  },
];
