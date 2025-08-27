import React from 'react';
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
export declare function SelfDescribingComponent<T>({ componentId, description, entityId, contextId, sessionId, generateData, renderVisual, className }: SelfDescribingComponentProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
