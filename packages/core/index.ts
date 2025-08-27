// Export core functionality
export * from './selfDescribing';

// Export version information - using inline version to avoid path issues
export const VERSION = '1.1.0';
export const VERSION_STRING = 'v1.1.0';
export const BUILD_INFO = {
  version: VERSION,
  buildDate: new Date().toISOString(),
  buildTime: Date.now()
};
