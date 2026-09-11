---
# Khan/perseus reviewer configuration, merged into the shared review workflow
# (Khan/actions/workflows/review/review.md) at COMPILE time via its `imports:` field.
# Only this frontmatter is merged; the markdown body below is ignored.
#
# This file owns the `add-reviewer` safe output, and it is defined ONLY here (never
# in review.md): gh-aw lets the main workflow override an imported safe-output of the
# same type, so defining it there would silently drop this config.
#
# Reviewer requests are effectively inert for perseus, and the allowlist below is a
# safety bound, not a routing choice. Perseus does not use Gerald: there is no
# `.github/REVIEWERS` for the reviewer-mapper to read, so in practice the bot has no
# owners to request. `.github/CODEOWNERS` already auto-requests @Khan/perseus on
# every PR natively via GitHub, so a bot request would only ever duplicate that.
#
# The allowlist still matters: in gh-aw an ABSENT `allowed-team-reviewers` means any
# reviewer the agent names is accepted, not none. Since the agent reads untrusted PR
# content, `[perseus]` caps what a prompt-injected request could do to one harmless
# duplicate ping. Do not remove the key to "turn requests off"; that widens it.
#
# To turn real requests on later: add a `.github/REVIEWERS` file naming the owning
# teams, list those team slugs here, and make sure each has at least push access to
# this repo (GitHub silently drops a reviewer request for a team without access).
safe-outputs:
  add-reviewer:
    allowed-team-reviewers: [perseus]
    target: "triggering"
    max: 10
    github-token: ${{ secrets.KHAN_ACTIONS_BOT_TOKEN }}
---
