// Core types for SelfDescribing components
export interface ComponentMetadata {
  generated_at: string;
  component_version: string;
  store_id?: string;
  filters?: Record<string, any>;
  investigation_id?: string;
  case_id?: string;
}

export interface SelfDescribingOutput<T> {
  component_id: string;
  description: string;
  data: T;
  metadata: ComponentMetadata;
}
