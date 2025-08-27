# Changelog

All notable changes to SpecView will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-08-27

### Added
- **Version Management System**: Added centralized version tracking with `VERSION`, `version.js`, and `version.ts` files
- **Automated Version Updates**: Created `scripts/update-version.js` for easy version management across all packages
- **Favicon**: Added custom favicon for the demo app with SpecView branding
- **Enhanced Documentation**: Updated README with version management instructions and improved getting started guide
- **Tailwind Styling**: Enhanced component styling with modern Tailwind CSS classes
- **Package Index Files**: Added proper index.ts exports for better module organization

### Changed
- **Package Names**: Updated from `@specview/*` to `@meirm/specview-*` for proper npm publishing
- **Parameter Names**: Refactored from domain-specific names (`targetMsisdn`, `investigationId`, `caseId`) to generic names (`entityId`, `contextId`, `sessionId`)
- **Component Styling**: Improved visual design of SelfDescribingComponents with better UI/UX
- **Build Process**: Enhanced TypeScript configuration and build scripts

### Fixed
- **TypeScript Errors**: Resolved compilation issues with proper type definitions
- **Import Paths**: Fixed module resolution in monorepo structure
- **Browser Compatibility**: Replaced SQLite with in-memory data store for better browser support

### Technical Improvements
- **Monorepo Structure**: Improved workspace configuration and package organization
- **Development Experience**: Added hot module reload and better development server configuration
- **Code Quality**: Enhanced TypeScript types and improved code documentation

## [1.0.0] - 2025-08-27

### Added
- **Core Framework**: Initial release of SpecView SelfDescribingComponents framework
- **React Integration**: `useSelfDescribing` hook and base components for React applications
- **Type Definitions**: Complete TypeScript interfaces for SelfDescribingOutput and ComponentMetadata
- **Demo Application**: Interactive candy shop demo showcasing SelfDescribingComponents
- **Export Utilities**: JSON export functionality with copy-to-clipboard support
- **Documentation**: Comprehensive README and HOWTO guide
- **Publishing**: Published packages to npm registry

### Features
- **Dual-Mode Components**: Visual and JSON output modes for human and AI consumption
- **AI-Ready Output**: Structured data format compatible with large language models
- **Metadata Tracking**: Automatic inclusion of timestamps, entity IDs, and context information
- **Export Capabilities**: Download JSON files or copy structured data to clipboard
- **Real-time Data**: Live data generation with refresh capabilities

---

## Version Management

To create a new release:

1. Update version: `npm run version:update <new-version>`
2. Review changes: `git diff`
3. Commit: `git add . && git commit -m "chore: bump version to <new-version>"`
4. Build: `npm run build`
5. Publish: `npm run publish:all`
6. Create GitHub release with changelog notes
