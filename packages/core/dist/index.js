"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUILD_INFO = exports.VERSION_STRING = exports.VERSION = void 0;
// Export core functionality
__exportStar(require("./selfDescribing"), exports);
// Export version information - using inline version to avoid path issues
exports.VERSION = '1.1.0';
exports.VERSION_STRING = 'v1.1.0';
exports.BUILD_INFO = {
    version: exports.VERSION,
    buildDate: new Date().toISOString(),
    buildTime: Date.now()
};
