# YouTube API Notes

The public demo does not connect to the YouTube API.

The paid/pro version may include a helper that:

- uses user-owned OAuth credentials
- pulls public video statistics
- pulls available YouTube Analytics API metrics
- writes daily CSV snapshots
- never stores credentials in the repository

## Why The Public Demo Is Offline

Offline fake data makes the public project:

- safer to publish
- easier to demo
- easier to test
- independent from Google OAuth setup

## Possible Pro Workflow

1. User creates a Google Cloud project.
2. User enables YouTube Data API and YouTube Analytics API.
3. User creates a Desktop OAuth client.
4. User stores the downloaded JSON in `secrets/`.
5. User runs the refresh script locally.
6. Script writes daily rows to `sample-data/performance-snapshots.csv` or a configured data path.
