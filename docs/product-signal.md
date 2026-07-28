# Product Signal dashboard

Viewloom appears in the shared Product Signal Portfolio at:

`https://sc0528.github.io/hearthsignal/analytics-dashboard/?product=viewloom`

The original Viewloom Product Signal URL redirects to this combined dashboard.
Use the product switch at the top to move between Viewloom and HearthSignal.
Viewloom's repository continues to collect and publish its own data independently.

The `Refresh and deploy Viewloom` workflow captures data once daily at 9:30 AM
America/New_York and can also be run manually. Two UTC schedule entries plus a
timezone gate keep the local capture time stable across daylight-saving changes.

The workflow uses an optional `ANALYTICS_TOKEN` repository secret, falling back
to the repository-scoped `GITHUB_TOKEN`. GitHub may require a fine-grained token
with read-only **Administration** access for traffic views, clones, paths, and
referrers. Missing permission is reported on the dashboard; it never produces
invented or unlabeled traffic values.

The dashboard stores aggregate repository metrics only. It does not collect
visitor identities, IP addresses, creator account data, OAuth credentials, or
private home-lab details.
