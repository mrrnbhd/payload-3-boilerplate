import * as migration_20251029_034047 from './20251029_034047';
import * as migration_20251030_011049 from './20251030_011049';

export const migrations = [
  {
    up: migration_20251029_034047.up,
    down: migration_20251029_034047.down,
    name: '20251029_034047',
  },
  {
    up: migration_20251030_011049.up,
    down: migration_20251030_011049.down,
    name: '20251030_011049'
  },
];
