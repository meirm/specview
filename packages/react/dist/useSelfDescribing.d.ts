import { SelfDescribingOutput, ComponentMetadata } from '@specview/core/selfDescribing';
export interface UseSelfDescribingOptions<T> {
    componentId: string;
    description: string;
    componentVersion?: string;
    entityId?: string;
    contextId?: string;
    sessionId?: string;
    filters?: ComponentMetadata['filters'];
    generateData: () => T;
}
export interface UseSelfDescribingReturn<T> {
    getSelfDescribingOutput: () => SelfDescribingOutput<T>;
    getData: () => T;
    getJSONString: (pretty?: boolean) => string;
    currentView: 'visual' | 'json';
    setCurrentView: (view: 'visual' | 'json') => void;
    toggleView: () => void;
    exportAsJSON: () => void;
    exportAsCSV?: () => void;
    copyToClipboard: () => Promise<void>;
    copySuccess: boolean;
    exportSuccess: boolean;
    isGenerating: boolean;
    error: string | null;
}
export declare function useSelfDescribing<T>(options: UseSelfDescribingOptions<T>): UseSelfDescribingReturn<T>;
