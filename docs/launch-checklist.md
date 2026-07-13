# GitHub Launch Checklist

Use this checklist before promoting the public demo.

## Repository

- [x] Initialize Git and choose a clear public repository name.
- [x] Confirm the license matches the intended public demo and future paid-pack model.
- [x] Add a concise Viewloom repository description and relevant discovery topics.
- [x] Enable Issues and add a validation-focused issue template.
- [x] Publish a zero-install synthetic-data demo with GitHub Pages.
- [ ] Add a repository social preview after a sanitized dashboard screenshot is available.

## Safety and QA

- [ ] Run every check in `docs/security.md`.
- [ ] Confirm all CSV rows, URLs, IDs, track names, dates, and metrics are synthetic.
- [ ] Test `dashboard/` at desktop and mobile widths.
- [ ] Test navigation, CSV import, reset, and snapshot export.
- [ ] Verify the setup steps from a clean clone.
- [ ] Confirm no `.env`, token, OAuth, log, or private screenshot files are tracked.

## Validation

- [x] Choose one primary CTA: the creator feedback form.
- [x] Create a feedback form asking who the user is, how they track performance today, and what they would pay to automate.
- [x] Define a two-week validation window and record the pre-promotion baseline.
- [ ] Share only in communities where self-promotion is allowed.
- [ ] Decide the paid-pack threshold before launch, such as 25 qualified signups or 5 preorder commitments.

## Optional Commerce Test

- [ ] Publish a lightweight Lemon Squeezy or Gumroad interest page only after the primary CTA is chosen.
- [ ] Clearly label the product as planned or preorder-only.
- [ ] Describe the outcome and included assets without promising viral growth.
- [ ] Add refund, delivery-timing, and support expectations before accepting payment.

## Launch Day

- [ ] Open the public demo link in a signed-out browser.
- [ ] Check README links and the dashboard screenshot.
- [ ] Publish the first validation post with one audience, one problem, and one CTA.
- [ ] Record the launch date and baseline metrics in `docs/product-validation.md`.
