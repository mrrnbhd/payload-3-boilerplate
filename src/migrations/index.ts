import * as migration_20251029_034047 from './20251029_034047';
import * as migration_20251030_011049 from './20251030_011049';
import * as migration_20251030_012745 from './20251030_012745';
import * as migration_20251030_013703 from './20251030_013703';
import * as migration_20251030_054402 from './20251030_054402';

export const migrations = [
  {
    up: migration_20251029_034047.up,
    down: migration_20251029_034047.down,
    name: '20251029_034047',
  },
  {
    up: migration_20251030_011049.up,
    down: migration_20251030_011049.down,
    name: '20251030_011049',
  },
  {
    up: migration_20251030_012745.up,
    down: migration_20251030_012745.down,
    name: '20251030_012745',
  },
  {
    up: migration_20251030_013703.up,
    down: migration_20251030_013703.down,
    name: '20251030_013703',
  },
  {
    up: migration_20251030_054402.up,
    down: migration_20251030_054402.down,
    name: '20251030_054402'
  },
];
