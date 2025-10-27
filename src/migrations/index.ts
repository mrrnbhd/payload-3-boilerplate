import * as migration_20251026_233842_uploads_to_files from './20251026_233842_uploads_to_files';

export const migrations = [
  {
    up: migration_20251026_233842_uploads_to_files.up,
    down: migration_20251026_233842_uploads_to_files.down,
    name: '20251026_233842_uploads_to_files'
  },
];
