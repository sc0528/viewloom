# Security

This public demo is designed to be safe to publish.

## Do Not Commit

- `.env`
- OAuth client secret files
- OAuth token files
- API keys
- refresh tokens
- logs with real account data
- private screenshots
- real channel exports
- internal network hostnames
- private IP addresses

## Required Checks Before Publishing

Run this from the project root:

```powershell
rg -n "192\.168\.|10\.|172\.|gmail|token|secret|client_secret|refresh_token|password|private|ssh|api_key|oauth|stuar|proxcee"
```

Every match must be reviewed.

## Demo Data Rule

Public sample data must be fake.

Do not use real:

- channel IDs
- video IDs
- analytics snapshots
- subscriber counts
- upload metadata
- internal URLs

## User Credentials

If this becomes a paid pack, users should create and own their own Google OAuth credentials.

Do not ship shared credentials.
