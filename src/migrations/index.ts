import * as migration_20251017_020408 from './20251017_020408';

export const migrations = [
  {
    up: migration_20251017_020408.up,
    down: migration_20251017_020408.down,
    name: '20251017_020408'
  },
];
