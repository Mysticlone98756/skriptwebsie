// Fetch the folder and file structure from the server
fetch('/api/folders')
    .then(response => response.json())
    .then(folderStructure => {
        const folderDropdown = document.getElementById('folder-dropdown');

        for (const folder in folderStructure) {
            const folderItem = document.createElement('li');
            folderItem.textContent = folder;

            const fileList = document.createElement('ul');

            folderStructure[folder].forEach(file => {
                const fileItem = document.createElement('li');
                fileItem.textContent = file;
                fileItem.addEventListener('click', () => loadFile(folder, file));
                fileList.appendChild(fileItem);
            });

            folderItem.appendChild(fileList);
            folderDropdown.appendChild(folderItem);
        }
    })
    .catch(error => console.error('Error fetching folder structure:', error));

// Fetch and display file contents
function loadFile(folder, fileName) {
    const codeContainer = document.getElementById('code-container');
    const codeDisplay = document.getElementById('code-display');

    // Clear previous content and hide code container while loading new content
    codeDisplay.textContent = '';
    codeContainer.style.display = 'none';

    // Fetch the selected file
    fetch(`/all-skripts/${folder}/${fileName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Display the file content in the code block
            codeDisplay.textContent = data;

            // Show the code container with fade-in down animation
            codeContainer.style.display = 'block';
            codeContainer.classList.add('fade-in-down');
        })
        .catch(error => console.error('Error loading the file:', error));
}
