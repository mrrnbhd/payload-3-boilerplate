import * as migration_20251029_034047 from './20251029_034047';
import * as migration_20251030_011049 from './20251030_011049';
import * as migration_20251030_012745 from './20251030_012745';
import * as migration_20251030_013703 from './20251030_013703';
import * as migration_20251030_054402 from './20251030_054402';
import * as migration_20251030_054855 from './20251030_054855';
import * as migration_20251030_054958 from './20251030_054958';
import * as migration_20251030_055104 from './20251030_055104';
import * as migration_20251030_072918 from './20251030_072918';

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
    name: '20251030_054402',
  },
  {
    up: migration_20251030_054855.up,
    down: migration_20251030_054855.down,
    name: '20251030_054855',
  },
  {
    up: migration_20251030_054958.up,
    down: migration_20251030_054958.down,
    name: '20251030_054958',
  },
  {
    up: migration_20251030_055104.up,
    down: migration_20251030_055104.down,
    name: '20251030_055104',
  },
  {
    up: migration_20251030_072918.up,
    down: migration_20251030_072918.down,
    name: '20251030_072918'
  },
];
