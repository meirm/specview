import React from 'react';
import { useSelfDescribing } from './useSelfDescribing';

interface SelfDescribingComponentProps<T> {
  componentId: string;
  description: string;
  entityId?: string;
  contextId?: string;
  sessionId?: string;
  generateData: () => T;
  renderVisual: (data: T) => React.ReactNode;
  className?: string;
}

export function SelfDescribingComponent<T>({
  componentId,
  description,
  entityId,
  contextId,
  sessionId,
  generateData,
  renderVisual,
  className = ''
}: SelfDescribingComponentProps<T>) {
  const selfDescribing = useSelfDescribing<T>({
    componentId,
    description,
    entityId,
    contextId,
    sessionId,
    generateData
  });

  const { currentView, toggleView, exportAsJSON, copyToClipboard, getData, getJSONString, copySuccess } = selfDescribing;
  const data = getData();

  return (
    <div className={`border rounded-lg p-4 ${className}`}>
      <div className="flex gap-2 mb-4">
        <button
          onClick={toggleView}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          {currentView === 'visual' ? 'Show JSON' : 'Show Visual'}
        </button>
        <button
          onClick={exportAsJSON}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
        >
          Export JSON
        </button>
        <button
          onClick={copyToClipboard}
          className={`px-3 py-1 rounded text-sm ${
            copySuccess ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'
          }`}
        >
          {copySuccess ? 'Copied!' : 'Copy JSON'}
        </button>
      </div>

      {currentView === 'visual' ? (
        <div>{renderVisual(data)}</div>
      ) : (
        <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto text-sm">
          {getJSONString(true)}
        </pre>
      )}
    </div>
  );
}
