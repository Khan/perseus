#!/bin/sh

# Prints a null-separated list of files changed since the commit referred to by
# $UPSTREAM, or since the current branch's upstream if $UPSTREAM is empty or
# not set. Untracked files are included.

# FIXME: print an error message and exit if $UPSTREAM is empty or not set and
#  the current branch has no upstream.

# FIXME: find a simpler way of listing all untracked files, if possible
git status -uall --porcelain | grep '^?? ' | sed -e 's/^?? //' | tr '\n' '\0'
git diff -z --name-only --diff-filter=ACMRTUB "${UPSTREAM:-"@{u}"}"
