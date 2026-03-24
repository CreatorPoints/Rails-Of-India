(() => {
    const input = document.getElementById('docs-search');
    const status = document.getElementById('docs-search-status');
    const sections = Array.from(document.querySelectorAll('.docs-section'));

    if (!input || !sections.length) return;

    const normalize = value => value.toLowerCase().replace(/\s+/g, ' ').trim();

    const updateStatus = (text, isEmpty) => {
        if (!status) return;
        status.textContent = text;
        status.dataset.empty = isEmpty ? 'true' : 'false';
    };

    const filterSections = term => {
        const query = normalize(term);
        let visibleCount = 0;

        sections.forEach(section => {
            const text = normalize(section.textContent || '');
            const matches = !query || text.includes(query);
            section.classList.toggle('docs-hidden', !matches);
            if (matches) visibleCount += 1;
        });

        if (!query) {
            updateStatus('Type to filter sections.', true);
        } else if (visibleCount === 0) {
            updateStatus('No sections match your search.', false);
        } else {
            updateStatus(`Showing ${visibleCount} section${visibleCount === 1 ? '' : 's'}.`, false);
        }
    };

    input.addEventListener('input', event => {
        filterSections(event.target.value);
    });

    filterSections('');
})();
