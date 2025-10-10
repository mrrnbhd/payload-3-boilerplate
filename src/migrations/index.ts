import * as migration_20251010_200854 from './20251010_200854';
import * as migration_20251010_201733 from './20251010_201733';

export const migrations = [
  {
    up: migration_20251010_200854.up,
    down: migration_20251010_200854.down,
    name: '20251010_200854',
  },
  {
    up: migration_20251010_201733.up,
    down: migration_20251010_201733.down,
    name: '20251010_201733'
  },
];
