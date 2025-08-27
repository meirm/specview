// SpecView version information
export const VERSION = '1.0.0';
export const VERSION_MAJOR = 1;
export const VERSION_MINOR = 0;
export const VERSION_PATCH = 0;

// Version string for display
export const VERSION_STRING = `v${VERSION}`;

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
