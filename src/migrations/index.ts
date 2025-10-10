import * as migration_20251010_194810 from './20251010_194810';

export const migrations = [
  {
    up: migration_20251010_194810.up,
    down: migration_20251010_194810.down,
    name: '20251010_194810'
  },
];
