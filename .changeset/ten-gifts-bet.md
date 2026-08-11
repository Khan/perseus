---
"@khanacademy/perseus-editor": patch
---

Log a one-time console hint when a preview controller mounts, giving a
paste-able snippet for watching messages cross the preview bridge. The bridge is
otherwise invisible, so a preview that looks stuck can't be told apart from one
whose messages are being ignored.
