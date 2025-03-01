document.addEventListener('DOMContentLoaded', function() {
    // Find all code containers
    const codeContainers = document.querySelectorAll('.code-container');
    
    codeContainers.forEach(function(container, index) {
        // Create a title based on the content or use a predefined one
        const titleElement = document.createElement('div');
        titleElement.className = 'code-title';
        
        // Get the language from the code block if available
        const codeBlock = container.querySelector('code');
        let language = '';
        if (codeBlock && codeBlock.className) {
            const langMatch = codeBlock.className.match(/language-(\w+)/);
            if (langMatch && langMatch[1]) {
                language = langMatch[1].charAt(0).toUpperCase() + langMatch[1].slice(1);
            }
        }
        
        titleElement.textContent = language ? `${language} Code Section` : `Code Section ${index + 1}`;
        
        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'code-toggle';
        toggleButton.textContent = 'Collapse';
        
        // Insert elements at the top of the container
        container.insertBefore(titleElement, container.firstChild);
        container.insertBefore(toggleButton, container.firstChild);
        
        // Add click event handler
        toggleButton.addEventListener('click', function() {
            container.classList.toggle('collapsed');
            toggleButton.textContent = container.classList.contains('collapsed') ? 'Expand' : 'Collapse';
        });
    });
    
    // Optional: Add a "Collapse All / Expand All" control
    const projectContainer = document.querySelector('.post.featured');
    if (projectContainer && codeContainers.length > 1) {
        const controlBar = document.createElement('div');
        controlBar.className = 'code-controls';
        controlBar.style.textAlign = 'center';
        controlBar.style.margin = '10px 0';
        
        const collapseAllButton = document.createElement('button');
        collapseAllButton.textContent = 'Collapse All Code';
        collapseAllButton.className = 'btn btn-small';
        collapseAllButton.style.marginRight = '10px';
        collapseAllButton.addEventListener('click', function() {
            codeContainers.forEach(function(container) {
                container.classList.add('collapsed');
                container.querySelector('.code-toggle').textContent = 'Expand';
            });
        });
        
        const expandAllButton = document.createElement('button');
        expandAllButton.textContent = 'Expand All Code';
        expandAllButton.className = 'btn btn-small';
        expandAllButton.addEventListener('click', function() {
            codeContainers.forEach(function(container) {
                container.classList.remove('collapsed');
                container.querySelector('.code-toggle').textContent = 'Collapse';
            });
        });
        
        controlBar.appendChild(collapseAllButton);
        controlBar.appendChild(expandAllButton);
        
        // Add the control bar before the first code container
        const firstCodeContainer = codeContainers[0];
        firstCodeContainer.parentNode.insertBefore(controlBar, firstCodeContainer);
    }
});