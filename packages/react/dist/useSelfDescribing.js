"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelfDescribing = useSelfDescribing;
const react_1 = require("react");
function useSelfDescribing(options) {
    const { componentId, description, componentVersion = '1.0.0', generateData, entityId, contextId, sessionId, filters } = options;
    const [currentView, setCurrentView] = (0, react_1.useState)('visual');
    const [copySuccess, setCopySuccess] = (0, react_1.useState)(false);
    const [exportSuccess, setExportSuccess] = (0, react_1.useState)(false);
    const [isGenerating, setIsGenerating] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const output = (0, react_1.useMemo)(() => ({
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
        }
        catch (err) {
            setError('Failed to export JSON');
            console.error(err);
        }
    };
    const copyToClipboard = (0, react_1.useCallback)(async () => {
        try {
            await navigator.clipboard.writeText(getJSONString(true));
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
        catch (err) {
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
