// ==UserScript==
// @name         your-project-name 
// @namespace    https://your.site
// @version      0.1
// @description  format number for money
// @author       Your name
// @match        https://your.site
// @require      https://greasyfork.org/scripts/372672-everything-hook/code/Everything-Hook.js?version=784972
// @grant        none
// ==/UserScript==

// insert a script element to the head of the document
const addScript = ({ id, type, src, textContent }) => {
    const script = window.document.createElement('script');
    script.id = id;
    script.type = type;
    const task = src
        ? () => {
              script.src = src;
          }
        : textContent
        ? () => {
              script.textContent = textContent;
          }
        : () => {};

    task();

    document.head.appendChild(script);
};

addScript({
    id: 'react-refresh',
    type: 'module',
    textContent: (() => {
        return `\
import RefreshRuntime from "http://127.0.0.1:3000/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
`;
    })()
});

addScript({ id: 'vite-client', type: 'module', src: 'http://127.0.0.1:3000/@vite/client' });
addScript({ id: 'plugin-main', type: 'module', src: 'http://127.0.0.1:3000/src/main.bs.js' });
