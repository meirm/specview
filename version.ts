// SpecView version information
export const VERSION = '1.0.0' as const;
export const VERSION_MAJOR = 1;
export const VERSION_MINOR = 0;
export const VERSION_PATCH = 0;

// Version string for display
export const VERSION_STRING = `v${VERSION}`;

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
