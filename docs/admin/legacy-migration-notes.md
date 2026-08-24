---
sidebar_position: 5
---

# Legacy Migration Notes

When your old app's data is brought into this new system, a few things can't be copied over exactly as they were — either because the old app never recorded that information at all, or because a decision has to be made about how to handle it safely. This page lists every one of those decisions in plain language.

We recommend reading through this page **before** you start your [Legacy Data Migration](./legacy-data-migration.md), as a precaution — so you know what to expect going in. It also works as a reference afterward: if something in your migrated data looks different from what you remember in the old app, check here first — no need to contact support for these.

:::warning Don't use the old admin panel's System Updater for version 3.0.0 and above
Version 3.0.0 is the new Laravel-based admin panel, not a regular CodeIgniter update — the old panel's built-in System Updater can't perform this switch. Use the [Legacy Data Migration](./legacy-data-migration.md) tool instead.
:::
:::warning Recommended: set this up on a separate subdomain
If you already have Elite Quiz live and in use, don't run your first migration attempt directly on your production setup. Since [Legacy Data Migration](./legacy-data-migration.md) is a one-time, irreversible action, we recommend setting it up first on a **separate subdomain with a separate, new database**.

This isn't just for testing — once you've confirmed everything looks right, you can keep using this same subdomain going forward as your permanent **Admin Panel and backend API URL** for both your App and Web, for example:

```
https://sub_domain.main_domain.com/api
```

Since a purchase code can only be activated on one installation at a time, setting this up on a new subdomain will require an active purchase code. If yours is already in use on your production installation, **reset it at [wrteam.in/reset-purchase-code](https://www.wrteam.in/reset-purchase-code) using your CodeCanyon username and purchase code**, then use it to activate this new installation.

:::

## Before You Migrate

Every one of the items below was a deliberate decision, not an oversight — each had no lasting value to migrate, or migrating it wasn't possible without guessing at data the old app never actually recorded. Knowing about them **before** you take your backup lets you plan around them (e.g. avoiding taking your backup while a lot of users have activity in progress):

- **Mid-session attempts left unfinished at backup time** — a Quiz Zone, Audio, Math, Guess The Word, Multi Match, Fun & Learn, Daily Quiz, True/False, or Contest attempt that was still in progress (not submitted) when the backup was taken. Only completed attempts carry over; an in-progress one has no equivalent "resume" concept in the new app.
- **Battle rooms still waiting or mid-game at backup time** — the room itself and its live question state. Only battles that had already concluded were imported (as lifetime win/loss/played counts — see [Battles](#battles) below).
- **Old admin login accounts** — a separate concern from your app's users; admin access for this panel is managed fresh here, not carried over from the old system.
- **A month/weekday name lookup table** the old app stored in the database — this app computes that itself, nothing was lost by leaving it out.

## After Migration

Once your migration is complete, use the sections below as a reference — if something in your migrated data looks different from what you remember in the old app, check here first. No need to contact support for these.

### Accounts & Login

- If the same email had multiple accounts in the old app, only the most recently created one was kept — the older duplicates were not imported.
- Accounts with a blank or invalid email were imported without an email on file (instead of making one up), since blank emails can't be treated as real values.
- A small number of very old accounts that signed up through a login method no longer supported by this app (anything other than Google, Email/Password, Apple, or Mobile) were not imported.
- If any account shows a negative coin balance from the old app (a known old-app bug), it was reset to 0 rather than imported as negative.

### Coins & Wallet History

- The old app didn't keep a clean, ordered history of every coin change — this was rebuilt by working backwards from each user's current coin balance, so their final balance is always accurate, but the running balance shown on very old individual entries is a best-effort reconstruction, not a guaranteed exact record.
- The old app didn't always label what a coin change was for in a consistent way. Where the reason was recognizable (e.g. quiz win, badge reward, battle entry) it was labelled accordingly; anything unrecognizable was labelled as an "Admin" adjustment, with the original old-app text kept in the entry's notes so nothing is lost.
- This wallet-history rebuild only ever runs once — if it's already been done, running it again is automatically skipped rather than risk double-counting.

### Leaderboard

- The old app tracked "today's score" and "this month's score" as two separate running totals. These were combined carefully so historical scores are not double-counted in the all-time leaderboard.
- A score reduction from the old app now correctly appears as a deduction, instead of being skipped.

### Categories & Questions

- Quiz Zone, Audio, Math, Guess The Word, Multi Match, and Fun & Learn questions were all imported, matched back to their original category and (where applicable) level.
- If two categories would have ended up with the same web address (slug), a number was automatically appended to keep them unique — this doesn't affect the category name shown to users.
- AI-generated question bank entries were matched back to their correct category, contest, or exam as appropriate.

### Daily Quiz, Contests & Exams

- Daily quizzes, contests (with prizes and leaderboard), and exam modules (with their questions) were all imported.
- Old exam results only carried over as a final score and a breakdown by question-value (e.g. "got 4 out of 5 two-mark questions right") — the old app never recorded exactly which option a user picked on each question, so a full question-by-question review isn't available for exams taken before the migration. New exams taken from now on don't have this limitation.
- An old exam session that was left in-progress (never finished) was not imported — there was no reliable way to resume it safely in the new system.

### Battles

- Past One vs One / Random battle results were imported as lifetime win/loss/played counts.
- The old app didn't have a Group Battle mode, so there's no historical Group Battle history to bring over — that starts fresh from today for every user.
- Any battle room that was still in progress at the time of the backup (waiting for players or mid-game) was not imported — only completed, finished battles carried over.

### Quiz Statistics

- Your old app kept one combined lifetime score (questions answered, correct answers) per user. That's now carried over as their Quiz Zone lifetime stats, since Quiz Zone was the only mode the old app tracked this way.
- Multi Match, Guess The Word, Math, and Audio lifetime stats aren't in the old data at all — those start fresh from today and build up as each user plays going forward.
- The old app's "strongest category", "weakest category", and "best rank" figures don't have an equivalent in the new stats and weren't carried over — there was no reliable way to preserve them in the new per-game-mode shape.

### Badges, Payment Requests, In-App Purchases & Question Reports

- Every badge a user had already unlocked in the old app carries over. Any coin reward tied to a badge still needs to be claimed again in the new app (this matches how new badge rewards already work — nothing is being taken away, it just needs the same one-time claim tap).
- Old payment/withdrawal requests were imported under a single, inactive "Legacy Payment Method" entry on your Payment Methods page, since your old app may have used different payment providers (PayPal, Paytm, UPI, etc.) that don't map cleanly to one method. It's inactive so it can never be picked for a new request — it exists only to anchor this old data. The original payment provider and details you or the user entered back then are preserved in each request's notes.
- Old in-app (Google Play / App Store) purchases carry over as completed purchases. Worth knowing: the old app never checked back with Google/Apple after a purchase was granted, so if a customer got a refund through the store itself, the old records (and now the migrated ones) still show it as granted — that was already true before migration, not something introduced by it.
- Old question reports were imported and marked as already reviewed ("Dismissed"), since they're historical — none of them need fresh attention in your reports queue.
