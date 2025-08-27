"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUILD_INFO = exports.VERSION_STRING = exports.VERSION_PATCH = exports.VERSION_MINOR = exports.VERSION_MAJOR = exports.VERSION = void 0;
// SpecView version information
exports.VERSION = '1.1.0';
exports.VERSION_MAJOR = 1;
exports.VERSION_MINOR = 1;
exports.VERSION_PATCH = 0;
// Version string for display
exports.VERSION_STRING = `v${exports.VERSION}`;
// Build information
exports.BUILD_INFO = {
    version: exports.VERSION,
    buildDate: new Date().toISOString(),
    buildTime: Date.now()
};
// Default export
const versionInfo = {
    VERSION: exports.VERSION,
    VERSION_MAJOR: exports.VERSION_MAJOR,
    VERSION_MINOR: exports.VERSION_MINOR,
    VERSION_PATCH: exports.VERSION_PATCH,
    VERSION_STRING: exports.VERSION_STRING,
    BUILD_INFO: exports.BUILD_INFO
};
exports.default = versionInfo;
