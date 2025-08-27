"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDescribingComponent = SelfDescribingComponent;
const jsx_runtime_1 = require("react/jsx-runtime");
const useSelfDescribing_1 = require("./useSelfDescribing");
function SelfDescribingComponent({ componentId, description, entityId, contextId, sessionId, generateData, renderVisual, className = '' }) {
    const selfDescribing = (0, useSelfDescribing_1.useSelfDescribing)({
        componentId,
        description,
        entityId,
        contextId,
        sessionId,
        generateData
    });
    const { currentView, toggleView, exportAsJSON, copyToClipboard, getData, getJSONString, copySuccess } = selfDescribing;
    const data = getData();
    return ((0, jsx_runtime_1.jsxs)("div", { className: `border rounded-lg p-4 ${className}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 mb-4", children: [(0, jsx_runtime_1.jsx)("button", { onClick: toggleView, className: "px-3 py-1 bg-blue-500 text-white rounded text-sm", children: currentView === 'visual' ? 'Show JSON' : 'Show Visual' }), (0, jsx_runtime_1.jsx)("button", { onClick: exportAsJSON, className: "px-3 py-1 bg-green-500 text-white rounded text-sm", children: "Export JSON" }), (0, jsx_runtime_1.jsx)("button", { onClick: copyToClipboard, className: `px-3 py-1 rounded text-sm ${copySuccess ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'}`, children: copySuccess ? 'Copied!' : 'Copy JSON' })] }), currentView === 'visual' ? ((0, jsx_runtime_1.jsx)("div", { children: renderVisual(data) })) : ((0, jsx_runtime_1.jsx)("pre", { className: "bg-gray-900 text-green-400 p-4 rounded overflow-auto text-sm", children: getJSONString(true) }))] }));
}
