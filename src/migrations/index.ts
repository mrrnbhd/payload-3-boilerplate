import * as migration_20251029_005831 from './20251029_005831';
import * as migration_20251029_033653 from './20251029_033653';

export const migrations = [
  {
    up: migration_20251029_005831.up,
    down: migration_20251029_005831.down,
    name: '20251029_005831',
  },
  {
    up: migration_20251029_033653.up,
    down: migration_20251029_033653.down,
    name: '20251029_033653'
  },
];
