# Troubleshooting

## Dashboard Opens But Looks Empty

Use the reset button to restore embedded demo data.

## CSV Upload Does Not Work

Make sure the CSV includes these columns:

```text
snapshot_date,id,views,likes,comments,subscribers_gained,avg_percent_viewed
```

Extra columns are allowed.

## Browser Blocks Local Files

Serve the project locally:

```powershell
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/dashboard/
```

## The Data Looks Fake

Correct. This public demo intentionally uses synthetic data only.
