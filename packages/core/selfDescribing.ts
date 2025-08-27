// Core types for SelfDescribing components
export interface ComponentMetadata {
  generated_at: string;
  component_version: string;
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

// Helper function to generate the output
export function createSelfDescribingOutput<T>(
  component_id: string,
  description: string,
  data: T,
  metadata: Partial<ComponentMetadata> = {}
): SelfDescribingOutput<T> {
  return {
    component_id,
    description,
    data,
    metadata: {
      ...metadata,
      generated_at: new Date().toISOString(),
    }
  };
}
