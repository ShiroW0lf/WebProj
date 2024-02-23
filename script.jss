document.addEventListener('DOMContentLoaded', function() {
    const fileDropArea = document.getElementById('fileDropArea');
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const clearButton = document.getElementById('clearButton');

    // Highlight drop area when a file is dragged over it
    fileDropArea.addEventListener('dragover', function(event) {
        event.preventDefault();
        fileDropArea.classList.add('highlight');
    });

    fileDropArea.addEventListener('dragleave', function(event) {
        event.preventDefault();
        fileDropArea.classList.remove('highlight');
    });

    fileDropArea.addEventListener('drop', function(event) {
        event.preventDefault();
        fileDropArea.classList.remove('highlight');
        const files = event.dataTransfer.files;
        handleFiles(files);
    });

    // Handle file selection from input
    fileInput.addEventListener('change', function(event) {
        const files = event.target.files;
        handleFiles(files);
    });

    // Handle file upload
    uploadButton.addEventListener('click', function() {
        // Perform upload logic here
        alert('Files uploaded!');
    });

    // Clear file selection
    clearButton.addEventListener('click', function() {
        fileInput.value = ''; // Clear the file input field
        fileDropArea.innerHTML = '<h3>Drop files here</h3>'; // Clear the file drop area display
    });

    function handleFiles(files) {
        // Handle files here (e.g., display file names)
        const fileList = document.createElement('ul');
        filesArray = Array.from(files);
        filesArray.forEach(function(file) {
            const listItem = document.createElement('li');
            listItem.textContent = file.name;
            fileList.appendChild(listItem);
        });
        fileDropArea.innerHTML = ''; // Clear existing files display
        fileDropArea.appendChild(fileList); // Display new files list
    }
});
