import * as migration_20251030_105759 from './20251030_105759'

export const migrations = [
  {
    up: migration_20251030_105759.up,
    down: migration_20251030_105759.down,
    name: '20251030_105759',
  },
]
