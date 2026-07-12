# Setup

This public demo is static.

## Option 1: Open Directly

Open:

```text
dashboard/index.html
```

## Option 2: Serve Locally

From the project root:

```powershell
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/dashboard/
```

## Load Sample Data

The dashboard has embedded fake data, but you can also load:

```text
sample-data/performance-snapshots.csv
```

using the `Load metrics CSV` button.

## Configure

Copy:

```text
.env.example
```

to:

```text
.env
```

Only the paid/pro version would use `.env` for real API automation.
