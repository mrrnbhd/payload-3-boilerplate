import * as migration_20251030_144323 from './20251030_144323';
import * as migration_20251031_080402 from './20251031_080402';

export const migrations = [
  {
    up: migration_20251030_144323.up,
    down: migration_20251030_144323.down,
    name: '20251030_144323',
  },
  {
    up: migration_20251031_080402.up,
    down: migration_20251031_080402.down,
    name: '20251031_080402'
  },
];
