#!/usr/bin/env node

/**
 * Perseus Release Notes Reviewer
 * 
 * A comprehensive tool to review, analyze, and summarize release notes
 * from the Perseus repository.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ReleaseNotesReviewer {
    constructor() {
        this.repoPath = process.cwd();
        this.packagesPath = path.join(this.repoPath, 'packages');
        this.changelogFiles = this.findChangelogFiles();
        this.packages = this.getPackageNames();
    }

    /**
     * Find all CHANGELOG.md files in the repository
     */
    findChangelogFiles() {
        const changelogFiles = [];
        
        try {
            const output = execSync('find . -name "CHANGELOG.md" -type f', { 
                encoding: 'utf-8',
                cwd: this.repoPath 
            });
            
            return output.trim().split('\n').map(file => ({
                path: file,
                fullPath: path.join(this.repoPath, file),
                package: this.extractPackageName(file)
            }));
        } catch (error) {
            console.error('Error finding changelog files:', error.message);
            return [];
        }
    }

    /**
     * Extract package name from changelog path
     */
    extractPackageName(changelogPath) {
        const parts = changelogPath.split('/');
        if (parts.includes('packages')) {
            const packageIndex = parts.indexOf('packages') + 1;
            return parts[packageIndex];
        }
        return 'root';
    }

    /**
     * Get all package names from the packages directory
     */
    getPackageNames() {
        try {
            if (!fs.existsSync(this.packagesPath)) return [];
            
            return fs.readdirSync(this.packagesPath)
                .filter(name => {
                    const packagePath = path.join(this.packagesPath, name);
                    return fs.statSync(packagePath).isDirectory() && 
                           fs.existsSync(path.join(packagePath, 'package.json'));
                });
        } catch (error) {
            console.error('Error reading packages:', error.message);
            return [];
        }
    }

    /**
     * Parse a changelog file and extract releases
     */
    parseChangelog(changelogPath) {
        try {
            const content = fs.readFileSync(changelogPath, 'utf-8');
            const releases = [];
            const lines = content.split('\n');
            
            let currentRelease = null;
            let currentSection = null;
            let inSection = false;

            for (const line of lines) {
                // Match version headers like "## 1.2.3" or "## @khanacademy/package@1.2.3"
                const versionMatch = line.match(/^##\s+(?:@khanacademy\/\w+@)?(\d+\.\d+\.\d+(?:-\w+)?)/);
                if (versionMatch) {
                    if (currentRelease) {
                        releases.push(currentRelease);
                    }
                    currentRelease = {
                        version: versionMatch[1],
                        date: this.extractDateFromLine(line),
                        sections: {},
                        rawContent: []
                    };
                    currentSection = null;
                    inSection = false;
                    currentRelease.rawContent.push(line);
                    continue;
                }

                if (currentRelease) {
                    currentRelease.rawContent.push(line);
                    
                    // Match section headers like "### Major Changes", "### Minor Changes", etc.
                    const sectionMatch = line.match(/^###\s+(.+)/);
                    if (sectionMatch) {
                        currentSection = sectionMatch[1];
                        currentRelease.sections[currentSection] = [];
                        inSection = true;
                        continue;
                    }

                    // Collect content under sections
                    if (inSection && currentSection) {
                        if (line.startsWith('-   ') || line.startsWith('*   ')) {
                            currentRelease.sections[currentSection].push({
                                type: 'change',
                                content: line.trim(),
                                description: this.extractChangeDescription(line),
                                prNumber: this.extractPRNumber(line),
                                commit: this.extractCommitHash(line),
                                author: this.extractAuthor(line)
                            });
                        } else if ((line.startsWith('-') || line.startsWith('*')) && line.trim() !== '-' && line.trim() !== '*') {
                            // Handle dependency updates and other list items
                            currentRelease.sections[currentSection].push({
                                type: 'dependency',
                                content: line.trim()
                            });
                        }
                        // Continue collecting until we hit a new section or version
                    }
                }
            }

            if (currentRelease) {
                releases.push(currentRelease);
            }

            return releases;
        } catch (error) {
            console.error(`Error parsing changelog ${changelogPath}:`, error.message);
            return [];
        }
    }

    /**
     * Extract date from version line (if present)
     */
    extractDateFromLine(line) {
        const dateMatch = line.match(/\((\d{4}-\d{2}-\d{2})\)/);
        return dateMatch ? dateMatch[1] : null;
    }

    /**
     * Extract PR number from changelog entry
     */
    extractPRNumber(line) {
        const prMatch = line.match(/\[#(\d+)\]/);
        return prMatch ? parseInt(prMatch[1]) : null;
    }

    /**
     * Extract commit hash from changelog entry
     */
    extractCommitHash(line) {
        const commitMatch = line.match(/\[`([a-f0-9]+)`\]/);
        return commitMatch ? commitMatch[1] : null;
    }

    /**
     * Extract author from changelog entry
     */
    extractAuthor(line) {
        const authorMatch = line.match(/Thanks \[@(\w+)\]/);
        return authorMatch ? authorMatch[1] : null;
    }

    /**
     * Clean change content by removing markdown formatting and extracting description
     */
    extractChangeDescription(line) {
        // Remove the leading bullet point and spacing
        let content = line.replace(/^[\*\-]\s+/, '');
        
        // Extract the description after the author attribution
        const descMatch = content.match(/!\s*-\s*(.+)$/);
        if (descMatch) {
            return descMatch[1].trim();
        }
        
        // Fallback: return the cleaned content
        return content.trim();
    }

    /**
     * Get all releases from all packages
     */
    getAllReleases() {
        const allReleases = {};
        
        for (const changelogFile of this.changelogFiles) {
            const releases = this.parseChangelog(changelogFile.fullPath);
            allReleases[changelogFile.package] = releases;
        }
        
        return allReleases;
    }

    /**
     * Get releases for a specific package
     */
    getPackageReleases(packageName) {
        const changelogFile = this.changelogFiles.find(f => f.package === packageName);
        if (!changelogFile) {
            throw new Error(`No changelog found for package: ${packageName}`);
        }
        
        return this.parseChangelog(changelogFile.fullPath);
    }

    /**
     * Get recent releases across all packages
     */
    getRecentReleases(limit = 10) {
        const allReleases = this.getAllReleases();
        const flatReleases = [];

        for (const [packageName, releases] of Object.entries(allReleases)) {
            for (const release of releases.slice(0, limit)) {
                flatReleases.push({
                    package: packageName,
                    ...release
                });
            }
        }

        // Sort by version number (approximation)
        flatReleases.sort((a, b) => {
            const aVersion = a.version.split('.').map(n => parseInt(n));
            const bVersion = b.version.split('.').map(n => parseInt(n));
            
            for (let i = 0; i < Math.max(aVersion.length, bVersion.length); i++) {
                const aN = aVersion[i] || 0;
                const bN = bVersion[i] || 0;
                if (aN !== bN) return bN - aN; // Descending order
            }
            return 0;
        });

        return flatReleases.slice(0, limit);
    }

    /**
     * Search releases for specific content
     */
    searchReleases(query, packageName = null) {
        const releases = packageName ? 
            { [packageName]: this.getPackageReleases(packageName) } :
            this.getAllReleases();
        
        const results = [];
        const queryLower = query.toLowerCase();

        for (const [pkg, pkgReleases] of Object.entries(releases)) {
            for (const release of pkgReleases) {
                const matches = [];
                
                // Search in version
                if (release.version.toLowerCase().includes(queryLower)) {
                    matches.push({ type: 'version', content: release.version });
                }
                
                // Search in sections
                for (const [sectionName, sectionContent] of Object.entries(release.sections)) {
                    if (sectionName.toLowerCase().includes(queryLower)) {
                        matches.push({ type: 'section', content: sectionName });
                    }
                    
                    for (const item of sectionContent) {
                        if (item.content.toLowerCase().includes(queryLower)) {
                            matches.push({ type: 'change', content: item.content });
                        }
                    }
                }

                if (matches.length > 0) {
                    results.push({
                        package: pkg,
                        version: release.version,
                        date: release.date,
                        matches
                    });
                }
            }
        }

        return results;
    }

    /**
     * Generate a summary of recent releases
     */
    generateSummary(limit = 5) {
        const recentReleases = this.getRecentReleases(limit);
        const summary = {
            totalReleases: recentReleases.length,
            packages: new Set(recentReleases.map(r => r.package)).size,
            majorChanges: 0,
            minorChanges: 0,
            patchChanges: 0,
            releases: recentReleases.map(release => {
                const majorChanges = release.sections['Major Changes'] || [];
                const minorChanges = release.sections['Minor Changes'] || [];
                const patchChanges = release.sections['Patch Changes'] || [];
                
                return {
                    package: release.package,
                    version: release.version,
                    date: release.date,
                    majorChanges: majorChanges.length,
                    minorChanges: minorChanges.length,
                    patchChanges: patchChanges.length,
                    authors: [
                        ...new Set([
                            ...majorChanges.map(c => c.author).filter(Boolean),
                            ...minorChanges.map(c => c.author).filter(Boolean),
                            ...patchChanges.map(c => c.author).filter(Boolean)
                        ])
                    ]
                };
            })
        };

        summary.majorChanges = summary.releases.reduce((sum, r) => sum + r.majorChanges, 0);
        summary.minorChanges = summary.releases.reduce((sum, r) => sum + r.minorChanges, 0);
        summary.patchChanges = summary.releases.reduce((sum, r) => sum + r.patchChanges, 0);

        return summary;
    }

    /**
     * Print a formatted release
     */
    printRelease(release, packageName = '') {
        console.log(`\n=== ${packageName}@${release.version} ${release.date || ''} ===`);
        
        for (const [sectionName, sectionContent] of Object.entries(release.sections)) {
            if (sectionContent.length === 0) continue;
            
            console.log(`\n${sectionName}:`);
            for (const item of sectionContent) {
                if (item.type === 'change') {
                    const desc = item.description || item.content;
                    console.log(`  • ${desc}`);
                    if (item.author || item.prNumber) {
                        const details = [];
                        if (item.author) details.push(`@${item.author}`);
                        if (item.prNumber) details.push(`#${item.prNumber}`);
                        console.log(`    (${details.join(', ')})`);
                    }
                } else if (item.type === 'dependency') {
                    // Skip dependency updates for cleaner output unless they contain package names
                    if (item.content.includes('@khanacademy/')) {
                        console.log(`  ${item.content}`);
                    }
                }
            }
        }
    }

    /**
     * Print summary information
     */
    printSummary(limit = 5) {
        const summary = this.generateSummary(limit);
        
        console.log(`\n=== Perseus Release Summary (Last ${limit} releases) ===`);
        console.log(`Total Releases: ${summary.totalReleases}`);
        console.log(`Packages: ${summary.packages}`);
        console.log(`Changes: ${summary.majorChanges} major, ${summary.minorChanges} minor, ${summary.patchChanges} patch`);
        console.log(`\nRecent Releases:`);
        
        for (const release of summary.releases) {
            console.log(`  ${release.package}@${release.version} (${release.date || 'no date'})`);
            console.log(`    Changes: ${release.majorChanges}M, ${release.minorChanges}m, ${release.patchChanges}p`);
            if (release.authors.length > 0) {
                console.log(`    Authors: ${release.authors.join(', ')}`);
            }
        }
    }
}

// CLI interface
if (require.main === module) {
    const reviewer = new ReleaseNotesReviewer();
    const args = process.argv.slice(2);
    const command = args[0];

    try {
        switch (command) {
            case 'list':
                console.log('Available packages:');
                reviewer.packages.forEach(pkg => console.log(`  - ${pkg}`));
                break;

            case 'recent':
                const limit = parseInt(args[1]) || 5;
                reviewer.printSummary(limit);
                break;

            case 'package':
                const packageName = args[1];
                if (!packageName) {
                    console.error('Usage: node release-notes-reviewer.js package <package-name> [limit]');
                    process.exit(1);
                }
                const packageLimit = parseInt(args[2]) || 3;
                const releases = reviewer.getPackageReleases(packageName);
                console.log(`\n=== ${packageName} Releases (Latest ${packageLimit}) ===`);
                for (const release of releases.slice(0, packageLimit)) {
                    reviewer.printRelease(release, packageName);
                }
                break;

            case 'search':
                const query = args[1];
                if (!query) {
                    console.error('Usage: node release-notes-reviewer.js search <query> [package]');
                    process.exit(1);
                }
                const searchPackage = args[2];
                const results = reviewer.searchReleases(query, searchPackage);
                console.log(`\n=== Search Results for "${query}" ===`);
                if (results.length === 0) {
                    console.log('No matches found.');
                } else {
                    for (const result of results) {
                        console.log(`\n${result.package}@${result.version}:`);
                        for (const match of result.matches) {
                            console.log(`  ${match.type}: ${match.content}`);
                        }
                    }
                }
                break;

            case 'help':
            default:
                console.log(`
Perseus Release Notes Reviewer

Usage:
  node release-notes-reviewer.js <command> [options]

Commands:
  list                           List all available packages
  recent [limit]                 Show summary of recent releases (default: 5)
  package <name> [limit]         Show releases for specific package (default: 3)
  search <query> [package]       Search for specific content in releases
  help                           Show this help message

Examples:
  node release-notes-reviewer.js recent 10
  node release-notes-reviewer.js package perseus 5
  node release-notes-reviewer.js search "radio widget"
  node release-notes-reviewer.js search "bug fix" perseus
                `);
                break;
        }
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

module.exports = ReleaseNotesReviewer;