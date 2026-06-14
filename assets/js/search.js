// Full-text search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

let searchIndex = [];

document.addEventListener('DOMContentLoaded', () => {
    buildSearchIndex();
});

function buildSearchIndex() {
    // Build searchable index from all content
    const conversations = archiveData.conversations?.conversations || [];
    const timeline = archiveData.timeline?.timeline || [];
    
    searchIndex = [
        ...conversations.map(c => ({
            id: c.id,
            title: c.title,
            type: 'conversation',
            text: `${c.title} ${c.excerpt} ${c.keywords?.join(' ') || ''}`,
            date: c.date,
            url: c.content_url
        })),
        ...timeline.map((t, i) => ({
            id: `timeline-${i}`,
            title: t.title,
            type: 'event',
            text: `${t.title} ${t.description} ${t.theme?.join(' ') || ''}`,
            date: t.date,
            url: `#timeline`
        }))
    ];
}

searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
        searchResults.classList.add('hidden');
        return;
    }
    
    const results = searchIndex.filter(item => 
        item.text.toLowerCase().includes(query)
    ).slice(0, 10);
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p style="padding: 1rem; color: var(--text-secondary);">No results found</p>';
        searchResults.classList.remove('hidden');
        return;
    }
    
    searchResults.innerHTML = results.map(result => `
        <div class="search-result-item" onclick="navigateToResult('${result.url}')">
            <div class="search-result-title">${result.title}</div>
            <div class="search-result-meta">${result.type} • ${formatDate(result.date)}</div>
        </div>
    `).join('');
    
    searchResults.classList.remove('hidden');
});

searchInput?.addEventListener('blur', () => {
    setTimeout(() => searchResults.classList.add('hidden'), 200);
});

function navigateToResult(url) {
    searchResults.classList.add('hidden');
    if (url.startsWith('#')) {
        const element = document.querySelector(url);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
