# 📦 Publishing SpecView Packages

A complete guide to publishing SpecView packages to npm.

---

## 🚀 Quick Publish

### 1. Build All Packages
```bash
npm run build
```

### 2. Publish All Packages
```bash
npm run publish:all
```

---

## 📋 Prerequisites

### 1. npm Account Setup
```bash
# Login to npm
npm login

# Verify you're logged in
npm whoami
```

### 2. Create npm Organization (Optional)
```bash
# Create @specview organization
npm org create specview

# Add yourself as owner
npm org add specview your-username owner
```

### 3. Install Dependencies
```bash
# Install workspace dependencies
npm install
```

---

## 🏗️ Package Structure

```
specview/
├── package.json              # Root monorepo config
├── packages/
│   ├── core/
│   │   ├── package.json      # @specview/core
│   │   ├── index.ts          # Main exports
│   │   ├── selfDescribing.ts # Core types
│   │   └── tsconfig.json     # Build config
│   └── react/
│       ├── package.json      # @specview/react
│       ├── index.ts          # Main exports
│       ├── useSelfDescribing.ts # React hooks
│       └── tsconfig.json     # Build config
```

---

## 🔧 Build Process

### 1. Clean Previous Builds
```bash
npm run clean
```

### 2. Build All Packages
```bash
npm run build
```

### 3. Verify Build Output
```bash
# Check core package
ls packages/core/dist/

# Check react package
ls packages/react/dist/
```

Expected output:
```
packages/core/dist/
├── index.js
├── index.d.ts
└── selfDescribing.d.ts

packages/react/dist/
├── index.js
├── index.d.ts
└── useSelfDescribing.d.ts
```

---

## 📤 Publishing Process

### Option 1: Publish All Packages
```bash
npm run publish:all
```

### Option 2: Publish Individual Packages
```bash
# Publish core package first
npm run publish:core

# Then publish react package
npm run publish:react
```

### Option 3: Manual Publishing
```bash
# Navigate to package directory
cd packages/core

# Build the package
npm run build

# Publish
npm publish

# Repeat for react package
cd ../react
npm run build
npm publish
```

---

## 🔍 Pre-Publish Checklist

### 1. Version Management
```bash
# Check current versions
npm run version --workspaces

# Update versions if needed
cd packages/core && npm version patch
cd ../react && npm version patch
```

### 2. Build Verification
```bash
# Clean and rebuild
npm run clean
npm run build

# Test the build output
node -e "console.log(require('./packages/core/dist/index.js'))"
```

### 3. Package Content Check
```bash
# Check what will be published
cd packages/core && npm pack --dry-run
cd ../react && npm pack --dry-run
```

### 4. README Files
Ensure each package has a README.md:
```bash
# Create README files if missing
touch packages/core/README.md
touch packages/react/README.md
```

---

## 🎯 Package-Specific Instructions

### @specview/core

**Purpose**: Core types and interfaces

**Dependencies**: None (standalone)

**Publishing**:
```bash
cd packages/core
npm run build
npm publish
```

**Usage**:
```typescript
import { SelfDescribingOutput, ComponentMetadata } from '@specview/core';
```

### @specview/react

**Purpose**: React hooks and utilities

**Dependencies**: @specview/core

**Publishing**:
```bash
cd packages/react
npm run build
npm publish
```

**Usage**:
```typescript
import { useSelfDescribing } from '@specview/react';
```

---

## 🔄 Version Management

### Semantic Versioning
- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

### Update Versions
```bash
# Update all packages
npm version patch --workspaces

# Or update individually
cd packages/core && npm version patch
cd ../react && npm version patch
```

### Version Synchronization
```bash
# Ensure all packages have the same version
npm run version --workspaces --include-workspace-root
```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. "Package name already exists"
```bash
# Check if package exists
npm view @specview/core

# If it exists, update version
cd packages/core && npm version patch
```

#### 2. "Access denied"
```bash
# Check npm login status
npm whoami

# Re-login if needed
npm login
```

#### 3. "Build failed"
```bash
# Check TypeScript errors
cd packages/core && npx tsc --noEmit
cd ../react && npx tsc --noEmit
```

#### 4. "Missing dependencies"
```bash
# Install all dependencies
npm install

# Check peer dependencies
npm ls --workspaces
```

### Debug Commands
```bash
# Check npm configuration
npm config list

# Check package.json validity
npm run validate --workspaces

# Dry run publish
npm pack --dry-run --workspaces
```

---

## 📊 Post-Publish Verification

### 1. Check Published Packages
```bash
# Verify packages are published
npm view @specview/core
npm view @specview/react
```

### 2. Test Installation
```bash
# Create test project
mkdir test-specview && cd test-specview
npm init -y

# Install packages
npm install @specview/core @specview/react

# Test imports
node -e "
const core = require('@specview/core');
const react = require('@specview/react');
console.log('Core:', Object.keys(core));
console.log('React:', Object.keys(react));
"
```

### 3. Update Documentation
- Update README.md with installation instructions
- Update HOWTO.md with package names
- Update examples to use published packages

---

## 🔐 Security Considerations

### 1. npm Token Security
```bash
# Use npm token for CI/CD
npm token create --read-only

# Store token securely
export NPM_TOKEN=your-token-here
```

### 2. Package Signing
```bash
# Enable package signing
npm config set sign-git-commit true
npm config set sign-git-tag true
```

### 3. Two-Factor Authentication
```bash
# Enable 2FA on npm account
npm profile enable-2fa auth-only
```

---

## 📈 CI/CD Integration

### GitHub Actions Example
```yaml
name: Publish Packages
on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm run build
      - run: npm run publish:all
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 🎉 Success Checklist

- [ ] All packages built successfully
- [ ] All packages published to npm
- [ ] Packages are installable
- [ ] Documentation updated
- [ ] Examples updated
- [ ] Version tags pushed to git
- [ ] Release notes created

---

## 📞 Support

If you encounter issues during publishing:

1. **Check npm status**: https://status.npmjs.org/
2. **Review npm logs**: `npm publish --verbose`
3. **Contact npm support**: https://www.npmjs.com/support
4. **Check package.json**: Ensure all required fields are present

---

*Happy publishing! 🚀*
