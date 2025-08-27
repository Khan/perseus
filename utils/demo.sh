#!/bin/bash

# Perseus Release Notes Reviewer Demo
# This script demonstrates the capabilities of the release notes reviewer tool

echo "🚀 Perseus Release Notes Reviewer Demo"
echo "======================================"
echo

# Check if we're in the right directory
if [ ! -f "utils/release-notes-reviewer.js" ]; then
    echo "❌ Error: Please run this script from the Perseus repository root"
    echo "   Current directory: $(pwd)"
    echo "   Expected: release-notes-reviewer.js should be in utils/"
    exit 1
fi

echo "✅ Found release notes reviewer tool"
echo

# Show available packages
echo "📦 Available Packages:"
echo "---------------------"
node utils/release-notes-reviewer.js list
echo

# Show recent releases summary
echo "📊 Recent Release Activity (Last 5 releases):"
echo "---------------------------------------------"
node utils/release-notes-reviewer.js recent 5
echo

# Show specific package releases
echo "📋 Latest Perseus Core Package Releases:"
echo "---------------------------------------"
node utils/release-notes-reviewer.js package perseus-core 2
echo

# Demonstrate search functionality
echo "🔍 Search Demo - All Radio Widget Changes:"
echo "-----------------------------------------"
node utils/release-notes-reviewer.js search "radio" | head -20
if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "... (truncated for demo, use full command for complete results)"
fi
echo

echo "🔍 Search Demo - Interactive Graph Features:"
echo "-------------------------------------------"
node utils/release-notes-reviewer.js search "interactive graph" | head -15
if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "... (truncated for demo)"
fi
echo

echo "🔍 Search Demo - Accessibility Improvements:"
echo "-------------------------------------------"
node utils/release-notes-reviewer.js search "accessibility" | head -15
if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "... (truncated for demo)"
fi
echo

# Show usage examples
echo "💡 Usage Examples:"
echo "-----------------"
echo "# Get help:"
echo "node utils/release-notes-reviewer.js help"
echo
echo "# List all packages:"
echo "node utils/release-notes-reviewer.js list"
echo
echo "# Show recent releases (default 5):"
echo "node utils/release-notes-reviewer.js recent"
echo "node utils/release-notes-reviewer.js recent 10"
echo
echo "# Show package-specific releases:"
echo "node utils/release-notes-reviewer.js package perseus 3"
echo "node utils/release-notes-reviewer.js package math-input 5"
echo
echo "# Search across all packages:"
echo "node utils/release-notes-reviewer.js search \"bug fix\""
echo "node utils/release-notes-reviewer.js search \"breaking change\""
echo
echo "# Search within specific package:"
echo "node utils/release-notes-reviewer.js search \"widget\" perseus"
echo "node utils/release-notes-reviewer.js search \"storybook\" perseus-editor"
echo

echo "🌐 Web Interface:"
echo "----------------"
echo "Open utils/release-notes-viewer.html in your browser for a graphical interface"
echo

echo "📚 Documentation:"
echo "----------------"
echo "See utils/README.md for complete documentation and advanced usage"
echo

echo "✨ Demo Complete!"
echo "================"
echo "The Perseus Release Notes Reviewer is ready to help you explore"
echo "the rich history of changes across all Perseus packages."
echo