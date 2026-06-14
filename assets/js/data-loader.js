// Data loading utilities for the archive

async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Failed to load ${url}:`, error);
        return null;
    }
}

async function loadMarkdown(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.text();
    } catch (error) {
        console.error(`Failed to load ${url}:`, error);
        return null;
    }
}

// Simple markdown to HTML converter (for basic formatting)
function parseMarkdown(markdown) {
    if (!markdown) return '';
    
    let html = markdown
        .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
        .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^- (.*?)$/gm, '<li>$1</li>');
    
    return `<p>${html}</p>`;
}

window.loadJSON = loadJSON;
window.loadMarkdown = loadMarkdown;
window.parseMarkdown = parseMarkdown;
