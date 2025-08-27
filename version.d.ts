export declare const VERSION: "1.1.0";
export declare const VERSION_MAJOR = 1;
export declare const VERSION_MINOR = 1;
export declare const VERSION_PATCH = 0;
export declare const VERSION_STRING: string;
export interface BuildInfo {
    version: string;
    buildDate: string;
    buildTime: number;
}
export declare const BUILD_INFO: BuildInfo;
export interface VersionInfo {
    VERSION: string;
    VERSION_MAJOR: number;
    VERSION_MINOR: number;
    VERSION_PATCH: number;
    VERSION_STRING: string;
    BUILD_INFO: BuildInfo;
}
declare const versionInfo: VersionInfo;
export default versionInfo;
