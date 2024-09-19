document.getElementById('file-dropdown').addEventListener('change', function() {
    const selectedFile = this.value;  // Get the selected file from the dropdown
    const codeContainer = document.getElementById('code-container');
    const codeDisplay = document.getElementById('code-display');

    // Clear previous content and hide code container while loading new content
    codeDisplay.textContent = '';
    codeContainer.style.display = 'none';

    // Fetch the selected file
    fetch(selectedFile)  // 'selectedFile' contains the path to the chosen file
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
});
