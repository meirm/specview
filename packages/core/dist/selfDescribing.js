"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSelfDescribingOutput = createSelfDescribingOutput;
// Helper function to generate the output
function createSelfDescribingOutput(component_id, description, data, metadata = {}) {
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
