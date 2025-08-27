#!/usr/bin/env node

// Script to update version across all packages
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const VERSION_FILE = 'VERSION';
const PACKAGES = [
  'packages/core/package.json',
  'packages/react/package.json',
  'packages/components/package.json',
  'packages/export-utils/package.json'
];

function updateVersion(newVersion) {
  console.log(`🔄 Updating version to ${newVersion}...`);
  
  // Update VERSION file
  writeFileSync(VERSION_FILE, newVersion + '\n');
  console.log(`✅ Updated ${VERSION_FILE}`);
  
  // Update version.js
  const versionJsContent = `// SpecView version information
export const VERSION = '${newVersion}';
export const VERSION_MAJOR = ${newVersion.split('.')[0]};
export const VERSION_MINOR = ${newVersion.split('.')[1]};
export const VERSION_PATCH = ${newVersion.split('.')[2]};

// Version string for display
export const VERSION_STRING = \`v\${VERSION}\`;

// Build information
export const BUILD_INFO = {
  version: VERSION,
  buildDate: new Date().toISOString(),
  buildTime: Date.now()
};

// Default export
export default {
  VERSION,
  VERSION_MAJOR,
  VERSION_MINOR,
  VERSION_PATCH,
  VERSION_STRING,
  BUILD_INFO
};
`;
  writeFileSync('version.js', versionJsContent);
  console.log(`✅ Updated version.js`);
  
  // Update version.ts
  const versionTsContent = `// SpecView version information
export const VERSION = '${newVersion}' as const;
export const VERSION_MAJOR = ${newVersion.split('.')[0]};
export const VERSION_MINOR = ${newVersion.split('.')[1]};
export const VERSION_PATCH = ${newVersion.split('.')[2]};

// Version string for display
export const VERSION_STRING = \`v\${VERSION}\`;

// Build information interface
export interface BuildInfo {
  version: string;
  buildDate: string;
  buildTime: number;
}

// Build information
export const BUILD_INFO: BuildInfo = {
  version: VERSION,
  buildDate: new Date().toISOString(),
  buildTime: Date.now()
};

// Version object interface
export interface VersionInfo {
  VERSION: string;
  VERSION_MAJOR: number;
  VERSION_MINOR: number;
  VERSION_PATCH: number;
  VERSION_STRING: string;
  BUILD_INFO: BuildInfo;
}

// Default export
const versionInfo: VersionInfo = {
  VERSION,
  VERSION_MAJOR,
  VERSION_MINOR,
  VERSION_PATCH,
  VERSION_STRING,
  BUILD_INFO
};

export default versionInfo;
`;
  writeFileSync('version.ts', versionTsContent);
  console.log(`✅ Updated version.ts`);
  
  // Update package.json files
  PACKAGES.forEach(pkgPath => {
    try {
      const pkgContent = JSON.parse(readFileSync(pkgPath, 'utf8'));
      pkgContent.version = newVersion;
      writeFileSync(pkgPath, JSON.stringify(pkgContent, null, 2) + '\n');
      console.log(`✅ Updated ${pkgPath}`);
    } catch (error) {
      console.warn(`⚠️  Could not update ${pkgPath}: ${error.message}`);
    }
  });
  
  console.log(`\n🎉 Version updated to ${newVersion} across all files!`);
  console.log(`\nNext steps:`);
  console.log(`1. Review the changes: git diff`);
  console.log(`2. Commit the version update: git add . && git commit -m "chore: bump version to ${newVersion}"`);
  console.log(`3. Build packages: npm run build`);
  console.log(`4. Publish packages: npm run publish:all`);
}

// Get version from command line argument
const newVersion = process.argv[2];

if (!newVersion) {
  console.error('❌ Please provide a version number');
  console.log('Usage: node scripts/update-version.js <version>');
  console.log('Example: node scripts/update-version.js 1.1.0');
  process.exit(1);
}

// Validate version format
if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
  console.error('❌ Invalid version format. Use semantic versioning (e.g., 1.0.0)');
  process.exit(1);
}

updateVersion(newVersion);
