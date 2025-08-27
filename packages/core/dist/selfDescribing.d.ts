export interface ComponentMetadata {
    generated_at: string;
    component_version?: string;
    entity_id?: string;
    filters?: Record<string, any>;
    context_id?: string;
    session_id?: string;
}
export interface SelfDescribingOutput<T> {
    component_id: string;
    description: string;
    data: T;
    metadata: ComponentMetadata;
}
export declare function createSelfDescribingOutput<T>(component_id: string, description: string, data: T, metadata?: Partial<ComponentMetadata>): SelfDescribingOutput<T>;
