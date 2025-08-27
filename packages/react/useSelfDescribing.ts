import { useState, useCallback, useMemo } from 'react';
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
  exportAsCSV?: () => void; // optional: hook can delegate to external utils
  copyToClipboard: () => Promise<void>;

  copySuccess: boolean;
  exportSuccess: boolean;
  isGenerating: boolean;
  error: string | null;
}

export function useSelfDescribing<T>(options: UseSelfDescribingOptions<T>): UseSelfDescribingReturn<T> {
  const {
    componentId,
    description,
    componentVersion = '1.0.0',
    generateData,
    entityId,
    contextId,
    sessionId,
    filters
  } = options;

  const [currentView, setCurrentView] = useState<'visual' | 'json'>('visual');
  const [copySuccess, setCopySuccess] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const output: SelfDescribingOutput<T> = useMemo(() => ({
    component_id: componentId,
    description,
    data: generateData(),
    metadata: {
      generated_at: new Date().toISOString(),
      component_version: componentVersion,
      entity_id: entityId,
      filters,
      context_id: contextId,
      session_id: sessionId
    }
  }), [componentId, description, componentVersion, generateData, entityId, contextId, sessionId, filters]);

  const getSelfDescribingOutput = () => output;
  const getData = () => output.data;
  const getJSONString = (pretty = false) => JSON.stringify(output, null, pretty ? 2 : 0);

  const toggleView = () => {
    setCurrentView((prev) => (prev === 'visual' ? 'json' : 'visual'));
  };

  const exportAsJSON = () => {
    try {
      const blob = new Blob([getJSONString(true)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${componentId}_${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setExportSuccess(true);
    } catch (err) {
      setError('Failed to export JSON');
      console.error(err);
    }
  };

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getJSONString(true));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setError('Clipboard copy failed');
    }
  }, [output]);

  return {
    getSelfDescribingOutput,
    getData,
    getJSONString,
    currentView,
    setCurrentView,
    toggleView,
    exportAsJSON,
    copyToClipboard,
    copySuccess,
    exportSuccess,
    isGenerating,
    error
  };
}
