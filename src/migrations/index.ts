import * as migration_20251030_105759 from './20251030_105759';
import * as migration_20251030_131448 from './20251030_131448';
import * as migration_20251030_131602 from './20251030_131602';

export const migrations = [
  {
    up: migration_20251030_105759.up,
    down: migration_20251030_105759.down,
    name: '20251030_105759',
  },
  {
    up: migration_20251030_131448.up,
    down: migration_20251030_131448.down,
    name: '20251030_131448',
  },
  {
    up: migration_20251030_131602.up,
    down: migration_20251030_131602.down,
    name: '20251030_131602'
  },
];
