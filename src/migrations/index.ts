import * as migration_20251030_144323 from './20251030_144323';

export const migrations = [
  {
    up: migration_20251030_144323.up,
    down: migration_20251030_144323.down,
    name: '20251030_144323'
  },
];
