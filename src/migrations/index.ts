import * as migration_20251015_011008 from './20251015_011008';
import * as migration_20251016_021420 from './20251016_021420';

export const migrations = [
  {
    up: migration_20251015_011008.up,
    down: migration_20251015_011008.down,
    name: '20251015_011008',
  },
  {
    up: migration_20251016_021420.up,
    down: migration_20251016_021420.down,
    name: '20251016_021420'
  },
];
