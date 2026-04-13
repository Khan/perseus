#!/bin/bash
# SessionStart hook to ensure gh CLI and jq are installed.
# Installs missing tools via Homebrew or apt-get.

install_pkg() {
    local pkg="$1"
    echo "$pkg not found, installing..." >&2
    if command -v brew &>/dev/null; then
        if brew install "$pkg"; then
            echo "$pkg installed successfully." >&2
        else
            echo "{\"decision\": \"block\", \"reason\": \"Failed to install $pkg via Homebrew. Please install it manually: brew install $pkg\"}"
            exit 0
        fi
    elif command -v apt-get &>/dev/null; then
        if apt-get update && apt-get install -y "$pkg"; then
            echo "$pkg installed successfully." >&2
        else
            echo "{\"decision\": \"block\", \"reason\": \"Failed to install $pkg via apt-get. Please install it manually.\"}"
            exit 0
        fi
    else
        echo "{\"decision\": \"block\", \"reason\": \"No supported package manager found (brew or apt-get). Please install $pkg manually.\"}"
        exit 0
    fi
}

command -v gh &>/dev/null || install_pkg gh
command -v jq &>/dev/null || install_pkg jq
