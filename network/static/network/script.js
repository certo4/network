document.addEventListener('DOMContentLoaded', function() {
    
    // Selecting all edit buttons
    document.querySelectorAll('.edit').forEach(editButton => {

        // Adding event listeners to all edit buttons
        editButton.addEventListener('click', function() {

            this.style.display = 'none';
            // Getting ID from data attribute
            const postId = editButton.dataset.post;

            // Getting post content element
            const contentElement = document.querySelector(`.content[data-post="${postId}"]`);
            // Getting original post content
            const content = contentElement.innerHTML;

            // Replace inner HTML with textarea and submit button
            contentElement.innerHTML = `<textarea>${content}</textarea><button onclick="editPost()">Submit</button>`

            

        });
    });
});


function editPost() {
    return alert('hai');
}